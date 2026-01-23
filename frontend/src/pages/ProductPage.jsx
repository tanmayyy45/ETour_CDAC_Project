import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout, Breadcrumb } from '../components/layout';
import { TourCard, Pagination } from '../components/common';

const ProductPage = () => {
    const { sectorId, subSectorId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('popular');
    const itemsPerPage = 9;

    // Sample tours - will be replaced by API calls
    const tours = [
        { id: 1, title: 'Kashmir Paradise Explorer', location: 'Srinagar, Kashmir', duration: '6N/7D', price: 25000, rating: 4.8, reviewCount: 124, badge: 'Best Seller' },
        { id: 2, title: 'Dal Lake Houseboat Stay', location: 'Dal Lake, Srinagar', duration: '4N/5D', price: 18000, rating: 4.7, reviewCount: 98 },
        { id: 3, title: 'Gulmarg Ski Adventure', location: 'Gulmarg, Kashmir', duration: '5N/6D', price: 32000, rating: 4.9, reviewCount: 67, badge: 'Premium' },
        { id: 4, title: 'Pahalgam Valley Tour', location: 'Pahalgam, Kashmir', duration: '3N/4D', price: 15000, rating: 4.6, reviewCount: 156 },
        { id: 5, title: 'Complete Kashmir Circuit', location: 'Kashmir Valley', duration: '10N/11D', price: 45000, rating: 4.9, reviewCount: 89 },
        { id: 6, title: 'Leh-Ladakh via Srinagar', location: 'Srinagar to Leh', duration: '8N/9D', price: 38000, rating: 4.8, reviewCount: 112 },
    ];

    const totalPages = Math.ceil(tours.length / itemsPerPage);
    const paginatedTours = tours.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const breadcrumbItems = [
        { label: 'Tours', path: '/tours' },
        { label: sectorId?.charAt(0).toUpperCase() + sectorId?.slice(1) || 'Category', path: `/tours/${sectorId}` },
        { label: subSectorId?.charAt(0).toUpperCase() + subSectorId?.slice(1) || 'Sub-Category', path: `/tours/${sectorId}/${subSectorId}` },
    ];

    return (
        <PageLayout>
            <div className="product-page">
                {/* Hero */}
                <section className="product-hero">
                    <div className="container">
                        <Breadcrumb items={breadcrumbItems} />
                        <h1 style={{ color: 'white', marginTop: 'var(--spacing-4)' }}>
                            {subSectorId?.charAt(0).toUpperCase() + subSectorId?.slice(1)} Tours
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                            {tours.length} tour packages available
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="container" style={{ marginTop: 'calc(var(--spacing-8) * -1)' }}>
                    <div className="product-filters">
                        <div className="filter-group">
                            <label className="filter-label">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="form-input form-select"
                                style={{ width: 'auto', padding: 'var(--spacing-2) var(--spacing-8) var(--spacing-2) var(--spacing-3)' }}
                            >
                                <option value="popular">Most Popular</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="duration">Duration</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Duration:</label>
                            <select
                                className="form-input form-select"
                                style={{ width: 'auto', padding: 'var(--spacing-2) var(--spacing-8) var(--spacing-2) var(--spacing-3)' }}
                            >
                                <option value="">All Durations</option>
                                <option value="1-3">1-3 Days</option>
                                <option value="4-6">4-6 Days</option>
                                <option value="7-10">7-10 Days</option>
                                <option value="10+">10+ Days</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label className="filter-label">Budget:</label>
                            <select
                                className="form-input form-select"
                                style={{ width: 'auto', padding: 'var(--spacing-2) var(--spacing-8) var(--spacing-2) var(--spacing-3)' }}
                            >
                                <option value="">All Budgets</option>
                                <option value="0-15000">Under ₹15,000</option>
                                <option value="15000-30000">₹15,000 - ₹30,000</option>
                                <option value="30000-50000">₹30,000 - ₹50,000</option>
                                <option value="50000+">Above ₹50,000</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="container">
                    <div className="product-grid">
                        {paginatedTours.map((tour) => (
                            <TourCard key={tour.id} {...tour} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </section>
            </div>
        </PageLayout>
    );
};

export default ProductPage;
