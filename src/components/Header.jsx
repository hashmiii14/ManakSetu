import React, { useState } from 'react';
import { 
  Menu, X, Search, ShieldCheck, Sparkles, ExternalLink, 
  HelpCircle, ChevronDown, Award, Factory, Users, Globe, Building2
} from 'lucide-react';
import { useRouter, Link } from '../context/RouterContext';

export default function Header() {
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large'
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Standards Search", to: "/standards/search" },
    { label: "BIS Services", to: "/services" },
    { label: "ManakBot AI", to: "/manakbot", isSpecial: true },
    { label: "Consumer & Hallmarking", to: "/consumer" },
    { label: "MSME Assistance", to: "/msme" },
    { label: "News & Circulars", to: "/news" },
    { label: "About", to: "/about" },
    { label: "Help / FAQ", to: "/faq" }
  ];

  const handleNavClick = (to) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-gov-sm border-b border-slate-200">
      
      {/* 1. TOP OFFICIAL INSTITUTIONAL STRIP (GOVERNMENT GRADE) */}
      <div className="bg-gov-900 text-slate-200 text-[11px] py-1 px-4 border-b border-gov-950/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          
          <div className="flex items-center gap-2 font-medium tracking-wide text-center sm:text-left">
            <span className="text-saffron-500 font-bold">भारत सरकार</span>
            <span className="text-slate-400">•</span>
            <span>Government of India</span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline text-slate-300">Ministry of Consumer Affairs, Food & Public Distribution</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-slate-300">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => {
                  document.documentElement.classList.toggle('text-base');
                  setFontSize(fontSize === 'normal' ? 'large' : 'normal');
                }}
                className="hover:text-white px-1 py-0.5 rounded border border-gov-700 bg-gov-800/80 font-mono"
                title="Change font size accessibility"
              >
                A{fontSize === 'normal' ? '+' : '-'}
              </button>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="hover:text-white px-1.5 py-0.5 rounded border border-gov-700 bg-gov-800/80 font-semibold"
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>
            </div>

            <a
              href="https://www.manakonline.in/MANAK/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron-400 hover:text-saffron-300 font-semibold inline-flex items-center gap-1 underline underline-offset-2"
            >
              <span>Official BIS Portal</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

        </div>
      </div>

      {/* 2. MAIN LOGO & BRANDING ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        
        {/* Brand Lockup */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer group select-none text-left"
        >
          {/* Emblem Icon */}
          <div className="w-10 h-10 rounded-lg bg-gov-700 text-white flex items-center justify-center shadow-gov font-bold text-lg border-2 border-saffron-500">
            <span className="tracking-tighter font-serif">मानक</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-gov-900 leading-none">
                MANAKSETU
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-gov-100 text-gov-700 border border-gov-200">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
              AI-assisted BIS & Indian Standards Guidance Platform
            </p>
          </div>
        </div>

        {/* Quick Search & Actions Right */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={() => navigate('/standards/search')}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:border-gov-700 text-xs font-semibold text-slate-700 hover:text-gov-900 bg-slate-50 hover:bg-white inline-flex items-center gap-2 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search Standards (IS Codes)...</span>
          </button>

          <button
            onClick={() => navigate('/manakbot')}
            className="px-3.5 py-1.5 rounded-lg bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-gov transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
            <span>ManakBot AI</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-gov-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 3. PRIMARY HORIZONTAL NAVIGATION BAR (DESKTOP) */}
      <div className="hidden lg:block bg-gov-800 text-white text-xs font-medium border-t border-gov-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = path === link.to || (link.to !== '/' && path.startsWith(link.to));
              return (
                <button
                  key={link.to}
                  onClick={() => navigate(link.to)}
                  className={`px-3 py-2.5 transition-colors font-semibold flex items-center gap-1.5 border-b-2 ${
                    isActive 
                      ? 'border-saffron-500 text-white bg-gov-900/60' 
                      : 'border-transparent text-slate-200 hover:text-white hover:bg-gov-700/60'
                  }`}
                >
                  {link.isSpecial && <Sparkles className="w-3 h-3 text-saffron-400" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <span className="text-slate-400">Toll Free NCH:</span>
            <strong className="text-saffron-400 font-mono">1915</strong>
          </div>
        </div>
      </div>

      {/* 4. PERSISTENT PROTOTYPE ASSISTANCE NOTICE */}
      <div className="bg-saffron-50 border-t border-b border-saffron-200/80 px-4 py-1 text-[11px] text-saffron-950 flex items-center justify-center text-center gap-1.5">
        <span className="font-bold">Assistive Platform Notice:</span>
        <span className="hidden sm:inline">ManakSetu provides AI-assisted navigation of Indian Standards. For statutory filings, always visit</span>
        <a 
          href="https://www.manakonline.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-bold underline text-gov-800 hover:text-gov-900 inline-flex items-center gap-0.5"
        >
          <span>e-BIS Portal (manakonline.in)</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* 5. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top text-left">
          <div className="p-4 space-y-3">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('/standards/search')}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-100 border border-slate-300 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-gov-700" />
                <span>Search Standards</span>
              </button>

              <button
                onClick={() => handleNavClick('/manakbot')}
                className="flex-1 py-2 px-3 rounded-lg bg-gov-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-gov"
              >
                <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
                <span>Ask ManakBot</span>
              </button>
            </div>

            <nav className="divide-y divide-slate-100 border-t border-slate-100">
              {navLinks.map((link) => {
                const isActive = path === link.to || (link.to !== '/' && path.startsWith(link.to));
                return (
                  <button
                    key={link.to}
                    onClick={() => handleNavClick(link.to)}
                    className={`w-full py-2.5 px-2 text-xs font-semibold text-left flex items-center justify-between transition-colors ${
                      isActive ? 'text-gov-700 bg-slate-50 font-bold' : 'text-slate-700 hover:text-gov-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.isSpecial && <Sparkles className="w-3.5 h-3.5 text-saffron-500" />}
                      {link.label}
                    </span>
                    <span className="text-slate-400 text-xs">→</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>National Consumer Helpline: <strong>1915</strong></span>
              <a 
                href="https://www.manakonline.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gov-700 font-bold underline inline-flex items-center gap-0.5"
              >
                <span>BIS Online</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
