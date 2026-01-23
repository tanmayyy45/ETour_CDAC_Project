import { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { PageLayout } from '../components/layout';
import { CustomerForm, PassengerForm } from '../components/forms';

const BookingPage = () => {
    const { tourId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const departureDate = searchParams.get('date') || '2026-02-15';

    const [step, setStep] = useState(1); // 1: Customer, 2: Passengers, 3: Summary
    const [customerData, setCustomerData] = useState(null);
    const [passengers, setPassengers] = useState([{ id: 1 }]);
    const [passengerData, setPassengerData] = useState({});

    // Sample tour data - will be replaced by API calls
    const tour = {
        id: tourId,
        title: 'Kashmir Paradise Explorer',
        tourCode: 'KSM-001',
        location: 'Srinagar, Kashmir',
        duration: '6N/7D',
        departureDate: departureDate,
        prices: {
            Adult: 25000,
            Child: 18000,
            Infant: 8000,
            Senior: 22000,
        },
    };

    const handleCustomerSubmit = (data) => {
        setCustomerData(data);
        setStep(2);
    };

    const handlePassengerDataChange = (passengerId, data) => {
        setPassengerData(prev => ({ ...prev, [passengerId]: data }));
    };

    const addPassenger = () => {
        setPassengers(prev => [...prev, { id: Date.now() }]);
    };

    const removePassenger = (id) => {
        if (passengers.length > 1) {
            setPassengers(prev => prev.filter(p => p.id !== id));
            setPassengerData(prev => {
                const newData = { ...prev };
                delete newData[id];
                return newData;
            });
        }
    };

    const calculateTotal = () => {
        let total = 0;
        Object.values(passengerData).forEach(p => {
            if (p.passengerType && tour.prices[p.passengerType]) {
                total += tour.prices[p.passengerType];
            }
        });
        return total;
    };

    const handleProceedToSummary = () => {
        // Validate all passengers have data
        if (Object.keys(passengerData).length === passengers.length) {
            setStep(3);
        }
    };

    const handlePayment = () => {
        // Placeholder for payment gateway integration
        alert('Redirecting to payment gateway...\n\nNote: This is a placeholder. In the actual implementation, this will redirect to a real payment gateway.');
        // After successful payment, would generate order number and redirect
        // navigate('/booking-confirmation/ORDER123');
    };

    return (
        <PageLayout>
            <div className="booking-page">
                {/* Header */}
                <section className="booking-header">
                    <div className="container">
                        <h1>Book Your Tour</h1>
                        <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                            {tour.title} | {tour.tourCode}
                        </p>
                    </div>
                </section>

                <section className="booking-content">
                    <div className="container">
                        {/* Progress Steps */}
                        <div className="flex justify-center mb-8">
                            {[
                                { num: 1, label: 'Customer Details' },
                                { num: 2, label: 'Passenger Details' },
                                { num: 3, label: 'Review & Pay' },
                            ].map((s, index) => (
                                <div key={s.num} className="flex items-center">
                                    <div className={`flex items-center gap-2 ${step >= s.num ? 'text-primary' : 'text-tertiary'}`}>
                                        <span style={{
                                            width: '32px',
                                            height: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            background: step >= s.num ? 'var(--primary-500)' : 'var(--gray-200)',
                                            color: step >= s.num ? 'white' : 'var(--gray-500)',
                                            fontWeight: '600',
                                        }}>
                                            {step > s.num ? '✓' : s.num}
                                        </span>
                                        <span className="hide-mobile">{s.label}</span>
                                    </div>
                                    {index < 2 && (
                                        <div style={{
                                            width: '60px',
                                            height: '2px',
                                            background: step > s.num ? 'var(--primary-500)' : 'var(--gray-200)',
                                            margin: '0 16px',
                                        }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="booking-grid">
                            {/* Main Form Area */}
                            <div>
                                {step === 1 && (
                                    <div className="booking-form-card">
                                        <h2 className="booking-form-title">Primary Customer Details</h2>
                                        <CustomerForm
                                            initialData={customerData || {}}
                                            onSubmit={handleCustomerSubmit}
                                        />
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="booking-form-card">
                                        <h2 className="booking-form-title">Passenger Details</h2>
                                        <p className="text-tertiary mb-6">
                                            Tour: <strong>{tour.tourCode}</strong> - {tour.title}<br />
                                            Departure: <strong>{new Date(departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                                        </p>

                                        {passengers.map((passenger, index) => (
                                            <PassengerForm
                                                key={passenger.id}
                                                passengerNumber={index + 1}
                                                initialData={passengerData[passenger.id] || {}}
                                                departureDate={departureDate}
                                                onDataChange={(data) => handlePassengerDataChange(passenger.id, data)}
                                                onRemove={() => removePassenger(passenger.id)}
                                                canRemove={passengers.length > 1}
                                            />
                                        ))}

                                        <button
                                            type="button"
                                            className="add-passenger-btn mb-6"
                                            onClick={addPassenger}
                                        >
                                            + Add Another Passenger
                                        </button>

                                        <div className="flex gap-4 justify-between">
                                            <button
                                                type="button"
                                                className="btn btn-ghost"
                                                onClick={() => setStep(1)}
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={handleProceedToSummary}
                                            >
                                                Continue to Summary
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="booking-form-card">
                                        <h2 className="booking-form-title">Review & Confirm</h2>

                                        {/* Customer Summary */}
                                        <div className="card p-4 mb-4" style={{ background: 'var(--bg-tertiary)' }}>
                                            <h4 className="mb-3">Customer Information</h4>
                                            <div className="grid grid-cols-2 gap-2" style={{ fontSize: 'var(--font-size-sm)' }}>
                                                <div><strong>Name:</strong> {customerData?.name}</div>
                                                <div><strong>Email:</strong> {customerData?.email}</div>
                                                <div><strong>Mobile:</strong> {customerData?.mobileNumber}</div>
                                                <div><strong>City:</strong> {customerData?.city}, {customerData?.state}</div>
                                            </div>
                                        </div>

                                        {/* Passengers Summary */}
                                        <div className="card p-4 mb-4" style={{ background: 'var(--bg-tertiary)' }}>
                                            <h4 className="mb-3">Passengers ({passengers.length})</h4>
                                            <table className="cost-table" style={{ fontSize: 'var(--font-size-sm)' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Age</th>
                                                        <th>Type</th>
                                                        <th>Cost</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {passengers.map((p) => {
                                                        const data = passengerData[p.id] || {};
                                                        return (
                                                            <tr key={p.id}>
                                                                <td>{data.name || '-'}</td>
                                                                <td>{data.age || '-'}</td>
                                                                <td>
                                                                    <span className="badge badge-primary">{data.passengerType || '-'}</span>
                                                                </td>
                                                                <td>₹{(tour.prices[data.passengerType] || 0).toLocaleString()}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="flex gap-4 justify-between">
                                            <button
                                                type="button"
                                                className="btn btn-ghost"
                                                onClick={() => setStep(2)}
                                            >
                                                ← Back
                                            </button>
                                            <div className="flex gap-4">
                                                <Link to={`/tour/${tourId}`} className="btn btn-outline">
                                                    Cancel
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-lg"
                                                    onClick={handlePayment}
                                                >
                                                    Pay ₹{calculateTotal().toLocaleString()}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Booking Summary Sidebar */}
                            <div>
                                <div className="booking-summary-card">
                                    <div className="summary-tour-info">
                                        <p className="summary-tour-name">{tour.title}</p>
                                        <p className="summary-tour-date">
                                            {new Date(departureDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>

                                    <div className="summary-row">
                                        <span className="summary-row-label">Tour Code</span>
                                        <span className="summary-row-value">{tour.tourCode}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-row-label">Duration</span>
                                        <span className="summary-row-value">{tour.duration}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-row-label">Passengers</span>
                                        <span className="summary-row-value">{passengers.length}</span>
                                    </div>

                                    {Object.keys(passengerData).length > 0 && (
                                        <>
                                            <div style={{ borderTop: '1px solid var(--gray-200)', margin: 'var(--spacing-4) 0' }} />
                                            {Object.values(passengerData).map((p, index) => (
                                                <div key={index} className="summary-row">
                                                    <span className="summary-row-label">{p.passengerType} {index + 1}</span>
                                                    <span className="summary-row-value">₹{(tour.prices[p.passengerType] || 0).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    <div className="summary-total">
                                        <span>Total Amount</span>
                                        <span className="summary-total-value">₹{calculateTotal().toLocaleString()}</span>
                                    </div>

                                    <div className="alert alert-info mt-4" style={{ fontSize: 'var(--font-size-xs)' }}>
                                        <strong>Note:</strong> Prices are inclusive of accommodation, meals (as per plan), sightseeing, and transfers.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default BookingPage;
