import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

const PHOTOS = [
  {
    id: 1,
    url: "/assets/v-1.jpeg",
    alt: "Nossos momentos"
  },
  {
    id: 2,
    url: "/assets/v-2.jpeg",
    alt: "Felicidade compartilhada"
  },
  {
    id: 3,
    url: "/assets/v-3.jpeg",
    alt: "Cumplicidade"
  },
  {
    id: 4,
    url: "/assets/v-4.jpeg",
    alt: "Amor eterno"
  },
  {
    id: 5,
    url: "/assets/h-2.jpeg",
    alt: "Nossa jornada"
  }
];

const MomentsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % PHOTOS.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="momentos" className="py-24 md:py-32 bg-wedding-darkGreen text-wedding-cream relative overflow-hidden">
      {/* Background Texture/Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Column: Content & Mosaic Navigation */}
          <div className="w-full lg:w-5/12 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="flex items-center gap-2 text-wedding-sage uppercase tracking-[0.3em] text-sm font-bold">
                <Camera className="w-4 h-4" />
                Nossa História
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-white leading-none">
                Momentos <br /> <span className="italic text-wedding-sage">Inesquecíveis</span>
              </h2>
              <p className="font-sans text-white/70 text-lg leading-relaxed font-light">
                Cada foto guarda um sorriso, um olhar e a certeza de que nascemos um para o outro. Reviva conosco alguns dos instantes que nos trouxeram até aqui.
              </p>
            </div>

            {/* Mosaic / Thumbnails Grid */}
            <div
              className="grid grid-cols-5 gap-2 md:gap-4 mt-8"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {PHOTOS.map((photo, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={photo.id}
                    onClick={() => setActiveIndex(index)}
                    className={`relative w-full aspect-square group transition-all duration-300 ${isActive ? 'scale-110 z-10' : 'hover:scale-105 opacity-60 hover:opacity-100'
                      }`}
                    aria-label={`Ver foto ${index + 1}`}
                  >
                    <div className={`w-full h-full overflow-hidden transition-all duration-500 border-2 ${isActive ? 'border-wedding-sage shadow-[0_0_15px_rgba(132,169,140,0.5)]' : 'border-transparent'
                      } rounded-tr-[1.5rem] rounded-bl-[1.5rem]`}>
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="h-1 w-24 bg-wedding-sage/30 rounded-full mt-4 overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-wedding-sage transition-all duration-500 ease-out"
                style={{ width: `${((activeIndex + 1) / PHOTOS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Right Column: Main Display Image */}
          <div
            className="w-full lg:w-7/12 relative h-[500px] md:h-[600px] order-1 lg:order-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Decorative Border Layer */}
            <div className="absolute inset-4 border border-wedding-sage/30 rounded-tl-[6rem] rounded-br-[6rem] z-20 pointer-events-none transform translate-x-4 translate-y-4"></div>

            {/* Images Container */}
            <div className="relative w-full h-full rounded-tr-[6rem] rounded-bl-[6rem] overflow-hidden shadow-2xl bg-wedding-darkGreen">
              {PHOTOS.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${index === activeIndex
                    ? 'opacity-100 scale-100 blur-0'
                    : 'opacity-0 scale-110 blur-sm'
                    }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-serif italic text-2xl text-center md:text-right transform transition-transform duration-700 translate-y-0">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MomentsSection;
