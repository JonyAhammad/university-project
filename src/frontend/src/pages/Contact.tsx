import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Globe, MessageCircle, Send, User, HelpCircle } from 'lucide-react';
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
              Contact Us
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              Have questions or need assistance? Our global team is ready to
              help you with any inquiries about NourishNet's mission to combat
              childhood hunger.
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
                Message Sent Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out to us. One of our team members will
                respond to your inquiry as soon as possible, usually within
                24-48 hours.
              </p>
              <div className="flex justify-center">
                <button onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                inquiryType: 'general'
              });
            }} className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                  Send Another Message
                </button>
              </div>
            </div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="bg-teal-100 p-3 rounded-full">
                          <Globe size={20} className="text-teal-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          Global Headquarters
                        </h3>
                        <p className="text-gray-600 mt-1">New York City, USA</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="bg-teal-100 p-3 rounded-full">
                          <Phone size={20} className="text-teal-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          Phone Support
                        </h3>
                        <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                        <p className="text-gray-500 text-sm">
                          Mon-Fri, 9am-5pm (Local Time)
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="bg-teal-100 p-3 rounded-full">
                          <Mail size={20} className="text-teal-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          Email
                        </h3>
                        <p className="text-gray-600 mt-1">
                          support@nourishnet.org
                        </p>
                        <p className="text-gray-500 text-sm">
                          We respond within 24-48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Regional Offices
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-700">Europe</p>
                          <p className="text-gray-600 text-sm">
                            London, United Kingdom
                          </p>
                          <p className="text-gray-500 text-sm">
                            +44 (0) 20 7123 4567
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-700">
                            Asia-Pacific
                          </p>
                          <p className="text-gray-600 text-sm">Singapore</p>
                          <p className="text-gray-500 text-sm">+65 6123 4567</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-700">Africa</p>
                          <p className="text-gray-600 text-sm">
                            Nairobi, Kenya
                          </p>
                          <p className="text-gray-500 text-sm">
                            +254 (0) 20 123 4567
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Emergency Support
                    </h3>
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <p className="text-red-800 font-medium">
                        24/7 Emergency Hotline
                      </p>
                      <p className="text-red-700">+1 (888) 999-0000</p>
                      <p className="text-red-600 text-sm mt-2">
                        For urgent situations requiring immediate assistance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="inquiryType" className="block text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`border rounded-lg p-3 cursor-pointer ${formData.inquiryType === 'general' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                      ...prev,
                      inquiryType: 'general'
                    }))}>
                          <div className="flex items-center">
                            <input type="radio" id="general" name="inquiryType" value="general" checked={formData.inquiryType === 'general'} onChange={handleChange} className="sr-only" />
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                              <HelpCircle size={16} className="text-teal-600" />
                            </div>
                            <label htmlFor="general" className="cursor-pointer">
                              <span className="block font-medium text-gray-800">
                                General Inquiry
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className={`border rounded-lg p-3 cursor-pointer ${formData.inquiryType === 'donation' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                      ...prev,
                      inquiryType: 'donation'
                    }))}>
                          <div className="flex items-center">
                            <input type="radio" id="donation" name="inquiryType" value="donation" checked={formData.inquiryType === 'donation'} onChange={handleChange} className="sr-only" />
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                              <Heart size={16} className="text-teal-600" />
                            </div>
                            <label htmlFor="donation" className="cursor-pointer">
                              <span className="block font-medium text-gray-800">
                                Donation Support
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className={`border rounded-lg p-3 cursor-pointer ${formData.inquiryType === 'technical' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                      ...prev,
                      inquiryType: 'technical'
                    }))}>
                          <div className="flex items-center">
                            <input type="radio" id="technical" name="inquiryType" value="technical" checked={formData.inquiryType === 'technical'} onChange={handleChange} className="sr-only" />
                            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                              <Settings size={16} className="text-teal-600" />
                            </div>
                            <label htmlFor="technical" className="cursor-pointer">
                              <span className="block font-medium text-gray-800">
                                Technical Support
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2 flex items-center">
                          <User size={16} className="mr-2 text-gray-500" />
                          Your Name
                        </label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2 flex items-center">
                          <Mail size={16} className="mr-2 text-gray-500" />
                          Email Address
                        </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="subject" className="block text-gray-700 mb-2 flex items-center">
                        <MessageCircle size={16} className="mr-2 text-gray-500" />
                        Subject
                      </label>
                      <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-gray-700 mb-2 flex items-center">
                        <AlignLeft size={16} className="mr-2 text-gray-500" />
                        Message
                      </label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors flex items-center font-medium">
                        <Send size={18} className="mr-2" />
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
                <div className="mt-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-blue-800 mb-4">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          How quickly will I receive a response?
                        </h4>
                        <p className="text-blue-700 text-sm">
                          We typically respond to all inquiries within 24-48
                          hours during business days.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Can I contact a specific regional office?
                        </h4>
                        <p className="text-blue-700 text-sm">
                          Yes, you can specify which regional office you'd like
                          to reach in your message.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800">
                          How do I report an urgent situation?
                        </h4>
                        <p className="text-blue-700 text-sm">
                          For emergencies, please call our 24/7 hotline listed
                          on this page rather than using the contact form.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </main>
      <Footer />
    </div>;
}
function Settings({
  size,
  className
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>;
}
function Heart({
  size,
  className
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>;
}
function AlignLeft({
  size,
  className
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" x2="21" y1="6" y2="6"></line>
      <line x1="3" x2="14" y1="12" y2="12"></line>
      <line x1="3" x2="10" y1="18" y2="18"></line>
    </svg>;
}