import React, { useState } from 'react';
import { MapPin, Calendar, Shirt, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import RSVPModal from '../components/RSVPModal';

const Religious: React.FC = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <header className="mb-4 lg:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-emerald-950">Cerimônia Religiosa</h2>
        <div className="w-12 h-1 bg-emerald-800 mt-2"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start overflow-hidden">
        <div className="space-y-4">
          <p className="text-sm md:text-base text-slate-600 leading-relaxed italic border-l-2 border-emerald-100 pl-4 py-1">
            "Um momento íntimo e cheio de significado para nós."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50">
              <div className="shrink-0 p-2 bg-emerald-50 rounded-full text-emerald-800">
                <Calendar size={14} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Data</h4>
                <p className="text-slate-800 text-xs font-semibold truncate">16 Abr, 19:00h</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50">
              <div className="shrink-0 p-2 bg-emerald-50 rounded-full text-emerald-800">
                <Shirt size={14} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Traje</h4>
                <p className="text-slate-800 text-xs font-semibold truncate">Esporte Fino</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-50 col-span-full">
              <div className="shrink-0 p-2 bg-emerald-50 rounded-full text-emerald-800 mt-1">
                <MapPin size={14} />
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Local</h4>
                <p className="text-slate-800 text-xs font-semibold leading-tight">Paróquia Sagrado Coração de Jesus</p>
                <a
                  href="https://www.google.com/maps/place/Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus/@-30.1164978,-51.2534101,17z/data=!3m1!4b1!4m6!3m5!1s0x9519823a92384a8d:0xf53c6cadbe0cd40c!8m2!3d-30.1165025!4d-51.2508352!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 text-[10px] font-bold hover:underline mt-1 inline-block"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-xl border-l-4 border-emerald-800">
            <h4 className="font-serif text-sm font-bold text-emerald-900">Pós-Cerimônia</h4>
            <p className="text-slate-600 text-[11px] leading-snug">
              Brinde em nossa casa: Av. Belém Velho, 4139.
            </p>
          </div>

          <button
            onClick={() => setIsRSVPOpen(true)}
            className="w-full py-4 bg-emerald-950 text-white rounded-xl shadow-lg hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px]"
          >
            <CheckCircle size={16} className="text-emerald-400" />
            Confirmar Presença
          </button>
        </div>

        <div className="block relative h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl overflow-hidden shadow-lg h-[320px] w-full"
          >
            <img
              src="/src/assets/v-2.jpeg"
              alt="Igreja"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        initialEvent="religious"
      />
    </div>
  );
};

export default Religious;
