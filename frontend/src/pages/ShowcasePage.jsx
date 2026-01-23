import { Link } from 'react-router-dom';

const ShowcasePage = () => {
    return (
        <div className="showcase-page">
            {/* Top Banner Area */}
            <div className="showcase-banner-top">
                <div className="showcase-banner-left">
                    <span style={{ color: 'var(--gray-500)' }}>Ad Banner Left (300x120)</span>
                </div>
                <div className="showcase-banner-right">
                    <span style={{ color: 'var(--gray-500)' }}>Ad Banner Right (300x120)</span>
                </div>
            </div>

            {/* Main Showcase Area */}
            <div className="showcase-main">
                <div className="showcase-logo">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="36" fill="white" opacity="0.2" />
                        <path d="M40 16L60 52H20L40 16Z" fill="white" />
                        <circle cx="40" cy="56" r="6" fill="white" />
                    </svg>
                    <span style={{ marginLeft: '16px' }}>ETour</span>
                </div>

                <p className="showcase-tagline">
                    Discover the world with us. Your journey begins here.
                </p>

                {/* Media/Advertisement Showcase Area */}
                <div className="showcase-media">
                    <div style={{ textAlign: 'center', color: 'var(--gray-500)' }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <polygon points="5 3 19 12 5 21" />
                        </svg>
                        <p style={{ marginTop: '16px' }}>Tour India Advertisement</p>
                        <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '8px' }}>
                            (Audio-visual / Image / PDF Content)
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="showcase-actions">
                    <Link to="/home" className="btn btn-primary btn-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21" />
                        </svg>
                        Continue to ETour
                    </Link>
                    <Link to="/home" className="btn btn-outline btn-lg" style={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        color: 'white',
                        background: 'rgba(255,255,255,0.1)'
                    }}>
                        Skip Intro
                    </Link>
                </div>
            </div>

            {/* Bottom Banner Area */}
            <div className="showcase-banner-bottom">
                <div className="showcase-banner-left">
                    <span style={{ color: 'var(--gray-500)' }}>Ad Banner Left (300x100)</span>
                </div>
                <div className="showcase-banner-right">
                    <span style={{ color: 'var(--gray-500)' }}>Ad Banner Right (300x100)</span>
                </div>
            </div>
        </div>
    );
};

export default ShowcasePage;
