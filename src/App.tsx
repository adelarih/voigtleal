import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useSearchParams, useParams } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import { TemplateProvider, useTemplate } from './context/TemplateContext';
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
      default: return <Template0 />;
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

  // Dynamic SEO & Favicon Logic
  useEffect(() => {
    if (clientSlug) {
      const originalTitle = document.title;
      const coupleName = clientSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      document.title = `${coupleName} | Casamento | TOPSTACK`;

      const head = document.head;
      const addedElements: HTMLElement[] = [];

      const setMeta = (name: string, content: string, isProperty = false) => {
        const attr = isProperty ? 'property' : 'name';
        let el = head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(attr, name);
          head.appendChild(el);
          addedElements.push(el);
        }
        el.content = content;
      };

      const setLink = (rel: string, href: string, type?: string, sizes?: string) => {
        let el = head.querySelector(`link[rel="${rel}"]${sizes ? `[sizes="${sizes}"]` : ''}`) as HTMLLinkElement;
        if (!el) {
          el = document.createElement('link');
          el.rel = rel;
          head.appendChild(el);
          addedElements.push(el);
        }
        el.href = href;
        if (type) el.type = type;
        if (sizes) el.sizes = sizes;
      };

      // TOPSTACK SEO Tags
      setMeta('description', 'Transforme seu negócio com a TOPSTACK. IA, automações e software sob medida para eliminar tarefas, otimizar marketing e trazer clareza com BI.');
      setMeta('keywords', 'Inteligência Artificial, Automações, Software Sob Medida, TOPSTACK');
      setMeta('author', 'TOPSTACK');
      setMeta('robots', 'index, follow');
      setMeta('theme-color', '#ffffff');

      // OG Tags
      setMeta('og:title', `${coupleName} | Convite de Casamento`, true);
      setMeta('og:description', 'Venha celebrar este momento especial conosco. Confira todos os detalhes em nosso site.', true);
      setMeta('og:image', ogImage, true);
      setMeta('og:type', 'website', true);

      // Twitter Tags
      setMeta('twitter:card', 'summary_large_image');
      setMeta('twitter:title', `${coupleName} | Convite de Casamento`);
      setMeta('twitter:image', ogImage);

      // Favicons (C&E Assets)
      setLink('icon', faviconSvg, 'image/svg+xml');
      setLink('icon', faviconIco, undefined, 'any');
      setLink('apple-touch-icon', appleTouchIcon);

      return () => {
        document.title = originalTitle;
        addedElements.forEach(el => head.removeChild(el));
      };
    }
  }, [clientSlug]);

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
      <div className="flex-1 h-full overflow-y-auto pl-[240px] transition-all duration-300 bg-white">
        <TemplateRenderer />
      </div>
    </div>
  );
};

// 3. Config Layout (Overlay/Stealth Sidebar - Default)
const ConfigLayout = () => {
  const { clientSlug, templateId } = useParams();
  const { activeTemplate, setActiveTemplate } = useTemplate();

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

  useEffect(() => {
    if (templateId) {
      setActiveTemplate(templateId);
    }
  }, [templateId, setActiveTemplate]);

  // Construct iframe source to ensure isolated viewport for responsiveness testing
  const iframeSrc = clientSlug
    ? `/${clientSlug}/${activeTemplate || 'template-0'}`
    : `/preview?template=${activeTemplate || 'template-0'}`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0f111a]">
      <Sidebar
        mode="overlay"
        currentDevice={deviceMode}
        onDeviceChange={handleDeviceChange}
      />
      {/*
          Main Content Area
          We adjust the container behavior based on device mode.
          Desktop: Full width/height (classic behavior)
          Mobile/Tablet: Centered with device frame simulation
      */}
      <div className={`w-full h-full pl-[80px] transition-all duration-300 ${deviceMode === 'desktop' ? 'bg-white overflow-hidden' : 'bg-gray-100 overflow-y-auto'}`}>
        <div className={`transition-all duration-300 ${deviceMode === 'desktop' ? 'h-full w-full' : 'min-h-full flex flex-col items-center justify-center py-12'}`}>
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
      </div>
    </div>
  );
};

function AppContent() {
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

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/config" replace />} />
      <Route path="*" element={<Navigate to="/config" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TemplateProvider>
        <AppContent />
      </TemplateProvider>
    </BrowserRouter>
  );
}

export default App;
