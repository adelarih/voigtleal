import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Sparkles, Map as MapIcon, Share2, X, CheckCircle } from 'lucide-react';
import RSVPModal from './RSVPModal';

const PartySlide: React.FC = () => {
    const [showMap, setShowMap] = useState(false);
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);

    const LOCATION = {
        name: "Veleiros do Sul",
        address: "Av. Guaíba, 2941 - Vila Assunção, Porto Alegre - RS",
        googleMapsUrl: "https://www.google.com/maps/place/Veleiros+do+Sul/@-30.0975023,-51.2589328,17z/data=!3m1!4b1!4m6!3m5!1s0x9519820471c941c5:0xe388c795d9812f07!8m2!3d-30.097507!4d-51.2563579!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
        embedUrl: "https://maps.google.com/maps?q=Veleiros+do+Sul+Porto+Alegre&t=&z=15&ie=UTF8&iwloc=&output=embed"
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Casamento Celina & Eduardo - A Festa',
                text: `Vamos celebrar na ${LOCATION.name}. Endereço: ${LOCATION.address}`,
                url: LOCATION.googleMapsUrl,
            }).catch(console.error);
        } else {
            window.open(LOCATION.googleMapsUrl, '_blank');
        }
    };

    return (
        <div className="h-full w-full flex flex-col md:flex-row bg-white relative pt-20 md:pt-0 overflow-y-auto md:overflow-hidden no-scrollbar">

            {/* Decorative Shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-foliage-50 rounded-bl-[100%] z-0"></div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden group shrink-0">
                <img
                    src="/src/assets/v-3.jpeg"
                    alt="Venue Vibe"
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/40 rounded-full hidden md:flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white font-serif text-xl tracking-widest">C & E</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 md:h-full flex flex-col items-center md:justify-center justify-start p-6 md:p-16 z-10 md:overflow-y-auto no-scrollbar scroll-smooth">
                <div className="max-w-md w-full text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-3 mb-2 md:mb-4">
                        <span className="text-foliage-600 uppercase tracking-widest text-xs md:sm font-medium">A Grande Festa</span>
                        <Sparkles className="text-foliage-400" size={16} />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-6 md:mb-8 leading-tight">
                        Cerimônia <br className="hidden md:block" />
                        <span className="italic text-foliage-700">Festiva</span>
                    </h2>

                    <p className="font-sans font-light text-stone-600 mb-6 md:mb-8 leading-relaxed md:border-r-2 md:border-foliage-200 md:pr-4">
                        Convidamos você para celebrar conosco o nosso casamento, em um dia pensado para ser vivido com presença, afeto e celebração. Reuniremos cerimônia e festa em um só lugar.
                    </p>

                    <div className="bg-stone-50 p-6 md:p-8 rounded-2xl md:rounded-tl-[3rem] md:rounded-br-[3rem] shadow-sm mb-6 md:mb-8 text-left">
                        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                            <div>
                                <span className="block text-foliage-600 text-[10px] uppercase tracking-wider mb-1">Data</span>
                                <span className="block font-serif text-xl md:text-2xl text-stone-800">18 ABR</span>
                                <span className="block font-sans text-xs md:text-sm text-stone-500">Sábado, 2026</span>
                            </div>
                            <div>
                                <span className="block text-foliage-600 text-[10px] uppercase tracking-wider mb-1">Horário</span>
                                <span className="block font-serif text-xl md:text-2xl text-stone-800">16:30</span>
                                <span className="block font-sans text-xs md:text-sm text-stone-500">Pôr do sol</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-stone-200 pt-6">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-foliage-500 shrink-0 mt-1" size={18} />
                                <div>
                                    <span className="block font-serif text-lg md:text-xl text-stone-800 leading-none mb-1">{LOCATION.name}</span>
                                    <span className="block font-sans text-xs md:text-sm text-stone-500">{LOCATION.address}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pl-8 mt-2">
                                <button
                                    onClick={handleShare}
                                    className="text-[10px] font-bold text-foliage-600 uppercase tracking-widest hover:text-foliage-800 flex items-center gap-2 transition-colors relative z-10"
                                >
                                    <Share2 size={12} />
                                    Compartilhar
                                </button>

                                <button
                                    onClick={() => setShowMap(true)}
                                    className="bg-white text-foliage-700 p-2 rounded-full shadow-sm hover:shadow-md border border-stone-100 hover:text-foliage-900 transition-all hover:scale-110 relative z-10"
                                    title="Ver mapa"
                                >
                                    <MapIcon size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-fit mx-auto md:ml-auto md:mr-0 mt-8">
                        <button
                            onClick={() => setIsRSVPOpen(true)}
                            className="w-full sm:w-auto px-8 py-3 bg-foliage-800 text-white rounded-full font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-foliage-900 transition-all transform hover:-translate-y-0.5 shadow-xl shadow-foliage-900/10 flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={14} className="text-foliage-300" />
                            Confirmar Presença
                        </button>

                        <div className="flex items-center gap-3 text-stone-600 bg-white border border-stone-100 px-5 py-2.5 rounded-full shadow-sm">
                            <span className="font-serif font-medium text-sm">Traje:</span>
                            <span className="font-sans font-light text-xs whitespace-nowrap">Social / Passeio Completo</span>
                        </div>
                    </div>
                </div>
            </div>

            <RSVPModal
                isOpen={isRSVPOpen}
                onClose={() => setIsRSVPOpen(false)}
                initialEvent="festive"
            />

            {/* Map Modal with Portal */}
            {showMap && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-3xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-up">
                        <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                            <div>
                                <h3 className="font-serif text-xl text-stone-800">{LOCATION.name}</h3>
                                <p className="text-xs text-stone-500 font-sans">{LOCATION.address}</p>
                            </div>
                            <button
                                onClick={() => setShowMap(false)}
                                className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                            >
                                <X size={24} className="text-stone-500" />
                            </button>
                        </div>
                        <div className="flex-1 bg-stone-100 relative">
                            <iframe
                                src={LOCATION.embedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </div>
                </div>,
                document.body
            )}

        </div>
    );
};

export default PartySlide;