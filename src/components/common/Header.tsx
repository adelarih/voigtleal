import React, { useState } from 'react';
import { LayoutGrid, Check, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplate, templates } from '../../context/TemplateContext';

const TemplateSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { activeTemplate, setActiveTemplate } = useTemplate();

    return (
        <div className="relative">
            {/* Botão Flutuante */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-morphism shadow-premium hover:bg-white transition-all duration-300"
                style={{ color: 'var(--primary)', fontWeight: '600' }}
            >
                <LayoutGrid size={20} />
                <span className="hidden md:inline">Templates</span>
            </motion.button>

            {/* Overlay/Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[99]"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="fixed top-0 left-0 h-full w-[300px] bg-white shadow-2xl z-[100] p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-800">Selecione um Design</h2>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-4 flex-1">
                                {templates.map((tpl) => (
                                    <button
                                        key={tpl.id}
                                        onClick={() => {
                                            setActiveTemplate(tpl.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 group ${activeTemplate === tpl.id
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={`font-bold ${activeTemplate === tpl.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                                                    {tpl.name}
                                                </p>
                                                <p className="text-sm text-gray-400 mt-1">{tpl.description}</p>
                                            </div>
                                            {activeTemplate === tpl.id ? (
                                                <div className="bg-indigo-500 rounded-full p-1">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                            ) : (
                                                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-transform group-hover:translate-x-1" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100">
                                <p className="text-xs text-center text-gray-400">
                                    © 2024 Wedding Builder. Todos os templates são premium.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-[var(--header-height)] z-[90] flex items-center px-6 glass-morphism border-b border-gray-100/50">
            <div className="flex-1">
                <TemplateSelector />
            </div>

            <div className="flex-[2] flex justify-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Wedding<span className="text-gray-700">Studio</span>
                </h1>
            </div>

            <div className="flex-1 flex justify-end">
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                    Publicar
                </button>
            </div>
        </header>
    );
};

export default Header;
