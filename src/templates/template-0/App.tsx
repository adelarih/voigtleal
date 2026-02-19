
import React, { useState } from 'react';
import { Section } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HomeSection from './components/HomeSection';
import ReligiousSection from './components/ReligiousSection';
import FestiveSection from './components/FestiveSection';
import GiftsSection from './components/GiftsSection';
import GuestbookSection from './components/GuestbookSection';
import { SECTIONS_DATA } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);

  const renderSection = () => {
    switch (activeSection) {
      case Section.Home:
        return <HomeSection />;
      case Section.Religious:
        return <ReligiousSection />;
      case Section.Festive:
        return <FestiveSection />;
      case Section.Gifts:
        return <GiftsSection />;
      case Section.Guestbook:
        return <GuestbookSection />;
      default:
        return <HomeSection />;
    }
  };

  const topstackUrl = "https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack";

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Hero stays at the top */}
      <Hero />

      {/* Main Content Container with Partial Overlap */}
      <main className="relative z-20 -mt-24 flex-grow px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Menu */}
          <Navigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Section Content Area */}
          <div className="glass-morphism rounded-b-[2rem] sm:rounded-b-[3.5rem] p-6 sm:p-12 lg:p-16 min-h-[60vh] shadow-2xl">
            {renderSection()}
          </div>
        </div>
      </main>

      {/* Footer styled as per the image */}
      <footer className="bg-[#1a2e1a] text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Column 1: Logo & Intro */}
            <div className="space-y-6">
              <div className="relative inline-block">
                <img src="/assets/logo-3x1.png" alt="Logo" className="h-20 md:h-24 w-auto object-contain brightness-0 invert opacity-90" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs font-light">
                Celebrando o amor e a união de Celina Bins Voigt e Eduardo Coelho Leal. Obrigado por fazer parte da nossa história.
              </p>
            </div>

            {/* Column 2: Navegação */}
            <div className="space-y-6">
              <h4 className="text-xl font-serif font-medium tracking-wide">Navegação</h4>
              <ul className="space-y-3">
                {SECTIONS_DATA.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm font-light"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Eventos */}
            <div className="space-y-6">
              <h4 className="text-xl font-serif font-medium tracking-wide">Eventos</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-1">Religioso</p>
                  <p className="text-gray-300 text-sm font-light">Paróquia Sagrado Coração</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-1">Recepção</p>
                  <p className="text-gray-300 text-sm font-light">Av. Belém Velho, 4139</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-1">Festiva</p>
                  <p className="text-gray-300 text-sm font-light">Veleiros do Sul</p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-400 tracking-wider">
            <p>© 2026 Casamento C&E. Todos os direitos reservados.</p>
            <p>
              Desenvolvido por{' '}
              <a
                href={topstackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#78A083] transition-colors duration-300 font-bold"
              >
                TOPSTACK
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
