import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout';
import { TourCard, CategoryCard, LanguageSelector, AdBanner } from '../components/common';

const HomePage = () => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [language, setLanguage] = useState('en');

    // Sample data - will be replaced by API calls
    const mainSectors = [
        { id: 'domestic', name: 'Domestic Tours', icon: '🏔️', tourCount: 45 },
        { id: 'international', name: 'International Tours', icon: '✈️', tourCount: 32 },
        { id: 'adventure', name: 'Adventure Tours', icon: '🎿', tourCount: 18 },
        { id: 'honeymoon', name: 'Couple Tours', icon: '💑', tourCount: 24 },
        { id: 'sports', name: 'Sports Tourism', icon: '⚽', tourCount: 12 },
        { id: 'religious', name: 'Religious Tours', icon: '🛕', tourCount: 28 },
        { id: 'beach', name: 'Beach Holidays', icon: '🏖️', tourCount: 20 },
        { id: 'wildlife', name: 'Wildlife Safari', icon: '🦁', tourCount: 15 },
    ];

    const featuredTours = [
        { id: 1, title: 'Kashmir Paradise', location: 'Srinagar, India', duration: '6N/7D', price: 25000, rating: 4.8, reviewCount: 124, badge: 'Best Seller' },
        { id: 2, title: 'Kerala Backwaters', location: 'Alleppey, India', duration: '5N/6D', price: 18000, rating: 4.7, reviewCount: 98 },
        { id: 3, title: 'Goa Beach Escape', location: 'North Goa, India', duration: '4N/5D', price: 15000, rating: 4.6, reviewCount: 156 },
        { id: 4, title: 'Rajasthan Heritage', location: 'Jaipur, India', duration: '7N/8D', price: 32000, rating: 4.9, reviewCount: 87, badge: 'Premium' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?destination=${encodeURIComponent(destination)}`);
    };

    return (
        <PageLayout
            showCrawl={true}
            crawlText="🎉 Special Offer! Get 20% off on all Domestic Tours this month. Book now! | New International packages added for Europe and Southeast Asia. | Customer Support: 1800-123-4567"
        >
            {/* Hero Section */}
            <section className="home-hero">
                <div className="home-hero-background">
                    <img
                        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80"
                        alt="Beautiful landscape"
                    />
                </div>
                <div className="home-hero-content">
                    <h1 className="home-hero-title">
                        Life is short and the world is wide
                    </h1>
                    <p className="home-hero-subtitle">
                        Discover amazing destinations with our curated tour packages.
                        Your dream vacation starts here.
                    </p>

                    {/* Search Box */}
                    <form className="home-search-box" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="home-search-field"
                            style={{ minWidth: '250px' }}
                        />
                        <input
                            type="date"
                            className="home-search-field"
                            placeholder="Check In"
                        />
                        <input
                            type="date"
                            className="home-search-field"
                            placeholder="Check Out"
                        />
                        <button type="submit" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Search
                        </button>
                    </form>

                    {/* Language Selector */}
                    <div className="mt-6">
                        <LanguageSelector
                            currentLanguage={language}
                            onLanguageChange={setLanguage}
                        />
                    </div>
                </div>
            </section>

            {/* Sectors Section */}
            <section className="sectors-section">
                <div className="container">
                    <h2 className="section-title">Find Your Next Dream Destination</h2>
                    <p className="section-subtitle">
                        Explore our curated selection of tour categories designed for every type of traveler
                    </p>

                    <div className="sectors-grid stagger">
                        {mainSectors.map((sector) => (
                            <CategoryCard
                                key={sector.id}
                                id={sector.id}
                                name={sector.name}
                                icon={sector.icon}
                                tourCount={sector.tourCount}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Tours Section */}
            <section className="featured-section">
                <div className="container">
                    <div className="featured-header">
                        <div>
                            <h2>Best Travel Destinations</h2>
                            <p className="text-secondary mt-2">Handpicked tours loved by our travelers</p>
                        </div>
                        <Link to="/tours" className="btn btn-outline">
                            View All Tours
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>

                    <div className="card-grid">
                        {featuredTours.map((tour) => (
                            <TourCard key={tour.id} {...tour} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Destination Highlight */}
            <section className="destination-highlight">
                <div className="container">
                    <div className="destination-content">
                        <div className="destination-image">
                            <img
                                src="https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80"
                                alt="Switzerland"
                            />
                        </div>
                        <div className="destination-info">
                            <h2>Switzerland</h2>
                            <p>
                                Experience the breathtaking beauty of the Swiss Alps, charming villages,
                                and world-class hospitality. From skiing in winter to hiking in summer,
                                Switzerland offers year-round adventures.
                            </p>
                            <div className="destination-features">
                                <div className="destination-feature">
                                    <span className="destination-feature-icon">✓</span>
                                    <span>Scenic Train Journeys</span>
                                </div>
                                <div className="destination-feature">
                                    <span className="destination-feature-icon">✓</span>
                                    <span>Alpine Adventures</span>
                                </div>
                                <div className="destination-feature">
                                    <span className="destination-feature-icon">✓</span>
                                    <span>Luxury Accommodations</span>
                                </div>
                                <div className="destination-feature">
                                    <span className="destination-feature-icon">✓</span>
                                    <span>Guided Tours</span>
                                </div>
                            </div>
                            <Link to="/tours/international/switzerland" className="btn btn-primary">
                                Explore Switzerland
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="section-title">We provide tours across a variety of destinations</h2>
                    <p className="section-subtitle">
                        Why thousands of travelers choose ETour for their adventures
                    </p>

                    <div className="grid grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-6 mt-8">
                        {[
                            { icon: '🌍', title: '500+ Destinations', desc: 'Explore worldwide locations' },
                            { icon: '⭐', title: 'Best Price Guarantee', desc: 'Get the best deals always' },
                            { icon: '🎯', title: 'Expert Guides', desc: 'Professional tour leaders' },
                            { icon: '💯', title: '24/7 Support', desc: 'We\'re always here to help' },
                        ].map((item, index) => (
                            <div key={index} className="card text-center p-6">
                                <span style={{ fontSize: '3rem' }}>{item.icon}</span>
                                <h3 className="mt-4 mb-2" style={{ fontSize: 'var(--font-size-lg)' }}>{item.title}</h3>
                                <p className="text-tertiary" style={{ fontSize: 'var(--font-size-sm)' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="section-title">What our customers says</h2>
                    <p className="section-subtitle">Real experiences from real travelers</p>

                    <div className="grid grid-cols-3 md-grid-cols-2 sm-grid-cols-1 gap-6 mt-8">
                        {[
                            { name: 'Priya Sharma', role: 'Delhi', text: 'Amazing experience! The Kashmir tour was beyond our expectations. Well organized and great value.' },
                            { name: 'Rahul Mehta', role: 'Mumbai', text: 'Best tour operator we\'ve ever used. The team was professional and the itinerary was perfect.' },
                            { name: 'Anita Patel', role: 'Bangalore', text: 'Seamless booking process and excellent customer support. Will definitely book again!' },
                        ].map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="rating mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className="rating-star">★</span>
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <div className="avatar">{testimonial.name.charAt(0)}</div>
                                    <div>
                                        <div className="testimonial-author-name">{testimonial.name}</div>
                                        <div className="testimonial-author-role">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2 className="cta-title">Start your next journey now and create memories that last forever</h2>
                    <p className="cta-subtitle">
                        Join thousands of happy travelers who have explored the world with us
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/tours" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary-600)' }}>
                            Browse Tours
                        </Link>
                        <Link to="/contact" className="btn btn-lg btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Side Ad Banners - These would be positioned fixed in a real implementation */}
        </PageLayout>
    );
};

export default HomePage;
