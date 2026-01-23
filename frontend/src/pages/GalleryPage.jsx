import { useState } from 'react';
import { PageLayout } from '../components/layout';

const GalleryPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'kashmir', label: 'Kashmir' },
        { id: 'kerala', label: 'Kerala' },
        { id: 'rajasthan', label: 'Rajasthan' },
        { id: 'goa', label: 'Goa' },
        { id: 'international', label: 'International' },
    ];

    // Sample gallery items - will be replaced by API
    const galleryItems = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        category: filters[Math.floor(Math.random() * (filters.length - 1)) + 1].id,
        title: `Travel Photo ${i + 1}`,
    }));

    const filteredItems = activeFilter === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeFilter);

    return (
        <PageLayout>
            <div className="static-page">
                <section className="static-hero">
                    <div className="container">
                        <h1>Photo Gallery</h1>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container">
                        {/* Filters */}
                        <div className="flex flex-wrap gap-2 justify-center mb-8">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    className={`btn ${activeFilter === filter.id ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setActiveFilter(filter.id)}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Gallery Grid */}
                        <div className="gallery-grid">
                            {filteredItems.map((item) => (
                                <div key={item.id} className="gallery-item">
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: `linear-gradient(135deg, hsl(${item.id * 30}, 50%, 80%), hsl(${item.id * 30 + 30}, 60%, 70%))`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" opacity="0.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </div>
                                    <div className="gallery-item-overlay">
                                        <span style={{ color: 'white', opacity: 0 }} className="gallery-item:hover">
                                            View
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-tertiary">No photos found in this category.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default GalleryPage;
