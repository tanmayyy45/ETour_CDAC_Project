import { useState } from 'react';

const CustomerForm = ({ initialData = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        email: initialData.email || '',
        mobileNumber: initialData.mobileNumber || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when field is modified
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
        else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
            newErrors.mobileNumber = 'Invalid mobile number';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            onSubmit?.(formData);
        } else {
            setErrors(newErrors);
        }
    };

    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 sm-grid-cols-1 gap-4">
                <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`form-input ${errors.mobileNumber ? 'error' : ''}`}
                    />
                    {errors.mobileNumber && <span className="form-error">{errors.mobileNumber}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className={`form-input ${errors.city ? 'error' : ''}`}
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Address *</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        className={`form-input form-textarea ${errors.address ? 'error' : ''}`}
                        rows="3"
                    />
                    {errors.address && <span className="form-error">{errors.address}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">State *</label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`form-input form-select ${errors.state ? 'error' : ''}`}
                    >
                        <option value="">Select State</option>
                        {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    {errors.state && <span className="form-error">{errors.state}</span>}
                </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn btn-ghost">
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn btn-primary">
                    Continue
                </button>
            </div>
        </form>
    );
};

export default CustomerForm;
