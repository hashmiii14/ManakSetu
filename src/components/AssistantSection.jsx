import React, { useState } from 'react';
import { 
  Send, Sparkles, CheckCircle2, AlertTriangle, FileText, 
  ArrowUpRight, ExternalLink, ShieldCheck, ListChecks, HelpCircle, Loader2, BookOpen 
} from 'lucide-react';
import { askManakBot } from '../services/api';

export default function AssistantSection({ onSelectStandard }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sampleQuestions = [
    { text: "What is BIS certification & why is it needed?", query: "What is BIS certification and why is it needed?" },
    { text: "Which standard applies to electric immersion geysers?", query: "Which Indian standard applies to electric immersion geysers?" },
    { text: "What are the rules for packaged drinking water?", query: "What are the mandatory testing rules for packaged drinking water?" },
    { text: "What are the safety standards for infant toys?", query: "What are the safety and testing standards for baby toys?" }
  ];

  const handleAsk = async (textToAsk) => {
    const q = textToAsk || query;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await askManakBot(q);
      setResult(res);
    } catch (err) {
      console.error("Assistant query error:", err);
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
            <span>ManaKBot Regulatory Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Ask Any Question About Standards & BIS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Click any common compliance question below or ask about your product to get instant, grounded guidance:
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
            Or type your custom compliance question:
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              id="assistant-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. What laboratory tests and documentation are required for immersion geysers?"
              className="flex-1 px-4 py-3 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all font-medium text-neutral-900"
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors disabled:opacity-50 shadow-xs shrink-0"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Ask ManakBot</span>
            </button>
          </div>
        </div>

        {/* Structured Result Display */}
        {result && (
          <div className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md p-6 space-y-5 animate-in fade-in">
            
            {/* Top Bar with Source */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Grounded Compliance Answer
              </span>
              <span className="text-neutral-500 text-[11px] font-mono">
                {result.source || "BIS Standards Knowledge Engine"}
              </span>
            </div>

            {/* Referenced Standards Pills */}
            {result.referenced_standards && result.referenced_standards.length > 0 && (
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-2">
                  Referenced Indian Standards:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {result.referenced_standards.map((std, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-neutral-300 text-xs font-medium text-neutral-800"
                    >
                      <BookOpen className="w-3 h-3 text-emerald-600" />
                      <span className="font-mono font-bold text-emerald-800">
                        {typeof std === 'object' ? std.is_number : std}
                      </span>
                      {typeof std === 'object' && std.title && (
                        <span className="text-neutral-500 line-clamp-1 max-w-[200px]">{std.title}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Content */}
            <div className="prose prose-sm max-w-none text-neutral-800 leading-relaxed space-y-3">
              {result.answer.split('\n\n').map((para, pIdx) => {
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-sm font-bold text-neutral-900 mt-4 mb-1 border-b border-neutral-100 pb-1">
                      {para.replace('### ', '')}
                    </h3>
                  );
                } else if (para.startsWith('- ')) {
                  const items = para.split('\n');
                  return (
                    <ul key={pIdx} className="space-y-1 my-2 text-xs text-neutral-700 pl-2">
                      {items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={pIdx} className="text-xs sm:text-sm text-neutral-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                );
              })}
            </div>

            {/* Statutory Disclaimer Footer */}
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="italic">
                {result.disclaimer || "AI-assisted guidance based on available standards information. Always verify statutory requirements on the official BIS portal (manakonline.in)."}
              </span>
              <a
                href="https://www.manakonline.in"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline shrink-0 ml-2"
              >
                <span>manakonline.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
