
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId } from './types';
import Sidebar from './components/Sidebar';
import Home from './sections/Home';
import Religious from './sections/Religious';
import Festive from './sections/Festive';
import Moments from './sections/Moments';
import Gifts from './sections/Gifts';
import Messages from './sections/Messages';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Home);
  const [direction, setDirection] = useState(0);

  const sectionsOrder = [
    SectionId.Home,
    SectionId.Religious,
    SectionId.Festive,
    SectionId.Moments,
    SectionId.Gifts,
    SectionId.Messages
  ];

  const handleSectionChange = (newSection: SectionId) => {
    const currentIndex = sectionsOrder.indexOf(activeSection);
    const newIndex = sectionsOrder.indexOf(newSection);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveSection(newSection);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '20%' : '-20%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as any,
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '20%' : '-20%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
      }
    })
  };

  const renderSection = () => {
    switch (activeSection) {
      case SectionId.Home: return <Home />;
      case SectionId.Religious: return <Religious />;
      case SectionId.Festive: return <Festive />;
      case SectionId.Moments: return <Moments />;
      case SectionId.Gifts: return <Gifts />;
      case SectionId.Messages: return <Messages />;
      default: return <Home />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-white overflow-hidden text-slate-800">
      <Sidebar activeSection={activeSection} onNavigate={handleSectionChange} />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#fcfcfc] pb-20 lg:pb-0">
        {/* Main Content Area */}
        <div className="flex-1 relative overflow-y-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeSection}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full min-h-full flex flex-col items-center px-4 md:px-16"
            >
              <div className={`w-full flex-1 flex flex-col py-8 md:py-16 ${activeSection === SectionId.Messages ? 'justify-start' : 'justify-center'} ${(activeSection === SectionId.Home || activeSection === SectionId.Messages) ? 'max-w-none' : 'max-w-6xl'}`}>
                {renderSection()}

                {/* Mobile/Tablet Static Branding - Visible at the end of scroll */}
                <div className="mt-12 mb-8 flex flex-col items-center gap-2 lg:hidden">
                  <div className="w-8 h-px bg-slate-100 mb-2"></div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-slate-400 font-medium">Desenvolvido por</span>
                  <a
                    href="https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-sm border border-slate-50 active:scale-95 transition-all"
                  >
                    <span className="text-[10px] uppercase tracking-[0.15em] text-emerald-900 font-bold">TOPSTACK</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating TOPSTACK Branding - Desktop Only */}
      <a
        href="https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 hidden lg:flex items-center gap-3 px-6 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 hover:scale-105 hover:shadow-xl transition-all duration-300 group"
      >
        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-slate-400 font-medium">Desenvolvido por</span>
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-emerald-900 font-bold group-hover:text-emerald-700">TOPSTACK</span>
      </a>

      {/* Decorative foliage elements */}
      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none opacity-10 hidden lg:block z-0">
        <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-contain transform rotate-90 scale-x-[-1]" alt="" />
      </div>
    </div>
  );
};

export default App;
