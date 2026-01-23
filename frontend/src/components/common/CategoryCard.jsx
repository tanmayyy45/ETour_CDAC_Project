import { Link } from 'react-router-dom';

const CategoryCard = ({ id, name, icon, tourCount, imagePath }) => {
    const defaultIcons = {
        'domestic': '🏔️',
        'international': '✈️',
        'adventure': '🎿',
        'honeymoon': '💑',
        'sports': '⚽',
        'religious': '🛕',
        'beach': '🏖️',
        'wildlife': '🦁',
    };

    const displayIcon = icon || defaultIcons[id?.toLowerCase()] || '🌍';

    return (
        <Link to={`/tours/${id}`} className="category-card">
            <div className="category-icon">
                {imagePath ? (
                    <img src={imagePath} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                ) : (
                    <span style={{ fontSize: '2rem' }}>{displayIcon}</span>
                )}
            </div>
            <h3 className="category-name">{name}</h3>
            {tourCount !== undefined && (
                <p className="category-count">{tourCount} Tours</p>
            )}
        </Link>
    );
};

export default CategoryCard;
