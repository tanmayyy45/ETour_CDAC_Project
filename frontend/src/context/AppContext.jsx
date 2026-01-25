import { createContext, useContext, useState, useEffect } from 'react';
import { configAPI } from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const [companyInfo, setCompanyInfo] = useState({});
    const [announcements, setAnnouncements] = useState([]);
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [companyRes, announcementsRes, bannersRes] = await Promise.allSettled([
                    configAPI.getCompanyInfo(),
                    configAPI.getAnnouncements(),
                    configAPI.getBanners(),
                ]);

                if (companyRes.status === 'fulfilled') {
                    setCompanyInfo(companyRes.value.data);
                }
                if (announcementsRes.status === 'fulfilled') {
                    setAnnouncements(announcementsRes.value.data);
                }
                if (bannersRes.status === 'fulfilled') {
                    setBanners(bannersRes.value.data);
                }
            } catch (error) {
                console.error('Failed to load initial data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();

        // Check for stored user
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Language handler
    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    // Auth handlers
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    // Cart handlers
    const addToCart = (tour) => {
        setCart((prev) => [...prev, tour]);
    };

    const removeFromCart = (tourId) => {
        setCart((prev) => prev.filter((item) => item.id !== tourId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const value = {
        // State
        language,
        companyInfo,
        announcements,
        banners,
        isLoading,
        user,
        cart,
        // Actions
        changeLanguage,
        login,
        logout,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}

export default AppContext;
