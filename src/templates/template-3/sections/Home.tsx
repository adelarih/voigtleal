
import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-center items-center text-center min-h-[600px] lg:min-h-[900px] lg:py-20 overflow-x-hidden">
      {/* Monogram Backdrop - Viewport Relative Scale */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <img
          src="/assets/logo-3x1.png"
          alt="Logo Backdrop"
          className="w-[200vw] lg:w-[450vw] max-w-none h-auto opacity-[0.2] lg:opacity-[0.3]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1] as any,
        }}
        className="relative mb-4 z-10"
      >
        <div className="relative z-10 flex items-center justify-center py-4">
          <div className="w-48 h-64 md:w-64 md:h-80 organic-shape overflow-hidden shadow-2xl bg-white relative">
            <img
              src="/assets/v-1.jpeg"
              alt="Casal"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-4"
      >
        <span className="text-emerald-800 font-semibold tracking-[0.4em] uppercase text-[8px] md:text-[9px] mb-1 block">Save the Date</span>
        <h1 className="text-3xl md:text-6xl font-serif text-emerald-950 mb-2">
          Celina <span className="italic text-emerald-800">&</span> Eduardo
        </h1>
        <p className="text-slate-500 max-w-xs md:max-w-sm mx-auto text-[11px] md:text-sm leading-relaxed font-light mb-6">
          A celebração do nosso amor em Porto Alegre.
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-6 border-t border-slate-100 pt-6">
          <div className="flex flex-col items-center">
            <span className="text-base md:text-xl font-serif text-emerald-900 leading-none">16.04.26</span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-slate-400 mt-1">Religioso</span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col items-center">
            <span className="text-base md:text-xl font-serif text-emerald-900 leading-none">18.04.26</span>
            <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-slate-400 mt-1">Celebração</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
