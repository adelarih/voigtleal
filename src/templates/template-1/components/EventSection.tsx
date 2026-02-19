import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Share2, Map as MapIcon, X, Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { EventDetails } from '../types';
import RSVPModal from './RSVPModal';

interface EventSectionProps {
  id: string;
  data: EventDetails;
  isReversed?: boolean;
}

const EventSection: React.FC<EventSectionProps> = ({ id, data, isReversed = false }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

  const handleShare = async () => {
    // Try native sharing first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: `Venha celebrar conosco no ${data.locationName}!`,
          url: data.mapUrl
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      // Fallback: Copy to clipboard or open in new tab
      try {
        await navigator.clipboard.writeText(data.mapUrl);
        setShowCopiedTooltip(true);
        setTimeout(() => setShowCopiedTooltip(false), 2000);
      } catch (err) {
        window.open(data.mapUrl, '_blank');
      }
    }
  };

  // Construct iframe source for search based map
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(data.locationName + ' ' + (data.address || ''))}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const initialEvent = id.includes('religiosa') || id.includes('religious') ? 'religious' : 'festive';

  return (
    <section id={id} className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden relative">
      <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${isReversed ? 'md:flex-row-reverse' : ''}`}>

        {/* Image Container with Organic Shape */}
        <div className="w-full md:w-1/2 relative group">
          <div className={`absolute inset-0 border-2 border-wedding-green/30 transform transition-transform duration-500 group-hover:scale-105 ${isReversed ? 'rotate-3 rounded-tl-[4rem] rounded-br-[4rem]' : '-rotate-3 rounded-tr-[4rem] rounded-bl-[4rem]'}`}></div>
          <img
            src={data.image}
            alt={data.title}
            className={`w-full h-[500px] object-cover shadow-2xl relative z-10 ${isReversed ? 'rounded-tl-[4rem] rounded-br-[4rem]' : 'rounded-tr-[4rem] rounded-bl-[4rem]'}`}
          />
        </div>

        {/* Content Container */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="font-serif text-5xl md:text-6xl text-wedding-green mb-6 relative inline-block">
            {data.title}
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-wedding-sage/60"></span>
          </h2>

          <div className="space-y-4 font-sans text-gray-600 text-lg leading-relaxed">
            {data.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-6">
            {/* Info Grid: Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center md:justify-start gap-4 text-wedding-green p-4 bg-white rounded-2xl shadow-sm border border-wedding-green/10">
                <Calendar className="w-6 h-6 flex-shrink-0 text-wedding-sage" />
                <span className="font-medium text-lg">{data.date}</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 text-wedding-green p-4 bg-white rounded-2xl shadow-sm border border-wedding-green/10">
                <Clock className="w-6 h-6 flex-shrink-0 text-wedding-sage" />
                <span className="font-medium text-lg">{data.time}</span>
              </div>
            </div>

            {/* Location Address Box */}
            <div className="w-full p-5 bg-white rounded-2xl shadow-sm border border-wedding-green/10 flex items-start gap-4 text-left">
              <MapPin className="w-8 h-8 flex-shrink-0 text-wedding-sage mt-1" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-wedding-green font-bold leading-none mb-2">
                  {data.locationName}
                </span>
                <span className="font-sans text-gray-600 text-base leading-relaxed">
                  {data.address || "Endereço disponível no mapa"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setIsRSVPModalOpen(true)}
                className="w-full flex items-center justify-center gap-3 py-5 bg-wedding-green text-white rounded-2xl shadow-xl hover:bg-wedding-darkGreen transition-all transform hover:-translate-y-1 font-bold uppercase text-xs tracking-[0.2em]"
              >
                <CheckCircle className="w-4 h-4 text-wedding-sage" />
                Confirmar Presença
              </button>

              <div className="grid grid-cols-2 gap-4">
                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="relative flex items-center justify-center gap-2 py-4 px-4 border border-wedding-green/30 rounded-xl text-wedding-green hover:bg-wedding-green/5 transition-all group overflow-hidden"
                >
                  <div className="relative z-10 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                    {showCopiedTooltip ? <Copy className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
                    {showCopiedTooltip ? "Copiado!" : "Compartilhar"}
                  </div>
                </button>

                {/* Open Map Modal Button */}
                <button
                  onClick={() => setIsMapOpen(true)}
                  className="flex items-center justify-center gap-2 py-4 px-4 bg-white border border-wedding-green/30 text-wedding-green rounded-xl hover:bg-wedding-green/5 transition-all font-bold uppercase text-[10px] tracking-widest"
                >
                  <MapIcon className="w-3 h-3" />
                  Ver Mapa
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-wedding-green/20 mt-6 inline-block w-full">
            <span className="font-serif italic text-2xl text-wedding-sage block mb-1">Traje</span>
            <span className="font-sans font-medium uppercase tracking-wide text-wedding-green">{data.attire}</span>
          </div>
        </div>
      </div>

      <RSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        initialEvent={initialEvent as any}
      />

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-wedding-darkGreen/80 backdrop-blur-sm"
            onClick={() => setIsMapOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-4 bg-wedding-green flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-bold tracking-wide">{data.locationName}</span>
              </div>
              <button
                onClick={() => setIsMapOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full h-[400px] md:h-[500px] bg-gray-100 relative">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title={data.locationName}
                src={mapSrc}
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            <div className="p-4 bg-gray-50 flex justify-end border-t border-gray-200">
              <a
                href={data.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-wedding-green text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:text-wedding-darkGreen"
              >
                Abrir no Google Maps App <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventSection;
