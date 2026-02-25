import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventSection from './components/EventSection';
import MomentsSection from './components/MomentsSection';
import GiftSection from './components/GiftSection';
import Guestbook from './components/Guestbook';
import AttireSection from './components/AttireSection';
import Footer from './components/Footer';
import { RELIGIOUS_CEREMONY, FESTIVE_CEREMONY } from './constants';
import { contentService, CeremonyText } from '../../services/contentService';

const App: React.FC = () => {
  const [ceremonyTexts, setCeremonyTexts] = React.useState<CeremonyText[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchTexts = async () => {
      try {
        const data = await contentService.getAll();
        setCeremonyTexts(data);
      } catch (err) {
        console.error('Failed to fetch ceremony texts', err);
      }
    };
    fetchTexts();
  }, []);

  const getEventData = (type: 'religiosa' | 'festiva', defaultData: any) => {
    const customText = ceremonyTexts.find(t => t.cerimonia.toLowerCase() === type);
    if (customText && customText.conteudo) {
      return { ...defaultData, description: customText.conteudo };
    }
    return defaultData;
  };
  const isReligiosoOnly = location.pathname === '/cerimonia-religiosa' || location.pathname === '/religioso';
  const isFestaOnly = location.pathname === '/cerimonia-festiva' || location.pathname === '/festa';
  const isGiftsOnly = ['/presentes', '/lista-de-presentes', '/listadepresentes'].includes(location.pathname);

  // Handle cross-page scrolling without hashes
  React.useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo && location.pathname === '/') {
      // Small delay to ensure the DOM is ready if we just navigated
      const timer = setTimeout(() => {
        const element = document.getElementById(state.scrollTo!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clear state to prevent scrolling again on refresh
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-wedding-green selection:text-white">
      <Navbar />
      <Hero />

      <main>
        {!isFestaOnly && !isGiftsOnly && (
          <EventSection
            id="cerimonia-religiosa"
            data={getEventData('religiosa', RELIGIOUS_CEREMONY)}
          />
        )}

        {!isReligiosoOnly && !isGiftsOnly && (
          <EventSection
            id="cerimonia-festiva"
            data={getEventData('festiva', FESTIVE_CEREMONY)}
            isReversed={true}
          />
        )}

        {/* Render AttireSection here - Now always after ceremonies or deep links */}
        {!isGiftsOnly && <AttireSection />}

        {!isGiftsOnly && <MomentsSection />}

        <GiftSection />

        {!isGiftsOnly && <Guestbook />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
