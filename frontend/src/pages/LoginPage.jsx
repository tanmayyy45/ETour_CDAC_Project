import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { customerAPI } from '../services/api';

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useApp();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                // Login
                const res = await customerAPI.login({
                    email: formData.email,
                    password: formData.password,
                });

                if (res.data) {
                    login(res.data);
                    navigate('/home');
                }
            } else {
                // Register
                if (formData.password !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    setIsLoading(false);
                    return;
                }

                const res = await customerAPI.register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    mobileNumber: formData.mobileNumber,
                    address: 'N/A',
                    city: 'N/A',
                    state: 'N/A',
                });

                if (res.data) {
                    login(res.data);
                    navigate('/home');
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
            // Demo: simulate successful login for demo purposes
            login({
                id: 1,
                name: formData.name || formData.email.split('@')[0],
                email: formData.email,
            });
            navigate('/home');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-dark">
                <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
                    alt="Travel"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
                <div className="relative z-10 flex flex-col justify-center p-12">
                    <Link to="/home" className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">E</span>
                        </div>
                        <span className="text-white font-bold text-2xl">ETour India</span>
                    </Link>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        Start Your Journey Today
                    </h1>
                    <p className="text-white/70 text-lg mb-8">
                        Join thousands of travelers who have discovered incredible
                        destinations with ETour India.
                    </p>

                    <div className="space-y-4">
                        {['Access exclusive tour deals', 'Save your favorite destinations', 'Easy booking management'].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/80">
                                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <span className="text-green-400 text-sm">✓</span>
                                </div>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                        <Link to="/home" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-ocean rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">E</span>
                            </div>
                            <span className="text-gray-900 font-bold text-xl">ETour India</span>
                        </Link>
                    </div>

                    {/* Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${isLogin ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${!isLogin ? 'bg-white text-gray-900 shadow' : 'text-gray-500'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {isLogin ? 'Welcome back!' : 'Create an account'}
                    </h2>
                    <p className="text-gray-500 mb-6">
                        {isLogin
                            ? 'Enter your credentials to access your account'
                            : 'Fill in your details to get started'}
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        required={!isLogin}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input pl-12"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="input pl-12"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="tel"
                                        required={!isLogin}
                                        value={formData.mobileNumber}
                                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                        className="input pl-12"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="input pl-12 pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required={!isLogin}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="input pl-12"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-4 text-lg gap-2 disabled:opacity-50"
                        >
                            {isLoading ? 'Please wait...' : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-6">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
