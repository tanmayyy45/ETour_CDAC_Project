import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin, Plane, Mountain, Heart, Users, Globe,
    Compass, Camera, Sun, ArrowRight, Star, TrendingUp, Clock
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Ticker from '../components/features/Ticker';
import { categoryAPI, tourAPI } from '../services/api';

// Icon mapping for categories from backend
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

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [tours, setTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [catRes, tourRes] = await Promise.allSettled([
                    categoryAPI.getMainCategories(),
                    tourAPI.getAllTours(),
                ]);

                if (catRes.status === 'fulfilled' && catRes.value.data) {
                    setCategories(catRes.value.data);
                } else {
                    console.error('Failed to load categories');
                }

                if (tourRes.status === 'fulfilled' && tourRes.value.data) {
                    setTours(tourRes.value.data.slice(0, 4));
                } else {
                    console.error('Failed to load tours');
                }
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Failed to load data from server');
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-dark" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>

                {/* Navbar */}
                <Navbar />

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                                <TrendingUp size={16} className="text-orange-400" />
                                Your Trusted Travel Partner
                            </span>

                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                Discover Your Next{' '}
                                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                                    Adventure
                                </span>
                            </h1>

                            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
                                Explore incredible destinations with our expertly curated tour packages.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/tours"
                                    className="btn-accent px-8 py-4 text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                                >
                                    Explore Tours <ArrowRight size={20} />
                                </Link>
                                <Link
                                    to="/search"
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                                >
                                    <Globe size={20} />
                                    Search Packages
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
                    >
                        <div className="w-1.5 h-3 bg-white/60 rounded-full" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Ticker */}
            <Ticker />

            {/* Main Sectors Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                            Browse Categories
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Explore Tour Categories
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Choose from our wide range of tour categories
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton h-40 rounded-2xl" />
                            ))}
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {categories.map((category, index) => {
                                const IconComponent = getCategoryIcon(category);
                                return (
                                    <motion.div
                                        key={category.id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={`/sector/${category.categoryId}`}
                                            className="sector-card group block"
                                        >
                                            <div className={`icon bg-gradient-to-br ${getCategoryGradient(category)}`}>
                                                <IconComponent className="w-full h-full text-white" />
                                            </div>
                                            <h3 className="title">{category.categoryName}</h3>
                                            <span className="mt-2 text-sm text-gray-500 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                                                Explore <ArrowRight size={14} />
                                            </span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No categories available. Please check backend connection.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Tours Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                    >
                        <div>
                            <span className="inline-block px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                                Popular Choices
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Featured Tour Packages
                            </h2>
                            <p className="text-lg text-gray-600 max-w-xl">
                                Handpicked tours that travelers love the most
                            </p>
                        </div>
                        <Link
                            to="/tours"
                            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                            View All Tours <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="skeleton h-80 rounded-2xl" />
                            ))}
                        </div>
                    ) : tours.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {tours.map((tour, index) => (
                                <motion.div
                                    key={tour.catmasterId || tour.id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
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
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="flex items-center gap-1 text-gray-500">
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
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-dark text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-medium mb-4">
                            Why ETour India
                        </span>
                        <h2 className="text-4xl font-bold mb-4">
                            Why Travelers Choose Us
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            We go above and beyond to ensure your travel experience is nothing short of exceptional
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🎯',
                                title: 'Curated Experiences',
                                description: 'Every tour is handpicked and designed by travel experts.',
                            },
                            {
                                icon: '💰',
                                title: 'Best Price Guarantee',
                                description: 'We promise the most competitive prices.',
                            },
                            {
                                icon: '🛡️',
                                title: 'Safe & Secure',
                                description: 'Your safety is our priority.',
                            },
                            {
                                icon: '📞',
                                title: '24/7 Support',
                                description: 'Our support team is available round the clock.',
                            },
                            {
                                icon: '✨',
                                title: 'Flexible Booking',
                                description: 'Free cancellation on most bookings.',
                            },
                            {
                                icon: '🏆',
                                title: 'Award Winning',
                                description: 'Top tour operator for 5 consecutive years.',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-white/70">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Join satisfied travelers who have explored the world with us
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/tours"
                                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                Browse All Tours <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
