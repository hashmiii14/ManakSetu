import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Footer({ onOpenReport }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-600 text-xs py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                MS
              </div>
              <span className="text-base font-bold text-neutral-900 tracking-tight">
                ManaKSetu
              </span>
            </div>
            <p className="text-neutral-500 max-w-sm leading-relaxed">
              AI Assistant for Indian Standards & BIS Services. Developed for Smart India Hackathon (Problem Statement ID: 26107), Jamia Hamdard.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-700">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('actions')} className="hover:text-emerald-700">
                  What You Can Do
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('assistant')} className="hover:text-emerald-700">
                  ManaKSetu Assistant
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cost-estimator')} className="hover:text-emerald-700">
                  Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('standards')} className="hover:text-emerald-700">
                  Explore Standards
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('consumer-check')} className="hover:text-emerald-700">
                  Verify Hallmark & ISI
                </button>
              </li>
              {onOpenReport && (
                <li>
                  <button onClick={onOpenReport} className="text-red-600 hover:text-red-700 font-semibold">
                    Report a Violation
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Statutory Links */}
          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] mb-3">
              Statutory Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="hover:text-emerald-700 flex items-center gap-1">
                  <span>Manakonline Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-700 flex items-center gap-1">
                  <span>Bureau of Indian Standards</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://consumerhelpline.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-700 flex items-center gap-1">
                  <span>National Consumer Helpline</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards" target="_blank" rel="noreferrer" className="hover:text-emerald-700 flex items-center gap-1">
                  <span>Know Your Standards</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400 text-[11px]">
          <p>© {new Date().getFullYear()} ManaKSetu • Smart India Hackathon Prototype. Team SnippetSquad.</p>
          <div className="flex items-center gap-4 text-neutral-500">
            <span>Statutory compliance referenced from BIS Act, 2016</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
