import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, X, Plus, Loader2, CheckCircle } from 'lucide-react';
import { Message } from '../types';
import { guestbookService } from '../../../services/guestbookService';

interface MuralMessage extends Message {
  initialPos: { left: string, top: string, rotate: number };
}

export const Guestbook: React.FC = () => {
  const muralRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MuralMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await guestbookService.getMessages();
      const mapped: MuralMessage[] = data.map((m, idx) => {
        // Distribute notes around the center photo
        const isLeft = idx % 2 === 0;
        return {
          id: m.id || '',
          name: m.nome,
          content: m.recado,
          initialPos: {
            left: isLeft ? `${Math.random() * 15 + 5}%` : `${Math.random() * 15 + 75}%`,
            top: `${Math.random() * 70 + 10}%`,
            rotate: Math.random() * 16 - 8
          }
        };
      });
      setMessages(mapped);
    } catch (error) {
      console.error('Error fetching mural messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await guestbookService.submitMessage(name, content);
      setIsSubmitted(true);
      setName('');
      setContent('');

      // Auto close after showing success for a while
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      alert('Ocorreu um erro ao enviar seu recado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="recados" className="py-24 relative min-h-[1000px] bg-stone-50/50 scroll-mt-20">

      <div className="container mx-auto px-4 relative z-30 flex flex-col items-center mb-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-wedding-green text-white px-10 py-4 rounded-full font-serif text-xl italic shadow-xl flex items-center gap-3"
        >
          <Plus size={24} /> Deixar recado
        </motion.button>
      </div>

      {/* Mural Desktop */}
      <div
        ref={muralRef}
        className="hidden md:block relative w-full h-[800px]"
        style={{ border: '1px dashed transparent' }} // Just to ensure it's a block
      >
        {/* Foto Central */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[400px] pointer-events-none select-none">
          <div className="bg-white p-4 shadow-2xl border border-stone-100">
            <img src="/src/assets/v-4.jpeg" alt="Nossa jornada" className="w-full h-[500px] object-cover" />
            <div className="absolute -bottom-4 -right-4 bg-wedding-darkGreen text-white px-6 py-2 text-xs font-bold shadow-xl rotate-3 uppercase">Nossa Jornada</div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-wedding-green/30 bg-stone-50/20 backdrop-blur-[2px]">
            <Loader2 size={64} className="animate-spin mb-4" />
            <p className="font-serif italic text-xl text-stone-400">Arrumando o mural...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && messages.length === 0 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
            <p className="font-serif italic text-xl text-stone-300">
              Ainda não temos recados aprovados. <br /> Que tal prender o primeiro aqui?
            </p>
          </div>
        )}

        {/* Recados */}
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id}
            drag
            dragConstraints={false}
            dragElastic={0.05}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: msg.initialPos.rotate }}
            whileDrag={{ scale: 1.08, zIndex: 999 }}
            style={{
              position: 'absolute',
              left: msg.initialPos.left,
              top: msg.initialPos.top,
              zIndex: 20 + idx,
              touchAction: 'none'
            }}
            className="cursor-grab active:cursor-grabbing w-72"
          >
            <div className="bg-white p-6 shadow-xl border border-stone-100 select-none">
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Mural de Amor</span>
                  <h4 className="font-serif font-bold text-wedding-green text-sm">{msg.name}</h4>
                </div>
                <Heart size={14} className="text-red-400/30 fill-current" />
              </div>
              <p className="font-serif italic text-stone-600 text-xs leading-relaxed line-clamp-4 pointer-events-none">
                "{msg.content}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Versão Mobile */}
      <div className="md:hidden flex flex-col items-center px-4 space-y-12">
        <div className="bg-white p-4 shadow-xl border border-stone-100 w-full max-w-sm relative">
          <img src="/src/assets/v-4.jpeg" alt="Nossa jornada" className="w-full h-auto object-cover" />
          <div className="absolute -bottom-4 -right-4 bg-wedding-darkGreen text-white px-6 py-2 text-xs font-bold shadow-xl rotate-3 uppercase">Nossa Jornada</div>
        </div>

        <div className="w-full space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 text-stone-300">
              <Loader2 className="animate-spin mb-3" />
              <p className="font-serif italic text-sm">Carregando recados...</p>
            </div>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white p-6 shadow-md border border-stone-100 flex flex-col relative">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Mural de Amor</span>
                    <h4 className="font-serif font-bold text-wedding-green text-sm">{msg.name}</h4>
                  </div>
                  <Heart size={14} className="text-red-400/30 fill-current" />
                </div>
                <p className="font-serif italic text-stone-600 text-xs leading-relaxed">"{msg.content}"</p>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-stone-300">
              <p className="font-serif italic text-sm">Nenhum recado ainda.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white max-w-lg w-full p-8 relative z-10 shadow-2xl rounded-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-3xl text-wedding-green italic">Deixe seu carinho</h2>
                <button onClick={() => setIsModalOpen(false)} disabled={isSubmitting}><X size={24} className="text-stone-400" /></button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2 font-bold">Seu Nome</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-full border-b border-stone-200 py-2 focus:outline-none font-serif text-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-400 mb-2 font-bold">Mensagem</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-full border border-stone-100 bg-stone-50 p-4 h-32 text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-3 w-full bg-wedding-darkGreen text-white py-4 font-serif text-lg italic hover:bg-wedding-green transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Send size={18} />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center text-center space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <CheckCircle size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-wedding-green italic">Recado Enviado!</h3>
                    <p className="text-stone-400 text-sm leading-relaxed max-w-[260px]">
                      Muito obrigado! Sua mensagem passará por moderação e aparecerá aqui em breve.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};