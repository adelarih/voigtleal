import React, { useState, useEffect, useRef } from 'react';
import { contentService, CeremonyText } from '../../services/contentService';
import {
    Loader2,
    Type,
    Save,
    AlertCircle,
    CheckCircle2,
    Bold,
    Italic,
    Underline,
    Lock,
    Unlock,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContentManager: React.FC = () => {
    const [texts, setTexts] = useState<CeremonyText[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState<string | null>(null);
    const [isLocked, setIsLocked] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadTexts();
    }, []);

    const loadTexts = async () => {
        try {
            setIsLoading(true);
            const data = await contentService.getAll();
            setTexts(data);
            if (data.length > 0) {
                setActiveTab(data[0].id);
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Erro ao carregar os conteúdos.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!activeTab || !editorRef.current) return;

        try {
            const id = activeTab;
            const content = editorRef.current.innerHTML;
            setIsSaving(id);
            await contentService.update(id, content);

            // Update local state
            setTexts(prev => prev.map(t => t.id === id ? { ...t, conteudo: content } : t));

            setMessage({ type: 'success', text: 'Conteúdo salvo com sucesso!' });
            setIsLocked(true);
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Erro ao salvar as alterações.' });
        } finally {
            setIsSaving(null);
        }
    };

    const execCommand = (command: string, value: string = '') => {
        if (isLocked) return;
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const activeText = texts.find(t => t.id === activeTab);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white">
                <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 border-4 border-gray-50 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-wedding-green border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="font-serif text-wedding-green text-xl animate-pulse">Preparando seu atelier...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white font-sans overflow-hidden">
            {/* Superior Header / Toolbar */}
            <div className="flex-none bg-white border-b border-gray-100 flex flex-col lg:flex-row items-center justify-between z-10 shadow-sm px-4 py-4 md:px-8 md:py-6 gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl md:text-2xl font-serif text-wedding-green tracking-tight leading-none">Editor de Cerimônias</h2>
                            <Sparkles size={16} className="text-wedding-sage hidden md:block" />
                        </div>
                        <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Configurações de Texto Premium</p>
                    </div>

                    <div className="h-10 w-[1px] bg-gray-100 hidden lg:block" />

                    {/* Tabs - Responsive and Prominent */}
                    <div className="flex bg-gray-50 p-1.5 rounded-[1.2rem] border border-gray-100 w-full md:w-auto overflow-hidden">
                        {texts.map((text) => (
                            <button
                                key={text.id}
                                onClick={() => {
                                    setActiveTab(text.id);
                                    setIsLocked(true);
                                }}
                                className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 min-w-[100px] ${activeTab === text.id
                                    ? 'bg-wedding-green text-white shadow-lg shadow-wedding-green/20 scale-[1.02]'
                                    : 'text-gray-400 hover:text-wedding-green hover:bg-white'
                                    }`}
                            >
                                {text.cerimonia}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center lg:justify-end gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`px-4 py-2 rounded-xl flex items-center gap-2 border text-[10px] font-bold uppercase tracking-wider ${message.type === 'success'
                                    ? 'bg-green-50 border-green-100 text-green-700'
                                    : 'bg-red-50 border-red-100 text-red-700'
                                    }`}
                            >
                                {message.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                {message.text}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isLocked ? (
                        <button
                            onClick={() => {
                                setIsLocked(false);
                                // Forçar o navegador a usar <p> em vez de <div> para quebras de linha
                                setTimeout(() => {
                                    document.execCommand('defaultParagraphSeparator', false, 'p');
                                }, 10);
                            }}
                            className="h-12 w-full md:w-auto px-8 bg-gray-900 hover:bg-black text-white rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold"
                        >
                            <Unlock size={14} /> Habilitar Edição
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <button
                                onClick={() => setIsLocked(true)}
                                className="h-12 px-4 text-gray-400 hover:text-gray-600 font-bold uppercase tracking-widest text-[10px]"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleUpdate}
                                disabled={!!isSaving}
                                className="h-12 flex-1 md:flex-none px-8 bg-wedding-green hover:bg-wedding-darkGreen text-white rounded-2xl transition-all shadow-lg shadow-wedding-green/20 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                Salvar
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Toolbar (Conditional) */}
            <div className={`flex-none bg-gray-50/50 border-b border-gray-100 px-8 py-2 overflow-x-auto hide-scrollbar flex items-center gap-1 transition-all duration-500 ${isLocked ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
                <div className="flex items-center gap-1 mr-4">
                    <button onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }} className="p-2.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-95" title="Negrito"><Bold size={18} /></button>
                    <button onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }} className="p-2.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-95" title="Itálico"><Italic size={18} /></button>
                    <button onMouseDown={(e) => { e.preventDefault(); execCommand('underline'); }} className="p-2.5 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-95" title="Sublinhado"><Underline size={18} /></button>
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 relative overflow-hidden bg-gray-50/20">
                <div className="absolute inset-0 overflow-y-auto p-12 md:p-20 flex flex-col items-center">
                    <div className="w-full max-w-4xl min-h-full flex flex-col">
                        <div className="mb-10 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-3xl bg-wedding-lightGreen flex items-center justify-center text-wedding-green shadow-sm ring-4 ring-wedding-lightGreen/20">
                                <Type size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-serif text-wedding-green capitalize flex items-center gap-3">
                                    Cerimônia {activeText?.cerimonia}
                                    <ChevronRight className="text-gray-300" size={20} />
                                </h3>
                                <p className="text-[11px] text-wedding-sage font-black uppercase tracking-[0.3em] mt-1">
                                    {activeText?.cerimonia === 'religiosa' ? 'Momentos de Fé e Amor' : 'Celebração com Amigos'}
                                </p>
                            </div>
                        </div>

                        {/* Editable Canvas */}
                        <div className="flex-1 flex flex-col">
                            <div className={`relative flex-1 group transition-all duration-500 rounded-[3rem] ${isLocked ? '' : 'ring-1 ring-wedding-green/10'}`}>
                                {!isLocked && (
                                    <div className="absolute -top-3 -right-3 bg-wedding-green text-white p-2 rounded-full shadow-lg animate-bounce z-20">
                                        <Sparkles size={16} />
                                    </div>
                                )}

                                <div
                                    ref={editorRef}
                                    contentEditable={!isLocked}
                                    dangerouslySetInnerHTML={{ __html: activeText?.conteudo || '' }}
                                    onPaste={handlePaste}
                                    className={`w-full min-h-[500px] h-full bg-white p-12 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 outline-none text-xl md:text-2xl text-gray-700 leading-relaxed font-sans transition-all selection:bg-wedding-green selection:text-white ${isLocked ? 'cursor-not-allowed text-gray-400 select-none' : 'focus:shadow-[0_40px_80px_rgba(0,0,0,0.06)] focus:border-wedding-green/20'}`}
                                    placeholder="Comece a escrever a história deste momento..."
                                />

                                {isLocked && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px] rounded-[3rem] cursor-pointer group-hover:bg-white/20 transition-all"
                                        onClick={() => setIsLocked(false)}
                                    >
                                        <div className="flex flex-col items-center gap-3 bg-white px-8 py-5 rounded-2xl shadow-2xl border border-gray-100 transform group-hover:scale-105 transition-transform">
                                            <Lock className="text-gray-300" size={24} />
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Clique para Destravar</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="h-20 flex-none" /> {/* Spacer at bottom */}
                    </div>
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                [contenteditable][placeholder]:empty:before {
                    content: attr(placeholder);
                    color: #cbd5e1;
                    cursor: text;
                }
                
                /* Rich Text Styles inside editor */
                #editor-root b, #editor-root strong { font-weight: 700; color: #1a1a1a; }
                #editor-root i, #editor-root em { font-style: italic; }
                #editor-root ul { list-style-type: disc; padding-left: 2rem; margin: 1rem 0; }
                #editor-root ol { list-style-type: decimal; padding-left: 2rem; margin: 1rem 0; }
            `}</style>
        </div>
    );
};

export default ContentManager;
