import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, CheckCircle } from 'lucide-react';
export function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'donor',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    setError('');
    // Simulate registration
    setTimeout(() => {
      // In a real app, this would register the user with a backend
      console.log('Registering with:', formData);
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };
  return <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      {step === 1 ? <>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <UserPlus size={32} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create an Account
            </h2>
            <p className="text-gray-600 mt-2">
              Join NourishNet to make a difference
            </p>
          </div>
          {error && <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              {error}
            </div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="userType" className="block text-gray-700 mb-2">
                I want to join as a:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className={`border rounded-lg p-3 cursor-pointer text-center ${formData.userType === 'donor' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
              ...prev,
              userType: 'donor'
            }))}>
                  <input type="radio" id="donor" name="userType" value="donor" checked={formData.userType === 'donor'} onChange={handleChange} className="sr-only" />
                  <label htmlFor="donor" className="cursor-pointer">
                    <span className="block font-medium text-gray-800">
                      Donor
                    </span>
                  </label>
                </div>
                <div className={`border rounded-lg p-3 cursor-pointer text-center ${formData.userType === 'requestor' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
              ...prev,
              userType: 'requestor'
            }))}>
                  <input type="radio" id="requestor" name="userType" value="requestor" checked={formData.userType === 'requestor'} onChange={handleChange} className="sr-only" />
                  <label htmlFor="requestor" className="cursor-pointer">
                    <span className="block font-medium text-gray-800">
                      Requestor
                    </span>
                  </label>
                </div>
                <div className={`border rounded-lg p-3 cursor-pointer text-center ${formData.userType === 'provider' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`} onClick={() => setFormData(prev => ({
              ...prev,
              userType: 'provider'
            }))}>
                  <input type="radio" id="provider" name="userType" value="provider" checked={formData.userType === 'provider'} onChange={handleChange} className="sr-only" />
                  <label htmlFor="provider" className="cursor-pointer">
                    <span className="block font-medium text-gray-800">
                      Provider
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-gray-700 mb-2 flex items-center">
                <User size={16} className="mr-2 text-gray-500" />
                Full Name
              </label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2 flex items-center">
                <Mail size={16} className="mr-2 text-gray-500" />
                Email Address
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2 flex items-center">
                <Lock size={16} className="mr-2 text-gray-500" />
                Password
              </label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 flex items-center">
                <Lock size={16} className="mr-2 text-gray-500" />
                Confirm Password
              </label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" required />
              <label htmlFor="agreeToTerms" className="ml-2 text-gray-700 text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-teal-600 hover:text-teal-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-teal-600 hover:text-teal-700">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <button type="submit" disabled={isSubmitting || !formData.agreeToTerms} className={`w-full bg-teal-600 text-white px-4 py-3 rounded-md font-medium ${isSubmitting || !formData.agreeToTerms ? 'opacity-70 cursor-not-allowed' : 'hover:bg-teal-700'} transition-colors`}>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </> : <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Account Created!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining NourishNet. Your account has been successfully
            created.
          </p>
          <p className="text-gray-600 mb-8">
            We've sent a confirmation email to <strong>{formData.email}</strong>
            . Please verify your email to continue.
          </p>
          <Link to="/signin" className="block w-full bg-teal-600 text-white px-4 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
            Continue to Sign In
          </Link>
        </div>}
    </div>;
}