import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', path: '/' },
        {
            name: 'Tours', path: '/tours', dropdown: [
                { name: 'Domestic Tours', path: '/tours/domestic' },
                { name: 'International Tours', path: '/tours/international' },
                { name: 'Adventure Tours', path: '/tours/adventure' },
            ]
        },
        { name: 'About', path: '/about' },
        { name: 'Search', path: '/search' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Videos', path: '/videos' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-inner">
                <Link to="/" className="logo">
                    <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
                        <path d="M20 10L28 26H12L20 10Z" fill="currentColor" />
                        <circle cx="20" cy="28" r="3" fill="currentColor" />
                    </svg>
                    <span>ETour</span>
                </Link>

                <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.name} className="nav-item">
                            <Link
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.name}
                                {item.dropdown && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: '4px' }}>
                                        <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                    </svg>
                                )}
                            </Link>
                            {item.dropdown && (
                                <div className="nav-dropdown">
                                    {item.dropdown.map((subItem) => (
                                        <Link key={subItem.name} to={subItem.path} className="dropdown-link">
                                            {subItem.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/login" className="btn btn-ghost">Login</Link>
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            {isMobileMenuOpen ? (
                                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" />
                            ) : (
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
