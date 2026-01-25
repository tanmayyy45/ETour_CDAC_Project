import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Package, DollarSign, Upload, Users,
    TrendingUp, Calendar, CreditCard, ArrowRight, BarChart3
} from 'lucide-react';
import { bookingAPI, tourAPI } from '../../services/api';

const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Tours', path: '/admin/tours', icon: Package },
    { name: 'Manage Costs', path: '/admin/costs', icon: DollarSign },
    { name: 'Upload Excel', path: '/admin/upload', icon: Upload },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        totalTours: 0,
        pendingBookings: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            setIsLoading(true);
            try {
                const [bookingsRes, toursRes] = await Promise.allSettled([
                    bookingAPI.getAllBookings(),
                    tourAPI.getAllTours(),
                ]);

                let bookings = [];
                let tours = [];

                if (bookingsRes.status === 'fulfilled' && bookingsRes.value.data) {
                    bookings = Array.isArray(bookingsRes.value.data) ? bookingsRes.value.data : [];
                }
                if (toursRes.status === 'fulfilled' && toursRes.value.data) {
                    tours = Array.isArray(toursRes.value.data) ? toursRes.value.data : [];
                }

                // Calculate stats
                const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
                const pendingBookings = bookings.filter(b => b.status?.toLowerCase() === 'pending').length;

                setStats({
                    totalBookings: bookings.length,
                    totalRevenue,
                    totalTours: tours.length,
                    pendingBookings,
                });

                // Get recent bookings (last 5)
                setRecentBookings(bookings.slice(0, 5));
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const statCards = [
        { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'blue' },
        { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'green' },
        { label: 'Active Tours', value: stats.totalTours, icon: Package, color: 'purple' },
        { label: 'Pending Bookings', value: stats.pendingBookings, icon: CreditCard, color: 'orange' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 min-h-screen bg-gradient-dark text-white">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-xl font-bold">E</span>
                            </div>
                            <div>
                                <h1 className="font-bold">ETour Admin</h1>
                                <p className="text-xs text-white/60">Management Panel</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.path === '/admin'
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-white/10">
                        <Link to="/home" className="text-white/60 hover:text-white text-sm flex items-center gap-2">
                            <ArrowRight size={16} /> Back to Website
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600">Welcome to ETour Admin Panel</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        {statCards.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100`}>
                                        <stat.icon size={24} className={`text-${stat.color}-600`} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : stat.value}</p>
                                <p className="text-gray-500 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Bookings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                            <Link to="/admin/bookings" className="text-blue-600 text-sm font-medium hover:underline">
                                View All
                            </Link>
                        </div>

                        {isLoading ? (
                            <div className="p-6 space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="skeleton h-16 rounded-xl" />
                                ))}
                            </div>
                        ) : recentBookings.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {recentBookings.map((booking, index) => (
                                    <div key={booking.bookingId || index} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Users size={18} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {booking.customerName || 'Customer'} - {booking.tourName || 'Tour'}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {booking.departureDate ? new Date(booking.departureDate).toLocaleDateString('en-IN') : 'N/A'}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {booking.status || 'Pending'}
                                        </span>
                                        <span className="font-bold text-gray-900">
                                            ₹{(booking.totalAmount || 0).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                No bookings found
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
