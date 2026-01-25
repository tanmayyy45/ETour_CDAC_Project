import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Package, DollarSign, Upload,
    Plus, Edit, Trash2, Search, ArrowRight
} from 'lucide-react';
import { tourAPI } from '../../services/api';

const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Tours', path: '/admin/tours', icon: Package },
    { name: 'Manage Costs', path: '/admin/costs', icon: DollarSign },
    { name: 'Upload Excel', path: '/admin/upload', icon: Upload },
];

export default function ManageTours() {
    const [tours, setTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTour, setNewTour] = useState({
        tourCode: '',
        tourName: '',
        duration: '',
        startingCost: '',
        highlights: '',
    });

    useEffect(() => {
        loadTours();
    }, []);

    const loadTours = async () => {
        setIsLoading(true);
        try {
            const res = await tourAPI.getAllTours();
            if (res.data) {
                setTours(Array.isArray(res.data) ? res.data : []);
            }
        } catch (error) {
            console.error('Error loading tours:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTour = async (e) => {
        e.preventDefault();
        try {
            await tourAPI.createTour({
                ...newTour,
                startingCost: parseFloat(newTour.startingCost),
            });
            setShowAddModal(false);
            setNewTour({ tourCode: '', tourName: '', duration: '', startingCost: '', highlights: '' });
            loadTours();
        } catch (error) {
            console.error('Error adding tour:', error);
        }
    };

    const handleDeleteTour = async (id) => {
        if (window.confirm('Are you sure you want to delete this tour?')) {
            try {
                await tourAPI.deleteTour(id);
                loadTours();
            } catch (error) {
                console.error('Error deleting tour:', error);
            }
        }
    };

    const filteredTours = tours.filter(tour =>
        tour.tourName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.tourCode?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 min-h-screen bg-gradient-dark text-white">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <span className="text-xl font-bold">E</span>
                            </div>
                            <div>
                                <h1 className="font-bold">ETour Admin</h1>
                                <p className="text-xs text-white/60">Management Panel</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.path === '/admin/tours'
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto p-6 border-t border-white/10">
                        <Link to="/home" className="text-white/60 hover:text-white text-sm flex items-center gap-2">
                            <ArrowRight size={16} /> Back to Website
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Manage Tours</h1>
                            <p className="text-gray-600">Add, edit, and manage tour packages</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary gap-2"
                        >
                            <Plus size={18} /> Add New Tour
                        </button>
                    </div>

                    {/* Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tours by name or code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Tours Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {isLoading ? (
                            <div className="p-6 space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="skeleton h-16 rounded-xl" />
                                ))}
                            </div>
                        ) : filteredTours.length > 0 ? (
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold text-gray-700">Tour Code</th>
                                        <th className="text-left p-4 font-semibold text-gray-700">Tour Name</th>
                                        <th className="text-left p-4 font-semibold text-gray-700">Duration</th>
                                        <th className="text-left p-4 font-semibold text-gray-700">Starting Cost</th>
                                        <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                                        <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredTours.map((tour, index) => (
                                        <motion.tr
                                            key={tour.catmasterId || tour.id || index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="p-4 text-gray-900 font-medium">{tour.tourCode}</td>
                                            <td className="p-4 text-gray-700">{tour.tourName}</td>
                                            <td className="p-4 text-gray-700">{tour.duration || 'N/A'}</td>
                                            <td className="p-4 text-gray-700">₹{(tour.startingCost || 0).toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${tour.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {tour.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTour(tour.catmasterId || tour.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-12 text-center text-gray-500">
                                No tours found. Click "Add New Tour" to create one.
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Add Tour Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl max-w-lg w-full"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Add New Tour</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleAddTour} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tour Code *</label>
                                <input
                                    type="text"
                                    required
                                    value={newTour.tourCode}
                                    onChange={(e) => setNewTour({ ...newTour, tourCode: e.target.value })}
                                    className="input"
                                    placeholder="e.g., KSH-001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tour Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={newTour.tourName}
                                    onChange={(e) => setNewTour({ ...newTour, tourName: e.target.value })}
                                    className="input"
                                    placeholder="e.g., Kashmir Valley Tour"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                    <input
                                        type="text"
                                        value={newTour.duration}
                                        onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
                                        className="input"
                                        placeholder="e.g., 6N/7D"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Starting Cost (₹)</label>
                                    <input
                                        type="number"
                                        value={newTour.startingCost}
                                        onChange={(e) => setNewTour({ ...newTour, startingCost: e.target.value })}
                                        className="input"
                                        placeholder="e.g., 25000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Highlights (separated by |)</label>
                                <textarea
                                    value={newTour.highlights}
                                    onChange={(e) => setNewTour({ ...newTour, highlights: e.target.value })}
                                    className="input min-h-[80px]"
                                    placeholder="e.g., Houseboat Stay|Shikara Ride|Pahalgam Visit"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary flex-1">
                                    Add Tour
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
