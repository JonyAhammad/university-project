import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LiveChat } from '../components/Chat/LiveChat';
import { MapPin, Users, MessageCircle, Calendar, Clock, Heart } from 'lucide-react';
export function LocalSupport() {
  const [activeTab, setActiveTab] = useState('donors');
  const [localDonors, setLocalDonors] = useState([]);
  const [localFamilies, setLocalFamilies] = useState([]);
  const [location, setLocation] = useState('Helsinki, Finland');
  const [distance, setDistance] = useState(25);
  const [supportType, setSupportType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate API call to fetch local donors and families
    setTimeout(() => {
      setLocalDonors([{
        id: 1,
        name: 'Helsinki Food Bank',
        location: 'Helsinki, Finland',
        supportTypes: ['food', 'medicine'],
        distance: 2.4,
        rating: 4.9,
        helpedFamilies: 24,
        availability: 'Weekdays, evenings',
        bio: 'Community food bank providing nutritious meals and essential supplies to families throughout Helsinki.'
      }, {
        id: 2,
        name: 'Ravintola Tuki',
        location: 'Espoo, Finland',
        supportTypes: ['food', 'education'],
        distance: 5.7,
        rating: 4.7,
        helpedFamilies: 18,
        availability: 'Weekends',
        bio: 'Restaurant providing meals to families in need and offering educational workshops for children.'
      }, {
        id: 3,
        name: 'Turku Community Church',
        location: 'Turku, Finland',
        supportTypes: ['food', 'clothing', 'shelter'],
        distance: 13.8,
        rating: 5.0,
        helpedFamilies: 56,
        availability: 'Daily',
        bio: 'Community center offering various support services including meals, clothing donations, and temporary shelter.'
      }, {
        id: 4,
        name: 'Dr. Mäkinen Family Practice',
        location: 'Vantaa, Finland',
        supportTypes: ['medicine', 'healthcare'],
        distance: 8.2,
        rating: 4.8,
        helpedFamilies: 37,
        availability: 'Tuesdays and Thursdays',
        bio: 'Medical clinic providing free check-ups and medications for children from families in need.'
      }, {
        id: 5,
        name: 'Luomu Market',
        location: 'Tampere, Finland',
        supportTypes: ['food'],
        distance: 22.5,
        rating: 4.6,
        helpedFamilies: 41,
        availability: 'Weekdays',
        bio: 'Organic grocery store donating fresh produce and essential food items to families weekly.'
      }]);
      setLocalFamilies([{
        id: 101,
        name: 'Korhonen Family',
        location: 'Kallio, Helsinki',
        needs: ['food', 'clothing'],
        children: 3,
        urgency: 'High',
        story: 'Single parent with three children recently lost employment and needs temporary food assistance.',
        distance: 3.2
      }, {
        id: 102,
        name: 'Virtanen Family',
        location: 'Leppävaara, Espoo',
        needs: ['medicine', 'food'],
        children: 2,
        urgency: 'Medium',
        story: 'Family with two children, one with chronic health condition requiring medication support.',
        distance: 6.8
      }, {
        id: 103,
        name: 'Ahmed Family',
        location: 'Tikkurila, Vantaa',
        needs: ['education', 'food'],
        children: 4,
        urgency: 'Medium',
        story: 'Refugee family with four school-aged children needing educational supplies and food support.',
        distance: 9.5
      }, {
        id: 104,
        name: 'Nieminen Family',
        location: 'Vuosaari, Helsinki',
        needs: ['shelter', 'food', 'clothing'],
        children: 2,
        urgency: 'High',
        story: 'Family facing potential eviction needs temporary housing assistance and basic necessities.',
        distance: 7.3
      }, {
        id: 105,
        name: 'Järvinen Family',
        location: 'Matinkylä, Espoo',
        needs: ['food', 'medicine'],
        children: 1,
        urgency: 'Medium',
        story: 'Elderly grandparents raising grandchild need assistance with groceries and medication costs.',
        distance: 11.7
      }]);
      setIsLoading(false);
    }, 1500);
  }, []);
  const filteredDonors = localDonors.filter(donor => {
    const matchesType = supportType === 'all' || donor.supportTypes.includes(supportType);
    const matchesDistance = donor.distance <= distance;
    return matchesType && matchesDistance;
  });
  const filteredFamilies = localFamilies.filter(family => {
    const matchesType = supportType === 'all' || family.needs.includes(supportType);
    const matchesDistance = family.distance <= distance;
    return matchesType && matchesDistance;
  });
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Finland Local Support Network
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              Connect directly with donors and families in your community across
              Finland. Create meaningful relationships and provide immediate
              support where it's needed most.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Find Local Support in Finland
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="location" className="block text-gray-700 mb-2">
                    Your Location
                  </label>
                  <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter city in Finland" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label htmlFor="distance" className="block text-gray-700 mb-2">
                    Distance: {distance} km
                  </label>
                  <input type="range" id="distance" min="5" max="50" step="5" value={distance} onChange={e => setDistance(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <label htmlFor="supportType" className="block text-gray-700 mb-2">
                    Support Type
                  </label>
                  <select id="supportType" value={supportType} onChange={e => setSupportType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="all">All Types</option>
                    <option value="food">Food</option>
                    <option value="medicine">Medicine</option>
                    <option value="clothing">Clothing</option>
                    <option value="education">Education</option>
                    <option value="shelter">Shelter</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button onClick={() => setActiveTab('donors')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm md:text-base ${activeTab === 'donors' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  <Users size={18} className="inline mr-2" />
                  Finnish Support Providers
                </button>
                <button onClick={() => setActiveTab('families')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm md:text-base ${activeTab === 'families' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  <Heart size={18} className="inline mr-2" />
                  Families Seeking Support
                </button>
              </nav>
            </div>
          </div>
          {isLoading ? <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div> : activeTab === 'donors' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.length > 0 ? filteredDonors.map(donor => <div key={donor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {donor.name}
                        </h3>
                        <div className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {donor.distance} km away
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <MapPin size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">{donor.location}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{donor.bio}</p>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Support Types
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {donor.supportTypes.map(type => <span key={type} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>)}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Availability
                          </h4>
                          <div className="flex items-center mt-1">
                            <Calendar size={14} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              {donor.availability}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Families Helped
                          </h4>
                          <div className="flex items-center mt-1">
                            <Users size={14} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              {donor.helpedFamilies}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="text-amber-400">★</div>
                          <span className="ml-1 text-gray-700">
                            {donor.rating}/5.0
                          </span>
                        </div>
                        <button className="flex items-center text-teal-600 hover:text-teal-700 font-medium">
                          <MessageCircle size={16} className="mr-1" />
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>) : <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No support providers found matching your criteria. Try
                    expanding your search.
                  </p>
                </div>}
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFamilies.length > 0 ? filteredFamilies.map(family => <div key={family.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {family.name}
                        </h3>
                        <div className={`text-white text-xs font-medium px-2.5 py-0.5 rounded-full ${family.urgency === 'High' ? 'bg-red-500' : family.urgency === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                          {family.urgency} Priority
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        <MapPin size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">{family.location}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          ({family.distance} km)
                        </span>
                      </div>
                      <div className="flex items-center mb-4">
                        <Users size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          {family.children}{' '}
                          {family.children === 1 ? 'child' : 'children'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{family.story}</p>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Needs
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {family.needs.map(need => <span key={need} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {need.charAt(0).toUpperCase() + need.slice(1)}
                            </span>)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Verified by NourishNet
                        </span>
                        <button className="flex items-center text-teal-600 hover:text-teal-700 font-medium">
                          <Heart size={16} className="mr-1" />
                          Offer Support
                        </button>
                      </div>
                    </div>
                  </div>) : <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No families found matching your criteria. Try expanding your
                    search.
                  </p>
                </div>}
            </div>}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-800 mb-4">
              About Finland's Local Support Network
            </h3>
            <p className="text-blue-700 mb-4">
              Our Finland Local Support Network connects donors directly with
              families in need across Finnish communities. From Helsinki to
              Tampere, Turku to Oulu, we're building a nationwide system of
              support that creates immediate impact and builds lasting
              relationships.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-blue-800 mb-2">
                  For Donors in Finland
                </h4>
                <ul className="list-disc pl-5 text-blue-700 space-y-1 text-sm">
                  <li>
                    See exactly how your contributions help local Finnish
                    families
                  </li>
                  <li>Choose support types that match your resources</li>
                  <li>Build meaningful connections with those you help</li>
                  <li>Coordinate with other local donors for greater impact</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-medium text-blue-800 mb-2">
                  For Families in Finland
                </h4>
                <ul className="list-disc pl-5 text-blue-700 space-y-1 text-sm">
                  <li>Connect with verified local donors ready to help</li>
                  <li>Receive assistance tailored to your specific needs</li>
                  <li>Communicate directly through secure messaging</li>
                  <li>
                    Build community support networks for long-term stability
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <LiveChat />
    </div>;
}