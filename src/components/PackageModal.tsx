
import React, { useEffect, useRef } from "react";
import { X, Check, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    name: string;
    description: string;
    features: string[];
    price: string;
    duration: string;
    popular?: boolean;
  };
}

const PackageModal: React.FC<PackageModalProps> = ({
  isOpen,
  onClose,
  packageData,
}) => {
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

          {packageData.popular && (
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {packageData.name}
            </h2>
            <p className="text-gray-600 mb-6">{packageData.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-primary mb-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span className="font-bold">Price</span>
                </div>
                <p className="text-gray-700 text-lg font-semibold">
                  {packageData.price}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center text-primary mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-bold">Duration</span>
                </div>
                <p className="text-gray-700 text-lg font-semibold">
                  {packageData.duration}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Features & Benefits
              </h3>
              <ul className="space-y-3">
                {packageData.features.map((feature, index) => (
                  <li key={index} className="flex text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                Select Package
              </button>
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

export default PackageModal;
