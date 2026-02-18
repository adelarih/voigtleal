import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { GiftOption } from '../types';

const MOCK_GIFTS: GiftOption[] = [
  { id: 1, title: "Aula de culinária para o noivo aprender a cozinhar", price: 280.94, image: "/src/assets/presentes/presente-aula-culinaria.png" },
  { id: 2, title: "Coberto para a noiva que esta sempre comberta de razão", price: 526.08, image: "/src/assets/presentes/presente-cobertor-noiva.png" },
  { id: 3, title: "Cota bike para o noivo acompanhar a noiva nas corridas", price: 448.36, image: "/src/assets/presentes/presente-cota-bike.png" },
  { id: 4, title: "Cota de le creuset para noiva mobiliar a cozinha", price: 572.70, image: "/src/assets/presentes/presente-cota-le.png" },
  { id: 5, title: "Cota tenis de corrida para a noiva voar na sua primeira maratona", price: 396.56, image: "/src/assets/presentes/presente-cota-tenis.png" },
  { id: 6, title: "Garanta seu ingresso na renovação de votos", price: 1049.34, image: "/src/assets/presentes/presente-ingresso-renovacao.png" },
  { id: 7, title: "Se por acaso você se sentir tocado", price: 2624.31, image: "/src/assets/presentes/presente-se-por-acaso.png" },
  { id: 8, title: "Alvará para meter o louco na festa", price: 676.32, image: "/src/assets/presentes/presente-alvara-meter.png" },
  { id: 9, title: "Passe para furar a fila do bar", price: 914.64, image: "/src/assets/presentes/presente-passe-furar.png" },
];

const GiftListSlide: React.FC = () => {
  const [customValue, setCustomValue] = useState<string>('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numberValue = Number(value) / 100;
    setCustomValue(formatCurrency(numberValue));
  };

  return (
    <div className="h-full w-full bg-stone-50 flex flex-col items-center p-4 md:p-12 pt-24 md:pt-12 overflow-y-auto md:overflow-hidden no-scrollbar">

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl lg:h-full z-10 shrink-0">

        {/* Right: Custom Contribution Sidebar - Moves TO TOP on mobile (order-1) */}
        <div className="w-full lg:w-[400px] flex-none animate-fade-in-up order-1 lg:order-2 self-center" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-[40px] border border-stone-200 p-8 md:p-12 h-fit flex flex-col shadow-sm relative overflow-hidden">

            {/* Subtle arch decoration similar to the image */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-bl-full opacity-50" />

            <div className="mb-8 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-foliage-800" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-foliage-800 uppercase">Lista de Presentes</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight mb-6 italic">
                A lista dos sonhos de C&E.
              </h2>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                Preparamos cada item com carinho para refletir nossa personalidade e o futuro que estamos construindo. Escolha o seu gift card favorito.
              </p>
            </div>

            <div className="mt-auto space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-stone-400 uppercase block ml-1">
                  Valor da Contribuição
                </label>
                <div className="relative border-b-2 border-stone-100 focus-within:border-foliage-600 transition-colors py-2">
                  <input
                    type="text"
                    value={customValue}
                    onChange={handleCustomValueChange}
                    placeholder="R$ 0,00"
                    className="w-full bg-transparent text-2xl font-serif text-stone-800 placeholder-stone-300 outline-none"
                  />
                </div>
              </div>

              <button className="w-full bg-[#062c21] text-white py-5 rounded-full font-bold text-xs tracking-[0.25em] uppercase shadow-lg hover:bg-foliage-900 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                Contribuição Livre
              </button>

              <p className="text-[9px] text-stone-400 uppercase tracking-widest text-center italic">
                * Interaja com os cards para ver detalhes
              </p>
            </div>
          </div>
        </div>

        {/* Left: Gift Grid - Moves TO BOTTOM on mobile (order-2) */}
        <div className="flex-1 lg:overflow-y-auto no-scrollbar pb-12 lg:pb-0 px-2 order-2 lg:order-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {MOCK_GIFTS.map((gift) => (
              <div
                key={gift.id}
                className="group relative w-full aspect-square rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl active:shadow-lg active:scale-[0.98] transition-all duration-300 border border-stone-100"
              >
                {/* Background Image */}
                <img
                  src={gift.image}
                  alt={gift.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Subtle Gradient Overlay for Contrast */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

                {/* Info Card Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 space-y-3 z-10">
                  <div className="inline-block bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[9px] text-white font-bold uppercase tracking-[0.2em]">
                    C&E GIFT
                  </div>

                  <h3 className="text-[11px] md:text-sm font-medium text-white line-clamp-2 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {gift.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/20 shadow-lg">
                      <span className="text-xs md:text-base font-bold text-white uppercase tracking-tight">
                        {formatCurrency(gift.price || 0)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-white hover:text-foliage-100 transition-colors drop-shadow-lg bg-black/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Presentear</span>
                      <Heart size={10} className="fill-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GiftListSlide;