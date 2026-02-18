import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Church, PartyPopper, GlassWater, Loader2 } from 'lucide-react';
import { rsvpService } from '../../../services/rsvpService';

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialEvent?: 'religious' | 'festive' | 'toast' | 'all';
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose, initialEvent = 'all' }) => {
    const [name, setName] = useState('');
    const [selections, setSelections] = useState({
        religious: true,
        festive: true,
        toast: true
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (initialEvent === 'religious') {
                setSelections({ religious: true, festive: false, toast: false });
            } else if (initialEvent === 'festive') {
                setSelections({ religious: false, festive: true, toast: false });
            } else if (initialEvent === 'toast') {
                setSelections({ religious: false, festive: false, toast: true });
            } else {
                setSelections({ religious: true, festive: true, toast: true });
            }
        }
    }, [isOpen, initialEvent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            await rsvpService.submitRSVP({
                name,
                cerimonia_religiosa: selections.religious,
                cerimonia_festiva: selections.festive,
                brinde_casa: selections.toast
            });

            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setIsSubmitting(false);
                setName('');
            }, 4000);
        } catch (error) {
            alert('Ocorreu um erro ao confirmar sua presença. Por favor, tente novamente.');
            setIsSubmitting(false);
        }
    };

    const toggleSelection = (key: keyof typeof selections) => {
        setSelections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9, rotate: 1 }}
                        className="relative w-full max-w-lg bg-white p-1 rounded-sm shadow-2xl overflow-hidden border border-stone-200"
                    >
                        {/* "Taped" effect at the top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-stone-200/40 -translate-y-4 rotate-1 z-10"></div>

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-stone-300 hover:text-wedding-green transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="bg-stone-50/50 p-8 md:p-12 border border-stone-100 m-1">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-8 text-center">
                                        <h3 className="text-3xl font-serif text-stone-800 mb-2 italic">Confirmar Presença</h3>
                                        <p className="font-handwriting text-stone-400 text-lg">Esperamos por você!</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1 text-center block">Seu Nome</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Ex: Celina e Eduardo"
                                                className="w-full px-4 py-3 bg-white rounded-none text-stone-800 font-sans focus:ring-1 focus:ring-wedding-green outline-none border border-stone-200 placeholder:text-stone-300 transition-all text-sm text-center"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1 text-center block">Presença em:</label>
                                            <div className="grid grid-cols-1 gap-2">
                                                {[
                                                    { id: 'religious', label: 'Cerimônia Religiosa', icon: Church },
                                                    { id: 'festive', label: 'Cerimônia & Festa', icon: PartyPopper },
                                                    { id: 'toast', label: 'Brinde em nossa casa', icon: GlassWater }
                                                ].map((item) => {
                                                    const Icon = item.icon;
                                                    const isSelected = selections[item.id as keyof typeof selections];
                                                    return (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => toggleSelection(item.id as keyof typeof selections)}
                                                            className={`flex items-center justify-between p-3 rounded-none border transition-all cursor-pointer bg-white group
                                ${isSelected
                                                                    ? 'border-wedding-green shadow-sm'
                                                                    : 'border-stone-100 opacity-60'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 flex items-center justify-center
                                  ${isSelected ? 'text-wedding-green' : 'text-stone-300'}`}>
                                                                    <Icon size={16} />
                                                                </div>
                                                                <span className={`text-xs font-serif italic ${isSelected ? 'text-stone-800' : 'text-stone-400'}`}>
                                                                    {item.label}
                                                                </span>
                                                            </div>
                                                            <div className={`w-4 h-4 rounded-none border flex items-center justify-center transition-all ${isSelected ? 'bg-wedding-green border-wedding-green' : 'bg-white border-stone-200'}`}>
                                                                {isSelected && <div className="w-1.5 h-1.5 bg-white shadow-sm" />}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-stone-800 text-white py-4 rounded-none font-serif italic text-lg hover:bg-wedding-green transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Salvando...
                                                </>
                                            ) : 'Confirmar'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-6 text-center"
                                >
                                    <div className="w-16 h-16 bg-wedding-green/5 flex items-center justify-center text-wedding-green mb-6 border border-wedding-green/20">
                                        <CheckCircle size={32} strokeWidth={1} />
                                    </div>
                                    <h4 className="text-3xl font-serif italic text-stone-800 mb-2">Confirmado!</h4>
                                    <p className="text-stone-500 font-handwriting text-xl leading-relaxed mb-6">
                                        Mal podemos esperar para celebrar <br /> com você, {name.split(' ')[0]}!
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {Object.entries(selections).filter(([_, v]) => v).map(([k]) => (
                                            <span key={k} className="px-3 py-1 bg-stone-100 text-stone-500 text-[9px] uppercase tracking-widest font-bold border border-stone-200">
                                                {k === 'religious' ? 'Religiosa' : k === 'festive' ? 'Festa' : 'Casa'}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default RSVPModal;
