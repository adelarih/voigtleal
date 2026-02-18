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
        setSelections((prev) => ({ ...prev, [key]: !prev[key] }));
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
                        className="absolute inset-0 bg-[#4A5D4E]/30 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="relative w-full max-w-lg bg-white shadow-[0_50px_100px_rgba(0,0,0,0.15)] rounded-[2rem] overflow-hidden border border-[#F0F4F1]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-2 text-gray-300 hover:text-[#4A5D4E] transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-14">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-10 text-center">
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#4A5D4E]/40 mb-2 block">R.S.V.P</span>
                                        <h3 className="text-4xl font-serif text-[#4A5D4E] leading-tight">Confirmar Presença</h3>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-[#4A5D4E] uppercase tracking-widest opacity-30 ml-1">Seu Nome</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Como devemos chamar você?"
                                                className="w-full px-0 py-4 bg-transparent border-b border-gray-100 text-[#4A5D4E] font-serif text-xl focus:border-[#4A5D4E] outline-none transition-all placeholder:text-gray-200 placeholder:italic"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
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
                                                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer bg-white group
                              ${isSelected
                                                                ? 'border-[#4A5D4E] shadow-xl shadow-[#4A5D4E]/5'
                                                                : 'border-gray-50 opacity-40 hover:opacity-100'}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-[#4A5D4E] text-white shadow-lg' : 'bg-gray-50 text-gray-300'}`}>
                                                                <Icon size={18} />
                                                            </div>
                                                            <span className={`text-sm font-bold uppercase tracking-widest ${isSelected ? 'text-[#4A5D4E]' : 'text-gray-300'}`}>
                                                                {item.label}
                                                            </span>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#4A5D4E] border-[#4A5D4E]' : 'bg-white border-gray-100'}`}>
                                                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#4A5D4E] text-white py-6 rounded-2xl font-bold uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-[#344437] transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin text-white/40" />
                                                    PROCESSANDO...
                                                </>
                                            ) : (
                                                <>
                                                    CONFIRMAR AGORA
                                                    <CheckCircle size={16} className="text-white/40 group-hover:text-white transition-colors" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-10 text-center"
                                >
                                    <div className="w-24 h-24 bg-[#F0F4F1] rounded-full flex items-center justify-center text-[#4A5D4E] mb-8 shadow-inner ring-8 ring-[#F0F4F1]/50">
                                        <CheckCircle size={48} strokeWidth={1} />
                                    </div>
                                    <h4 className="text-5xl font-serif text-[#4A5D4E] mb-4">Confirmado!</h4>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-[280px] mb-8 font-light italic">
                                        É uma honra ter você conosco neste momento, <span className="text-[#4A5D4E] font-bold not-italic">{name.split(' ')[0]}</span>.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {Object.entries(selections).filter(([_, v]) => v).map(([k]) => (
                                            <span key={k} className="px-4 py-2 bg-[#4A5D4E] text-white text-[9px] uppercase tracking-widest font-bold rounded-full shadow-lg">
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
