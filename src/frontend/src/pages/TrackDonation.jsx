import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, Package, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});
export function TrackDonation() {
  const [trackingId, setTrackingId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [donationData, setDonationData] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 0]); // Default center of the map
  // Mock data for demonstration purposes
  const mockDonations = {
    "DN-12345": {
      id: "DN-12345",
      type: "Food Package",
      donor: "John Smith",
      recipient: "Hope Elementary School",
      status: "in-transit",
      timeline: [{
        status: "Donation Received",
        time: "2023-10-15 09:30 AM",
        location: "Donor Center",
        coordinates: [40.7128, -74.0060]
      }, {
        status: "Processing",
        time: "2023-10-15 11:45 AM",
        location: "Distribution Center",
        coordinates: [40.7200, -73.9800]
      }, {
        status: "In Transit",
        time: "2023-10-15 02:30 PM",
        location: "On Route",
        coordinates: [40.7300, -73.9600]
      }],
      estimatedDelivery: "2023-10-16 10:00 AM",
      currentLocation: [40.7300, -73.9600],
      destinationLocation: [40.7500, -73.9400],
      items: ["Rice (25kg)", "Cooking Oil (5L)", "Flour (10kg)", "Canned Goods (20 units)"]
    },
    "DN-67890": {
      id: "DN-67890",
      type: "Clothing & School Supplies",
      donor: "Sarah Johnson",
      recipient: "Children's Shelter of Hope",
      status: "delivered",
      timeline: [{
        status: "Donation Received",
        time: "2023-10-10 10:15 AM",
        location: "Donor Center",
        coordinates: [34.0522, -118.2437]
      }, {
        status: "Processing",
        time: "2023-10-10 01:20 PM",
        location: "Distribution Center",
        coordinates: [34.0500, -118.2400]
      }, {
        status: "In Transit",
        time: "2023-10-11 09:45 AM",
        location: "On Route",
        coordinates: [34.0480, -118.2300]
      }, {
        status: "Delivered",
        time: "2023-10-11 11:30 AM",
        location: "Children's Shelter of Hope",
        coordinates: [34.0450, -118.2200]
      }],
      estimatedDelivery: "Delivered",
      currentLocation: [34.0450, -118.2200],
      destinationLocation: [34.0450, -118.2200],
      items: ["Children's Clothes (50 sets)", "School Backpacks (30 units)", "Notebooks (100 units)", "Stationery Sets (50 units)"]
    }
  };
  const handleTrack = e => {
    e.preventDefault();
    if (trackingId.trim() === "") return;
    // In a real application, this would be an API call
    setTimeout(() => {
      const donation = mockDonations[trackingId];
      if (donation) {
        setDonationData(donation);
        setIsTracking(true);
        // Set map center to current location of donation
        if (donation.currentLocation) {
          setMapCenter(donation.currentLocation);
        }
      } else {
        alert("Tracking ID not found. Please check and try again.");
      }
    }, 1000);
  };
  const getStatusColor = status => {
    switch (status) {
      case "in-transit":
        return "text-blue-600";
      case "delivered":
        return "text-green-600";
      case "processing":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };
  const getStatusIcon = status => {
    switch (status) {
      case "in-transit":
        return <Clock className="mr-2" size={20} />;
      case "delivered":
        return <CheckCircle className="mr-2" size={20} />;
      case "processing":
        return <Package className="mr-2" size={20} />;
      default:
        return <AlertTriangle className="mr-2" size={20} />;
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Track Your Donation
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              See exactly where your donation is and how it's making an impact. Real-time tracking for complete transparency.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Enter Tracking Information
              </h2>
              <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                <input type="text" value={trackingId} onChange={e => setTrackingId(e.target.value)} placeholder="Enter your tracking ID (e.g., DN-12345)" className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
                <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center">
                  <Search size={20} className="mr-2" />
                  Track Donation
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-2">
                Your tracking ID was provided in your donation confirmation email.
              </p>
            </div>
            {isTracking && donationData && <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-teal-50 p-4 border-b border-teal-100">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      Tracking ID: {donationData.id}
                    </h3>
                    <div className={`flex items-center ${getStatusColor(donationData.status)}`}>
                      {getStatusIcon(donationData.status)}
                      <span className="font-medium">
                        {donationData.status === "in-transit" ? "In Transit" : donationData.status === "delivered" ? "Delivered" : donationData.status === "processing" ? "Processing" : "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Donation Type</h4>
                      <p className="text-gray-800">{donationData.type}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Recipient</h4>
                      <p className="text-gray-800">{donationData.recipient}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Donor</h4>
                      <p className="text-gray-800">{donationData.donor}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Estimated Delivery</h4>
                      <p className="text-gray-800">{donationData.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Donation Items</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                      {donationData.items.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Live Location</h4>
                    <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
                      <MapContainer center={mapCenter} zoom={13} style={{
                    height: '100%',
                    width: '100%'
                  }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                        <Marker position={donationData.currentLocation}>
                          <Popup>
                            Current location of your donation
                          </Popup>
                        </Marker>
                        <Marker position={donationData.destinationLocation}>
                          <Popup>
                            Destination: {donationData.recipient}
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Tracking Timeline</h4>
                    <div className="relative">
                      {donationData.timeline.map((event, index) => <div key={index} className="mb-6 relative pl-8">
                          {index !== donationData.timeline.length - 1 && <div className="absolute top-6 left-[9px] w-0.5 h-full bg-gray-300"></div>}
                          <div className="absolute top-1 left-0 w-[18px] h-[18px] rounded-full bg-teal-500"></div>
                          <div>
                            <h5 className="text-gray-800 font-medium">{event.status}</h5>
                            <p className="text-gray-600 text-sm">{event.time}</p>
                            <p className="text-gray-500 text-sm">{event.location}</p>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>}
            {!isTracking && <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-medium text-blue-800 mb-3">How Donation Tracking Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-blue-700 font-bold">1</span>
                    </div>
                    <h4 className="font-medium text-blue-800 mb-2">Enter Your ID</h4>
                    <p className="text-blue-700 text-sm">
                      Input the tracking ID you received when making your donation
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-blue-700 font-bold">2</span>
                    </div>
                    <h4 className="font-medium text-blue-800 mb-2">Track Real-time</h4>
                    <p className="text-blue-700 text-sm">
                      See the live location and status of your donation on the map
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-blue-700 font-bold">3</span>
                    </div>
                    <h4 className="font-medium text-blue-800 mb-2">Confirmation</h4>
                    <p className="text-blue-700 text-sm">
                      Receive notification when your donation reaches its destination
                    </p>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}