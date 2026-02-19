import React, { useState, useEffect } from 'react';

const MOMENTS_IMAGES = [
  "/assets/v-1.jpeg",
  "/assets/v-2.jpeg",
  "/assets/v-3.jpeg",
  "/assets/v-4.jpeg",
  "/assets/h-2.jpeg"
];

const MomentsSlide: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % MOMENTS_IMAGES.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full bg-stone-50 flex flex-col relative overflow-hidden">

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-4 md:p-6">

        <div className="text-center mb-6 z-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-serif text-foliage-800 italic mb-2">Nossos Momentos</h2>
          <p className="font-sans text-stone-500 text-xs md:text-sm uppercase tracking-widest">Alguns registros da nossa história</p>
        </div>

        {/* Carousel Frame - Increased width and height */}
        <div className="w-full max-w-6xl h-[60vh] md:h-[70vh] relative rounded-t-[3rem] md:rounded-t-[10rem] rounded-b-2xl overflow-hidden shadow-2xl border-[8px] border-white">
          {MOMENTS_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={img}
                alt={`Momento ${index + 1}`}
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${index === currentImage ? 'scale-110' : 'scale-100'
                  }`}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent"></div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
            {MOMENTS_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImage
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
                  }`}
                aria-label={`Ver imagem ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MomentsSlide;
