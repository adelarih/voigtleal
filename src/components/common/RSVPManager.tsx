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
            <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Carregando confirmados...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-full overflow-x-hidden font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Confirmados</h2>
                    <p className="text-gray-400 text-sm">Lista de presença e confirmações de eventos.</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-center shrink-0">
                    <span className="text-xs text-[#5cc990] font-medium block mb-1">Total Geral</span>
                    <span className="text-2xl font-bold text-white leading-none">
                        {entries.length}
                    </span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#5cc990] transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Buscar por nome do convidado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-base placeholder:text-gray-500 focus:outline-none focus:border-[#5cc990]/50 focus:bg-white/[0.06] transition-all"
                />
            </div>

            <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                    {filteredEntries.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-black p-12 rounded-2xl border border-white/5 flex flex-col items-center text-center w-full"
                        >
                            <Users className="text-gray-700 mb-4" size={48} />
                            <h3 className="text-lg font-semibold text-white mb-1">Nenhum convidado encontrado</h3>
                            <p className="text-gray-400 text-sm">Ajuste sua busca ou aguarde novas confirmações.</p>
                        </motion.div>
                    ) : (
                        filteredEntries.map((entry) => (
                            <motion.div
                                key={entry.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white/[0.02] border border-white/10 hover:border-white/15 p-5 rounded-2xl transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-bold text-lg mb-1 truncate">{entry.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span>Confirmado em:</span>
                                            <span className="font-medium text-gray-400">{new Date(entry.created_at).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
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
        </div>
    );
};

const StatusBadge = ({ active, label }: { active: boolean, label: string }) => (
    <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-colors ${active
            ? 'bg-white text-black border-white shadow-sm'
            : 'bg-transparent border-white/10 text-gray-500'
        }`}>
        {active ? <Check size={14} strokeWidth={3} /> : <X size={14} />}
        {label}
    </div>
);

export default RSVPManager;
