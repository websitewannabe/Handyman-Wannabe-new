
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose }) => {
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
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Call Us Now
            </h2>
            <p className="text-gray-600 mb-6">
              Speak with one of our experts directly to get immediate assistance with your project.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <div className="text-center">
                <p className="text-xl font-bold mb-2">Our Phone Number</p>
                <a href="tel:+17193156629" className="text-2xl text-primary font-bold hover:underline">
                  (719) 315-6629
                </a>
              </div>
            </div>

            <div className="text-gray-600 mb-6">
              <p className="mb-4">Our team is available:</p>
              <ul className="space-y-2 mb-4">
                <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                <li>Saturday: 9:00 AM - 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
              <p>For emergency services outside regular hours, please call the same number and follow the prompts for our emergency line.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:+17193156629"
                className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors text-center"
              >
                Call Now
              </a>
              <button 
                className="w-full sm:w-auto bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhoneCallModal;
