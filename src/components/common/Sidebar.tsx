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
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplate, templates } from '../../context/TemplateContext';
import GuestbookManager from './GuestbookManager';
import RSVPManager from './RSVPManager';

// Verde Água / Seafoam Accent
const ACCENT_COLOR = '#5cc990';
const ACCENT_BG = 'rgba(92, 201, 144, 0.1)';
const ACCENT_BORDER = 'rgba(92, 201, 144, 0.3)';

interface SidebarProps {
    mode?: 'fixed' | 'overlay';
    onDeviceChange?: (mode: 'mobile' | 'tablet' | 'desktop') => void;
    currentDevice?: 'mobile' | 'tablet' | 'desktop';
}

const Sidebar = ({ mode = 'overlay', onDeviceChange, currentDevice }: SidebarProps) => {
    // State only needed for overlay mode hover interactions
    const [isHovered, setIsHovered] = useState(false);

    // Panel state logic
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const { activeTemplate, setActiveTemplate } = useTemplate();

    // Core expansion logic: Fixed mode implies expanded. Overlay relies on hover or an active panel.
    const isExpanded = mode === 'fixed' ? true : (isHovered || !!activePanel);

    const mainNav = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'templates', label: 'Templates', icon: LayoutGrid, hasPanel: true },
        { id: 'analytics', label: 'Recados', icon: MessageSquare, hasPanel: true },
        { id: 'rsvp', label: 'Confirmados', icon: Users, hasPanel: true },
    ];

    const bottomNav = [
        { id: 'settings', label: 'Configurações', icon: Settings },
        { id: 'help', label: 'Suporte', icon: HelpCircle },
    ];

    // Only attach mouse leave behavior in overlay mode
    const wrapperProps = mode === 'overlay' ? {
        onMouseLeave: () => {
            setIsHovered(false);
            setActivePanel(null);
        }
    } : {};

    return (
        <div
            className="fixed inset-y-0 left-0 z-[100] flex pointer-events-none"
            {...wrapperProps}
        >
            {/* 1. Main Narrow Vertical Sidebar (Stealth Mode) */}
            <motion.div
                // Only attach mouse enter behavior in overlay mode
                onMouseEnter={() => mode === 'overlay' && setIsHovered(true)}
                className="pointer-events-auto h-full flex flex-col items-center py-6 relative z-20"
                animate={{
                    width: isExpanded ? 240 : 80,
                    backgroundColor: isExpanded ? '#000000' : 'rgba(0, 0, 0, 0.98)',
                    boxShadow: isExpanded ? '4px 0 0 rgba(255,255,255,0.02)' : 'none',
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            >
                {/* Logo Area - Sempre Visível */}
                <div className="w-full px-4 mb-10 flex items-center overflow-hidden h-12">
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
                                <span className="text-xl font-bold text-white tracking-tight">Wedding Studio</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                            onMouseEnter={() => item.hasPanel ? setActivePanel(item.id) : null}
                            onClick={() => {
                                if (item.hasPanel) {
                                    setActivePanel(activePanel === item.id ? null : item.id);
                                }
                            }}
                            className={`w-full group flex items-center h-12 relative rounded-xl transition-all duration-200 ${(activePanel === item.id)
                                ? 'bg-white/5 text-white'
                                : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <div className="min-w-[56px] flex items-center justify-center">
                                <item.icon size={22} className={activePanel === item.id ? 'text-[#5cc990]' : ''} />
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="font-medium whitespace-nowrap ml-2"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* Active Indicator Pip */}
                            {item.id === 'templates' && activeTemplate && (
                                <div className="absolute left-0 w-1 h-6 bg-[#5cc990] rounded-r-full" />
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

                            <div className={`flex ${isExpanded ? 'gap-2' : 'flex-col gap-2'}`}>
                                {[
                                    { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                                    { id: 'tablet', icon: Tablet, label: 'Tablet' },
                                    { id: 'desktop', icon: Monitor, label: 'Desktop' }
                                ].map((device) => (
                                    <button
                                        key={device.id}
                                        onClick={() => onDeviceChange(device.id as any)}
                                        className={`flex items-center justify-center p-2 rounded-lg transition-all ${currentDevice === device.id
                                            ? 'bg-white text-black shadow-lg shadow-white/10'
                                            : 'text-gray-600 hover:text-white'
                                            } ${isExpanded ? 'flex-1' : 'w-full aspect-square'}`}
                                        title={device.label}
                                    >
                                        <device.icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {bottomNav.map((item) => (
                        <button
                            key={item.id}
                            className="w-full group flex items-center h-12 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                        >
                            <div className="min-w-[56px] flex items-center justify-center">
                                <item.icon size={20} />
                            </div>
                            {isExpanded && (
                                <span className="font-medium whitespace-nowrap ml-2">
                                    {item.label}
                                </span>
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Hotspot para Trigger (quando colapsado) */}
                {mode === 'overlay' && !isExpanded && (
                    <div className="absolute inset-y-0 left-0 w-4 h-full bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none" />
                )}
            </motion.div>

            {/* 2. Side Panel Flyout (Template Selector) */}
            <AnimatePresence>
                {activePanel === 'templates' && isExpanded && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        onMouseEnter={() => mode === 'overlay' && setIsHovered(true)}
                        className="pointer-events-auto h-screen w-80 bg-black text-white z-10 flex flex-col border-r border-white/10"
                    >
                        <div className="p-8 pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold tracking-tight text-[#5cc990]">Templates</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Selecione o estilo do convite para o seu evento.</p>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
                            {templates.map((tpl) => (
                                <button
                                    key={tpl.id}
                                    onClick={() => setActiveTemplate(tpl.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all group relative overflow-hidden ${activeTemplate === tpl.id
                                        ? 'bg-white/5 border-[#5cc990]/50'
                                        : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2 relative z-10">
                                        <div className="w-8 h-8 rounded-lg bg-[#5cc990] flex items-center justify-center text-xs font-bold text-black">
                                            {tpl.id.split('-')[1]?.toUpperCase() || 'T'}
                                        </div>
                                        {activeTemplate === tpl.id && (
                                            <div className="bg-[#5cc990] text-black p-1 rounded-full shadow-lg shadow-[#5cc990]/20">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                    <h4 className={`font-semibold text-base mb-1 relative z-10 ${activeTemplate === tpl.id ? 'text-white' : 'text-gray-200'}`}>
                                        {tpl.name}
                                    </h4>
                                    <p className="text-sm text-gray-400 line-clamp-2 relative z-10">
                                        {tpl.description}
                                    </p>
                                </button>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/10 bg-black">
                            <button className="w-full h-10 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-lg">
                                <ExternalLink size={14} />
                                Ver todos os templates
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. Panel Content (Dynamic Sub-menus) */}
            <AnimatePresence>
                <motion.div
                    initial={false}
                    animate={{
                        x: activePanel && activePanel !== 'templates' ? 0 : -20,
                        opacity: activePanel && activePanel !== 'templates' ? 1 : 0,
                        width: (activePanel === 'analytics' || activePanel === 'rsvp') ? (typeof window !== 'undefined' && window.innerWidth < 1200 ? 'calc(100vw - 80px)' : 600) : (activePanel && activePanel !== 'templates' ? 320 : 0),
                    }}
                    onMouseEnter={() => mode === 'overlay' && setIsHovered(true)}
                    className="pointer-events-auto h-full bg-black border-l border-white/10 overflow-y-auto overflow-x-hidden"
                >
                    {activePanel && activePanel !== 'templates' && (
                        <div className="w-full p-4 md:p-8">
                            {activePanel === 'analytics' ? (
                                <GuestbookManager />
                            ) : activePanel === 'rsvp' ? (
                                <RSVPManager />
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-white mb-4">
                                        {mainNav.find(n => n.id === activePanel)?.label || 'Painel'}
                                    </h2>
                                    <p className="text-gray-400">Conteúdo do painel em desenvolvimento.</p>
                                </>
                            )}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Sidebar;
