import { useState } from 'react';
import { PageLayout } from '../components/layout';

const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your feedback! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    return (
        <PageLayout>
            <div className="static-page">
                <section className="static-hero">
                    <div className="container">
                        <h1>Contact Us</h1>
                    </div>
                </section>

                <section className="static-content">
                    <div className="container">
                        <div className="contact-section">
                            <div className="contact-info">
                                <h2>Get in Touch</h2>
                                <p className="text-secondary mb-8">
                                    Have questions about our tours? Want to share feedback?
                                    We'd love to hear from you!
                                </p>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div className="contact-text">
                                        <h3>Head Office</h3>
                                        <p>123 Travel Plaza, MG Road<br />Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                        </svg>
                                    </div>
                                    <div className="contact-text">
                                        <h3>Phone</h3>
                                        <p>Toll Free: 1800-123-4567<br />Support: +91 22 1234 5678</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div className="contact-text">
                                        <h3>Email</h3>
                                        <p>info@etour.com<br />support@etour.com</p>
                                    </div>
                                </div>

                                <div className="contact-item">
                                    <div className="contact-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div className="contact-text">
                                        <h3>Working Hours</h3>
                                        <p>Mon - Sat: 9:00 AM - 7:00 PM<br />Sunday: 10:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form">
                                <h3 className="mb-6">Send us a Message</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Your Name</label>
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

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
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
                                            <label className="form-label">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Your phone number"
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Subject</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-input form-select"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="booking">Booking Inquiry</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="complaint">Complaint</option>
                                            <option value="partnership">Business Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Write your message here..."
                                            className="form-input form-textarea"
                                            rows="5"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-full">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
};

export default FeedbackPage;
