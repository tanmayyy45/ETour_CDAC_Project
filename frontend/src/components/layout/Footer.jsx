import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Tours', path: '/tours' },
        { name: 'Search', path: '/search' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    const tourTypes = [
        { name: 'Domestic Tours', path: '/tours/domestic' },
        { name: 'International Tours', path: '/tours/international' },
        { name: 'Adventure Tours', path: '/tours/adventure' },
        { name: 'Honeymoon Tours', path: '/tours/honeymoon' },
        { name: 'Sports Tourism', path: '/tours/sports' },
    ];

    const support = [
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Cancellation Policy', path: '/cancellation' },
        { name: 'Download Brochure', path: '/download' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="logo">
                            <svg className="logo-icon" viewBox="0 0 40 40" fill="none" width="40" height="40">
                                <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.2" />
                                <path d="M20 10L28 26H12L20 10Z" fill="currentColor" />
                                <circle cx="20" cy="28" r="3" fill="currentColor" />
                            </svg>
                            <span>ETour</span>
                        </Link>
                        <p className="footer-description">
                            Discover the world with ETour. We offer premium travel experiences
                            with carefully curated tour packages to destinations across India
                            and around the globe.
                        </p>
                        <div className="social-links mt-4">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="18" cy="6" r="1.5" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48" fill="#1a1a2e" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer-title">Tour Types</h3>
                        <ul className="footer-links">
                            {tourTypes.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="footer-title">Support</h3>
                        <ul className="footer-links">
                            {support.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} ETour. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/sitemap" style={{ color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                            Site Map
                        </Link>
                        <Link to="/careers" style={{ color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                            Careers
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
