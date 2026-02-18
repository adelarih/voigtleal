
import React, { useState, useRef, useEffect } from 'react';
import { Send, Quote, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '../types';
import { guestbookService } from '../../../services/guestbookService';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await guestbookService.getMessages();
      const mapped: Message[] = data.map(m => ({
        id: m.id || '',
        author: m.nome,
        content: m.recado,
        date: new Date(m.created_at || '').toLocaleDateString('pt-BR'),
      }));
      setMessages(mapped);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await guestbookService.submitMessage(newAuthor, newContent);
      setIsSubmitted(true);
      setNewAuthor('');
      setNewContent('');

      // Keep form visible for 3 seconds to show success message, then hide it
      setTimeout(() => {
        setIsFormVisible(false);
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      alert('Ocorreu um erro ao enviar seu recado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const getRandomRotation = (index: number) => {
    const rotations = [-3, -2, -1, 1, 2, 3];
    return rotations[index % rotations.length];
  };

  return (
    <div className="w-full relative select-none">
      {/* Header Area */}
      <header className="mb-4 flex justify-between items-end px-4 md:px-0">
        <div>
          <h2 className="text-2xl md:text-5xl font-serif text-emerald-950">Mural de Afeto</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-12 h-1 bg-emerald-800"></div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-emerald-800 font-bold italic">Deixe seu recado</span>
          </div>
        </div>

        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-4 md:px-6 py-2.5 md:py-3 bg-emerald-950 text-white rounded-full font-bold uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-emerald-800 transition-all shadow-lg flex items-center gap-2 z-40"
        >
          {isFormVisible ? 'Fechar' : 'Escrever'}
        </button>
      </header>

      {/* Grid Viewport */}
      <div className="py-8 min-h-[400px]">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-emerald-800/20">
              <Loader2 size={64} className="animate-spin mb-4" />
              <p className="font-serif italic text-xl">Organizando os recados...</p>
            </div>
          ) : messages.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 items-start"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: getRandomRotation(index)
                    }}
                    whileHover={{
                      scale: 1.02,
                      rotate: 0,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="relative group justify-self-center w-full max-w-[320px]"
                  >
                    {/* Clothespin / Preendedor */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-10 bg-[#e3d5b8] rounded-sm shadow-sm border border-[#d4c4a5] z-30 flex flex-col items-center py-1.5 overflow-hidden">
                      <div className="w-full h-[1px] bg-[#c4b595] mb-1.5 opacity-50"></div>
                      <div className="w-full h-[1px] bg-[#c4b595] opacity-50"></div>
                      <div className="mt-auto w-full h-[2px] bg-black/5"></div>
                    </div>

                    {/* Polaroid Style Card */}
                    <div className="w-full bg-white p-5 shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col gap-4">
                      <div className="relative aspect-[4/3] bg-[#f9fbf8] flex items-center justify-center overflow-hidden border border-emerald-50/50">
                        <Quote className="text-emerald-900/5 absolute top-3 left-3" size={40} />
                        <p className="px-6 text-center text-emerald-950 font-serif italic text-sm md:text-base leading-relaxed line-clamp-6">
                          {msg.content}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-50 flex flex-col">
                        <span className="text-[10px] md:text-[11px] font-bold text-emerald-900 font-serif uppercase tracking-widest">{msg.author}</span>
                        <span className="text-[8px] md:text-[9px] text-slate-400 mt-1 flex items-center gap-1 uppercase tracking-tighter">
                          <span className="w-1 h-1 rounded-full bg-emerald-200"></span> {msg.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-32">
              <p className="font-serif italic text-2xl text-emerald-800/30">
                Nenhum recado aprovado ainda. <br /> Arrisque ser o primeiro a nos emocionar!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Message Form */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute inset-x-0 bottom-4 px-4 md:px-8 z-50"
          >
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] border border-emerald-100/50 min-h-[140px] flex items-center">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 md:gap-6 items-end w-full">
                  <div className="flex-1 space-y-4 w-full text-left">
                    <div className="flex flex-col">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-emerald-900 ml-1 mb-1 opacity-60">Como devemos te chamar?</label>
                      <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="Ex: Tio Roberto"
                        className="w-full px-4 py-2.5 bg-emerald-50/30 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-800/20 outline-none border border-emerald-900/5 focus:bg-white transition-all placeholder:text-slate-300 disabled:opacity-50"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-emerald-900 ml-1 mb-1 opacity-60">Sua Mensagem</label>
                      <textarea
                        rows={2}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Escreva algo especial..."
                        className="w-full px-4 py-2.5 bg-emerald-50/30 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-800/20 outline-none border border-emerald-900/5 focus:bg-white transition-all resize-none placeholder:text-slate-300 disabled:opacity-50"
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-emerald-900 text-white p-4 md:p-5 rounded-xl md:rounded-full hover:bg-emerald-950 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    <span className="md:hidden text-[10px] font-bold uppercase tracking-widest">
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </span>
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-6 w-full animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle size={28} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif text-xl text-emerald-950">Recado Recebido!</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Sua mensagem foi enviada para moderação e aparecerá em breve. <br /> Obrigado pelo carinho!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-48 bg-gradient-to-b from-transparent via-emerald-50/10 to-transparent pointer-events-none -z-10"></div>
    </div>
  );
};

export default Messages;
