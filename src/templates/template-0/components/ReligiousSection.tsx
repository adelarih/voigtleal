
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import RSVPModal from './RSVPModal';

const ReligiousSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-12 py-8 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h3 className="text-4xl font-serif text-emerald-900">Cerimônia Religiosa</h3>
        <p className="text-gray-600 text-lg">
          "Com alegria, convidamos você para a celebração do nosso casamento religioso, um momento íntimo e cheio de significado para nós."
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl shadow-xl border border-emerald-50">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-900 uppercase tracking-wider text-sm mb-1">Data & Hora</h4>
              <p className="text-gray-700">16 de Abril de 2026 às 19:00</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-900 uppercase tracking-wider text-sm mb-1">Local</h4>
              <p className="text-gray-700 font-medium">Paróquia Sagrado Coração de Jesus</p>
              <p className="text-gray-500 text-sm">Rua Padre João Batista Reus, 1133 - Tristeza, Porto Alegre - RS, 91920-000</p>
              <a
                href="https://www.google.com/maps/place/Igreja+do+Sagrado+Cora%C3%A7%C3%A3o+de+Jesus/@-30.1164978,-51.2534101,17z/data=!3m1!4b1!4m6!3m5!1s0x9519823a92384a8d:0xf53c6cadbe0cd40c!8m2!3d-30.1165025!4d-51.2508352!16s%2Fg%2F1ptwjqqff?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-emerald-600 hover:text-emerald-800 font-medium text-sm underline underline-offset-4"
              >
                Ver no Mapa
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18H6zM6 10h12M6 15h12M9 10v11M15 10v11" /></svg>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-900 uppercase tracking-wider text-sm mb-1">Traje</h4>
              <p className="text-gray-700">Esporte Fino</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex flex-col justify-center items-center text-center">
          <h4 className="text-2xl font-serif text-emerald-900 mb-4">Pós-Cerimônia</h4>
          <p className="text-gray-600 italic mb-6">
            "Após a celebração, receberemos os convidados para um breve brinde em nossa casa, na Av. Belém Velho, 4139."
          </p>
          <div className="flex justify-center">
            <div className="organic-shape w-24 h-24 bg-emerald-200/50 flex items-center justify-center p-5">
              <img src="/src/assets/logo-3x1.png" alt="Monograma" className="w-full h-auto object-contain opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-900 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-emerald-800 shadow-xl shadow-emerald-900/20 transition-all active:scale-95 flex items-center justify-center gap-3 group"
        >
          <span>Confirmar Presença</span>
          <CheckCircle className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <RSVPModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEvent="religious"
      />
    </div>
  );
};

export default ReligiousSection;

