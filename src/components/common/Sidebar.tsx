import React, { useState } from 'react';
import {
    LayoutGrid,
    Check,
    ChevronRight,
    Settings,
    Image as ImageIcon,
    Type,
    Share2,
    ExternalLink,
    Home,
    MessageSquare,
    HelpCircle,
    Smartphone,
    Tablet,
    Monitor,
    Loader2,
    Users,
    Gift,
    Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplate } from '../../context/TemplateContext';

// Verde Água / Seafoam Accent
const ACCENT_COLOR = '#5cc990';
const ACCENT_BG = 'rgba(92, 201, 144, 0.1)';
const ACCENT_BORDER = 'rgba(92, 201, 144, 0.3)';

interface SidebarProps {
    mode?: 'fixed' | 'overlay';
    onDeviceChange?: (mode: 'mobile' | 'tablet' | 'desktop') => void;
    currentDevice?: 'mobile' | 'tablet' | 'desktop';
    onPanelChange?: (panel: string | null) => void;
    activePanel?: string | null;
    isMobileOpen?: boolean;
    onClose?: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const { mode = 'overlay', onDeviceChange, currentDevice, activePanel: parentActivePanel } = props;
    // Manual toggle state for sidebar expansion - Default to true (expanded)
    const [isManualExpanded, setIsManualExpanded] = useState(true);

    // Context or Prop priority for active panel
    const activePanel = parentActivePanel;
    const { activeTemplate, setActiveTemplate } = useTemplate();

    const setActivePanel = (panel: string | null) => {
        if (props.onPanelChange) {
            props.onPanelChange(panel);
        }
    };

    // Core expansion logic: Fixed mode implies always expanded. 
    const isExpanded = mode === 'fixed' ? true : isManualExpanded;

    const mainNav = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'templates_selector', label: 'Modelos de Convite', icon: LayoutGrid },
        { id: 'analytics', label: 'Recados', icon: MessageSquare },
        { id: 'rsvp', label: 'Confirmados', icon: Users },
        { id: 'presents', label: 'Lista de Presentes', icon: Gift },
        { id: 'review', label: 'Avaliar TOPSTACK', icon: Star, url: 'https://g.page/r/CRf3jU1WdlbpEBM/review' },
    ];

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {props.isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={props.onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden pointer-events-auto"
                    />
                )}
            </AnimatePresence>

            <div className="fixed inset-y-0 left-0 z-[100] flex pointer-events-none">
                {/* 1. Main Narrow Vertical Sidebar (Stealth Mode) */}
                <motion.div
                    className="pointer-events-auto h-full flex flex-col items-center py-6 relative z-20 shrink-0"
                    initial={false}
                    animate={{
                        width: isExpanded ? '270px' : '110px',
                        backgroundColor: isExpanded ? '#000000' : 'rgba(0, 0, 0, 0.98)',
                        boxShadow: isExpanded ? '4px 0 0 rgba(255,255,255,0.02)' : 'none',
                        x: (typeof window !== 'undefined' && window.innerWidth < 768)
                            ? (props.isMobileOpen ? 0 : -300)
                            : 0
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                >
                    {/* Expand/Collapse Toggle Button - Absolute Floating on the edge */}
                    {mode !== 'fixed' && (
                        <button
                            onClick={() => setIsManualExpanded(!isManualExpanded)}
                            className={`absolute -right-3 top-8 z-[110] w-6 h-6 rounded-full bg-wedding-green text-white shadow-xl border-2 border-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all pointer-events-auto`}
                            title={isExpanded ? "Recolher Menu" : "Expandir Menu"}
                        >
                            <ChevronRight size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                    )}

                    <div className="w-full px-4 mb-10 flex items-center justify-between overflow-hidden h-12">
                        <div className="flex items-center min-w-0">
                            <div className="min-w-[48px] h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform">
                                <img
                                    src="/favicon.ico"
                                    alt="Logo"
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="ml-4 whitespace-nowrap"
                                    >
                                        <span className="text-sm font-black text-white tracking-[0.3em] uppercase font-tech">TOPSTACK</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Primary Navigation Icons - Stealth */}
                    <motion.nav
                        className="flex-1 w-full px-3 space-y-2"
                        // Ensure opacity is 1 so icons are visible even when collapsed (isExpanded=false)
                        animate={{ opacity: 1 }}
                    >
                        {mainNav.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    if ('url' in item) {
                                        window.open((item as any).url, '_blank');
                                    } else {
                                        setActivePanel(item.id);
                                        if (props.onClose) props.onClose();
                                    }
                                }}
                                className={`w-full group flex items-center h-12 relative rounded-xl transition-all duration-200 ${(activePanel === item.id || (item.id === 'templates_selector' && activePanel === 'templates'))
                                    ? 'bg-white/5 text-white'
                                    : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                <div className={`${isExpanded ? 'min-w-[64px]' : 'w-full'} flex items-center justify-center transition-all duration-300`}>
                                    <item.icon size={24} className={(activePanel === item.id || (item.id === 'templates_selector' && activePanel === 'templates')) ? 'text-wedding-sage' : ''} />
                                </div>

                                <AnimatePresence>
                                    {isExpanded ? (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`font-sans text-[11px] uppercase tracking-[0.2em] font-bold whitespace-nowrap ml-2 ${(activePanel === item.id || (item.id === 'templates_selector' && activePanel === 'templates')) ? 'text-white' : 'text-gray-400 group-hover:text-wedding-sage'}`}
                                        >
                                            {item.label}
                                        </motion.span>
                                    ) : (
                                        <div className="absolute left-[90px] opacity-0 group-hover:opacity-100 group-hover:left-[110px] pointer-events-none transition-all duration-300 z-[150]">
                                            <div className="bg-wedding-green text-white px-4 py-2 rounded-xl border border-white/10 shadow-2xl shadow-black/50 whitespace-nowrap">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                                                {/* Tooltip Arrow */}
                                                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-wedding-green rotate-45 border-l border-b border-white/10" />
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>

                                {/* Active Indicator Pip */}
                                {(activePanel === item.id || (item.id === 'templates_selector' && activePanel === 'templates')) && (
                                    <div className="absolute left-0 w-1 h-6 bg-wedding-sage rounded-r-full shadow-[0_0_8px_rgba(163,177,138,0.5)]" />
                                )}
                            </button>
                        ))}
                    </motion.nav>

                    {/* Bottom Navigation - Stealth */}
                    <motion.div
                        className="w-full px-3 space-y-2 pt-6 mt-auto border-t border-white/5"
                        animate={{ opacity: 1 }}
                    >
                        {/* Device Selection Controls */}
                        {onDeviceChange && (
                            <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-white/5">
                                {/* Label only visible when expanded */}
                                {isExpanded && (
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-1">
                                        Visualização
                                    </span>
                                )}

                                <div className="flex flex-col gap-2">
                                    {[
                                        { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                                        { id: 'tablet', icon: Tablet, label: 'Tablet' },
                                        { id: 'desktop', icon: Monitor, label: 'Desktop' }
                                    ].map((device) => (
                                        <button
                                            key={device.id}
                                            onClick={() => onDeviceChange(device.id as any)}
                                            className={`flex items-center p-2.5 rounded-xl transition-all ${currentDevice === device.id
                                                ? 'bg-wedding-green text-white shadow-lg shadow-wedding-green/20'
                                                : 'text-gray-500 hover:text-wedding-sage hover:bg-white/5'
                                                } ${isExpanded ? 'w-full px-4' : 'justify-center w-full aspect-square'}`}
                                            title={device.label}
                                        >
                                            <device.icon size={20} className={isExpanded ? 'mr-3' : ''} />
                                            {isExpanded && (
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                                                    {device.label}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* User Profile Section */}
                        <div className={`mt-4 pt-4 border-t border-white/5 flex items-center ${isExpanded ? 'px-2' : 'justify-center'}`}>
                            <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden shrink-0 shadow-inner bg-white flex items-center justify-center p-1.5 ring-1 ring-white/10">
                                <img
                                    src="/assets/logo-1x1.png"
                                    alt="User Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            {isExpanded && (
                                <div className="ml-3 min-w-0">
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white truncate leading-none mb-1">
                                        Voigtleal
                                    </p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-wedding-sage/60 truncate leading-none">
                                        Administrador
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default Sidebar;
