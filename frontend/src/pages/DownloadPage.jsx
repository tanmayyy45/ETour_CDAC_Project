import { PageLayout } from '../components/layout';

const DownloadPage = () => {
    const downloads = [
        { id: 1, title: 'Summer Tour Brochure 2026', type: 'PDF', size: '2.5 MB', category: 'Brochures' },
        { id: 2, title: 'Winter Packages Catalog', type: 'PDF', size: '3.1 MB', category: 'Brochures' },
        { id: 3, title: 'International Tours Guide', type: 'PDF', size: '4.2 MB', category: 'Brochures' },
        { id: 4, title: 'Kashmir Travel Tips', type: 'PDF', size: '1.2 MB', category: 'Guides' },
        { id: 5, title: 'Booking Form Template', type: 'Excel', size: '245 KB', category: 'Forms' },
        { id: 6, title: 'Passenger Information Form', type: 'PDF', size: '156 KB', category: 'Forms' },
    ];

    const groupedDownloads = downloads.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <PageLayout>
            <div className="static-page">
                <section className="static-hero">
                    <div className="container">
                        <h1>Downloads</h1>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container">
                        <div className="prose">
                            <p className="mb-8">
                                Download our brochures, travel guides, and forms for your convenience.
                            </p>

                            {Object.entries(groupedDownloads).map(([category, items]) => (
                                <div key={category} className="mb-8">
                                    <h2>{category}</h2>
                                    <div className="grid grid-cols-2 md-grid-cols-1 gap-4 mt-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="card p-4 flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <div style={{
                                                        width: '48px',
                                                        height: '48px',
                                                        background: item.type === 'PDF' ? 'var(--error-light)' : 'var(--success-light)',
                                                        borderRadius: 'var(--radius-lg)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: item.type === 'PDF' ? 'var(--error)' : 'var(--success)',
                                                        fontWeight: 'var(--font-weight-bold)',
                                                        fontSize: 'var(--font-size-xs)',
                                                    }}>
                                                        {item.type}
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: 'var(--font-size-base)' }}>{item.title}</h4>
                                                        <p className="text-tertiary" style={{ fontSize: 'var(--font-size-sm)' }}>
                                                            {item.size}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="btn btn-outline btn-sm">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                                        <polyline points="7 10 12 15 17 10" />
                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                    </svg>
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default DownloadPage;
