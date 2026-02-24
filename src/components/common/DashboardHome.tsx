import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Gift,
    Users,
    MessageSquare,
    TrendingUp,
    Calendar,
    Clock,
    ArrowRight
} from 'lucide-react';
import { giftService } from '../../services/giftService';
import { guestbookService } from '../../services/guestbookService';
import { rsvpService } from '../../services/rsvpService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DashboardHomeProps {
    onPanelChange: (panel: string) => void;
}

const DashboardHome = ({ onPanelChange }: DashboardHomeProps) => {
    const [stats, setStats] = useState({
        giftsCount: 0,
        pendingMessages: 0,
        confirmedGuests: 0,
        totalMessages: 0,
    });
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [recentRSVPs, setRecentRSVPs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [gifts, messages, rsvps] = await Promise.all([
                    giftService.getAll(),
                    guestbookService.getAllMessagesAdmin(),
                    rsvpService.getConfirmadosAdmin()
                ]);

                setStats({
                    giftsCount: gifts.length,
                    pendingMessages: messages.filter(m => !m.aprovado).length,
                    confirmedGuests: rsvps.length,
                    totalMessages: messages.length,
                });

                setRecentMessages(messages.slice(0, 5));
                setRecentRSVPs(rsvps.slice(0, 5));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5 }
        })
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 border-4 border-wedding-cream rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-wedding-green border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="font-serif text-wedding-green text-lg">Carregando painel...</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 md:p-12 max-w-7xl mx-auto space-y-8 sm:space-y-12 animate-fadeIn font-sans text-stone-900">
            {/* Boas-vindas */}
            <header className="border-b border-gray-100 pb-6 sm:pb-8">
                <h1 className="text-3xl sm:text-5xl font-serif text-wedding-green tracking-tight">Painel do Casamento</h1>
                <p className="text-gray-500 mt-2 sm:mt-3 text-lg sm:text-xl font-light">Tudo o que você precisa para gerenciar o grande dia de <span className="text-wedding-green font-medium">Celina & Eduardo</span>.</p>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { id: 'presents', label: 'Presentes na Lista', value: stats.giftsCount, icon: Gift, color: 'text-wedding-green', bg: 'bg-wedding-lightGreen' },
                    {
                        id: 'analytics',
                        label: 'Recados Recebidos',
                        value: stats.pendingMessages,
                        total: stats.totalMessages,
                        icon: MessageSquare,
                        color: stats.pendingMessages > 0 ? 'text-white' : 'text-wedding-green',
                        bg: stats.pendingMessages > 0 ? 'bg-wedding-sage' : 'bg-wedding-cream',
                        isAlert: stats.pendingMessages > 0
                    },
                    { id: 'rsvp', label: 'Total de Confirmados', value: stats.confirmedGuests, icon: Users, color: 'text-wedding-green', bg: 'bg-wedding-lightGreen/50' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        onClick={() => onPanelChange(stat.id)}
                        className={`p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border transition-all group cursor-pointer relative overflow-hidden ${stat.isAlert
                            ? 'bg-wedding-sage border-wedding-sage shadow-xl shadow-wedding-sage/20'
                            : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:shadow-wedding-green/5'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div className={`${stat.bg} ${stat.color} p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm`}>
                                <stat.icon size={22} className="sm:hidden" />
                                <stat.icon size={26} className="hidden sm:block" />
                            </div>
                            {stat.isAlert && (
                                <span className="bg-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                                    Aguardando Moderação
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className={`text-4xl sm:text-5xl font-serif mb-1 ${stat.isAlert ? 'text-white' : 'text-wedding-green'}`}>{stat.value}</span>
                                {stat.id === 'analytics' && stat.isAlert && (
                                    <span className="text-white/60 font-serif text-xl sm:text-2xl border-l border-white/20 pl-2">
                                        / {stat.total}
                                    </span>
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${stat.isAlert ? 'text-white/80' : 'text-gray-400'}`}>
                                {stat.isAlert ? 'Pendentes para Moderação' : stat.label}
                            </span>
                        </div>

                        {/* Subtle background decoration for alert state */}
                        {stat.isAlert && (
                            <div className="absolute -right-4 -bottom-4 opacity-10 text-white transform rotate-12">
                                <MessageSquare size={120} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* RSVP / Confirmações */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
                >
                    <div className="p-5 sm:p-8 border-b border-gray-50 flex items-center justify-between bg-wedding-cream/10">
                        <div className="flex items-center gap-3">
                            <Users className="text-wedding-green sm:hidden" size={20} />
                            <Users className="text-wedding-green hidden sm:block" size={24} />
                            <h3 className="text-lg sm:text-xl font-serif text-wedding-green">Últimas Confirmações</h3>
                        </div>
                        <button
                            onClick={() => onPanelChange('rsvp')}
                            className="text-[10px] font-bold text-wedding-green hover:text-wedding-sage uppercase tracking-widest flex items-center gap-1 group"
                        >
                            Ver todos <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="p-4">
                        {recentRSVPs.length > 0 ? (
                            <div className="space-y-2">
                                {recentRSVPs.map((rsvp, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-wedding-lightGreen flex items-center justify-center text-wedding-green font-bold shadow-inner text-sm sm:text-base">
                                                {rsvp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm tracking-tight">{rsvp.name}</p>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                                    {format(new Date(rsvp.created_at), "dd 'de' MMM, HH:mm", { locale: ptBR })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            {rsvp.cerimonia_religiosa && <span className="w-2 h-2 rounded-full bg-emerald-400" title="Religiosa"></span>}
                                            {rsvp.cerimonia_festiva && <span className="w-2 h-2 rounded-full bg-amber-400" title="Festiva"></span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-400 font-medium">Nenhuma confirmação ainda.</div>
                        )}
                    </div>
                </motion.div>

                {/* Recados / Guestbook */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
                >
                    <div className="p-5 sm:p-8 border-b border-gray-50 flex items-center justify-between bg-wedding-cream/10">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="text-wedding-sage sm:hidden" size={20} />
                            <MessageSquare className="text-wedding-sage hidden sm:block" size={24} />
                            <h3 className="text-lg sm:text-xl font-serif text-wedding-green">Painel de Recados</h3>
                        </div>
                        <button
                            onClick={() => onPanelChange('analytics')}
                            className="text-[10px] font-bold text-wedding-green hover:text-wedding-sage uppercase tracking-widest flex items-center gap-1 group"
                        >
                            Gerenciar <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="p-3 sm:p-4">
                        {recentMessages.length > 0 ? (
                            <div className="space-y-3 sm:space-y-4">
                                {recentMessages.map((msg, idx) => (
                                    <div key={idx} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-gray-100 hover:border-amber-100 hover:shadow-sm transition-all">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-bold text-gray-900 leading-none">{msg.nome}</span>
                                            {!msg.aprovado && (
                                                <span className="px-2 py-1 bg-amber-100 text-amber-600 text-[10px] font-black uppercase rounded-md tracking-tighter">
                                                    Pendente
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm italic line-clamp-2">"{msg.recado}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-gray-400 font-medium">Nenhum recado recebido.</div>
                        )}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default DashboardHome;
