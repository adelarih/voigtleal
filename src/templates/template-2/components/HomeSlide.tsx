import React from 'react';

const HomeSlide: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-white px-4">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-foliage-50 rounded-br-[100%] opacity-60 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-foliage-100 rounded-tl-[60%] opacity-40 z-0"></div>

      {/* Decorative foliage - Hidden on small mobile to avoid clutter */}
      <div className="absolute top-10 right-10 opacity-10 text-foliage-800 hidden md:block">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M12 22c4.97 0 9-4.03 9-9c0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" />
          <path d="M12 13a5 5 0 0 0 5 5" />
          <path d="M12 13a5 5 0 0 1-5 5" />
          <path d="M12 13V3" />
        </svg>
      </div>

      {/* Layout Section */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pt-20 md:pt-0">

        {/* Home Composition Container */}
        <div className="relative w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">

          {/* CONTENT SECTION - On mobile, this moves ABOVE the image */}
          <div className="relative z-20 text-center px-4 md:px-0 order-1 md:order-2 md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center pointer-events-none">
            <div className="mb-4 md:mb-8 text-foliage-800 tracking-[0.4em] md:tracking-[0.6em] text-xs md:text-sm lg:text-base font-sans uppercase drop-shadow-sm opacity-90">
              Save the Date
            </div>

            <h1 className="font-script text-5xl sm:text-7xl md:text-9xl lg:text-[13rem] text-stone-900 mb-4 md:mb-6 font-normal tracking-tight drop-shadow-2xl whitespace-nowrap leading-tight">
              Celina & Eduardo
            </h1>

            <div className="mt-4 md:mt-8 inline-block">
              <div className="border-t border-b border-stone-200 py-3 md:py-5 px-8 md:px-14">
                <p className="font-sans text-stone-700 text-base md:text-xl lg:text-2xl font-light tracking-[0.3em] md:tracking-[0.4em]">
                  16.04 — 18.04.2026
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE SECTION - On mobile, this is after the text */}
          <div className="relative w-full aspect-[4/5] md:aspect-video order-2 md:order-1 animate-float-slow px-2 md:px-0">
            {/* Background Layers */}
            <div className="absolute inset-[-10px] md:inset-[-20px] bg-foliage-100/20 rounded-[2rem] md:rounded-[3rem] blur-2xl md:blur-3xl opacity-50"></div>

            {/* The Image Frame */}
            <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[12px] border-white shadow-2xl overflow-hidden">
              <img
                src="/src/assets/h-1.png"
                alt="Couple Landscape"
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-stone-900/5"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30"></div>
            </div>

            {/* Decorative Borders */}
            <div className="absolute inset-[-4px] md:inset-[-8px] border-[1px] border-foliage-600/10 rounded-[2.1rem] md:rounded-[3rem] pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Minimalist Decorative Accents */}
      <div className="absolute -top-16 -right-16 w-64 h-64 text-foliage-800/10 opacity-40 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M12 2L12 22M2 12L22 12" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.01); }
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomeSlide;