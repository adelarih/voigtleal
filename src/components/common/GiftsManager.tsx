import React from 'react';
import { giftService, Gift, GiftInput } from '../../services/giftService';
import {
    Loader2,
    Gift as GiftIcon,
    Plus,
    Pencil,
    Trash2,
    Search,
    X,
    Upload,
    AlertTriangle,
    ExternalLink,
    DollarSign,
    Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftsManager: React.FC = () => {
    const [gifts, setGifts] = React.useState<Gift[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState('');

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingGift, setEditingGift] = React.useState<Gift | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);
    const [isDeleting, setIsDeleting] = React.useState(false);

    const [formData, setFormData] = React.useState<GiftInput>({
        nome: '',
        descricao: '',
        valor: 0,
        url_imagem: '',
        link_pix: '',
        link_pagamento: '',
        is_custom: false
    });

    const [uploadingImage, setUploadingImage] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const load = async () => {
            try {
                setIsLoading(true);
                const data = await giftService.getAll();
                setGifts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const handleOpenModal = (gift?: Gift) => {
        if (gift) {
            setEditingGift(gift);
            setFormData({
                nome: gift.nome,
                descricao: gift.descricao || '',
                valor: gift.valor,
                url_imagem: gift.url_imagem || '',
                link_pix: gift.link_pix || '',
                link_pagamento: gift.link_pagamento || '',
                is_custom: gift.is_custom
            });
        } else {
            setEditingGift(null);
            setFormData({
                nome: '',
                descricao: '',
                valor: 0,
                url_imagem: '',
                link_pix: '',
                link_pagamento: '',
                is_custom: false
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (editingGift) {
                await giftService.update(editingGift.id, formData);
            } else {
                await giftService.create(formData);
            }
            setIsModalOpen(false);
            const data = await giftService.getAll();
            setGifts(data);
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar. Verifique o console.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmId) return;
        try {
            setIsDeleting(true);
            await giftService.softDelete(deleteConfirmId);
            setDeleteConfirmId(null);
            const data = await giftService.getAll();
            setGifts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    // Função de Compressão de Imagem (Canvas API)
    const compressImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;

                    // Redimensionamento proporcional
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            // Retorna o arquivo comprimido como JPEG
                            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        } else {
                            resolve(file);
                        }
                    }, 'image/jpeg', 0.8); // 80% de qualidade
                };
            };
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingImage(true);

            // 1. Comprimir a imagem antes de subir
            const compressedFile = await compressImage(file);

            // 2. Upload para o Supabase
            const url = await giftService.uploadImage(compressedFile);

            // 3. Atualizar o estado do formulário para exibir a imagem
            setFormData(prev => ({ ...prev, url_imagem: url }));

        } catch (error) {
            console.error('Erro no upload:', error);
            alert('Falha ao processar imagem.');
        } finally {
            setUploadingImage(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        const numericValue = parseFloat(rawValue) / 100;
        setFormData(p => ({ ...p, valor: numericValue || 0 }));
    };

    const filteredGifts = gifts.filter(gift =>
        gift.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading && gifts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                <div className="relative w-12 h-12 mb-4">
                    <div className="absolute inset-0 border-4 border-wedding-cream rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-wedding-green border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="font-serif text-wedding-green text-lg">Carregando catálogo...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 font-sans relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between border-b border-gray-100 pb-4 sm:pb-8 gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                    <h2 className="text-3xl sm:text-4xl font-serif text-wedding-green tracking-tight mb-1 sm:mb-2">Lista de Presentes</h2>
                    <p className="text-sm sm:text-base text-gray-500 font-medium font-sans">Curadoria de presentes para o novo lar de Celina & Eduardo.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="w-full sm:w-auto bg-wedding-green hover:bg-wedding-green/90 text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-[1.2rem] sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all active:scale-95 shadow-xl shadow-wedding-green/20 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] shrink-0">
                    <Plus size={18} /> Novo Presente
                </button>
            </div>

            <div className="relative group">
                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-wedding-green transition-colors sm:hidden" size={18} />
                <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-wedding-green transition-colors hidden sm:block" size={20} />
                <input
                    type="text"
                    placeholder="Buscar por nome do presente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border-2 border-gray-100 rounded-[1.2rem] sm:rounded-2xl py-3 sm:py-4 pl-12 sm:pl-16 pr-6 sm:pr-8 text-sm sm:text-lg placeholder:text-gray-400 focus:outline-none focus:border-wedding-green focus:ring-8 focus:ring-wedding-green/5 transition-all shadow-sm"
                />
            </div>

            <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                    {filteredGifts.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-wedding-cream/10 p-16 rounded-[2.5rem] border-2 border-dashed border-wedding-cream flex flex-col items-center text-center w-full">
                            <GiftIcon className="text-wedding-sage/40 mb-6" size={64} />
                            <h3 className="text-2xl font-serif text-wedding-green mb-2">Nenhum presente encontrado</h3>
                            <p className="text-gray-500 text-sm max-w-xs font-light">Comece a montar sua lista clicando em "Novo Presente" acima.</p>
                        </motion.div>
                    ) : (
                        filteredGifts.map((gift) => (
                            <motion.div key={gift.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border-2 border-gray-50 hover:border-wedding-sage/30 p-4 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] transition-all group relative overflow-hidden hover:shadow-2xl hover:shadow-wedding-green/5">
                                <div className="flex items-center gap-3 sm:gap-6">
                                    {/* Imagem */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-wedding-cream/30 border border-wedding-cream/50 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                                        {gift.url_imagem ? (
                                            <img src={gift.url_imagem} alt={gift.nome} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                                        ) : (
                                            <>
                                                <ImageIcon className="text-wedding-sage sm:hidden" size={24} />
                                                <ImageIcon className="text-wedding-sage hidden sm:block" size={32} />
                                            </>
                                        )}
                                    </div>

                                    {/* Infos */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-wedding-green font-serif text-lg sm:text-2xl leading-tight truncate mb-1 sm:mb-2" title={gift.nome}>
                                            {gift.nome}
                                        </h3>
                                        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                            {gift.is_custom ? (
                                                <span className="text-wedding-sage font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] shrink-0 bg-wedding-cream/30 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg border border-wedding-cream">
                                                    Contribuição Livre
                                                </span>
                                            ) : (
                                                <span className="text-wedding-green font-serif text-lg sm:text-2xl shrink-0">
                                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.valor)}
                                                </span>
                                            )}
                                            {gift.link_pagamento && (
                                                <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] bg-wedding-lightGreen text-stone-700 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full uppercase tracking-[0.15em] font-bold border border-green-100/50">
                                                    <ExternalLink size={10} strokeWidth={3} /> Link Ativo
                                                </div>
                                            )}
                                            {gift.link_pix && (
                                                <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] bg-stone-50 text-stone-500 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full uppercase tracking-[0.15em] font-bold border border-stone-100">
                                                    PIX
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Ações */}
                                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 shrink-0">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleOpenModal(gift); }}
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl text-stone-400 hover:text-wedding-green hover:bg-wedding-lightGreen transition-all flex items-center justify-center border border-transparent hover:border-wedding-green/20"
                                            title="Editar"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(gift.id); }}
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center border border-transparent hover:border-red-100"
                                            title="Excluir"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-wedding-green/20 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white border border-gray-100 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl z-[120]">
                            <div className="sticky top-0 bg-white/80 backdrop-blur-md flex items-center justify-between p-6 sm:p-8 border-b border-gray-50 z-10">
                                <h3 className="text-xl sm:text-3xl font-serif text-wedding-green flex items-center gap-3 sm:gap-4">{editingGift ? <Pencil size={20} /> : <Plus size={20} />} {editingGift ? 'Editar Presente' : 'Novo Presente'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:text-wedding-green hover:bg-wedding-lightGreen transition-all flex items-center justify-center"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                                    {/* Lado Esquerdo: Imagem */}
                                    <div className="w-full lg:w-[40%] shrink-0">
                                        <label className="text-[10px] font-bold text-wedding-sage uppercase tracking-[0.2em] ml-1 mb-3 block text-center">Imagem do Presente</label>
                                        <div onClick={() => fileInputRef.current?.click()} className="relative group cursor-pointer aspect-video sm:aspect-square rounded-[1.2rem] sm:rounded-3xl border-2 border-dashed border-wedding-cream hover:border-wedding-sage/50 bg-wedding-cream/10 flex flex-col items-center justify-center gap-3 transition-all overflow-hidden text-center shadow-inner">
                                            {formData.url_imagem ? (
                                                <>
                                                    <img src={formData.url_imagem} className="w-full h-full object-cover" alt="Preview" />
                                                    <div className="absolute inset-0 bg-wedding-green/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                                                            <Upload className="text-white" size={32} />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="p-6 bg-white rounded-full text-wedding-sage group-hover:text-wedding-green transition-all shadow-md group-hover:scale-110">
                                                        {uploadingImage ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
                                                    </div>
                                                    <div className="px-6">
                                                        <p className="text-wedding-green font-serif text-xl">Fazer upload</p>
                                                        <p className="text-wedding-sage text-[10px] mt-1 font-bold uppercase tracking-widest">Toque para selecionar</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                                    </div>

                                    {/* Lado Direito: Campos */}
                                    <div className="flex-1 space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-wedding-sage uppercase tracking-[0.2em] ml-1">Nome do Presente</label>
                                            <input required type="text" value={formData.nome} onChange={(e) => setFormData(p => ({ ...p, nome: e.target.value }))} placeholder="Ex: Jantar Romântico à beira mar" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-wedding-green placeholder:text-gray-300 focus:outline-none focus:border-wedding-green/30 focus:bg-white transition-all font-serif text-xl" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-wedding-sage uppercase tracking-[0.2em] ml-1">Valor sugerido</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="text"
                                                    value={formatCurrency(formData.valor)}
                                                    onChange={handleValorChange}
                                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-3 sm:py-4 text-wedding-green focus:outline-none focus:border-wedding-green/30 focus:bg-white transition-all font-serif text-xl sm:text-2xl appearance-none"
                                                    style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-wedding-sage uppercase tracking-[0.2em] ml-1">Descrição (opcional)</label>
                                            <textarea value={formData.descricao} onChange={(e) => setFormData(p => ({ ...p, descricao: e.target.value }))} rows={3} placeholder="Conte um pouco sobre este presente..." className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-wedding-green placeholder:text-gray-300 focus:outline-none focus:border-wedding-green/30 focus:bg-white transition-all resize-none text-sm leading-relaxed font-medium" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-wedding-sage uppercase tracking-[0.2em] ml-1">Link de Pagamento</label>
                                            <input type="url" value={formData.link_pagamento} onChange={(e) => setFormData(p => ({ ...p, link_pagamento: e.target.value }))} placeholder="https://..." className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-wedding-green placeholder:text-gray-300 focus:outline-none focus:border-wedding-green/30 focus:bg-white transition-all text-xs font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-wedding-sage uppercase tracking-[0.2em] ml-1">Chave/Link PIX</label>
                                            <input type="text" value={formData.link_pix} onChange={(e) => setFormData(p => ({ ...p, link_pix: e.target.value }))} placeholder="E-mail, CPF ou Link" className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-wedding-green placeholder:text-gray-300 focus:outline-none focus:border-wedding-green/30 focus:bg-white transition-all text-xs font-medium" />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-14 rounded-2xl text-wedding-sage font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50 transition-all">Cancelar</button>
                                        <button type="submit" disabled={isSubmitting || uploadingImage} className="flex-[2] h-14 bg-wedding-green hover:bg-wedding-green/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-wedding-green/20 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                                            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (editingGift ? 'Salvar Alterações' : 'Adicionar Presente')}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteConfirmId && (
                    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[120] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-wedding-green/20 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white border border-red-100 w-full max-w-sm rounded-[2.5rem] p-10 text-center shadow-2xl overflow-hidden z-[130]">
                            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><AlertTriangle className="text-red-500" size={48} /></div>
                            <h3 className="text-3xl font-serif text-wedding-green mb-3">Tem certeza?</h3>
                            <p className="text-gray-500 mb-10 leading-relaxed font-light">Este presente será removido permanentemente da lista.</p>
                            <div className="flex flex-col gap-4">
                                <button onClick={handleDelete} disabled={isDeleting} className="w-full h-14 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-2 uppercase tracking-widest text-xs">{isDeleting ? <Loader2 className="animate-spin" size={20} /> : 'Sim, excluir'}</button>
                                <button onClick={() => setDeleteConfirmId(null)} className="w-full h-14 bg-gray-50 hover:bg-gray-100 text-wedding-sage font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]">Cancelar</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

                /* Hide Spin-buttons */
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type="number"] {
                    -moz-appearance: textfield;
                }
            `}</style>
        </div>
    );
};

export default GiftsManager;
