import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventSection from './components/EventSection';
import MomentsSection from './components/MomentsSection';
import GiftSection from './components/GiftSection';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import { RELIGIOUS_CEREMONY, FESTIVE_CEREMONY } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-wedding-green selection:text-white">
      <Navbar />
      <Hero />

      <main>
        <EventSection
          id="cerimonia-religiosa"
          data={RELIGIOUS_CEREMONY}
        />

        <EventSection
          id="cerimonia-festiva"
          data={FESTIVE_CEREMONY}
          isReversed={true}
        />

        <MomentsSection />

        <GiftSection />

        <Guestbook />
      </main>

      <Footer />
    </div>
  );
};

export default App;