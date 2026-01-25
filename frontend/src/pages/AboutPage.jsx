import { motion } from 'framer-motion';
import { Award, Users, Globe, Shield, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const stats = [
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '50K+', label: 'Happy Travelers', icon: Users },
    { value: '100+', label: 'Destinations', icon: Globe },
    { value: '24/7', label: 'Customer Support', icon: Shield },
];

const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
    { name: 'Priya Sharma', role: 'Operations Head', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
    { name: 'Amit Singh', role: 'Tour Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
    { name: 'Sneha Patel', role: 'Customer Relations', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-5xl font-bold text-white mb-4">About ETour India</h1>
                        <p className="text-xl text-white/80">
                            Your trusted travel partner since 2010. Creating unforgettable journeys
                            and memories that last a lifetime.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                                Our Story
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Crafting Dream Vacations Since 2010
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    ETour India was founded with a simple mission: to make travel accessible,
                                    enjoyable, and memorable for everyone. What started as a small travel agency
                                    in Mumbai has grown into one of India's most trusted tour operators.
                                </p>
                                <p>
                                    Over the years, we've helped more than 50,000 travelers explore the
                                    magnificent landscapes of India and beyond. From the snow-capped peaks
                                    of Kashmir to the tropical beaches of Goa, we've curated experiences
                                    that showcase the best of every destination.
                                </p>
                                <p>
                                    Our team of experienced travel experts personally scouts each destination
                                    to ensure we offer only the finest accommodations, the most scenic routes,
                                    and the most authentic experiences to our valued customers.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600"
                                alt="Travel"
                                className="rounded-2xl shadow-xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                                <p className="text-4xl font-bold text-blue-600">15+</p>
                                <p className="text-gray-600">Years of Excellence</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-dark">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <stat.icon size={28} className="text-orange-400" />
                                </div>
                                <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                                <p className="text-white/70">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-blue-50 p-8 rounded-2xl"
                        >
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
                            <p className="text-blue-800 leading-relaxed">
                                To provide exceptional travel experiences that exceed expectations,
                                while making quality tourism accessible to all. We strive to create
                                journeys that inspire, educate, and transform our travelers.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-orange-50 p-8 rounded-2xl"
                        >
                            <h3 className="text-2xl font-bold text-orange-900 mb-4">Our Vision</h3>
                            <p className="text-orange-800 leading-relaxed">
                                To become India's most loved travel company, known for innovative
                                tour packages, exceptional service, and sustainable tourism practices
                                that benefit local communities and preserve natural wonders.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                            Our Team
                        </span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet the Experts</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our passionate team of travel enthusiasts is dedicated to making your
                            dream vacation a reality.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6 text-center">
                                    <h4 className="font-bold text-gray-900">{member.name}</h4>
                                    <p className="text-gray-500 text-sm">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
