import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useApp } from '../context/AppContext';

const contactInfo = [
    { icon: MapPin, title: 'Head Office', value: '123 Travel Street, Andheri West, Mumbai, Maharashtra 400058' },
    { icon: Phone, title: 'Phone', value: '+91 22 1234 5678' },
    { icon: Mail, title: 'Email', value: 'info@etourindia.com' },
    { icon: Clock, title: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 7:00 PM' },
];

const branches = [
    { city: 'Mumbai', address: '123 Travel Street, Andheri West', phone: '+91 22 1234 5678' },
    { city: 'Delhi', address: '456 Tours Plaza, Connaught Place', phone: '+91 11 9876 5432' },
    { city: 'Bangalore', address: '789 Holiday Road, MG Road', phone: '+91 80 5555 1234' },
    { city: 'Chennai', address: '321 Trip Avenue, T Nagar', phone: '+91 44 4444 5678' },
];

export default function ContactPage() {
    const { companyInfo } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative h-64 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
                        <p className="text-white/80">We'd love to hear from you. Get in touch with us.</p>
                    </div>
                </div>
            </div>

            {/* Contact Info Cards */}
            <section className="py-12 -mt-8 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-6">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg p-6 hover-lift"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <item.icon size={24} className="text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg p-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <MessageSquare size={24} className="text-orange-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                                    <p className="text-gray-500 text-sm">Fill out the form and we'll get back to you</p>
                                </div>
                            </div>

                            {isSubmitted && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                                    <p className="text-green-800 font-medium">
                                        ✓ Thank you! Your message has been sent successfully.
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="input"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="input"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="input"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="input"
                                            placeholder="Tour Inquiry"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="input resize-none"
                                        placeholder="Tell us about your travel plans..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-accent w-full py-4 text-lg gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <Send size={18} /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Map & Branches */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500">Interactive map would be displayed here</p>
                                        <p className="text-gray-400 text-sm mt-2">Mumbai, Maharashtra, India</p>
                                    </div>
                                </div>
                            </div>

                            {/* Branch Offices */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Branches</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {branches.map((branch, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                                            <h4 className="font-semibold text-gray-900">{branch.city}</h4>
                                            <p className="text-gray-600 text-sm mt-1">{branch.address}</p>
                                            <p className="text-blue-600 text-sm mt-2">{branch.phone}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
