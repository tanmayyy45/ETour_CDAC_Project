import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { mediaAPI } from '../services/api';

const categories = ['All', 'Domestic', 'International', 'Adventure'];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            try {
                const res = await mediaAPI.getAllPhotos();
                if (res.data && Array.isArray(res.data)) {
                    setImages(res.data);
                }
            } catch (error) {
                console.error('Error loading gallery:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadImages();
    }, []);

    const filteredImages = activeCategory === 'All'
        ? images
        : images.filter(img => img.category === activeCategory);

    const openLightbox = (image) => setSelectedImage(image);
    const closeLightbox = () => setSelectedImage(null);

    const navigateImage = (direction) => {
        if (!selectedImage || filteredImages.length === 0) return;
        const currentIndex = filteredImages.findIndex(img => img.mediaId === selectedImage.mediaId || img.id === selectedImage.id);
        const newIndex = direction === 'next'
            ? (currentIndex + 1) % filteredImages.length
            : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[newIndex]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative h-64 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Photo Gallery</h1>
                        <p className="text-white/80">Explore stunning destinations through our lens</p>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="container mx-auto px-4">
                    <div className="flex gap-2 py-4 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton aspect-square rounded-xl" />
                            ))}
                        </div>
                    ) : filteredImages.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        >
                            <AnimatePresence>
                                {filteredImages.map((image, index) => (
                                    <motion.div
                                        key={image.mediaId || image.id || index}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                                        onClick={() => openLightbox(image)}
                                    >
                                        <img
                                            src={image.mediaPath || image.src}
                                            alt={image.title || image.mediaTitle || 'Gallery image'}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-white font-semibold">{image.title || image.mediaTitle || 'Untitled'}</h3>
                                                <p className="text-white/70 text-sm">{image.category || 'Uncategorized'}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No images available in the gallery.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {filteredImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                                    className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <ChevronLeft size={24} />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                                    className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        <motion.img
                            key={selectedImage.mediaId || selectedImage.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            src={selectedImage.mediaPath || selectedImage.src}
                            alt={selectedImage.title || selectedImage.mediaTitle || 'Gallery image'}
                            className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                            <h3 className="text-xl font-semibold">{selectedImage.title || selectedImage.mediaTitle || 'Untitled'}</h3>
                            <p className="text-white/70">{selectedImage.category || 'Uncategorized'}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
