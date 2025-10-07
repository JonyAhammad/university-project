import React, { useEffect, useState, useRef } from 'react';
import { Search, User, File, HeartHandshake, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { performSearch, getCategoryIcon, getCategoryLabel, SEARCH_CATEGORIES } from '../utils/searchUtils';
export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  // Handle click outside to close search results
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Handle search input change
  const handleSearch = e => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const searchResults = performSearch(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };
  // Handle search submission
  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // Store search query in session storage for results page
      sessionStorage.setItem('lastSearchQuery', searchQuery);
      setIsSearchFocused(false);
      navigate('/search-results');
    }
  };
  // Navigate to result page
  const navigateToResult = result => {
    setSearchQuery('');
    setResults([]);
    setIsSearchFocused(false);
    // Handle navigation based on result type
    if (result.category === SEARCH_CATEGORIES.FOUNDERS) {
      navigate('/about-us', {
        state: {
          highlightFounderId: result.data.id
        }
      });
    } else {
      navigate(result.path);
    }
  };
  // Render icon for search result based on category
  const renderResultIcon = category => {
    const iconName = getCategoryIcon(category);
    switch (iconName) {
      case 'User':
        return <User size={16} className="text-gray-500" />;
      case 'File':
        return <File size={16} className="text-gray-500" />;
      case 'HeartHandshake':
        return <HeartHandshake size={16} className="text-gray-500" />;
      case 'MapPin':
        return <MapPin size={16} className="text-gray-500" />;
      default:
        return <Search size={16} className="text-gray-500" />;
    }
  };
  // Group results by category for display
  const groupedResults = results.reduce((acc, result) => {
    const category = result.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {});
  return <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-grow">
          <input type="text" value={searchQuery} onChange={handleSearch} onFocus={() => setIsSearchFocused(true)} placeholder="Search for founders, services, locations..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          {searchQuery && <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => {
          setSearchQuery('');
          setResults([]);
        }}>
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>}
        </div>
        <button type="submit" className="ml-2 bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors">
          <Search size={16} />
          <span className="sr-only">Search</span>
        </button>
      </form>
      {isSearchFocused && results.length > 0 && <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-96 overflow-y-auto">
          {Object.keys(groupedResults).map(category => <div key={category} className="px-2 py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1">
                {getCategoryLabel(category)}
              </div>
              <ul>
                {groupedResults[category].map(result => <li key={result.id} className="px-2 py-2 hover:bg-teal-50 cursor-pointer rounded-md" onClick={() => navigateToResult(result)}>
                    <div className="flex items-center">
                      <div className="mr-3">
                        {renderResultIcon(result.category)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {result.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {result.description}
                        </div>
                      </div>
                    </div>
                  </li>)}
              </ul>
            </div>)}
        </div>}
      {isSearchFocused && searchQuery.length > 1 && results.length === 0 && <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 py-4">
          <div className="text-center text-gray-500">
            No results found for "{searchQuery}"
          </div>
        </div>}
    </div>;
}