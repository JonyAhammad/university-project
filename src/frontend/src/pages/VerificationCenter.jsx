import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Shield, Upload, CheckCircle, AlertTriangle, User, Building, FileText, Camera, CreditCard } from 'lucide-react';
export function VerificationCenter() {
  const [userType, setUserType] = useState('donor');
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState({
    identification: null,
    proofOfAddress: null,
    businessLicense: null,
    profilePhoto: null,
    additionalDocument: null
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    organizationName: '',
    organizationType: '',
    registrationNumber: '',
    contactPerson: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleUserTypeChange = type => {
    setUserType(type);
    setStep(1);
    setDocuments({
      identification: null,
      proofOfAddress: null,
      businessLicense: null,
      profilePhoto: null,
      additionalDocument: null
    });
  };
  const handleFileUpload = (e, documentType) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to server here
      setDocuments(prev => ({
        ...prev,
        [documentType]: {
          name: file.name,
          size: file.size,
          type: file.type,
          // For demo purposes, create a local URL
          preview: URL.createObjectURL(file)
        }
      }));
    }
  };
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleNextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  const handleSubmit = e => {
    e.preventDefault();
    // In a real app, you would submit to server here
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };
  const renderStepIndicator = () => {
    const totalSteps = userType === 'donor' ? 3 : 4;
    return <div className="mb-8">
        <div className="flex items-center justify-between">
          {Array.from({
          length: totalSteps
        }, (_, i) => <div key={i} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i + 1 === step ? 'bg-teal-600 text-white' : i + 1 < step ? 'bg-teal-100 text-teal-600' : 'bg-gray-200 text-gray-500'}`}>
                {i + 1 < step ? <CheckCircle size={20} /> : i + 1}
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {userType === 'donor' ? ['Personal Info', 'Upload Documents', 'Review & Submit'][i] : ['Organization Info', 'Contact Person', 'Upload Documents', 'Review & Submit'][i]}
              </span>
            </div>)}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
          <div className="absolute top-0 h-1 bg-teal-600 transition-all duration-300" style={{
          width: `${(step - 1) / (totalSteps - 1) * 100}%`
        }}></div>
        </div>
      </div>;
  };
  const renderDonorStep1 = () => <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="address">Residential Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
      </div>
    </div>;
  const renderDonorStep2 = () => <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Upload Verification Documents</h3>
      <p className="text-gray-600 mb-6">
        To ensure the security and transparency of our platform, we require all donors to provide identification documents. 
        These documents will be securely stored and used only for verification purposes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <CreditCard size={18} className="mr-2 text-teal-600" />
            Identification Document
          </h4>
          <p className="text-sm text-gray-600 mb-4">Upload a valid government-issued ID (passport, driver's license, or national ID)</p>
          <div className="relative">
            {documents.identification ? <div className="mb-2">
                <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <span className="text-sm text-green-800 truncate">{documents.identification.name}</span>
                </div>
                <button onClick={() => setDocuments({
              ...documents,
              identification: null
            })} className="text-xs text-red-600 mt-1">
                  Remove
                </button>
              </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, or PDF (max 5MB)</p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'identification')} accept="image/png, image/jpeg, application/pdf" />
              </div>}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <FileText size={18} className="mr-2 text-teal-600" />
            Proof of Address
          </h4>
          <p className="text-sm text-gray-600 mb-4">Upload a recent utility bill, bank statement, or official letter with your address</p>
          <div className="relative">
            {documents.proofOfAddress ? <div className="mb-2">
                <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <span className="text-sm text-green-800 truncate">{documents.proofOfAddress.name}</span>
                </div>
                <button onClick={() => setDocuments({
              ...documents,
              proofOfAddress: null
            })} className="text-xs text-red-600 mt-1">
                  Remove
                </button>
              </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, or PDF (max 5MB)</p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'proofOfAddress')} accept="image/png, image/jpeg, application/pdf" />
              </div>}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <Camera size={18} className="mr-2 text-teal-600" />
            Profile Photo
          </h4>
          <p className="text-sm text-gray-600 mb-4">Upload a clear photo of yourself (optional but recommended)</p>
          <div className="relative">
            {documents.profilePhoto ? <div className="mb-2">
                {documents.profilePhoto.type.startsWith('image/') ? <div className="mb-2">
                    <img src={documents.profilePhoto.preview} alt="Profile Preview" className="h-32 w-auto mx-auto rounded" />
                  </div> : <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                    <CheckCircle size={16} className="text-green-600 mr-2" />
                    <span className="text-sm text-green-800 truncate">{documents.profilePhoto.name}</span>
                  </div>}
                <button onClick={() => setDocuments({
              ...documents,
              profilePhoto: null
            })} className="text-xs text-red-600 mt-1">
                  Remove
                </button>
              </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG or JPG (max 5MB)</p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'profilePhoto')} accept="image/png, image/jpeg" />
              </div>}
          </div>
        </div>
      </div>
    </div>;
  const renderCharityStep1 = () => <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Organization Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="organizationName">Organization Name</label>
          <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="organizationType">Organization Type</label>
          <select id="organizationType" name="organizationType" value={formData.organizationType} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required>
            <option value="">Select type</option>
            <option value="school">School</option>
            <option value="orphanage">Orphanage</option>
            <option value="ngo">NGO</option>
            <option value="community-center">Community Center</option>
            <option value="religious-institution">Religious Institution</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="registrationNumber">Registration Number</label>
          <input type="text" id="registrationNumber" name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="address">Organization Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
      </div>
    </div>;
  const renderCharityStep2 = () => <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Person Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="contactPerson">Contact Person Name</label>
          <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="position">Position in Organization</label>
          <input type="text" id="position" name="position" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g., Director, Principal, Administrator" required />
        </div>
      </div>
    </div>;
  const renderCharityStep3 = () => <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Upload Verification Documents</h3>
      <p className="text-gray-600 mb-6">
        To ensure the security and transparency of our platform, we require all charitable organizations to provide verification documents. 
        These documents will be securely stored and used only for verification purposes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <FileText size={18} className="mr-2 text-teal-600" />
            Registration Certificate
          </h4>
          <p className="text-sm text-gray-600 mb-4">Upload your organization's official registration document</p>
          <div className="relative">
            {documents.identification ? <div className="mb-2">
                <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <span className="text-sm text-green-800 truncate">{documents.identification.name}</span>
                </div>
                <button onClick={() => setDocuments({
              ...documents,
              identification: null
            })} className="text-xs text-red-600 mt-1">
                  Remove
                </button>
              </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, or PDF (max 5MB)</p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'identification')} accept="image/png, image/jpeg, application/pdf" />
              </div>}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <Building size={18} className="mr-2 text-teal-600" />
            Business License
          </h4>
          <p className="text-sm text-gray-600 mb-4">Upload your organization's business license or permit</p>
          <div className="relative">
            {documents.businessLicense ? <div className="mb-2">
                <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <span className="text-sm text-green-800 truncate">{documents.businessLicense.name}</span>
                </div>
                <button onClick={() => setDocuments({
              ...documents,
              businessLicense: null
            })} className="text-xs text-red-600 mt-1">
                  Remove
                </button>
              </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, or PDF (max 5MB)</p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'businessLicense')} accept="image/png, image/jpeg, application/pdf" />
              </div>}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <Camera size={18} className="mr-2 text-teal-600" />
            Facility Photos
          </h4>
          <p className="text-sm text-gray-600 mb-4">Upload photos of your facility/premises</p>
          <div className="relative">
            {documents.profilePhoto ? <div className="mb-2">
                {documents.profilePhoto.type.startsWith('image/') ? <div className="mb-2">
                    <img src={documents.profilePhoto.preview} alt="Facility Preview" className="h-32 w-auto mx-auto rounded" />
                  </div> : <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                    <CheckCircle size={16} className="text-green-600 mr-2" />
                    <span className="text-sm text-green-800 truncate">{documents.profilePhoto.name}</span>
                  </div>}
                <button onClick={() => setDocuments({
              ...documents,
              profilePhoto: null
            })} className="text-xs text-red-600 mt-1">
                  Remove
                </button>
              </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG or JPG (max 5MB)</p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'profilePhoto')} accept="image/png, image/jpeg" />
              </div>}
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <FileText size={18} className="mr-2 text-teal-600" />
            Additional Document
          </h4>
          <p className="text-sm text-gray-600 mb-4">Upload any additional supporting document (optional)</p>
          <div className="relative">
            {documents.additionalDocument ? <div className="mb-2">
                <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                  <CheckCircle size={16} className="text-green-600 mr-2" />
                  <span className="text-sm text-green-800 truncate">{documents.additionalDocument.name}</span>
                </div>
                <button onClick={() => setDocuments({
              ...documents,
              additionalDocument: null
            })} className="text-xs text-red-600 mt-1">
                  Remove
                </button>
              </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, or PDF (max 5MB)</p>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => handleFileUpload(e, 'additionalDocument')} accept="image/png, image/jpeg, application/pdf" />
              </div>}
          </div>
        </div>
      </div>
    </div>;
  const renderDonorStep3 = () => <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Review & Submit</h3>
      <p className="text-gray-600 mb-6">
        Please review your information before submitting. Once submitted, your verification request will be processed within 1-3 business days.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-gray-800">{formData.fullName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-gray-800">{formData.email || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-gray-800">{formData.phone || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Residential Address</p>
            <p className="text-gray-800">{formData.address || "Not provided"}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-4">Uploaded Documents</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded p-3 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-1">Identification Document</p>
            {documents.identification ? <div className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Uploaded</span>
              </div> : <div className="flex items-center text-red-600">
                <AlertTriangle size={16} className="mr-1" />
                <span className="text-sm">Missing</span>
              </div>}
          </div>
          <div className="border border-gray-200 rounded p-3 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-1">Proof of Address</p>
            {documents.proofOfAddress ? <div className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Uploaded</span>
              </div> : <div className="flex items-center text-red-600">
                <AlertTriangle size={16} className="mr-1" />
                <span className="text-sm">Missing</span>
              </div>}
          </div>
          <div className="border border-gray-200 rounded p-3 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-1">Profile Photo</p>
            {documents.profilePhoto ? <div className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Uploaded</span>
              </div> : <div className="flex items-center text-gray-600">
                <AlertTriangle size={16} className="mr-1" />
                <span className="text-sm">Optional</span>
              </div>}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" required />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I certify that all information provided is accurate and complete. I understand that providing false information may result in rejection of my verification request.
            </label>
          </div>
        </div>
      </div>
    </div>;
  const renderCharityStep4 = () => <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Review & Submit</h3>
      <p className="text-gray-600 mb-6">
        Please review your organization's information before submitting. Once submitted, your verification request will be processed within 3-5 business days.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Organization Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
          <div>
            <p className="text-sm text-gray-500">Organization Name</p>
            <p className="text-gray-800">{formData.organizationName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Organization Type</p>
            <p className="text-gray-800">{formData.organizationType || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Registration Number</p>
            <p className="text-gray-800">{formData.registrationNumber || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Organization Address</p>
            <p className="text-gray-800">{formData.address || "Not provided"}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Contact Person Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
          <div>
            <p className="text-sm text-gray-500">Contact Person</p>
            <p className="text-gray-800">{formData.contactPerson || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-gray-800">{formData.email || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-gray-800">{formData.phone || "Not provided"}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-4">Uploaded Documents</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded p-3 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-1">Registration Certificate</p>
            {documents.identification ? <div className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Uploaded</span>
              </div> : <div className="flex items-center text-red-600">
                <AlertTriangle size={16} className="mr-1" />
                <span className="text-sm">Missing</span>
              </div>}
          </div>
          <div className="border border-gray-200 rounded p-3 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-1">Business License</p>
            {documents.businessLicense ? <div className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Uploaded</span>
              </div> : <div className="flex items-center text-red-600">
                <AlertTriangle size={16} className="mr-1" />
                <span className="text-sm">Missing</span>
              </div>}
          </div>
          <div className="border border-gray-200 rounded p-3 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-1">Facility Photos</p>
            {documents.profilePhoto ? <div className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-sm">Uploaded</span>
              </div> : <div className="flex items-center text-gray-600">
                <AlertTriangle size={16} className="mr-1" />
                <span className="text-sm">Missing</span>
              </div>}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" required />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="text-gray-700">
              I certify that all information provided is accurate and complete. I understand that providing false information may result in rejection of the organization's verification request.
            </label>
          </div>
        </div>
      </div>
    </div>;
  const renderStepContent = () => {
    if (userType === 'donor') {
      switch (step) {
        case 1:
          return renderDonorStep1();
        case 2:
          return renderDonorStep2();
        case 3:
          return renderDonorStep3();
        default:
          return null;
      }
    } else {
      switch (step) {
        case 1:
          return renderCharityStep1();
        case 2:
          return renderCharityStep2();
        case 3:
          return renderCharityStep3();
        case 4:
          return renderCharityStep4();
        default:
          return null;
      }
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-2">
              <Shield size={28} className="text-white mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                Verification Center
              </h1>
            </div>
            <p className="text-teal-100 text-center mt-2 max-w-3xl mx-auto">
              Complete your verification to ensure trust and transparency in our donation system.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {isSubmitted ? <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Verification Request Submitted!
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Thank you for submitting your verification documents. Our team will review your information and update your account status within {userType === 'donor' ? '1-3' : '3-5'} business days.
                </p>
                <div className="mb-8 p-6 bg-gray-50 rounded-lg text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    What happens next?
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    <li>Our verification team will review all submitted documents</li>
                    <li>You may receive an email if additional information is needed</li>
                    <li>Once verified, your account will be updated with a verified badge</li>
                    <li>You'll receive a confirmation email when the process is complete</li>
                  </ol>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => window.location.href = '/'} className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
                    Return to Homepage
                  </button>
                </div>
              </div> : <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Choose Your Verification Type
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`border rounded-lg p-5 cursor-pointer transition-all ${userType === 'donor' ? 'border-teal-500 bg-teal-50 transform scale-105' : 'border-gray-200 hover:border-teal-300'}`} onClick={() => handleUserTypeChange('donor')}>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                          <User size={24} className="text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Individual Donor</h3>
                          <p className="text-sm text-gray-600">Verify your identity as a donor</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        For individuals who want to donate food, clothing, or other resources to children in need.
                      </p>
                    </div>
                    <div className={`border rounded-lg p-5 cursor-pointer transition-all ${userType === 'charity' ? 'border-teal-500 bg-teal-50 transform scale-105' : 'border-gray-200 hover:border-teal-300'}`} onClick={() => handleUserTypeChange('charity')}>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                          <Building size={24} className="text-teal-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">Charity/School</h3>
                          <p className="text-sm text-gray-600">Verify your organization</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        For schools, orphanages, and charitable organizations that support children.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {renderStepIndicator()}
                  <form onSubmit={handleSubmit}>
                    {renderStepContent()}
                    <div className="mt-8 flex justify-between">
                      {step > 1 && <button type="button" onClick={handlePrevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                          Back
                        </button>}
                      {step < (userType === 'donor' ? 3 : 4) ? <button type="button" onClick={handleNextStep} className="ml-auto px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                          Continue
                        </button> : <button type="submit" className="ml-auto px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                          Submit Verification
                        </button>}
                    </div>
                  </form>
                </div>
              </div>}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-800 mb-3">Why Verification Matters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Shield size={20} className="text-blue-700" />
                  </div>
                  <h4 className="font-medium text-blue-800 mb-2">Trust & Safety</h4>
                  <p className="text-blue-700 text-sm">
                    Verification ensures that all participants in our platform are genuine and trustworthy
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-blue-800 mb-2">Transparency</h4>
                  <p className="text-blue-700 text-sm">
                    Verified accounts provide greater transparency in the donation process
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-blue-800 mb-2">Security</h4>
                  <p className="text-blue-700 text-sm">
                    Verification helps prevent fraud and ensures donations reach legitimate recipients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}