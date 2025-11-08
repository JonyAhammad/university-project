import React, { useEffect, useState, Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Search } from 'lucide-react';
// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});
// Create custom icons for different provider types
const createCustomIcon = color => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};
const restaurantIcon = createCustomIcon('red');
const groceryIcon = createCustomIcon('green');
const foodBankIcon = createCustomIcon('blue');
const communityIcon = createCustomIcon('orange');
// Component to set view to user location
function LocationMarker({
  setUserPosition
}) {
  const [position, setPosition] = useState(null);
  const map = useMap();
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      setUserPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setUserPosition]);
  return position === null ? null : <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>;
}
export function ProviderMap({
  providers = [],
  searchRadius = 10
}) {
  const [userPosition, setUserPosition] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const [mapCenter, setMapCenter] = useState([60.1699, 24.9384]); // Default: Helsinki, Finland
  const [zoom, setZoom] = useState(11);
  const [isLoading, setIsLoading] = useState(false);
  const [nearbyProviders, setNearbyProviders] = useState([]);
  // If no providers are passed, use these mock providers
  const mockProviders = [{
    id: 1,
    name: 'Helsinki Food Bank',
    type: 'foodbank',
    coordinates: [60.1699, 24.9384],
    address: 'Aleksanterinkatu 15, Helsinki',
    rating: 4.8
  }, {
    id: 2,
    name: 'Community Kitchen Espoo',
    type: 'community',
    coordinates: [60.2055, 24.6559],
    address: 'Keskuskatu 3, Espoo',
    rating: 4.7
  }, {
    id: 3,
    name: 'Ravintola Nälkäinen',
    type: 'restaurant',
    coordinates: [60.1841, 24.9579],
    address: 'Mannerheimintie 10, Helsinki',
    rating: 4.5
  }, {
    id: 4,
    name: 'Organic Grocery Co-op',
    type: 'grocery',
    coordinates: [60.163, 24.941],
    address: 'Fredrikinkatu 22, Helsinki',
    rating: 4.9
  }, {
    id: 5,
    name: 'Vantaa Relief Center',
    type: 'foodbank',
    coordinates: [60.2934, 25.0378],
    address: 'Tikkurilantie 44, Vantaa',
    rating: 4.6
  }, {
    id: 6,
    name: 'Family Restaurant Turku',
    type: 'restaurant',
    coordinates: [60.4518, 22.2666],
    address: 'Kauppiaskatu 5, Turku',
    rating: 4.4
  }, {
    id: 7,
    name: 'Tampere Food Support',
    type: 'community',
    coordinates: [61.4978, 23.761],
    address: 'Hämeenkatu 12, Tampere',
    rating: 4.7
  }, {
    id: 8,
    name: 'Oulu Community Kitchen',
    type: 'community',
    coordinates: [65.0121, 25.4651],
    address: 'Kirkkokatu 8, Oulu',
    rating: 4.8
  }];
  const displayProviders = providers.length > 0 ? providers : mockProviders;
  useEffect(() => {
    if (userPosition) {
      // Filter providers within the search radius (km)
      const nearby = displayProviders.filter(provider => {
        const distance = calculateDistance(userPosition.lat, userPosition.lng, provider.coordinates[0], provider.coordinates[1]);
        return distance <= searchRadius;
      });
      setNearbyProviders(nearby);
    } else {
      setNearbyProviders(displayProviders);
    }
  }, [userPosition, displayProviders, searchRadius]);
  // Calculate distance between two coordinates in km (Haversine formula)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  // Geocode the address to coordinates
  const searchByAddress = async e => {
    e.preventDefault();
    if (!searchAddress.trim()) return;
    setIsLoading(true);
    try {
      // Using Nominatim OpenStreetMap API for geocoding
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const location = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
        setMapCenter([location.lat, location.lng]);
        setUserPosition(location);
        setZoom(13);
      } else {
        alert('Location not found. Please try a different address.');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      alert('Error finding location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  // Get icon based on provider type
  const getProviderIcon = type => {
    switch (type) {
      case 'restaurant':
        return restaurantIcon;
      case 'grocery':
        return groceryIcon;
      case 'foodbank':
        return foodBankIcon;
      case 'community':
        return communityIcon;
      default:
        return new L.Icon.Default();
    }
  };
  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setMapCenter([location.lat, location.lng]);
        setUserPosition(location);
        setZoom(13);
      }, error => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please enable location services.');
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };
  return <div className="flex flex-col h-full">
      <div className="mb-4">
        <form onSubmit={searchByAddress} className="flex flex-col md:flex-row gap-2">
          <div className="relative flex-grow">
            <input type="text" value={searchAddress} onChange={e => setSearchAddress(e.target.value)} placeholder="Enter address, city or postal code" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={16} className="text-gray-400" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center">
            {isLoading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div> : <>
                <Search size={18} className="mr-2" />
                Search
              </>}
          </button>
          <button type="button" onClick={getCurrentLocation} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Navigation size={18} className="mr-2" />
            Use My Location
          </button>
        </form>
      </div>
      <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
        <MapContainer center={mapCenter} zoom={zoom} style={{
        height: '100%',
        width: '100%'
      }} whenCreated={map => {
        map.on('locationfound', function (e) {
          setUserPosition(e.latlng);
        });
      }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
          {userPosition && <>
              <Marker position={[userPosition.lat, userPosition.lng]}>
                <Popup>You are here</Popup>
              </Marker>
              <Circle center={[userPosition.lat, userPosition.lng]} radius={searchRadius * 1000} // Convert km to meters
          pathOptions={{
            color: 'blue',
            fillColor: 'blue',
            fillOpacity: 0.1
          }} />
            </>}
          {nearbyProviders.map(provider => <Marker key={provider.id} position={provider.coordinates} icon={getProviderIcon(provider.type)}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold">{provider.name}</h3>
                  <p className="text-gray-600">{provider.address}</p>
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-amber-500">★</span>
                    <span className="ml-1">{provider.rating}</span>
                  </div>
                  <button className="mt-2 bg-teal-600 text-white px-3 py-1 rounded-md text-sm">
                    Select Provider
                  </button>
                </div>
              </Popup>
            </Marker>)}
        </MapContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>Restaurant</span>
        </div>
        <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
          <span>Grocery Store</span>
        </div>
        <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span>Food Bank</span>
        </div>
        <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200 flex items-center">
          <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
          <span>Community Kitchen</span>
        </div>
      </div>
    </div>;
}