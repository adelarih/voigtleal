
import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Shirt, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import RSVPModal from '../components/RSVPModal';

const Festive: React.FC = () => {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <header className="mb-4 lg:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-emerald-950">Cerimônia Festiva</h2>
        <div className="w-12 h-1 bg-emerald-800 mt-2"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        <div className="relative h-[250px] md:h-[300px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="organic-shape overflow-hidden shadow-lg h-full w-full"
          >
            <img
              src="/src/assets/v-3.jpeg"
              alt="Festa Veleiros"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed italic border-r-2 border-emerald-100 pr-4 text-right">
            "A cerimônia e a festa acontecerão no sábado, a partir das 16h30, no Veleiros do Sul."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-slate-50 rounded-xl shadow-sm">
              <Calendar className="text-emerald-800 mb-1 w-4 h-4" />
              <h4 className="text-[11px] font-bold text-slate-800">18 Abr 2026</h4>
              <p className="text-slate-400 text-[9px]">Sábado</p>
            </div>

            <div className="p-3 bg-white border border-slate-50 rounded-xl shadow-sm">
              <Clock className="text-emerald-800 mb-1 w-4 h-4" />
              <h4 className="text-[11px] font-bold text-slate-800">16:30h</h4>
              <p className="text-slate-400 text-[9px]">Início</p>
            </div>

            <div className="p-3 bg-emerald-900 text-white rounded-xl shadow-lg col-span-full flex items-center justify-between">
              <div>
                <h4 className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Traje Sugerido</h4>
                <p className="text-xs font-bold">Social Completo</p>
              </div>
              <Shirt className="w-4 h-4 opacity-50" />
            </div>

            <div className="p-3 bg-white border border-slate-50 rounded-xl shadow-sm col-span-full">
              <div className="flex items-center gap-2">
                <MapPin className="text-emerald-800 w-4 h-4 shrink-0" />
                <h4 className="text-xs font-bold text-slate-800">Veleiros do Sul</h4>
              </div>
              <p className="text-slate-400 text-[9px] mt-1 truncate">Av. Guaíba, 2941 - Vila Assunção, Porto Alegre</p>
              <a
                href="https://www.google.com/maps/place/Veleiros+do+Sul/@-30.0975023,-51.2589328,17z/data=!3m1!4b1!4m6!3m5!1s0x9519820471c941c5:0xe388c795d9812f07!8m2!3d-30.097507!4d-51.2563579!16s%2Fg%2F121k3mjw?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-800 text-[9px] font-bold hover:underline mt-1 inline-block"
              >
                Abrir Rota
              </a>
            </div>

            <button
              onClick={() => setIsRSVPOpen(true)}
              className="w-full py-4 bg-emerald-950 text-white rounded-xl shadow-lg hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[10px] col-span-full"
            >
              <CheckCircle size={16} className="text-emerald-400" />
              Confirmar Presença
            </button>
          </div>
        </div>
      </div>

      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        initialEvent="festive"
      />
    </div>
  );
};

export default Festive;
