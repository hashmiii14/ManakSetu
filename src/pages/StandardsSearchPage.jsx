import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Filter, X, ArrowRight, CheckCircle2, AlertTriangle, 
  ExternalLink, Sparkles, BookOpen, ShieldCheck, Globe, Loader2, RotateCcw,
  SlidersHorizontal, LayoutGrid, Table as TableIcon, Tag, Clock, ChevronRight
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { searchStandards, getPopularSearches, getSectorsList } from '../services/standardsService';
import ErrorBoundary from '../components/ErrorBoundary';

const RECENT_SEARCHES_KEY = 'manaksetu_recent_searches_v1';

export default function StandardsSearchPage({ onOpenStandardModal }) {
  const { searchParams, navigate } = useRouter();
  
  // Read initial query from URL (?q=...)
  const initialQuery = searchParams.get('q') || '';
  const initialSector = searchParams.get('sector') || 'All Sectors';

  const [query, setQuery] = useState(initialQuery);
  const [selectedSector, setSelectedSector] = useState(initialSector);
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'MANDATORY' | 'VOLUNTARY'
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' | 'code' | 'title'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceTimerRef = useRef(null);
  const popularChips = useMemo(() => getPopularSearches(), []);
  const sectorsList = useMemo(() => getSectorsList(), []);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      }
    } catch (e) {
      console.warn("Failed to load recent searches:", e);
    }
  }, []);

  // Sync if URL query changes
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== query) {
      setQuery(q);
    }
  }, [searchParams]);

  const saveRecentSearch = (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    const clean = searchTerm.trim();
    try {
      const updated = [clean, ...recentSearches.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save recent search:", e);
    }
  };

  // Perform search
  const results = useMemo(() => {
    const raw = searchStandards(query, {
      sector: selectedSector,
      scheme: selectedScheme,
      status: selectedStatus
    });

    // Sorting
    const sorted = [...raw];
    if (sortBy === 'code') {
      sorted.sort((a, b) => a.isCode.localeCompare(b.isCode));
    } else if (sortBy === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sorted;
  }, [query, selectedSector, selectedScheme, selectedStatus, sortBy]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (val.trim()) {
        saveRecentSearch(val);
      }
    }, 800);
  };

  const handleChipClick = (searchQuery) => {
    setQuery(searchQuery);
    saveRecentSearch(searchQuery);
    navigate(`/standards/search?q=${encodeURIComponent(searchQuery)}`, { preserveScroll: true });
  };

  const handleClearFilters = () => {
    setQuery('');
    setSelectedSector('All Sectors');
    setSelectedScheme('ALL');
    setSelectedStatus('ALL');
    setSortBy('relevance');
    navigate('/standards/search', { preserveScroll: true });
  };

  const handleViewDetails = (standard) => {
    if (onOpenStandardModal) {
      onOpenStandardModal(standard);
    } else {
      navigate(`/standards/${encodeURIComponent(standard.id || standard.isCode)}`);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* BREADCRUMB HEADER */}
        <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-slate-800 font-bold">Standards Directory</span>
              <span>/</span>
              <span className="text-gov-700 font-bold">Instant Standards Search</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  Instant Indian Standards Search
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Search canonical Indian Standards (IS Codes), verify mandatory Quality Control Orders (QCOs), inspect testing parameters, and cross-reference international ISO/IEC harmonizations.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-500 font-semibold hidden md:inline">
                  Prototype Compendium:
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-gov-100 text-gov-800 border border-gov-200">
                  {results.length} Standards Loaded
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH BAR & QUICK SUGGESTIONS CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-gov p-4 sm:p-5 space-y-3">
            
            {/* Main Input Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search by IS number (e.g. IS 302, 2082), product (geyser, helmet, cement, water), or sector..."
                className="w-full pl-11 pr-10 py-3 bg-slate-50 focus:bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-gov-700 focus:border-gov-700 transition-all shadow-inner"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-3 p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular Searches & Recent Searches Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider mr-1">
                  Popular Searches:
                </span>
                {popularChips.slice(0, 6).map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChipClick(chip.query)}
                    className="px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-gov-50 hover:border-gov-400 text-slate-700 hover:text-gov-900 transition-colors font-medium text-[11px]"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {recentSearches.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Recent:</span>
                  {recentSearches.slice(0, 3).map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleChipClick(term)}
                      className="hover:underline text-gov-700 font-medium"
                    >
                      {term}{i < Math.min(recentSearches.length, 3) - 1 ? ',' : ''}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* MAIN TWO-COLUMN WORKSPACE: FILTERS + RESULTS */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* DESKTOP LEFT FILTER SIDEBAR */}
            <aside className="hidden lg:block bg-white rounded-xl border border-slate-200 p-5 shadow-gov-sm space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gov-700" />
                  <span className="font-bold text-sm text-gov-900">Filters</span>
                </div>
                {(query || selectedSector !== 'All Sectors' || selectedScheme !== 'ALL' || selectedStatus !== 'ALL') && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[11px] text-saffron-700 hover:underline font-bold"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Filter 1: Sector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Industry / Sector
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-700"
                >
                  {sectorsList.map((sec, idx) => (
                    <option key={idx} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              {/* Filter 2: Conformity Assessment Scheme */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Conformity Scheme
                </label>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {[
                    { id: 'ALL', label: 'All Schemes' },
                    { id: 'SCHEME_1', label: 'Scheme-I (ISI Mark)' },
                    { id: 'SCHEME_2', label: 'Scheme-II (CRS IT/Solar)' },
                    { id: 'SCHEME_4', label: 'Scheme-IV (Hallmarking)' }
                  ].map((sc) => (
                    <label key={sc.id} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                      <input
                        type="radio"
                        name="scheme_filter"
                        checked={selectedScheme === sc.id}
                        onChange={() => setSelectedScheme(sc.id)}
                        className="text-gov-700 focus:ring-gov-700"
                      />
                      <span>{sc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter 3: Statutory Status */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Statutory Enforcement
                </label>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {[
                    { id: 'ALL', label: 'All Standards' },
                    { id: 'MANDATORY', label: 'Mandatory QCO Enforced' },
                    { id: 'VOLUNTARY', label: 'Voluntary Standard' }
                  ].map((st) => (
                    <label key={st.id} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-50">
                      <input
                        type="radio"
                        name="status_filter"
                        checked={selectedStatus === st.id}
                        onChange={() => setSelectedStatus(st.id)}
                        className="text-gov-700 focus:ring-gov-700"
                      />
                      <span>{st.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Official BIS Reference Card */}
              <div className="pt-2 border-t border-slate-200 text-xs space-y-2 bg-slate-50 p-3 rounded-lg">
                <span className="font-bold text-gov-900 block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gov-700" />
                  Official Catalogue
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Looking for the complete live database of 22,000+ Indian Standards?
                </p>
                <a
                  href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gov-700 hover:text-gov-900 font-bold underline text-[11px] inline-flex items-center gap-1"
                >
                  <span>Know Your Standards Portal</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

            </aside>

            {/* RIGHT RESULTS AREA */}
            <main className="lg:col-span-3 space-y-4">
              
              {/* Controls bar: Count, Sort By, View Mode */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-gov-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                
                <div className="flex items-center justify-between sm:justify-start gap-3">
                  <span className="font-bold text-slate-700">
                    {results.length} Standard{results.length === 1 ? '' : 's'} Found
                  </span>
                  {query && (
                    <span className="text-slate-400 hidden sm:inline">
                      for "<strong className="text-slate-800">{query}</strong>"
                    </span>
                  )}

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="lg:hidden px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 flex items-center gap-1 bg-slate-50"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-gov-700" />
                    <span>Filter</span>
                  </button>
                </div>

                {/* Right controls: Sorting + Layout Toggle */}
                <div className="flex items-center gap-2.5 justify-end">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 font-medium">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-gov-700"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="code">IS Number</option>
                      <option value="title">Standard Title</option>
                    </select>
                  </div>

                  <div className="hidden sm:flex items-center border border-slate-300 rounded-lg p-0.5 bg-slate-50">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white shadow-gov text-gov-800' : 'text-slate-400 hover:text-slate-700'}`}
                      title="Table View"
                    >
                      <TableIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`p-1.5 rounded ${viewMode === 'cards' ? 'bg-white shadow-gov text-gov-800' : 'text-slate-400 hover:text-slate-700'}`}
                      title="Card View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* MOBILE FILTER ACCORDION / DRAWER */}
              {mobileFilterOpen && (
                <div className="lg:hidden bg-white p-4 rounded-xl border border-slate-200 shadow-gov space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-sm text-gov-900">Mobile Filter Controls</span>
                    <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-600">Sector</label>
                    <select
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    >
                      {sectorsList.map((sec, idx) => (
                        <option key={idx} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-600">Enforcement</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    >
                      <option value="ALL">All Standards</option>
                      <option value="MANDATORY">Mandatory QCO Only</option>
                      <option value="VOLUNTARY">Voluntary Only</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="w-full py-2 bg-gov-700 text-white font-bold rounded-lg text-xs"
                  >
                    Apply Filters
                  </button>
                </div>
              )}

              {/* RESULTS LIST: 0 MATCHES EMPTY STATE */}
              {results.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-saffron-100 text-saffron-700 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h3 className="text-base font-bold text-slate-900">
                      हम आपके खोज शब्द से संबंधित कोई मानक नहीं ढूंढ पाए।
                    </h3>
                    <p className="text-xs text-slate-600">
                      We couldn't find a matching Indian Standard for "{query}".
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Try searching broader terms like <strong>"helmet"</strong>, <strong>"cement"</strong>, <strong>"geyser"</strong>, <strong>"toys"</strong>, or an exact IS number like <strong>"IS 302"</strong>.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={handleClearFilters}
                      className="px-4 py-2 rounded-lg bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-gov"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Search Filters</span>
                    </button>

                    <button
                      onClick={() => navigate(`/manakbot?q=${encodeURIComponent(query)}`)}
                      className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                      <span>Ask ManakBot AI to Locate</span>
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW MODE 1: GOVERNMENT HYBRID TABLE (DESKTOP) */}
              {results.length > 0 && viewMode === 'table' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-bold">
                          <th className="py-3 px-4 w-36">IS Number</th>
                          <th className="py-3 px-4">Standard Title & Technical Scope</th>
                          <th className="py-3 px-4 w-40">Sector / Category</th>
                          <th className="py-3 px-4 w-32">Statutory Status</th>
                          <th className="py-3 px-4 w-36 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {results.map((std) => (
                          <tr 
                            key={std.id || std.isCode}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            {/* Col 1: IS Code */}
                            <td className="py-3.5 px-4 align-top">
                              <span className="font-mono font-bold text-gov-800 bg-gov-50 px-2 py-1 rounded border border-gov-200 block text-xs w-fit">
                                {std.isCode}
                              </span>
                              <span className="text-[10px] text-slate-500 mt-1 block">
                                {std.schemeCode === 'SCHEME_2' ? 'CRS Registration' : (std.schemeCode === 'SCHEME_4' ? 'Hallmark Scheme' : 'Scheme-I (ISI)')}
                              </span>
                            </td>

                            {/* Col 2: Title & Scope */}
                            <td className="py-3.5 px-4 align-top space-y-1">
                              <h4 
                                onClick={() => handleViewDetails(std)}
                                className="text-sm font-bold text-slate-900 hover:text-gov-700 cursor-pointer transition-colors leading-snug"
                              >
                                {std.title}
                              </h4>
                              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                {std.description || std.scope}
                              </p>
                              
                              {/* Global Harmonization Pill */}
                              {std.globalHarmonization && (
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
                                  <Globe className="w-3 h-3 text-gov-600" />
                                  <span>Int'l Equiv: <strong className="text-slate-700 font-mono">{std.globalHarmonization.standard}</strong></span>
                                </div>
                              )}
                            </td>

                            {/* Col 3: Category */}
                            <td className="py-3.5 px-4 align-top text-slate-600">
                              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-medium block w-fit">
                                {std.category}
                              </span>
                              <span className="text-[10px] text-slate-400 block mt-1">
                                {std.sector}
                              </span>
                            </td>

                            {/* Col 4: Status */}
                            <td className="py-3.5 px-4 align-top">
                              {std.mandatoryQCO ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                                  <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                                  <span>Mandatory QCO</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                  <span>Voluntary</span>
                                </span>
                              )}
                            </td>

                            {/* Col 5: Actions */}
                            <td className="py-3.5 px-4 align-top text-right space-y-1.5">
                              <button
                                onClick={() => handleViewDetails(std)}
                                className="w-full px-2.5 py-1.5 rounded bg-gov-700 hover:bg-gov-800 text-white font-bold text-xs inline-flex items-center justify-center gap-1 transition-colors shadow-gov-sm"
                              >
                                <span>View Specs</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => navigate(`/manakbot?std=${encodeURIComponent(std.isCode)}`)}
                                className="w-full px-2 py-1 rounded bg-slate-100 hover:bg-gov-50 hover:text-gov-800 text-slate-700 font-semibold text-[11px] inline-flex items-center justify-center gap-1 transition-colors border border-slate-200"
                                title="Ask ManakBot about requirements"
                              >
                                <Sparkles className="w-3 h-3 text-saffron-600" />
                                <span>Ask ManakBot</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* VIEW MODE 2: RESPONSIVE CARDS */}
              {results.length > 0 && viewMode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((std) => (
                    <div
                      key={std.id || std.isCode}
                      className="bg-white p-5 rounded-xl border border-slate-200 hover:border-gov-400 shadow-gov-sm transition-all flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-bold text-xs text-gov-800 bg-gov-50 px-2.5 py-1 rounded border border-gov-200">
                            {std.isCode}
                          </span>
                          {std.mandatoryQCO ? (
                            <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Mandatory QCO
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              Voluntary
                            </span>
                          )}
                        </div>

                        <h4 
                          onClick={() => handleViewDetails(std)}
                          className="text-base font-bold text-slate-900 hover:text-gov-700 cursor-pointer transition-colors leading-snug"
                        >
                          {std.title}
                        </h4>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {std.description || std.scope}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-500 font-medium">
                          {std.category}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/manakbot?std=${encodeURIComponent(std.isCode)}`)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Ask ManakBot"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                          </button>

                          <button
                            onClick={() => handleViewDetails(std)}
                            className="px-3 py-1.5 rounded-lg bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold inline-flex items-center gap-1 transition-colors shadow-gov-sm"
                          >
                            <span>View Specs</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </main>

          </div>

        </div>

      </div>
    </ErrorBoundary>
  );
}
