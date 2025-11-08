import React, { useEffect, useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const languages = [{
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  }, {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸'
  }, {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷'
  }, {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪'
  }, {
    code: 'fi',
    name: 'Suomi',
    flag: '🇫🇮'
  }, {
    code: 'sv',
    name: 'Svenska',
    flag: '🇸🇪'
  }, {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  }, {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦'
  }, {
    code: 'hi',
    name: 'हिन्दी',
    flag: '🇮🇳'
  }, {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺'
  }, {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷'
  }, {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵'
  }];
  const changeLanguage = langCode => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
    // In a real implementation, this would change the app's language
    console.log(`Language changed to ${langCode}`);
    // Store language preference
    localStorage.setItem('preferredLanguage', langCode);
    // Optional: reload page to apply language change
    // window.location.reload()
  };
  // Load preferred language on component mount
  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
      setSelectedLanguage(storedLang);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = languages.find(lang => lang.code === browserLang);
      if (supportedLang) {
        setSelectedLanguage(browserLang);
      }
    }
  }, []);
  const selectedLangInfo = languages.find(lang => lang.code === selectedLanguage);
  return <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 transition-colors py-1 px-2 rounded-md hover:bg-gray-100">
        <Globe size={16} />
        <span className="text-sm hidden md:inline-block">
          {selectedLangInfo?.flag} {selectedLangInfo?.code.toUpperCase()}
        </span>
        <span className="text-sm md:hidden">{selectedLangInfo?.flag}</span>
        <ChevronDown size={14} />
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
          <div className="py-1 max-h-80 overflow-y-auto">
            {languages.map(language => <button key={language.code} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between" onClick={() => changeLanguage(language.code)}>
                <span>
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </span>
                {selectedLanguage === language.code && <Check size={16} className="text-teal-600" />}
              </button>)}
          </div>
        </div>}
    </div>;
}