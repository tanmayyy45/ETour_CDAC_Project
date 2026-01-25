import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfigAPI } from '../../services/api';

export default function Ticker() {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                const res = await siteConfigAPI.getAnnouncements();
                if (res.data && Array.isArray(res.data)) {
                    setAnnouncements(res.data.filter(a => a.isActive));
                }
            } catch (error) {
                console.error('Error loading announcements:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAnnouncements();
    }, []);

    // Don't render if no announcements
    if (isLoading || announcements.length === 0) {
        return null;
    }

    const tickerText = announcements.map(a => a.message || a.announcementText).join('  •  ');

    return (
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-2 overflow-hidden">
            <motion.div
                animate={{
                    x: ['0%', '-50%'],
                }}
                transition={{
                    x: {
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                }}
                className="whitespace-nowrap"
            >
                <span className="inline-block text-white font-medium px-4">
                    {tickerText}  •  {tickerText}
                </span>
            </motion.div>
        </div>
    );
}
