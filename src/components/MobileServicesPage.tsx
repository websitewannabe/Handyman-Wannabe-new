import React from "react";
import { XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface MobileServicesPageProps {
  onClose: () => void;
}

const MobileServicesPage: React.FC<MobileServicesPageProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const serviceCategories = [
    {
      title: "Home Improvement",
      services: [
        { name: "Carpentry", link: "/services/carpentry" },
        { name: "Painting & Drywall", link: "/services/painting-drywall" },
        { name: "Flooring", link: "/services/flooring" },
        { name: "Windows & Doors", link: "/services/windows-doors" },
      ],
    },
    {
      title: "Outdoor Services",
      services: [
        { name: "Landscaping", link: "/services/landscaping" },
        { name: "Powerwashing", link: "/services/powerwashing" },
        { name: "Pools & Spas", link: "/services/pools-spas" },
        { name: "Holiday Lighting", link: "/services/holiday-lighting" },
      ],
    },
    {
      title: "Technical Services",
      services: [
        { name: "Electrical", link: "/services/electrical" },
        { name: "Plumbing", link: "/services/plumbing" },
        { name: "Smart Homes", link: "/services/smart-homes" },
        { name: "Home Security", link: "/services/home-security" },
      ],
    },
    {
      title: "Specialty Services",
      services: [
        { name: "Furniture Assembly", link: "/services/furniture-assembly" },
        { name: "Locksmithing", link: "/services/locksmithing" },
        { name: "Garage Doors", link: "/services/garage-doors" },
        { name: "Home Inspections", link: "/services/home-inspections" },
      ],
    },
    {
      title: "Additional Services",
      services: [
        { name: "Cleaning", link: "/services/cleaning" },
        { name: "Third-Party Moving", link: "/services/third-party-moving" },
        { name: "Management Companies", link: "/services/management-companies" },
        { name: "Misc Services", link: "/services/misc" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Services</h1>
        <button onClick={onClose} className="text-gray-600 hover:text-primary">
          <XCircle size={24} />
        </button>
      </div>

      <div className="space-y-8">
        {serviceCategories.map((category, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {category.services.map((service, serviceIndex) => (
                <Link
                  key={serviceIndex}
                  to={service.link}
                  className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
                  onClick={() => navigate(service.link)}
                >
                  <span className="text-gray-800">{service.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileServicesPage;