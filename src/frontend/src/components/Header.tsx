import React, { useState } from 'react';
import { MenuIcon, XIcon, Globe, Search, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { LanguageSelector } from './LanguageSelector';
import { NotificationCenter } from './Notifications/NotificationCenter';
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Globe size={24} className="text-teal-600 mr-2" />
            <h1 className="text-2xl font-bold text-teal-600">NourishNet</h1>
          </Link>
        </div>
        {/* Desktop Search and Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <SearchBar />
          </div>
          <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors">
            Home
          </Link>
          <Link to="/request-support" className="text-gray-700 hover:text-teal-600 transition-colors">
            Request Support
          </Link>
          <Link to="/become-donor" className="text-gray-700 hover:text-teal-600 transition-colors">
            Become a Donor
          </Link>
          <Link to="/local-support" className="text-gray-700 hover:text-teal-600 transition-colors">
            Local Support
          </Link>
          <Link to="/about-us" className="text-gray-700 hover:text-teal-600 transition-colors">
            About Us
          </Link>
          <Link to="/social-activity" className="text-gray-700 hover:text-teal-600 transition-colors">
            Our Impact
          </Link>
          <Link to="/instant-support" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
            Instant Support
          </Link>
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <NotificationCenter />
            <div className="flex items-center space-x-2">
              <Link to="/signin" className="text-gray-700 hover:text-teal-600 transition-colors">
                Sign In
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/signup" className="text-gray-700 hover:text-teal-600 transition-colors">
                Sign Up
              </Link>
              <UserIcon size={20} className="text-gray-700" />
            </div>
          </div>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSelector />
          <NotificationCenter />
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-700">
            <Search size={20} />
          </button>
          <button className="text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Search Bar */}
      {isSearchOpen && <div className="md:hidden bg-white px-4 pb-3">
          <SearchBar />
        </div>}
      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-teal-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/request-support" className="text-gray-700 hover:text-teal-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Request Support
            </Link>
            <Link to="/become-donor" className="text-gray-700 hover:text-teal-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Become a Donor
            </Link>
            <Link to="/local-support" className="text-gray-700 hover:text-teal-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Local Support
            </Link>
            <Link to="/about-us" className="text-gray-700 hover:text-teal-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/social-activity" className="text-gray-700 hover:text-teal-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Our Impact
            </Link>
            <Link to="/instant-support" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Instant Support
            </Link>
            <Link to="/volunteer-registration" className="text-gray-700 hover:text-teal-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Volunteer
            </Link>
            <div className="flex items-center space-x-4 py-2">
              <Link to="/signin" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>}
    </header>;
}