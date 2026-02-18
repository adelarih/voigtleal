import React from 'react';

const Footer: React.FC = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://celina-eduardo.com';
  
  // Constructing the TopStack URL with UTM parameters
  const topstackUrl = `https://topstack.com.br?utm_source=${encodeURIComponent(currentUrl)}&utm_medium=software_branding&utm_campaign=dev_by_topstack`;

  return (
    <footer className="w-full bg-stone-100 py-6 border-t border-stone-200 z-40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm font-sans font-light text-stone-500 gap-4">
        
        <div className="text-center md:text-left">
          <span className="uppercase tracking-widest text-foliage-800 font-medium">C&E</span>
          <span className="mx-2">|</span>
          <span>Celebrando o amor em 2026</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Desenvolvido por</span>
          <a 
            href={topstackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-stone-600 transition-colors duration-300 hover:text-teal-400 active:text-teal-400 uppercase tracking-wide"
          >
            TOPSTACK
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;