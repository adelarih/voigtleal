import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventSection } from './components/EventSection';
import { GiftList } from './components/GiftList';
import { Guestbook } from './components/Guestbook';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cubes font-sans text-stone-800 overflow-x-hidden selection:bg-wedding-green selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <EventSection />
        <GiftList />
        <Guestbook />
      </main>
      <Footer />
    </div>
  );
}

export default App;
