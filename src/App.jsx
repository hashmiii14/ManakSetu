import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StandardDetailModal from './components/StandardDetailModal';
import ReportModal from './components/ReportModal';
import ErrorBoundary from './components/ErrorBoundary';
import { useRouter } from './context/RouterContext';
import { BIS_STANDARDS } from './data/bisStandards';

// Pages
import HomePage from './pages/HomePage';
import StandardsSearchPage from './pages/StandardsSearchPage';
import StandardDetailPage from './pages/StandardDetailPage';
import ManakBotPage from './pages/ManakBotPage';
import ServicesPage from './pages/ServicesPage';
import ConsumerPage from './pages/ConsumerPage';
import MsmePage from './pages/MsmePage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';

export default function App() {
  const { path, navigate } = useRouter();
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [reportState, setReportState] = useState({
    isOpen: false,
    identifier: '',
    category: ''
  });

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

  // Route Resolution
  const renderCurrentPage = () => {
    const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

    if (normalizedPath === '/' || normalizedPath === '') {
      return <HomePage onOpenStandard={handleOpenStandard} onOpenReport={handleOpenReport} />;
    }

    if (normalizedPath === '/standards/search' || normalizedPath.startsWith('/standards/search')) {
      return <StandardsSearchPage onOpenStandardModal={handleOpenStandard} />;
    }

    if (normalizedPath.startsWith('/standards/')) {
      return <StandardDetailPage />;
    }

    if (normalizedPath === '/manakbot' || normalizedPath.startsWith('/manakbot')) {
      return (
        <ManakBotPage 
          onOpenStandard={handleOpenStandard} 
          onCheckCompliance={() => navigate('/services')} 
        />
      );
    }

    if (normalizedPath === '/services') {
      return <ServicesPage />;
    }

    if (normalizedPath === '/consumer') {
      return <ConsumerPage onOpenReport={handleOpenReport} />;
    }

    if (normalizedPath === '/msme') {
      return <MsmePage />;
    }

    if (normalizedPath === '/news') {
      return <NewsPage />;
    }

    if (normalizedPath === '/about') {
      return <AboutPage />;
    }

    if (normalizedPath === '/faq') {
      return <FaqPage />;
    }

    // Default Fallback
    return <HomePage onOpenStandard={handleOpenStandard} onOpenReport={handleOpenReport} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans antialiased selection:bg-saffron-500 selection:text-white">
      {/* 1. Global Government-Grade Header */}
      <Header />

      {/* 2. Main Page Content View */}
      <main className="flex-1 flex flex-col">
        <ErrorBoundary>
          {renderCurrentPage()}
        </ErrorBoundary>
      </main>

      {/* 3. Global Statutory Footer */}
      <Footer onOpenReport={() => handleOpenReport()} />

      {/* Standard Detail Modal */}
      {selectedStandard && (
        <ErrorBoundary onReset={() => setSelectedStandard(null)}>
          <StandardDetailModal
            standard={selectedStandard}
            onClose={() => setSelectedStandard(null)}
            onAskBot={(promptQuery) => {
              setSelectedStandard(null);
              navigate(`/manakbot?prompt=${encodeURIComponent(promptQuery || '')}`);
            }}
            onCheckCompliance={() => {
              setSelectedStandard(null);
              navigate('/services');
            }}
          />
        </ErrorBoundary>
      )}

      {/* Statutory Violation Report Modal */}
      <ReportModal
        isOpen={reportState.isOpen}
        initialIdentifier={reportState.identifier}
        initialCategory={reportState.category}
        onClose={handleCloseReport}
      />
    </div>
  );
}
