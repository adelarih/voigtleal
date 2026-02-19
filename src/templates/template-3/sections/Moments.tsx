
import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  { id: 1, url: '/assets/v-1.jpeg', className: 'w-full h-full object-cover', containerClass: 'col-span-4 row-span-2 rounded-[60px_20px_60px_20px]' },
  { id: 2, url: '/assets/v-2.jpeg', className: 'w-full h-full object-cover', containerClass: 'col-span-3 row-span-1 rounded-[20px_60px_20px_60px]' },
  { id: 3, url: '/assets/v-3.jpeg', className: 'w-full h-full object-cover', containerClass: 'col-span-3 row-span-1 rounded-full aspect-square' },
  { id: 4, url: '/assets/v-4.jpeg', className: 'w-full h-full object-cover', containerClass: 'col-span-2 row-span-2 rounded-[30px_70px_30px_70px]' },
  { id: 5, url: '/assets/h-2.jpeg', className: 'w-full h-full object-cover', containerClass: 'col-span-4 row-span-1 rounded-[100px_100px_20px_20px]' },
];

const Moments: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center py-6">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-emerald-800 font-bold tracking-[0.4em] uppercase text-[9px] mb-1 block">Galeria</span>
          <h2 className="text-3xl md:text-5xl font-serif text-emerald-950">Nossos Momentos</h2>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-slate-400 italic text-xs max-w-[200px]">Pequenos recortes da nossa jornada até aqui.</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-2 lg:grid-cols-10 lg:grid-rows-3 gap-3 lg:gap-4 max-h-none lg:max-h-[600px] overflow-y-auto lg:overflow-hidden pr-2 lg:pr-0 pb-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            className={`relative overflow-hidden shadow-xl border-4 border-white group 
              ${index === 0 ? 'col-span-2 lg:col-span-4 lg:row-span-2 rounded-[40px_10px_40px_10px] lg:rounded-[60px_20px_60px_20px]' : ''}
              ${index === 1 ? 'col-span-1 lg:col-span-3 lg:row-span-1 rounded-[10px_40px_10px_40px] lg:rounded-[20px_60px_20px_60px]' : ''}
              ${index === 2 ? 'col-span-1 lg:col-span-3 lg:row-span-1 rounded-full aspect-square' : ''}
              ${index === 3 ? 'col-span-1 lg:col-span-2 lg:row-span-2 rounded-[20px_40px_20px_40px] lg:rounded-[30px_70px_30px_70px]' : ''}
              ${index === 4 ? 'col-span-1 lg:col-span-4 lg:row-span-1 rounded-[40px_40px_10px_10px] lg:rounded-[100px_100px_20px_20px]' : ''}
            `}
          >
            <motion.img
              src={photo.url}
              alt={`Momento ${index + 1}`}
              className={`${photo.className} group-hover:scale-110 transition-transform duration-1000`}
            />
            <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
              <span className="text-white font-serif italic text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">Com amor</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4 justify-center md:justify-start">
        <div className="w-12 h-[1px] bg-slate-200"></div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold italic">Deslize para ver detalhes</span>
        <div className="w-12 h-[1px] bg-slate-200"></div>
      </div>
    </div>
  );
};

export default Moments;
