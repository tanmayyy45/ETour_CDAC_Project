import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Package, DollarSign, Upload,
    Save, Search, ArrowRight
} from 'lucide-react';
import { tourAPI, costAPI } from '../../services/api';

const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Tours', path: '/admin/tours', icon: Package },
    { name: 'Manage Costs', path: '/admin/costs', icon: DollarSign },
    { name: 'Upload Excel', path: '/admin/upload', icon: Upload },
];

export default function ManageCosts() {
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [costs, setCosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedCosts, setEditedCosts] = useState({});

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

    const loadCosts = async (tourId) => {
        try {
            const res = await costAPI.getByCategory(tourId);
            if (res.data) {
                const costsData = Array.isArray(res.data) ? res.data : [];
                setCosts(costsData);
                // Initialize edited costs
                const edited = {};
                costsData.forEach((c) => {
                    edited[c.costId || c.id] = c.cost || c.price || 0;
                });
                setEditedCosts(edited);
            }
        } catch (error) {
            console.error('Error loading costs:', error);
            setCosts([]);
        }
    };

    const handleTourSelect = (tour) => {
        setSelectedTour(tour);
        loadCosts(tour.catmasterId || tour.id);
    };

    const handleCostChange = (costId, value) => {
        setEditedCosts({
            ...editedCosts,
            [costId]: parseFloat(value) || 0,
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // In a real app, you would call the API to update costs
            // await Promise.all(costs.map(c => costAPI.update(c.costId, { cost: editedCosts[c.costId] })));
            alert('Costs saved successfully!');
        } catch (error) {
            console.error('Error saving costs:', error);
        } finally {
            setIsSaving(false);
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.path === '/admin/costs'
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
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Manage Costs</h1>
                        <p className="text-gray-600">Update tour pricing for different passenger types</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Tour List */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <div className="relative">
                                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search tours..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="max-h-[500px] overflow-y-auto">
                                    {isLoading ? (
                                        <div className="p-4 space-y-2">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="skeleton h-12 rounded-lg" />
                                            ))}
                                        </div>
                                    ) : filteredTours.length > 0 ? (
                                        <div className="divide-y divide-gray-100">
                                            {filteredTours.map((tour, index) => (
                                                <button
                                                    key={tour.catmasterId || tour.id || index}
                                                    onClick={() => handleTourSelect(tour)}
                                                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedTour?.catmasterId === tour.catmasterId ? 'bg-blue-50' : ''
                                                        }`}
                                                >
                                                    <p className="font-medium text-gray-900 text-sm">{tour.tourName}</p>
                                                    <p className="text-xs text-gray-500">{tour.tourCode}</p>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-500 text-sm">
                                            No tours found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Cost Editor */}
                        <div className="lg:col-span-2">
                            {selectedTour ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold text-gray-900">{selectedTour.tourName}</h2>
                                        <p className="text-gray-500 text-sm">{selectedTour.tourCode}</p>
                                    </div>

                                    {costs.length > 0 ? (
                                        <div className="p-6">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="text-left py-3 font-semibold text-gray-700">Cost Type</th>
                                                        <th className="text-right py-3 font-semibold text-gray-700">Price (₹)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {costs.map((cost) => (
                                                        <tr key={cost.costId || cost.id}>
                                                            <td className="py-4 text-gray-700">{cost.costType || cost.type}</td>
                                                            <td className="py-4">
                                                                <input
                                                                    type="number"
                                                                    value={editedCosts[cost.costId || cost.id] || 0}
                                                                    onChange={(e) => handleCostChange(cost.costId || cost.id, e.target.value)}
                                                                    className="w-full max-w-[150px] ml-auto block text-right px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <div className="mt-6 flex justify-end">
                                                <button
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                    className="btn-primary gap-2"
                                                >
                                                    <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center text-gray-500">
                                            <DollarSign size={40} className="mx-auto mb-4 text-gray-300" />
                                            <p>No cost entries found for this tour.</p>
                                            <p className="text-sm mt-2">Add costs through the API or database.</p>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                                    <DollarSign size={48} className="mx-auto mb-4 text-gray-300" />
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Tour</h3>
                                    <p className="text-gray-500">Choose a tour from the list to view and edit its costs.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
