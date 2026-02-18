import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import HomeSlide from './components/HomeSlide';
import ReligiousSlide from './components/ReligiousSlide';
import PartySlide from './components/PartySlide';
import GiftListSlide from './components/GiftListSlide';
import GuestbookSlide from './components/GuestbookSlide';
import MomentsSlide from './components/MomentsSlide';
import { Slides } from './types';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const TOTAL_SLIDES = 6;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < TOTAL_SLIDES) {
      setCurrentSlide(index);
      setIsMobileMenuOpen(false);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-50">

      {/* Mobile Header - Visible only on mobile/tablet */}
      <div className="fixed top-0 left-0 w-full h-20 md:hidden flex items-center justify-between px-6 z-[100] bg-white/70 backdrop-blur-md border-b border-stone-100">
        <img
          src="/src/assets/logo-3x1.png"
          alt="Logo"
          className="h-10 w-auto object-contain"
        />
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-foliage-800 flex flex-col items-end gap-1.5"
        >
          <div className="w-6 h-0.5 bg-current"></div>
          <div className="w-6 h-0.5 bg-current text-foliage-600"></div>
          <div className="w-4 h-0.5 bg-current text-foliage-400"></div>
        </button>
      </div>

      {/* Slide Container - Uses transform for transition */}
      <div
        className="w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        <div className="w-full h-full relative overflow-hidden" id="slide-0">
          <HomeSlide />
        </div>
        <div className="w-full h-full relative overflow-hidden" id="slide-1">
          <ReligiousSlide />
        </div>
        <div className="w-full h-full relative overflow-hidden" id="slide-2">
          <PartySlide />
        </div>
        <div className="w-full h-full relative overflow-hidden" id="slide-3">
          <GiftListSlide />
        </div>
        <div className="w-full h-full relative overflow-hidden" id="slide-4">
          <GuestbookSlide />
        </div>
        <div className="w-full h-full relative overflow-hidden" id="slide-5">
          <MomentsSlide />
        </div>
      </div>

      {/* Global Elements */}

      {/* Desktop Logo - Hidden on Mobile */}
      <div className="hidden md:block fixed top-10 left-12 lg:left-20 z-[80] pointer-events-none transition-opacity duration-300">
        <img
          src="/src/assets/logo-3x1.png"
          alt="Celina & Eduardo Logo"
          className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-90"
        />
      </div>

      {/* Developer Attribution - Responsive Visibility */}
      <a
        href="https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-8 lg:right-12 z-[80] bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 items-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 group hidden sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-sans">Desenvolvido por</span>
        <span className="text-[11px] font-bold text-stone-800 tracking-[0.15em] font-sans transition-colors group-hover:text-[#78A083]">TOPSTACK</span>
      </a>

      {/* Vertical Navigation - Hidden on Mobile */}
      <div className="hidden md:block">
        <Navigation
          currentSlide={currentSlide}
          totalSlides={TOTAL_SLIDES}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          goToSlide={goToSlide}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[200] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute top-0 right-0 h-full w-[80%] bg-white p-10 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="font-serif text-2xl italic text-foliage-800">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-stone-400">
                  <X />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {['Home', 'Religioso', 'Festiva', 'Presentes', 'Recados', 'Momentos'].map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => goToSlide(idx)}
                    className={`text-left font-serif text-3xl transition-colors ${currentSlide === idx ? 'text-foliage-800 italic font-bold' : 'text-stone-400 hover:text-stone-800'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-auto items-center flex gap-4 text-stone-300">
                <div className="h-px flex-1 bg-current opacity-20" />
                <span className="font-script text-2xl opacity-60">C & E</span>
                <div className="h-px flex-1 bg-current opacity-20" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;