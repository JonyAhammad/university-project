import React, { useState, Children } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MapPin, Calendar, Clock, AlignLeft, User, Phone, Mail } from 'lucide-react';
export function RequestSupport() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    requestType: 'food',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    date: '',
    time: '',
    childrenCount: '1',
    details: '',
    urgency: 'normal',
    agreeToTerms: false
  });
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Request Support
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              Submit a request for food, medicine, or financial support for
              children in need. All requests are reviewed by our team and
              matched with appropriate donors.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          {submitted ? <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Request Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your request. Our team will review it
                and match you with appropriate support providers. You will
                receive a confirmation email shortly with next steps.
              </p>
              <p className="text-gray-600 mb-8">
                Request ID:{' '}
                <span className="font-semibold">
                  REQ-{Math.floor(Math.random() * 1000000)}
                </span>
              </p>
              <div className="flex justify-center">
                <button onClick={() => setSubmitted(false)} className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                  Submit Another Request
                </button>
              </div>
            </div> : <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Support Request Form
                  </h2>
                  <p className="text-gray-600">
                    Please provide accurate information to help us match your
                    request with the right support.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      Request Type
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer ${formData.requestType === 'food' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                    ...prev,
                    requestType: 'food'
                  }))}>
                        <input type="radio" id="food" name="requestType" value="food" checked={formData.requestType === 'food'} onChange={handleChange} className="sr-only" />
                        <label htmlFor="food" className="cursor-pointer flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-medium text-gray-800">
                            Food Support
                          </span>
                        </label>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${formData.requestType === 'medicine' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                    ...prev,
                    requestType: 'medicine'
                  }))}>
                        <input type="radio" id="medicine" name="requestType" value="medicine" checked={formData.requestType === 'medicine'} onChange={handleChange} className="sr-only" />
                        <label htmlFor="medicine" className="cursor-pointer flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="font-medium text-gray-800">
                            Medicine Support
                          </span>
                        </label>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${formData.requestType === 'financial' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                    ...prev,
                    requestType: 'financial'
                  }))}>
                        <input type="radio" id="financial" name="requestType" value="financial" checked={formData.requestType === 'financial'} onChange={handleChange} className="sr-only" />
                        <label htmlFor="financial" className="cursor-pointer flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium text-gray-800">
                            Financial Support
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-gray-700 mb-2 flex items-center">
                          <User size={18} className="mr-2 text-gray-500" />
                          Full Name
                        </label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2 flex items-center">
                          <Mail size={18} className="mr-2 text-gray-500" />
                          Email Address
                        </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-2 flex items-center">
                          <Phone size={18} className="mr-2 text-gray-500" />
                          Phone Number
                        </label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-gray-700 mb-2">
                          Country
                        </label>
                        <select id="country" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="FI">Finland</option>
                          <option value="IN">India</option>
                          <option value="NG">Nigeria</option>
                          <option value="BR">Brazil</option>
                          <option value="ZA">South Africa</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      Request Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-gray-700 mb-2 flex items-center">
                          <MapPin size={18} className="mr-2 text-gray-500" />
                          City
                        </label>
                        <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-gray-700 mb-2">
                          Delivery Address
                        </label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-gray-700 mb-2 flex items-center">
                          <Calendar size={18} className="mr-2 text-gray-500" />
                          Preferred Date
                        </label>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-gray-700 mb-2 flex items-center">
                          <Clock size={18} className="mr-2 text-gray-500" />
                          Preferred Time
                        </label>
                        <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="childrenCount" className="block text-gray-700 mb-2">
                        Number of Children
                      </label>
                      <select id="childrenCount" name="childrenCount" value={formData.childrenCount} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                        <option value="1">1 child</option>
                        <option value="2">2 children</option>
                        <option value="3">3 children</option>
                        <option value="4">4 children</option>
                        <option value="5">5 children</option>
                        <option value="6">6 children</option>
                        <option value="7">7 children</option>
                        <option value="8">8 children</option>
                        <option value="9">9 children</option>
                        <option value="10">10 children</option>
                        <option value="11+">11+ children</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="details" className="block text-gray-700 mb-2 flex items-center">
                        <AlignLeft size={18} className="mr-2 text-gray-500" />
                        Additional Details
                      </label>
                      <textarea id="details" name="details" value={formData.details} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Please provide any specific details about your request, including dietary restrictions, allergies, or special needs."></textarea>
                    </div>
                    <div>
                      <label htmlFor="urgency" className="block text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <div className="flex items-center">
                        <input type="range" id="urgency" name="urgency" min="1" max="3" value={formData.urgency === 'urgent' ? 3 : formData.urgency === 'high' ? 2 : 1} onChange={e => {
                      const value = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        urgency: value === '3' ? 'urgent' : value === '2' ? 'high' : 'normal'
                      }));
                    }} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          {formData.urgency === 'urgent' ? 'Urgent (24-48 hours)' : formData.urgency === 'high' ? 'High (3-5 days)' : 'Normal (1-2 weeks)'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" required />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreeToTerms" className="text-gray-600">
                          I certify that I am submitting this request on behalf
                          of children in genuine need. I understand that false
                          information may result in denial of support.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors font-medium">
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-800 mb-3">
                  Important Information
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-blue-700">
                  <li>
                    All requests are verified by our team to ensure they reach
                    children in genuine need.
                  </li>
                  <li>
                    You must be a trusted adult (parent, guardian, teacher,
                    social worker, etc.) to submit a request.
                  </li>
                  <li>
                    For emergency situations requiring immediate attention,
                    please call our 24/7 helpline.
                  </li>
                  <li>
                    Your privacy and the privacy of the children will be
                    protected throughout the process.
                  </li>
                </ul>
              </div>
            </div>}
        </div>
      </main>
      <Footer />
    </div>;
}