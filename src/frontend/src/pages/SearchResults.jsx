import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LiveChat } from '../components/Chat/LiveChat';
import { Search, User, File, HeartHandshake, MapPin, Heart, Users, Filter, XCircle } from 'lucide-react';
import { performSearch, getCategoryIcon, getCategoryLabel, SEARCH_CATEGORIES } from '../utils/searchUtils';
export function SearchResults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // Load search query from session storage
  useEffect(() => {
    const query = sessionStorage.getItem('lastSearchQuery');
    if (query) {
      setSearchQuery(query);
      performSearchQuery(query);
    } else {
      setIsLoading(false);
    }
  }, []);
  // Filter results when filters change
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredResults(results);
    } else {
      const filtered = results.filter(result => activeFilters.includes(result.category));
      setFilteredResults(filtered);
    }
  }, [results, activeFilters]);
  // Perform search query
  const performSearchQuery = query => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const searchResults = performSearch(query);
      setResults(searchResults);
      setFilteredResults(searchResults);
      setIsLoading(false);
    }, 800);
  };
  // Handle search input change
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };
  // Handle search submission
  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      performSearchQuery(searchQuery);
    }
  };
  // Toggle category filter
  const toggleFilter = category => {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(category)) {
        return prevFilters.filter(f => f !== category);
      } else {
        return [...prevFilters, category];
      }
    });
  };
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
  };
  // Navigate to result
  const navigateToResult = result => {
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
  // Get all available categories from results
  const availableCategories = [...new Set(results.map(result => result.category))];
  // Render icon for result
  const renderResultIcon = category => {
    const iconName = getCategoryIcon(category);
    switch (iconName) {
      case 'User':
        return <User size={20} className="text-gray-500" />;
      case 'File':
        return <File size={20} className="text-gray-500" />;
      case 'HeartHandshake':
        return <HeartHandshake size={20} className="text-gray-500" />;
      case 'MapPin':
        return <MapPin size={20} className="text-gray-500" />;
      case 'Heart':
        return <Heart size={20} className="text-gray-500" />;
      case 'Users':
        return <Users size={20} className="text-gray-500" />;
      default:
        return <Search size={20} className="text-gray-500" />;
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Search form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Search Results</h1>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-grow">
                  <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search across NourishNet..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                </div>
                <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                  Search
                </button>
              </form>
            </div>
            {isLoading ? <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
              </div> : <>
                {/* Results summary and filters */}
                {results.length > 0 && <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div className="mb-4 md:mb-0">
                        <p className="text-gray-700">
                          Found <span className="font-semibold">{filteredResults.length}</span> results 
                          for "<span className="font-semibold">{searchQuery}</span>"
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Filter size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-700 mr-3">Filter by:</span>
                        <div className="flex flex-wrap gap-2">
                          {availableCategories.map(category => <button key={category} onClick={() => toggleFilter(category)} className={`text-xs px-3 py-1 rounded-full transition-colors ${activeFilters.includes(category) ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                              {getCategoryLabel(category)}
                            </button>)}
                          {activeFilters.length > 0 && <button onClick={clearFilters} className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center">
                              <XCircle size={12} className="mr-1" />
                              Clear
                            </button>}
                        </div>
                      </div>
                    </div>
                  </div>}
                {/* Results list */}
                {filteredResults.length > 0 ? <div className="space-y-4">
                    {filteredResults.map(result => <div key={result.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigateToResult(result)}>
                        <div className="flex items-start">
                          <div className="mr-4 mt-1">
                            {renderResultIcon(result.category)}
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                {result.title}
                              </h2>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mb-2 md:mb-0 inline-block">
                                {getCategoryLabel(result.category)}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">
                              {result.description}
                            </p>
                            {result.category === SEARCH_CATEGORIES.FOUNDERS && <div className="mt-2">
                                <span className="text-sm text-teal-600">
                                  View full profile on the About Us page
                                </span>
                              </div>}
                          </div>
                        </div>
                      </div>)}
                  </div> : <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    {searchQuery ? <>
                        <div className="flex justify-center mb-4">
                          <Search size={48} className="text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          No results found
                        </h2>
                        <p className="text-gray-600 mb-6">
                          We couldn't find any matches for "{searchQuery}".
                        </p>
                        <div className="text-gray-600">
                          <p>Suggestions:</p>
                          <ul className="list-disc list-inside mt-2">
                            <li>Check your spelling</li>
                            <li>Try more general keywords</li>
                            <li>Try different keywords</li>
                          </ul>
                        </div>
                      </> : <>
                        <div className="flex justify-center mb-4">
                          <Search size={48} className="text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          Start searching
                        </h2>
                        <p className="text-gray-600">
                          Enter a search term above to find content across NourishNet.
                        </p>
                      </>}
                  </div>}
              </>}
          </div>
        </div>
      </main>
      <Footer />
      <LiveChat />
    </div>;
}