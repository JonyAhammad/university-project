import React, { useEffect, useState, Children } from 'react';
import { CheckCircle, Clock, DollarSign, MapPin, Star, Truck, UserCheck } from 'lucide-react';
export function MatchingSystem({
  request = null
}) {
  const [matchingCriteria, setMatchingCriteria] = useState({
    deliveryTime: 30,
    cost: 30,
    quality: 20,
    distance: 20
  });
  const [matchedProviders, setMatchedProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  // Mock data for demonstration purposes
  const mockRequest = request || {
    id: 'REQ-12345',
    type: 'Food',
    location: 'Helsinki, Finland',
    coordinates: [60.1699, 24.9384],
    urgency: 'Normal',
    dietaryRestrictions: ['Vegetarian'],
    childrenCount: 3,
    preferredTime: '2023-11-15 18:00'
  };
  const mockProviders = [{
    id: 1,
    name: 'Helsinki Community Kitchen',
    type: 'community',
    distance: 2.3,
    rating: 4.8,
    deliveryTime: 45,
    cost: 15,
    coordinates: [60.175, 24.94],
    matchScore: 0
  }, {
    id: 2,
    name: 'Fresh Meals Restaurant',
    type: 'restaurant',
    distance: 1.5,
    rating: 4.5,
    deliveryTime: 30,
    cost: 25,
    coordinates: [60.172, 24.935],
    matchScore: 0
  }, {
    id: 3,
    name: 'Family Food Grocery',
    type: 'grocery',
    distance: 3.7,
    rating: 4.9,
    deliveryTime: 60,
    cost: 10,
    coordinates: [60.165, 24.95],
    matchScore: 0
  }, {
    id: 4,
    name: 'Rapid Relief Food Bank',
    type: 'foodbank',
    distance: 4.2,
    rating: 4.7,
    deliveryTime: 90,
    cost: 0,
    coordinates: [60.18, 24.93],
    matchScore: 0
  }, {
    id: 5,
    name: 'Organic Food Co-op',
    type: 'grocery',
    distance: 2.8,
    rating: 4.6,
    deliveryTime: 50,
    cost: 18,
    coordinates: [60.173, 24.945],
    matchScore: 0
  }];
  // Calculate match scores when criteria changes
  useEffect(() => {
    if (matchingCriteria) {
      calculateMatches();
    }
  }, [matchingCriteria]);
  // Function to calculate match scores and sort providers
  const calculateMatches = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      // Normalize criteria to ensure they sum to 100
      const totalWeight = Object.values(matchingCriteria).reduce((sum, val) => sum + val, 0);
      const normalizedCriteria = {};
      for (const key in matchingCriteria) {
        normalizedCriteria[key] = matchingCriteria[key] / totalWeight * 100;
      }
      // Calculate scores
      const providersWithScores = mockProviders.map(provider => {
        // Delivery time score (lower is better)
        const maxDeliveryTime = 120; // minutes
        const deliveryTimeScore = (maxDeliveryTime - provider.deliveryTime) / maxDeliveryTime * 100;
        // Cost score (lower is better)
        const maxCost = 50; // currency units
        const costScore = (maxCost - provider.cost) / maxCost * 100;
        // Quality score (higher is better)
        const qualityScore = provider.rating / 5 * 100;
        // Distance score (lower is better)
        const maxDistance = 10; // km
        const distanceScore = (maxDistance - provider.distance) / maxDistance * 100;
        // Calculate weighted score
        const weightedScore = deliveryTimeScore * normalizedCriteria.deliveryTime / 100 + costScore * normalizedCriteria.cost / 100 + qualityScore * normalizedCriteria.quality / 100 + distanceScore * normalizedCriteria.distance / 100;
        return {
          ...provider,
          matchScore: Math.round(weightedScore),
          scores: {
            deliveryTime: Math.round(deliveryTimeScore),
            cost: Math.round(costScore),
            quality: Math.round(qualityScore),
            distance: Math.round(distanceScore)
          }
        };
      });
      // Sort by match score
      const sortedProviders = providersWithScores.sort((a, b) => b.matchScore - a.matchScore);
      setMatchedProviders(sortedProviders);
      setIsLoading(false);
    }, 1000);
  };
  // Handle criteria change
  const handleCriteriaChange = (criterion, value) => {
    setMatchingCriteria(prev => ({
      ...prev,
      [criterion]: parseInt(value)
    }));
  };
  // Handle provider selection
  const selectProvider = provider => {
    setSelectedProvider(provider);
  };
  return <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Automated Provider Matching
        </h2>
        <p className="text-gray-600">
          Our AI-based matching system finds the best providers for your request
          based on your priorities.
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Request Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
          <div>
            <p className="text-sm text-gray-500">Request Type</p>
            <p className="font-medium">{mockRequest.type} Support</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{mockRequest.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Children</p>
            <p className="font-medium">{mockRequest.childrenCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Urgency</p>
            <p className="font-medium">{mockRequest.urgency}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Dietary Restrictions</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {mockRequest.dietaryRestrictions.map((restriction, index) => <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                  {restriction}
                </span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Set Your Priorities
        </h3>
        <p className="text-gray-600 mb-4">
          Adjust the importance of each factor to find the best match for your
          needs.
        </p>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Clock size={16} className="mr-2 text-teal-600" />
                Delivery Time
              </label>
              <span className="text-sm text-gray-500">
                {matchingCriteria.deliveryTime}%
              </span>
            </div>
            <input type="range" min="0" max="100" value={matchingCriteria.deliveryTime} onChange={e => handleCriteriaChange('deliveryTime', e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <DollarSign size={16} className="mr-2 text-teal-600" />
                Cost
              </label>
              <span className="text-sm text-gray-500">
                {matchingCriteria.cost}%
              </span>
            </div>
            <input type="range" min="0" max="100" value={matchingCriteria.cost} onChange={e => handleCriteriaChange('cost', e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Star size={16} className="mr-2 text-teal-600" />
                Quality Rating
              </label>
              <span className="text-sm text-gray-500">
                {matchingCriteria.quality}%
              </span>
            </div>
            <input type="range" min="0" max="100" value={matchingCriteria.quality} onChange={e => handleCriteriaChange('quality', e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <MapPin size={16} className="mr-2 text-teal-600" />
                Distance
              </label>
              <span className="text-sm text-gray-500">
                {matchingCriteria.distance}%
              </span>
            </div>
            <input type="range" min="0" max="100" value={matchingCriteria.distance} onChange={e => handleCriteriaChange('distance', e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">
            Matched Providers
          </h3>
          <button onClick={calculateMatches} className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm flex items-center">
            Refresh Matches
          </button>
        </div>
        {isLoading ? <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div> : <div className="space-y-4">
            {matchedProviders.map(provider => <div key={provider.id} className={`border rounded-lg p-4 transition-all ${selectedProvider?.id === provider.id ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-300'}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-gray-800">
                        {provider.name}
                      </h4>
                      <div className="bg-teal-100 text-teal-800 font-medium rounded-full px-3 py-1 text-xs">
                        {provider.matchScore}% Match
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <Clock size={14} className="text-gray-500 mr-2" />
                        <span>{provider.deliveryTime} min delivery</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="text-gray-500 mr-2" />
                        <span>{provider.distance} km away</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={14} className="text-gray-500 mr-2" />
                        <span>
                          {provider.cost === 0 ? 'Free' : `$${provider.cost}`}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star size={14} className="text-gray-500 mr-2" />
                        <span>{provider.rating} rating</span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-1">
                      <div className="flex flex-col items-center">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-teal-600 h-1.5 rounded-full" style={{
                      width: `${provider.scores.deliveryTime}%`
                    }}></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          Speed
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-teal-600 h-1.5 rounded-full" style={{
                      width: `${provider.scores.cost}%`
                    }}></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">Cost</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-teal-600 h-1.5 rounded-full" style={{
                      width: `${provider.scores.quality}%`
                    }}></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          Quality
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-teal-600 h-1.5 rounded-full" style={{
                      width: `${provider.scores.distance}%`
                    }}></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          Distance
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => selectProvider(provider)} className={`px-4 py-2 rounded-md transition-colors ${selectedProvider?.id === provider.id ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-50'}`}>
                      {selectedProvider?.id === provider.id ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>)}
            {matchedProviders.length === 0 && !isLoading && <div className="text-center py-8 text-gray-500">
                No providers matched. Try adjusting your criteria.
              </div>}
          </div>}
      </div>
      {selectedProvider && <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Provider Selected
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>You've selected {selectedProvider.name} as your provider.</p>
                <p className="mt-1">
                  They will be notified of your request and will prepare for
                  delivery.
                </p>
              </div>
              <div className="mt-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}