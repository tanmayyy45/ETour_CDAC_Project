import { useState, useEffect } from 'react';

const PassengerForm = ({
    passengerNumber,
    initialData = {},
    departureDate,
    onDataChange,
    onRemove,
    canRemove = true
}) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        dateOfBirth: initialData.dateOfBirth || '',
        gender: initialData.gender || '',
        age: initialData.age || '',
        passengerType: initialData.passengerType || 'Adult',
    });

    // Calculate age from date of birth
    useEffect(() => {
        if (formData.dateOfBirth && departureDate) {
            const dob = new Date(formData.dateOfBirth);
            const departure = new Date(departureDate);
            let age = departure.getFullYear() - dob.getFullYear();
            const monthDiff = departure.getMonth() - dob.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && departure.getDate() < dob.getDate())) {
                age--;
            }

            // Determine passenger type based on age
            let passengerType = 'Adult';
            if (age < 2) passengerType = 'Infant';
            else if (age < 12) passengerType = 'Child';
            else if (age >= 60) passengerType = 'Senior';

            setFormData(prev => ({ ...prev, age, passengerType }));
        }
    }, [formData.dateOfBirth, departureDate]);

    useEffect(() => {
        onDataChange?.(formData);
    }, [formData, onDataChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="passenger-card">
            <div className="passenger-header">
                <span className="passenger-title">Passenger {passengerNumber}</span>
                {canRemove && (
                    <button
                        type="button"
                        className="remove-passenger"
                        onClick={onRemove}
                    >
                        Remove
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 sm-grid-cols-1 gap-4">
                <div className="form-group">
                    <label className="form-label">Full Name (as per ID)</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="form-input"
                        max={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-input form-select"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Age & Type</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={formData.age ? `${formData.age} years` : '-'}
                            className="form-input"
                            readOnly
                            style={{ flex: 1 }}
                        />
                        <span className={`badge ${formData.passengerType === 'Adult' ? 'badge-primary' :
                                formData.passengerType === 'Child' ? 'badge-secondary' :
                                    formData.passengerType === 'Infant' ? 'badge-warning' :
                                        'badge-success'
                            }`} style={{ alignSelf: 'center' }}>
                            {formData.passengerType}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassengerForm;
