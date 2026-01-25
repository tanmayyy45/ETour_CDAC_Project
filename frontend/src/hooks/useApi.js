import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for API calls with loading and error states
 */
export function useApi(apiFunc, immediate = true) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiFunc(...args);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunc]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, []);

    return { data, loading, error, execute, setData };
}

/**
 * Custom hook for debounced search
 */
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Custom hook for local storage
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

/**
 * Custom hook for window scroll position
 */
export function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollY, isScrolled };
}

/**
 * Custom hook for responsive breakpoints
 */
export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState('lg');

    useEffect(() => {
        const checkBreakpoint = () => {
            const width = window.innerWidth;
            if (width < 640) setBreakpoint('sm');
            else if (width < 768) setBreakpoint('md');
            else if (width < 1024) setBreakpoint('lg');
            else if (width < 1280) setBreakpoint('xl');
            else setBreakpoint('2xl');
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    return {
        breakpoint,
        isMobile: breakpoint === 'sm',
        isTablet: breakpoint === 'md',
        isDesktop: ['lg', 'xl', '2xl'].includes(breakpoint),
    };
}
