import { useState } from 'react';

const SearchForm = ({ onSearch, showFilters = true }) => {
    const [formData, setFormData] = useState({
        destination: '',
        fromDate: '',
        toDate: '',
        minCost: '',
        maxCost: '',
        minDuration: '',
        maxDuration: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch?.(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form-wrapper">
            <div className="search-form-grid">
                <div className="form-group">
                    <label className="form-label">Destination</label>
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Where do you want to go?"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">From Date</label>
                    <input
                        type="date"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">To Date</label>
                    <input
                        type="date"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                {showFilters && (
                    <>
                        <div className="form-group">
                            <label className="form-label">Min Budget (₹)</label>
                            <input
                                type="number"
                                name="minCost"
                                value={formData.minCost}
                                onChange={handleChange}
                                placeholder="10,000"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Max Budget (₹)</label>
                            <input
                                type="number"
                                name="maxCost"
                                value={formData.maxCost}
                                onChange={handleChange}
                                placeholder="50,000"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Duration (Days)</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="minDuration"
                                    value={formData.minDuration}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    className="form-input"
                                    style={{ flex: 1 }}
                                />
                                <input
                                    type="number"
                                    name="maxDuration"
                                    value={formData.maxDuration}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    className="form-input"
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <button type="submit" className="btn btn-primary btn-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    Search Tours
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
