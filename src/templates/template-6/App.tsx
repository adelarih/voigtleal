
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Section } from './components/Section';
import { FoliageOverlay } from './components/FoliageOverlay';
import { GIFT_LIST, FOOTER_LINKS, COLORS } from './constants';
import RSVPModal from './components/RSVPModal';
import { GuestMessage } from './types';
const v1 = "/assets/v-1.jpeg";
const v2 = "/assets/v-2.jpeg";
const h2 = "/assets/h-2.jpeg";
const logo = "/assets/logo-3x1.png";
import { guestbookService } from '../../services/guestbookService';
import {
   ArrowRight,
   MapPin,
   Clock,
   Calendar,
   Gift,
   MessageSquare,
   Heart,
   ChevronRight,
   HandMetal,
   MousePointer2,
   Quote,
   CheckCircle,
   Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const [scrollProgress, setScrollProgress] = useState(0);
   const [messages, setMessages] = useState<GuestMessage[]>([]);
   const [formName, setFormName] = useState('');
   const [formMsg, setFormMsg] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [isMobile, setIsMobile] = useState(false);
   const [showNavAid, setShowNavAid] = useState(true);
   const [isRSVPOpen, setIsRSVPOpen] = useState(false);
   const [rsvpEvent, setRsvpEvent] = useState<'religious' | 'festive'>('religious');

   const openRSVP = (event: 'religious' | 'festive') => {
      setRsvpEvent(event);
      setIsRSVPOpen(true);
   };

   useEffect(() => {
      fetchMessages();
   }, []);

   const fetchMessages = async () => {
      try {
         setIsLoading(true);
         const data = await guestbookService.getMessages();
         const mappedData: GuestMessage[] = data.map(m => ({
            id: m.id || '',
            name: m.nome,
            message: m.recado,
            date: new Date(m.created_at || '').toLocaleDateString('pt-BR')
         }));
         setMessages(mappedData);
      } catch (error) {
         console.error('Error fetching guestbook:', error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
   }, []);

   // Mouse drag state
   const isMouseDown = useRef(false);
   const startX = useRef(0);
   const scrollLeftStart = useRef(0);

   const handleScroll = useCallback(() => {
      if (containerRef.current) {
         const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
         const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
         setScrollProgress(progress || 0);

         if (scrollLeft > 30 && showNavAid) {
            setShowNavAid(false);
         } else if (scrollLeft <= 30 && !showNavAid) {
            setShowNavAid(true);
         }
      }
   }, [showNavAid]);

   const onMouseDown = (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      isMouseDown.current = true;
      startX.current = e.pageX - containerRef.current.offsetLeft;
      scrollLeftStart.current = containerRef.current.scrollLeft;
      containerRef.current.style.scrollBehavior = 'auto';
   };

   const onMouseUp = () => {
      isMouseDown.current = false;
      if (containerRef.current) {
         containerRef.current.style.scrollBehavior = 'smooth';
      }
   };

   const onMouseMove = (e: React.MouseEvent) => {
      if (!isMouseDown.current || !containerRef.current) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.8;
      containerRef.current.scrollLeft = scrollLeftStart.current - walk;
   };

   const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formName.trim() || !formMsg.trim() || isSubmitting) return;

      setIsSubmitting(true);
      try {
         await guestbookService.submitMessage(formName, formMsg);
         setIsSubmitted(true);
         setFormName('');
         setFormMsg('');

         // Keep success message for 5 seconds
         setTimeout(() => {
            setIsSubmitted(false);
         }, 5000);
      } catch (error) {
         alert('Ocorreu um erro ao enviar seu recado. Por favor, tente novamente.');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div
         className="h-screen w-screen bg-[#FDFDFD] overflow-hidden flex flex-col select-none"
         style={{ '--section-height': isMobile ? '100%' : '100vh' } as React.CSSProperties}
      >
         {/* Scroll Progress Bar */}
         <div className="fixed top-0 left-0 w-full h-1 bg-[#F0F4F1] z-50">
            <div
               className="h-full bg-[#4A5D4E] transition-all duration-300 ease-out"
               style={{ width: `${scrollProgress}%` }}
            />
         </div>

         {/* Main Horizontal Container */}
         <div
            ref={containerRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseUp}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className="horizontal-container flex h-full overflow-x-auto overflow-y-hidden"
         >
            {/* Continuous Journey - inline-flex with 200px gap between sections */}
            <div
               className="inline-flex h-full relative px-[10vw] transition-transform duration-500"
               style={{
                  transformOrigin: 'top left',
                  transform: isMobile ? 'scale(0.7)' : 'none',
                  height: isMobile ? '142.85%' : '100%',
                  width: isMobile ? 'auto' : 'auto',
                  gap: isMobile ? '140px' : '200px'
               }}
            >

               {/* Decorative Path Line SVG - Now covers the actual width of content */}
               <svg className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 pointer-events-none z-[20] opacity-20" preserveAspectRatio="none">
                  <path
                     d="M 0 50 C 500 -50, 1500 150, 2500 50 S 4500 -50, 6500 50 S 8500 150, 10500 50 S 12500 -50, 14500 50 S 16500 150, 18500 50 S 20500 -50, 22500 50 S 24500 150, 26500 50 S 28500 -50, 30500 50 S 32500 150, 34500 50 S 36500 -50, 38500 50 S 40500 150, 42500 50"
                     fill="none"
                     stroke="#4A5D4E"
                     strokeWidth="2"
                     className="path-line"
                  />
               </svg>

               {/* HOME SECTION */}
               <Section id="home" width={isMobile ? "143vw" : "100vw"} className="!p-0 overflow-visible">
                  {/* Image Overlay on the left */}
                  <div
                     className="absolute top-0 left-[-10vw] h-full z-0 overflow-hidden pointer-events-none"
                     style={{ width: isMobile ? 'calc(45vw + 72px)' : '45vw' }}
                  >
                     <img
                        src={v1}
                        className="h-full w-full object-cover organic-right-curve drop-shadow-2xl select-none"
                        alt="Wedding"
                        draggable="false"
                     />
                  </div>

                  {/* TOPSTACK Branding Link */}
                  <a
                     href="https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="absolute bottom-12 left-[calc(-10vw+60px)] z-[30] bg-white border border-gray-100 px-6 py-3 flex items-center gap-2 shadow-2xl rounded-2xl transition-all hover:scale-105 active:scale-95 group"
                  >
                     <span className="text-[9px] tracking-[0.2em] text-gray-400 font-light uppercase whitespace-nowrap">Desenvolvido por</span>
                     <span className="text-[11px] tracking-[0.15em] text-[#4A5D4E] font-bold uppercase transition-colors group-hover:text-[#78A083]">TOPSTACK</span>
                  </a>

                  <FoliageOverlay position="top-right" />

                  <div
                     className="text-center max-w-4xl relative z-10 md:ml-[35vw] flex flex-col items-center"
                     style={{ transform: isMobile ? 'translateX(93px)' : 'none' }}
                  >
                     <h2 className={`uppercase tracking-[0.4em] mb-8 text-[#4A5D4E] font-light ${isMobile ? 'text-lg' : 'text-xl md:text-2xl'}`}>Celina & Eduardo</h2>

                     {/* Logo replace text C&E */}
                     <div className="mb-8">
                        <img
                           src={logo}
                           alt="C&E Logo"
                           className="h-40 md:h-64 lg:h-80 w-auto object-contain select-none pointer-events-none"
                           draggable="false"
                        />
                     </div>

                     <div className="w-24 h-px bg-[#4A5D4E] mx-auto mb-12"></div>

                     <div className="flex flex-col items-center justify-center space-y-6">
                        <p className="text-lg md:text-xl font-light italic text-[#4A5D4E]">O início da nossa jornada</p>
                        <div className="flex items-center space-x-4 animate-bounce opacity-40 mt-8">
                           <span className="text-[10px] uppercase tracking-[0.5em] text-[#4A5D4E]">Arraste para navegar</span>
                           <ArrowRight size={18} className="text-[#4A5D4E]" />
                        </div>
                     </div>

                     {/* Imagem Orgânica Flutuante - Ocupa o espaço entre as sessões */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -5 }}
                        viewport={{ once: true }}
                        className="absolute aspect-square z-10 pointer-events-none"
                        style={{
                           bottom: isMobile ? '-10vh' : '-45vh',
                           right: isMobile ? '-30vw' : '-35vw',
                           width: isMobile ? '50vw' : '32vw',
                           rotate: '-5deg'
                        }}
                     >
                        <div className="absolute inset-0 bg-[#4A5D4E]/10 organic-shape-2 scale-105 rotate-12 blur-2xl"></div>
                        <img
                           src={h2}
                           alt="Pre-wedding Transition"
                           className="w-full h-full object-cover organic-shape-2 shadow-2xl border-[15px] border-white select-none"
                           draggable="false"
                        />
                     </motion.div>
                  </div>
               </Section>

               {/* CERIMONIA RELIGIOSA */}
               <Section id="religiosa" width={isMobile ? "515px" : "max-content"} className="bg-transparent">
                  <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-12 lg:gap-24 px-6 lg:px-12`}>
                     <div className={`organic-shape-1 bg-white p-12 lg:p-20 shadow-xl border border-[#F0F4F1] relative ${isMobile ? 'w-full min-w-0' : 'min-w-[500px] max-w-xl'}`}>
                        <span className="absolute -top-4 -left-4 bg-[#4A5D4E] text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-serif italic shadow-lg">
                           A Cerimônia
                        </span>
                        <h2 className="text-5xl md:text-7xl mb-8 leading-tight">Religiosa</h2>
                        <p className="text-xl leading-relaxed font-light mb-10 text-gray-600 italic">
                           "Um momento íntimo e cheio de significado para nós."
                        </p>
                        <div className="space-y-6 text-lg">
                           <div className="flex items-center space-x-6">
                              <Calendar className="text-[#4A5D4E]" size={24} />
                              <span className="font-semibold uppercase tracking-widest text-xs">16 de Abril de 2026</span>
                           </div>
                           <div className="flex items-center space-x-6">
                              <Clock className="text-[#4A5D4E]" size={24} />
                              <span className="font-semibold uppercase tracking-widest text-xs">Quinta-feira às 19:00h</span>
                           </div>
                           <div className="flex items-center space-x-6">
                              <HandMetal className="text-[#4A5D4E]" size={24} />
                              <span className="font-semibold uppercase tracking-widest text-xs">Traje: Esporte Fino</span>
                           </div>
                        </div>

                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={() => openRSVP('religious')}
                           className="w-full mt-10 bg-[#4A5D4E] text-white px-8 py-5 rounded-full font-bold tracking-[0.3em] text-[10px] shadow-xl hover:bg-[#344437] transition-all flex items-center justify-center gap-4 group"
                        >
                           <CheckCircle size={16} className="text-[#78A083]" />
                           CONFIRMAR PRESENÇA
                           <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                     </div>

                     <div className={`space-y-6 lg:space-y-12 ${isMobile ? 'w-full' : 'w-[400px]'}`}>
                        <div className="relative">
                           <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4A5D4E] to-transparent opacity-30"></div>
                           <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} mb-4 font-serif`}>Paróquia Sagrado Coração de Jesus</h3>
                           <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mb-8 leading-relaxed`}>Rua Padre João Batista Reus, 1133 - Tristeza, Porto Alegre - RS, 91920-000</p>

                           <motion.a
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              href="https://www.google.com/maps/place/Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus/@-30.1164978,-51.2534101,17z/data=!3m1!4b1!4m6!3m5!1s0x9519823a92384a8d:0xf53c6cadbe0cd40c!8m2!3d-30.1165025!4d-51.2508352!16s%2Fg%2F1ptwjqqff?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                              target="_blank"
                              className={`inline-flex items-center gap-6 bg-[#4A5D4E] text-white ${isMobile ? 'px-8 py-4 text-[10px]' : 'px-10 py-5 text-[11px]'} rounded-full font-bold tracking-[0.3em] uppercase shadow-2xl hover:bg-[#344437] transition-all group mt-6`}
                           >
                              <MapPin size={18} className="text-white/80" />
                              VER LOCALIZAÇÃO
                              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                           </motion.a>
                        </div>
                        <div className={`bg-[#4A5D4E] text-white ${isMobile ? 'p-6' : 'p-10'} rounded-3xl shadow-2xl rotate-2`}>
                           <p className={`font-light italic leading-relaxed ${isMobile ? 'text-base' : 'text-lg'}`}>
                              "Após a celebração, receberemos os convidados para um breve brinde em nossa casa."
                           </p>
                           <p className={`mt-4 ${isMobile ? 'text-[10px]' : 'text-xs'} tracking-widest opacity-60 uppercase`}>Av. Belém Velho, 4139</p>
                        </div>
                     </div>
                  </div>
                  {/* Floating Organic Image - Between Religious and Festive */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0.8, y: -30, rotate: 5 }}
                     whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 12 }}
                     viewport={{ once: true }}
                     className="absolute aspect-[2/3] z-10 pointer-events-none"
                     style={{
                        top: isMobile ? '-5vh' : 'calc(-20vh - 70px)',
                        right: isMobile ? '-10vw' : 'calc(-15vw - 160px)',
                        width: isMobile ? '40vw' : '25vw',
                        rotate: '12deg'
                     }}
                  >
                     <div className="absolute inset-0 bg-[#4A5D4E]/10 organic-shape-1 scale-105 -rotate-6 blur-2xl"></div>
                     <img
                        src={v2}
                        alt="Transition"
                        className="w-full h-full object-cover organic-shape-1 shadow-[0_40px_80px_rgba(0,0,0,0.15)] border-[12px] border-white select-none ring-1 ring-black/5"
                        draggable="false"
                     />
                  </motion.div>
               </Section>

               {/* CERIMONIA FESTIVA */}
               <Section id="festiva" width={isMobile ? "515px" : "max-content"} className="bg-transparent">
                  <div className={`flex flex-col items-center ${isMobile ? 'w-full px-6' : 'min-w-[900px]'}`}>
                     <div className="relative mb-12 lg:mb-16">
                        <h2 className={`font-serif text-center leading-none opacity-5 absolute inset-0 select-none ${isMobile ? 'text-7xl' : 'text-6xl lg:text-[10rem]'}`}>CELEBRAÇÃO</h2>
                        <h2 className={`font-serif text-center relative z-10 ${isMobile ? 'text-5xl pt-8' : 'text-5xl lg:text-8xl pt-12'}`}>Festa & Brinde</h2>
                     </div>

                     <div className={`grid ${isMobile ? 'grid-cols-1 gap-12' : 'lg:grid-cols-2 gap-20'} items-center w-full max-w-6xl`}>
                        <div className="space-y-8">
                           <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-light leading-relaxed text-gray-600`}>
                              "A cerimônia e a festa acontecerão no sábado, a partir das 16h30, no Veleiros do Sul. Será um dia de afeto e presença."
                           </p>
                           <div className="flex gap-12 border-t border-[#F0F4F1] pt-12">
                              <div>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Quando</p>
                                 <p className="font-serif text-2xl">18.04.26</p>
                              </div>
                              <div>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Horário</p>
                                 <p className="font-serif text-2xl">16h30</p>
                              </div>
                              <div>
                                 <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Traje</p>
                                 <p className="font-serif text-2xl">Social</p>
                              </div>
                           </div>
                        </div>

                        <div className="relative group">
                           <div className="absolute -inset-4 bg-[#78A083] opacity-5 rounded-[4rem] group-hover:scale-105 transition-transform"></div>
                           <div className="bg-white p-12 rounded-[3rem] border border-[#F0F4F1] shadow-2xl relative z-10 text-center">
                              <MapPin className="mx-auto mb-6 text-[#4A5D4E]" size={48} strokeWidth={1} />
                              <h3 className="text-3xl font-serif mb-2">Veleiros do Sul</h3>
                              <p className="text-gray-400 text-sm mb-10">Av. Guaíba, 2941 - Vila Assunção, Porto Alegre - RS</p>

                              <div className="flex flex-col gap-4">
                                 <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => openRSVP('festive')}
                                    className="w-full bg-[#4A5D4E] text-white px-10 py-5 rounded-full font-bold tracking-widest text-[11px] shadow-xl hover:bg-[#2C3E2D] transition-colors flex items-center justify-center gap-3 group"
                                 >
                                    <CheckCircle size={16} className="text-[#78A083]" />
                                    CONFIRMAR PRESENÇA
                                 </motion.button>
                                 <a
                                    href="https://www.google.com/maps/place/Veleiros+do+Sul/@-30.0975023,-51.2589328,17z/data=!3m1!4b1!4m6!3m5!1s0x9519820471c941c5:0xe388c795d9812f07!8m2!3d-30.097507!4d-51.2563579!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    className="text-[#4A5D4E] text-[10px] font-bold tracking-[0.2em] hover:opacity-70 transition-opacity uppercase underline underline-offset-8 mt-4"
                                 >
                                    ABRIR MAPA NO GOOGLE
                                 </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Section>

               {/* LISTA DE PRESENTES */}
               <Section id="presentes" width="max-content" className="bg-transparent relative hover:z-[100] transition-all">
                  <div
                     className="flex flex-col mb-[50px]"
                     style={{ minWidth: isMobile ? '900px' : '1200px' }}
                  >
                     <div
                        className="relative h-[550px] w-full mt-[50px]"
                        style={{ minWidth: isMobile ? '1000px' : '1300px' }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                     >
                        {GIFT_LIST.map((gift, index) => {
                           const placements = [
                              { top: '0%', left: '0%', rotate: '-6deg' },
                              { top: '10%', left: '20%', rotate: '4deg' },
                              { top: '5%', left: '44%', rotate: '-3deg' },
                              { top: '12%', left: '68%', rotate: '8deg' },
                              { top: '42%', left: '5%', rotate: '5deg' },
                              { top: '48%', left: '32%', rotate: '-4deg' },
                              { top: '38%', left: '56%', rotate: '2deg' },
                              { top: '52%', left: '78%', rotate: '-5deg' },
                              { top: '22%', left: '88%', rotate: '12deg' },
                           ];
                           const pos = placements[index % placements.length];

                           return (
                              <div
                                 key={gift.id}
                                 className="absolute w-[320px] aspect-square transition-all duration-300 hover:!z-[999] active:!z-[1000] group"
                                 style={{
                                    top: pos.top,
                                    left: pos.left,
                                    zIndex: 10 + index
                                 }}
                              >
                                 <div className="w-full h-full animate-float transition-all duration-500 ease-out transform-gpu group-hover:scale-110 group-active:scale-110">
                                    <div
                                       className="w-full h-full rounded-[3.5rem] shadow-2xl overflow-hidden bg-white relative border-[6px] border-white/10"
                                       style={{
                                          transform: `rotate(${pos.rotate})`,
                                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                                          isolation: 'isolate'
                                       }}
                                    >
                                       {/* Background Image */}
                                       <div className="absolute inset-0 select-none pointer-events-none">
                                          <img
                                             src={gift.image}
                                             alt={gift.title}
                                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                                             draggable="false"
                                          />
                                          {/* High Contrast Overlay */}
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                                       </div>

                                       {/* Content Area with Blur on Hover for even more legibility */}
                                       <div className="absolute inset-0 p-8 flex flex-col justify-end text-white select-none pointer-events-none">
                                          <div className="mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
                                             <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                   <Gift className="text-white" size={14} />
                                                </div>
                                                <div className="h-px w-12 bg-white/30"></div>
                                             </div>
                                             <p className="text-lg font-bold leading-tight line-clamp-2 drop-shadow-lg">
                                                {gift.title}
                                             </p>
                                          </div>
                                          <div className="flex items-center justify-between transform transition-transform duration-500 group-hover:-translate-y-1">
                                             <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Valor</span>
                                                <span className="text-2xl font-serif font-bold text-[#E5E7EB]">
                                                   <span className="text-sm font-sans mr-1">R$</span>
                                                   {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                             </div>
                                             <div className="bg-white text-[#4A5D4E] p-4 rounded-full shadow-xl transition-all scale-90 group-hover:scale-100">
                                                <ArrowRight size={20} />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>

                     <div className="flex flex-col mt-6 mb-12">
                        <div className="h-1 w-64 bg-[#4A5D4E] mb-6"></div>
                        <h2 className="text-6xl md:text-[9.2rem] font-serif italic">Mimos</h2>
                     </div>
                  </div>
               </Section>

               {/* RECADOS & FOOTER */}
               <Section id="recados" width="max-content" className="!p-0">
                  <div className="flex h-full items-center px-[10vw] gap-32 relative">
                     {/* Form Container - Organic Style based on User Request */}
                     <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="shrink-0 flex flex-col justify-center organic-shape-2 bg-white p-12 md:p-24 shadow-2xl border border-[#F0F4F1] relative"
                        style={{ width: isMobile ? '120vw' : '600px' }}
                     >
                        {/* Header Badge - Matching 'A CERIMÔNIA' Style */}
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4A5D4E] text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-serif italic shadow-lg z-20 whitespace-nowrap">
                           Mural de Afeto
                        </span>

                        <div className="mb-12 text-center">
                           <h2 className="text-6xl md:text-7xl mb-6 leading-tight">Mensagens</h2>
                           <p className="text-xl leading-relaxed font-light text-gray-400 italic">
                              "Deixe uma palavra especial para este novo capítulo da nossa história."
                           </p>
                        </div>

                        {!isSubmitted ? (
                           <form onSubmit={handleSendMessage} className="space-y-8 max-w-md mx-auto w-full" onMouseDown={(e) => e.stopPropagation()}>
                              <div className="relative group/field">
                                 <input
                                    type="text"
                                    placeholder=" "
                                    className="peer w-full bg-transparent border-b border-gray-100 py-3 focus:border-[#4A5D4E] transition-all outline-none text-lg font-light disabled:opacity-50"
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    id="form-name"
                                    required
                                    disabled={isSubmitting}
                                 />
                                 <label
                                    htmlFor="form-name"
                                    className="absolute left-0 top-3 text-[10px] uppercase tracking-widest text-[#4A5D4E] font-bold opacity-30 transition-all peer-focus:-top-4 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:opacity-100 pointer-events-none"
                                 >
                                    Seu Nome
                                 </label>
                              </div>

                              <div className="relative group/field">
                                 <textarea
                                    placeholder=" "
                                    rows={1}
                                    className="peer w-full bg-transparent border-b border-gray-100 py-3 focus:border-[#4A5D4E] transition-all outline-none text-lg font-light resize-none min-h-[80px] disabled:opacity-50"
                                    value={formMsg}
                                    onChange={(e) => setFormMsg(e.target.value)}
                                    id="form-msg"
                                    required
                                    disabled={isSubmitting}
                                 />
                                 <label
                                    htmlFor="form-msg"
                                    className="absolute left-0 top-3 text-[10px] uppercase tracking-widest text-[#4A5D4E] font-bold opacity-30 transition-all peer-focus:-top-4 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:opacity-100 pointer-events-none"
                                 >
                                    Escreva algo especial...
                                 </label>
                              </div>

                              <motion.button
                                 whileHover={{ scale: 1.02 }}
                                 whileTap={{ scale: 0.98 }}
                                 disabled={isSubmitting}
                                 className="w-full bg-[#4A5D4E] text-white px-8 py-5 rounded-full font-bold tracking-[0.3em] text-[10px] shadow-xl hover:bg-[#344437] transition-colors group flex items-center justify-center gap-4 disabled:opacity-70"
                              >
                                 {isSubmitting ? (
                                    <Loader2 className="animate-spin" size={14} />
                                 ) : (
                                    'ENVIAR RECARDO'
                                 )}
                                 {!isSubmitting && <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />}
                              </motion.button>
                           </form>
                        ) : (
                           <div className="text-center py-10 space-y-6 animate-fadeIn">
                              <div className="w-16 h-16 bg-[#F0F4F1] rounded-full flex items-center justify-center mx-auto text-[#4A5D4E]">
                                 <CheckCircle size={32} />
                              </div>
                              <div className="space-y-2">
                                 <h4 className="text-2xl font-serif">Mensagem Recebida</h4>
                                 <p className="text-sm text-gray-500 font-light leading-relaxed">
                                    Obrigado pelo carinho! Sua mensagem foi enviada para moderação e aparecerá aqui em breve.
                                 </p>
                              </div>
                              <button
                                 onClick={() => setIsSubmitted(false)}
                                 className="text-[9px] font-bold uppercase tracking-widest text-[#4A5D4E] hover:underline underline-offset-4"
                              >
                                 Escrever outra
                              </button>
                           </div>
                        )}
                     </motion.div>

                     {/* Mural Container - Integrated into Page Scroll */}
                     <div className="relative flex items-center min-h-[600px] select-none py-12">
                        {/* Visual Ropes (Background) */}
                        <div className="absolute top-[35%] left-0 w-full h-[1px] bg-[#4A5D4E]/10 z-0"></div>
                        <div className="absolute top-[65%] left-0 w-full h-[1px] bg-[#4A5D4E]/10 z-0"></div>

                        {/* Static Clothesline (Scrolls with page) */}
                        <div className="flex gap-16 items-center relative z-10 pr-[10vw]">
                           <AnimatePresence mode="popLayout">
                              {isLoading ? (
                                 <div className="flex flex-col items-center justify-center px-40 text-[#4A5D4E]/20">
                                    <Loader2 size={64} className="animate-spin mb-4" />
                                    <p className="text-lg font-light italic">Carregando recados...</p>
                                 </div>
                              ) : messages.length === 0 ? (
                                 <div className="flex flex-col items-center justify-center opacity-10 px-40">
                                    <MessageSquare size={80} strokeWidth={1} />
                                    <p className="text-lg font-light italic mt-6">Aguardando seu recado...</p>
                                 </div>
                              ) : (
                                 messages.map((m, index) => (
                                    <motion.div
                                       key={m.id}
                                       initial={{ opacity: 0, scale: 0.8, x: 100 }}
                                       animate={{
                                          opacity: 1,
                                          scale: 1,
                                          x: 0,
                                          y: index % 2 === 0 ? -30 : 70,
                                          rotate: [-3, 3, -1.5, 1.5][index % 4],
                                       }}
                                       whileHover={{
                                          scale: 1.1,
                                          zIndex: 50,
                                          rotate: 0,
                                          y: index % 2 === 0 ? -40 : 80,
                                          transition: { type: "spring", stiffness: 300 }
                                       }}
                                       className="relative group shrink-0"
                                    >
                                       {/* Clothespin (Preendedor) - Template 5 Style */}
                                       <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-10 bg-[#4A5D4E] rounded-sm shadow-xl z-30 flex flex-col items-center py-2 opacity-90">
                                          <div className="w-[1px] h-full bg-white/20"></div>
                                       </div>

                                       {/* Polaroid Style Card */}
                                       <div className="w-72 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-[0.5rem] border border-[#F0F4F1] flex flex-col gap-4">
                                          <div className="relative aspect-square bg-[#FDFDFD] flex items-center justify-center p-8 border border-[#F0F4F1]/50 overflow-hidden">
                                             <Quote className="text-[#4A5D4E]/5 absolute top-3 left-3" size={48} />
                                             <p className="text-center text-[#4A5D4E] font-serif italic text-base leading-relaxed line-clamp-6">
                                                {m.message}
                                             </p>
                                          </div>

                                          <div className="pt-2 flex flex-col items-center">
                                             <span className="text-xs font-bold text-[#4A5D4E] font-serif uppercase tracking-[0.2em]">
                                                {m.name}
                                             </span>
                                             <div className="h-px w-8 bg-[#4A5D4E]/10 my-2"></div>
                                             <span className="text-[10px] text-gray-300 uppercase tracking-tighter">
                                                {m.date}
                                             </span>
                                          </div>
                                       </div>
                                    </motion.div>
                                 ))
                              )}
                           </AnimatePresence>
                        </div>
                     </div>

                     {/* Footer - Pushed to the very end of the horizontal flow */}
                     <footer className="absolute bottom-12 left-[10vw] flex items-center gap-12 text-[10px] tracking-[0.4em] text-gray-400 uppercase w-max">
                        <span>Celina & Eduardo © 2026 — O Começo de Sempre</span>
                        <div className="w-12 h-px bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                           Desenvolvido por
                           <a href={FOOTER_LINKS.topstack} target="_blank" className="font-bold text-[#4A5D4E] hover:text-[#78A083] transition-colors">TOPSTACK</a>
                        </div>
                     </footer>
                  </div>
               </Section>

            </div>
         </div>

         {/* Visual Navigation Aid */}
         <AnimatePresence>
            {showNavAid && (
               <motion.div
                  initial={{ opacity: 0, y: 20, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: 20, x: '-50%' }}
                  className={`fixed left-1/2 z-50 pointer-events-none flex flex-col items-center gap-4 ${isMobile ? 'bottom-[78px]' : 'bottom-12'}`}
               >
                  <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#F0F4F1] shadow-2xl flex items-center gap-4">
                     <MousePointer2 className="text-[#4A5D4E] animate-pulse" size={14} />
                     <span className={`uppercase tracking-[0.3em] font-bold text-[#4A5D4E] whitespace-nowrap ${isMobile ? 'text-[8px]' : 'text-[10px]'}`}>
                        Segure e arraste para explorar
                     </span>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Side Navigation Indicators */}
         {scrollProgress < 98 && (
            <div className="fixed right-12 top-1/2 -translate-y-1/2 z-40 pointer-events-none">
               <div className="flex flex-col items-center gap-2 animate-pulse opacity-50">
                  <div className="w-px h-12 bg-[#4A5D4E]"></div>
                  <ArrowRight className="text-[#4A5D4E]" size={20} />
                  <div className="w-px h-12 bg-[#4A5D4E]"></div>
               </div>
            </div>
         )}

         <RSVPModal
            isOpen={isRSVPOpen}
            onClose={() => setIsRSVPOpen(false)}
            initialEvent={rsvpEvent}
         />
      </div>
   );
};

export default App;
