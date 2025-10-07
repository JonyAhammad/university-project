import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PaymentForm } from '../components/PaymentForm';
import { AlertTriangle, Zap, Clock, Globe, MapPin } from 'lucide-react';
export function InstantSupport() {
  const [step, setStep] = useState(1);
  const [emergencyType, setEmergencyType] = useState('');
  const [region, setRegion] = useState('');
  const [amount, setAmount] = useState(100);
  const [emergencyDays, setEmergencyDays] = useState(7);
  const handleContinue = () => {
    setStep(2);
    window.scrollTo(0, 0);
  };
  const handlePaymentComplete = () => {
    setStep(3);
    window.scrollTo(0, 0);
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-red-600 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Zap size={32} className="text-white mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                Instant Support
              </h1>
            </div>
            <p className="text-red-100 text-center mt-2 max-w-3xl mx-auto">
              Provide immediate assistance to children in urgent need of food,
              medicine, or emergency care worldwide.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {step === 3 ? <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Emergency Support Activated!
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Thank you for your immediate response. Your donation has been
                  processed and emergency support has been activated.
                </p>
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    What Happens Next
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Immediate Alert:</span>{' '}
                        Our local team in {region} has been notified and will
                        respond within 1 hour.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">
                          Resource Allocation:
                        </span>{' '}
                        Your donation will be used to provide{' '}
                        {emergencyType === 'food' ? 'emergency food supplies' : emergencyType === 'medicine' ? 'critical medical aid' : 'emergency shelter and care'}{' '}
                        for the next {emergencyDays} days.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        <span className="font-medium">Follow-up:</span> You'll
                        receive an email within 24 hours with details of how
                        your donation was used and the impact it made.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg mb-8 text-left">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Emergency Reference Number
                  </h4>
                  <p className="text-blue-800 text-lg font-bold tracking-wide">
                    ER-{Math.floor(Math.random() * 10000)}-
                    {new Date().getFullYear()}
                  </p>
                  <p className="text-blue-700 text-sm mt-2">
                    Please save this reference number for any future inquiries
                    about this emergency support.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => {
                setStep(1);
                setEmergencyType('');
                setRegion('');
                setAmount(100);
                setEmergencyDays(7);
              }} className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors">
                    Provide Another Emergency Support
                  </button>
                  <button onClick={() => window.location.href = '/'} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                    Return to Homepage
                  </button>
                </div>
              </div> : step === 2 ? <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-red-50 p-6">
                  <div className="flex items-center mb-2">
                    <Clock size={20} className="text-red-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Complete Your Emergency Support
                    </h2>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Your rapid response will help children in critical need.
                    Please complete your payment to activate immediate support.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">
                        Emergency Type:{' '}
                        <span className="font-medium text-gray-800">
                          {emergencyType === 'food' ? 'Food Crisis' : emergencyType === 'medicine' ? 'Medical Emergency' : 'Shelter & Protection'}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Region:{' '}
                        <span className="font-medium text-gray-800">
                          {region}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Amount:{' '}
                        <span className="font-medium text-gray-800">
                          ${amount}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Support Duration:{' '}
                        <span className="font-medium text-gray-800">
                          {emergencyDays} days
                        </span>
                      </p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-red-600 hover:text-red-700 font-medium">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <PaymentForm onComplete={handlePaymentComplete} />
                </div>
              </div> : <>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle size={24} className="text-red-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-red-800">
                        Emergency Support System
                      </h3>
                      <div className="mt-2 text-red-700">
                        <p>
                          This system is designed for urgent situations
                          requiring immediate assistance for children in
                          critical need. Your contribution will be prioritized
                          and deployed within hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Zap size={24} className="text-red-600 mr-2" />
                      Emergency Support Details
                    </h2>
                    <p className="text-gray-600">
                      Please provide information about the type of emergency
                      support needed.
                    </p>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Select Emergency Type
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`border rounded-lg p-5 cursor-pointer transition-all ${emergencyType === 'food' ? 'border-red-500 bg-red-50 transform scale-105' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setEmergencyType('food')}>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Food Crisis
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Provide emergency food supplies to children facing
                            acute hunger or malnutrition.
                          </p>
                        </div>
                      </div>
                      <div className={`border rounded-lg p-5 cursor-pointer transition-all ${emergencyType === 'medicine' ? 'border-red-500 bg-red-50 transform scale-105' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setEmergencyType('medicine')}>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Medical Emergency
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Fund critical medications, treatments, or medical
                            evacuations for children in health crises.
                          </p>
                        </div>
                      </div>
                      <div className={`border rounded-lg p-5 cursor-pointer transition-all ${emergencyType === 'shelter' ? 'border-red-500 bg-red-50 transform scale-105' : 'border-gray-200 hover:border-red-300'}`} onClick={() => setEmergencyType('shelter')}>
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Shelter & Protection
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Provide safe shelter, protection, and essential care
                            for displaced or vulnerable children.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {emergencyType && <>
                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                          <Globe size={20} className="mr-2 text-gray-600" />
                          Select Region for Emergency Support
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {['East Africa', 'West Africa', 'South Asia', 'Southeast Asia', 'Middle East', 'Central America', 'South America', 'Eastern Europe'].map(regionName => <div key={regionName} className={`border rounded-lg p-3 cursor-pointer ${region === regionName ? 'border-red-500 bg-red-50' : 'border-gray-200'}`} onClick={() => setRegion(regionName)}>
                              <div className="flex items-center">
                                <input type="radio" id={regionName.replace(/\s+/g, '-').toLowerCase()} name="region" checked={region === regionName} onChange={() => setRegion(regionName)} className="sr-only" />
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                  <MapPin size={16} className="text-red-600" />
                                </div>
                                <label htmlFor={regionName.replace(/\s+/g, '-').toLowerCase()} className="cursor-pointer">
                                  <span className="block font-medium text-gray-800">
                                    {regionName}
                                  </span>
                                </label>
                              </div>
                            </div>)}
                        </div>
                      </div>
                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                          Emergency Support Duration
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Select how many days of emergency support you wish to
                          provide:
                        </p>
                        <div className="space-y-4">
                          <div>
                            <input type="range" min="3" max="30" step="1" value={emergencyDays} onChange={e => setEmergencyDays(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>3 days</span>
                              <span>15 days</span>
                              <span>30 days</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="bg-red-100 px-6 py-3 rounded-md">
                              <span className="text-3xl font-bold text-red-800">
                                {emergencyDays} days
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {[7, 14, 21, 30].map(days => <button key={days} type="button" onClick={() => setEmergencyDays(days)} className={`py-2 px-4 border rounded-md text-sm ${emergencyDays === days ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-800 border-gray-300 hover:border-red-500'}`}>
                                {days} days
                              </button>)}
                          </div>
                        </div>
                      </div>
                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                          Emergency Support Amount
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Select or enter the amount you wish to contribute for
                          this emergency support.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <input type="range" min="50" max="1000" step="50" value={amount} onChange={e => setAmount(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>$50</span>
                              <span>$500</span>
                              <span>$1000</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="bg-red-100 px-6 py-3 rounded-md">
                              <span className="text-3xl font-bold text-red-800">
                                ${amount}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {[100, 250, 500, 1000].map(preset => <button key={preset} type="button" onClick={() => setAmount(preset)} className={`py-2 px-4 border rounded-md text-sm ${amount === preset ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-800 border-gray-300 hover:border-red-500'}`}>
                                ${preset}
                              </button>)}
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Emergency support is deployed immediately. Our
                              team will contact local partners in the selected
                              region within 1 hour of your contribution.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button onClick={handleContinue} disabled={!emergencyType || !region} className={`px-6 py-3 rounded-md font-medium flex items-center ${!emergencyType || !region ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 transition-colors'}`}>
                          <Zap size={18} className="mr-2" />
                          Activate Emergency Support
                        </button>
                      </div>
                    </>}
                </div>
                {!emergencyType && <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      About Emergency Support
                    </h3>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Our Emergency Support system is designed to provide
                        rapid assistance to children facing critical situations
                        around the world. When you activate emergency support:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>
                          Your contribution is immediately allocated to the
                          specified emergency type and region
                        </li>
                        <li>
                          Our local teams are notified within minutes and
                          mobilize resources
                        </li>
                        <li>
                          Support reaches children in need within hours, not
                          days
                        </li>
                        <li>
                          You receive a detailed report of how your contribution
                          was used
                        </li>
                      </ul>
                      <p className="text-gray-600">
                        This system is reserved for urgent situations where
                        immediate intervention can make a significant difference
                        in children's lives.
                      </p>
                    </div>
                  </div>}
              </>}
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}