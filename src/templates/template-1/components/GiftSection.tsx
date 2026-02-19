import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GIFTS } from '../constants';
import { GiftOption } from '../types';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

interface GiftCardProps {
  gift: GiftOption;
  index: number;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, index }) => {
  // Alternating shape logic based on index (Evens get one shape, Odds get the reverse)
  const isEven = index % 2 === 0;

  // Shape classes mirroring the ceremony section
  const shapeClass = isEven
    ? 'rounded-tr-[3rem] rounded-bl-[3rem]'
    : 'rounded-tl-[3rem] rounded-br-[3rem]';

  // Border rotation mirroring the ceremony section
  const borderRotation = isEven ? '-rotate-2' : 'rotate-2';

  const handleFixedClick = () => {
    if (gift.link) {
      window.open(gift.link, '_blank');
    } else {
      alert(`Obrigado! Você escolheu o presente: ${gift.title}`);
    }
  };

  return (
    <div className="group relative h-full p-2">
      {/* Decorative Border (Behind) */}
      <div
        className={`absolute inset-0 border-2 border-wedding-green/30 bg-white/0 transition-transform duration-500 group-hover:scale-105 group-hover:bg-wedding-green/5 z-0 ${shapeClass} ${borderRotation}`}
      ></div>

      {/* Main Card Content */}
      <div className={`relative h-full bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 overflow-hidden flex flex-col z-10 ${shapeClass}`}>

        {/* Image Header */}
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
          <img
            src={gift.image}
            alt={gift.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
          />
        </div>

        {/* Content Body */}
        <div className="p-8 flex flex-col items-center text-center flex-grow bg-white">
          <h3 className="font-serif text-2xl text-wedding-green mb-3 leading-tight">
            {gift.title}
          </h3>

          <div className="mt-auto w-full flex flex-col items-center">
            <p className="text-xl md:text-2xl font-serif text-wedding-sage/90 mb-8 font-light tracking-wide">
              {formatCurrency(gift.price || 0)}
            </p>

            <button
              onClick={handleFixedClick}
              className="w-full py-4 px-6 border border-wedding-green rounded-full text-wedding-green font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-wedding-green hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              Presentear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HorizontalGiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  const [customValue, setCustomValue] = useState<string>('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customValue) return;

    const rawValue = parseFloat(
      customValue.replace(/\./g, '').replace(',', '.')
    ).toFixed(2);

    if (gift.link) {
      window.open(`${gift.link}?amount=${rawValue}`, '_blank');
    } else {
      alert(`Redirecionando para pagamento de R$ ${customValue}...`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (!value) {
      setCustomValue('');
      return;
    }
    const numberValue = parseInt(value, 10) / 100;
    const formatted = numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    setCustomValue(formatted);
  };

  return (
    <div className="group relative max-w-4xl mx-auto p-2 mt-20">
      {/* Decorative Border (Behind) */}
      <div
        className="absolute inset-0 border-2 border-wedding-green/30 bg-white/0 transition-transform duration-500 group-hover:scale-[1.02] group-hover:bg-wedding-green/5 z-0 rounded-tr-[5rem] rounded-bl-[5rem] -rotate-1"
      ></div>

      {/* Main Card Content */}
      <div className="relative bg-white shadow-xl overflow-hidden flex flex-col md:flex-row z-10 rounded-tr-[5rem] rounded-bl-[5rem]">
        {/* Image Side */}
        <div className="md:w-1/2 aspect-square overflow-hidden relative">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-500 z-10"></div>
          <img
            src={gift.image}
            alt={gift.title}
            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
          />
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white">
          <h3 className="font-serif text-3xl md:text-4xl text-wedding-green mb-4 leading-tight">
            {gift.title}
          </h3>

          <form onSubmit={handleCustomSubmit} className="w-full pt-2">
            <p className="font-serif text-lg text-wedding-sage mb-6 italic">Defina o valor do carinho</p>
            <div className="relative group/input max-w-xs mx-auto">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wedding-green font-serif text-xl pointer-events-none">R$</span>
              <input
                type="tel"
                value={customValue}
                onChange={handleInputChange}
                placeholder="0,00"
                className="w-full pl-12 pr-14 py-4 border-b-2 border-wedding-green/20 bg-gray-50/50 rounded-t-xl font-serif text-2xl text-wedding-green placeholder-wedding-green/30 focus:outline-none focus:border-wedding-green focus:bg-white transition-all text-center"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-wedding-green hover:text-wedding-darkGreen hover:scale-110 transition-all z-10"
                aria-label="Confirmar valor"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const GiftSection: React.FC = () => {
  const customGift = GIFTS.find(g => g.isCustom);
  const regularGifts = GIFTS.filter(g => !g.isCustom);

  return (
    <section id="lista-presentes" className="py-24 md:py-32 bg-wedding-lightGreen/20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-sage/5 rounded-bl-[10rem] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-sage/5 rounded-tr-[15rem] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-wedding-sage text-sm font-sans font-bold uppercase tracking-[0.3em] mb-4 block">
            Gestos de Carinho
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-wedding-green mb-8 relative inline-block">
            Lista de Presentes
          </h2>
          <p className="font-sans text-gray-600 text-lg leading-relaxed font-light">
            Sua presença é nosso maior presente. Caso deseje nos homenagear com algo a mais, selecionamos algumas experiências especiais para nossa nova jornada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
          {regularGifts.map((gift, index) => (
            <GiftCard key={gift.id} gift={gift} index={index} />
          ))}
        </div>

        {customGift && (
          <HorizontalGiftCard gift={customGift} index={0} />
        )}
      </div>
    </section>
  );
};

export default GiftSection;
