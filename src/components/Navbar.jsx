import React, { useState } from 'react';
import { ShieldCheck, Factory, Mic, Key, Building2, Award } from 'lucide-react';

export default function Navbar({ 
  currentPersona, 
  setCurrentPersona, 
  onOpenVoiceModal 
}) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('manaksetu_gemini_api_key') || '');
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = () => {
    if (apiKeyInput.trim()) {
      localStorage.setItem('manaksetu_gemini_api_key', apiKeyInput.trim());
    } else {
      localStorage.removeItem('manaksetu_gemini_api_key');
    }
    setKeySaved(true);
    setTimeout(() => {
      setKeySaved(false);
      setShowKeyModal(false);
    }, 1200);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Top Statutory Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                SIH 2026 • PSID 26107
              </span>
              <span className="hidden sm:inline text-slate-300 font-medium">
                Department of Consumer Affairs (DoCA) & Bureau of Indian Standards (BIS)
              </span>
            </div>
            <div className="flex items-center gap-3 text-slate-300 font-medium text-[11px]">
              <span className="flex items-center gap-1 text-slate-200">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Jamia Hamdard, New Delhi
              </span>
              <span>•</span>
              <span className="text-amber-300 font-bold">Team SnippetSquad</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black text-lg tracking-tight">
              MS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  ManakSetu
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active System
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                AI Intelligence Bridge for Indian Standards & BIS Services
              </p>
            </div>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setCurrentPersona('industry')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                currentPersona === 'industry'
                  ? 'bg-white text-blue-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Factory className="w-4 h-4 text-blue-600" />
              <span>Industry & MSME Suite</span>
            </button>
            <button
              onClick={() => setCurrentPersona('consumer')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                currentPersona === 'consumer'
                  ? 'bg-white text-blue-900 shadow-xs border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Consumer Vigilance</span>
            </button>
          </div>

          {/* Voice Assistant & Configuration */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenVoiceModal}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all"
              title="Speak regulatory query"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Voice Assistant</span>
            </button>

            <button
              onClick={() => setShowKeyModal(true)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all border border-transparent hover:border-slate-200"
              title="Optional Google Gemini API Key"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Optional Gemini Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-500" />
                Optional Google Gemini API Key
              </h3>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              ManakSetu runs <strong>100% offline</strong> using its pre-configured canonical BIS knowledge engine. 
              If you wish to enable live generative AI responses, insert a free Gemini 1.5 Flash API key from Google AI Studio.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4 font-mono"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 text-xs font-bold bg-blue-900 text-white rounded-xl hover:bg-blue-950 transition-all shadow-xs"
              >
                {keySaved ? 'Saved Successfully! ✓' : 'Save & Enable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
