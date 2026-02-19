import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CollageWrapper } from './CollageWrapper';

export const Hero: React.FC = () => {
  const [timeLeftReligioso, setTimeLeftReligioso] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timeLeftFesta, setTimeLeftFesta] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const dateReligioso = new Date('2026-04-16T19:00:00');
    const dateFesta = new Date('2026-04-18T16:30:00');

    const timer = setInterval(() => {
      const now = new Date();

      const calcDiff = (target: Date) => {
        const difference = target.getTime() - now.getTime();
        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      };

      setTimeLeftReligioso(calcDiff(dateReligioso));
      setTimeLeftFesta(calcDiff(dateFesta));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="md:min-h-screen flex flex-col items-center justify-center pt-20 pb-20 md:pb-32 overflow-hidden relative">

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-wedding-sage/20 rounded-full blur-xl animate-pulse delay-700" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-wedding-green/10 rounded-full blur-xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

        {/* Left Image/Element */}
        <div className="md:col-span-4 flex justify-center md:justify-end order-2 md:order-1">
          <CollageWrapper rotation="-rotate-3" className="w-64 md:w-80">
            <img
              src="/assets/v-1.jpeg"
              alt="Casal Foto 1"
              className="w-full h-[400px] object-cover hover:scale-105 transition-all duration-700"
            />
            <div className="text-center mt-2 font-handwriting text-stone-500 text-sm italic pb-2">
              Amor & Cumplicidade
            </div>
          </CollageWrapper>
        </div>

        {/* Center Logo Area */}
        <div className="md:col-span-4 text-center order-1 md:order-2 flex flex-col items-center">
          <CollageWrapper rotation="rotate-0" className="p-8 md:p-12 bg-paper-white min-w-[300px]" tape>
            <div className="flex flex-col items-center space-y-6">
              <img
                src="/assets/logo-3x1.png"
                alt="Logo Celina & Eduardo"
                className="w-[260px] h-auto object-contain"
              />
              <div className="w-16 h-0.5 bg-wedding-sage"></div>
              <div className="text-center">
                <p className="font-serif text-xl md:text-2xl text-stone-800 italic">
                  16 & 18 de Abril, 2026
                </p>
                <p className="font-sans text-xs text-stone-500 mt-2 uppercase tracking-widest">
                  Porto Alegre • RS
                </p>
              </div>
            </div>
          </CollageWrapper>
        </div>

        {/* Right Image/Element */}
        <div className="md:col-span-4 flex justify-center md:justify-start order-3">
          <CollageWrapper rotation="rotate-2" className="w-56 md:w-72 mt-8 md:mt-0">
            <img
              src="/assets/v-2.jpeg"
              alt="Casal Foto 2"
              className="w-full h-[300px] object-cover hover:scale-105 transition-all duration-700"
            />
            <div className="absolute -bottom-4 -right-4 bg-wedding-green text-white p-3 rounded-full text-xs font-bold shadow-lg rotate-12">
              Save the Date
            </div>
          </CollageWrapper>
        </div>

      </div>

      {/* Countdown Area - Lower part of Hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.8 }}
        className="md:absolute md:bottom-8 relative w-full flex justify-center items-center z-10 px-4 mt-44 md:mt-0"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white shadow-xl">

          {/* Religioso */}
          <div className="flex flex-col items-center">
            <h3 className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-4">Religioso</h3>
            <div className="flex items-center gap-3 md:gap-5">
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-wedding-green leading-none italic">{timeLeftReligioso.days}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Dias</span>
              </div>
              <span className="text-stone-300 mb-4 font-serif">:</span>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-wedding-green leading-none italic">{String(timeLeftReligioso.hours).padStart(2, '0')}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Hrs</span>
              </div>
              <span className="text-stone-300 mb-4 font-serif">:</span>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-stone-500/40 leading-none italic">{String(timeLeftReligioso.minutes).padStart(2, '0')}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Min</span>
              </div>
              <span className="text-stone-300 mb-4 font-serif">:</span>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-wedding-sage leading-none italic">{String(timeLeftReligioso.seconds).padStart(2, '0')}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Seg</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-wedding-sage/10"></div>

          {/* Festa */}
          <div className="flex flex-col items-center">
            <h3 className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-bold mb-4">Festa</h3>
            <div className="flex items-center gap-3 md:gap-5">
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-wedding-green leading-none italic">{timeLeftFesta.days}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Dias</span>
              </div>
              <span className="text-stone-300 mb-4 font-serif">:</span>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-wedding-green leading-none italic">{String(timeLeftFesta.hours).padStart(2, '0')}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Hrs</span>
              </div>
              <span className="text-stone-300 mb-4 font-serif">:</span>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-stone-500/40 leading-none italic">{String(timeLeftFesta.minutes).padStart(2, '0')}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Min</span>
              </div>
              <span className="text-stone-300 mb-4 font-serif">:</span>
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="font-serif text-3xl md:text-4xl text-wedding-sage leading-none italic">{String(timeLeftFesta.seconds).padStart(2, '0')}</span>
                <span className="font-sans text-[7px] uppercase tracking-[0.1em] text-stone-400 mt-2">Seg</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>

  );
};
