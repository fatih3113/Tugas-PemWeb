import React, { useState } from "react";
import { Home, Info, Users, HelpCircle } from "lucide-react";
import { NavLink } from "./ui/NavLink";

export const Header: React.FC = () => {
  const [currentPath, setCurrentPath] = useState("#");

  const menuItems = [
    { label: "Beranda",    href: "#",         icon: <Home size={18} /> },
    { label: "Tentang",    href: "#tentang",   icon: <Info size={18} /> },
    { label: "Narasumber", href: "#speaker",   icon: <Users size={18} /> },
    { label: "FAQ",        href: "#faq",       icon: <HelpCircle size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="logo">
          <img src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" alt="logo" className="h-16" />
        </div>
        <nav className="flex gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isActive={item.href === currentPath}
              onClick={() => setCurrentPath(item.href)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;