import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onOpenReport }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-600 text-xs py-12 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Logo size="default" />
            <p className="text-neutral-500 max-w-sm leading-relaxed text-xs">
              AI-powered assistant for discovering, understanding, and navigating Indian Standards and BIS compliance requirements. Designed for MSMEs, startups, manufacturers, and Indian consumers.
            </p>
            <p className="text-[11px] text-neutral-400">
              Developed for Smart India Hackathon (SIH) • Problem Statement ID: 26107
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-700">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('standards')} className="hover:text-emerald-700">
                  Standards Directory
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('discovery')} className="hover:text-emerald-700">
                  Product Finder
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('compliance')} className="hover:text-emerald-700">
                  Compliance Check
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('assistant')} className="hover:text-emerald-700 font-semibold text-emerald-800">
                  ManakBot Assistant
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('cost-estimator')} className="hover:text-emerald-700">
                  Cost Estimator (MSME 50% Off)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('consumer-check')} className="hover:text-emerald-700">
                  Verify HUID / ISI CML
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-emerald-700">
                  About ManakSetu
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
              Official BIS Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>e-BIS Portal (manakonline.in)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>BIS National Portal (bis.gov.in)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://standardsbis.bsbedge.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>Know Your Standard (KYS)</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.services.bis.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-700 inline-flex items-center gap-1"
                >
                  <span>Online Conformity Services</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Persistent Statutory Disclaimer */}
        <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p className="italic text-center sm:text-left max-w-3xl">
            <strong>Statutory Disclaimer:</strong> ManakSetu provides AI-assisted informational guidance based on available Indian Standards. Verify applicable requirements and current standards with official BIS sources (manakonline.in) before making compliance, certification, or regulatory decisions.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span>© {new Date().getFullYear()} ManakSetu</span>
            <span>•</span>
            <span className="font-semibold text-emerald-700">SIH Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
