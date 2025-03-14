
export const navItems = [
  { label: "HOME", href: "/" },
  {
    label: "SERVICES",
    href: "/services",
    megaMenu: [
      {
        items: [
          { name: "Carpentry", href: "/services/carpentry" },
          { name: "Electrical", href: "/services/electrical" },
          { name: "Plumbing", href: "/services/plumbing" },
          { name: "Painting & Drywall", href: "/services/painting-drywall" }
        ]
      },
      {
        items: [
          { name: "Flooring", href: "/services/flooring" },
          { name: "Garage Doors", href: "/services/garage-doors" },
          { name: "Windows & Doors", href: "/services/windows-doors" },
          { name: "Smart Homes", href: "/services/smart-homes" }
        ]
      },
      {
        items: [
          { name: "Landscaping", href: "/services/landscaping" },
          { name: "Powerwashing", href: "/services/powerwashing" },
          { name: "Home Security", href: "/services/home-security" },
          { name: "Holiday Lighting", href: "/services/holiday-lighting" }
        ]
      }
    ]
  },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" }
];
