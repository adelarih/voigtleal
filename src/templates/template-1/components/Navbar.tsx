import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e: any) => {
      // Catch scroll from window or any scrolling element (important for the builder/preview modes)
      const scrollPos = e.target.scrollTop !== undefined ? e.target.scrollTop : window.scrollY;
      setIsScrolled(scrollPos > 50);
    };

    // Use capture: true to catch scroll events from the scrolling divs in App.tsx
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Religioso', id: 'cerimonia-religiosa' },
    { label: 'Festa', id: 'cerimonia-festiva' },
    { label: 'Momentos', id: 'momentos' },
    { label: 'Presentes', id: 'lista-presentes' },
    { label: 'Recados', id: 'recados' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-lg py-3 border-b border-gray-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <div className="cursor-pointer" onClick={() => scrollTo('home')}>
          <img
            src="/src/assets/logo-3x1.png"
            alt="Celina & Eduardo Logo"
            className={`h-8 md:h-12 object-contain transition-all duration-500 ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-wedding-sage border-b-2 border-transparent hover:border-wedding-sage/30 pb-1 ${isScrolled ? 'text-wedding-green' : 'text-white drop-shadow-sm'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-colors duration-300 ${isScrolled ? 'text-wedding-green' : 'text-white'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4 animate-fade-in-down">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-sans text-left py-3 px-4 text-wedding-green uppercase tracking-wide hover:bg-gray-50 rounded-lg"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;