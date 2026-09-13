import React from 'react';
import { 
  Building2, ShieldCheck, Award, Users, Factory, Globe, 
  Sparkles, CheckCircle2, ArrowRight, ExternalLink, Scale, Heart
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* HEADER */}
        <section className="bg-white border-b border-slate-300 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-gov-800 font-semibold">About ManakSetu</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  About ManakSetu (मानक सेतु)
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  National AI Assistant for Indian Standards Discovery, Mandatory Quality Control Orders (QCOs), and BIS e-Governance Services.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs rounded-sm inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>Official BIS Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Mission & Problem Statement */}
          <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gov-800 uppercase tracking-wide">
              <Scale className="w-4 h-4 text-gov-800" />
              <span>Smart India Hackathon 2026 Initiative</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gov-900">
              The Mission: Bridging Standards &amp; Industry
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              In Sanskrit and Hindi, <strong>"Setu" (सेतु)</strong> means bridge. Over 63 million Micro, Small, and Medium Enterprises (MSMEs) in India produce goods vital to the national economy. However, dense technical specifications, complex legal terminology in the Gazette of India, and fragmented search portals create a significant barrier to compliance.
            </p>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>ManakSetu</strong> bridges this divide by delivering a high-precision, vernacular-friendly, and grounded AI assistant. It allows entrepreneurs and citizens to query standards in plain language or colloquial terms (e.g. "geyser", "khilona", "sariya", "press"), understand mandatory tests, calculate statutory 50% MSME fee concessions, and verify genuine ISI / HUID marks.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-300 space-y-1">
                <span className="font-bold text-slate-900 block">Problem Statement ID:</span>
                <span className="font-mono font-bold text-gov-800">26107</span>
                <span className="text-slate-500 block">Theme: Smart Automation / E-Governance</span>
              </div>
              <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-300 space-y-1">
                <span className="font-bold text-slate-900 block">Developed By:</span>
                <span className="font-bold text-slate-800">Team Code Snippet</span>
                <span className="text-slate-500 block">Smart India Hackathon 2026 Initiative</span>
              </div>
            </div>
          </div>

          {/* Architecture & Reliability Guarantees */}
          <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-gov-900">
              Technical Architecture &amp; Reliability Guarantees
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-300 space-y-2">
                <div className="w-8 h-8 rounded-sm bg-gov-100 text-gov-800 border border-gov-300 flex items-center justify-center font-bold">
                  01
                </div>
                <h4 className="font-bold text-slate-900">Grounded Knowledge Base</h4>
                <p className="text-slate-600 leading-relaxed">
                  Direct citation of BIS Act 2016 regulations, Gazette QCO notifications, and official NABL laboratory testing codes.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-slate-50 border border-slate-300 space-y-2">
                <div className="w-8 h-8 rounded-sm bg-gov-100 text-gov-800 border border-gov-300 flex items-center justify-center font-bold">
                  02
                </div>
                <h4 className="font-bold text-slate-900">Multi-Token Normalizer</h4>
                <p className="text-slate-600 leading-relaxed">
                  Defensive token matching handles raw IS numbers, alphanumeric IDs, and colloquial Hinglish vocabulary smoothly.
                </p>
              </div>

              <div className="p-4 rounded-sm bg-slate-50 border border-slate-300 space-y-2">
                <div className="w-8 h-8 rounded-sm bg-gov-100 text-gov-800 border border-gov-300 flex items-center justify-center font-bold">
                  03
                </div>
                <h4 className="font-bold text-slate-900">Anti-Counterfeit Protection</h4>
                <p className="text-slate-600 leading-relaxed">
                  Real-time pattern and algorithmic verification for 6-digit Gold HUID codes and 7-digit ISI Certification License numbers.
                </p>
              </div>
            </div>
          </div>

          {/* Mandatory Statutory Notice */}
          <div className="p-5 rounded-sm bg-amber-50 border border-amber-300 text-amber-950 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Independent Public Service Prototype Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              ManakSetu is an independent AI assistance prototype developed for Smart India Hackathon 2026. It is not owned, operated, or endorsed by the Bureau of Indian Standards (BIS) or the Government of India. For statutory licensing applications, fee deposits, and official legal filings, always visit the authorized portal at <a href="https://www.manakonline.in" target="_blank" rel="noopener noreferrer" className="underline font-bold">www.manakonline.in</a>.
            </p>
          </div>

        </div>

      </div>
    </ErrorBoundary>
  );
}
