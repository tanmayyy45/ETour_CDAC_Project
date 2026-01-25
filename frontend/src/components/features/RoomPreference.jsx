import { motion } from 'framer-motion';
import { Bed, Users, User } from 'lucide-react';

const roomOptions = [
    {
        id: 'AUTO',
        name: 'Auto Assign',
        description: 'System will automatically assign rooms based on passenger count',
        icon: Users,
    },
    {
        id: 'ODD_SINGLE_TWIN',
        name: 'Single + Twin',
        description: 'Assign single room for odd travelers, twin sharing for pairs',
        icon: User,
    },
    {
        id: 'ALL_TWIN_RANDOM',
        name: 'All Twin Sharing',
        description: 'All travelers will be assigned twin sharing rooms randomly',
        icon: Bed,
    },
];

export default function RoomPreference({ value, onChange }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
                Room Preference
            </label>
            <div className="grid md:grid-cols-3 gap-4">
                {roomOptions.map((option) => (
                    <motion.label
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${value === option.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                    >
                        <input
                            type="radio"
                            name="roomPreference"
                            value={option.id}
                            checked={value === option.id}
                            onChange={() => onChange(option.id)}
                            className="sr-only"
                        />
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${value === option.id ? 'bg-blue-100' : 'bg-gray-100'
                                }`}>
                                <option.icon
                                    size={20}
                                    className={value === option.id ? 'text-blue-600' : 'text-gray-500'}
                                />
                            </div>
                            <span className={`font-medium ${value === option.id ? 'text-blue-900' : 'text-gray-900'
                                }`}>
                                {option.name}
                            </span>
                        </div>
                        <p className={`text-sm ${value === option.id ? 'text-blue-700' : 'text-gray-500'
                            }`}>
                            {option.description}
                        </p>

                        {value === option.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                        )}
                    </motion.label>
                ))}
            </div>
        </div>
    );
}
