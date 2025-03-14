
interface NavItem {
  name: string;
  href: string;
  items?: NavItem[];
}

export const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    items: [
      { name: "Carpentry", href: "/services/carpentry" },
      { name: "Garage Doors", href: "/services/garage-doors" },
      { name: "Smart Homes", href: "/services/smart-homes" },
      { name: "Locksmithing", href: "/services/locksmithing" },
      { name: "Furniture Assembly", href: "/services/furniture-assembly" },
      { name: "Electrical", href: "/services/electrical" },
      { name: "Painting & Drywall", href: "/services/painting-drywall" },
      { name: "Landscaping", href: "/services/landscaping" },
      { name: "Home Security", href: "/services/home-security" }
    ]
  },
  { name: "About", href: "/about-us" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" }
];
