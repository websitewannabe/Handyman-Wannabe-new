
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic phone validation
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    // Clear error if valid
    setError('');
    
    // Handle submission - in a real app, you would send this to your backend
    console.log('Phone number submitted:', phoneNumber);
    
    // Show thank you message
    setIsSubmitted(true);
    
    // Reset after 3 seconds and close
    setTimeout(() => {
      setIsSubmitted(false);
      setPhoneNumber('');
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 service-modal-overlay">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative service-modal">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          {!isSubmitted ? (
            <>
              <h3 className="text-xl font-bold mb-4 text-center">Have Our AI Call You</h3>
              <p className="text-gray-600 mb-6 text-center">
                Enter your phone number and we'll have our AI assistant call you right away.
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                    placeholder="(123) 456-7890"
                    required
                  />
                  {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Call Me
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <h3 className="text-xl font-bold mb-2 text-primary">Thank You!</h3>
              <p className="text-gray-600">
                Our AI will call you soon at {phoneNumber}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneCallModal;
