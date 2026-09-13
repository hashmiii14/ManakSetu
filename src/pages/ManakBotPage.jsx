import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, BookOpen, ShieldCheck, FileText, 
  HelpCircle, ChevronDown, ChevronUp, Scale, Info
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ManakBot from '../components/ManakBot';
import { getStandardById } from '../services/standardsService';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ManakBotPage({ onOpenStandard, onCheckCompliance }) {
  const { searchParams, navigate } = useRouter();
  const [contextOpenMobile, setContextOpenMobile] = useState(false);
  
  const standardQuery = searchParams.get('std') || '';
  const promptQuery = searchParams.get('prompt') || '';

  const activeStandard = useMemo(() => {
    if (!standardQuery) return null;
    return getStandardById(standardQuery);
  }, [standardQuery]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left flex flex-col">
        
        {/* TOP SUB-HEADER */}
        <section className="bg-white border-b border-slate-300 py-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
                <span>/</span>
                <span className="text-gov-800 font-semibold">Regulatory Assistant</span>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-gov-900 tracking-tight">
                  MANAKBOT
                </h1>
                <p className="text-xs text-slate-600">
                  AI-assisted guidance for BIS &amp; Indian Standards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/standards/search')}
                className="px-3 py-1.5 rounded-sm border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Search Standards</span>
              </button>

              <a
                href="https://www.manakonline.in/MANAK/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Official Manak Online</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>
        </section>

        {/* 2-COLUMN MAIN CONTAINER (LEFT: CONVERSATION | RIGHT: OFFICIAL CONTEXT PANEL) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* LEFT 2 COLS: CONVERSATION AREA */}
            <div className="lg:col-span-2 bg-white rounded-sm border border-slate-300 shadow-xs overflow-hidden">
              
              {/* Mobile toggle for context panel */}
              <div className="lg:hidden p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-gov-900">
                  {activeStandard ? `Context: ${activeStandard.isCode}` : 'Official Reference Context'}
                </span>
                <button
                  onClick={() => setContextOpenMobile(!contextOpenMobile)}
                  className="text-gov-800 font-semibold inline-flex items-center gap-1"
                >
                  <span>{contextOpenMobile ? 'Hide Info' : 'Show Info'}</span>
                  {contextOpenMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Collapsible context on mobile */}
              {contextOpenMobile && (
                <div className="lg:hidden p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-3">
                  {activeStandard ? (
                    <div>
                      <span className="font-bold text-gov-900 block">{activeStandard.isCode}</span>
                      <p className="text-slate-600 mt-0.5">{activeStandard.title}</p>
                      <button
                        onClick={() => navigate(`/standards/${encodeURIComponent(activeStandard.id || activeStandard.isCode)}`)}
                        className="text-gov-800 font-bold underline mt-1 block"
                      >
                        View Full Standard Specification &rarr;
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-600">Select or query a standard to view statutory context.</p>
                  )}
                </div>
              )}

              {/* Embedded Chat System */}
              <ManakBot
                onOpenStandard={onOpenStandard}
                onCheckCompliance={onCheckCompliance}
                initialPrompt={
                  promptQuery 
                    ? promptQuery 
                    : (activeStandard ? `Explain the mandatory testing requirements, QCO notification, and MSME fee concessions for ${activeStandard.isCode} (${activeStandard.title}).` : '')
                }
              />
            </div>

            {/* RIGHT 1 COL: OFFICIAL CONTEXT & STATUTORY SOURCES PANEL */}
            <div className="hidden lg:block space-y-4">
              
              {/* Context Box 1: Selected Standard Info */}
              <div className="bg-white border border-slate-300 rounded-sm p-4 space-y-3 text-xs">
                <div className="border-b border-slate-200 pb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                    Active Context:
                  </span>
                  <h3 className="text-sm font-bold text-gov-900 mt-0.5">
                    {activeStandard ? activeStandard.isCode : 'General Standards Query'}
                  </h3>
                </div>

                {activeStandard ? (
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-800 leading-snug">
                      {activeStandard.title}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded-sm bg-gov-100 text-gov-800 font-mono text-[10px] font-bold">
                        {activeStandard.scheme}
                      </span>
                      {activeStandard.mandatoryQCO && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-900 text-[10px] font-bold">
                          Mandatory QCO
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-3">
                      {activeStandard.description}
                    </p>
                    <button
                      onClick={() => navigate(`/standards/${encodeURIComponent(activeStandard.id || activeStandard.isCode)}`)}
                      className="text-gov-800 font-bold hover:underline block pt-1 text-[11px]"
                    >
                      View Complete Specification &rarr;
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    No specific standard pinned. You can query any Indian Standard (e.g., IS 2082, IS 302, IS 4151) or product category in the chat.
                  </p>
                )}
              </div>

              {/* Context Box 2: Relevant Services */}
              <div className="bg-white border border-slate-300 rounded-sm p-4 space-y-2.5 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block border-b border-slate-200 pb-1.5">
                  Conformity Schemes Reference:
                </span>
                
                <ul className="space-y-2 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <span className="font-bold text-gov-800">Scheme-I:</span>
                    <span className="text-slate-600">Product Certification (ISI Mark) for domestic production.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-bold text-gov-800">Scheme-II:</span>
                    <span className="text-slate-600">Compulsory Registration (CRS) for electronics and IT goods.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-bold text-gov-800">Scheme-IV:</span>
                    <span className="text-slate-600">Hallmarking of Gold &amp; Silver Jewellery with HUID.</span>
                  </li>
                </ul>

                <button
                  onClick={() => navigate('/services')}
                  className="text-gov-800 font-bold hover:underline block pt-1 text-[11px]"
                >
                  Browse All Schemes &rarr;
                </button>
              </div>

              {/* Context Box 3: Official Sources Links */}
              <div className="bg-white border border-slate-300 rounded-sm p-4 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block border-b border-slate-200 pb-1.5">
                  Official Portals:
                </span>
                <div className="space-y-1.5 text-[11px]">
                  <a
                    href="https://www.manakonline.in/MANAK/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-gov-800 hover:underline"
                  >
                    <span>Manak Online (e-BIS)</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.bis.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-gov-800 hover:underline"
                  >
                    <span>BIS Official Website</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </a>
                  <a
                    href="https://www.egazette.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-gov-800 hover:underline"
                  >
                    <span>e-Gazette of India</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Context Box 4: Statutory Legal Advisory */}
              <div className="p-3.5 bg-slate-100 border-l-4 border-gov-800 rounded-r-sm text-[11px] text-slate-700 space-y-1">
                <strong className="block text-gov-900 font-bold">Statutory Note:</strong>
                <p className="leading-relaxed">
                  Information provided by ManakBot is synthesized from published BIS standards and Gazette Quality Control Orders. It does not replace formal legal opinions or official filings on manakonline.in.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </ErrorBoundary>
  );
}
