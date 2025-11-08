import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Upload, CheckCircle, AlertTriangle, FileText, Camera, X, Info, Shield } from 'lucide-react';
export function ProviderVerification() {
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState({
    businessLicense: null,
    foodSafetyCertificate: null,
    identityDocument: null,
    facilityPhotos: []
  });
  const [dragActive, setDragActive] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState({
    businessLicense: 'pending',
    foodSafetyCertificate: 'pending',
    identityDocument: 'pending',
    facilityPhotos: 'pending',
    overallStatus: 'pending'
  });
  // Handle file drop
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && activeDocument) {
      handleFiles(e.dataTransfer.files, activeDocument);
    }
  };
  // Handle file input change
  const handleFileChange = (e, documentType) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files, documentType);
    }
  };
  // Process files
  const handleFiles = (files, documentType) => {
    if (documentType === 'facilityPhotos') {
      // Multiple files for facility photos
      const newPhotos = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }));
      setDocuments(prev => ({
        ...prev,
        facilityPhotos: [...prev.facilityPhotos, ...newPhotos]
      }));
      // Update status
      if (documents.facilityPhotos.length + newPhotos.length > 0) {
        setVerificationStatus(prev => ({
          ...prev,
          facilityPhotos: 'uploaded'
        }));
      }
    } else {
      // Single file for other document types
      const file = files[0];
      setDocuments(prev => ({
        ...prev,
        [documentType]: {
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        }
      }));
      // Update status
      setVerificationStatus(prev => ({
        ...prev,
        [documentType]: 'uploaded'
      }));
    }
  };
  // Remove a document
  const removeDocument = (documentType, index = null) => {
    if (documentType === 'facilityPhotos' && index !== null) {
      // Remove specific photo
      const newPhotos = [...documents.facilityPhotos];
      URL.revokeObjectURL(newPhotos[index].preview); // Clean up
      newPhotos.splice(index, 1);
      setDocuments(prev => ({
        ...prev,
        facilityPhotos: newPhotos
      }));
      // Update status if no photos left
      if (newPhotos.length === 0) {
        setVerificationStatus(prev => ({
          ...prev,
          facilityPhotos: 'pending'
        }));
      }
    } else {
      // Remove single document
      if (documents[documentType]?.preview) {
        URL.revokeObjectURL(documents[documentType].preview); // Clean up
      }
      setDocuments(prev => ({
        ...prev,
        [documentType]: null
      }));
      // Update status
      setVerificationStatus(prev => ({
        ...prev,
        [documentType]: 'pending'
      }));
    }
  };
  // Submit for verification
  const submitForVerification = () => {
    // Check if all required documents are uploaded
    const allDocumentsUploaded = documents.businessLicense && documents.foodSafetyCertificate && documents.identityDocument && documents.facilityPhotos.length > 0;
    if (allDocumentsUploaded) {
      // Simulate API call
      setVerificationStatus(prev => ({
        ...prev,
        overallStatus: 'submitted'
      }));
      setStep(2);
      // In a real app, this would be an API call to submit the documents
      console.log('Documents submitted:', documents);
    } else {
      alert('Please upload all required documents before submitting');
    }
  };
  // Format file size
  const formatFileSize = bytes => {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  };
  // Get status indicator
  const getStatusIndicator = status => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'rejected':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'uploaded':
        return <Info size={18} className="text-blue-500" />;
      case 'submitted':
        return <Info size={18} className="text-blue-500" />;
      case 'pending':
      default:
        return <AlertTriangle size={18} className="text-amber-500" />;
    }
  };
  // Get status text
  const getStatusText = status => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'uploaded':
        return 'Uploaded';
      case 'submitted':
        return 'Under Review';
      case 'pending':
      default:
        return 'Not Uploaded';
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-teal-600 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Shield size={32} className="text-white mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Provider Verification Portal
              </h1>
            </div>
            <p className="text-teal-100 text-center mt-2 max-w-3xl mx-auto">
              Complete your verification to become an approved food provider on
              NourishNet. Upload required documents and certifications to ensure
              quality and safety standards.
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
                  <div className={`h-1 w-24 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className={`h-1 w-24 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-teal-600' : 'bg-gray-300'}`}>
                    <span className="text-white font-bold">3</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <div className="text-center px-2 w-32">
                  <p className={`text-sm ${step === 1 ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>
                    Upload Documents
                  </p>
                </div>
                <div className="text-center px-2 w-32">
                  <p className={`text-sm ${step === 2 ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>
                    Verification
                  </p>
                </div>
                <div className="text-center px-2 w-32">
                  <p className={`text-sm ${step === 3 ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>
                    Approval
                  </p>
                </div>
              </div>
            </div>
            {step === 1 && <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Document Upload
                </h2>
                <p className="text-gray-600 mb-6">
                  Please upload the following documents to verify your identity
                  and food service credentials. All documents must be clear,
                  legible, and valid.
                </p>
                {/* Document Upload Sections */}
                <div className="space-y-8">
                  {/* Business License */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <FileText size={20} className="text-teal-600 mt-1 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Business License / Registration
                          </h3>
                          <p className="text-sm text-gray-500">
                            Upload your valid business license or registration
                            certificate
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIndicator(verificationStatus.businessLicense)}
                        <span className="text-sm ml-1">
                          {getStatusText(verificationStatus.businessLicense)}
                        </span>
                      </div>
                    </div>
                    {!documents.businessLicense ? <div className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive && activeDocument === 'businessLicense' ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'}`} onDragEnter={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                  setActiveDocument('businessLicense');
                }} onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }} onDragLeave={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }} onDrop={handleDrop}>
                        <div className="flex flex-col items-center">
                          <Upload size={30} className="text-gray-400 mb-2" />
                          <p className="text-gray-600 mb-1">
                            Drag and drop your file here, or
                          </p>
                          <label className="cursor-pointer text-teal-600 hover:text-teal-700 font-medium">
                            Browse Files
                            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange(e, 'businessLicense')} />
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Supported formats: PDF, JPG, PNG (max 5MB)
                          </p>
                        </div>
                      </div> : <div className="border rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-md mr-3">
                            <FileText size={20} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {documents.businessLicense.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(documents.businessLicense.size)}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => removeDocument('businessLicense')} className="text-gray-400 hover:text-gray-600">
                          <X size={18} />
                        </button>
                      </div>}
                  </div>
                  {/* Food Safety Certificate */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <FileText size={20} className="text-teal-600 mt-1 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Food Safety Certificate
                          </h3>
                          <p className="text-sm text-gray-500">
                            Upload your food safety or hygiene certification
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIndicator(verificationStatus.foodSafetyCertificate)}
                        <span className="text-sm ml-1">
                          {getStatusText(verificationStatus.foodSafetyCertificate)}
                        </span>
                      </div>
                    </div>
                    {!documents.foodSafetyCertificate ? <div className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive && activeDocument === 'foodSafetyCertificate' ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'}`} onDragEnter={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                  setActiveDocument('foodSafetyCertificate');
                }} onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }} onDragLeave={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }} onDrop={handleDrop}>
                        <div className="flex flex-col items-center">
                          <Upload size={30} className="text-gray-400 mb-2" />
                          <p className="text-gray-600 mb-1">
                            Drag and drop your file here, or
                          </p>
                          <label className="cursor-pointer text-teal-600 hover:text-teal-700 font-medium">
                            Browse Files
                            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange(e, 'foodSafetyCertificate')} />
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Supported formats: PDF, JPG, PNG (max 5MB)
                          </p>
                        </div>
                      </div> : <div className="border rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-md mr-3">
                            <FileText size={20} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {documents.foodSafetyCertificate.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(documents.foodSafetyCertificate.size)}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => removeDocument('foodSafetyCertificate')} className="text-gray-400 hover:text-gray-600">
                          <X size={18} />
                        </button>
                      </div>}
                  </div>
                  {/* Identity Document */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <FileText size={20} className="text-teal-600 mt-1 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Identity Document
                          </h3>
                          <p className="text-sm text-gray-500">
                            Upload a government-issued ID for verification
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIndicator(verificationStatus.identityDocument)}
                        <span className="text-sm ml-1">
                          {getStatusText(verificationStatus.identityDocument)}
                        </span>
                      </div>
                    </div>
                    {!documents.identityDocument ? <div className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive && activeDocument === 'identityDocument' ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'}`} onDragEnter={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                  setActiveDocument('identityDocument');
                }} onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }} onDragLeave={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }} onDrop={handleDrop}>
                        <div className="flex flex-col items-center">
                          <Upload size={30} className="text-gray-400 mb-2" />
                          <p className="text-gray-600 mb-1">
                            Drag and drop your file here, or
                          </p>
                          <label className="cursor-pointer text-teal-600 hover:text-teal-700 font-medium">
                            Browse Files
                            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange(e, 'identityDocument')} />
                          </label>
                          <p className="text-xs text-gray-500 mt-2">
                            Supported formats: PDF, JPG, PNG (max 5MB)
                          </p>
                        </div>
                      </div> : <div className="border rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-md mr-3">
                            <FileText size={20} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {documents.identityDocument.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(documents.identityDocument.size)}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => removeDocument('identityDocument')} className="text-gray-400 hover:text-gray-600">
                          <X size={18} />
                        </button>
                      </div>}
                  </div>
                  {/* Facility Photos */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <Camera size={20} className="text-teal-600 mt-1 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Facility Photos
                          </h3>
                          <p className="text-sm text-gray-500">
                            Upload at least 3 photos of your food preparation
                            facility
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIndicator(verificationStatus.facilityPhotos)}
                        <span className="text-sm ml-1">
                          {getStatusText(verificationStatus.facilityPhotos)}
                        </span>
                      </div>
                    </div>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${dragActive && activeDocument === 'facilityPhotos' ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'}`} onDragEnter={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                  setActiveDocument('facilityPhotos');
                }} onDragOver={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }} onDragLeave={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }} onDrop={handleDrop}>
                      <div className="flex flex-col items-center">
                        <Upload size={30} className="text-gray-400 mb-2" />
                        <p className="text-gray-600 mb-1">
                          Drag and drop multiple photos here, or
                        </p>
                        <label className="cursor-pointer text-teal-600 hover:text-teal-700 font-medium">
                          Browse Files
                          <input type="file" className="hidden" accept=".jpg,.jpeg,.png" multiple onChange={e => handleFileChange(e, 'facilityPhotos')} />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          Supported formats: JPG, PNG (max 5MB each)
                        </p>
                      </div>
                    </div>
                    {documents.facilityPhotos.length > 0 && <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {documents.facilityPhotos.map((photo, index) => <div key={index} className="relative group">
                            <img src={photo.preview} alt={`Facility ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                            <button onClick={() => removeDocument('facilityPhotos', index)} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                              <X size={14} className="text-gray-600" />
                            </button>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {photo.name}
                            </p>
                          </div>)}
                      </div>}
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={submitForVerification} className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors">
                    Submit for Verification
                  </button>
                </div>
              </div>}
            {step === 2 && <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Info size={32} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mt-4">
                    Verification in Progress
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Your documents have been submitted and are currently under
                    review by our team. This process typically takes 2-3
                    business days.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <Info size={20} className="text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">
                        Verification Status
                      </h3>
                      <p className="text-blue-700 text-sm mt-1">
                        You will receive email notifications about your
                        verification progress. You can also check the status
                        here anytime.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-800">
                      Document Status
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">Business License</span>
                      <div className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-1" />
                        <span className="text-blue-600">Under Review</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">
                        Food Safety Certificate
                      </span>
                      <div className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-1" />
                        <span className="text-blue-600">Under Review</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">Identity Document</span>
                      <div className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-1" />
                        <span className="text-blue-600">Under Review</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">Facility Photos</span>
                      <div className="flex items-center">
                        <Info size={16} className="text-blue-500 mr-1" />
                        <span className="text-blue-600">Under Review</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Need to update your documents or have questions about the
                    verification process?
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                      Update Documents
                    </button>
                    <button className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                      Contact Support
                    </button>
                  </div>
                </div>
                {/* For demo purposes only - this button would not exist in real app */}
                <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                  <button onClick={() => setStep(3)} className="text-sm text-blue-600 hover:text-blue-800">
                    (Demo: Skip to Approved Step)
                  </button>
                </div>
              </div>}
            {step === 3 && <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mt-4">
                    Verification Approved!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Congratulations! Your provider account has been verified and
                    approved. You can now start accepting food support requests
                    on NourishNet.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <CheckCircle size={20} className="text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">
                        Provider Status: Active
                      </h3>
                      <p className="text-green-700 text-sm mt-1">
                        Your account is now active and visible to requesters in
                        your area. You will receive notifications when new
                        requests match your profile.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-medium text-gray-800">
                      Document Status
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">Business License</span>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-1" />
                        <span className="text-green-600">Approved</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">
                        Food Safety Certificate
                      </span>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-1" />
                        <span className="text-green-600">Approved</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">Identity Document</span>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-1" />
                        <span className="text-green-600">Approved</span>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-gray-700">Facility Photos</span>
                      <div className="flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-1" />
                        <span className="text-green-600">Approved</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Next Steps
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Complete Your Profile
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Add more details about your food services,
                          specialties, and capacity to improve matching.
                        </p>
                        <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                          Go to Profile Settings →
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Set Availability
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Define your operating hours and delivery zones to
                          receive relevant requests.
                        </p>
                        <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                          Set Availability →
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Review Provider Guidelines
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Learn about our quality standards and best practices
                          for food providers.
                        </p>
                        <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                          Read Guidelines →
                        </button>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2">
                          Join Provider Community
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          Connect with other food providers to share tips and
                          best practices.
                        </p>
                        <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                          Join Community →
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="px-6 py-3 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors">
                      Go to Provider Dashboard
                    </button>
                  </div>
                </div>
              </div>}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-800 mb-3">
                Verification Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">
                    Required Documents
                  </h4>
                  <ul className="list-disc pl-5 text-blue-700 space-y-1 text-sm">
                    <li>Valid business license or registration</li>
                    <li>Food safety or hygiene certification</li>
                    <li>Government-issued ID of the business owner</li>
                    <li>At least 3 photos of your food preparation facility</li>
                    <li>Proof of address (utility bill or lease agreement)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">
                    Verification Process
                  </h4>
                  <ul className="list-disc pl-5 text-blue-700 space-y-1 text-sm">
                    <li>Document review (2-3 business days)</li>
                    <li>Background check of business and owner</li>
                    <li>Verification of food safety compliance</li>
                    <li>Possible virtual or in-person facility inspection</li>
                    <li>Final approval and activation of provider account</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}