import { Link } from 'react-router-dom';

const TourCard = ({
    id,
    image,
    title,
    location,
    duration,
    price,
    rating,
    reviewCount,
    badge
}) => {
    return (
        <div className="card">
            <div className="card-image">
                {image ? (
                    <img src={image} alt={title} />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, var(--gray-200), var(--gray-300))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="1">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                )}
                {badge && <span className="card-badge">{badge}</span>}
                <button className="card-favorite" aria-label="Add to favorites">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                </button>
            </div>

            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-subtitle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {location}
                </p>

                <div className="card-price">
                    <span className="card-price-value">₹{price?.toLocaleString()}</span>
                    <span className="card-price-unit">/ person</span>
                </div>

                <div className="card-meta">
                    <span className="card-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {duration}
                    </span>

                    {rating && (
                        <span className="card-meta-item">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--secondary-400)" stroke="var(--secondary-400)" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {rating} ({reviewCount})
                        </span>
                    )}
                </div>

                <Link to={`/tour/${id}`} className="btn btn-primary w-full mt-4">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default TourCard;
