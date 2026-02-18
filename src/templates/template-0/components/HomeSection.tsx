import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const IMAGES = [
  '/src/assets/v-3.jpeg',
  '/src/assets/v-4.jpeg',
  '/src/assets/v-2.jpeg',
  '/src/assets/v-1.jpeg',
  '/src/assets/h-2.jpeg',
];

const HomeSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    message: ''
  });

  // Carousel Logic
  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextImage, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [nextImage]);

  useEffect(() => {
    const religiousDate = new Date('2026-04-16T19:00:00');
    const religiousDateEnd = new Date('2026-04-16T21:00:00');
    const festiveDate = new Date('2026-04-18T16:30:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];

      const isReligiousDay = todayStr === '2026-04-16';
      const isFestiveDay = todayStr === '2026-04-18';

      // "É HOJE!" check
      if (isReligiousDay || isFestiveDay) {
        setTimeLeft(prev => ({ ...prev, isToday: true, message: 'É HOJE!' }));
        return;
      }

      // Determine Target Date
      let targetDate = religiousDate;
      if (now > religiousDateEnd) {
        targetDate = festiveDate;
      }

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isToday: false,
          message: ''
        });
      } else {
        // After both events
        if (now > festiveDate) {
          setTimeLeft(prev => ({ ...prev, isToday: true, message: 'OBRIGADO POR CELEBRAR CONOSCO!' }));
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-12 py-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 space-y-6">
          {/* Main Image with Organic Shape and Animation */}
          <div className="relative organic-shape w-full aspect-square bg-emerald-100 overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={IMAGES[currentIndex]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Selectors */}
          <div className="flex justify-center gap-3">
            {IMAGES.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentIndex === index
                    ? 'border-emerald-600 scale-110 shadow-lg'
                    : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${index}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 text-left space-y-6">
          <h3 className="text-4xl font-serif text-emerald-900">Bem-vindos ao nosso site!</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Estamos muito felizes em compartilhar este momento tão especial com vocês. Aqui vocês encontrarão todas as informações sobre a nossa celebração, localização e nossa lista de presentes.
          </p>

          <div className="h-32 flex items-center">
            {timeLeft.isToday ? (
              <div className="w-full animate-bounce">
                <span className="text-6xl sm:text-7xl font-serif text-emerald-800 tracking-tighter">
                  {timeLeft.message}
                </span>
              </div>
            ) : (
              <div className="flex gap-3 sm:gap-4 flex-wrap sm:flex-nowrap w-full">
                <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl flex-1 min-w-[80px] text-center shadow-sm border border-emerald-100">
                  <span className="block text-2xl sm:text-3xl font-serif text-emerald-800">{timeLeft.days}</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-tighter text-emerald-600">Dias</span>
                </div>
                <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl flex-1 min-w-[80px] text-center shadow-sm border border-emerald-100">
                  <span className="block text-2xl sm:text-3xl font-serif text-emerald-800">{timeLeft.hours}</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-tighter text-emerald-600">Horas</span>
                </div>
                <div className="bg-emerald-50 p-4 sm:p-6 rounded-2xl flex-1 min-w-[80px] text-center shadow-sm border border-emerald-100">
                  <span className="block text-2xl sm:text-3xl font-serif text-emerald-800">{timeLeft.minutes}</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-tighter text-emerald-600">Minutos</span>
                </div>
                <div className="bg-emerald-50/50 p-4 sm:p-6 rounded-2xl flex-1 min-w-[80px] text-center shadow-sm border border-emerald-100 hidden sm:block">
                  <span className="block text-2xl sm:text-3xl font-serif text-emerald-800/60">{timeLeft.seconds}</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-tighter text-emerald-600/60">Segundos</span>
                </div>
              </div>
            )}
          </div>

          <p className="text-emerald-700 italic font-medium">Contando cada segundo para vivermos esse sonho.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
