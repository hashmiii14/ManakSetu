import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, 
  Sparkles, ExternalLink, Calculator, FlaskConical, ChevronRight, Loader2, Bot, MessageSquare 
} from 'lucide-react';
import { searchStandards } from '../services/api';

export default function Hero({ onOpenStandard, onAskQuestion, onExploreStandards }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStandard, setActiveStandard] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimerRef = useRef(null);

  const quickChips = [
    { label: "Immersion Geyser", query: "immersion geyser" },
    { label: "Electrical Switch", query: "electrical switch" },
    { label: "Electric Kettle", query: "electric kettle" },
    { label: "Safety of Toys", query: "toys" },
    { label: "Packaged Water", query: "packaged water" },
    { label: "Motorcycle Helmet", query: "helmet" },
    { label: "Ordinary Cement", query: "cement" },
    { label: "Steel Rebar", query: "steel" }
  ];

  // Initial load: fetch default standard
  useEffect(() => {
    let isMounted = true;
    searchStandards("electric immersion geyser", 1).then((results) => {
      if (isMounted && results && results.length > 0) {
        setActiveStandard(results[0]);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const executeSearch = async (query) => {
    if (!query || !query.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchStandards(query, 5);
      if (results && results.length > 0) {
        setActiveStandard(results[0]);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChipClick = (query) => {
    setSearchQuery(query);
    executeSearch(query);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (val.trim().length >= 2) {
      debounceTimerRef.current = setTimeout(() => {
        executeSearch(val);
      }, 300);
    }
  };

  return (
    <section className="pt-10 pb-14 md:pt-16 md:pb-20 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Positioning & Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>ManakSetu • AI Regulatory Assistant for BIS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
            Understand Indian Standards. <br className="hidden sm:block" />
            <span className="text-emerald-700">Simplify Compliance.</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            An AI-powered assistant that helps businesses discover, understand, and navigate Indian Standards and BIS requirements. Instant IS code lookup, mandatory QCO detection, and 50% MSME fee savings.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onAskQuestion && onAskQuestion()}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold inline-flex items-center gap-2 shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask ManakBot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (onExploreStandards) {
                  onExploreStandards();
                } else {
                  const el = document.getElementById('standards');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-sm font-bold inline-flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Search className="w-4 h-4 text-neutral-500" />
              <span>Explore Standards</span>
            </button>
          </div>
        </div>

        {/* Subtle Product Preview of ManakBot Conversation */}
        <div className="bg-neutral-50 rounded-2xl p-4 sm:p-5 border border-neutral-300 shadow-sm max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 text-xs">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-neutral-800">ManakBot Live Preview</span>
            </div>
            <span className="text-neutral-400 font-mono text-[10px]">Grounded RAG Engine</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative flex-1">
              {isSearching ? (
                <Loader2 className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-600 animate-spin" />
              ) : (
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products: e.g. immersion geyser, switch, toys, water, helmet..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-medium text-neutral-900"
              />
            </div>
            <button
              onClick={() => activeStandard && onOpenStandard && onOpenStandard(activeStandard)}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
            >
              <span>View Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1-Click Popular Products Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-neutral-500 mr-1">
              Quick Suggestions:
            </span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.query)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all font-medium ${
                  searchQuery.toLowerCase().includes(chip.query)
                    ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* INSTANT RESULT CARD */}
        {activeStandard && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-500/80 shadow-md max-w-3xl mx-auto space-y-4 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
                  {activeStandard.isCode}
                </span>
                {activeStandard.category && (
                  <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">
                    {activeStandard.category}
                  </span>
                )}
                {activeStandard.relevanceScore && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                    {Math.round(activeStandard.relevanceScore * 100)}% Match
                  </span>
                )}
              </div>
              
              {activeStandard.mandatoryQCO && (
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Mandatory QCO
                </span>
              )}
            </div>

            <div>
              <h2 className="text-base sm:text-xl font-extrabold text-neutral-900">
                {activeStandard.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                {activeStandard.description}
              </p>
            </div>

            {/* 3 Key Takeaways Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">
                  Mandatory Testing
                </span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5 line-clamp-2">
                  {typeof activeStandard.keyTests?.[0] === 'string' ? activeStandard.keyTests[0] : (activeStandard.keyTests?.[0]?.name || "Benchmark Safety Testing")}
                </p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">
                  MSME Fee Concession
                </span>
                <p className="text-xs font-bold text-emerald-700 mt-0.5">
                  50% Discount for Micro Enterprises
                </p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] text-neutral-400 font-bold uppercase block">
                  Testing Lab
                </span>
                <p className="text-xs font-bold text-neutral-900 mt-0.5 line-clamp-1">
                  {typeof activeStandard.labsAvailable?.[0] === 'string' ? activeStandard.labsAvailable[0] : (activeStandard.labsAvailable?.[0]?.name || "BIS Central Laboratory")}
                </p>
              </div>
            </div>

            {/* Direct Action Row */}
            <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-neutral-500">
                Need full compliance guidance or fee estimation for this standard?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAskQuestion && onAskQuestion(`What are the testing and licensing rules for ${activeStandard.isCode}?`)}
                  className="px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Ask ManakBot</span>
                </button>

                <button
                  onClick={() => onOpenStandard(activeStandard)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shrink-0 shadow-2xs"
                >
                  <span>View Details & Labs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
