import React, { useState, useEffect, useRef } from 'react';
import { Search, AlertTriangle, ArrowRight, CheckCircle2, Filter, Loader2 } from 'lucide-react';
import { searchStandards } from '../services/api';

export default function ExploreStandards({ onSelectStandard, onAskBot, onCheckCompliance }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [standardsList, setStandardsList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  const categories = [
    { id: 'ALL', label: 'All Standards' },
    { id: 'Electrical', label: 'Electrical & Appliances' },
    { id: 'Food', label: 'Food & Drinking Water' },
    { id: 'Children', label: 'Children & Toys' },
    { id: 'Construction', label: 'Construction & Steel' },
    { id: 'Gold', label: 'Gold & Jewellery' },
    { id: 'Automotive', label: 'Automotive & Helmets' }
  ];

  const fetchStandards = async (query = '') => {
    setIsSearching(true);
    try {
      const results = await searchStandards(query, 12);
      setStandardsList(results || []);
    } catch (err) {
      console.error("Explore standards fetch error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchStandards('');
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchStandards(val);
    }, 300);
  };

  const filteredStandards = standardsList.filter(item => {
    if (selectedCategory === 'ALL') return true;
    return item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <section id="standards" className="py-16 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Section Heading */}
        <div className="mb-8 max-w-xl">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Directory & Search
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Explore Indian Standards
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
            Search canonical Indian Standards (IS Codes), identify mandatory Quality Control Orders, and view statutory certification guidelines.
          </p>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-xs mb-8 space-y-4">
          <div className="relative">
            {isSearching ? (
              <Loader2 className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-600 animate-spin" />
            ) : (
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
            )}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search standards, products, or keywords (e.g. immersion geyser, water, toys, helmet, cement)..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-neutral-900"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  fetchStandards('');
                }}
                className="absolute right-3 top-2.5 text-xs font-bold text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100">
            <span className="text-xs font-medium text-neutral-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-neutral-400" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Standards Results Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 px-1">
            <span>Showing {filteredStandards.length} Standards</span>
            <span>Canonical BIS Specifications</span>
          </div>

          {filteredStandards.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-neutral-200">
              <p className="text-sm font-semibold text-neutral-700">No standards matched your search.</p>
              <p className="text-xs text-neutral-500 mt-1">Try broader terms such as "water", "toys", "electric", or "cement".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStandards.map((std) => (
                <div
                  key={std.id || std.isCode}
                  className="bg-white p-5 rounded-xl border border-neutral-200 hover:border-emerald-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-mono">
                          {std.isCode}
                        </span>
                        {std.relevanceScore && searchTerm && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                            {Math.round(std.relevanceScore * 100)}% Match
                          </span>
                        )}
                      </div>
                      {std.mandatoryQCO ? (
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Mandatory QCO
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                          Voluntary
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {std.title}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                      {std.description || std.scope}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <span className="text-neutral-500 font-medium">
                      {std.category}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onAskBot && onAskBot(`Explain the compliance requirements and testing rules for ${std.isCode} (${std.title})`)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold transition-colors text-[11px]"
                        title="Ask ManakBot about this standard"
                      >
                        Ask Bot
                      </button>

                      <button
                        onClick={() => onCheckCompliance && onCheckCompliance(std.isCode)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-900 border border-neutral-200 text-neutral-700 font-semibold transition-colors text-[11px]"
                        title="Run compliance check for this standard"
                      >
                        Check Compliance
                      </button>

                      <button
                        onClick={() => onSelectStandard(std)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors text-[11px] shadow-2xs"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

