
import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Church,
  PartyPopper,
  Camera,
  Gift,
  MessageSquareQuote,
  Menu
} from 'lucide-react';
import { SectionId } from '../types';

interface SidebarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: SectionId.Home, icon: Home, label: 'Home' },
    { id: SectionId.Religious, icon: Church, label: 'Religioso' },
    { id: SectionId.Festive, icon: PartyPopper, label: 'Festa' },
    { id: SectionId.Moments, icon: Camera, label: 'Momentos' },
    { id: SectionId.Gifts, icon: Gift, label: 'Presentes' },
    { id: SectionId.Messages, icon: MessageSquareQuote, label: 'Recados' },
  ];

  return (
    <nav className="h-20 lg:h-full w-full lg:w-24 bg-white/90 backdrop-blur-xl border-t lg:border-t-0 lg:border-r border-slate-100 flex flex-row lg:flex-col items-center justify-around lg:justify-start lg:py-8 fixed lg:relative bottom-0 left-0 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] lg:shadow-none">
      <div className="hidden lg:block mb-12 px-4">
        <img
          src="/src/assets/logo-3x1.png"
          alt="Logo"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="flex-1 flex flex-row lg:flex-col gap-2 md:gap-4 lg:gap-8 items-center lg:items-center w-full lg:w-auto px-4 lg:px-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group relative flex flex-col items-center flex-1 lg:flex-none py-2"
            >
              <div className={`p-2.5 md:p-3 rounded-2xl md:rounded-full transition-all duration-500 ${isActive
                ? 'bg-emerald-800 text-white shadow-lg lg:shadow-emerald-900/20'
                : 'text-slate-400 hover:text-emerald-800 hover:bg-emerald-50'
                }`}>
                <Icon size={18} className="md:w-[22px] md:h-[22px]" strokeWidth={isActive ? 2 : 1.5} />
              </div>

              <motion.span
                className={`text-[8px] md:text-[10px] mt-1 font-semibold uppercase tracking-widest transition-opacity duration-300 hidden md:block ${isActive ? 'text-emerald-900 opacity-100' : 'opacity-0 group-hover:opacity-100 text-slate-400'
                  }`}
              >
                {item.label}
              </motion.span>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 lg:bottom-auto lg:left-[-24px] w-8 lg:w-1 h-0.5 lg:h-8 bg-emerald-800 rounded-full lg:rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden lg:block mt-auto">
        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer hover:border-emerald-800 hover:text-emerald-800 transition-colors">
          <Menu size={16} />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;