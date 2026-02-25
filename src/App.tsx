import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useSearchParams, useParams, useLocation } from 'react-router-dom';

import Sidebar from './components/common/Sidebar';
import DashboardHome from './components/common/DashboardHome';
import GuestbookManager from './components/common/GuestbookManager';
import RSVPManager from './components/common/RSVPManager';
import GiftsManager from './components/common/GiftsManager';
import ContentManager from './components/common/ContentManager';
import { TemplateProvider, useTemplate, templates } from './context/TemplateContext';
import { Menu, X, LayoutGrid, Check, ArrowRight, Smartphone, Tablet, Monitor } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Importação dinâmica dos templates originais (.tsx)
const Template0 = lazy(() => import('./templates/template-0/App'));
const Template1 = lazy(() => import('./templates/template-1/App'));
const Template2 = lazy(() => import('./templates/template-2/App'));
const Template3 = lazy(() => import('./templates/template-3/App'));
const Template4 = lazy(() => import('./templates/template-4/App'));
const Template5 = lazy(() => import('./templates/template-5/App'));
const Template6 = lazy(() => import('./templates/template-6/App'));

// Assets for SEO and Favicons
const faviconSvg = "/assets/favicon-ce/favicon.svg";
const faviconIco = "/assets/favicon-ce/favicon.ico";
const appleTouchIcon = "/assets/favicon-ce/apple-touch-icon.png";
const ogImage = "/assets/favicon-ce/ce-topstack-og-image-1200x630-cf.png";

