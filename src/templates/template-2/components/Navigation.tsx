import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentSlide,
  totalSlides,
  nextSlide,
  prevSlide,
  goToSlide
}) => {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      {/* Container for better visibility with glassmorphism effect */}
      <div className="flex flex-col items-center gap-4 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full py-6 px-3 border border-white/60 transition-all hover:bg-white/95">

        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`p-1.5 rounded-full transition-all duration-300 ${currentSlide === 0
              ? 'text-stone-300 cursor-not-allowed'
              : 'text-foliage-700 hover:bg-foliage-50 hover:text-foliage-900 hover:scale-110'
            }`}
          aria-label="Previous Slide"
        >
          <ChevronUp size={22} strokeWidth={2} />
        </button>

        <div className="flex flex-col gap-3 py-2 px-1">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full flex items-center justify-center relative ${currentSlide === idx
                  ? 'w-3 h-3 bg-foliage-800 scale-100'
                  : 'w-2 h-2 bg-stone-300 hover:bg-foliage-400 hover:scale-125'
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              {/* Active indicator ring for extra visibility */}
              {currentSlide === idx && (
                <span className="absolute -inset-1 rounded-full border border-foliage-300 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className={`p-1.5 rounded-full transition-all duration-300 ${currentSlide === totalSlides - 1
              ? 'text-stone-300 cursor-not-allowed'
              : 'text-foliage-700 hover:bg-foliage-50 hover:text-foliage-900 hover:scale-110'
            }`}
          aria-label="Next Slide"
        >
          <ChevronDown size={22} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
