import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Flag } from 'lucide-react';

export default function Navbar({ onGetStarted, onOpenReport }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            MS
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-neutral-900 tracking-tight">
              ManaKSetu
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-neutral-600">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-emerald-700 transition-colors"
          >
            Product Finder
          </button>
          <button 
            onClick={() => scrollTo('standards')}
            className="hover:text-emerald-700 transition-colors"
          >
            Standards Directory
          </button>
          <button 
            onClick={() => scrollTo('cost-estimator')}
            className="hover:text-emerald-700 transition-colors"
          >
            Cost Estimator
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="hover:text-emerald-700 transition-colors"
          >
            Ask Assistant
          </button>
          <button 
            onClick={() => scrollTo('consumer-check')}
            className="hover:text-emerald-700 transition-colors"
          >
            Verify Hallmark & ISI
          </button>
          <button 
            onClick={() => onOpenReport && onOpenReport()}
            className="hover:text-red-700 transition-colors text-neutral-500 inline-flex items-center gap-1"
          >
            <Flag className="w-3 h-3 text-red-500" />
            <span>Report</span>
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenReport && onOpenReport()}
            className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-neutral-200 hover:border-red-300 text-neutral-600 hover:text-red-700 text-xs font-semibold transition-colors"
          >
            <Flag className="w-3.5 h-3.5 text-red-500" />
            <span>Report Violation</span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <span>Check Product</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
        <div className="lg:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg text-left">
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block w-full py-2 text-sm font-medium text-neutral-700"
          >
            Product Finder
          </button>
          <button 
            onClick={() => scrollTo('standards')}
            className="block w-full py-2 text-sm font-medium text-neutral-700"
          >
            Standards Directory
          </button>
          <button 
            onClick={() => scrollTo('cost-estimator')}
            className="block w-full py-2 text-sm font-medium text-neutral-700"
          >
            Cost Estimator
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="block w-full py-2 text-sm font-medium text-neutral-700"
          >
            Ask Assistant
          </button>
          <button 
            onClick={() => scrollTo('consumer-check')}
            className="block w-full py-2 text-sm font-medium text-neutral-700"
          >
            Verify Hallmark & ISI
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenReport) onOpenReport();
            }}
            className="block w-full py-2 text-sm font-medium text-red-700"
          >
            🚩 Report Non-compliant Product
          </button>
          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-bold text-center"
            >
              Check My Product
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
