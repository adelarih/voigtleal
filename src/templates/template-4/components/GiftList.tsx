import React, { useState } from 'react';
import { GIFT_LIST } from '../constants';
import { CollageWrapper } from './CollageWrapper';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const GiftList: React.FC = () => {
  const [customValue, setCustomValue] = useState<string>('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Helper to generate a slight random rotation class string deterministically based on index
  const getRotation = (index: number) => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
    return rotations[index % rotations.length];
  };

  const handleCustomGift = () => {
    if (!customValue) return;
    alert(`Você escolheu presentear com: R$ ${customValue}`);
  };

  return (
    <section id="presentes" className="py-24 bg-stone-100/50 scroll-mt-32 overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16 relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl text-stone-200/30 font-serif -z-10 whitespace-nowrap select-none">
            Lista de Presentes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-green mb-4 italic">Mimos & Afetos</h2>
          <p className="font-sans text-stone-600 max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-bold">
            Para nos ajudar a construir nosso novo lar, escolhemos algumas opções com muito carinho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {GIFT_LIST.map((gift, index) => (
            <CollageWrapper
              key={gift.id}
              rotation={getRotation(index)}
              className="h-full flex flex-col justify-between"
            >
              <div className="flex-grow flex flex-col items-center text-center p-2 pt-0">
                <div className="w-full aspect-square mb-6 overflow-hidden rounded-sm bg-white shadow-inner">
                  {gift.image ? (
                    <img
                      src={gift.image}
                      alt={gift.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-wedding-sage/30">
                      <ShoppingBag size={48} />
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg text-stone-800 mb-2 italic px-4 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                  {gift.title}
                </h3>
                <div className="w-12 border-b-2 border-wedding-sage/20 my-3"></div>
                <p className="font-sans font-bold text-2xl text-wedding-green mb-6">
                  {formatCurrency(gift.price)}
                </p>
              </div>
              <button
                className="w-full bg-wedding-darkGreen text-white py-4 px-6 rounded-none font-serif italic text-lg shadow-lg hover:bg-wedding-green transition-all"
                onClick={() => alert(`Você escolheu: ${gift.title}`)}
              >
                Presentear
              </button>
            </CollageWrapper>
          ))}
        </div>

        {/* Presente Livre - Centralized Below with Template 4 Pattern */}
        <div className="max-w-4xl mx-auto mt-20">
          <CollageWrapper noPadding rotation="rotate-0">
            <div className="flex flex-col md:flex-row items-stretch">
              {/* Left Image - 1x1 Ratio */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto overflow-hidden bg-stone-50">
                <img
                  src="/src/assets/presentes/presente-livre.png"
                  alt="Presente Livre"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Content */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white">
                <h3 className="font-serif text-3xl md:text-4xl text-wedding-green mb-2 italic">Presente Livre</h3>
                <p className="font-serif italic text-stone-400 text-lg mb-8">Defina o valor do carinho</p>

                <div className="relative w-full max-w-xs mb-8">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-wedding-green font-serif text-xl pl-4 py-2 border-r border-stone-100 pr-3">
                    R$
                  </div>
                  <input
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value.replace(/\D/g, ''))}
                    placeholder="0,00"
                    className="w-full bg-stone-50 border-b-2 border-stone-100 py-4 pl-16 pr-4 text-2xl font-serif text-stone-700 focus:outline-none focus:border-wedding-green transition-all placeholder-stone-200"
                  />
                </div>

                <button
                  onClick={handleCustomGift}
                  className="w-full bg-wedding-darkGreen text-white py-4 px-6 rounded-none font-serif italic text-lg shadow-lg hover:bg-wedding-green transition-all flex items-center justify-center gap-3"
                >
                  <ArrowRight size={24} />
                  Presentear
                </button>
              </div>
            </div>
          </CollageWrapper>
        </div>
      </div>
    </section>
  );
};