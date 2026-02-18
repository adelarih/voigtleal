import React, { useState } from 'react';
import { Section } from '../types';
import { SECTIONS_DATA } from '../constants';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeLabel = SECTIONS_DATA.find(s => s.id === activeSection)?.label || 'Menu';

  const handleSectionClick = (section: Section) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex-shrink-0 flex items-center">
            <img src="/src/assets/logo-3x1.png" alt="Logo" className="h-10 sm:h-12 w-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {SECTIONS_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-200 ${activeSection === item.id
                  ? 'text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button - Premium Version */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-sm font-medium"
            >
              <span className="max-w-[100px] truncate">{activeLabel}</span>
              {isOpen ? <X size={16} /> : <ChevronDown size={16} className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-b border-emerald-100 py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {SECTIONS_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-medium transition-all ${activeSection === item.id
                  ? 'bg-emerald-900 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
