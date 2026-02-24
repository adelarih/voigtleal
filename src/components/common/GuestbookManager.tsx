import React, { useEffect, useState } from 'react';
import { guestbookService, GuestMessage } from '../../services/guestbookService';
import { Check, X, Loader2, MessageSquare, AlertCircle, Clock, Trash2, ShieldCheck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GuestbookManager: React.FC = () => {
    const [messages, setMessages] = useState<GuestMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            setIsLoading(true);
            const data = await guestbookService.getAllMessagesAdmin();
            setMessages(data);
        } catch (error) {
            console.error('Error loading admin messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModerate = async (id: string, approve: boolean, isDelete: boolean = false) => {
        setActionId(id);
        try {
            await guestbookService.moderateMessage(id, approve, isDelete);
            await loadMessages();
        } catch (error) {
            alert('Erro ao processar ação. Tente novamente.');
        } finally {
            setActionId(null);
        }
    };
    const filteredMessages = messages.filter(m => {
        if (filter === 'pending') return !m.aprovado;
        if (filter === 'approved') return m.aprovado;
        return true;
    });

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    if (isLoading && messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-gray-500 min-h-[400px]">
                <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 border-4 border-wedding-cream rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-wedding-green border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="font-serif text-2xl text-wedding-green tracking-tight">Preparando o mural...</p>
                <p className="text-sm text-wedding-sage mt-2 font-medium uppercase tracking-widest text-center">Organizando os votos de carinho para o casal</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 font-sans">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-serif text-wedding-green tracking-tight mb-2">Recados do Mural</h2>
                    <p className="text-gray-500 font-medium font-sans">Modere as mensagens enviadas pelos convidados.</p>
                </div>

                <div className="grid grid-cols-2 md:flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="bg-wedding-cream/30 border border-wedding-cream/50 px-3 py-2 sm:px-5 sm:py-3 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center gap-2 sm:gap-4 shadow-sm">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-wedding-sage flex items-center justify-center text-white shadow-lg shadow-wedding-sage/20 shrink-0">
                            <Clock size={16} className="sm:hidden" />
                            <Clock size={20} className="hidden sm:block" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[9px] sm:text-[10px] text-wedding-green font-black uppercase tracking-widest block leading-none mb-1 truncate">Pendentes</span>
                            <span className="text-xl sm:text-2xl font-serif text-wedding-green leading-none">
                                {messages.filter(m => !m.aprovado).length}
                            </span>
                        </div>
                    </div>

                    <div className="bg-wedding-lightGreen/50 border border-wedding-green/10 px-3 py-2 sm:px-5 sm:py-3 rounded-[1.2rem] sm:rounded-[1.5rem] flex items-center gap-2 sm:gap-4 shadow-sm">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-wedding-green flex items-center justify-center text-white shadow-lg shadow-wedding-green/20 shrink-0">
                            <ShieldCheck size={16} className="sm:hidden" />
                            <ShieldCheck size={20} className="hidden sm:block" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[9px] sm:text-[10px] text-wedding-green font-black uppercase tracking-widest block leading-none mb-1 truncate">Aprovados</span>
                            <span className="text-xl sm:text-2xl font-serif text-wedding-green leading-none">
                                {messages.filter(m => m.aprovado).length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-2xl gap-1.5 max-w-md">
                {[
                    { id: 'all', label: 'Todos' },
                    { id: 'pending', label: 'Pendentes' },
                    { id: 'approved', label: 'Aprovados' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id as any)}
                        className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${filter === tab.id
                            ? 'bg-wedding-green text-white shadow-xl shadow-wedding-green/20'
                            : 'text-gray-400 hover:text-wedding-green hover:bg-white/50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredMessages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gray-50 p-16 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center text-center w-full"
                        >
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-gray-300 mb-6">
                                <MessageSquare size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Puxa, nada por aqui ainda!</h3>
                            <p className="text-gray-500 max-w-xs mx-auto">Não encontramos recados nesta categoria. Que tal conferir as outras abas?</p>
                        </motion.div>
                    ) : (
                        filteredMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`group p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 transition-all duration-500 relative overflow-hidden ${!msg.aprovado
                                    ? 'bg-wedding-cream/10 border-wedding-cream hover:bg-wedding-cream/20 shadow-xl shadow-wedding-green/5'
                                    : 'bg-white border-gray-100 hover:border-wedding-sage/30 hover:shadow-2xl hover:shadow-wedding-green/5'
                                    }`}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6">
                                    {/* Avatar & Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-4 mb-4 sm:mb-6">
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-base sm:text-xl font-serif shrink-0 shadow-inner ${!msg.aprovado ? 'bg-wedding-cream text-wedding-green' : 'bg-wedding-lightGreen text-wedding-green'
                                                }`}>
                                                {getInitials(msg.nome)}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-xl sm:text-2xl font-serif text-wedding-green leading-none truncate mb-1 sm:mb-2">{msg.nome}</h3>
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                                                        <Clock size={12} /> {new Date(msg.created_at!).toLocaleDateString('pt-BR')} às {new Date(msg.created_at!).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                    {!msg.aprovado && (
                                                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-wedding-sage text-white rounded-full shadow-lg shadow-wedding-sage/20">
                                                            <Clock size={10} /> Pendente
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative pl-4 sm:pl-6 border-l-4 border-gray-100">
                                            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed italic pr-2 sm:pr-4">
                                                "{msg.recado}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 items-center justify-center w-full md:w-auto">
                                        {!msg.aprovado ? (
                                            <button
                                                onClick={() => handleModerate(msg.id!, true)}
                                                disabled={actionId === msg.id}
                                                className="w-full md:w-48 bg-wedding-green hover:bg-wedding-darkGreen text-white p-3.5 sm:p-4 rounded-2xl font-bold text-[10px] sm:text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-xl shadow-wedding-green/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                            >
                                                {actionId === msg.id ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} strokeWidth={3} />}
                                                Aprovar Recado
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleModerate(msg.id!, false)}
                                                disabled={actionId === msg.id}
                                                className="w-full md:w-48 bg-wedding-cream/30 hover:bg-wedding-cream text-wedding-green p-3.5 sm:p-4 rounded-2xl font-bold text-[10px] sm:text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 sm:gap-3 border border-wedding-cream hover:border-wedding-green/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                            >
                                                {actionId === msg.id ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                                                Retirar Mural
                                            </button>
                                        )}

                                        <button
                                            onClick={() => {
                                                if (confirm('Deseja excluir permanentemente este recado?')) {
                                                    handleModerate(msg.id!, false, true);
                                                }
                                            }}
                                            disabled={actionId === msg.id}
                                            className="w-full sm:w-14 h-12 sm:h-14 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all flex items-center justify-center border border-red-100 hover:border-red-500 disabled:opacity-50 group/del shadow-sm hover:shadow-xl hover:shadow-red-500/20"
                                            title="Excluir Permanentemente"
                                        >
                                            <Trash2 size={20} />
                                        </button>
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

export default GuestbookManager;
