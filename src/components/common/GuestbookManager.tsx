import React, { useEffect, useState } from 'react';
import { guestbookService, GuestMessage } from '../../services/guestbookService';
import { Check, X, Loader2, MessageSquare } from 'lucide-react';
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

    if (isLoading && messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>Carregando recados...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-full overflow-x-hidden font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Recados</h2>
                    <p className="text-gray-400 text-sm">Moderação das mensagens do mural.</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-center shrink-0">
                    <span className="text-xs text-[#5cc990] font-medium block mb-1">Pendentes</span>
                    <span className="text-2xl font-bold text-white leading-none">
                        {messages.filter(m => !m.aprovado).length}
                    </span>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl gap-1">
                {[
                    { id: 'all', label: 'Todos' },
                    { id: 'pending', label: 'Pendentes' },
                    { id: 'approved', label: 'Aprovados' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id as any)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${filter === tab.id
                                ? 'bg-white text-black shadow-sm'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredMessages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-black p-12 rounded-2xl border border-white/5 flex flex-col items-center text-center w-full"
                        >
                            <MessageSquare className="text-gray-700 mb-4" size={48} />
                            <h3 className="text-lg font-semibold text-white mb-1">Nenhum recado encontrado</h3>
                            <p className="text-gray-400 text-sm">Não há mensagens para exibir nesta categoria.</p>
                        </motion.div>
                    ) : (
                        filteredMessages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`p-5 rounded-2xl border transition-all w-full box-border ${!msg.aprovado
                                        ? 'bg-white/[0.04] border-[#5cc990]/40'
                                        : 'bg-white/[0.02] border-white/10'
                                    }`}
                            >
                                <div className="flex flex-col gap-5">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <span className="text-white font-bold text-lg">{msg.nome}</span>
                                            {!msg.aprovado && (
                                                <span className="text-[#5cc990] text-xs font-semibold px-2 py-0.5 rounded-full bg-[#5cc990]/10 border border-[#5cc990]/20">
                                                    Pendente
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-200 leading-relaxed mb-4 text-base italic">
                                            "{msg.recado}"
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span>{new Date(msg.created_at!).toLocaleDateString('pt-BR')}</span>
                                            <span>{new Date(msg.created_at!).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 shrink-0">
                                        {!msg.aprovado ? (
                                            <button
                                                onClick={() => handleModerate(msg.id!, true)}
                                                disabled={actionId === msg.id}
                                                className="flex-1 bg-white text-black py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                                            >
                                                {actionId === msg.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={16} />}
                                                Aprovar Recado
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleModerate(msg.id!, false)}
                                                disabled={actionId === msg.id}
                                                className="flex-1 bg-white/5 text-gray-400 hover:text-white py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {actionId === msg.id ? <Loader2 size={14} className="animate-spin" /> : <X size={16} />}
                                                Retirar do Mural
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                if (confirm('Deseja excluir permanentemente este recado?')) {
                                                    handleModerate(msg.id!, false, true);
                                                }
                                            }}
                                            disabled={actionId === msg.id}
                                            className="bg-red-500/10 text-red-500/60 hover:bg-red-500 hover:text-white p-2.5 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
                                            title="Excluir"
                                        >
                                            <X size={18} />
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
