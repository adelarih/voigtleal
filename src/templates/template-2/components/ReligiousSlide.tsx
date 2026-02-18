import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Clock, Calendar, Share2, Map as MapIcon, X, CheckCircle } from 'lucide-react';
import RSVPModal from './RSVPModal';

const ReligiousSlide: React.FC = () => {
    const [showMap, setShowMap] = useState(false);
    const [isRSVPOpen, setIsRSVPOpen] = useState(false);

    const LOCATION = {
        name: "Paróquia Sagrado Coração de Jesus",
        address: "Rua Padre João Batista Reus, 1133 - Tristeza, Porto Alegre - RS, 91920-000",
        googleMapsUrl: "https://www.google.com/maps/place/Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus/@-30.1164978,-51.2534101,17z/data=!3m1!4b1!4m6!3m5!1s0x9519823a92384a8d:0xf53c6cadbe0cd40c!8m2!3d-30.1165025!4d-51.2508352!16s%2Fg%2F1ptwjqqff?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D",
        embedUrl: "https://maps.google.com/maps?q=Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus+Rua+Padre+Jo%C3%A3o+Batista+Reus+1133&t=&z=16&ie=UTF8&iwloc=&output=embed"
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Casamento Celina & Eduardo - Cerimônia Religiosa',
                text: `Venha celebrar conosco na ${LOCATION.name}. Endereço: ${LOCATION.address}`,
                url: LOCATION.googleMapsUrl,
            }).catch(console.error);
        } else {
            window.open(LOCATION.googleMapsUrl, '_blank');
        }
    };

    return (
        <div className="h-full w-full flex flex-col md:flex-row bg-stone-50 relative pt-20 md:pt-0 overflow-y-auto md:overflow-hidden no-scrollbar">

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden order-1 md:order-2 shrink-0">
                <img
                    src="/src/assets/v-2.jpeg"
                    alt="Church Detail"
                    className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-foliage-900/20 mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <div className="bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-tr-3xl border-l-4 border-foliage-700">
                        <p className="font-serif italic text-xl md:text-2xl text-stone-800">"O amor tudo sofre, tudo crê..."</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 md:h-full flex flex-col items-center md:justify-center justify-start p-6 md:p-16 order-2 md:order-1 relative md:overflow-y-auto no-scrollbar scroll-smooth">
                <div className="max-w-md w-full">
                    <h2 className="text-3xl md:text-5xl font-serif text-foliage-800 mb-6 relative inline-block">
                        Cerimônia Religiosa
                        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-foliage-300 rounded-full"></span>
                    </h2>

                    <p className="font-sans font-light text-stone-600 mb-8 leading-relaxed md:text-justify">
                        Com alegria, convidamos você para a celebração do nosso casamento religioso, um momento íntimo e cheio de significado para nós.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-100 hover:border-foliage-200 transition-colors">
                            <Calendar className="text-foliage-600 shrink-0" size={24} />
                            <div>
                                <h3 className="font-serif text-xl text-stone-800">16 de Abril de 2026</h3>
                                <p className="text-sm text-stone-500 font-sans">Quinta-feira</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-stone-100 hover:border-foliage-200 transition-colors">
                            <Clock className="text-foliage-600 shrink-0" size={24} />
                            <div>
                                <h3 className="font-serif text-xl text-stone-800">19:00 horas</h3>
                                <p className="text-sm text-stone-500 font-sans">Pontualmente</p>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="flex flex-col p-4 bg-white rounded-xl shadow-sm border border-stone-100 hover:border-foliage-200 transition-colors">
                            <div className="flex items-start gap-4 mb-3">
                                <MapPin className="text-foliage-600 shrink-0 mt-1" size={24} />
                                <div>
                                    <h3 className="font-serif text-xl text-stone-800 leading-tight">{LOCATION.name}</h3>
                                    <p className="text-sm text-stone-500 font-sans mt-1 leading-snug">
                                        {LOCATION.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-1 pl-10">
                                <button
                                    onClick={handleShare}
                                    className="text-xs font-bold text-foliage-600 uppercase tracking-widest hover:text-foliage-800 flex items-center gap-2 transition-colors relative z-10"
                                >
                                    <Share2 size={14} />
                                    Compartilhar
                                </button>

                                <button
                                    onClick={() => setShowMap(true)}
                                    className="bg-foliage-50 text-foliage-700 p-2 rounded-full hover:bg-foliage-100 transition-colors hover:scale-110 transform duration-300 relative z-10"
                                    title="Ver mapa"
                                >
                                    <MapIcon size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            onClick={() => setIsRSVPOpen(true)}
                            className="w-full sm:w-auto px-8 py-3 bg-foliage-800 text-white rounded-full font-sans text-sm font-bold uppercase tracking-widest hover:bg-foliage-900 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-foliage-900/10 flex items-center justify-center gap-2"
                        >
                            <CheckCircle size={18} className="text-foliage-300" />
                            Confirmar Presença
                        </button>

                        <div className="bg-foliage-50 px-4 py-2 rounded-full border border-foliage-100">
                            <p className="text-stone-700 font-sans text-xs font-medium uppercase tracking-wider">Traje: Esporte Fino</p>
                        </div>
                    </div>
                </div>
            </div>

            <RSVPModal
                isOpen={setIsRSVPOpen && isRSVPOpen}
                onClose={() => setIsRSVPOpen(false)}
                initialEvent="religious"
            />

            {/* Map Modal with Portal to break out of transform context */}
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

export default ReligiousSlide;