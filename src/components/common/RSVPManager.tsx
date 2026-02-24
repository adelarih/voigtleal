import React, { useEffect, useState } from 'react';
import { rsvpService, RSVPEntry } from '../../services/rsvpService';
import { Loader2, Users, Check, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RSVPManager: React.FC = () => {
    const [entries, setEntries] = useState<RSVPEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            setIsLoading(true);
            const data = await rsvpService.getConfirmadosAdmin();
            setEntries(data);
        } catch (error) {
            console.error('Error loading RSVP entries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredEntries = entries.filter(entry =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading && entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 border-4 border-wedding-cream rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-wedding-green border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="font-serif text-wedding-green text-lg">Buscando confirmados...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 font-sans">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between border-b border-gray-100 pb-4 sm:pb-8 gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                    <h2 className="text-3xl sm:text-4xl font-serif text-wedding-green tracking-tight mb-1 sm:mb-2">Confirmados</h2>
                    <p className="text-sm sm:text-base text-gray-500 font-medium font-sans">Lista de presença e confirmações de eventos.</p>
                </div>
                <div className="bg-wedding-lightGreen/50 border border-wedding-green/10 px-4 py-2 sm:px-8 sm:py-4 rounded-[1.2rem] sm:rounded-[1.5rem] text-center shrink-0 shadow-sm w-full sm:w-auto">
                    <span className="text-[9px] sm:text-[10px] text-wedding-green font-black uppercase tracking-[0.2em] block mb-0.5">Total Geral</span>
                    <span className="text-3xl sm:text-4xl font-serif text-wedding-green leading-none">
                        {entries.length}
                    </span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-wedding-green transition-colors sm:hidden" size={18} />
                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-wedding-green transition-colors hidden sm:block" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por nome do convidado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border-2 border-gray-100 rounded-[1.2rem] sm:rounded-2xl py-3 sm:py-4 pl-12 sm:pl-16 pr-6 sm:pr-8 text-sm sm:text-lg placeholder:text-gray-400 focus:outline-none focus:border-wedding-green focus:ring-8 focus:ring-wedding-green/5 transition-all shadow-sm"
                />
            </div>

            <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                    {filteredEntries.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-wedding-cream/10 p-16 rounded-[2.5rem] border-2 border-dashed border-wedding-cream flex flex-col items-center text-center w-full"
                        >
                            <Users className="text-wedding-sage/40 mb-6" size={64} />
                            <h3 className="text-2xl font-serif text-wedding-green mb-2">Nenhum convidado encontrado</h3>
                            <p className="text-gray-500 text-sm max-w-xs font-light">Ajuste sua busca ou aguarde novas confirmações.</p>
                        </motion.div>
                    ) : (
                        filteredEntries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white border-2 border-gray-50 p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] transition-all hover:shadow-xl hover:shadow-wedding-green/5 hover:border-wedding-sage/30 group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-wedding-green font-serif text-xl sm:text-2xl mb-1 sm:mb-2 truncate">{entry.name}</h3>
                                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-stone-400 font-bold uppercase tracking-widest">
                                            <span>Confirmado em:</span>
                                            <span className="text-wedding-green-dark">{new Date(entry.created_at).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        <StatusBadge
                                            active={entry.cerimonia_religiosa}
                                            label="Religioso"
                                        />
                                        <StatusBadge
                                            active={entry.cerimonia_festiva}
                                            label="Festa"
                                        />
                                        <StatusBadge
                                            active={entry.brinde_casa}
                                            label="Brinde"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
};

const StatusBadge = ({ active, label }: { active: boolean, label: string }) => (
    <div className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl border text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] flex items-center gap-1.5 sm:gap-2 transition-all ${active
        ? 'bg-wedding-green text-white border-wedding-green shadow-lg shadow-wedding-green/20'
        : 'bg-stone-50 border-stone-100 text-stone-300'
        }`}>
        {active ? <Check size={12} strokeWidth={3} className="sm:hidden" /> : <X size={12} className="sm:hidden" />}
        {active ? <Check size={14} strokeWidth={3} className="hidden sm:block" /> : <X size={14} className="hidden sm:block" />}
        {label}
    </div>
);

export default RSVPManager;
