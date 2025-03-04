
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
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

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("mousedown", handleClickOutside);
      // Disable scrolling on the body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="relative p-6">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-center mb-6">Have Our AI Call You</h2>
            <p className="text-center text-gray-600 mb-6">
              Enter your phone number and we'll have our AI assistant call you right away.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="(123) 456-7890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              
              <button 
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Call Me
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhoneCallModal;
