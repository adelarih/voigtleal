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
                        className="absolute inset-0 bg-emerald-950/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden border border-emerald-50/20"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-2 text-gray-300 hover:text-emerald-900 transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 sm:p-14">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-10 text-center">
                                        <h3 className="text-4xl font-serif text-emerald-950 mb-3">Sua Presença</h3>
                                        <p className="text-slate-500 text-sm italic">Confirme para quais momentos podemos contar com você.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-900 ml-1">Seu Nome Completo</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Ex: Celina e Eduardo"
                                                className="w-full px-8 py-5 bg-slate-50 rounded-2xl text-emerald-950 font-medium focus:ring-2 focus:ring-emerald-900/5 outline-none border border-slate-100 placeholder:text-slate-300 transition-all text-lg"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
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
                                                        className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all cursor-pointer group select-none
                              ${isSelected
                                                                ? 'bg-emerald-50/50 border-emerald-200'
                                                                : 'bg-white border-slate-50 grayscale hover:grayscale-0 hover:border-slate-200'}`}
                                                    >
                                                        <div className="flex items-center gap-5">
                                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                                <Icon size={22} />
                                                            </div>
                                                            <div>
                                                                <h4 className={`font-serif text-lg leading-tight transition-colors ${isSelected ? 'text-emerald-950' : 'text-slate-400'}`}>
                                                                    {item.label}
                                                                </h4>
                                                                <span className={`text-[10px] uppercase tracking-widest font-bold ${isSelected ? 'text-emerald-700/60' : 'text-slate-300'}`}>
                                                                    {item.date}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                              ${isSelected ? 'bg-emerald-900 border-emerald-900' : 'bg-white border-slate-200'}`}>
                                                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-emerald-950 text-white py-5 rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-900 shadow-2xl shadow-emerald-950/20 transition-all active:scale-95 mt-4 flex items-center justify-center gap-2"
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
                                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-8">
                                        <CheckCircle size={48} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-4xl font-serif text-emerald-950 mb-4 text-center">Presença Confirmada!</h4>
                                    <p className="text-slate-500 text-center max-w-sm leading-relaxed mb-6">
                                        Obrigado, <span className="text-emerald-900 font-bold">{name.split(' ')[0]}</span>. Sua resposta foi salva com sucesso e mal podemos esperar para celebrar juntos!
                                    </p>
                                    <div className="flex gap-2">
                                        {Object.entries(selections).filter(([_, v]) => v).map(([k]) => (
                                            <span key={k} className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[9px] uppercase tracking-widest font-bold rounded-full border border-emerald-100">
                                                {k === 'religious' ? 'Religiosa' : k === 'festive' ? 'Festa' : 'Casa'}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-50/50 rounded-full -z-10 blur-3xl opacity-50" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-50/50 rounded-full -z-10 blur-3xl opacity-50" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default RSVPModal;
