import React from 'react';
import { ExternalLink, ShieldCheck, Flag, PhoneCall } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import Logo from './Logo';

export default function Footer({ onOpenReport }) {
  const { navigate } = useRouter();

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs py-10 border-t-2 border-gov-800 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Top 5 Institutional Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          
          {/* Col 1: About ManakSetu (2 cols wide) */}
          <div className="lg:col-span-2 space-y-3">
            <Logo variant="white" size="default" />

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              ManakSetu is an assistance and navigation platform designed to simplify access to Indian Standards, mandatory Quality Control Orders (QCOs), and Bureau of Indian Standards (BIS) conformity assessment procedures.
            </p>

            <div className="pt-1 text-[11px] text-slate-400 space-y-0.5">
              <p>Smart India Hackathon 2026 • Problem Statement ID: <strong>26107</strong></p>
              <p>Theme: <strong>Smart Automation</strong> • Team: <strong>Code Snippet</strong></p>
            </div>
          </div>

          {/* Col 2: Standards */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              Standards
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/standards/search')} className="hover:text-white transition-colors">
                  Instant Standards Search
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Electrical+Engineering')} className="hover:text-white transition-colors">
                  Electrical Engineering
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Civil+Engineering')} className="hover:text-white transition-colors">
                  Civil &amp; Construction
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Food+%26+Agriculture')} className="hover:text-white transition-colors">
                  Food &amp; Packaged Water
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/standards/search?sector=Electronics+%26+IT+Goods')} className="hover:text-white transition-colors">
                  Electronics &amp; IT
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              Services
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  Product Certification (ISI)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  Compulsory Registration (CRS)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/consumer')} className="hover:text-white transition-colors">
                  Hallmarking (HUID)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  Foreign Manufacturers (FMCS)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-white transition-colors">
                  Testing Labs (LRS)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              Resources
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigate('/manakbot')} className="hover:text-white transition-colors text-amber-400 font-semibold">
                  ManakBot Assistant
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/msme')} className="hover:text-white transition-colors">
                  MSME 50% Concessions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/news')} className="hover:text-white transition-colors">
                  Gazette QCO Orders
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  About Project
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Official BIS Links & Helpline */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800">
              Official Links
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://www.manakonline.in/MANAK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Manak Online (e-BIS)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.bis.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>BIS Website</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in/BIS/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>CRS Portal</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.egazette.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1 transition-colors"
                >
                  <span>e-Gazette of India</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-2 bg-slate-800 rounded-sm border border-slate-700 text-[11px] space-y-0.5">
                <span className="text-slate-400 block font-medium">Consumer Helpline:</span>
                <span className="text-amber-400 font-mono font-bold block">1915 (Toll Free)</span>
              </div>
            </div>
          </div>

        </div>

        {/* STATUTORY MANDATORY DISCLAIMER (PROMPT ITEM 32) */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-sm text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-200 block mb-0.5">Statutory Disclaimer:</strong>
            <p>
              ManakSetu is an assistance/prototype platform intended to simplify navigation of BIS-related information. Users should verify current requirements, standards and official documents through BIS (<a href="https://www.manakonline.in" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">www.manakonline.in</a>).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              &copy; 2026 MANAKSETU Assistive Platform • SIH 2026 Team Code Snippet
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">Privacy Policy</button>
              <span>|</span>
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">Terms of Assistance</button>
              <span>|</span>
              <button onClick={() => navigate('/about')} className="hover:text-slate-300">Accessibility Statement</button>
              <span>|</span>
              <button onClick={() => navigate('/faq')} className="hover:text-slate-300">Contact</button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
