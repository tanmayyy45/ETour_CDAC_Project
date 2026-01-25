import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { categoryAPI, tourAPI } from '../services/api';

export default function SectorPage() {
    const { sectorId, subsectorId } = useParams();
    const [data, setData] = useState([]);
    const [sectorName, setSectorName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const isSubsector = !!subsectorId;

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                if (isSubsector) {
                    // Load tours for subsector
                    const res = await tourAPI.getTourDetails(subsectorId);
                    if (res.data) {
                        setData(Array.isArray(res.data) ? res.data : [res.data]);
                    }
                } else {
                    // Load subsectors for sector
                    const res = await categoryAPI.getSubCategories(sectorId);
                    if (res.data) {
                        setData(res.data);
                        if (res.data.length > 0 && res.data[0].parentCategory) {
                            setSectorName(res.data[0].parentCategory.categoryName || 'Tours');
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading data:', error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [sectorId, subsectorId, isSubsector]);

    // Pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Background */}
            <div className="relative h-64 md:h-80 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="breadcrumbs text-white/80 mb-4">
                        <Link to="/home" className="hover:text-white">Home</Link>
                        <ChevronRight size={16} className="separator" />
                        <Link to="/tours" className="hover:text-white">Tours</Link>
                        <ChevronRight size={16} className="separator" />
                        <span className="text-white">{sectorName || `Category ${sectorId}`}</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        {sectorName || 'Tour Category'}
                    </h1>
                    <p className="text-white/80 mt-2">
                        {isSubsector
                            ? 'Explore available tour packages'
                            : 'Choose from our destinations'}
                    </p>
                </div>
            </div>

            {/* Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton h-64 rounded-2xl" />
                            ))}
                        </div>
                    ) : data.length > 0 ? (
                        isSubsector ? (
                            // Tour Products Grid
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {paginatedData.map((item, index) => (
                                    <motion.div
                                        key={item.catmasterId || item.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link to={`/tour/${item.catmasterId || item.id}`} className="tour-card group block">
                                            <div className="image-container">
                                                <img
                                                    src={item.thumbnailPath || '/placeholder-tour.jpg'}
                                                    alt={item.tourName}
                                                    className="image"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                                    }}
                                                />
                                                <span className="duration-badge">{item.duration || 'N/A'}</span>
                                                <div className="price-badge">
                                                    <p className="price-label">Starting from</p>
                                                    <p className="price">₹{(item.startingCost || 0).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h3 className="title">{item.tourName}</h3>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {item.duration || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            // Subsector Icons Grid
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {paginatedData.map((item, index) => (
                                    <motion.div
                                        key={item.categoryId || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={`/sector/${sectorId}/${item.categoryId}`}
                                            className="group block relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg hover-lift bg-gradient-to-br from-blue-500 to-purple-600"
                                        >
                                            {item.imagePath && (
                                                <img
                                                    src={item.imagePath}
                                                    alt={item.categoryName}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                            <div className="absolute inset-0 flex flex-col justify-end p-4">
                                                <h3 className="text-xl font-bold text-white mb-1">{item.categoryName}</h3>
                                                <p className="text-white/70 text-sm">Explore packages</p>
                                            </div>
                                            <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight size={18} className="text-white" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg mb-4">No data available for this category.</p>
                            <Link to="/tours" className="btn-primary">
                                Browse All Tours
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="pagination-btn"
                            >
                                <ArrowLeft size={18} />
                            </button>

                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                const page = i + 1;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="pagination-btn"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
