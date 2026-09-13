import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, ShieldCheck, HelpCircle, ExternalLink, ArrowLeft, Info, BookOpen, AlertCircle } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ManakBot from '../components/ManakBot';
import { getStandardById } from '../services/standardsService';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ManakBotPage({ onOpenStandard, onCheckCompliance }) {
  const { searchParams, navigate } = useRouter();
  
  const standardQuery = searchParams.get('std') || '';
  const promptQuery = searchParams.get('prompt') || '';

  const activeStandard = useMemo(() => {
    if (!standardQuery) return null;
    return getStandardById(standardQuery);
  }, [standardQuery]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left flex flex-col">
        
        {/* TOP INSTITUTIONAL SUB-HEADER */}
        <section className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
                <span>/</span>
                <span className="text-gov-800 font-bold">AI Regulatory Assistant</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gov-900 text-saffron-400 flex items-center justify-center font-bold text-sm shadow-gov-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gov-900 tracking-tight">
                    ManakBot AI Regulatory Assistant
                  </h1>
                  <p className="text-xs text-slate-600">
                    Conversational guidance on BIS Indian Standards, QCOs, NABL testing benchmarks, and MSME concessions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/standards/search')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-gov-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Browse Standards</span>
              </button>
              <a
                href="https://www.manakonline.in/MANAK/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-gov-800 hover:bg-gov-900 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-gov-sm"
              >
                <span>Manak Online</span>
                <ExternalLink className="w-3 h-3 text-saffron-400" />
              </a>
            </div>
          </div>

          {/* ACTIVE STANDARD CONTEXT BANNER */}
          {activeStandard && (
            <div className="max-w-7xl mx-auto mt-4 p-3 rounded-lg bg-gov-50 border border-gov-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gov-800 text-white font-mono font-bold text-[11px]">
                  {activeStandard.isCode}
                </span>
                <span className="font-semibold text-gov-900 line-clamp-1">
                  {activeStandard.title}
                </span>
                {activeStandard.mandatoryQCO && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">
                    Mandatory QCO
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate(`/standards/${encodeURIComponent(activeStandard.id || activeStandard.isCode)}`)}
                  className="text-gov-800 hover:text-gov-950 font-bold underline underline-offset-2 text-xs"
                >
                  View Full Technical Specs &rarr;
                </button>
              </div>
            </div>
          )}
        </section>

        {/* EMBEDDED FULL MANAKBOT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
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
        </div>

        {/* STATUTORY DISCLAIMER FOOTNOTE */}
        <div className="bg-slate-100 border-t border-slate-200 py-3 px-4 text-center text-[11px] text-slate-500">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              ManakBot is an AI assistant developed for SIH 2026. Data is grounded in BIS gazette orders and Indian Standard specifications. For formal filings, visit <a href="https://www.manakonline.in" target="_blank" rel="noopener noreferrer" className="text-gov-800 underline font-semibold">manakonline.in</a>.
            </span>
          </div>
        </div>

      </div>
    </ErrorBoundary>
  );
}
