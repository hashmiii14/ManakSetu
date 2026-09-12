import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreActions from './components/CoreActions';
import ExploreStandards from './components/ExploreStandards';
import CostEstimatorSection from './components/CostEstimatorSection';
import AssistantSection from './components/AssistantSection';
import ConsumerVerifier from './components/ConsumerVerifier';
import StandardDetailModal from './components/StandardDetailModal';
import ReportModal from './components/ReportModal';
import HowItWorks from './components/HowItWorks';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import { BIS_STANDARDS } from './data/bisStandards';

export default function App() {
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [reportState, setReportState] = useState({
    isOpen: false,
    identifier: '',
    category: ''
  });

  const handleOpenStandard = (std) => {
    setSelectedStandard(std || BIS_STANDARDS[0]);
  };

  const handleOpenReport = (identifier = '', category = '') => {
    setReportState({
      isOpen: true,
      identifier: identifier || '',
      category: category || 'Suspected Counterfeit ISI Mark'
    });
  };

  const handleCloseReport = () => {
    setReportState(prev => ({ ...prev, isOpen: false }));
  };

  const handleScrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToCostEstimator = () => {
    const el = document.getElementById('cost-estimator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
      <Navbar 
        onGetStarted={handleScrollToHero} 
        onOpenReport={() => handleOpenReport()} 
      />

      {/* 2. Hero with Instant Search & Live Result */}
      <Hero 
        onOpenStandard={handleOpenStandard} 
        onAskQuestion={handleScrollToAssistant} 
      />

      {/* 3. Core Actions ("What would you like to do?") */}
      <CoreActions
        onFindStandard={handleScrollToHero}
        onCalculateCost={handleScrollToCostEstimator}
        onAskQuestion={handleScrollToAssistant}
        onVerifyConsumer={handleScrollToConsumer}
        onBrowseAll={handleScrollToStandards}
        onOpenReport={() => handleOpenReport()}
      />

      {/* 4. Complete Standards Directory & Search */}
      <ExploreStandards 
        onSelectStandard={handleOpenStandard} 
      />

      {/* 5. Statutory Cost Estimator & MSME Concessions */}
      <CostEstimatorSection />

      {/* 6. Dedicated AI Regulatory Assistant (ManaKBot) */}
      <AssistantSection 
        onSelectStandard={handleOpenStandard} 
      />

      {/* 7. Consumer Verification Tool (Gold HUID & ISI CML Checker) */}
      <ConsumerVerifier 
        onOpenReport={handleOpenReport} 
      />

      {/* 8. How It Works (4 Clear Linear Steps) */}
      <HowItWorks />

      {/* 9. Trust & Statutory Transparency */}
      <TrustSection />

      {/* 10. Useful FAQs */}
      <FAQSection />

      {/* 11. Final Call to Action */}
      <FinalCTA onGetStarted={handleScrollToHero} />

      {/* 12. Footer */}
      <Footer onOpenReport={() => handleOpenReport()} />

      {/* Standard Full Detail Modal */}
      {selectedStandard && (
        <StandardDetailModal
          standard={selectedStandard}
          onClose={() => setSelectedStandard(null)}
        />
      )}

      {/* Violation Report Modal */}
      <ReportModal
        isOpen={reportState.isOpen}
        initialIdentifier={reportState.identifier}
        initialCategory={reportState.category}
        onClose={handleCloseReport}
      />
    </div>
  );
}
