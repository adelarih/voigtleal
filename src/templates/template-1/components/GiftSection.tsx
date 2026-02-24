import React, { useEffect } from 'react';
import { ArrowRight, Loader2, X, CreditCard, QrCode, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GIFTS } from '../constants';
import { GiftOption } from '../types';
import { giftService } from '../../../services/giftService';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

interface GiftCardProps {
  gift: GiftOption;
  index: number;
  onSelect: (gift: GiftOption) => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, index, onSelect }) => {
  const isEven = index % 2 === 0;
  const shapeClass = isEven
    ? 'rounded-tr-[3rem] rounded-bl-[3rem]'
    : 'rounded-tl-[3rem] rounded-br-[3rem]';
  const borderRotation = isEven ? '-rotate-2' : 'rotate-2';

  return (
    <div className="group relative h-full p-2">
      <div className={`absolute inset-0 border-2 border-wedding-green/30 bg-white/0 transition-transform duration-500 group-hover:scale-105 group-hover:bg-wedding-green/5 z-0 ${shapeClass} ${borderRotation}`}></div>
      <div className={`relative h-full bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 overflow-hidden flex flex-col z-10 ${shapeClass}`}>
        <div className="relative h-[28rem] overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
          <img src={gift.image} alt={gift.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out" />
        </div>
        <div className="p-8 flex flex-col items-center text-center flex-grow bg-white">
          <h3 className="font-serif text-2xl text-wedding-green mb-3 leading-tight">{gift.title}</h3>
          <div className="mt-auto w-full flex flex-col items-center">
            <p className="text-xl md:text-2xl font-serif text-wedding-sage/90 mb-8 font-light tracking-wide">
              {gift.isCustom ? 'Contribuição Livre' : formatCurrency(gift.price || 0)}
            </p>
            <button onClick={() => onSelect(gift)} className="w-full py-4 px-6 border border-wedding-green rounded-full text-wedding-green font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-wedding-green hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer">Presentear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HorizontalGiftCard: React.FC<GiftCardProps & { onSelect: (gift: GiftOption, customAmount?: string) => void }> = ({ gift, onSelect }) => {
  const [customValue, setCustomValue] = React.useState<string>('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customValue) return;
    onSelect(gift, customValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (!value) {
      setCustomValue('');
      return;
    }
    const numberValue = parseInt(value, 10) / 100;
    const formatted = numberValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setCustomValue(formatted);
  };

  return (
    <div className="group relative max-w-4xl mx-auto p-2 mt-20">
      <div className="absolute inset-0 border-2 border-wedding-green/30 bg-white/0 transition-transform duration-500 group-hover:scale-[1.02] group-hover:bg-wedding-green/5 z-0 rounded-tr-[5rem] rounded-bl-[5rem] -rotate-1"></div>
      <div className="relative bg-white shadow-xl overflow-hidden flex flex-col md:flex-row z-10 rounded-tr-[5rem] rounded-bl-[5rem]">
        <div className="md:w-[35%] aspect-[3/4] overflow-hidden relative">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-500 z-10"></div>
          <img src={gift.image} alt={gift.title} className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000 ease-in-out" />
        </div>
        <div className="md:w-[65%] p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white">
          <h3 className="font-serif text-3xl md:text-4xl text-wedding-green mb-4 leading-tight">{gift.title}</h3>
          <form onSubmit={handleCustomSubmit} className="w-full pt-2">
            <p className="font-serif text-lg text-wedding-sage mb-6 italic">Defina o valor do carinho</p>
            <div className="relative group/input max-w-xs mx-auto">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wedding-green font-serif text-xl pointer-events-none">R$</span>
              <input type="tel" value={customValue} onChange={handleInputChange} placeholder="0,00" className="w-full pl-12 pr-14 py-4 border-b-2 border-wedding-green/20 bg-gray-50/50 rounded-t-xl font-serif text-2xl text-wedding-green placeholder-wedding-green/30 focus:outline-none focus:border-wedding-green focus:bg-white transition-all text-center" />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-wedding-green hover:text-wedding-darkGreen hover:scale-110 transition-all z-10" aria-label="Confirmar valor"><ArrowRight className="w-6 h-6" /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PaymentModal: React.FC<{ gift: GiftOption; amount?: string; onClose: () => void }> = ({ gift, amount, onClose }) => {
  const handlePayment = (type: 'card' | 'pix') => {
    const link = type === 'card' ? gift.link_pagamento : gift.link_pix;
    let finalLink = link || '';

    if (finalLink && amount) {
      const rawValue = parseFloat(amount.replace(/\./g, '').replace(',', '.')).toFixed(2);
      finalLink = finalLink.includes('?') ? `${finalLink}&amount=${rawValue}` : `${finalLink}?amount=${rawValue}`;
    }

    window.open(finalLink, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-wedding-darkGreen/40 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12 text-center">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-wedding-sage hover:text-wedding-green transition-colors"><X size={24} /></button>

        <div className="mb-8">
          <div className="w-16 h-16 bg-wedding-lightGreen/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check className="text-wedding-green" size={32} />
          </div>
          <h3 className="font-serif text-3xl text-wedding-green mb-2">Ótima escolha!</h3>
          <p className="font-sans text-wedding-sage/80 italic">Como você prefere presentear?</p>
        </div>

        <div className="py-6 border-y border-wedding-green/10 mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-xl overflow-hidden mb-4 border border-wedding-green/10 shadow-sm">
            <img src={gift.image} alt={gift.title} className="w-full h-full object-cover" />
          </div>
          <h4 className="font-serif text-xl text-wedding-green">{gift.title}</h4>
          <p className="font-sans font-bold text-wedding-green text-sm uppercase tracking-widest mt-1">
            {amount ? `R$ ${amount}` : (gift.isCustom ? 'Contribuição Livre' : formatCurrency(gift.price || 0))}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => handlePayment('card')} className="flex flex-col items-center justify-center p-6 border-2 border-wedding-green/10 rounded-3xl hover:border-wedding-green hover:bg-wedding-green/5 transition-all group">
            <div className="w-12 h-12 bg-wedding-green/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-wedding-green/10 transition-colors">
              <CreditCard className="text-wedding-green" size={24} />
            </div>
            <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-wedding-green">Cartão de Crédito</span>
          </button>

          <button onClick={() => handlePayment('pix')} className="flex flex-col items-center justify-center p-6 border-2 border-wedding-green/10 rounded-3xl hover:border-wedding-green hover:bg-wedding-green/5 transition-all group">
            <div className="w-12 h-12 bg-wedding-green/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-wedding-green/10 transition-colors">
              <QrCode className="text-wedding-green" size={24} />
            </div>
            <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-wedding-green">Pix Instantâneo</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const GiftSection: React.FC = () => {
  const [dynamicGifts, setDynamicGifts] = React.useState<GiftOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedGift, setSelectedGift] = React.useState<GiftOption | null>(null);
  const [customAmount, setCustomAmount] = React.useState<string | undefined>();

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const data = await giftService.getAll();
        if (data && data.length > 0) {
          const mappedGifts: GiftOption[] = data.map(g => ({
            id: g.id,
            title: g.nome,
            price: g.valor,
            image: g.url_imagem || '/assets/logo-1x1.png',
            link: '', // Mantém vazio para evitar fallbacks indesejados entre Pix e Cartão
            link_pagamento: g.link_pagamento || '',
            link_pix: g.link_pix || '',
            description: g.descricao || '',
            isCustom: g.is_custom
          }));
          setDynamicGifts(mappedGifts);
        }
      } catch (error) {
        console.error('Error fetching dynamic gifts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGifts();
  }, []);

  const handleSelectGift = (gift: GiftOption, amount?: string) => {
    setSelectedGift(gift);
    setCustomAmount(amount);
  };

  const displayGifts = dynamicGifts;
  const customGift = displayGifts.find(g => g.isCustom);
  const regularGifts = displayGifts.filter(g => !g.isCustom);

  return (
    <section id="lista-presentes" className="py-24 md:py-32 bg-wedding-lightGreen/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-sage/5 rounded-bl-[10rem] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wedding-sage/5 rounded-tr-[15rem] -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-wedding-sage text-sm font-sans font-bold uppercase tracking-[0.3em] mb-4 block">Gestos de Carinho</span>
          <h2 className="font-serif text-5xl md:text-7xl text-wedding-green mb-8 relative inline-block">Lista de Presentes</h2>
          <p className="font-sans text-gray-600 text-lg leading-relaxed font-light">Sua presença é nosso maior presente. Caso deseje nos homenagear com algo a mais, selecionamos algumas experiências especiais para nossa nova jornada.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-wedding-sage" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
            {regularGifts.map((gift, index) => (
              <GiftCard
                key={gift.id || index}
                gift={gift}
                index={index}
                onSelect={handleSelectGift}
              />
            ))}
          </div>
        )}

        {customGift && !isLoading && (
          <HorizontalGiftCard
            gift={customGift}
            index={0}
            onSelect={handleSelectGift}
          />
        )}
      </div>

      <AnimatePresence>
        {selectedGift && (
          <PaymentModal
            gift={selectedGift}
            amount={customAmount}
            onClose={() => setSelectedGift(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GiftSection;
