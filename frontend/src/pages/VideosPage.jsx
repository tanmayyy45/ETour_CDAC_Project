import { PageLayout } from '../components/layout';

const VideosPage = () => {
    // Sample videos - will be replaced by API
    const videos = [
        { id: 1, title: 'Discover Kashmir', duration: '4:32', category: 'Kashmir' },
        { id: 2, title: 'Kerala Backwaters Journey', duration: '5:15', category: 'Kerala' },
        { id: 3, title: 'Rajasthan Heritage Trail', duration: '6:45', category: 'Rajasthan' },
        { id: 4, title: 'Goa Beach Life', duration: '3:28', category: 'Goa' },
        { id: 5, title: 'Ladakh Adventure', duration: '7:12', category: 'Ladakh' },
        { id: 6, title: 'Switzerland Dreams', duration: '5:50', category: 'International' },
    ];

    return (
        <PageLayout>
            <div className="static-page">
                <section className="static-hero">
                    <div className="container">
                        <h1>Video Gallery</h1>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container">
                        <div className="grid grid-cols-3 md-grid-cols-2 sm-grid-cols-1 gap-6">
                            {videos.map((video) => (
                                <div key={video.id} className="card">
                                    <div className="card-image">
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            background: `linear-gradient(135deg, hsl(${video.id * 50}, 40%, 40%), hsl(${video.id * 50 + 30}, 50%, 30%))`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                background: 'rgba(255,255,255,0.9)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                            }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary-600)">
                                                    <polygon points="5 3 19 12 5 21" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="card-badge">{video.duration}</span>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-tertiary mb-1" style={{ fontSize: 'var(--font-size-xs)' }}>
                                            {video.category}
                                        </p>
                                        <h3 className="card-title">{video.title}</h3>
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

export default VideosPage;
