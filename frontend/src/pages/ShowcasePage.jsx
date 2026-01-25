import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { siteConfigAPI } from '../services/api';

export default function ShowcasePage() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [countdown, setCountdown] = useState(8);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    // Load banners from backend
    useEffect(() => {
        const loadBanners = async () => {
            try {
                const res = await siteConfigAPI.getAllBanners();
                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    setSlides(res.data.map(b => ({
                        id: b.bannerId,
                        image: b.imagePath,
                        title: b.title || 'Welcome to ETour',
                        subtitle: b.subtitle || 'Experience the world with us'
                    })));
                } else {
                    // Fallback if no banners found
                    setSlides([
                        {
                            id: 1,
                            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
                            title: 'Discover the Himalayas',
                            subtitle: 'Experience breathtaking mountain adventures',
                        },
                        {
                            id: 2,
                            image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920',
                            title: 'Exotic Beach Getaways',
                            subtitle: 'Relax on pristine shores across India',
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error loading banners:', error);
                // Fallback on error
                setSlides([
                    {
                        id: 1,
                        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
                        title: 'Discover the Himalayas',
                        subtitle: 'Experience breathtaking mountain adventures',
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        loadBanners();
    }, []);

    // Auto-advance slides
    useEffect(() => {
        if (isPaused || slides.length === 0) return;

        const slideTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(slideTimer);
    }, [isPaused, slides]);

    // Countdown timer
    useEffect(() => {
        if (isPaused) return;

        const countdownTimer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    navigate('/home');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdownTimer);
    }, [isPaused, navigate]);

    const handleSkip = () => {
        navigate('/home');
    };

    if (isLoading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="spinner text-white"></div>
        </div>;
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gray-900">
            {/* Background Slideshow */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
                </motion.div>
            </AnimatePresence>

            {/* Animated Particles/Overlay Effect */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [null, Math.random() * -500],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Banner Zones - Optional: Could also be dynamic but hardcoded for aesthetics for now */}
            {/* Top Left Banner */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute top-4 left-4 z-10 hidden md:block"
            >
                <div className="glass rounded-xl p-3 max-w-[200px]">
                    <img
                        src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200"
                        alt="Ad Banner"
                        className="w-full h-auto rounded-lg opacity-90"
                    />
                    <p className="text-white/80 text-xs mt-2 text-center">Special Tours Await!</p>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                {/* Logo & Company Name */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-3xl mb-6 border border-white/20">
                        <span className="text-white font-bold text-5xl">E</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                        ETour <span className="text-gradient bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">India</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-light">
                        Your Gateway to Incredible Journeys
                    </p>
                </motion.div>

                {/* Current Slide Title */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {slides[currentSlide].title}
                        </h2>
                        <p className="text-lg text-white/70">
                            {slides[currentSlide].subtitle}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Slide Indicators */}
                <div className="flex items-center gap-3 mb-8">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`transition-all duration-300 rounded-full ${currentSlide === index
                                ? 'w-8 h-3 bg-orange-500'
                                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                                }`}
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <button
                        onClick={handleSkip}
                        className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl font-bold text-white text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Play size={22} fill="white" />
                            Continue to Site
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <button
                        onClick={handleSkip}
                        className="flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-colors"
                    >
                        <SkipForward size={18} />
                        Skip Intro ({countdown}s)
                    </button>
                </motion.div>

                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 right-8 flex items-center gap-3"
                >
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        {isPaused ? <Play size={20} /> : <span className="w-4 h-4 border-l-2 border-r-2 border-white" />}
                    </button>
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
