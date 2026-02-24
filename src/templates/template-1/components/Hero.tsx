import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const scrollToCeremony = () => {
    const id = 'cerimonia-religiosa';
    if (pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/h-1.png"
          alt="Casamento Background"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-wedding-green/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wedding-cream/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
        <span className="block text-wedding-lightGreen tracking-[0.3em] text-sm md:text-lg uppercase mb-4 font-sans font-medium drop-shadow-md">
          Save The Date
        </span>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-2 drop-shadow-lg leading-tight">
          Celina
          <span className="block text-4xl md:text-6xl italic text-wedding-lightGreen my-2 font-light">&</span>
          Eduardo
        </h1>
        {/* Dates hidden as requested */}
      </div>

      {/* Decorative Organic Shapes */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-wedding-cream rounded-tr-[100px] z-20"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-wedding-cream rounded-tl-[150px] z-20 hidden md:block"></div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToCeremony}
        className="absolute bottom-10 z-30 animate-bounce text-wedding-green p-3 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition-all"
        aria-label="Rolar para baixo"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
