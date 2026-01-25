import { Link } from 'react-router-dom';
import {
    MapPin, Phone, Mail, Clock,
    Facebook, Twitter, Instagram, Youtube, Linkedin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Tours', path: '/tours' },
    { name: 'Contact', path: '/contact' },
];

const tourLinks = [
    { name: 'Domestic Tours', path: '/tours/domestic' },
    { name: 'International Tours', path: '/tours/international' },
    { name: 'Adventure Tours', path: '/tours/adventure' },
    { name: 'Honeymoon Packages', path: '/tours/honeymoon' },
];

const supportLinks = [
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Site Map', path: '/sitemap' },
    { name: 'Career', path: '/career' },
];

const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'YouTube', icon: Youtube, url: '#' },
    { name: 'LinkedIn', icon: Linkedin, url: '#' },
];

export default function Footer() {
    const { companyInfo } = useApp();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container mx-auto px-4">
                {/* Main Footer Content */}
                <div className="footer-grid">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">E</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-white">
                                    {companyInfo.company_name || 'ETour India'}
                                </h3>
                                <p className="text-white/60 text-sm">Your Travel Partner</p>
                            </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
                            Discover the world with ETour India. We offer curated travel experiences
                            that create memories lasting a lifetime. Explore domestic and international
                            destinations with our expert-planned tour packages.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-white/70 text-sm">
                                <MapPin size={18} className="text-orange-400 mt-0.5 flex-shrink-0" />
                                <span>{companyInfo.head_office_address || '123 Travel Street, Mumbai, Maharashtra 400001'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70 text-sm">
                                <Phone size={18} className="text-orange-400 flex-shrink-0" />
                                <span>{companyInfo.contact_phone || '+91 22 1234 5678'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70 text-sm">
                                <Mail size={18} className="text-orange-400 flex-shrink-0" />
                                <span>{companyInfo.contact_email || 'info@etourindia.com'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70 text-sm">
                                <Clock size={18} className="text-orange-400 flex-shrink-0" />
                                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="footer-title">Quick Links</h4>
                        {quickLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="footer-link">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Tour Categories */}
                    <div>
                        <h4 className="footer-title">Tour Categories</h4>
                        {tourLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="footer-link">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="footer-title">Support</h4>
                        {supportLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="footer-link">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div className="lg:col-span-2">
                        <h4 className="footer-title">Subscribe to Newsletter</h4>
                        <p className="text-white/60 text-sm mb-4">
                            Get the latest tour updates and exclusive offers directly in your inbox.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-accent rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                            >
                                Subscribe
                            </button>
                        </form>

                        {/* Social Links */}
                        <div className="mt-6">
                            <h5 className="text-white/80 text-sm font-medium mb-3">Follow Us</h5>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110"
                                        aria-label={social.name}
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p>
                            {companyInfo.copyright_text || `© ${currentYear} ETour India. All rights reserved.`}
                        </p>
                        <div className="flex items-center gap-4">
                            <Link to="/terms" className="hover:text-orange-400 transition-colors">Terms</Link>
                            <span className="text-white/30">|</span>
                            <Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy</Link>
                            <span className="text-white/30">|</span>
                            <Link to="/sitemap" className="hover:text-orange-400 transition-colors">Sitemap</Link>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-white/40">
                        {companyInfo.footer_text || 'Designed with ❤️ for travelers who dream big'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
