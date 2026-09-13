import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CoreActions from './components/CoreActions';
import ManakBot from './components/ManakBot';
import ProductDiscovery from './components/ProductDiscovery';
import ComplianceChecker from './components/ComplianceChecker';
import ExploreStandards from './components/ExploreStandards';
import CostEstimatorSection from './components/CostEstimatorSection';
import ConsumerVerifier from './components/ConsumerVerifier';
import HowItWorks from './components/HowItWorks';
import AboutSection from './components/AboutSection';
import TrustSection from './components/TrustSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import StandardDetailModal from './components/StandardDetailModal';
import ReportModal from './components/ReportModal';
import ErrorBoundary from './components/ErrorBoundary';
import { BIS_STANDARDS } from './data/bisStandards';

export default function App() {
  const [activeMode, setActiveMode] = useState('msme'); // 'msme' | 'citizen'
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [activeComplianceProduct, setActiveComplianceProduct] = useState('');
  const [reportState, setReportState] = useState({
    isOpen: false,
    identifier: '',
    category: ''
  });

  const handleToggleMode = (newMode) => {
    setActiveMode(newMode);
    if (newMode === 'citizen') {
      handleScrollToSection('consumer-check');
    } else {
      handleScrollToSection('discovery');
    }
  };

  const handleOpenStandard = (std) => {
    if (!std) {
      setSelectedStandard(BIS_STANDARDS[0]);
      return;
    }
    const code = (std.isCode || std.is_number || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = BIS_STANDARDS.find(s => {
      const sCode = s.isCode.toLowerCase().replace(/[^a-z0-9]/g, '');
      return sCode === code || (code.length > 3 && (sCode.includes(code) || code.includes(sCode)));
    });
    if (found) {
      setSelectedStandard({ ...found, ...std, isCode: found.isCode, title: std.title || found.title });
    } else {
      setSelectedStandard(std);
    }
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

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAskBot = (promptQuery = '') => {
    handleScrollToSection('assistant');
    if (promptQuery) {
      setTimeout(() => {
        const textarea = document.querySelector('#assistant textarea');
        if (textarea) {
          textarea.value = promptQuery;
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
          textarea.focus();
        }
      }, 400);
    }
  };

  const handleCheckCompliance = (productOrCode = '') => {
    if (productOrCode) {
      setActiveComplianceProduct(productOrCode);
    }
    handleScrollToSection('compliance');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-emerald-600 selection:text-white antialiased">
      {/* 1. Navbar */}
      <Navbar 
        activeMode={activeMode}
        onToggleMode={handleToggleMode}
        onAskBot={() => handleScrollToSection('assistant')}
        onOpenReport={() => handleOpenReport()} 
      />

      {/* 2. Hero with Instant Search & Live Result */}
      <Hero 
        onOpenStandard={handleOpenStandard} 
        onAskQuestion={handleAskBot} 
        onExploreStandards={() => handleScrollToSection('standards')}
        onSwitchMode={handleToggleMode}
      />

      {/* 3. Core Tools Section (4 Distinct Actions) */}
      <CoreActions
        onAskBot={() => handleScrollToSection('assistant')}
        onFindStandards={() => handleScrollToSection('discovery')}
        onComplianceCheck={() => handleScrollToSection('compliance')}
        onUnderstandStandard={() => handleScrollToSection('standards')}
      />

      {/* 4. Dedicated AI Regulatory Assistant (ManakBot) */}
      <ManakBot
        onOpenStandard={handleOpenStandard}
        onCheckCompliance={handleCheckCompliance}
      />

      {/* 5. Product → Standard Discovery Workflow */}
      <ProductDiscovery
        onOpenStandard={handleOpenStandard}
        onCheckCompliance={handleCheckCompliance}
        onAskBot={handleAskBot}
      />

      {/* 6. Interactive 7-Stage Compliance Roadmap */}
      <ComplianceChecker
        initialProduct={activeComplianceProduct}
        onOpenStandard={handleOpenStandard}
        onAskBot={handleAskBot}
      />

      {/* 7. Complete Standards Directory & Search (572+ IS Standards) */}
      <ExploreStandards 
        onSelectStandard={handleOpenStandard} 
        onAskBot={handleAskBot}
        onCheckCompliance={handleCheckCompliance}
      />

      {/* 8. Statutory Cost Estimator & MSME Concessions */}
      <CostEstimatorSection />

      {/* 9. Consumer Verification Tool (Gold HUID & ISI CML Checker) */}
      <ConsumerVerifier 
        onOpenReport={handleOpenReport} 
      />

      {/* 10. How It Works (4 Clear Linear Steps) */}
      <HowItWorks />

      {/* 11. About ManakSetu (Bridging Industry & Standards) */}
      <AboutSection />

      {/* 12. Trust & Statutory Transparency */}
      <TrustSection />

      {/* 13. Useful FAQs */}
      <FAQSection />

      {/* 14. Final Call to Action */}
      <FinalCTA onGetStarted={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      {/* 15. Footer */}
      <Footer onOpenReport={() => handleOpenReport()} />

      {/* Standard Full Detail Modal */}
      {selectedStandard && (
        <ErrorBoundary onReset={() => setSelectedStandard(null)}>
          <StandardDetailModal
            standard={selectedStandard}
            onClose={() => setSelectedStandard(null)}
            onAskBot={handleAskBot}
            onCheckCompliance={handleCheckCompliance}
          />
        </ErrorBoundary>
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
