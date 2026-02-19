
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import RSVPModal from './RSVPModal';

const FestiveSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12 py-8 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h3 className="text-4xl font-serif text-emerald-900">Cerimônia & Festa</h3>
        <p className="text-gray-600 text-lg">
          "Convidamos você para celebrar conosco o nosso casamento, em um dia pensado para ser vivido com presença, afeto e celebração."
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[3rem] bg-emerald-900 text-white p-6 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
            <path d="M30 10 Q 50 10, 50 30 T 70 50 T 50 70 T 30 50 T 50 30" />
          </svg>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-emerald-300 font-medium tracking-widest uppercase text-xs">A Celebração Principal</p>
              <h4 className="text-5xl font-serif">Veleiros do Sul</h4>
              <p className="text-emerald-100/80 leading-relaxed">
                A cerimônia e a festa acontecerão no sábado, a partir das 16h30. Será um momento especial, reunindo cerimônia e festa em um só lugar.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-emerald-400" />
                <span className="text-sm font-medium tracking-widest uppercase">18 de Abril de 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-emerald-400" />
                <span className="text-sm font-medium tracking-widest uppercase text-emerald-200">Traje: Social Completo</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-white text-emerald-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-50 transition-all active:scale-95 shadow-xl group"
              >
                <span>Confirmar Presença</span>
                <CheckCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </button>

              <a
                href="https://www.google.com/maps/place/Veleiros+do+Sul/@-30.0975023,-51.2589328,17z/data=!3m1!4b1!4m6!3m5!1s0x9519820471c941c5:0xe388c795d9812f07!8m2!3d-30.097507!4d-51.2563579!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-800/50 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-800 transition-colors border border-emerald-700/50"
              >
                Como Chegar
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
              </a>
            </div>
          </div>

          <div className="organic-shape overflow-hidden h-[400px] border-4 border-emerald-800/50 shadow-2xl">
            <img src="/assets/v-2.jpeg" alt="Venue" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <RSVPModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEvent="festive"
      />
    </div>
  );
};

export default FestiveSection;

