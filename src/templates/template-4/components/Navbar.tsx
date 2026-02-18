import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      // Close menu first
      setIsOpen(false);
      // Then scroll
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '#home') {
      // Fallback for home if ID isn't perfectly matched or just scroll top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center justify-between md:justify-center w-full max-w-4xl border border-stone-200">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/src/assets/logo-3x1.png"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
        <button
          className="md:hidden text-wedding-green"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-sans text-xs tracking-widest uppercase text-stone-600 hover:text-wedding-green transition-colors font-semibold cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-xl shadow-xl p-6 md:hidden flex flex-col items-center space-y-4 border border-stone-100 animate-in fade-in slide-in-from-top-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="font-sans text-lg text-stone-700 hover:text-wedding-green cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};