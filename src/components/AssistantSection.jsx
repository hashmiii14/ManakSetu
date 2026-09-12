import React, { useState } from 'react';
import { 
  Send, Sparkles, CheckCircle2, AlertTriangle, FileText, 
  ArrowUpRight, ExternalLink, ShieldCheck, ListChecks, HelpCircle 
} from 'lucide-react';
import { askManakSetuAI } from '../services/aiEngine';

export default function AssistantSection({ onSelectStandard }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sampleQuestions = [
    "What is BIS certification?",
    "Which standard applies to my product?",
    "How do I check BIS requirements?",
    "What documents do I need?"
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
    <section id="assistant" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Section Header */}
        <div className="text-center mb-8 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>ManaKSetu Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Ask anything about Indian Standards & BIS services
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
            Type any product name or regulatory question for instant structured answers.
          </p>
        </div>

        {/* Question Input Card */}
        <div className="bg-neutral-50/80 rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              id="assistant-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your question (e.g. Which standard applies to electric water heaters?)..."
              className="flex-1 px-4 py-3 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all font-medium text-neutral-900"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 shadow-xs shrink-0"
            >
              {loading ? (
                <span className="inline-block animate-spin">⏳</span>
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Ask ManaKSetu</span>
            </button>
          </div>

          {/* Clickable Example Suggestions */}
          <div className="mt-3.5 pt-3 border-t border-neutral-200/80 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-neutral-500 font-medium mr-1">
              Examples:
            </span>
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(sq);
                  handleAsk(sq);
                }}
                className="text-xs bg-white hover:bg-emerald-50 text-neutral-700 hover:text-emerald-800 px-3 py-1 rounded-lg border border-neutral-200 hover:border-emerald-300 transition-all font-medium"
              >
                "{sq}"
              </button>
            ))}
          </div>
        </div>

        {/* Structured Result Display */}
        {result && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs p-6 space-y-6 animate-in fade-in">
            
            {/* Top Bar with Source */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Verified Statutory Response
              </span>
              <span className="text-neutral-400 font-mono text-[11px]">
                {result.source}
              </span>
            </div>

            {/* 1. Direct Summary Answer */}
            <div>
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                Answer
              </h3>
              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                {result.summary}
              </p>
            </div>

            {/* 2. Relevant Standard (if present) */}
            {result.relevantStandard && (
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded border border-neutral-200">
                    {result.relevantStandard.isCode}
                  </span>
                  {result.relevantStandard.mandatoryQCO && (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
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
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Important Requirements
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
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Documents Needed
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
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Recommended Next Steps
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
                <span className="font-semibold text-neutral-700">Official References:</span>
                <div className="flex flex-wrap items-center gap-3">
                  {result.references.map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1 hover:underline"
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
