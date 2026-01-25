import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, MapPin, Calendar, Clock, Star, Heart,
    Share2, Download, Phone, CheckCircle, AlertCircle,
    Utensils, Bed, Map, Plus, FileText, Camera, Video
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { tourAPI, itineraryAPI, costAPI, departureAPI } from '../services/api';

const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'cost', label: 'Cost', icon: FileText },
    { id: 'dates', label: 'Dates', icon: Clock },
    { id: 'journey', label: 'Journey', icon: MapPin },
    { id: 'stay', label: 'Stay & Meals', icon: Bed },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'addons', label: 'Add-ons', icon: Plus },
    { id: 'visa', label: 'PP/VISA', icon: FileText },
    { id: 'dos', label: "Do's & Don'ts", icon: AlertCircle },
    { id: 'media', label: 'Media', icon: Camera },
    { id: 'terms', label: 'T&C', icon: FileText },
];

export default function TourDetailPage() {
    const { tourId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('itinerary');
    const [tour, setTour] = useState(null);
    const [itinerary, setItinerary] = useState([]);
    const [costs, setCosts] = useState([]);
    const [dates, setDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const loadTourDetails = async () => {
            setIsLoading(true);
            try {
                const [tourRes, itinRes, costRes, dateRes] = await Promise.allSettled([
                    tourAPI.getTourById(tourId),
                    itineraryAPI.getByCategory(tourId),
                    costAPI.getByCategory(tourId),
                    departureAPI.getByCategory(tourId),
                ]);

                if (tourRes.status === 'fulfilled' && tourRes.value.data) {
                    setTour(tourRes.value.data);
                }
                if (itinRes.status === 'fulfilled' && itinRes.value.data) {
                    setItinerary(Array.isArray(itinRes.value.data) ? itinRes.value.data : []);
                }
                if (costRes.status === 'fulfilled' && costRes.value.data) {
                    setCosts(Array.isArray(costRes.value.data) ? costRes.value.data : []);
                }
                if (dateRes.status === 'fulfilled' && dateRes.value.data) {
                    setDates(Array.isArray(dateRes.value.data) ? dateRes.value.data : []);
                }
            } catch (error) {
                console.error('Error loading tour details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTourDetails();
    }, [tourId]);

    const highlights = tour?.highlights?.split('|').filter(Boolean) || [];
    const dosAndDonts = tour?.dosAndDonts?.split('|').filter(Boolean) || [];

    const renderTabContent = () => {
        if (!tour) return null;

        switch (activeTab) {
            case 'itinerary':
                return (
                    <div className="space-y-4">
                        {itinerary.length > 0 ? (
                            itinerary.map((day, index) => (
                                <motion.div
                                    key={day.itineraryId || index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                            D{day.dayNumber || index + 1}
                                        </div>
                                        {index < itinerary.length - 1 && (
                                            <div className="w-0.5 h-full bg-blue-200 mt-2" />
                                        )}
                                    </div>
                                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-1 mb-2">
                                        <h4 className="font-bold text-lg text-gray-900 mb-2">
                                            Day {day.dayNumber || index + 1}: {day.title || day.itineraryTitle || 'Day Activities'}
                                        </h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            {day.itineraryDetails || day.details || 'Details not available'}
                                        </p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No itinerary available for this tour.
                            </div>
                        )}
                    </div>
                );

            case 'cost':
                return (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-blue-50 border-b border-blue-100">
                            <h4 className="font-bold text-lg text-blue-900">Package Pricing</h4>
                            <p className="text-blue-700 text-sm">All prices are in INR per person</p>
                        </div>
                        {costs.length > 0 ? (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                                        <th className="text-right p-4 font-semibold text-gray-700">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {costs.map((cost, index) => (
                                        <tr key={cost.costId || index} className="border-t border-gray-100">
                                            <td className="p-4 text-gray-700">{cost.costType || cost.type}</td>
                                            <td className="p-4 text-right font-bold text-gray-900">
                                                ₹{(cost.cost || cost.price || 0).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No pricing information available.
                            </div>
                        )}
                    </div>
                );

            case 'dates':
                return (
                    <div className="grid md:grid-cols-2 gap-4">
                        {dates.length > 0 ? (
                            dates.map((date) => (
                                <div
                                    key={date.departureDateId || date.id}
                                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Departure Date</p>
                                            <p className="font-bold text-lg text-gray-900">
                                                {new Date(date.departureDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${(date.availableSeats || date.seats || 0) > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {date.availableSeats || date.seats || 0} seats left
                                        </span>
                                    </div>
                                    {date.endDate && (
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Clock size={14} />
                                            <span>Ends: {new Date(date.endDate).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => navigate(`/book/${tourId}?date=${date.departureDateId || date.id}`)}
                                        className="w-full mt-4 btn-primary"
                                    >
                                        Select This Date
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-8 text-gray-500">
                                No departure dates available.
                            </div>
                        )}
                    </div>
                );

            case 'journey':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Journey Details</h4>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {tour.journeyDetails || 'Journey details not available.'}
                        </p>
                    </div>
                );

            case 'stay':
                return (
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Bed size={20} className="text-blue-600" />
                                </div>
                                <h4 className="font-bold text-lg text-gray-900">Accommodation</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {tour.stayDetails || 'Accommodation details not available.'}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Utensils size={20} className="text-orange-600" />
                                </div>
                                <h4 className="font-bold text-lg text-gray-900">Meals</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {tour.mealsIncluded || 'Meal information not available.'}
                            </p>
                        </div>
                    </div>
                );

            case 'map':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Route Map</h4>
                        {tour.mapImagePath ? (
                            <img src={tour.mapImagePath} alt="Tour Route Map" className="w-full rounded-lg" />
                        ) : (
                            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">Map not available for this tour</p>
                            </div>
                        )}
                    </div>
                );

            case 'addons':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Available Add-ons</h4>
                        <p className="text-gray-500">No add-ons configured for this tour.</p>
                    </div>
                );

            case 'visa':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Passport & Visa Requirements</h4>
                        <p className="text-gray-600 leading-relaxed">
                            {tour.visaRequirements || 'Visa information not available.'}
                        </p>
                    </div>
                );

            case 'dos':
                return (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <h4 className="font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
                                <CheckCircle size={20} /> Do's
                            </h4>
                            <ul className="space-y-2">
                                {dosAndDonts.filter(d => d.toLowerCase().startsWith('do ')).length > 0 ? (
                                    dosAndDonts.filter(d => d.toLowerCase().startsWith('do ')).map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-green-700">
                                            <CheckCircle size={16} className="mt-1 shrink-0" />
                                            {item.replace(/^do /i, '')}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-green-600">No specific do's listed</li>
                                )}
                            </ul>
                        </div>
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <h4 className="font-bold text-lg text-red-800 mb-4 flex items-center gap-2">
                                <AlertCircle size={20} /> Don'ts
                            </h4>
                            <ul className="space-y-2">
                                {dosAndDonts.filter(d => d.toLowerCase().startsWith('don')).length > 0 ? (
                                    dosAndDonts.filter(d => d.toLowerCase().startsWith('don')).map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-red-700">
                                            <AlertCircle size={16} className="mt-1 shrink-0" />
                                            {item.replace(/^don'?t /i, '')}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-red-600">No specific don'ts listed</li>
                                )}
                            </ul>
                        </div>
                    </div>
                );

            case 'media':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                            <Camera size={20} /> Media Gallery
                        </h4>
                        <p className="text-gray-500">No media available for this tour.</p>
                    </div>
                );

            case 'terms':
                return (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-900 mb-4">Terms & Conditions</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Booking confirmation is subject to availability</li>
                            <li>• Advance payment required at the time of booking</li>
                            <li>• Cancellation charges apply as per policy</li>
                            <li>• Company reserves the right to modify itinerary</li>
                        </ul>
                    </div>
                );

            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="skeleton h-96 rounded-2xl mb-8" />
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="skeleton h-64 rounded-2xl" />
                        <div className="col-span-3 skeleton h-96 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
                    <p className="text-gray-600 mb-8">The tour you're looking for doesn't exist or has been removed.</p>
                    <Link to="/tours" className="btn-primary">Browse All Tours</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh] bg-gradient-dark">
                {tour.thumbnailPath && (
                    <img
                        src={tour.thumbnailPath}
                        alt={tour.tourName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
                <Navbar />

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                            <Link to="/home" className="hover:text-white">Home</Link>
                            <ChevronRight size={14} />
                            <Link to="/tours" className="hover:text-white">Tours</Link>
                            <ChevronRight size={14} />
                            <span className="text-white">{tour.tourCode}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {tour.tourName}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-white/90">
                            <span className="flex items-center gap-1">
                                <Clock size={18} /> {tour.duration || 'N/A'}
                            </span>
                            {tour.tourCode && (
                                <span className="flex items-center gap-1">
                                    Code: {tour.tourCode}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar - Quick Links */}
                    <aside className="lg:w-64 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Navigation</h3>
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            <hr className="my-4" />

                            <button
                                onClick={() => navigate(`/book/${tourId}`)}
                                className="w-full btn-accent py-4 text-lg"
                            >
                                Book This Tour
                            </button>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-colors ${isWishlisted
                                            ? 'bg-red-50 border-red-200 text-red-600'
                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                                    <Share2 size={18} />
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                                    <Download size={18} />
                                </button>
                            </div>

                            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                                <p className="text-green-800 font-semibold flex items-center gap-2">
                                    <Phone size={16} /> Need Help?
                                </p>
                                <p className="text-green-700 text-sm mt-1">Call us for assistance</p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {/* Price & Highlights Box */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <p className="text-gray-500 text-sm">Starting from</p>
                                    <p className="text-4xl font-bold text-gray-900">
                                        ₹{(tour.startingCost || 0).toLocaleString()}
                                        <span className="text-lg text-gray-500 font-normal"> / person</span>
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate(`/book/${tourId}`)}
                                    className="btn-accent px-8 py-4 text-lg"
                                >
                                    Book Now →
                                </button>
                            </div>

                            {highlights.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-3">Tour Highlights</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {highlights.map((h, i) => (
                                            <span key={i} className="badge badge-primary">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
                            <div className="flex overflow-x-auto scrollbar-hide">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`tab whitespace-nowrap ${activeTab === tab.id ? 'active' : ''}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderTabContent()}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
