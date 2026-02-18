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
                        className="absolute inset-0 bg-wedding-darkGreen/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full max-w-xl bg-white rounded-[1.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden border border-wedding-green/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-2 text-gray-300 hover:text-wedding-green transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 sm:p-14">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-10 text-center">
                                        <h3 className="text-4xl font-serif text-wedding-green mb-3">Sua Presença</h3>
                                        <p className="text-slate-500 text-sm italic">Confirme para quais momentos podemos contar com você.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-wedding-green ml-1">Seu Nome Completo</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Ex: Celina e Eduardo"
                                                className="w-full px-8 py-4 bg-slate-50 rounded-xl text-wedding-green font-medium focus:ring-2 focus:ring-wedding-green/5 outline-none border border-slate-100 placeholder:text-slate-300 transition-all"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { id: 'religious', label: 'Cerimônia Religiosa', date: '16.04 - 19:00', icon: Church },
                                                { id: 'festive', label: 'Cerimônia & Festa', date: '18.04 - 16:30', icon: PartyPopper },
                                                { id: 'toast', label: 'Brinde em nossa casa', date: 'Pós-Religioso', icon: GlassWater }
                                            ].map((item) => {
                                                const Icon = item.icon;
                                                const isSelected = selections[item.id as keyof typeof selections];
                                                return (
                                                    <div
                                                        key={item.id}
                                                        onClick={() => toggleSelection(item.id as keyof typeof selections)}
                                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group select-none
                              ${isSelected
                                                                ? 'bg-wedding-green/5 border-wedding-green/20'
                                                                : 'bg-white border-slate-50 grayscale hover:grayscale-0 hover:border-slate-100'}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-wedding-green text-white' : 'bg-slate-50 text-slate-300'}`}>
                                                                <Icon size={20} />
                                                            </div>
                                                            <div>
                                                                <h4 className={`font-serif text-base leading-tight transition-colors ${isSelected ? 'text-wedding-green' : 'text-slate-300'}`}>
                                                                    {item.label}
                                                                </h4>
                                                                <span className={`text-[9px] uppercase tracking-widest font-bold ${isSelected ? 'text-wedding-sage' : 'text-slate-200'}`}>
                                                                    {item.date}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                              ${isSelected ? 'bg-wedding-green border-wedding-green' : 'bg-white border-slate-100'}`}>
                                                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-wedding-green text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-wedding-darkGreen shadow-2xl shadow-wedding-green/20 transition-all active:scale-95 mt-2 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : 'Confirmar Agora'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-10"
                                >
                                    <div className="w-20 h-20 bg-wedding-green/5 rounded-full flex items-center justify-center text-wedding-green mb-6">
                                        <CheckCircle size={40} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-4xl font-serif text-wedding-green mb-4 text-center">Presença Confirmada!</h4>
                                    <p className="text-slate-500 text-center max-w-sm leading-relaxed mb-6">
                                        Obrigado, <span className="text-wedding-green font-bold">{name.split(' ')[0]}</span>. Sua resposta foi salva com sucesso e mal podemos esperar para celebrar juntos!
                                    </p>
                                    <div className="flex gap-2">
                                        {Object.entries(selections).filter(([_, v]) => v).map(([k]) => (
                                            <span key={k} className="px-3 py-1 bg-wedding-green/5 text-wedding-green text-[9px] uppercase tracking-widest font-bold rounded-full border border-wedding-green/10">
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
