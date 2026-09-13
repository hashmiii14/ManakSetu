import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, ExternalLink, Search, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function FaqPage() {
  const { navigate } = useRouter();
  const [openIdx, setOpenIdx] = useState('0-0');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      category: "Standards & QCO Orders",
      items: [
        {
          q: "What is an Indian Standard (IS Code)?",
          a: "Indian Standards are formal technical specifications, safety codes, and quality benchmarks published by the Bureau of Indian Standards (BIS) under the BIS Act 2016. There are over 21,000 active Indian Standards covering industrial, electronic, civil, chemical, and consumer goods."
        },
        {
          q: "What is a Quality Control Order (QCO)?",
          a: "While Indian Standards are inherently voluntary, the Government of India through line ministries (such as DPIIT, Ministry of Steel, MeitY) issues mandatory Quality Control Orders (QCOs) in the Gazette of India. Once a QCO is notified, manufacturing, importing, stocking, selling, or distributing non-certified goods is a non-bailable statutory violation under Sections 16, 17 & 29 of the BIS Act, 2016."
        },
        {
          q: "How can I check if my product falls under a mandatory QCO?",
          a: "Use ManakSetu's Instant Standards Search. Standards subject to mandatory QCOs are highlighted with an amber 'Mandatory QCO' badge, including the official Gazette S.O. order number and enforcement date."
        }
      ]
    },
    {
      category: "Certification & Testing (Scheme-I vs CRS)",
      items: [
        {
          q: "What is the difference between Scheme-I (ISI Mark) and Scheme-II (CRS)?",
          a: "Scheme-I grants the traditional ISI Mark and requires an in-house factory testing laboratory, an on-site audit by BIS officers, and independent sample testing. Scheme-II (Compulsory Registration Scheme) applies to IT and electronic goods (e.g. mobile phones, adapters, solar inverters) and operates on self-declaration of conformity supported by test reports from BIS recognized labs."
        },
        {
          q: "Are factory audits required for BIS certification?",
          a: "Yes, under Scheme-I (ISI Mark) and FMCS (Foreign Manufacturers), a BIS Technical Officer conducts a physical inspection of the factory to verify machinery, production processes, quality control personnel, and calibrated laboratory apparatus."
        },
        {
          q: "What is the validity period of a BIS license?",
          a: "A BIS license is initially granted for 1 or 2 years and can be renewed periodically for up to 5 years upon payment of renewal fees and verification of continuous compliance through market and factory surveillance audits."
        }
      ]
    },
    {
      category: "MSME Relief & Fee Concessions",
      items: [
        {
          q: "What statutory fee concessions are available for Micro enterprises?",
          a: "Micro enterprises holding a valid Udyam Registration Certificate receive a 50% statutory concession on application fees, annual license fees, and minimum marking fees. Women-owned enterprises and DPIIT-recognized startups also receive 50% concession."
        },
        {
          q: "What concession do Small enterprises receive?",
          a: "Small enterprises holding a valid Udyam Registration receive a 20% statutory concession on the minimum marking fee."
        }
      ]
    },
    {
      category: "Consumer Verification & Hallmarking",
      items: [
        {
          q: "What is a 6-digit Gold HUID?",
          a: "HUID stands for Hallmark Unique Identification. It is a 6-digit alphanumeric code laser-engraved onto every piece of hallmarked gold jewellery. Consumers can verify this code in the official BIS CARE app or ManakSetu's Consumer Verifier to inspect purity, jeweller registration, and assaying center."
        },
        {
          q: "How do I report a suspected fake ISI mark?",
          a: "You can file a complaint directly using ManakSetu's Report Violation modal, through the official BIS CARE app, or by calling the National Consumer Helpline at toll-free 1915."
        }
      ]
    }
  ];

  const filteredCategories = categories
    .filter(cat => activeCategory === 'ALL' || cat.category === activeCategory)
    .map(cat => {
      if (!searchQuery.trim()) return cat;
      const qLower = searchQuery.toLowerCase();
      return {
        ...cat,
        items: cat.items.filter(item => 
          item.q.toLowerCase().includes(qLower) || item.a.toLowerCase().includes(qLower)
        )
      };
    })
    .filter(cat => cat.items.length > 0);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* HEADER */}
        <section className="bg-white border-b border-slate-300 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-gov-800 font-semibold">Frequently Asked Questions</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  Frequently Asked Questions (FAQ)
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Institutional guide to Indian Standards, BIS certification schemes, mandatory Quality Control Orders (QCOs), MSME concessions, and consumer protection.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate('/manakbot')}
                  className="px-3.5 py-2 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs rounded-sm inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask ManakBot Directly</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 12-COLUMN FAQ WORKSPACE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: SEARCH & CATEGORY SELECTOR (4 COLS) */}
            <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-4">
              
              {/* FAQ Search */}
              <div className="bg-white rounded-sm border border-slate-300 p-4 shadow-sm space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Search FAQ Repository
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords (e.g. QCO, HUID, audit)..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-gov-800 focus:border-gov-800 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              {/* Category Filter Nav */}
              <div className="bg-white rounded-sm border border-slate-300 p-3 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 block">
                  Browse by Subject
                </span>
                <button
                  onClick={() => setActiveCategory('ALL')}
                  className={`w-full px-3 py-2 text-xs font-semibold rounded-sm text-left transition-colors flex items-center justify-between ${
                    activeCategory === 'ALL'
                      ? 'bg-gov-800 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] opacity-80">
                    {categories.reduce((acc, c) => acc + c.items.length, 0)}
                  </span>
                </button>
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategory(cat.category)}
                    className={`w-full px-3 py-2 text-xs font-semibold rounded-sm text-left transition-colors flex items-center justify-between ${
                      activeCategory === cat.category
                        ? 'bg-gov-800 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate mr-2">{cat.category}</span>
                    <span className="text-[10px] opacity-80">{cat.items.length}</span>
                  </button>
                ))}
              </div>

              {/* Quick AI Consultation Card */}
              <div className="p-4 rounded-sm bg-gov-900 text-white border border-gov-950 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Legal &amp; Technical Desk</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">
                  Need clause-level standards clarification?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ManakBot can interpret specific testing tolerances, minimum sample quantities, and gazette cut-off deadlines.
                </p>
                <button
                  onClick={() => navigate('/manakbot')}
                  className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-gov-900 font-bold text-xs rounded-sm transition-colors text-center shadow-xs block"
                >
                  Launch ManakBot AI
                </button>
              </div>

            </aside>

            {/* RIGHT COLUMN: ACCORDION LIST (8 COLS) */}
            <main className="lg:col-span-8 space-y-6">
              {filteredCategories.length === 0 ? (
                <div className="bg-white rounded-sm border border-slate-300 p-8 text-center space-y-3 shadow-sm">
                  <p className="text-sm font-bold text-slate-900">
                    No FAQ items found matching "{searchQuery}"
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); }}
                    className="px-4 py-1.5 text-xs font-bold bg-gov-800 text-white rounded-sm hover:bg-gov-900"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="space-y-3">
                    <div className="border-b-2 border-gov-800 pb-1.5 flex items-center justify-between">
                      <h2 className="text-sm sm:text-base font-bold text-gov-900 uppercase tracking-wide">
                        {cat.category}
                      </h2>
                      <span className="text-[11px] font-mono text-slate-500 font-bold">
                        {cat.items.length} Question{cat.items.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {cat.items.map((item, itemIdx) => {
                        const globalIdx = `${catIdx}-${itemIdx}`;
                        const isOpen = openIdx === globalIdx;

                        return (
                          <div
                            key={itemIdx}
                            className="bg-white border border-slate-300 rounded-sm overflow-hidden shadow-sm transition-all"
                          >
                            <button
                              onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                              className="w-full p-4 sm:p-4.5 flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-gov-950 hover:text-gov-800 transition-colors"
                            >
                              <span>{item.q}</span>
                              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-gov-800' : ''}`} />
                            </button>

                            {isOpen && (
                              <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 text-xs text-slate-700 leading-relaxed border-t border-slate-200 bg-slate-50/70">
                                {item.a}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}

              {/* Portal Statutory Reference Notice */}
              <div className="p-4 bg-white rounded-sm border border-slate-300 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="font-bold text-gov-900 block">Looking for official BIS manuals?</span>
                  <span className="text-[11px] text-slate-500">Access statutory handbooks directly on the BIS Manak Online portal.</span>
                </div>
                <a
                  href="https://www.manakonline.in/MANAK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-sm border border-slate-300 inline-flex items-center gap-1.5 transition-colors shrink-0 text-xs"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </main>

          </div>
        </div>

      </div>
    </ErrorBoundary>
  );
}
