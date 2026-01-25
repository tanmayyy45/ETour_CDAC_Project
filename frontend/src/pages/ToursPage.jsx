import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Plane, Mountain, Heart, Users, Sun, Compass, Camera, Globe,
    ArrowRight, Star, Clock, Filter
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { categoryAPI, tourAPI } from '../services/api';

// Icon mapping for categories
const iconMap = {
    'domestic': MapPin,
    'international': Plane,
    'adventure': Mountain,
    'honeymoon': Heart,
    'group': Users,
    'pilgrimage': Sun,
    'wildlife': Compass,
    'photography': Camera,
    'default': Globe,
};

const gradientMap = {
    'domestic': 'from-blue-500 to-cyan-400',
    'international': 'from-purple-500 to-pink-400',
    'adventure': 'from-orange-500 to-amber-400',
    'honeymoon': 'from-rose-500 to-pink-400',
    'group': 'from-green-500 to-emerald-400',
    'pilgrimage': 'from-amber-500 to-yellow-400',
    'wildlife': 'from-teal-500 to-green-400',
    'photography': 'from-indigo-500 to-blue-400',
    'default': 'from-gray-500 to-gray-400',
};

export default function ToursPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [categories, setCategories] = useState([]);
    const [tours, setTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [catRes, tourRes] = await Promise.allSettled([
                    categoryAPI.getMainCategories(),
                    tourAPI.getAllTours(),
                ]);

                if (catRes.status === 'fulfilled' && catRes.value.data) {
                    setCategories(catRes.value.data);
                }
                if (tourRes.status === 'fulfilled' && tourRes.value.data) {
                    setTours(tourRes.value.data);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const getCategoryIcon = (category) => {
        const key = category.categoryName?.toLowerCase() || 'default';
        return iconMap[key] || iconMap['default'];
    };

    const getCategoryGradient = (category) => {
        const key = category.categoryName?.toLowerCase() || 'default';
        return gradientMap[key] || gradientMap['default'];
    };

    // Sort tours
    const sortedTours = [...tours].sort((a, b) => {
        switch (activeFilter) {
            case 'price-low':
                return (a.startingCost || 0) - (b.startingCost || 0);
            case 'price-high':
                return (b.startingCost || 0) - (a.startingCost || 0);
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-80 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-4">Explore Tours</h1>
                        <p className="text-xl text-white/80 max-w-2xl">
                            Discover handpicked destinations and curated experiences
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>

                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton h-28 rounded-xl" />
                            ))}
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                            {categories.map((category, index) => {
                                const IconComponent = getCategoryIcon(category);
                                return (
                                    <motion.div
                                        key={category.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={`/sector/${category.categoryId}`}
                                            className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all group"
                                        >
                                            <div className={`w-14 h-14 bg-gradient-to-br ${getCategoryGradient(category)} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                                <IconComponent size={24} className="text-white" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 text-center">{category.categoryName}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No categories available</p>
                        </div>
                    )}
                </div>
            </section>

            {/* All Tours Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Tour Packages</h2>
                            <p className="text-gray-600">{tours.length} packages available</p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200">
                                <Filter size={18} className="text-gray-400" />
                                <select
                                    className="bg-transparent outline-none text-gray-700"
                                    value={activeFilter}
                                    onChange={(e) => setActiveFilter(e.target.value)}
                                >
                                    <option value="all">All Tours</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton h-80 rounded-2xl" />
                            ))}
                        </div>
                    ) : sortedTours.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {sortedTours.map((tour, index) => (
                                <motion.div
                                    key={tour.catmasterId || tour.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/tour/${tour.catmasterId || tour.id}`} className="tour-card group block">
                                        <div className="image-container">
                                            <img
                                                src={tour.thumbnailPath || '/placeholder-tour.jpg'}
                                                alt={tour.tourName}
                                                className="image"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                }}
                                            />
                                            <span className="duration-badge">{tour.duration || 'N/A'}</span>
                                            <div className="price-badge">
                                                <p className="price-label">Starting from</p>
                                                <p className="price">₹{(tour.startingCost || 0).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <h3 className="title">{tour.tourName}</h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {tour.duration || 'N/A'}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No tours available. Please check backend connection.</p>
                            <Link to="/search" className="btn-primary mt-4 inline-flex items-center gap-2">
                                Search Tours <ArrowRight size={18} />
                            </Link>
                        </div>
                    )}

                    {/* View More Button */}
                    {tours.length > 0 && (
                        <div className="text-center mt-12">
                            <Link
                                to="/search"
                                className="btn-secondary inline-flex items-center gap-2 px-8 py-4"
                            >
                                Advanced Search <ArrowRight size={18} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
