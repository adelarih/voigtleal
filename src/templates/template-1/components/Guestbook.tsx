import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, X, Quote, Eye, Loader2, CheckCircle } from 'lucide-react';
import { GuestMessage } from '../types';
import { guestbookService } from '../../../services/guestbookService';

const CHAR_LIMIT = 140;

const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<'form' | 'view'>('form');
  const [selectedMessage, setSelectedMessage] = useState<GuestMessage | null>(null);

  // Form State
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await guestbookService.getMessages();
      const mappedMessages: GuestMessage[] = data.map(m => ({
        id: m.id,
        name: m.nome,
        message: m.recado,
        date: new Date(m.created_at || '').toLocaleDateString('pt-BR')
      }));
      setMessages(mappedMessages);
    } catch (error) {
      console.error('Error fetching guestbook:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Duplicate messages for infinite loop (Set A + Set B)
  const displayMessages = [...messages, ...messages];

  const openForm = () => {
    setSidebarMode('form');
    setIsSidebarOpen(true);
    setIsSubmitted(false);
  };

  const openMessageView = (msg: GuestMessage) => {
    setSelectedMessage(msg);
    setSidebarMode('view');
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await guestbookService.submitMessage(newName, newMessage);
      setIsSubmitted(true);
      setNewName('');
      setNewMessage('');

      // Auto close or keep open for success message? 
      // User requested "after done we follow with the rest", 
      // but showing success is better.
    } catch (error) {
      alert('Ocorreu um erro ao enviar seu recado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="recados" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-wedding-lightGreen/40 via-transparent to-transparent opacity-70 pointer-events-none"></div>

      <div className="w-full relative z-10">
        <div className="text-center mb-16 px-4">
          <h2 className="font-serif text-5xl md:text-6xl text-wedding-green mb-4">Mural de Recados</h2>
          <p className="font-sans text-wedding-sage uppercase tracking-widest text-sm font-semibold">
            Deixe seu carinho para Celina & Eduardo
          </p>
        </div>

        {/* Infinite Marquee Carousel */}
        <div className="relative w-full mb-16 group min-h-[400px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 text-wedding-sage/40">
              <Loader2 className="w-12 h-12 animate-spin" />
              <p className="font-serif italic text-lg">Carregando recados...</p>
            </div>
          ) : messages.length > 0 ? (
            <>
              {/* Gradient Edges for fading effect */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

              <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] py-12">
                {displayMessages.map((msg, index) => {
                  // Unique key for the duplicated list
                  const uniqueKey = `${msg.id}-${index}`;

                  // Wave Effect: Calculate Y offset
                  // Pattern: 0, 30, 60, 30 -> repeats
                  const waveOffsets = [0, 32, 64, 32];
                  const translateY = waveOffsets[index % 4];

                  // Truncation Logic
                  const isTruncated = (msg.message || '').length > CHAR_LIMIT;
                  const displayText = isTruncated ? msg.message.substring(0, CHAR_LIMIT) + '...' : msg.message;

                  return (
                    <div
                      key={uniqueKey}
                      className="w-[300px] md:w-[380px] mx-5 bg-wedding-cream p-8 rounded-3xl border border-wedding-green/10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
                      style={{ transform: `translateY(${translateY}px)` }}
                    >
                      <div>
                        <Quote className="w-8 h-8 text-wedding-sage/30 mb-4 fill-current transform rotate-180" />
                        <p className="font-serif text-xl text-wedding-green/80 italic leading-relaxed mb-4">
                          "{displayText}"
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-wedding-green/10 flex items-center justify-between">
                        <div>
                          <span className="block font-sans font-bold text-wedding-green text-sm uppercase tracking-wide truncate max-w-[150px]">
                            {msg.name}
                          </span>
                          <span className="text-xs text-wedding-sage font-medium">
                            {msg.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openMessageView(msg)}
                            className="p-2 bg-white rounded-full text-wedding-sage hover:text-wedding-green hover:bg-wedding-lightGreen transition-all shadow-sm border border-wedding-green/5"
                            aria-label="Visualizar mensagem completa"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20 px-8 bg-wedding-cream/30 rounded-[3rem] border border-dashed border-wedding-green/10 max-w-2xl mx-auto">
              <p className="font-serif italic text-wedding-green/40 text-xl leading-relaxed">
                Nenhum recado aprovado ainda. <br className="hidden md:block" /> Que tal ser o primeiro a deixar uma mensagem de carinho?
              </p>
            </div>
          )}
        </div>

        {/* Main CTA Button */}
        <div className="text-center px-4">
          <button
            onClick={openForm}
            className="group relative inline-flex items-center gap-3 bg-wedding-green text-white px-10 py-4 rounded-full font-sans font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl hover:bg-wedding-darkGreen transition-all duration-300 transform hover:-translate-y-1"
          >
            <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Deixar meu Recado
          </button>
        </div>
      </div>

      {/* Sidebar (Drawer) */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-wedding-darkGreen/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeSidebar}
        ></div>

        {/* Panel */}
        <div
          className={`fixed right-0 top-0 h-full w-full md:w-[500px] bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Sidebar Header */}
          <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100 bg-wedding-cream">
            <h3 className="font-serif text-2xl text-wedding-green">
              {sidebarMode === 'form' ? 'Escrever Recado' : 'Mensagem de Carinho'}
            </h3>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-full hover:bg-black/5 text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">

            {sidebarMode === 'form' ? (
              !isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col">
                  <div className="space-y-6 flex-1">
                    <div>
                      <label className="block text-xs font-bold text-wedding-sage uppercase tracking-widest mb-3">Seu Nome</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-wedding-green/20 focus:border-wedding-green outline-none transition-all font-sans text-wedding-green"
                        placeholder="Ex: Tios João e Maria"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-wedding-sage uppercase tracking-widest mb-3">Sua Mensagem</label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-wedding-green/20 focus:border-wedding-green outline-none transition-all h-64 resize-none font-serif text-lg text-gray-700 leading-relaxed"
                        placeholder="Escreva seus votos para o casal..."
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-wedding-green text-white rounded-xl font-bold uppercase tracking-wider hover:bg-wedding-darkGreen transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar Recado'}
                  </button>
                </form>
              ) : (
                // Submission Success State
                <div className="flex flex-col h-full items-center justify-center text-center space-y-6 py-12 animate-fadeIn">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="font-serif text-3xl text-wedding-green">Recado Recebido!</h4>
                  <p className="font-sans text-wedding-sage leading-relaxed max-w-sm">
                    Muito obrigado pelo seu carinho! Sua mensagem foi enviada para moderação e aparecerá no mural assim que for aprovada.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-wedding-green font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8"
                  >
                    Enviar outro recado
                  </button>
                </div>
              )
            ) : (
              // View Mode
              selectedMessage && (
                <div className="flex flex-col h-full justify-center text-center space-y-8">
                  <div className="w-16 h-16 bg-wedding-lightGreen rounded-full flex items-center justify-center mx-auto text-wedding-green mb-4">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-6 left-0 text-wedding-sage/20 w-12 h-12 transform rotate-180" />
                    <p className="font-serif text-2xl md:text-3xl text-wedding-green italic leading-relaxed px-4">
                      {selectedMessage.message}
                    </p>
                    <Quote className="absolute -bottom-6 right-0 text-wedding-sage/20 w-12 h-12" />
                  </div>

                  <div className="pt-8 border-t border-dashed border-wedding-green/20 mt-8">
                    <h4 className="font-sans font-bold text-wedding-green text-lg uppercase tracking-wide">
                      {selectedMessage.name}
                    </h4>
                    <span className="text-wedding-sage font-medium text-sm mt-1 block">
                      {selectedMessage.date}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </>
    </section>
  );
};

export default Guestbook;