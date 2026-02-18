
import React from 'react';
import { GIFTS } from '../constants';

const GiftsSection: React.FC = () => {
  return (
    <div className="space-y-12 py-8 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h3 className="text-4xl font-serif text-emerald-900">Lista de Presentes</h3>
        <p className="text-gray-600 text-lg">
          Para nós, sua presença é o maior presente. Caso queira nos presentear de forma criativa, selecionamos algumas opções divertidas:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GIFTS.map((gift) => (
          <div
            key={gift.id}
            className="group bg-white p-6 rounded-3xl border border-emerald-50 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="aspect-square w-full bg-emerald-50 rounded-2xl overflow-hidden flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                {gift.image ? (
                  <img src={gift.image} alt={gift.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                )}
              </div>
              <h4 className="text-xl font-serif text-emerald-900 leading-snug h-14 overflow-hidden">{gift.title}</h4>
            </div>
            <div className="mt-6 pt-6 border-t border-emerald-50 flex items-center justify-between">
              <span className="text-emerald-700 font-semibold text-lg">{gift.price}</span>
              <button className="bg-emerald-800 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-900 transition-colors shadow-sm active:scale-95 transition-transform">
                Presentear
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 rounded-3xl p-8 text-center border border-emerald-100">
        <p className="text-emerald-900 font-medium mb-4">Prefere fazer uma transferência direta?</p>
        <p className="text-emerald-600 text-sm font-bold tracking-wider">Chave PIX: 01962706001</p>
      </div>
    </div>
  );
};

export default GiftsSection;
