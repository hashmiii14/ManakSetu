import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Flag, PhoneCall } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export default function Footer({ onOpenReport }) {
  const { navigate } = useRouter();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs py-12 border-t-4 border-saffron-500 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gov-700 text-white flex items-center justify-center font-bold text-base border border-saffron-500">
                <span className="font-serif">मानक</span>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block leading-none">
                  MANAKSETU
                </span>
                <span className="text-[10px] text-slate-400">
                  AI-assisted BIS & Standards Guidance
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              ManakSetu empowers Indian micro, small, and medium enterprises (MSMEs), exporters, startups, and citizens to discover Indian Standards, navigate mandatory Quality Control Orders (QCOs), and verify authentic ISI and Gold HUID marks.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p>Smart India Hackathon (SIH) 2026 • Problem Statement ID: <strong>26107</strong></p>
              <p>Theme: <strong>Smart Automation</strong> • Team: <strong>Code Snippet</strong></p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 pb-1 border-b border-slate-800">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-saffron-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search')} className="hover:text-saffron-400 transition-colors">
                  Standards Search
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-saffron-400 transition-colors">
                  BIS Services Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/manakbot')} className="hover:text-saffron-400 transition-colors text-saffron-400 font-semibold">
                  ManakBot AI Copilot
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/consumer')} className="hover:text-saffron-400 transition-colors">
                  TrueMark Verifier (HUID/CML)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/msme')} className="hover:text-saffron-400 transition-colors">
                  MSME Fee Concessions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/news')} className="hover:text-saffron-400 transition-colors">
                  News & Circulars
                </button>
              </li>
            </ul>
          </div>

          {/* Official BIS Portals */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 pb-1 border-b border-slate-800">
              Official BIS Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.manakonline.in/MANAK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-saffron-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Manak Online (e-BIS)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.manakonline.in/MANAK/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-saffron-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Manak Online Login</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.manakonline.in/MANAK/eBISLogin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-saffron-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>e-BIS Officer Login</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bis.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-saffron-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>BIS Headquarters Portal</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-saffron-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Know Your Standards (BIS)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Grievances */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 pb-1 border-b border-slate-800">
              Support & Jan Sunvai
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  National Consumer Helpline
                </span>
                <p className="text-saffron-400 font-mono font-bold text-sm">
                  1915 (Toll Free)
                </p>
                <span className="text-[10px] text-slate-400 block">
                  Ministry of Consumer Affairs
                </span>
              </div>

              <div className="space-y-1.5">
                <button 
                  onClick={() => navigate('/faq')}
                  className="hover:text-saffron-400 text-xs block transition-colors"
                >
                  Frequently Asked Questions
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="hover:text-saffron-400 text-xs block transition-colors"
                >
                  About ManakSetu Project
                </button>
                {onOpenReport && (
                  <button 
                    onClick={onOpenReport}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold inline-flex items-center gap-1 transition-colors pt-1"
                  >
                    <Flag className="w-3 h-3 text-red-400" />
                    <span>Report Fake Mark to BIS</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* STATUTORY DISCLAIMER (EXPLICIT GOVERNMENT-GRADE COMPLIANCE) */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-200 block mb-1">
              Statutory Transparency & Legal Disclaimer:
            </strong>
            <p>
              ManakSetu is an independent assistive and informational prototype platform created for the Smart India Hackathon 2026. It is <strong>NOT</strong> the official portal of the Bureau of Indian Standards (BIS) or the Government of India. All Indian Standards specifications, Quality Control Orders (QCOs), fee structures, and laboratory details provided are for guidance and educational purposes. Manufacturers and citizens must verify current statutory requirements, gazette amendments, and operative licenses directly on the official Bureau of Indian Standards portal (<a href="https://www.manakonline.in" target="_blank" rel="noopener noreferrer" className="text-saffron-400 underline">www.manakonline.in</a>).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              © 2026 ManakSetu Assistive Platform • SIH Team Code Snippet
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">Terms of Assistance</button>
              <span>•</span>
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">Accessibility Statement</button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
