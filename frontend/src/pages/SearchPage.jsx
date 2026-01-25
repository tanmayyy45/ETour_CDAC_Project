import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, Calendar, DollarSign, Clock, Filter, X,
    ChevronRight, MapPin, ArrowUpDown
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { searchAPI } from '../services/api';

export default function SearchPage() {
    const [filters, setFilters] = useState({
        fromDate: '',
        toDate: '',
        minCost: '',
        maxCost: '',
        minDays: '',
        maxDays: '',
    });
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        setHasSearched(true);
        try {
            const params = {};
            if (filters.fromDate) params.fromDate = filters.fromDate;
            if (filters.toDate) params.toDate = filters.toDate;
            if (filters.minCost) params.minCost = filters.minCost;
            if (filters.maxCost) params.maxCost = filters.maxCost;
            if (filters.minDays) params.minDays = filters.minDays;
            if (filters.maxDays) params.maxDays = filters.maxDays;

            const res = await searchAPI.searchTours(params);
            if (res.data) {
                setResults(Array.isArray(res.data) ? res.data : []);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFilters({
            fromDate: '',
            toDate: '',
            minCost: '',
            maxCost: '',
            minDays: '',
            maxDays: '',
        });
        setResults([]);
        setHasSearched(false);
    };

    // Sort results
    const sortedResults = [...results].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return (a.cost || a.startingCost || 0) - (b.cost || b.startingCost || 0);
            case 'price-high':
                return (b.cost || b.startingCost || 0) - (a.cost || a.startingCost || 0);
            case 'duration':
                return parseInt(a.duration || '0') - parseInt(b.duration || '0');
            case 'date':
            default:
                return new Date(a.startDate || a.departureDate || 0) - new Date(b.startDate || b.departureDate || 0);
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative h-48 md:h-64 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Search Tours</h1>
                        <p className="text-white/80">Find tour packages with our advanced filters</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className={`lg:w-80 shrink-0 ${isFiltersOpen ? 'fixed inset-0 z-50 bg-white overflow-auto lg:relative lg:bg-transparent' : 'hidden lg:block'}`}>
                        {isFiltersOpen && (
                            <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                                <h2 className="font-bold text-lg">Filters</h2>
                                <button onClick={() => setIsFiltersOpen(false)} className="p-2">
                                    <X size={24} />
                                </button>
                            </div>
                        )}

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
                            <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2">
                                <Filter size={20} /> Search Filters
                            </h3>

                            {/* Date Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Calendar size={16} className="inline mr-1" /> Travel Period
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500">From</label>
                                        <input
                                            type="date"
                                            value={filters.fromDate}
                                            onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                                            className="input mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">To</label>
                                        <input
                                            type="date"
                                            value={filters.toDate}
                                            onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                                            className="input mt-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Cost Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign size={16} className="inline mr-1" /> Budget Range (₹)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500">Min</label>
                                        <input
                                            type="number"
                                            placeholder="10,000"
                                            value={filters.minCost}
                                            onChange={(e) => setFilters({ ...filters, minCost: e.target.value })}
                                            className="input mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Max</label>
                                        <input
                                            type="number"
                                            placeholder="50,000"
                                            value={filters.maxCost}
                                            onChange={(e) => setFilters({ ...filters, maxCost: e.target.value })}
                                            className="input mt-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Duration Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock size={16} className="inline mr-1" /> Duration (Days)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500">Min Days</label>
                                        <input
                                            type="number"
                                            placeholder="3"
                                            value={filters.minDays}
                                            onChange={(e) => setFilters({ ...filters, minDays: e.target.value })}
                                            className="input mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500">Max Days</label>
                                        <input
                                            type="number"
                                            placeholder="15"
                                            value={filters.maxDays}
                                            onChange={(e) => setFilters({ ...filters, maxDays: e.target.value })}
                                            className="input mt-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleSearch}
                                    className="btn-primary w-full gap-2"
                                    disabled={isLoading}
                                >
                                    <Search size={18} />
                                    {isLoading ? 'Searching...' : 'Search Tours'}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="btn-secondary w-full"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Results Area */}
                    <main className="flex-1">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {hasSearched ? `${sortedResults.length} Tours Found` : 'Search for Tours'}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {hasSearched ? 'Showing results matching your criteria' : 'Use filters to search for tours'}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsFiltersOpen(true)}
                                    className="lg:hidden btn-secondary px-4 py-2"
                                >
                                    <Filter size={18} className="mr-2" /> Filters
                                </button>

                                {hasSearched && results.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <ArrowUpDown size={16} className="text-gray-500" />
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="input py-2 pl-3 pr-8"
                                        >
                                            <option value="date">Sort by Date</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="duration">Duration</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Results Table/Cards */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {!hasSearched ? (
                                <div className="p-12 text-center">
                                    <Search size={48} className="text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Search</h3>
                                    <p className="text-gray-500 mb-4">
                                        Use the filters on the left to search for tour packages
                                    </p>
                                    <button onClick={handleSearch} className="btn-primary">
                                        Search All Tours
                                    </button>
                                </div>
                            ) : isLoading ? (
                                <div className="p-8 text-center">
                                    <div className="spinner mx-auto mb-4" />
                                    <p className="text-gray-500">Searching for tours...</p>
                                </div>
                            ) : sortedResults.length === 0 ? (
                                <div className="p-8 text-center">
                                    <p className="text-gray-500 mb-4">No tours found matching your criteria.</p>
                                    <button onClick={handleReset} className="btn-primary">
                                        Reset Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Table Header - Desktop */}
                                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                                        <div className="col-span-4">Tour</div>
                                        <div className="col-span-2 text-center">Start Date</div>
                                        <div className="col-span-2 text-center">End Date</div>
                                        <div className="col-span-2 text-center">Duration</div>
                                        <div className="col-span-2 text-center">Cost</div>
                                    </div>

                                    {/* Results List */}
                                    {sortedResults.map((tour, index) => (
                                        <motion.div
                                            key={tour.tourId || tour.id || index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Desktop Row */}
                                            <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center">
                                                <div className="col-span-4 flex items-center gap-4">
                                                    {tour.thumbnailPath && (
                                                        <img
                                                            src={tour.thumbnailPath}
                                                            alt={tour.tourName}
                                                            className="w-16 h-16 rounded-lg object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                    )}
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{tour.tourName}</p>
                                                        <p className="text-sm text-gray-500">{tour.tourCode}</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-center text-gray-700">
                                                    {tour.startDate ? new Date(tour.startDate).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }) : 'N/A'}
                                                </div>
                                                <div className="col-span-2 text-center text-gray-700">
                                                    {tour.endDate ? new Date(tour.endDate).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    }) : 'N/A'}
                                                </div>
                                                <div className="col-span-2 text-center">
                                                    <span className="badge badge-primary">{tour.duration || 'N/A'}</span>
                                                </div>
                                                <div className="col-span-2 flex items-center justify-between">
                                                    <span className="font-bold text-gray-900">₹{(tour.cost || tour.startingCost || 0).toLocaleString()}</span>
                                                    <Link
                                                        to={`/tour/${tour.tourId || tour.id}`}
                                                        className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1"
                                                    >
                                                        Details <ChevronRight size={16} />
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Mobile Card */}
                                            <div className="md:hidden p-4">
                                                <div className="flex gap-4">
                                                    {tour.thumbnailPath && (
                                                        <img
                                                            src={tour.thumbnailPath}
                                                            alt={tour.tourName}
                                                            className="w-24 h-24 rounded-lg object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900">{tour.tourName}</h3>
                                                        <p className="text-sm text-gray-500 mb-2">{tour.tourCode}</p>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                            <Calendar size={14} />
                                                            <span>{tour.startDate ? new Date(tour.startDate).toLocaleDateString('en-IN') : 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="badge badge-primary">{tour.duration || 'N/A'}</span>
                                                            <span className="font-bold text-lg text-gray-900">₹{(tour.cost || tour.startingCost || 0).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/tour/${tour.tourId || tour.id}`}
                                                    className="btn-primary w-full mt-4"
                                                >
                                                    Get Details
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
