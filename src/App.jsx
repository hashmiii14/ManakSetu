import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreActions from './components/CoreActions';
import AssistantSection from './components/AssistantSection';
import ConsumerVerifier from './components/ConsumerVerifier';
import ExploreStandards from './components/ExploreStandards';
import StandardDetailModal from './components/StandardDetailModal';
import HowItWorks from './components/HowItWorks';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { BIS_STANDARDS } from './data/bisStandards';

export default function App() {
  const [selectedStandard, setSelectedStandard] = useState(null);

  const handleOpenStandard = (std) => {
    setSelectedStandard(std || BIS_STANDARDS[0]);
  };

  const handleScrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToAssistant = () => {
    const el = document.getElementById('assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('assistant-input');
      if (input) input.focus();
    }
  };

  const handleScrollToConsumer = () => {
    const el = document.getElementById('consumer-check');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToStandards = () => {
    const el = document.getElementById('standards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-600 selection:text-white antialiased">
      {/* 1. Navbar */}
      <Navbar onGetStarted={handleScrollToHero} />

      {/* 2. Hero with Instant Search & Live Result (Immediate clarity on first screen) */}
      <Hero 
        onOpenStandard={handleOpenStandard} 
        onAskQuestion={handleScrollToAssistant} 
      />

      {/* 3. Core Actions ("What would you like to do?") */}
      <CoreActions
        onFindStandard={handleScrollToHero}
        onAskQuestion={handleScrollToAssistant}
        onVerifyConsumer={handleScrollToConsumer}
        onBrowseAll={handleScrollToStandards}
      />

      {/* 4. Dedicated AI Regulatory Assistant with 1-Click Questions */}
      <AssistantSection />

      {/* 5. Consumer Verification Tool (Gold HUID & ISI CML Checker) */}
      <ConsumerVerifier />

      {/* 6. Complete Standards Directory & Search */}
      <ExploreStandards 
        onSelectStandard={handleOpenStandard} 
      />

      {/* 7. How It Works (4 Clear Linear Steps) */}
      <HowItWorks />

      {/* 8. Trust & Statutory Transparency */}
      <TrustSection />

      {/* 9. Useful FAQs */}
      <FAQSection />

      {/* 10. Final Call to Action */}
      <FinalCTA onGetStarted={handleScrollToHero} />

      {/* 11. Footer */}
      <Footer />

      {/* Standard Full Detail Modal */}
      {selectedStandard && (
        <StandardDetailModal
          standard={selectedStandard}
          onClose={() => setSelectedStandard(null)}
        />
      )}
    </div>
  );
}
