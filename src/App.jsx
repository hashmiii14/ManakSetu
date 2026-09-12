import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreActions from './components/CoreActions';
import AssistantSection from './components/AssistantSection';
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

  const handleGetStarted = () => {
    const el = document.getElementById('assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('assistant-input');
      if (input) input.focus();
    }
  };

  const handleHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFindStandard = () => {
    const el = document.getElementById('standards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnderstandRequirements = () => {
    // Open the featured standard (Electric Geysers IS 2082)
    setSelectedStandard(BIS_STANDARDS[0]);
  };

  const handleGetGuidance = () => {
    // Open another popular standard (Packaged Water IS 14543)
    setSelectedStandard(BIS_STANDARDS[1]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-600 selection:text-white antialiased">
      {/* 1. Clean Navbar */}
      <Navbar onGetStarted={handleGetStarted} />

      {/* 2. Hero Section */}
      <Hero 
        onGetStarted={handleGetStarted} 
        onHowItWorks={handleHowItWorks} 
      />

      {/* 3. Core Actions ("What can you do?") */}
      <CoreActions
        onAskQuestion={handleGetStarted}
        onFindStandard={handleFindStandard}
        onUnderstandRequirements={handleUnderstandRequirements}
        onGetGuidance={handleGetGuidance}
      />

      {/* 4. Dedicated Assistant Section */}
      <AssistantSection 
        onSelectStandard={(std) => setSelectedStandard(std)} 
      />

      {/* 5. Explore Standards Section */}
      <ExploreStandards 
        onSelectStandard={(std) => setSelectedStandard(std)} 
      />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Trust & Transparency */}
      <TrustSection />

      {/* 8. FAQ Section */}
      <FAQSection />

      {/* 9. Final Call to Action */}
      <FinalCTA onGetStarted={handleGetStarted} />

      {/* 10. Clean Footer */}
      <Footer />

      {/* Standard Detail Modal */}
      {selectedStandard && (
        <StandardDetailModal
          standard={selectedStandard}
          onClose={() => setSelectedStandard(null)}
        />
      )}
    </div>
  );
}
