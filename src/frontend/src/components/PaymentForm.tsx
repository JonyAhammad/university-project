import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
export function PaymentForm({
  onComplete
}) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }, 2000);
  };
  if (isComplete) {
    return <div className="bg-white rounded-lg p-8 shadow-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for your generous contribution. Your donation is making a
          real difference in children's lives.
        </p>
        <p className="text-gray-500 text-sm">
          A confirmation receipt has been sent to your email address.
        </p>
      </div>;
  }
  return <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center mb-6">
        <CreditCard size={24} className="text-teal-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">Secure Payment</h3>
      </div>
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button type="button" className={`flex-1 py-2 px-4 border rounded-md ${paymentMethod === 'card' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-gray-300 text-gray-600'}`} onClick={() => setPaymentMethod('card')}>
            Credit Card
          </button>
          <button type="button" className={`flex-1 py-2 px-4 border rounded-md ${paymentMethod === 'paypal' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-gray-300 text-gray-600'}`} onClick={() => setPaymentMethod('paypal')}>
            PayPal
          </button>
          <button type="button" className={`flex-1 py-2 px-4 border rounded-md ${paymentMethod === 'bank' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-gray-300 text-gray-600'}`} onClick={() => setPaymentMethod('bank')}>
            Bank Transfer
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {paymentMethod === 'card' && <>
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-gray-700 text-sm font-medium mb-2">
                Name on Card
              </label>
              <input type="text" id="cardName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="John Smith" required />
            </div>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-medium mb-2">
                Card Number
              </label>
              <input type="text" id="cardNumber" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="expiry" className="block text-gray-700 text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input type="text" id="expiry" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="MM/YY" required />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-gray-700 text-sm font-medium mb-2">
                  CVC
                </label>
                <input type="text" id="cvc" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="123" required />
              </div>
            </div>
          </>}
        {paymentMethod === 'paypal' && <div className="text-center py-6">
            <p className="text-gray-600 mb-4">
              You will be redirected to PayPal to complete your donation.
            </p>
            <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="PayPal Checkout" className="h-12 mx-auto" />
          </div>}
        {paymentMethod === 'bank' && <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Please use the following details for bank transfer:
            </p>
            <div className="bg-gray-50 p-4 rounded-md text-sm">
              <p className="mb-2">
                <span className="font-semibold">Account Name:</span> NourishNet
                Foundation
              </p>
              <p className="mb-2">
                <span className="font-semibold">Account Number:</span>{' '}
                1234567890
              </p>
              <p className="mb-2">
                <span className="font-semibold">Sort Code:</span> 12-34-56
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bank:</span> Global Charity Bank
              </p>
              <p>
                <span className="font-semibold">Reference:</span> Please include
                your email as reference
              </p>
            </div>
          </div>}
        <div className="mt-6">
          <button type="submit" className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors font-medium flex justify-center items-center" disabled={isProcessing}>
            {isProcessing ? <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span> : 'Complete Donation'}
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your payment information is encrypted and secure. We never store
            your full card details.
          </p>
        </div>
      </form>
    </div>;
}