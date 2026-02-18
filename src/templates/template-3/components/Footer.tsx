
import React from 'react';
import { SectionId } from '../types';

interface FooterProps {
  currentSection: SectionId;
}

const Footer: React.FC<FooterProps> = ({ currentSection }) => {

  return (
    <footer className="h-[60px] shrink-0 w-full border-t border-slate-100 hidden lg:flex items-center justify-between px-12 bg-white/50 backdrop-blur-sm z-10">
      <div className="flex items-center gap-2">
        <span className="text-emerald-900 font-serif font-bold text-sm tracking-tighter">Celina & Eduardo</span>
        <span className="w-1 h-1 bg-slate-200 rounded-full mx-2"></span>
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold">© 2026 Celebrando o Amor</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium">Desenvolvido por</span>
        <a
          href="https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] uppercase tracking-widest text-emerald-900 font-bold hover:text-emerald-400 transition-colors"
        >
          TOPSTACK
        </a>
      </div>
    </footer>
  );
};

export default Footer;
