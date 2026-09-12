import React, { useState } from 'react';
import { 
  Search, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, 
  Sparkles, ExternalLink, Calculator, FlaskConical, ChevronRight 
} from 'lucide-react';
import { BIS_STANDARDS } from '../data/bisStandards';
import { searchStandards } from '../services/aiEngine';

export default function Hero({ onOpenStandard, onAskQuestion }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStandard, setActiveStandard] = useState(BIS_STANDARDS[0]); // Defaults to Electric Geyser
  const [hasInteracted, setHasInteracted] = useState(false);

  const quickChips = [
    { label: "Electric Geyser", query: "geyser" },
    { label: "Toys", query: "toys" },
    { label: "Packaged Water", query: "packaged water" },
    { label: "Helmets", query: "helmet" },
    { label: "Plugs & Sockets", query: "plug" },
    { label: "Cement", query: "cement" }
  ];

  const handleChipClick = (query) => {
    setSearchQuery(query);
    setHasInteracted(true);
    const results = searchStandards(query);
    if (results.length > 0) {
      setActiveStandard(results[0]);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setHasInteracted(true);
      const results = searchStandards(val);
      if (results.length > 0) {
        setActiveStandard(results[0]);
      }
    }
  };

  return (
    <section className="pt-8 pb-14 md:pt-14 md:pb-20 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Main Heading & Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>ManaKSetu • BIS Standards & Compliance Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
            Check BIS Standards & Licensing for Your Product
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Select or type any manufactured product below. See its official <strong>IS Code</strong>, mandatory government rules, testing requirements, and <strong>50% MSME fee discount</strong> instantly.
          </p>
        </div>

        {/* INSTANT INTERACTIVE SEARCH BOX (Front and center - No confusion) */}
        <div className="bg-neutral-50 rounded-2xl p-4 sm:p-5 border border-neutral-300 shadow-sm max-w-3xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Type any product (e.g. Electric geyser, packaged water, toys, plug)..."
                className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all font-medium text-neutral-900"
              />
            </div>
            <button
              onClick={() => activeStandard && onOpenStandard(activeStandard)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shrink-0 shadow-xs"
            >
              <span>View Full Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 1-Click Popular Products Chips */}
          <div className="mt-3.5 pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-neutral-500 mr-1">
              Popular Products (1-Click):
            </span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.query)}
                className={`text-xs px-3 py-1 rounded-lg border transition-all font-medium ${
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

        {/* INSTANT RESULT CARD (Visible right on the first screen!) */}
        {activeStandard && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-emerald-500/80 shadow-md max-w-3xl mx-auto space-y-4 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
                  {activeStandard.isCode}
                </span>
                <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">
                  {activeStandard.scheme}
                </span>
              </div>
              
              {activeStandard.mandatoryQCO && (
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Mandatory Quality Control Order (QCO)
                </span>
              )}
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900">
                {activeStandard.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                {activeStandard.description}
              </p>
            </div>

            {/* 3 Key Takeaways Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">
                  Mandatory Testing
                </span>
                <p className="text-xs font-bold text-neutral-900 mt-1 line-clamp-2">
                  {activeStandard.keyTests[0]}
                </p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">
                  MSME Fee Concession
                </span>
                <p className="text-xs font-bold text-emerald-700 mt-1">
                  50% Discount for Micro Enterprises
                </p>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">
                  Testing Lab
                </span>
                <p className="text-xs font-bold text-neutral-900 mt-1 line-clamp-1">
                  {activeStandard.labsAvailable[0]?.name || "BIS Central Laboratory"}
                </p>
              </div>
            </div>

            {/* Direct Action Row */}
            <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-neutral-500">
                Need to apply? Follow the 5-stage roadmap or view complete test benchmarks.
              </span>
              <button
                onClick={() => onOpenStandard(activeStandard)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors shrink-0"
              >
                <span>View Full Roadmap & Requirements</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
