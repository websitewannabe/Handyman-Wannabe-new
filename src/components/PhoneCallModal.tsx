
import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Function to format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format the phone number
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
    setError('');
  };

  const validatePhoneNumber = (phone: string) => {
    // Check if the phone number has 10 digits (US format)
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Handle submission here (in a real app, this would call an API)
    console.log('Submitted phone number:', phoneNumber);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false);
      setPhoneNumber('');
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Modal content */}
        <div className="px-6 py-6">
          {!isSubmitted ? (
            <>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Request a Call Back
              </h3>
              <p className="text-gray-600 mb-4">
                Enter your phone number below and our AI assistant will call you shortly!
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="(XXX) XXX-XXXX"
                    className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    required
                  />
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Request Call
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600">Our AI will call you soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneCallModal;