const TemplateRenderer = () => {
  const { activeTemplate } = useTemplate();

  const renderContent = () => {
    switch (activeTemplate) {
      case 'template-0': return <Template0 />;
      case 'template-1': return <Template1 />;
      case 'template-2': return <Template2 />;
      case 'template-3': return <Template3 />;
      case 'template-4': return <Template4 />;
      case 'template-5': return <Template5 />;
      case 'template-6': return <Template6 />;
      default: return <Template1 />;
    }
  };

  return (
    <main className="relative w-full min-h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTemplate}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full min-h-full"
        >
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
              <img src="/favicon.ico" alt="Logo" className="w-16 h-16 mb-6 animate-pulse" />
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            {renderContent()}
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

// 1. Preview Layout (No Sidebar)
// URL: /:clientSlug/:templateId
const PreviewLayout = () => {
  const { clientSlug, templateId } = useParams();
  const { setActiveTemplate } = useTemplate();

  // Also support legacy query param ?template=... for generic /preview route
  const [searchParams] = useSearchParams();
  const queryTemplateParam = searchParams.get('template');

  useEffect(() => {
    // Priority: URL Param > Query Param
    const targetTemplate = templateId || queryTemplateParam;
    if (targetTemplate) {
      setActiveTemplate(targetTemplate);
    }
  }, [templateId, queryTemplateParam, setActiveTemplate]);

  return (
    <div className="w-full h-screen overflow-y-auto overflow-x-hidden">
      <TemplateRenderer />
    </div>
  );
};

// 2. Builder Layout (Fixed Sidebar)
const BuilderLayout = () => {
  // Optional: Extract params if needed for API calls in the future
  const { templateId } = useParams();
  const { setActiveTemplate } = useTemplate();

  useEffect(() => {
    if (templateId) {
      setActiveTemplate(templateId);
    }
  }, [templateId, setActiveTemplate]);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#0f111a]">
      <Sidebar mode="fixed" />
      <div className="flex-1 h-full overflow-y-auto pl-[270px] transition-all duration-300 bg-white">
        <TemplateRenderer />
      </div>
    </div>
  );
};

// 3. Config Layout (Overlay/Stealth Sidebar - Default)
const ConfigLayout = () => {
  const { clientSlug, templateId } = useParams();
  const { activeTemplate, setActiveTemplate } = useTemplate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for device mode preview
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    // Persist choice in localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedding_config_device_mode');
      return (saved as 'mobile' | 'tablet' | 'desktop') || 'desktop';
    }
    return 'desktop';
  });

  const handleDeviceChange = (mode: 'mobile' | 'tablet' | 'desktop') => {
    setDeviceMode(mode);
    localStorage.setItem('wedding_config_device_mode', mode);
  };

  // Track if we are in management mode (showing a panel)
  const [activePanel, setActivePanel] = useState<string | null>('dashboard');

  useEffect(() => {
    if (templateId) {
      setActiveTemplate(templateId);
    }
  }, [templateId, setActiveTemplate]);

  // Construct iframe source to ensure isolated viewport for responsiveness testing
  const iframeSrc = clientSlug
    ? `/${clientSlug}/${activeTemplate || 'template-1'}`
    : `/preview?template=${activeTemplate || 'template-1'}`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0f111a]">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-white/5 z-[80] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <img src="/favicon.ico" alt="Logo" className="w-5 h-5 object-contain" />
          </div>
          <span className="text-white font-bold tracking-tight">Studio</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white hover:text-wedding-sage transition-colors p-2"
        >
          <Menu size={24} />
        </button>
      </header>

      <Sidebar
        mode="overlay"
        currentDevice={deviceMode}
        onDeviceChange={handleDeviceChange}
        onPanelChange={(panel) => setActivePanel(panel)}
        activePanel={activePanel}
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      {/*
          Main Content Area
          We adjust the container behavior based on device mode.
          Desktop: Full width/height (classic behavior)
          Mobile/Tablet: Centered with device frame simulation
      */}
      <div className={`w-full h-full md:pl-[270px] pt-16 md:pt-0 transition-all duration-300 ${(deviceMode === 'desktop' && activePanel === 'templates') || activePanel === 'content' ? 'bg-white overflow-hidden' : 'bg-gray-100 overflow-y-auto'}`}>
        <div className={`transition-all duration-300 ${(deviceMode === 'desktop' && activePanel === 'templates') || activePanel === 'content' ? 'h-full w-full' : 'p-3 sm:p-6 md:p-12'}`}>


          {activePanel === 'templates' ? (
            <div className={`transition-all duration-300 ${deviceMode === 'desktop' ? 'h-full w-full' : 'flex flex-col items-center justify-center'}`}>
              <div
                className={`bg-white transition-all duration-500 shadow-2xl relative ${deviceMode === 'mobile' ? 'w-[399px] h-[812px] rounded-[3rem] border-[12px] border-gray-800' :
                  deviceMode === 'tablet' ? 'w-[792px] h-[1024px] rounded-[2rem] border-[12px] border-gray-800' :
                    'w-full h-full'
                  }`}
              >
                {/* Camera/Sensor Notch for Mobile/Tablet simulation */}
                {deviceMode !== 'desktop' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-800 z-50 rounded-b-2xl" />
                )}

                <div className={`w-full h-full ${deviceMode !== 'desktop' ? 'rounded-[2rem] overflow-hidden relative z-0' : ''}`}>
                  <iframe
                    key={iframeSrc} // Force re-mount on URL change to ensure clean state
                    src={iframeSrc}
                    className="w-full h-full border-0"
                    title="Template Preview"
                    style={{ backgroundColor: '#fff' }}
                  />
                </div>
              </div>
            </div>
          ) : activePanel === 'analytics' ? (
            <div className="max-w-6xl mx-auto bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm p-4 sm:p-8 border border-gray-100">
              <GuestbookManager />
            </div>
          ) : activePanel === 'rsvp' ? (
            <div className="max-w-6xl mx-auto bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm p-4 sm:p-8 border border-gray-100">
              <RSVPManager />
            </div>
          ) : activePanel === 'presents' ? (
            <div className="max-w-6xl mx-auto bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm p-4 sm:p-8 border border-gray-100">
              <GiftsManager />
            </div>
          ) : activePanel === 'content' ? (
            <ContentManager />
          ) : activePanel === 'templates_selector' ? (
            <div className="max-w-7xl mx-auto space-y-10 font-sans">
              <header className="border-b border-gray-100 pb-8">
                <h1 className="text-4xl font-serif text-wedding-green tracking-tight">Estilos de Convite</h1>
                <p className="text-gray-500 mt-2 text-lg font-light">Selecione a identidade visual que melhor reflete a essência do casal.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      setActiveTemplate(tpl.id);
                      setActivePanel('templates');
                    }}
                    className={`group relative text-left bg-white rounded-[2.5rem] p-8 border-2 transition-all hover:shadow-2xl hover:shadow-wedding-green/5 ${activeTemplate === tpl.id ? 'border-wedding-green shadow-wedding-green/10 shadow-xl' : 'border-gray-50 hover:border-wedding-sage/30'}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-wedding-lightGreen flex items-center justify-center group-hover:bg-wedding-green transition-colors">
                        <LayoutGrid className="text-wedding-green group-hover:text-white transition-colors" size={28} />
                      </div>
                      {activeTemplate === tpl.id && (
                        <div className="w-8 h-8 rounded-full bg-wedding-green flex items-center justify-center text-white shadow-lg shadow-wedding-green/20">
                          <Check size={18} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-serif text-wedding-green mb-2">{tpl.name}</h3>
                    <p className="text-gray-500 leading-relaxed mb-6 font-light">{tpl.description}</p>
                    <div className="flex items-center gap-2 font-bold text-wedding-sage uppercase text-[10px] tracking-[0.2em]">
                      Visualizar Modelo <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <DashboardHome onPanelChange={setActivePanel} />
          )}
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const params = useParams();

  // Dynamic SEO & Favicon Logic
  useEffect(() => {
    // Try to get clientSlug from params or parse from pathname
    // Pathname usually starts with /slug/template-id or /config/slug/...
    const pathParts = location.pathname.split('/').filter(Boolean);
    const clientSlugFromPath = pathParts[0] !== 'config' && pathParts[0] !== 'builder' && pathParts[0] !== 'preview' ? pathParts[0] : pathParts[1];
    const clientSlug = params.clientSlug || clientSlugFromPath;

    const isConfigPath = location.pathname.startsWith('/config') || location.pathname.startsWith('/builder');

    // Original metadata from index.html (Baseline)
    const originalTitle = "TOPSTACK | Soluções Inteligentes para Pequenas Empresas";
    const head = document.head;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      // Find existing or created
      let el = head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string, type?: string) => {
      // Find ALL links with this rel and update or remove them
      const existingIcons = head.querySelectorAll(`link[rel="${rel}"]`);

      // Update the first one, remove others
      if (existingIcons.length > 0) {
        const first = existingIcons[0] as HTMLLinkElement;
        first.href = href;
        if (type) first.type = type;

        for (let i = 1; i < existingIcons.length; i++) {
          head.removeChild(existingIcons[i]);
        }
      } else {
        const el = document.createElement('link');
        el.rel = rel;
        el.href = href;
        if (type) el.type = type;
        head.appendChild(el);
      }
    };

    if (isConfigPath) {
      // TOPSTACK SEO & Icons
      document.title = "TOPSTACK | Admin Panel";
      setLink('icon', '/favicon.ico', 'image/x-icon');
      setLink('apple-touch-icon', '/apple-touch-icon.png');

      setMeta('description', 'Painel administrativo TOPSTACK para gerenciamento de convites inteligentes.');
      setMeta('keywords', 'Admin, TOPSTACK, Management');
      setMeta('robots', 'noindex, nofollow');

      // OG Tags
      setMeta('og:title', 'TOPSTACK Admin', true);
      setMeta('og:image', '/favicon.ico', true);
    } else {
      // Wedding SEO & Icons
      const coupleName = clientSlug && clientSlug !== 'preview'
        ? clientSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : "Celina & Eduardo";

      document.title = `${coupleName} | Casamento | TOPSTACK`;

      // Wedding SEO Tags
      setMeta('description', `Acompanhe todos os detalhes do grande dia de ${coupleName}. Convite online, lista de presentes e confirmação de presença.`);
      setMeta('keywords', 'Casamento, Convite Online, Lista de Presentes, RSVP, Celina e Eduardo');
      setMeta('author', 'TOPSTACK');
      setMeta('robots', 'index, follow');
      setMeta('theme-color', '#ffffff');

      // OG Tags
      setMeta('og:title', `${coupleName} | Convite de Casamento`, true);
      setMeta('og:description', 'Venha celebrar este momento especial conosco. Confira todos os detalhes em nosso site.', true);
      setMeta('og:image', ogImage, true);
      setMeta('og:type', 'website', true);

      // Favicons (C&E Assets)
      setLink('icon', faviconSvg, 'image/svg+xml');
      setLink('icon', faviconIco);
      setLink('apple-touch-icon', appleTouchIcon);
    }

    return () => {
      document.title = originalTitle;
    };
  }, [location.pathname, params.clientSlug]);

  return (
    <Routes>
      {/* 
          Specific Routes with Client Slug & Template ID 
          Priority is important: Specific routes first.
      */}
      <Route path="/builder/:clientSlug/:templateId" element={<BuilderLayout />} />
      <Route path="/config/:clientSlug/:templateId" element={<ConfigLayout />} />

      {/* 
          The requested URL: /voigtleal/template-1 
          Maps to PreviewLayout (No Sidebar)
      */}
      <Route path="/:clientSlug/:templateId" element={<PreviewLayout />} />

      {/* Generic/Legacy Routes */}
      <Route path="/builder" element={<BuilderLayout />} />
      <Route path="/preview" element={<PreviewLayout />} />
      <Route path="/config" element={<ConfigLayout />} />
      <Route path="/religioso" element={<PreviewLayout />} />
      <Route path="/festa" element={<PreviewLayout />} />
      <Route path="/cerimonia-religiosa" element={<PreviewLayout />} />
      <Route path="/cerimonia-festiva" element={<PreviewLayout />} />
      <Route path="/presentes" element={<PreviewLayout />} />
      <Route path="/lista-de-presentes" element={<PreviewLayout />} />
      <Route path="/listadepresentes" element={<PreviewLayout />} />

      {/* Default Redirects */}
      <Route path="/" element={<PreviewLayout />} />
      <Route path="*" element={<Navigate to="/config" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <TemplateProvider>
        <AppContent />
      </TemplateProvider>
    </BrowserRouter>
  );
}

export default App;
