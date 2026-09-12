import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, Flag, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onAskBot, onOpenReport }) {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo with Bridge + Shield */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <Logo size="default" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-neutral-600">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-emerald-700 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollTo('standards')}
            className="hover:text-emerald-700 transition-colors"
          >
            Standards
          </button>
          <button 
            onClick={() => scrollTo('discovery')}
            className="hover:text-emerald-700 transition-colors"
          >
            Product Finder
          </button>
          <button 
            onClick={() => scrollTo('compliance')}
            className="hover:text-emerald-700 transition-colors"
          >
            Compliance
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="hover:text-emerald-700 transition-colors text-emerald-800 font-bold flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>ManakBot</span>
          </button>
          <button 
            onClick={() => scrollTo('cost-estimator')}
            className="hover:text-emerald-700 transition-colors"
          >
            Cost & MSME
          </button>
          <button 
            onClick={() => scrollTo('consumer-check')}
            className="hover:text-emerald-700 transition-colors"
          >
            Verify HUID / ISI
          </button>
          <button 
            onClick={() => scrollTo('about')}
            className="hover:text-emerald-700 transition-colors text-neutral-500"
          >
            About
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => onOpenReport && onOpenReport()}
            className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-neutral-200 hover:border-red-300 text-neutral-600 hover:text-red-700 text-xs font-semibold transition-colors"
            title="Report Counterfeit Product"
          >
            <Flag className="w-3.5 h-3.5 text-red-500" />
            <span>Report</span>
          </button>

          <button
            onClick={() => {
              if (onAskBot) onAskBot();
              else scrollTo('assistant');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
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
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-2.5 shadow-lg text-left animate-in slide-in-from-top-2">
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            Home
          </button>
          <button 
            onClick={() => scrollTo('standards')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            Standards Directory
          </button>
          <button 
            onClick={() => scrollTo('discovery')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            Product Finder (Discovery)
          </button>
          <button 
            onClick={() => scrollTo('compliance')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            Compliance Checklist
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="block w-full py-2 text-xs font-bold text-emerald-800 text-left flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>ManakBot AI Assistant</span>
          </button>
          <button 
            onClick={() => scrollTo('cost-estimator')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            Cost Estimator (MSME 50% Off)
          </button>
          <button 
            onClick={() => scrollTo('consumer-check')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            Verify Gold HUID & ISI CML
          </button>
          <button 
            onClick={() => scrollTo('about')}
            className="block w-full py-2 text-xs font-bold text-neutral-800 text-left hover:text-emerald-700"
          >
            About ManakSetu
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenReport) onOpenReport();
            }}
            className="block w-full py-2 text-xs font-bold text-red-600 text-left flex items-center gap-1"
          >
            <Flag className="w-3.5 h-3.5 text-red-500" />
            <span>Report Non-compliant Product</span>
          </button>

          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onAskBot) onAskBot();
                else scrollTo('assistant');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs"
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
