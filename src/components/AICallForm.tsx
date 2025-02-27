
import React, { useState } from 'react';
import { X, Phone } from 'lucide-react';

interface AICallFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AICallForm: React.FC<AICallFormProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the phone number submission here
    console.log('Phone number submitted:', phoneNumber);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setPhoneNumber('');
      onClose();
    }, 3000);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-scaleIn">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-600">We'll call you shortly at {phoneNumber}.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-2 text-center">Have Our AI Call You</h3>
            <p className="text-gray-600 mb-4 text-center">Enter your phone number and we'll call you right back.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="(719) 315-6628"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Call Me Now
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AICallForm;
