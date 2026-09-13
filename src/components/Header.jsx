import React, { useState } from 'react';
import { 
  Menu, X, Search, ExternalLink, Globe, ChevronRight
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import Logo from './Logo';

export default function Header() {
  const { path, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontScale, setFontScale] = useState('normal'); // 'normal' | 'small' | 'large'
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Standards", to: "/standards/search" },
    { label: "Services", to: "/services" },
    { label: "ManakBot", to: "/manakbot" },
    { label: "Consumer Protection", to: "/consumer" },
    { label: "MSME Relief", to: "/msme" },
    { label: "Resources", to: "/news" },
    { label: "Support", to: "/faq" },
    { label: "About", to: "/about" }
  ];

  const handleNavClick = (to) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  const handleFontChange = (scale) => {
    setFontScale(scale);
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    if (scale === 'small') {
      document.documentElement.classList.add('text-sm');
    } else if (scale === 'large') {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.add('text-base');
    }
  };

  const isActive = (to) => {
    if (to === '/') return path === '/' || path === '';
    return path.startsWith(to);
  };

  return (
    <header className="w-full bg-white border-b border-slate-300 select-none text-left">
      
      {/* 1. TOP INSTITUTIONAL BAR (GOVERNMENT OF INDIA) */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px]">
          
          {/* Left: Government of India */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="text-amber-500 font-bold">भारत सरकार</span>
            <span className="text-slate-500">|</span>
            <span className="text-white font-semibold">Government of India</span>
          </div>

          {/* Right: Ministry Info */}
          <div className="text-slate-300 text-[11px] hidden sm:block">
            <span>Ministry of Consumer Affairs, Food &amp; Public Distribution</span>
          </div>

        </div>
      </div>

      {/* 2. MAIN BRAND & UTILITY BAR */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Original ManakSetu Brand Identity */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center text-left focus:outline-none focus:ring-1 focus:ring-gov-700 rounded-sm"
          >
            <Logo size="default" />
          </button>

          {/* Right: Government Portal Utilities */}
          <div className="flex items-center gap-4 text-xs">
            
            {/* Accessibility: Font Resizer */}
            <div className="hidden md:flex items-center border border-slate-300 rounded-sm overflow-hidden bg-slate-50 text-[11px]">
              <span className="px-2 py-1 text-slate-500 font-medium border-r border-slate-200">
                Text:
              </span>
              <button
                onClick={() => handleFontChange('small')}
                className={`px-2 py-1 font-mono hover:bg-slate-200 transition-colors ${fontScale === 'small' ? 'bg-gov-800 text-white font-bold' : 'text-slate-700'}`}
                title="Decrease font size (A-)"
              >
                A-
              </button>
              <button
                onClick={() => handleFontChange('normal')}
                className={`px-2 py-1 font-mono hover:bg-slate-200 transition-colors ${fontScale === 'normal' ? 'bg-gov-800 text-white font-bold' : 'text-slate-700'}`}
                title="Standard font size (A)"
              >
                A
              </button>
              <button
                onClick={() => handleFontChange('large')}
                className={`px-2 py-1 font-mono hover:bg-slate-200 transition-colors ${fontScale === 'large' ? 'bg-gov-800 text-white font-bold' : 'text-slate-700'}`}
                title="Increase font size (A+)"
              >
                A+
              </button>
            </div>

            {/* Language Selector: English | हिन्दी */}
            <div className="hidden sm:flex items-center border border-slate-300 rounded-sm overflow-hidden bg-slate-50 text-[11px]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 transition-colors ${language === 'en' ? 'bg-gov-800 text-white font-bold' : 'text-slate-700 hover:bg-slate-200'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 transition-colors ${language === 'hi' ? 'bg-gov-800 text-white font-bold' : 'text-slate-700 hover:bg-slate-200'}`}
              >
                हिन्दी
              </button>
            </div>

            {/* Clear Distinction: Official BIS Portal Link */}
            <div className="hidden lg:flex items-center gap-3 pl-2 border-l border-slate-200">
              <a
                href="https://www.manakonline.in/MANAK/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-gov-50 text-gov-800 border border-slate-300 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                title="Open official BIS Manak Online portal in a new tab"
              >
                <span>Official BIS Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="https://www.bis.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-gov-800 text-[11px] font-medium inline-flex items-center gap-1 transition-colors"
                title="Open official Bureau of Indian Standards website"
              >
                <span>BIS Website</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('/standards/search')}
                className="p-2 rounded-sm border border-slate-300 text-slate-700 hover:bg-slate-100"
                title="Search Standards"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm border border-slate-300 text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR (DEEP GOVERNMENT NAVY) */}
      <nav className="bg-gov-800 text-white border-t border-gov-900 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Nav Items */}
          <ul className="flex items-center flex-wrap text-xs font-semibold">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <li key={link.to}>
                  <button
                    onClick={() => handleNavClick(link.to)}
                    className={`px-2.5 lg:px-3.5 py-3 border-b-2 transition-colors flex items-center gap-1.5 text-[11px] lg:text-xs ${
                      active 
                        ? 'border-saffron-500 bg-gov-900 text-white font-bold' 
                        : 'border-transparent text-slate-100 hover:bg-gov-700 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Search Trigger */}
          <div className="flex items-center shrink-0 pl-2">
            <button
              onClick={() => handleNavClick('/standards/search')}
              className="px-2.5 lg:px-3 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-gov-700 rounded-sm transition-colors flex items-center gap-1.5 border border-gov-700"
              title="Quick Search Indian Standards"
            >
              <Search className="w-3.5 h-3.5 text-saffron-400" />
              <span className="hidden xl:inline">Search Standards</span>
            </button>
          </div>

        </div>
      </nav>

      {/* 4. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-gov-800 shadow-lg animate-in fade-in">
          <div className="px-4 py-3 space-y-1 divide-y divide-slate-100 text-xs">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <button
                  key={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`w-full py-2.5 text-left flex items-center justify-between font-semibold ${
                    active ? 'text-gov-800 font-bold' : 'text-slate-700 hover:text-gov-800'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              );
            })}

            {/* Official Portal External Links on Mobile */}
            <div className="pt-3 pb-1 space-y-2">
              <a
                href="https://www.manakonline.in/MANAK/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-sm bg-slate-100 hover:bg-slate-200 text-gov-900 font-bold text-xs flex items-center justify-between border border-slate-300"
              >
                <span>Official BIS Manak Online</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="https://www.bis.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-sm text-slate-600 hover:text-gov-800 font-medium text-xs flex items-center justify-between"
              >
                <span>BIS Official Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
