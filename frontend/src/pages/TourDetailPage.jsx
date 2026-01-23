import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageLayout, Breadcrumb } from '../components/layout';

const TourDetailPage = () => {
    const { tourId } = useParams();
    const [activeTab, setActiveTab] = useState('itinerary');

    // Sample tour data - will be replaced by API calls
    const tour = {
        id: tourId,
        title: 'Kashmir Paradise Explorer',
        location: 'Srinagar, Kashmir',
        duration: '6N/7D',
        price: 25000,
        startDate: '2026-02-15',
        endDate: '2026-02-21',
        rating: 4.8,
        reviewCount: 124,
        description: 'Experience the breathtaking beauty of Kashmir with this comprehensive tour package.',
    };

    const tabs = [
        { id: 'itinerary', label: 'Itinerary' },
        { id: 'cost', label: 'Cost' },
        { id: 'dates', label: 'Dates' },
        { id: 'journey', label: 'Journey' },
        { id: 'stay', label: 'Stay & Meals' },
        { id: 'map', label: 'Map' },
        { id: 'addon', label: 'Add-on' },
        { id: 'visa', label: 'PP/VISA' },
        { id: 'tips', label: "Do's & Don'ts" },
        { id: 'media', label: 'Media' },
        { id: 'terms', label: 'T&C' },
    ];

    const itinerary = [
        { day: 1, title: 'Arrival in Srinagar', content: 'Arrive at Srinagar airport. Transfer to houseboat on Dal Lake. Evening shikara ride. Overnight stay on houseboat.' },
        { day: 2, title: 'Gulmarg Excursion', content: 'Day trip to Gulmarg (2,730m). Gondola ride to Kongdori and Apharwat Peak. Enjoy snow activities. Return to Srinagar.' },
        { day: 3, title: 'Pahalgam Tour', content: 'Drive to Pahalgam (90 km). Visit Betaab Valley, Aru Valley, and Chandanwari. Enjoy the scenic Lidder River. Overnight in Pahalgam.' },
        { day: 4, title: 'Sonmarg Visit', content: 'Drive to Sonmarg (80 km). Visit Thajiwas Glacier. Pony ride available (optional). Return to Srinagar.' },
        { day: 5, title: 'Mughal Gardens', content: 'Visit famous Mughal Gardens - Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Shopping at local handicraft markets.' },
        { day: 6, title: 'Local Sightseeing', content: 'Visit Shankaracharya Temple, Hazratbal Shrine, and local markets. Traditional Kashmiri dinner.' },
        { day: 7, title: 'Departure', content: 'Morning free for last-minute shopping. Transfer to airport for departure.' },
    ];

    const costDetails = [
        { category: 'Adult (Twin Sharing)', price: 25000 },
        { category: 'Adult (Single Occupancy)', price: 32000 },
        { category: 'Child (5-12 years)', price: 18000 },
        { category: 'Child (below 5 years)', price: 8000 },
    ];

    const departureDates = [
        { date: '2026-02-15', status: 'Available', seats: 12 },
        { date: '2026-02-22', status: 'Available', seats: 8 },
        { date: '2026-03-01', status: 'Limited', seats: 3 },
        { date: '2026-03-08', status: 'Sold Out', seats: 0 },
        { date: '2026-03-15', status: 'Available', seats: 15 },
    ];

    const addons = [
        { name: 'Gulmarg Skiing Package', price: 5000 },
        { name: 'Traditional Wazwan Dinner', price: 1500 },
        { name: 'Extended Pahalgam Stay (+1 Night)', price: 4000 },
        { name: 'Photography Session', price: 3000 },
    ];

    const breadcrumbItems = [
        { label: 'Tours', path: '/tours' },
        { label: 'Domestic', path: '/tours/domestic' },
        { label: 'Kashmir', path: '/tours/domestic/kashmir' },
        { label: tour.title, path: `/tour/${tourId}` },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'itinerary':
                return (
                    <div>
                        <h3 className="mb-6">Day-wise Itinerary</h3>
                        {itinerary.map((item) => (
                            <div key={item.day} className="itinerary-day">
                                <div className="itinerary-day-header">
                                    <span className="day-number">{item.day}</span>
                                    <span className="day-title">{item.title}</span>
                                </div>
                                <p className="day-content">{item.content}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'cost':
                return (
                    <div>
                        <h3 className="mb-6">Cost Breakdown</h3>
                        <table className="cost-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Price (per person)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {costDetails.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.category}</td>
                                        <td>₹{item.price.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="alert alert-info mt-4">
                            <strong>Includes:</strong> Accommodation, Breakfast & Dinner, Transfers, Sightseeing, Experienced Guide
                        </div>
                        <div className="alert alert-warning mt-2">
                            <strong>Excludes:</strong> Flights, Lunch, Personal expenses, Entry fees, Optional activities
                        </div>
                    </div>
                );

            case 'dates':
                return (
                    <div>
                        <h3 className="mb-6">Available Departure Dates</h3>
                        <table className="cost-table">
                            <thead>
                                <tr>
                                    <th>Departure Date</th>
                                    <th>Status</th>
                                    <th>Seats Available</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departureDates.map((item, index) => (
                                    <tr key={index}>
                                        <td>{new Date(item.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                        <td>
                                            <span className={`badge ${item.status === 'Available' ? 'badge-success' : item.status === 'Limited' ? 'badge-warning' : 'badge-error'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>{item.seats}</td>
                                        <td>
                                            {item.seats > 0 ? (
                                                <Link to={`/booking/${tourId}?date=${item.date}`} className="btn btn-primary btn-sm">
                                                    Book Now
                                                </Link>
                                            ) : (
                                                <button disabled className="btn btn-ghost btn-sm" style={{ opacity: 0.5 }}>Sold Out</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'journey':
                return (
                    <div>
                        <h3 className="mb-6">Journey Details</h3>
                        <div className="card p-6">
                            <h4 className="mb-4">Route Information</h4>
                            <p className="text-secondary mb-4">
                                Srinagar → Gulmarg → Pahalgam → Sonmarg → Srinagar
                            </p>
                            <div className="grid grid-cols-2 sm-grid-cols-1 gap-4">
                                <div>
                                    <strong>Total Distance:</strong> Approx. 350 km
                                </div>
                                <div>
                                    <strong>Highest Point:</strong> Apharwat Peak (4,200m)
                                </div>
                                <div>
                                    <strong>Mode of Transport:</strong> Private AC Vehicle
                                </div>
                                <div>
                                    <strong>Road Conditions:</strong> Well-maintained, scenic routes
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'stay':
                return (
                    <div>
                        <h3 className="mb-6">Stay & Meals</h3>
                        <div className="card p-6 mb-4">
                            <h4 className="mb-4">Accommodation</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                <li className="mb-2">Night 1-2: Deluxe Houseboat on Dal Lake</li>
                                <li className="mb-2">Night 3: 4-Star Hotel in Pahalgam</li>
                                <li className="mb-2">Night 4-6: 4-Star Hotel in Srinagar</li>
                            </ul>
                        </div>
                        <div className="card p-6">
                            <h4 className="mb-4">Meal Plan</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                <li className="mb-2">Breakfast: Daily buffet breakfast at hotel</li>
                                <li className="mb-2">Lunch: Not included (on your own)</li>
                                <li className="mb-2">Dinner: Set menu dinner at hotel</li>
                                <li className="mb-2">Special: One traditional Kashmiri Wazwan dinner included</li>
                            </ul>
                        </div>
                    </div>
                );

            case 'map':
                return (
                    <div>
                        <h3 className="mb-6">Route Map</h3>
                        <div className="card p-6" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-tertiary)' }}>
                            <div className="text-center text-tertiary">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                    <line x1="8" y1="2" x2="8" y2="18" />
                                    <line x1="16" y1="6" x2="16" y2="22" />
                                </svg>
                                <p className="mt-4">Interactive Map</p>
                                <p style={{ fontSize: 'var(--font-size-sm)' }}>Route visualization will be displayed here</p>
                            </div>
                        </div>
                    </div>
                );

            case 'addon':
                return (
                    <div>
                        <h3 className="mb-6">Optional Add-ons</h3>
                        <p className="text-secondary mb-4">Enhance your experience with these optional extras:</p>
                        {addons.map((addon, index) => (
                            <div key={index} className="card p-4 mb-3 flex justify-between items-center">
                                <span>{addon.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold">₹{addon.price.toLocaleString()}</span>
                                    <button className="btn btn-outline btn-sm">Add</button>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'visa':
                return (
                    <div>
                        <h3 className="mb-6">Passport & Visa Requirements</h3>
                        <div className="alert alert-info">
                            <strong>For Indian Citizens:</strong> No passport or visa required for domestic travel to Kashmir.
                            Please carry a valid government-issued ID (Aadhaar, Driving License, or Voter ID).
                        </div>
                        <div className="card p-6 mt-4">
                            <h4 className="mb-4">Required Documents</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                <li className="mb-2">Valid Government ID Proof</li>
                                <li className="mb-2">Travel booking confirmation</li>
                                <li className="mb-2">Hotel booking vouchers</li>
                                <li className="mb-2">2 passport size photographs (recommended)</li>
                            </ul>
                        </div>
                    </div>
                );

            case 'tips':
                return (
                    <div>
                        <h3 className="mb-6">Do's & Don'ts</h3>
                        <div className="grid grid-cols-2 sm-grid-cols-1 gap-6">
                            <div className="card p-6">
                                <h4 className="mb-4" style={{ color: 'var(--success)' }}>✓ Do's</h4>
                                <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                    <li className="mb-2">Carry warm clothing (temperatures drop at night)</li>
                                    <li className="mb-2">Stay hydrated at high altitudes</li>
                                    <li className="mb-2">Respect local customs and dress modestly</li>
                                    <li className="mb-2">Carry basic medicines for altitude sickness</li>
                                    <li className="mb-2">Keep emergency contact numbers handy</li>
                                </ul>
                            </div>
                            <div className="card p-6">
                                <h4 className="mb-4" style={{ color: 'var(--error)' }}>✗ Don'ts</h4>
                                <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                    <li className="mb-2">Don't venture into restricted areas</li>
                                    <li className="mb-2">Avoid consuming unfiltered water</li>
                                    <li className="mb-2">Don't photograph military installations</li>
                                    <li className="mb-2">Avoid traveling at night in remote areas</li>
                                    <li className="mb-2">Don't litter - keep the environment clean</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'media':
                return (
                    <div>
                        <h3 className="mb-6">Photo & Video Gallery</h3>
                        <div className="tabs" style={{ borderBottom: 'none', marginBottom: 'var(--spacing-4)' }}>
                            <button className="tab-btn active">Photos</button>
                            <button className="tab-btn">Videos</button>
                        </div>
                        <div className="gallery-grid">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="gallery-item">
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, var(--gray-200), var(--gray-300))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'terms':
                return (
                    <div>
                        <h3 className="mb-6">Terms & Conditions</h3>
                        <div className="card p-6 mb-4">
                            <h4 className="mb-4">Cancellation Policy</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                <li className="mb-2">30+ days before departure: Full refund minus ₹2,000 processing fee</li>
                                <li className="mb-2">15-30 days before departure: 50% refund</li>
                                <li className="mb-2">7-14 days before departure: 25% refund</li>
                                <li className="mb-2">Less than 7 days: No refund</li>
                            </ul>
                        </div>
                        <div className="card p-6">
                            <h4 className="mb-4">General Terms</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                                <li className="mb-2">Tour itinerary may be modified due to weather or unforeseen circumstances</li>
                                <li className="mb-2">The company reserves the right to cancel tours with minimum participants not met</li>
                                <li className="mb-2">Travel insurance is recommended but not included</li>
                                <li className="mb-2">Participants are responsible for their personal belongings</li>
                            </ul>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <PageLayout>
            <div className="tour-detail-page">
                {/* Gallery/Hero */}
                <div className="tour-gallery">
                    <img
                        src="https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1920&q=80"
                        alt={tour.title}
                    />
                    <div className="tour-gallery-overlay" />
                    <div className="tour-gallery-content container">
                        <Breadcrumb items={breadcrumbItems} />
                        <h1 className="tour-title">{tour.title}</h1>
                        <p className="tour-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {tour.location} | {tour.duration}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container">
                    <div className="tour-content-wrapper">
                        {/* Sidebar */}
                        <div className="tour-sidebar">
                            <div className="tour-sidebar-card">
                                <div className="tour-price-display">
                                    <p className="tour-price-label">Starting from</p>
                                    <p className="tour-price-value">₹{tour.price.toLocaleString()}</p>
                                    <p className="tour-price-note">per person</p>
                                </div>

                                <ul className="tour-sidebar-links">
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <a
                                                href={`#${tab.id}`}
                                                className={activeTab === tab.id ? 'active' : ''}
                                                onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
                                            >
                                                {tab.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <Link to={`/booking/${tourId}`} className="btn btn-primary w-full">
                                    Book This Tour
                                </Link>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="tour-main-content">
                            {/* Tabs Navigation */}
                            <div className="tabs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="tab-content active">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default TourDetailPage;
