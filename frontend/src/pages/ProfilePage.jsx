import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit, Save, X, LogOut } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { customerAPI } from '../services/api';
import { useApp } from '../context/AppContext';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, logout } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        address: '',
        city: '',
        state: '',
    });

    const [editedProfile, setEditedProfile] = useState({ ...profile });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const loadProfile = async () => {
            setIsLoading(true);
            try {
                const res = await customerAPI.getProfile(user.id || user.customerId);
                if (res.data) {
                    setProfile(res.data);
                    setEditedProfile(res.data);
                }
            } catch (err) {
                console.error('Error loading profile:', err);
                // Fallback to user context data
                setProfile({
                    name: user.name || '',
                    email: user.email || '',
                    mobileNumber: user.mobileNumber || '',
                    address: user.address || '',
                    city: user.city || '',
                    state: user.state || '',
                });
                setEditedProfile({
                    name: user.name || '',
                    email: user.email || '',
                    mobileNumber: user.mobileNumber || '',
                    address: user.address || '',
                    city: user.city || '',
                    state: user.state || '',
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [user, navigate]);

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            await customerAPI.updateProfile(user.id || user.customerId, editedProfile);
            setProfile(editedProfile);
            setIsEditing(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setEditedProfile({ ...profile });
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    if (!user) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-2xl mx-auto">
                        <div className="skeleton h-48 rounded-2xl mb-6" />
                        <div className="skeleton h-96 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative h-64 bg-gradient-dark">
                <Navbar />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
                <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl font-bold text-blue-600">
                                {profile.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{profile.name || 'User'}</h1>
                            <p className="text-white/80">{profile.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                            <p className="text-green-700">Profile updated successfully!</p>
                        </div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="btn-secondary gap-2"
                                >
                                    <Edit size={16} /> Edit
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="btn-secondary gap-2"
                                    >
                                        <X size={16} /> Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="btn-primary gap-2"
                                    >
                                        <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Form */}
                        <div className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <User size={16} /> Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.name}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                                            className="input"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-3">{profile.name || 'Not set'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Mail size={16} /> Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editedProfile.email}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                                            className="input"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-3">{profile.email || 'Not set'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <Phone size={16} /> Mobile Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editedProfile.mobileNumber}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, mobileNumber: e.target.value })}
                                            className="input"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-3">{profile.mobileNumber || 'Not set'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                        <MapPin size={16} /> City
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.city}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, city: e.target.value })}
                                            className="input"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-3">{profile.city || 'Not set'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedProfile.state}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                                            className="input"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-3">{profile.state || 'Not set'}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    {isEditing ? (
                                        <textarea
                                            value={editedProfile.address}
                                            onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                                            className="input min-h-[100px]"
                                        />
                                    ) : (
                                        <p className="text-gray-900 py-3">{profile.address || 'Not set'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
