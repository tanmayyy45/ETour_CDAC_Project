import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar, MapPin, Users, CreditCard, CheckCircle, Clock,
    Download, ArrowLeft, Phone, Mail, User, Bed
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { bookingAPI, paymentAPI } from '../services/api';
import { useApp } from '../context/AppContext';

export default function BookingDetailsPage() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const { user } = useApp();
    const [booking, setBooking] = useState(null);
    const [payment, setPayment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const loadBookingDetails = async () => {
            setIsLoading(true);
            try {
                const [bookingRes, paymentRes] = await Promise.allSettled([
                    bookingAPI.getBookingById(bookingId),
                    paymentAPI.getPaymentStatus(bookingId),
                ]);

                if (bookingRes.status === 'fulfilled' && bookingRes.value.data) {
                    setBooking(bookingRes.value.data);
                } else {
                    setError('Booking not found');
                }

                if (paymentRes.status === 'fulfilled' && paymentRes.value.data) {
                    setPayment(paymentRes.value.data);
                }
            } catch (err) {
                console.error('Error loading booking details:', err);
                setError('Failed to load booking details');
            } finally {
                setIsLoading(false);
            }
        };

        loadBookingDetails();
    }, [bookingId, user, navigate]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'completed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (!user) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="skeleton h-48 rounded-2xl mb-6" />
                        <div className="skeleton h-96 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
                    <p className="text-gray-600 mb-8">{error || 'The booking you\'re looking for doesn\'t exist.'}</p>
                    <Link to="/my-bookings" className="btn-primary">View All Bookings</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative h-64 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div>
                        <Link
                            to="/my-bookings"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
                        >
                            <ArrowLeft size={18} /> Back to My Bookings
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-2">Booking Details</h1>
                        <p className="text-white/80">Order #{booking.bookingId || booking.id}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Status Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-2xl border-2 p-6 ${getStatusColor(booking.status)}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <CheckCircle size={32} />
                                <div>
                                    <h2 className="text-xl font-bold">Booking {booking.status || 'Pending'}</h2>
                                    <p className="text-sm opacity-80">
                                        Booked on {new Date(booking.bookingDate || booking.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                                <Download size={16} /> Download
                            </button>
                        </div>
                    </motion.div>

                    {/* Tour Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Tour Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex gap-6">
                                {booking.tourImage || booking.tour?.thumbnailPath ? (
                                    <img
                                        src={booking.tourImage || booking.tour?.thumbnailPath}
                                        alt={booking.tourName || booking.tour?.tourName}
                                        className="w-32 h-32 rounded-xl object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                ) : null}

                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                                        {booking.tourName || booking.tour?.tourName || 'Tour Package'}
                                    </h4>
                                    <p className="text-gray-500 text-sm mb-4">
                                        {booking.tourCode || booking.tour?.tourCode || ''}
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar size={18} className="text-blue-500" />
                                            <div>
                                                <p className="text-xs text-gray-400">Departure</p>
                                                <p className="font-medium">
                                                    {booking.departureDate
                                                        ? new Date(booking.departureDate).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })
                                                        : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Clock size={18} className="text-green-500" />
                                            <div>
                                                <p className="text-xs text-gray-400">Duration</p>
                                                <p className="font-medium">{booking.duration || booking.tour?.duration || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Bed size={18} className="text-purple-500" />
                                            <div>
                                                <p className="text-xs text-gray-400">Room Type</p>
                                                <p className="font-medium">{booking.roomPreference || 'AUTO'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Users size={18} className="text-orange-500" />
                                            <div>
                                                <p className="text-xs text-gray-400">Travelers</p>
                                                <p className="font-medium">{booking.passengerCount || booking.passengers?.length || 1}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Passengers */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Passengers</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {booking.passengers && booking.passengers.length > 0 ? (
                                booking.passengers.map((passenger, index) => (
                                    <div key={passenger.passengerId || index} className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User size={18} className="text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{passenger.name}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{passenger.sex === 'M' ? 'Male' : passenger.sex === 'F' ? 'Female' : 'Other'}</span>
                                                {passenger.birthDate && (
                                                    <span>DOB: {new Date(passenger.birthDate).toLocaleDateString('en-IN')}</span>
                                                )}
                                            </div>
                                        </div>
                                        <span className="badge badge-primary">{passenger.type || 'Adult'}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-gray-500">
                                    No passenger details available
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Person */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Contact Person</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <User size={18} className="text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Name</p>
                                        <p className="font-medium text-gray-900">
                                            {booking.customerName || booking.customer?.name || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Email</p>
                                        <p className="font-medium text-gray-900">
                                            {booking.customerEmail || booking.customer?.email || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={18} className="text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Mobile</p>
                                        <p className="font-medium text-gray-900">
                                            {booking.customerMobile || booking.customer?.mobileNumber || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Payment Summary</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tour Amount</span>
                                    <span>₹{(booking.tourAmount || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (GST)</span>
                                    <span>₹{(booking.taxAmount || 0).toLocaleString()}</span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total Amount</span>
                                    <span className="text-blue-600">₹{(booking.totalAmount || 0).toLocaleString()}</span>
                                </div>
                            </div>

                            {payment && (
                                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100">
                                    <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                                        <CheckCircle size={18} />
                                        Payment Received
                                    </div>
                                    <div className="text-sm text-green-600">
                                        <p>Transaction ID: {payment.transactionId || payment.id}</p>
                                        <p>Payment Method: {payment.paymentMethod || 'Online'}</p>
                                        <p>Date: {new Date(payment.paymentDate || payment.createdAt).toLocaleDateString('en-IN')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
