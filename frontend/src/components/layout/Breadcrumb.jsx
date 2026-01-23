import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            </Link>

            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                    <span className="breadcrumb-separator">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </span>
                    {index === items.length - 1 ? (
                        <span className="breadcrumb-item active">{item.label}</span>
                    ) : (
                        <Link to={item.path} className="breadcrumb-item">{item.label}</Link>
                    )}
                </span>
            ))}
        </nav>
    );
};

export default Breadcrumb;
