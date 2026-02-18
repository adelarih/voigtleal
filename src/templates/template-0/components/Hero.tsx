
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/h-1.png"
          alt="Celina & Eduardo"
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl font-light tracking-[0.4em] mb-4 uppercase">Save the Date</h2>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif mb-6 leading-tight">
            Celina <span className="italic">&</span> Eduardo
          </h1>
          <div className="w-24 h-px bg-white/60 mx-auto mb-6" />
          <p className="text-lg sm:text-xl font-light tracking-widest uppercase">16 & 18 de Abril de 2026</p>
          <p className="text-sm mt-2 italic font-serif">Porto Alegre, RS</p>
        </div>
      </div>

    </section>
  );
};

export default Hero;
