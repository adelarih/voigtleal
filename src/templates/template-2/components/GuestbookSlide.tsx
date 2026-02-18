import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Plus, X, Loader2, CheckCircle } from 'lucide-react';
import { GuestMessage } from '../types';
import { guestbookService } from '../../../services/guestbookService';

// Extended interface for visual properties (position, rotation, color)
interface StickyNote extends GuestMessage {
  x: number;
  y: number;
  rotation: number;
  colorClass: string;
  zIndex: number;
}

const COLORS = [
  'bg-white',
  'bg-stone-100',
  'bg-foliage-50',
  'bg-foliage-100',
  'bg-[#fffdf5]', // Warm paper-like white
];

const GuestbookSlide: React.FC = () => {
  // State for the form sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Canvas/Notes State
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging State
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [maxZIndex, setMaxZIndex] = useState(10);

  // Fetch real data on mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const data = await guestbookService.getMessages();

      const generatedNotes: StickyNote[] = data.map((msg, index) => ({
        id: msg.id || Date.now().toString() + index,
        name: msg.nome,
        message: msg.recado,
        date: new Date(msg.created_at || '').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        x: Math.random() * 60 + 10,
        y: Math.random() * 60 + 10,
        rotation: Math.random() * 12 - 6,
        colorClass: COLORS[index % COLORS.length],
        zIndex: index + 1,
      }));

      setNotes(generatedNotes);
      setMaxZIndex(generatedNotes.length + 10);
    } catch (error) {
      console.error('Error fetching guestbook:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Drag Logic ---

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note || !containerRef.current) return;

    // Bring to front
    const newZ = maxZIndex + 1;
    setMaxZIndex(newZ);
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, zIndex: newZ } : n)));

    // Calculate offset based on container dimensions
    const containerRect = containerRef.current.getBoundingClientRect();
    const noteXPx = (note.x / 100) * containerRect.width;
    const noteYPx = (note.y / 100) * containerRect.height;

    setDraggingId(id);
    setDragOffset({
      x: e.clientX - noteXPx,
      y: e.clientY - noteYPx,
    });

    // Capture pointer to track movement even if it leaves the element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate new percentage position
    let newX = ((e.clientX - dragOffset.x) / containerRect.width) * 100;
    let newY = ((e.clientY - dragOffset.y) / containerRect.height) * 100;

    // Boundaries (keep somewhat inside)
    newX = Math.max(0, Math.min(newX, 90)); // 0 to 90%
    newY = Math.max(0, Math.min(newY, 90)); // 0 to 90%

    setNotes((prev) =>
      prev.map((n) => (n.id === draggingId ? { ...n, x: newX, y: newY } : n))
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingId) {
      setDraggingId(null);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  // --- Form Logic ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await guestbookService.submitMessage(name, message);

      setIsSubmitted(true);
      setName('');
      setMessage('');

      // We don't add to local state immediately as it needs moderation
    } catch (error) {
      alert('Ocorreu um erro ao enviar seu recado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full bg-stone-50 flex flex-col relative overflow-y-auto md:overflow-hidden no-scrollbar pt-20 md:pt-0">

      {/* Main Layout Split */}
      <div className="flex-1 flex flex-col md:flex-row relative">

        {/* --- LEFT PANEL --- */}
        <div className="w-full md:w-1/2 bg-stone-50 shrink-0 z-30 flex items-center justify-center p-6 md:p-16 relative">
          <div className="max-w-md w-full flex flex-col gap-6 md:gap-8">

            {/* Image Container */}
            <div className="w-full aspect-[4/3] bg-stone-200 rounded-sm overflow-hidden relative border-4 border-white shadow-lg md:rotate-1 transform transition-transform duration-700 shrink-0">
              <img
                src="/src/assets/h-2.jpeg"
                alt="Noivos"
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-stone-200 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-foliage-800"></div>

              <h2 className="text-4xl lg:text-5xl font-serif text-foliage-900 mb-4 tracking-tight italic">
                Mural de Amor
              </h2>

              <div className="w-12 h-0.5 bg-foliage-200 mb-6"></div>

              <p className="text-stone-600 font-sans text-sm font-light mb-8 leading-relaxed">
                Espalhe carinho! {containerRef.current ? 'Arraste os bilhetes para ler' : 'Deixe uma mensagem'} que guardaremos para sempre.
              </p>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-full bg-foliage-800 hover:bg-foliage-900 text-white font-sans font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <Plus size={20} strokeWidth={2.5} className="text-foliage-200 group-hover:text-white transition-colors" />
                <span className="uppercase tracking-widest text-xs font-semibold">Deixar recado</span>
              </button>
            </div>
          </div>
        </div>


        {/* --- RIGHT CANVAS / LIST --- */}
        <div
          className="flex-1 relative bg-stone-50 overflow-visible md:overflow-hidden h-auto md:h-full p-6 md:p-0 flex flex-col md:block gap-6"
          ref={containerRef}
        >
          {/* Background Texture - Desktop only cue */}
          <div className="absolute inset-0 opacity-30 pointer-events-none z-0 hidden md:block"
            style={{ backgroundImage: 'radial-gradient(#268c5b 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
          </div>

          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-foliage-200 z-10">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="font-serif italic text-lg text-stone-400">Organizando o mural...</p>
            </div>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                onPointerDown={(e) => {
                  if (window.innerWidth >= 768) handlePointerDown(e, note.id);
                }}
                onPointerMove={(e) => {
                  if (window.innerWidth >= 768) handlePointerMove(e);
                }}
                onPointerUp={(e) => {
                  if (window.innerWidth >= 768) handlePointerUp(e);
                }}
                className={`
                  relative md:absolute 
                  w-full md:w-64 
                  p-6 md:p-5 
                  shadow-sm md:shadow-[0_3px_10px_rgba(0,0,0,0.1)] 
                  hover:shadow-md md:hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] 
                  transition-all 
                  md:cursor-grab md:active:cursor-grabbing 
                  flex flex-col justify-between 
                  rounded-lg md:rounded-none
                  ${note.colorClass}
                `}
                style={{
                  left: window.innerWidth >= 768 ? `${note.x}%` : 'auto',
                  top: window.innerWidth >= 768 ? `${note.y}%` : 'auto',
                  transform: window.innerWidth >= 768 ? `rotate(${note.rotation}deg) scale(${draggingId === note.id ? 1.05 : 1})` : 'none',
                  zIndex: window.innerWidth >= 768 ? note.zIndex : 1,
                  fontFamily: '"Cormorant Garamond", serif',
                  touchAction: window.innerWidth >= 768 ? 'none' : 'auto',
                }}
              >
                {/* Washi Tape visual effect - desktop only or centered on mobile */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-stone-200/40 backdrop-blur-[1px] rotate-1"></div>

                <div className="mb-4 select-none md:pointer-events-none mt-2">
                  <p className="text-stone-800 text-xl leading-snug italic">"{note.message}"</p>
                </div>

                <div className="mt-auto pt-3 border-t border-black/5 flex justify-between items-end select-none md:pointer-events-none">
                  <span className="font-sans text-[10px] md:text-xs font-bold text-stone-600 uppercase tracking-wide">{note.name}</span>
                  <span className="font-sans text-[9px] text-stone-400">{note.date}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
              <p className="font-serif italic text-2xl text-stone-300 max-w-sm">
                Nenhum bilhete ainda. Seja o primeiro a prender um recado neste mural!
              </p>
            </div>
          )}

          {/* Bottom spacer for mobile */}
          <div className="h-12 md:hidden shrink-0"></div>
        </div>

      </div>

      {/* --- Right Sidebar Form (Portal to Body) --- */}
      {createPortal(
        <>
          <div
            className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-[2000] flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <div>
                <h3 className="font-serif text-3xl text-foliage-900 italic">Novo Recado</h3>
                <p className="text-xs text-stone-500 font-sans uppercase tracking-wider mt-1">Escreva com carinho</p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-stone-400 hover:text-foliage-800 hover:bg-stone-100 rounded-full transition-all"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-white">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="group">
                    <label className="block font-sans text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 group-focus-within:text-foliage-600 transition-colors">Seu Nome</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-0 py-3 border-b-2 border-stone-200 focus:border-foliage-800 outline-none bg-transparent font-serif text-xl text-stone-800 placeholder-stone-300 transition-all disabled:opacity-50"
                      placeholder="Como devemos lhe chamar?"
                      autoFocus={isSidebarOpen}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block font-sans text-xs font-bold text-stone-400 uppercase tracking-widest mb-3 group-focus-within:text-foliage-600 transition-colors">Sua Mensagem</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl border border-stone-200 focus:border-foliage-800 focus:ring-1 focus:ring-foliage-800 outline-none bg-stone-50 font-serif text-lg leading-relaxed text-stone-700 placeholder-stone-300 transition-all h-48 resize-none shadow-inner disabled:opacity-50"
                      placeholder="Escreva algo especial para os noivos..."
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </form>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn py-12">
                  <div className="w-20 h-20 bg-foliage-50 rounded-full flex items-center justify-center text-foliage-600">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="font-serif text-3xl text-foliage-900 italic">Bilhete Enviado!</h4>
                  <p className="text-stone-500 leading-relaxed font-sans text-sm max-w-[280px]">
                    Obrigado por prender seu carinho em nosso mural! Sua mensagem passará por moderação e aparecerá aqui em breve.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-foliage-800 font-bold uppercase tracking-widest text-[10px] hover:underline underline-offset-8 pt-4"
                  >
                    Novo bilhete
                  </button>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-stone-100 bg-stone-50">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-foliage-800 hover:bg-foliage-900 disabled:bg-stone-300 text-white font-sans font-medium py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-widest text-sm">{isSubmitted ? 'Publicado' : 'Publicar Mensagem'}</span>
                    {!isSubmitted && <Send size={16} />}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Overlay backdrop */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-stone-900/20 z-[1900] backdrop-blur-[2px] transition-opacity duration-500"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </>,
        document.body
      )}
    </div>
  );
};

export default GuestbookSlide;