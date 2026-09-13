import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, Flag, ShieldCheck, Factory, Users, ExternalLink } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onAskBot, onOpenReport, activeMode = 'msme', onToggleMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 text-left">
      {/* Top SIH 2026 Problem Statement 26107 Banner */}
      <div className="bg-neutral-900 text-white text-[11px] py-1 px-4 text-center sm:flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center justify-center sm:justify-start gap-2 font-medium tracking-wide">
          <span className="font-bold text-amber-400">🇮🇳 Smart India Hackathon 2026</span>
          <span className="hidden md:inline text-neutral-400">•</span>
          <span className="hidden md:inline text-neutral-300">PS ID: <strong>26107</strong></span>
          <span className="hidden lg:inline text-neutral-400">•</span>
          <span className="hidden lg:inline text-neutral-300">Theme: Smart Automation</span>
          <span className="hidden sm:inline text-neutral-400">•</span>
          <span className="text-emerald-400 font-bold">Team Code Snippet</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-neutral-300 text-[10px]">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Prototype Active
          </span>
          <a
            href="https://www.manakonline.in"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white inline-flex items-center gap-0.5 text-neutral-400 hover:underline"
          >
            <span>manakonline.in</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo with Bridge + Shield */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer shrink-0"
        >
          <Logo size="default" />
        </div>

        {/* Persona Mode Switcher in Navbar */}
        <div className="hidden md:flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs font-bold">
          <button
            onClick={() => onToggleMode && onToggleMode('msme')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'msme'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>MSME Mode</span>
          </button>
          <button
            onClick={() => onToggleMode && onToggleMode('citizen')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeMode === 'citizen'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Citizen Mode</span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-neutral-600">
          <button 
            onClick={() => scrollTo('discovery')}
            className="hover:text-emerald-700 transition-colors"
          >
            {activeMode === 'msme' ? 'StandardFinder AI' : 'Product Search'}
          </button>
          <button 
            onClick={() => scrollTo('compliance')}
            className="hover:text-emerald-700 transition-colors"
          >
            {activeMode === 'msme' ? 'Scheme Navigator' : 'Check Quality Mark'}
          </button>
          <button 
            onClick={() => scrollTo('cost-estimator')}
            className="hover:text-emerald-700 transition-colors"
          >
            {activeMode === 'msme' ? 'Fees & Lab Locator' : 'Find Testing Labs'}
          </button>
          <button 
            onClick={() => scrollTo('consumer-check')}
            className="hover:text-emerald-700 transition-colors font-bold text-neutral-800 flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>TrueMark Verifier</span>
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="hover:text-emerald-700 transition-colors text-emerald-800 font-bold flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>ManakBot</span>
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => onOpenReport && onOpenReport()}
            className="hidden xl:inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-neutral-200 hover:border-red-300 text-neutral-600 hover:text-red-700 text-xs font-semibold transition-colors"
            title="Report Counterfeit Product to BIS & NCH"
          >
            <Flag className="w-3.5 h-3.5 text-red-500" />
            <span>Report Fake</span>
          </button>

          <button
            onClick={() => {
              if (onAskBot) onAskBot();
              else scrollTo('assistant');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask ManakBot</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg text-left animate-in slide-in-from-top-2">
          {/* Mobile Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-xl border border-neutral-200 text-xs font-bold">
            <button
              onClick={() => {
                if (onToggleMode) onToggleMode('msme');
                setMobileMenuOpen(false);
              }}
              className={`py-2 rounded-lg text-center flex items-center justify-center gap-1.5 ${
                activeMode === 'msme' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600'
              }`}
            >
              <Factory className="w-3.5 h-3.5" />
              <span>MSME Mode</span>
            </button>
            <button
              onClick={() => {
                if (onToggleMode) onToggleMode('citizen');
                setMobileMenuOpen(false);
              }}
              className={`py-2 rounded-lg text-center flex items-center justify-center gap-1.5 ${
                activeMode === 'citizen' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-neutral-600'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Citizen Mode</span>
            </button>
          </div>

          <button 
            onClick={() => scrollTo('discovery')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            1. StandardFinder AI (Vernacular Search)
          </button>
          <button 
            onClick={() => scrollTo('compliance')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            2. BIS Scheme & License Navigator
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="block w-full py-2 text-xs font-bold text-emerald-800 text-left flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>3. ManakBot Grounded AI Copilot</span>
          </button>
          <button 
            onClick={() => scrollTo('consumer-check')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            4. TrueMark Verifier (HUID / ISI / NCH)
          </button>
          <button 
            onClick={() => scrollTo('cost-estimator')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            5. Smart Cost Estimator & Lab Locator
          </button>

          <div className="pt-2 border-t border-neutral-100 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReport) onOpenReport();
              }}
              className="flex-1 py-2 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-bold text-center flex items-center justify-center gap-1"
            >
              <Flag className="w-3.5 h-3.5 text-red-500" />
              <span>Report Counterfeit</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onAskBot) onAskBot();
                else scrollTo('assistant');
              }}
              className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask ManakBot</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
