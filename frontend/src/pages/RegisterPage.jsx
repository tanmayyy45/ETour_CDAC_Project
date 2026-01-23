import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Register:', formData);
        // Will be replaced with actual API call
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="logo">
                        <svg className="logo-icon" viewBox="0 0 40 40" fill="none" width="40" height="40">
                            <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
                            <path d="M20 10L28 26H12L20 10Z" fill="currentColor" />
                            <circle cx="20" cy="28" r="3" fill="currentColor" />
                        </svg>
                        <span>ETour</span>
                    </Link>
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Start your journey with us</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-checkbox">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                required
                            />
                            <span>
                                I agree to the <Link to="/terms" style={{ color: 'var(--primary-600)' }}>Terms & Conditions</Link>
                            </span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-full btn-lg">
                        Create Account
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
