import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuickPitchBanner from './components/QuickPitchBanner';
import IndustryPortal from './components/IndustryPortal';
import ConsumerPortal from './components/ConsumerPortal';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import Footer from './components/Footer';

export default function App() {
  const [currentPersona, setCurrentPersona] = useState('industry'); // 'industry' | 'consumer'
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [pitchTriggerQuery, setPitchTriggerQuery] = useState('');

  const handleSelectDemo = (query) => {
    setCurrentPersona('industry');
    setPitchTriggerQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPersona={currentPersona}
        setCurrentPersona={setCurrentPersona}
        lang={lang}
        setLang={setLang}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
      />

      {/* Jury Quick-Demo Banner */}
      <QuickPitchBanner
        onSelectDemo={handleSelectDemo}
        lang={lang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {currentPersona === 'industry' ? (
          <IndustryPortal 
            key={pitchTriggerQuery} 
            lang={lang} 
            initialQuery={pitchTriggerQuery} 
          />
        ) : (
          <ConsumerPortal 
            lang={lang} 
          />
        )}
      </main>

      {/* Bilingual Voice Assistant Hands-Free Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        defaultLang={lang}
      />

      {/* Official Credits Footer */}
      <Footer lang={lang} />
    </div>
  );
}
