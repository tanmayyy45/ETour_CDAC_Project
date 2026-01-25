import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Search, User, Globe, ChevronDown,
    Home, Info, MapPin, Image, Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useScrollPosition } from '../../hooks/useApi';

const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Tours', path: '/tours', icon: MapPin },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Contact', path: '/contact', icon: Phone },
];

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const { language, changeLanguage, companyInfo, user, logout } = useApp();
    const { isScrolled } = useScrollPosition();
    const location = useLocation();

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-ocean rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg lg:text-xl">E</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className={`font-bold text-lg lg:text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                                    {companyInfo.company_name || 'ETour India'}
                                </h1>
                                <p className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
                                    Discover Amazing Places
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-link relative px-3 py-2 text-sm font-medium transition-colors ${location.pathname === item.path
                                        ? isScrolled ? 'text-blue-600' : 'text-white'
                                        : isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/80 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                    {location.pathname === item.path && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Language Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isScrolled
                                        ? 'hover:bg-gray-100'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    <Globe size={18} className={isScrolled ? 'text-gray-700' : 'text-white'} />
                                    <span className={`hidden sm:block text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                                        {currentLang.flag} {currentLang.code.toUpperCase()}
                                    </span>
                                    <ChevronDown size={14} className={isScrolled ? 'text-gray-500' : 'text-white/70'} />
                                </button>

                                <AnimatePresence>
                                    {isLangOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-[140px] border border-gray-100"
                                        >
                                            {languages.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => {
                                                        changeLanguage(lang.code);
                                                        setIsLangOpen(false);
                                                    }}
                                                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${language === lang.code
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <span>{lang.flag}</span>
                                                    {lang.name}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* User Button */}
                            {user ? (
                                <div className="relative group">
                                    <button className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                                        }`}>
                                        <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </button>
                                    <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <div className="bg-white rounded-xl shadow-xl py-2 min-w-[160px] border border-gray-100">
                                            <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                                My Profile
                                            </Link>
                                            <Link to="/my-bookings" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                                My Bookings
                                            </Link>
                                            <hr className="my-2 border-gray-100" />
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${isScrolled
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                                        }`}
                                >
                                    <User size={16} />
                                    Sign In
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className={`lg:hidden p-2 rounded-lg ${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                                    }`}
                            >
                                <Menu size={24} className={isScrolled ? 'text-gray-900' : 'text-white'} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-50 shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h2 className="font-bold text-lg">Menu</h2>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${location.pathname === item.path
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <item.icon size={20} />
                                            <span className="font-medium">{item.name}</span>
                                        </Link>
                                    </motion.div>
                                ))}

                                {!user && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-4 pt-4 border-t border-gray-100"
                                    >
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="btn-primary w-full"
                                        >
                                            <User size={18} className="mr-2" />
                                            Sign In
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
