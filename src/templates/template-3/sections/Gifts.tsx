
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { GiftItem } from '../types';

const giftItems: GiftItem[] = [
  { id: 1, title: 'Alvará p/ meter o louco na festa', price: 676.32, description: 'Licença oficial para diversão ilimitada.', image: '/assets/presentes/presente-alvara-meter.png' },
  { id: 2, title: 'Aula de culinária p/ o noivo', price: 280.94, description: 'Para o noivo aprender a cozinhar.', image: '/assets/presentes/presente-aula-culinaria.png' },
  { id: 3, title: 'Coberto p/ a noiva (de razão)', price: 526.08, description: 'Pois ela está sempre coberta de razão.', image: '/assets/presentes/presente-cobertor-noiva.png' },
  { id: 4, title: 'Cota bike p/ o noivo', price: 448.36, description: 'Para acompanhar a noiva nas corridas.', image: '/assets/presentes/presente-cota-bike.png' },
  { id: 5, title: 'Cota de Le Creuset', price: 572.70, description: 'Cozinha mobiliada com elegância.', image: '/assets/presentes/presente-cota-le.png' },
  { id: 6, title: 'Cota Tênis de Corrida', price: 396.56, description: 'Para a noiva voar na primeira maratona.', image: '/assets/presentes/presente-cota-tenis.png' },
  { id: 7, title: 'Ingresso Renovação de Votos', price: 1049.34, description: 'Garantia de presença no bis desse amor.', image: '/assets/presentes/presente-ingresso-renovacao.png' },
  { id: 8, title: 'Se você se sentir tocado', price: 2624.31, description: 'Para o convidado mais generoso.', image: '/assets/presentes/presente-se-por-acaso.png' },
  { id: 9, title: 'Passe furar fila do bar', price: 914.64, description: 'O item mais valioso desta lista.', image: '/assets/presentes/presente-passe-furar.png' },
];

const Gifts: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden py-4 px-4 lg:px-0 lg:py-2">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-6 w-full max-w-7xl h-full items-center overflow-y-auto lg:overflow-hidden pr-2 lg:pr-0 pb-12 lg:pb-0">

        {/* Left Side: Cards Grid (8 Columns Space) */}
        <div className="lg:col-span-8 w-full h-auto lg:h-full relative flex items-center lg:px-0 px-2" style={{ perspective: '2000px' }}>
          <div className="relative w-full h-auto lg:h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4 py-4 lg:py-0">
            {giftItems.map((item, index) => {
              // Staggered layout calculation: middle column shifted down
              const isMiddleColumn = (index % 3) === 1;
              return (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    // Stagger and rotation ONLY on desktop (lg)
                    y: (window.innerWidth >= 1024 && isMiddleColumn) ? 30 : 0,
                    rotateY: window.innerWidth >= 1024 ? 15 : 0,
                    rotateX: window.innerWidth >= 1024 ? 1 : 0,
                    z: window.innerWidth >= 1024 ? index * -5 : 0
                  }}
                  whileHover={{
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1.05,
                    y: (window.innerWidth >= 1024 && isMiddleColumn) ? 10 : -10,
                    z: 300,
                    zIndex: 100,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-row w-full bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden cursor-pointer group origin-center"
                  style={{
                    aspectRatio: '1.7 / 1',
                    zIndex: 10 + index
                  }}
                >
                  {/* Info Container (Left) */}
                  <div className="flex-1 p-3 flex flex-col justify-between bg-white z-10">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-emerald-800/40 font-bold text-[7px] uppercase tracking-widest">C&E Gift</span>
                        <div className="h-[1px] flex-1 bg-emerald-50"></div>
                      </div>
                      <h4 className="text-[9px] md:text-[10px] font-serif font-bold text-emerald-950 leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[7px] text-slate-400 line-clamp-2 italic font-light leading-tight">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-1">
                      <div className="text-emerald-900 font-bold text-[10px] md:text-[12px] mb-1">
                        R$ {item.price.toLocaleString('pt-BR')}
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                        <span className="text-[7px] uppercase tracking-widest text-emerald-800 font-bold group-hover:underline">Presentear</span>
                        <Heart size={8} className="text-emerald-500 group-hover:fill-emerald-500 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Image Container (Right) */}
                  <div className="w-[38%] relative overflow-hidden bg-emerald-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Header (4 Columns Space) */}
        <div className="lg:col-span-4 flex flex-col justify-center text-left space-y-6 pl-2">
          <header className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-[2px] bg-emerald-800"></div>
              <span className="text-emerald-800 font-bold tracking-[0.3em] uppercase text-[9px]">
                Lista de Presentes
              </span>
            </motion.div>

            <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif text-emerald-950 leading-[0.9] tracking-tight">
              A lista <br className="hidden lg:block" />
              <span className="italic text-emerald-800 font-normal">dos sonhos</span> <br className="hidden lg:block" />
              de C&E.
            </h2>
          </header>

          <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed max-w-xs border-l-2 border-emerald-50 pl-4">
            Preparamos cada item com carinho para refletir nossa personalidade e o futuro que estamos construindo. Escolha o seu gift card favorito ao lado.
          </p>

          <div className="pt-2 flex flex-col gap-3">
            <button className="w-full lg:w-auto px-8 py-3 bg-emerald-950 text-white rounded-full font-bold uppercase tracking-[0.2em] text-[9px] hover:bg-emerald-800 transition-all active:scale-95 shadow-lg">
              Contribuição Livre
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Gifts;
