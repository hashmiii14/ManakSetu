import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QuickPitchBanner from './components/QuickPitchBanner';
import IndustryPortal from './components/IndustryPortal';
import ConsumerPortal from './components/ConsumerPortal';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import Footer from './components/Footer';

export default function App() {
  const [currentPersona, setCurrentPersona] = useState('industry'); // 'industry' | 'consumer'
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [pitchTriggerQuery, setPitchTriggerQuery] = useState('');

  const handleSelectDemo = (query) => {
    setCurrentPersona('industry');
    setPitchTriggerQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentPersona={currentPersona}
        setCurrentPersona={setCurrentPersona}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
      />

      {/* Jury Quick Demonstration Shortcuts */}
      <QuickPitchBanner
        onSelectDemo={handleSelectDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {currentPersona === 'industry' ? (
          <IndustryPortal 
            key={pitchTriggerQuery} 
            initialQuery={pitchTriggerQuery} 
          />
        ) : (
          <ConsumerPortal />
        )}
      </main>

      {/* Hands-Free Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

      {/* Official Footer */}
      <Footer />
    </div>
  );
}
