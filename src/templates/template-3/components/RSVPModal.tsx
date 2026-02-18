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
                        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-slate-300 hover:text-emerald-900 transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12">
                            {!isSubmitted ? (
                                <>
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-serif text-emerald-950 mb-1">Confirmar Presença</h3>
                                        <p className="text-slate-500 text-[11px] uppercase tracking-widest font-medium">Sua resposta é essencial para nós</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">Nome Completo</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Ex: Celina e Eduardo"
                                                className="w-full px-5 py-3 bg-slate-50 rounded-xl text-slate-800 font-medium focus:ring-1 focus:ring-emerald-800 outline-none border border-slate-100 placeholder:text-slate-300 transition-all text-sm"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">Eventos desejados</label>
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
                                                            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group
                                ${isSelected
                                                                    ? 'bg-emerald-50/50 border-emerald-100'
                                                                    : 'bg-white border-slate-100 opacity-50 hover:opacity-100'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                  ${isSelected ? 'bg-emerald-900 text-white' : 'bg-slate-50 text-slate-300'}`}>
                                                                    <Icon size={14} />
                                                                </div>
                                                                <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-950' : 'text-slate-400'}`}>
                                                                    {item.label}
                                                                </span>
                                                            </div>
                                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-emerald-800 border-emerald-800' : 'bg-white border-slate-200'}`}>
                                                                {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-emerald-950 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-emerald-900 transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                                                    Processando...
                                                </>
                                            ) : 'Confirmar Presença'}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-6 text-center"
                                >
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-6">
                                        <CheckCircle size={32} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-2xl font-serif text-emerald-950 mb-2">Presença Confirmada!</h4>
                                    <p className="text-slate-500 text-xs leading-relaxed max-w-[240px] mb-6">
                                        Obrigado, <span className="text-emerald-900 font-bold">{name.split(' ')[0]}</span>. Mal podemos esperar por este dia!
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-1.5">
                                        {Object.entries(selections).filter(([_, v]) => v).map(([k]) => (
                                            <span key={k} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[8px] uppercase tracking-widest font-bold rounded-lg border border-emerald-100">
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
