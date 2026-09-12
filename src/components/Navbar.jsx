import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onGetStarted }) {
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
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-emerald-700 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollTo('actions')}
            className="hover:text-emerald-700 transition-colors"
          >
            What You Can Do
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="hover:text-emerald-700 transition-colors"
          >
            Assistant
          </button>
          <button 
            onClick={() => scrollTo('standards')}
            className="hover:text-emerald-700 transition-colors"
          >
            Explore Standards
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-emerald-700 transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollTo('faq')}
            className="hover:text-emerald-700 transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-xs"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <button 
            onClick={() => scrollTo('actions')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-700"
          >
            What You Can Do
          </button>
          <button 
            onClick={() => scrollTo('assistant')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-700"
          >
            ManaKSetu Assistant
          </button>
          <button 
            onClick={() => scrollTo('standards')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-700"
          >
            Explore Standards
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-700"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollTo('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-700"
          >
            FAQ
          </button>
          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStarted();
              }}
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium text-center"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
