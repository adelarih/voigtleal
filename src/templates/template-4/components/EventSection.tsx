import React, { useState } from 'react';
import { MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';
import { CollageWrapper } from './CollageWrapper';
import { LINKS } from '../constants';
import RSVPModal from './RSVPModal';

export const EventSection: React.FC = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [rsvpType, setRsvpType] = useState<'religious' | 'festive'>('religious');

  const openRSVP = (type: 'religious' | 'festive') => {
    setRsvpType(type);
    setIsRSVPOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-20 space-y-32">

      {/* Religious Ceremony */}
      <section id="religioso" className="relative scroll-mt-32">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">

          <div className="w-full md:w-1/2 flex justify-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-green/20 rounded-full blur-2xl -z-10"></div>

            <CollageWrapper rotation="-rotate-1" className="max-w-md w-full" tape>
              <div className="border-2 border-stone-200 p-6 m-1">
                <h2 className="font-serif text-3xl text-wedding-green mb-6 text-center italic">Cerimônia Religiosa</h2>

                <p className="font-sans text-stone-600 text-center mb-8 leading-relaxed">
                  Com alegria, convidamos você para a celebração do nosso casamento religioso,
                  um momento íntimo e cheio de significado para nós.
                </p>

                <div className="space-y-4 font-sans text-stone-700">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-wedding-sage" />
                    <span className="font-bold">16 de Abril de 2026 (Quinta-feira)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-wedding-sage" />
                    <span>19:00 horas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-wedding-sage mt-1" />
                    <div>
                      <span className="font-bold block">Paróquia Sagrado Coração de Jesus</span>
                      <span className="text-sm text-stone-500">Rua Padre João Batista Reus, 1133 - Tristeza, POA</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200">
                  <p className="text-sm text-stone-600 mb-2">
                    <span className="font-bold text-wedding-green">Pós-Cerimônia:</span> Após a celebração, receberemos os convidados para um breve brinde em nossa casa, na Av. Belém Velho, 4139.
                  </p>
                  <p className="text-sm text-stone-600">
                    <span className="font-bold text-wedding-green">Traje:</span> Esporte Fino
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  <button
                    onClick={() => openRSVP('religious')}
                    className="flex items-center justify-center gap-2 bg-wedding-green text-white py-3 font-serif italic hover:bg-wedding-darkGreen transition-all shadow-md active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirmar Presença
                  </button>
                  <a
                    href={LINKS.churchMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-stone-100 text-stone-700 py-3 font-serif italic hover:bg-stone-200 transition-colors"
                  >
                    Ver no mapa
                  </a>
                </div>
              </div>
            </CollageWrapper>
          </div>

          {/* Visual Element for Church */}
          <div className="w-full md:w-1/3 flex justify-center md:block">
            <CollageWrapper rotation="rotate-3" noPadding>
              <img
                src="/assets/h-2.jpeg"
                alt="Igreja Interior"
                className="w-full h-80 object-cover"
              />
              <div className="p-2 text-center font-handwriting text-stone-400 text-sm">Sagrado Coração</div>
            </CollageWrapper>
          </div>

        </div>
      </section>

      {/* Festive Ceremony */}
      <section id="festa" className="relative scroll-mt-32">
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-12">

          <div className="w-full md:w-1/2 flex justify-center relative">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-wedding-sage/20 rounded-full blur-2xl -z-10"></div>
            <CollageWrapper rotation="rotate-1" className="max-w-md w-full" tape>
              <div className="bg-stone-50 p-6 m-1">
                <h2 className="font-serif text-3xl text-wedding-green mb-6 text-center italic">Cerimônia Festiva</h2>

                <p className="font-sans text-stone-600 text-center mb-8 leading-relaxed">
                  Convidamos você para celebrar conosco o nosso casamento, em um dia pensado para ser vivido com presença, afeto e celebração.
                  A cerimônia e a festa acontecerão no sábado, celebrando juntos esse novo capítulo.
                </p>

                <div className="space-y-4 font-sans text-stone-700">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-wedding-sage" />
                    <span className="font-bold">18 de Abril de 2026 (Sábado)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-wedding-sage" />
                    <span>16:30 horas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-wedding-sage mt-1" />
                    <div>
                      <span className="font-bold block">Veleiros do Sul</span>
                      <span className="text-sm text-stone-500">Av. Guaíba, 2941 - Vila Assunção, POA</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200">
                  <p className="text-sm text-stone-600">
                    <span className="font-bold text-wedding-green">Traje:</span> Social Completo / Passeio Completo
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  <button
                    onClick={() => openRSVP('festive')}
                    className="flex items-center justify-center gap-2 bg-wedding-green text-white py-3 font-serif italic hover:bg-wedding-darkGreen transition-all shadow-md active:scale-95"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirmar Presença
                  </button>
                  <a
                    href={LINKS.partyMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-stone-100 text-stone-700 py-3 font-serif italic hover:bg-stone-200 transition-colors"
                  >
                    Ver no mapa
                  </a>
                </div>
              </div>
            </CollageWrapper>
          </div>

          {/* Visual Element for Party */}
          <div className="w-full md:w-1/3 flex justify-center md:block">
            <CollageWrapper rotation="-rotate-2" noPadding>
              <img
                src="/assets/v-3.jpeg"
                alt="Festa ao ar livre"
                className="w-full h-80 object-cover"
              />
              <div className="p-2 text-center font-handwriting text-stone-400 text-sm">Veleiros do Sul</div>
            </CollageWrapper>
          </div>

        </div>
      </section>

      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        initialEvent={rsvpType}
      />

    </div>
  );
};
