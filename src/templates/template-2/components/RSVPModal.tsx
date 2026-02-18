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
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-stone-300 hover:text-foliage-700 transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 sm:p-12">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-8 text-center">
                                        <h3 className="text-3xl font-serif text-stone-800 mb-2">Confirmar Presença</h3>
                                        <p className="text-stone-500 text-sm font-light">Será uma alegria celebrar com você!</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-foliage-700 ml-1">Seu Nome Completo</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Ex: Celina e Eduardo"
                                                className="w-full px-6 py-4 bg-stone-50 rounded-xl text-stone-800 font-sans focus:ring-2 focus:ring-foliage-700/5 outline-none border border-stone-100 placeholder:text-stone-300 transition-all font-light"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { id: 'religious', label: 'Cerimônia Religiosa', date: 'Quinta-feira, 19:00', icon: Church },
                                                { id: 'festive', label: 'Cerimônia & Festa', date: 'Sábado, 16:30', icon: PartyPopper },
                                                { id: 'toast', label: 'Brinde em nossa casa', date: 'Pós-Religioso', icon: GlassWater }
                                            ].map((item) => {
                                                const Icon = item.icon;
                                                const isSelected = selections[item.id as keyof typeof selections];
                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => toggleSelection(item.id as keyof typeof selections)}
                                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group select-none
                              ${isSelected
                                                                ? 'bg-foliage-50/50 border-foliage-200'
                                                                : 'bg-white border-stone-100 grayscale hover:grayscale-0 hover:border-stone-200'}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-foliage-700 text-white' : 'bg-stone-50 text-stone-300'}`}>
                                                                <Icon size={18} />
                                                            </div>
                                                            <div>
                                                                <h4 className={`font-serif text-base leading-tight transition-colors ${isSelected ? 'text-stone-800' : 'text-stone-300'}`}>
                                                                    {item.label}
                                                                </h4>
                                                                <span className={`text-[10px] uppercase tracking-wider font-sans ${isSelected ? 'text-foliage-600' : 'text-stone-200'}`}>
                                                                    {item.date}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all
                              ${isSelected ? 'bg-foliage-700 border-foliage-700' : 'bg-white border-stone-200'}`}>
                                                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-foliage-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-foliage-900 shadow-xl shadow-foliage-900/10 transition-all active:scale-95 mt-4 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : 'Confirmar'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-8"
                                >
                                    <div className="w-16 h-16 bg-foliage-50 rounded-full flex items-center justify-center text-foliage-600 mb-6">
                                        <CheckCircle size={32} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-3xl font-serif text-stone-800 mb-3 text-center">Tudo pronto!</h4>
                                    <p className="text-stone-500 text-center max-w-sm leading-relaxed mb-6 font-light">
                                        Sua presença está confirmada, <span className="text-foliage-800 font-medium">{name.split(' ')[0]}</span>. Mal podemos esperar!
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {Object.entries(selections).filter(([_, v]) => v).map(([k]) => (
                                            <span key={k} className="px-3 py-1 bg-foliage-50 text-foliage-700 text-[10px] uppercase tracking-wider font-medium rounded-full border border-foliage-100">
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
