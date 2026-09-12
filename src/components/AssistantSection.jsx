import React, { useState } from 'react';
import { 
  Send, Sparkles, CheckCircle2, AlertTriangle, FileText, 
  ArrowUpRight, ExternalLink, ShieldCheck, ListChecks, HelpCircle 
} from 'lucide-react';
import { askManakSetuAI } from '../services/aiEngine';

export default function AssistantSection() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sampleQuestions = [
    { text: "What is BIS certification & why is it needed?", query: "What is BIS certification?" },
    { text: "Which standard applies to electric storage geysers?", query: "electric geyser" },
    { text: "What are the rules for packaged drinking water?", query: "packaged water" },
    { text: "What documents do I need to apply for a license?", query: "What documents do I need?" }
  ];

  const handleAsk = async (textToAsk) => {
    const q = textToAsk || query;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await askManakSetuAI(q);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="assistant" className="py-16 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8 max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>ManaKSetu AI Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Ask Any Question About Standards & BIS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Click any popular question below or type your own question to get an instant statutory answer:
          </p>
        </div>

        {/* 1-Click Common Question Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sq.query);
                handleAsk(sq.query);
              }}
              className="p-3.5 rounded-xl border border-neutral-200 hover:border-emerald-500 bg-neutral-50/70 hover:bg-emerald-50/50 text-left transition-all flex items-center justify-between gap-2 group shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white border border-neutral-300 text-neutral-500 text-[10px] font-bold flex items-center justify-center shrink-0 group-hover:border-emerald-500 group-hover:text-emerald-700">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-neutral-800 group-hover:text-emerald-900">
                  {sq.text}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 shrink-0">
                Ask →
              </span>
            </button>
          ))}
        </div>

        {/* Custom Question Input Box */}
        <div className="bg-neutral-50 rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-xs mb-6">
          <label className="text-xs font-bold text-neutral-700 block mb-2">
            Or type your custom question:
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              id="assistant-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. What laboratory tests are required for plastic infant toys?"
              className="flex-1 px-4 py-3 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all font-medium text-neutral-900"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors disabled:opacity-50 shadow-xs shrink-0"
            >
              {loading ? (
                <span className="inline-block animate-spin">⏳</span>
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Ask Question</span>
            </button>
          </div>
        </div>

        {/* Structured Result Display */}
        {result && (
          <div className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md p-6 space-y-5 animate-in fade-in">
            
            {/* Top Bar with Source */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Statutory Answer
              </span>
              <span className="text-neutral-400 font-mono text-[11px]">
                {result.source}
              </span>
            </div>

            {/* 1. Direct Summary Answer */}
            <div>
              <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Summary
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                {result.summary}
              </p>
            </div>

            {/* 2. Relevant Standard (if present) */}
            {result.relevantStandard && (
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded border border-neutral-200 font-mono">
                    {result.relevantStandard.isCode}
                  </span>
                  {result.relevantStandard.mandatoryQCO && (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Mandatory Quality Control Order
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-neutral-900">
                  {result.relevantStandard.title}
                </h4>
                <p className="text-xs text-neutral-500">
                  Category: {result.relevantStandard.category} • Scheme: {result.relevantStandard.scheme}
                </p>
              </div>
            )}

            {/* 3. Requirements */}
            {result.requirements && result.requirements.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Important Requirements & Testing
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-700">
                  {result.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Required Documents */}
            {result.documents && result.documents.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Required Documentation
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                  {result.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                      <FileText className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 5. Next Steps */}
            {result.nextSteps && result.nextSteps.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Recommended Action Steps
                </h4>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {result.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/40 border border-emerald-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-neutral-800">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Sources & References */}
            {result.references && result.references.length > 0 && (
              <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                <span className="font-semibold text-neutral-700">Official Portal Links:</span>
                <div className="flex flex-wrap items-center gap-3">
                  {result.references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>{ref.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
