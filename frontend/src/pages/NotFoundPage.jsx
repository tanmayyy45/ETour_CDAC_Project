import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                {/* 404 Illustration */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                    className="mb-8"
                >
                    <span className="text-[150px] md:text-[200px] font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none">
                        404
                    </span>
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Oops! Page Not Found
                </h1>

                <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
                    Looks like you've wandered off the beaten path.
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/home"
                        className="btn-primary gap-2 px-6 py-3"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <Link
                        to="/search"
                        className="btn-secondary gap-2 px-6 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                    >
                        <Search size={18} />
                        Search Tours
                    </Link>
                </div>

                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/10 rounded-full"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                            }}
                            animate={{
                                y: [null, Math.random() * -200],
                                opacity: [0.1, 0.5, 0.1],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
