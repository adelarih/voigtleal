import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { guestbookService } from '../../../services/guestbookService';
import { Loader2, CheckCircle } from 'lucide-react';

const GuestbookSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
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
      const mappedMessages: Message[] = data.map(m => ({
        id: m.id || '',
        author: m.nome,
        text: m.recado,
        date: new Date(m.created_at || '').toLocaleDateString('pt-BR')
      }));
      setMessages(mappedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await guestbookService.submitMessage(newAuthor, newText);

      setIsSubmitted(true);
      setNewAuthor('');
      setNewText('');

      // Success message status reset handled by user action or timeout
      setTimeout(() => {
        setIsSubmitted(false);
      }, 8000);
    } catch (error) {
      alert('Ocorreu um erro ao enviar seu recado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-8 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h3 className="text-4xl font-serif text-emerald-900">Mural de Recados</h3>
        <p className="text-gray-600 text-lg">
          Deixe uma mensagem especial para nós! Adoraremos ler cada palavra de carinho.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Form */}
        <div className="md:col-span-1 bg-white p-8 rounded-3xl shadow-xl border border-emerald-50 sticky top-28">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">Seu Nome</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all font-sans"
                  placeholder="Ex: João Silva"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">Sua Mensagem</label>
                <textarea
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all font-sans"
                  placeholder="Escreva algo carinhoso..."
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-800 text-white py-4 rounded-xl font-semibold hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Recado'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-serif text-emerald-900">Mensagem Recebida!</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Muito obrigado pelo carinho! Sua mensagem foi enviada para moderação e aparecerá aqui assim que for aprovada.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-emerald-700 text-xs font-bold uppercase tracking-widest hover:underline pt-4"
              >
                Escrever outro recado
              </button>
            </div>
          )}
        </div>

        {/* List */}
        <div className="md:col-span-2 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-emerald-200">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="text-gray-400 font-serif italic">Carregando recados...</p>
            </div>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="bg-emerald-50/30 p-8 rounded-[2rem] border border-emerald-50 relative group hover:bg-emerald-50/50 transition-all duration-500">
                <div className="absolute top-4 right-8 text-emerald-200 group-hover:text-emerald-300 transition-colors">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <p className="text-emerald-900 italic text-lg leading-relaxed mb-4">"{msg.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl text-emerald-800">{msg.author}</span>
                  <span className="text-xs text-emerald-600/60 uppercase tracking-widest">{msg.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-emerald-50/10 rounded-[2rem] border border-dashed border-emerald-100 transition-all">
              <p className="text-gray-400 italic">Nenhum recado aprovado ainda. Seja o primeiro a nos enviar uma mensagem!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestbookSection;
