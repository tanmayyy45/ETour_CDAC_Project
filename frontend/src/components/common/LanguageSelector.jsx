import { useState } from 'react';

const LanguageSelector = ({ currentLanguage = 'en', onLanguageChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
        { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    ];

    const selectedLanguage = languages.find(l => l.code === currentLanguage) || languages[0];

    const handleSelect = (code) => {
        onLanguageChange?.(code);
        setIsOpen(false);
    };

    return (
        <div className="language-selector" onMouseLeave={() => setIsOpen(false)}>
            <button
                className="language-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span>{selectedLanguage.flag}</span>
                <span>{selectedLanguage.name}</span>
                <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
            </button>

            {isOpen && (
                <div className="language-dropdown" role="listbox">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`language-option ${lang.code === currentLanguage ? 'active' : ''}`}
                            onClick={() => handleSelect(lang.code)}
                            role="option"
                            aria-selected={lang.code === currentLanguage}
                        >
                            <span>{lang.flag}</span>
                            <span style={{ marginLeft: '8px' }}>{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
