const AdBanner = ({ image, link, alt = 'Advertisement', position = 'side' }) => {
    const BannerContent = () => (
        <div className="ad-banner">
            {image ? (
                <img src={image} alt={alt} />
            ) : (
                <div className="ad-banner-placeholder">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p>Advertisement Space</p>
                    <span style={{ fontSize: 'var(--font-size-xs)' }}>
                        {position === 'top' ? '728 x 90' : position === 'side' ? '300 x 250' : '300 x 600'}
                    </span>
                </div>
            )}
        </div>
    );

    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer">
                <BannerContent />
            </a>
        );
    }

    return <BannerContent />;
};

export default AdBanner;
