
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type PhoneCallModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Prevent body resize from affecting modal position
    const bodyScrollPos = window.scrollY;
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
      
      // Apply modal-specific body styling
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${bodyScrollPos}px`;
      document.body.style.width = "100%";
      
      // Add class for CSS context
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      
      // Restore body styling
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      
      // Remove class
      document.body.classList.remove("modal-open");
      
      // Restore scroll position
      window.scrollTo(0, bodyScrollPos);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!phoneNumber.trim()) {
      setError("Please enter a valid phone number");
      return;
    }
    setError("");
    // Simulate API call
    setIsSubmitted(true);
    // Auto close after 3 seconds
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setPhoneNumber("");
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="phone-call-modal-container fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 9999,
        isolation: 'isolate'
      }}
    >
      <motion.div
        ref={modalRef}
        className="phone-call-modal-content bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ 
          position: 'relative',
          zIndex: 1,
          margin: '0 auto',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 bg-white/80 rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>

          <div className="mt-6">
            {!isSubmitted ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-center">
                  Have Our AI Call You
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  Enter your phone number and we'll have our AI assistant call
                  you right away.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary`}
                      placeholder="(123) 456-7890"
                      required
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Call Me
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Call Requested!</h3>
                <p className="text-gray-600">
                  Our AI assistant will call you shortly at {phoneNumber}.
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  If you need immediate assistance, please call us directly at (719) 315-6628.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhoneCallModal;
