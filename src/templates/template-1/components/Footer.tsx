import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-wedding-darkGreen text-wedding-lightGreen/80 py-16 font-sans border-t border-wedding-green/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo-3x1.png"
                alt="Celina & Eduardo Logo"
                className="h-16 md:h-28 object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Celebrando o amor e a união de Celina Bins Voigt e Eduardo Coelho Leal. Obrigado por fazer parte da nossa história.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-wedding-sage transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('cerimonia-religiosa')} className="hover:text-wedding-sage transition-colors">Cerimônia Religiosa</button></li>
              <li><button onClick={() => scrollToSection('cerimonia-festiva')} className="hover:text-wedding-sage transition-colors">Cerimônia Festiva</button></li>
              <li><button onClick={() => scrollToSection('momentos')} className="hover:text-wedding-sage transition-colors">Momentos</button></li>
              <li><button onClick={() => scrollToSection('traje')} className="hover:text-wedding-sage transition-colors">Traje</button></li>
              <li><button onClick={() => scrollToSection('lista-presentes')} className="hover:text-wedding-sage transition-colors">Lista de Presentes</button></li>
              <li><button onClick={() => scrollToSection('recados')} className="hover:text-wedding-sage transition-colors">Recados</button></li>
            </ul>
          </div>

          {/* Column 3: Event Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Eventos</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="text-white/50 text-xs uppercase">Religioso</span>
                <span className="text-white/90">Paróquia Sagrado Coração</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/50 text-xs uppercase">Recepção</span>
                <span className="text-white/90">Av. Belém Velho, 4139</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/50 text-xs uppercase">Festiva</span>
                <span className="text-white/90">Veleiros do Sul</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-wedding-lightGreen/20 w-full mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© 2026 Casamento C&E. Todos os direitos reservados.</p>

          <div className="flex items-center gap-1">
            <span>Desenvolvido por</span>
            <a
              href="https://topstack.com.br?utm_source=casamento-voigtleal&utm_medium=software_branding&utm_campaign=dev_by_topstack"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors duration-300 text-white/80 hover:text-[#78A083] active:text-[#78A083] uppercase tracking-wide"
            >
              TOPSTACK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
