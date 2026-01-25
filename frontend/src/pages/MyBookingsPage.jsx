import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, CreditCard, Eye, X, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { bookingAPI } from '../services/api';
import { useApp } from '../context/AppContext';

export default function MyBookingsPage() {
    const navigate = useNavigate();
    const { user } = useApp();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const loadBookings = async () => {
            setIsLoading(true);
            try {
                const res = await bookingAPI.getBookingsByCustomer(user.id || user.customerId);
                if (res.data) {
                    setBookings(Array.isArray(res.data) ? res.data : []);
                }
            } catch (err) {
                console.error('Error loading bookings:', err);
                setBookings([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadBookings();
    }, [user, navigate]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            case 'completed':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status?.toLowerCase() === filter);

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative h-64 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Bookings</h1>
                        <p className="text-white/80">View and manage your tour bookings</p>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="container mx-auto px-4">
                    <div className="flex gap-2 py-4 overflow-x-auto">
                        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap capitalize ${filter === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bookings List */}
            <div className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="skeleton h-40 rounded-2xl" />
                        ))}
                    </div>
                ) : filteredBookings.length > 0 ? (
                    <div className="space-y-4">
                        {filteredBookings.map((booking, index) => (
                            <motion.div
                                key={booking.bookingId || booking.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4">
                                                {/* Tour Image */}
                                                {booking.tourImage && (
                                                    <img
                                                        src={booking.tourImage}
                                                        alt={booking.tourName}
                                                        className="w-24 h-24 rounded-xl object-cover hidden md:block"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                )}

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                            {booking.status || 'Pending'}
                                                        </span>
                                                        <span className="text-gray-500 text-sm">
                                                            Booking #{booking.bookingId || booking.id}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                        {booking.tourName || booking.tour?.tourName || 'Tour Package'}
                                                    </h3>

                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {booking.departureDate
                                                                ? new Date(booking.departureDate).toLocaleDateString('en-IN', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })
                                                                : 'N/A'}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Users size={14} />
                                                            {booking.passengerCount || booking.passengers?.length || 1} Traveler(s)
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <CreditCard size={14} />
                                                            ₹{(booking.totalAmount || 0).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Link
                                                to={`/booking/${booking.bookingId || booking.id}`}
                                                className="btn-primary gap-2"
                                            >
                                                <Eye size={16} /> View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar size={40} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h2>
                        <p className="text-gray-600 mb-6">
                            {filter === 'all'
                                ? "You haven't made any bookings yet."
                                : `No ${filter} bookings found.`}
                        </p>
                        <Link to="/tours" className="btn-primary">
                            Explore Tours
                        </Link>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
