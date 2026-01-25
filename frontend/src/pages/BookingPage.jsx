import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User, Users, Calendar, CreditCard, CheckCircle,
    Plus, Trash2, ArrowLeft, ArrowRight, Download,
    Clock, AlertTriangle
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useApp } from '../context/AppContext';
import { bookingAPI, tourAPI, customerAPI, departureAPI, paymentAPI } from '../services/api';

const steps = [
    { id: 1, title: 'Customer Details', icon: User },
    { id: 2, title: 'Passengers', icon: Users },
    { id: 3, title: 'Review', icon: CheckCircle },
    { id: 4, title: 'Payment', icon: CreditCard },
];

export default function BookingPage() {
    const { tourId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dateId = searchParams.get('date');

    const { user } = useApp();
    const [currentStep, setCurrentStep] = useState(1);
    const [tour, setTour] = useState(null);
    const [departureDates, setDepartureDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [error, setError] = useState(null);

    // Form State
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        city: '',
        state: '',
    });

    const [passengers, setPassengers] = useState([
        { name: '', birthDate: '', sex: 'M', type: 'Adult', price: 0 },
    ]);

    const [errors, setErrors] = useState({});

    // Pre-fill customer data if logged in
    useEffect(() => {
        if (user) {
            setCustomer(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                mobileNumber: user.mobileNumber || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
            }));
        }
    }, [user]);

    useEffect(() => {
        const loadTourDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [tourRes, dateRes] = await Promise.allSettled([
                    tourAPI.getTourById(tourId),
                    departureAPI.getByCategory(tourId),
                ]);

                if (tourRes.status === 'fulfilled' && tourRes.value.data) {
                    setTour(tourRes.value.data);
                    // Set default passenger price
                    setPassengers([{
                        name: '',
                        birthDate: '',
                        sex: 'M',
                        type: 'Adult',
                        price: tourRes.value.data.startingCost || 0,
                    }]);
                } else {
                    setError('Tour not found');
                }

                if (dateRes.status === 'fulfilled' && dateRes.value.data) {
                    const dates = Array.isArray(dateRes.value.data) ? dateRes.value.data : [];
                    setDepartureDates(dates);

                    // Pre-select date if passed in URL
                    if (dateId && dates.length > 0) {
                        const preselected = dates.find(d => d.departureDateId == dateId || d.id == dateId);
                        if (preselected) setSelectedDate(preselected);
                    }
                }
            } catch (err) {
                console.error('Error loading tour:', err);
                setError('Failed to load tour details');
            } finally {
                setIsLoading(false);
            }
        };

        loadTourDetails();
    }, [tourId, dateId]);

    // Calculate age and passenger type
    const calculateAge = (birthDate) => {
        if (!birthDate || !selectedDate?.departureDate) return 0;
        const departure = new Date(selectedDate.departureDate);
        const birth = new Date(birthDate);
        let age = departure.getFullYear() - birth.getFullYear();
        const monthDiff = departure.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && departure.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const getPassengerType = (age) => {
        const basePrice = tour?.startingCost || 0;
        if (age < 2) return { type: 'Infant', price: 0 };
        if (age < 5) return { type: 'Child (No Bed)', price: Math.round(basePrice * 0.4) };
        if (age < 12) return { type: 'Child', price: Math.round(basePrice * 0.7) };
        return { type: 'Adult', price: basePrice };
    };

    const handlePassengerChange = (index, field, value) => {
        const updated = [...passengers];
        updated[index][field] = value;

        if (field === 'birthDate') {
            const age = calculateAge(value);
            const { type, price } = getPassengerType(age);
            updated[index].type = type;
            updated[index].price = price;
            updated[index].age = age;
        }

        setPassengers(updated);
    };

    const addPassenger = () => {
        setPassengers([
            ...passengers,
            { name: '', birthDate: '', sex: 'M', type: 'Adult', price: tour?.startingCost || 0 },
        ]);
    };

    const removePassenger = (index) => {
        if (passengers.length > 1) {
            setPassengers(passengers.filter((_, i) => i !== index));
        }
    };

    const totalAmount = passengers.reduce((sum, p) => sum + (p.price || 0), 0);
    const taxAmount = Math.round(totalAmount * 0.05); // 5% GST
    const grandTotal = totalAmount + taxAmount;

    const validateCustomer = () => {
        const newErrors = {};
        if (!customer.name.trim()) newErrors.name = 'Name is required';
        if (!customer.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
        if (!customer.mobileNumber.match(/^[6-9]\d{9}$/)) newErrors.mobileNumber = 'Valid 10-digit mobile number required';
        if (!customer.address.trim()) newErrors.address = 'Address is required';
        if (!customer.city.trim()) newErrors.city = 'City is required';
        if (!customer.state.trim()) newErrors.state = 'State is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassengers = () => {
        const newErrors = {};
        passengers.forEach((p, i) => {
            if (!p.name.trim()) newErrors[`passenger_${i}_name`] = 'Name required';
            if (!p.birthDate) newErrors[`passenger_${i}_birthDate`] = 'Birth date required';
        });
        if (!selectedDate) newErrors.date = 'Please select a departure date';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && !validateCustomer()) return;
        if (currentStep === 2 && !validatePassengers()) return;
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            let customerId;

            if (user) {
                // Use logged-in user's ID
                customerId = user.id || user.customerId;
            } else {
                // Create customer first (Guest checkout)
                const customerRes = await customerAPI.register(customer);
                customerId = customerRes.data?.id || customerRes.data?.customerId;
            }

            // Create booking
            const bookingData = {
                customerId,
                tourId: parseInt(tourId),
                departureDateId: selectedDate?.departureDateId || selectedDate?.id,
                passengers: passengers.map(p => ({
                    name: p.name,
                    birthDate: p.birthDate,
                    sex: p.sex,
                })),
                tourAmount: totalAmount,
                taxAmount,
                totalAmount: grandTotal,
            };

            const bookingRes = await bookingAPI.createBooking(bookingData);
            const bookingId = bookingRes.data?.id || bookingRes.data?.bookingId;

            // 3. Record Payment
            try {
                // Mock payment details since we don't have a real gateway
                const paymentData = {
                    bookingId: bookingId,
                    amount: grandTotal,
                    paymentDate: new Date().toISOString(),
                    paymentMode: 'Credit Card', // Default or from form state if you add it
                    transactionId: 'TXN' + Date.now(),
                    status: 'Success'
                };
                await paymentAPI.addPayment(paymentData);
            } catch (err) {
                console.warn('Payment recording failed but booking created:', err);
            }

            setOrderNumber('ET' + bookingId?.toString().padStart(8, '0'));
            setBookingComplete(true);
        } catch (err) {
            console.error('Booking error:', err);
            setError('Failed to process booking. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Loading state
    if (isLoading && !tour) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="skeleton h-20 rounded-2xl mb-8" />
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 skeleton h-96 rounded-2xl" />
                        <div className="skeleton h-64 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !tour) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Error</h1>
                    <p className="text-gray-600 mb-8">{error}</p>
                    <button onClick={() => navigate('/tours')} className="btn-primary">
                        Browse Tours
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    // Booking Complete Screen
    if (bookingComplete) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                        <p className="text-gray-600 mb-6">Thank you for booking with ETour India</p>

                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                            <p className="text-gray-500 text-sm">Order Number</p>
                            <p className="text-2xl font-bold text-blue-600">{orderNumber}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-left mb-8">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Tour</p>
                                <p className="font-semibold text-gray-900">{tour?.tourName}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Passengers</p>
                                <p className="font-semibold text-gray-900">{passengers.length} Traveler(s)</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Total Paid</p>
                                <p className="font-semibold text-green-600">₹{grandTotal.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Departure</p>
                                <p className="font-semibold text-gray-900">
                                    {selectedDate?.departureDate ? new Date(selectedDate.departureDate).toLocaleDateString('en-IN') : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="btn-primary flex-1 gap-2">
                                <Download size={18} /> Download Receipt
                            </button>
                            <button
                                onClick={() => navigate('/home')}
                                className="btn-secondary flex-1"
                            >
                                Back to Home
                            </button>
                        </div>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative h-48 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Book Your Tour</h1>
                        <p className="text-white/80">{tour?.tourName}</p>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between py-4 md:py-0">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 relative ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep > step.id
                                    ? 'bg-green-500 text-white'
                                    : currentStep === step.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {currentStep > step.id ? '✓' : step.id}
                                </div>
                                <span className="hidden md:block font-medium">{step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Form Area */}
                    <main className="flex-1">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
                        >
                            {/* Step 1: Customer Details */}
                            {currentStep === 1 && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Details</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                value={customer.name}
                                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                                className={`input ${errors.name ? 'border-red-500' : ''}`}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                value={customer.email}
                                                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                                                className={`input ${errors.email ? 'border-red-500' : ''}`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                                            <input
                                                type="tel"
                                                value={customer.mobileNumber}
                                                onChange={(e) => setCustomer({ ...customer, mobileNumber: e.target.value })}
                                                className={`input ${errors.mobileNumber ? 'border-red-500' : ''}`}
                                                placeholder="9876543210"
                                            />
                                            {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                            <input
                                                type="text"
                                                value={customer.city}
                                                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                                                className={`input ${errors.city ? 'border-red-500' : ''}`}
                                                placeholder="Mumbai"
                                            />
                                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                            <input
                                                type="text"
                                                value={customer.state}
                                                onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                                                className={`input ${errors.state ? 'border-red-500' : ''}`}
                                                placeholder="Maharashtra"
                                            />
                                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                                            <textarea
                                                value={customer.address}
                                                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                                className={`input min-h-[100px] ${errors.address ? 'border-red-500' : ''}`}
                                                placeholder="123 Street Name, Area"
                                            />
                                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Step 2: Passenger Details */}
                            {currentStep === 2 && (
                                <>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Passenger Details</h2>
                                        <button onClick={addPassenger} className="btn-secondary gap-2">
                                            <Plus size={18} /> Add Passenger
                                        </button>
                                    </div>

                                    {/* Select Departure Date */}
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle size={20} className="text-blue-600 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-semibold text-blue-800">Tour: {tour?.tourCode} - {tour?.tourName}</p>
                                                <p className="text-blue-700 text-sm mt-1">Select a departure date:</p>
                                                {departureDates.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {departureDates.map((date) => (
                                                            <button
                                                                key={date.departureDateId || date.id}
                                                                onClick={() => setSelectedDate(date)}
                                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDate?.departureDateId === date.departureDateId || selectedDate?.id === date.id
                                                                    ? 'bg-blue-600 text-white'
                                                                    : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-100'
                                                                    }`}
                                                            >
                                                                {new Date(date.departureDate).toLocaleDateString('en-IN', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-blue-600 text-sm mt-1">No departure dates available</p>
                                                )}
                                                {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {passengers.map((passenger, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="border border-gray-200 rounded-xl p-5"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-gray-900">Passenger {index + 1}</h3>
                                                    {passengers.length > 1 && (
                                                        <button
                                                            onClick={() => removePassenger(index)}
                                                            className="text-red-500 hover:text-red-600 p-1"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid md:grid-cols-4 gap-4">
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                                        <input
                                                            type="text"
                                                            value={passenger.name}
                                                            onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                                            className="input"
                                                            placeholder="As per ID proof"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date *</label>
                                                        <input
                                                            type="date"
                                                            value={passenger.birthDate}
                                                            onChange={(e) => handlePassengerChange(index, 'birthDate', e.target.value)}
                                                            className="input"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sex *</label>
                                                        <select
                                                            value={passenger.sex}
                                                            onChange={(e) => handlePassengerChange(index, 'sex', e.target.value)}
                                                            className="input"
                                                        >
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>
                                                            <option value="O">Other</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                {passenger.birthDate && (
                                                    <div className="mt-4 flex items-center gap-4 text-sm">
                                                        <span className="text-gray-600">Age: <strong>{passenger.age || 0} yrs</strong></span>
                                                        <span className={`badge ${passenger.type === 'Adult' ? 'badge-primary' :
                                                            passenger.type === 'Child' ? 'badge-accent' :
                                                                'badge-success'
                                                            }`}>
                                                            {passenger.type}
                                                        </span>
                                                        <span className="text-gray-900 font-semibold">
                                                            {passenger.price === 0 ? 'FREE' : `₹${passenger.price.toLocaleString()}`}
                                                        </span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Step 3: Review */}
                            {currentStep === 3 && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Booking</h2>

                                    <div className="space-y-6">
                                        {/* Tour Info */}
                                        <div className="bg-gray-50 rounded-xl p-5">
                                            <h3 className="font-semibold text-gray-900 mb-3">Tour Details</h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Tour</p>
                                                    <p className="font-medium text-gray-900">{tour?.tourName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Duration</p>
                                                    <p className="font-medium text-gray-900">{tour?.duration || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Departure Date</p>
                                                    <p className="font-medium text-gray-900">
                                                        {selectedDate?.departureDate ? new Date(selectedDate.departureDate).toLocaleDateString('en-IN', {
                                                            weekday: 'long',
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        }) : 'Not selected'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customer Info */}
                                        <div className="bg-gray-50 rounded-xl p-5">
                                            <h3 className="font-semibold text-gray-900 mb-3">Contact Person</h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Name</p>
                                                    <p className="font-medium text-gray-900">{customer.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Email</p>
                                                    <p className="font-medium text-gray-900">{customer.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Mobile</p>
                                                    <p className="font-medium text-gray-900">{customer.mobileNumber}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Address</p>
                                                    <p className="font-medium text-gray-900">{customer.city}, {customer.state}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Passengers */}
                                        <div className="bg-gray-50 rounded-xl p-5">
                                            <h3 className="font-semibold text-gray-900 mb-3">Passengers ({passengers.length})</h3>
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="text-left py-2 text-gray-600">Name</th>
                                                        <th className="text-center py-2 text-gray-600">Type</th>
                                                        <th className="text-right py-2 text-gray-600">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {passengers.map((p, i) => (
                                                        <tr key={i} className="border-b border-gray-100">
                                                            <td className="py-2 font-medium text-gray-900">{p.name || `Passenger ${i + 1}`}</td>
                                                            <td className="py-2 text-center">
                                                                <span className="badge badge-primary">{p.type}</span>
                                                            </td>
                                                            <td className="py-2 text-right font-medium text-gray-900">
                                                                {p.price === 0 ? 'FREE' : `₹${p.price.toLocaleString()}`}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Step 4: Payment */}
                            {currentStep === 4 && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>

                                    <div className="space-y-4 mb-8">
                                        {/* Payment Methods */}
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {['Credit/Debit Card', 'Net Banking', 'UPI'].map((method, i) => (
                                                <label key={i} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                                                    <input type="radio" name="payment" defaultChecked={i === 0} className="w-4 h-4 text-blue-600" />
                                                    <span className="font-medium text-gray-900">{method}</span>
                                                </label>
                                            ))}
                                        </div>

                                        {/* Card Form (placeholder) */}
                                        <div className="border border-gray-200 rounded-xl p-6">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                                    <input type="text" className="input" placeholder="1234 5678 9012 3456" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                                                    <input type="text" className="input" placeholder="MM/YY" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                                    <input type="text" className="input" placeholder="123" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                                                    <input type="text" className="input" placeholder="JOHN DOE" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 1}
                                    className="btn-secondary gap-2 disabled:opacity-50"
                                >
                                    <ArrowLeft size={18} /> Back
                                </button>

                                {currentStep < 4 ? (
                                    <button onClick={handleNext} className="btn-primary gap-2">
                                        Next <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handlePayment}
                                        disabled={isLoading}
                                        className="btn-accent px-8 py-4 text-lg gap-2"
                                    >
                                        {isLoading ? 'Processing...' : `Pay ₹${grandTotal.toLocaleString()}`}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </main>

                    {/* Order Summary Sidebar */}
                    <aside className="lg:w-80 shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h3>

                            {tour && (
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                                    {tour.thumbnailPath && (
                                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                                            <img
                                                src={tour.thumbnailPath}
                                                alt={tour.tourName}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">{tour.tourName}</h4>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Clock size={12} /> {tour.duration || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2 text-sm mb-4">
                                {passengers.map((p, i) => (
                                    <div key={i} className="flex justify-between text-gray-600">
                                        <span>{p.name || `Passenger ${i + 1}`} ({p.type})</span>
                                        <span>{p.price === 0 ? 'FREE' : `₹${p.price.toLocaleString()}`}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 pt-4 border-t border-gray-100 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>GST (5%)</span>
                                    <span>₹{taxAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                                <span className="font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-blue-600">₹{grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    );
}
