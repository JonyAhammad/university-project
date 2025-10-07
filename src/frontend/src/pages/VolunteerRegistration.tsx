import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Calendar, CheckCircle, Clock, MapPin, Truck, User, Mail, Phone, FileText } from 'lucide-react';
export function VolunteerRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    birthDate: '',
    volunteerType: '',
    availability: {
      monday: {
        morning: false,
        afternoon: false,
        evening: false
      },
      tuesday: {
        morning: false,
        afternoon: false,
        evening: false
      },
      wednesday: {
        morning: false,
        afternoon: false,
        evening: false
      },
      thursday: {
        morning: false,
        afternoon: false,
        evening: false
      },
      friday: {
        morning: false,
        afternoon: false,
        evening: false
      },
      saturday: {
        morning: false,
        afternoon: false,
        evening: false
      },
      sunday: {
        morning: false,
        afternoon: false,
        evening: false
      }
    },
    skills: [],
    languages: [],
    transportType: '',
    travelDistance: '5',
    motivation: '',
    heardFrom: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    agreeToTerms: false,
    agreeToBackground: false,
    agreeToCode: false
  });
  // Handle form field changes
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    if (type === 'checkbox') {
      if (name.startsWith('availability.')) {
        const [_, day, timeOfDay] = name.split('.');
        setFormData(prev => ({
          ...prev,
          availability: {
            ...prev.availability,
            [day]: {
              ...prev.availability[day],
              [timeOfDay]: checked
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  // Handle emergency contact field changes
  const handleEmergencyContactChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };
  // Handle skill selection
  const handleSkillToggle = skill => {
    setFormData(prev => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s !== skill)
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill]
        };
      }
    });
  };
  // Handle language selection
  const handleLanguageToggle = language => {
    setFormData(prev => {
      if (prev.languages.includes(language)) {
        return {
          ...prev,
          languages: prev.languages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...prev.languages, language]
        };
      }
    });
  };
  // Continue to next step
  const handleContinue = () => {
    setStep(prevStep => prevStep + 1);
    window.scrollTo(0, 0);
  };
  // Go back to previous step
  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };
  // Submit form
  const handleSubmit = e => {
    e.preventDefault();
    // In a real app, this would submit the form data to the server
    console.log('Form submitted:', formData);
    // Move to success step
    setStep(4);
    window.scrollTo(0, 0);
  };
  // Available skills for selection
  const availableSkills = ['Food Preparation', 'Food Delivery', 'Driving', 'Logistics', 'Customer Service', 'Administration', 'Translation', 'Coordination', 'Event Planning', 'Social Media', 'Photography', 'Fundraising'];
  // Available languages for selection
  const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Finnish', 'Swedish', 'Arabic', 'Chinese', 'Hindi', 'Russian', 'Portuguese', 'Japanese'];
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Volunteer Registration
            </h1>
            <p className="text-teal-100 text-center mt-4 max-w-3xl mx-auto">
              Join our global network of volunteers who help deliver meals,
              support food providers, and make a direct impact on children's
              lives in your community.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-10">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className={`h-1 w-16 md:w-24 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className={`h-1 w-16 md:w-24 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className={`h-1 w-16 md:w-24 ${step >= 4 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 4 ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-bold">4</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="text-center px-2 w-32">
                  <p className={`text-sm ${step === 1 ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>
                    Personal Info
                  </p>
                </div>
                <div className="text-center px-2 w-32">
                  <p className={`text-sm ${step === 2 ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>
                    Availability
                  </p>
                </div>
                <div className="text-center px-2 w-32">
                  <p className={`text-sm ${step === 3 ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>
                    Agreements
                  </p>
                </div>
                <div className="text-center px-2 w-32">
                  <p className={`text-sm ${step === 4 ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>
                    Confirmation
                  </p>
                </div>
              </div>
            </div>
            {step === 1 && <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Personal Information
                </h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 mb-2 flex items-center">
                        <User size={16} className="mr-2 text-gray-500" />
                        First Name
                      </label>
                      <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 flex items-center">
                        <Mail size={16} className="mr-2 text-gray-500" />
                        Email Address
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2 flex items-center">
                        <Phone size={16} className="mr-2 text-gray-500" />
                        Phone Number
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-700 mb-2 flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      Address
                    </label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-2">
                        City
                      </label>
                      <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-gray-700 mb-2">
                        Country
                      </label>
                      <select id="country" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required>
                        <option value="">Select Country</option>
                        <option value="Finland">Finland</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Norway">Norway</option>
                        <option value="Denmark">Denmark</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                        <option value="Italy">Italy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="birthDate" className="block text-gray-700 mb-2 flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      Date of Birth
                    </label>
                    <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    <p className="text-sm text-gray-500 mt-1">
                      You must be at least 18 years old to volunteer
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-3">
                      Volunteer Role
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer ${formData.volunteerType === 'delivery' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                    ...prev,
                    volunteerType: 'delivery'
                  }))}>
                        <div className="flex items-center">
                          <input type="radio" id="delivery" name="volunteerType" value="delivery" checked={formData.volunteerType === 'delivery'} onChange={handleChange} className="sr-only" />
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                            <Truck size={20} className="text-teal-600" />
                          </div>
                          <label htmlFor="delivery" className="cursor-pointer">
                            <span className="block font-medium text-gray-800">
                              Delivery Volunteer
                            </span>
                            <span className="block text-sm text-gray-600">
                              Deliver meals to families
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${formData.volunteerType === 'kitchen' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                    ...prev,
                    volunteerType: 'kitchen'
                  }))}>
                        <div className="flex items-center">
                          <input type="radio" id="kitchen" name="volunteerType" value="kitchen" checked={formData.volunteerType === 'kitchen'} onChange={handleChange} className="sr-only" />
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                          </div>
                          <label htmlFor="kitchen" className="cursor-pointer">
                            <span className="block font-medium text-gray-800">
                              Kitchen Helper
                            </span>
                            <span className="block text-sm text-gray-600">
                              Assist food preparation
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className={`border rounded-lg p-4 cursor-pointer ${formData.volunteerType === 'coordinator' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                    ...prev,
                    volunteerType: 'coordinator'
                  }))}>
                        <div className="flex items-center">
                          <input type="radio" id="coordinator" name="volunteerType" value="coordinator" checked={formData.volunteerType === 'coordinator'} onChange={handleChange} className="sr-only" />
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                          </div>
                          <label htmlFor="coordinator" className="cursor-pointer">
                            <span className="block font-medium text-gray-800">
                              Coordinator
                            </span>
                            <span className="block text-sm text-gray-600">
                              Organize volunteers
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-3">Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {availableSkills.map(skill => <div key={skill} onClick={() => handleSkillToggle(skill)} className={`px-3 py-2 rounded-full text-sm cursor-pointer ${formData.skills.includes(skill) ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                          {skill}
                        </div>)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-3">
                      Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableLanguages.map(language => <div key={language} onClick={() => handleLanguageToggle(language)} className={`px-3 py-2 rounded-full text-sm cursor-pointer ${formData.languages.includes(language) ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                          {language}
                        </div>)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="motivation" className="block text-gray-700 mb-2">
                      Why do you want to volunteer with NourishNet?
                    </label>
                    <textarea id="motivation" name="motivation" value={formData.motivation} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button type="button" onClick={handleContinue} className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                      Continue
                    </button>
                  </div>
                </form>
              </div>}
            {step === 2 && <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Availability & Logistics
                </h2>
                <form>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Clock size={18} className="mr-2 text-teal-600" />
                      Weekly Availability
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Please select the times you're generally available to
                      volunteer each week.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-700">
                              Day
                            </th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-700">
                              Morning
                              <br />
                              (8am-12pm)
                            </th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-700">
                              Afternoon
                              <br />
                              (12pm-5pm)
                            </th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-700">
                              Evening
                              <br />
                              (5pm-9pm)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => <tr key={day} className="border-b border-gray-200">
                              <td className="py-3 px-4 text-sm font-medium text-gray-700 capitalize">
                                {day}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <input type="checkbox" id={`${day}-morning`} name={`availability.${day}.morning`} checked={formData.availability[day].morning} onChange={handleChange} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                              </td>
                              <td className="py-3 px-4 text-center">
                                <input type="checkbox" id={`${day}-afternoon`} name={`availability.${day}.afternoon`} checked={formData.availability[day].afternoon} onChange={handleChange} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                              </td>
                              <td className="py-3 px-4 text-center">
                                <input type="checkbox" id={`${day}-evening`} name={`availability.${day}.evening`} checked={formData.availability[day].evening} onChange={handleChange} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {(formData.volunteerType === 'delivery' || formData.volunteerType === '') && <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <Truck size={18} className="mr-2 text-teal-600" />
                        Transportation Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-gray-700 mb-3">
                            Transportation Type
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className={`border rounded-lg p-3 cursor-pointer ${formData.transportType === 'car' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                        ...prev,
                        transportType: 'car'
                      }))}>
                              <div className="flex items-center">
                                <input type="radio" id="car" name="transportType" value="car" checked={formData.transportType === 'car'} onChange={handleChange} className="sr-only" />
                                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <label htmlFor="car" className="cursor-pointer">
                                  <span className="font-medium">Car</span>
                                </label>
                              </div>
                            </div>
                            <div className={`border rounded-lg p-3 cursor-pointer ${formData.transportType === 'bike' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                        ...prev,
                        transportType: 'bike'
                      }))}>
                              <div className="flex items-center">
                                <input type="radio" id="bike" name="transportType" value="bike" checked={formData.transportType === 'bike'} onChange={handleChange} className="sr-only" />
                                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <label htmlFor="bike" className="cursor-pointer">
                                  <span className="font-medium">Bike</span>
                                </label>
                              </div>
                            </div>
                            <div className={`border rounded-lg p-3 cursor-pointer ${formData.transportType === 'public' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                        ...prev,
                        transportType: 'public'
                      }))}>
                              <div className="flex items-center">
                                <input type="radio" id="public" name="transportType" value="public" checked={formData.transportType === 'public'} onChange={handleChange} className="sr-only" />
                                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <label htmlFor="public" className="cursor-pointer">
                                  <span className="font-medium">
                                    Public Transit
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className={`border rounded-lg p-3 cursor-pointer ${formData.transportType === 'walking' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
                        ...prev,
                        transportType: 'walking'
                      }))}>
                              <div className="flex items-center">
                                <input type="radio" id="walking" name="transportType" value="walking" checked={formData.transportType === 'walking'} onChange={handleChange} className="sr-only" />
                                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <label htmlFor="walking" className="cursor-pointer">
                                  <span className="font-medium">Walking</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="travelDistance" className="block text-gray-700 mb-2">
                            Maximum Travel Distance (km)
                          </label>
                          <input type="range" id="travelDistance" name="travelDistance" min="1" max="50" value={formData.travelDistance} onChange={handleChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1 km</span>
                            <span>25 km</span>
                            <span>50 km</span>
                          </div>
                          <p className="text-center mt-2 text-gray-700 font-medium">
                            {formData.travelDistance} km
                          </p>
                        </div>
                      </div>
                    </div>}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="emergencyName" className="block text-gray-700 mb-2">
                          Contact Name
                        </label>
                        <input type="text" id="emergencyName" name="name" value={formData.emergencyContact.name} onChange={handleEmergencyContactChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                      <div>
                        <label htmlFor="emergencyRelationship" className="block text-gray-700 mb-2">
                          Relationship
                        </label>
                        <input type="text" id="emergencyRelationship" name="relationship" value={formData.emergencyContact.relationship} onChange={handleEmergencyContactChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="emergencyPhone" className="block text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input type="tel" id="emergencyPhone" name="phone" value={formData.emergencyContact.phone} onChange={handleEmergencyContactChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="heardFrom" className="block text-gray-700 mb-2">
                      How did you hear about NourishNet?
                    </label>
                    <select id="heardFrom" name="heardFrom" value={formData.heardFrom} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="">Please select</option>
                      <option value="social-media">Social Media</option>
                      <option value="friend">Friend or Family</option>
                      <option value="website">Website</option>
                      <option value="news">News Article</option>
                      <option value="event">Community Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={handleBack} className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                      Back
                    </button>
                    <button type="button" onClick={handleContinue} className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                      Continue
                    </button>
                  </div>
                </form>
              </div>}
            {step === 3 && <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Agreements & Submission
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <FileText size={18} className="mr-2 text-teal-600" />
                      Volunteer Agreements
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Please review and agree to the following terms to complete
                      your volunteer registration.
                    </p>
                    <div className="space-y-6">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5 mt-1">
                            <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" required />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                              Terms of Service & Privacy Policy
                            </label>
                            <p className="text-sm text-gray-500 mt-1">
                              I have read and agree to NourishNet's{' '}
                              <a href="#" className="text-teal-600 hover:text-teal-700">
                                Terms of Service
                              </a>{' '}
                              and{' '}
                              <a href="#" className="text-teal-600 hover:text-teal-700">
                                Privacy Policy
                              </a>
                              , including the collection and processing of my
                              personal data for volunteer coordination purposes.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5 mt-1">
                            <input id="agreeToBackground" name="agreeToBackground" type="checkbox" checked={formData.agreeToBackground} onChange={handleChange} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" required />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="agreeToBackground" className="font-medium text-gray-700">
                              Background Check Consent
                            </label>
                            <p className="text-sm text-gray-500 mt-1">
                              I consent to a background check as part of the
                              volunteer screening process. This is required for
                              all volunteers who work with children or
                              vulnerable populations.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5 mt-1">
                            <input id="agreeToCode" name="agreeToCode" type="checkbox" checked={formData.agreeToCode} onChange={handleChange} className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" required />
                          </div>
                          <div className="ml-3">
                            <label htmlFor="agreeToCode" className="font-medium text-gray-700">
                              Volunteer Code of Conduct
                            </label>
                            <p className="text-sm text-gray-500 mt-1">
                              I agree to abide by NourishNet's{' '}
                              <a href="#" className="text-teal-600 hover:text-teal-700">
                                Volunteer Code of Conduct
                              </a>
                              , including maintaining confidentiality of
                              recipient information, treating all individuals
                              with respect, and following food safety protocols.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Next Steps After Submission
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>After submitting your application:</p>
                          <ol className="list-decimal list-inside mt-1 space-y-1">
                            <li>You'll receive a confirmation email</li>
                            <li>
                              Our team will review your application (typically
                              within 48 hours)
                            </li>
                            <li>We'll schedule an orientation session</li>
                            <li>
                              Complete any required training for your volunteer
                              role
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={handleBack} className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                      Back
                    </button>
                    <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>}
            {step === 4 && <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Volunteer Application Submitted!
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Thank you for volunteering with NourishNet! Your application
                  has been received and is being reviewed by our team.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    What Happens Next?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-600">
                          1
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-800">
                          Application Review
                        </h4>
                        <p className="text-gray-600">
                          Our team will review your application within 48 hours.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-600">
                          2
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-800">
                          Background Check
                        </h4>
                        <p className="text-gray-600">
                          We'll initiate the background check process if
                          applicable to your role.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-600">
                          3
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-800">
                          Orientation
                        </h4>
                        <p className="text-gray-600">
                          You'll be invited to attend an orientation session
                          (virtual or in-person).
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-teal-600">
                          4
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-800">
                          Start Volunteering
                        </h4>
                        <p className="text-gray-600">
                          Begin making a difference in your community with
                          NourishNet!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => window.location.href = '/'} className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                    Return to Homepage
                  </button>
                  <button onClick={() => window.location.href = '/impact-stories'} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                    Read Volunteer Stories
                  </button>
                </div>
              </div>}
            {step < 4 && <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-800 mb-3">
                  Why Volunteer with NourishNet?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-blue-800 mb-2">
                      Direct Impact
                    </h4>
                    <p className="text-blue-700 text-sm">
                      See the immediate difference your time makes in children's
                      lives in your local community.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-blue-800 mb-2">
                      Flexible Commitment
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Volunteer on your schedule with opportunities that fit
                      your availability and skills.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-blue-800 mb-2">
                      Community Connection
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Join a network of like-minded volunteers working together
                      to combat childhood hunger.
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