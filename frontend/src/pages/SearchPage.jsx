import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageLayout } from '../components/layout';
import { SearchForm } from '../components/forms';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Sample search results - will be replaced by API calls
    const sampleResults = [
        { id: 1, tourCode: 'KSM-001', title: 'Kashmir Paradise Explorer', location: 'Srinagar', startDate: '2026-02-15', endDate: '2026-02-21', duration: '6N/7D', price: 25000 },
        { id: 2, tourCode: 'KSM-002', title: 'Dal Lake Houseboat Special', location: 'Dal Lake, Srinagar', startDate: '2026-02-18', endDate: '2026-02-22', duration: '4N/5D', price: 18000 },
        { id: 3, tourCode: 'KRL-001', title: 'Kerala Backwaters Cruise', location: 'Alleppey', startDate: '2026-02-20', endDate: '2026-02-26', duration: '6N/7D', price: 28000 },
        { id: 4, tourCode: 'GOA-001', title: 'Goa Beach Holiday', location: 'North Goa', startDate: '2026-02-22', endDate: '2026-02-26', duration: '4N/5D', price: 15000 },
        { id: 5, tourCode: 'RAJ-001', title: 'Rajasthan Heritage Trail', location: 'Jaipur - Udaipur', startDate: '2026-03-01', endDate: '2026-03-08', duration: '7N/8D', price: 35000 },
    ];

    const handleSearch = (formData) => {
        console.log('Search params:', formData);
        // Simulate API call
        setResults(sampleResults);
        setHasSearched(true);
    };

    return (
        <PageLayout>
            <div className="search-page">
                {/* Hero */}
                <section className="search-hero">
                    <div className="container">
                        <h1>Find Your Perfect Tour</h1>
                        <SearchForm onSearch={handleSearch} showFilters={true} />
                    </div>
                </section>

                {/* Results */}
                {hasSearched && (
                    <section className="search-results">
                        <div className="container">
                            <div className="search-results-header">
                                <p className="results-count">
                                    Found <strong>{results.length}</strong> tours matching your criteria
                                </p>
                                <div className="flex gap-2">
                                    <select className="form-input form-select" style={{ width: 'auto', padding: 'var(--spacing-2) var(--spacing-8) var(--spacing-2) var(--spacing-3)' }}>
                                        <option value="relevance">Sort by Relevance</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="date">Departure Date</option>
                                    </select>
                                </div>
                            </div>

                            {results.map((tour) => (
                                <div key={tour.id} className="result-card">
                                    <div className="result-image">
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

                                    <div className="result-info">
                                        <span className="badge badge-primary mb-2">{tour.tourCode}</span>
                                        <h3>{tour.title}</h3>
                                        <p>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            {tour.location}
                                        </p>
                                        <div className="result-meta">
                                            <span>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                                    <line x1="16" y1="2" x2="16" y2="6" />
                                                    <line x1="8" y1="2" x2="8" y2="6" />
                                                    <line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                                {new Date(tour.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(tour.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                            <span>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 16 14" />
                                                </svg>
                                                {tour.duration}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="result-action">
                                        <div className="text-right mb-2">
                                            <span className="text-tertiary" style={{ fontSize: 'var(--font-size-sm)' }}>Starting from</span>
                                            <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--primary-600)' }}>
                                                ₹{tour.price.toLocaleString()}
                                            </p>
                                            <span className="text-tertiary" style={{ fontSize: 'var(--font-size-xs)' }}>per person</span>
                                        </div>
                                        <Link to={`/tour/${tour.id}`} className="btn btn-primary">
                                            Get Details
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {results.length === 0 && (
                                <div className="text-center py-12">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1" style={{ margin: '0 auto 16px' }}>
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                    <h3 className="mb-2">No tours found</h3>
                                    <p className="text-tertiary">Try adjusting your search filters</p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {!hasSearched && (
                    <section className="container py-16">
                        <div className="text-center">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="1" style={{ margin: '0 auto 24px' }}>
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <h2 className="mb-4">Search for your dream destination</h2>
                            <p className="text-tertiary">Use the search form above to find tours that match your preferences</p>
                        </div>
                    </section>
                )}
            </div>
        </PageLayout>
    );
};

export default SearchPage;
