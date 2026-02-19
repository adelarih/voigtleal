import React from 'react';

export const Footer: React.FC = () => {
  const utmLink = `https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack`;

  return (
    <footer className="bg-stone-900 text-stone-400 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10 relative">

        <div className="mb-8 flex flex-col items-center">
          <img
            src="/assets/logo-3x1.png"
            alt="Logo Celina & Eduardo"
            className="h-12 w-auto object-contain mb-4 brightness-0 invert"
          />
          <p className="font-sans text-xs tracking-[0.3em] uppercase">© 2026 - Celebrando o Amor</p>
        </div>

        <div className="w-16 h-px bg-stone-700 mx-auto mb-8"></div>

        <p className="text-sm font-sans">
          Desenvolvido por{' '}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-stone-300 transition-colors hover:text-[#5ff2ce]" // Using a generic 'teal-green' hex for 'Verde Água' hover effect
          >
            TOPSTACK
          </a>
        </p>
      </div>

      {/* Footer decorative noise/texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
    </footer>
  );
};
