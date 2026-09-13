import React, { useState } from 'react';
import { 
  Search, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, BookOpen, HelpCircle, ExternalLink, Loader2, Layers, 
  Compass, Globe, Users, Factory, FileText, Check, Award
} from 'lucide-react';
import { discoverProductStandards } from '../services/api';
import { BIS_STANDARDS } from '../data/bisStandards';

const COLLOQUIAL_DEMO_CHIPS = [
  { label: "geyser (ग़ीज़र)", query: "geyser", category: "Electrical Appliance" },
  { label: "khilona (खिलौना)", query: "khilona", category: "Consumer Products" },
  { label: "chulha / rod", query: "chulha water heater", category: "Electrical Appliance" },
  { label: "paani ki botal (पानी बोतल)", query: "paani ki botal", category: "Food & Water" },
  { label: "switch / plug", query: "switch", category: "Mechanical & Hardware" },
  { label: "helmet (हेल्मेट)", query: "helmet", category: "Personal Protective Equipment" },
  { label: "cement (सीमेंट)", query: "cement", category: "Construction Materials" },
  { label: "sariya / loha (सरिया)", query: "sariya", category: "Construction Materials" },
  { label: "press / istri (इस्त्री)", query: "press", category: "Electrical Appliance" }
];

export default function ProductDiscovery({ onOpenStandard, onCheckCompliance, onAskBot, onOpenVerifier }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Electrical Appliance');
  const [description, setDescription] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [outputMode, setOutputMode] = useState('manufacturer'); // 'manufacturer' | 'citizen'

  const handleRunDiscovery = async (customChip = null) => {
    const targetName = customChip ? customChip.query : productName;
    const targetCat = customChip ? customChip.category : category;

    if (!targetName.trim()) return;

    if (customChip) {
      setProductName(customChip.query);
      setCategory(customChip.category);
    }

    setIsLoading(true);
    try {
      const data = await discoverProductStandards({
        productName: targetName,
        category: targetCat,
        description: description,
        intendedUse: intendedUse
      });

      // Find local standard match for rich metadata (global harmonization & citizen card)
      let enrichedPrimary = data?.primary_standard;
      if (enrichedPrimary) {
        const localMatch = BIS_STANDARDS.find(s => 
          s.isCode.toLowerCase().replace(/[^a-z0-9]/g, '') === (enrichedPrimary.is_number || '').toLowerCase().replace(/[^a-z0-9]/g, '') ||
          s.title.toLowerCase().includes(targetName.toLowerCase()) ||
          (s.colloquialTerms && s.colloquialTerms.some(t => targetName.toLowerCase().includes(t.toLowerCase())))
        );
        if (localMatch) {
          enrichedPrimary = {
            ...enrichedPrimary,
            globalHarmonization: localMatch.globalHarmonization,
            citizenCard: localMatch.citizenCard,
            gazetteNotification: localMatch.gazetteNotification,
            qcoDate: localMatch.qcoDate
          };
        }
      }

      setResult({
        ...data,
        primary_standard: enrichedPrimary
      });
    } catch (err) {
      console.error("[ProductDiscovery] Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="discovery" className="py-14 md:py-20 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>StandardFinder AI • Module 1</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Colloquial Vernacular Standards Discovery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Type product queries in plain Hindi, Hinglish, or everyday colloquial language. StandardFinder AI maps colloquial terms to exact Indian Standards, mandatory QCO gazette orders, and global export equivalences.
          </p>
        </div>

        {/* 1-Click Vernacular Demo Chips */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
              Test Colloquial & Vernacular Prompts (Judges 1-Click Demo):
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold hidden sm:inline">
              ⚡ Hindi & Hinglish colloquial mapping
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {COLLOQUIAL_DEMO_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleRunDiscovery(chip)}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-emerald-500 bg-neutral-50 hover:bg-emerald-50/50 text-xs font-semibold text-neutral-800 hover:text-emerald-950 transition-colors shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Discovery Input Form Card */}
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5 sm:p-7 shadow-xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            
            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Product Name or Vernacular Term <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. geyser, paani ki botal, khilona, sariya, switch"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                onKeyDown={(e) => e.key === 'Enter' && handleRunDiscovery()}
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              >
                <option value="Electrical Appliance">Electrical Appliance & Electronics</option>
                <option value="Food & Water">Food & Packaged Beverages</option>
                <option value="Personal Protective Equipment">Personal Protective Equipment (PPE)</option>
                <option value="Consumer Products">Consumer Products & Toys</option>
                <option value="Construction Materials">Construction & Building Materials</option>
                <option value="Mechanical & Hardware">Mechanical, Cookware & Hardware</option>
                <option value="Chemicals & Plastics">Chemicals, Paints & Polymers</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Technical Scope / Specs (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 15 Litre storage boiler, 20L water container, rebar fe 500d"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>

            {/* Intended Use */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Intended Use & Target Market (Optional)
              </label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Domestic Indian market, export to Middle East / EU"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-neutral-500 italic">
              Powered by hybrid retrieval engine (BM25 lexical + all-MiniLM-L6-v2 semantic embeddings).
            </span>
            <button
              onClick={() => handleRunDiscovery()}
              disabled={!productName.trim() || isLoading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mapping Standards...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Discover Standards & QCOs</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Discovery Results Display */}
        {result && (
          <div className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in">
            
            {/* Header: Product & Dual Output View Toggle */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
                  StandardFinder AI Result
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {result.product_name}
                </h3>
              </div>

              {/* Dual Output Toggle */}
              <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
                <button
                  onClick={() => setOutputMode('manufacturer')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    outputMode === 'manufacturer'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Factory className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Manufacturer Roadmap</span>
                </button>

                <button
                  onClick={() => setOutputMode('citizen')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    outputMode === 'citizen'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Citizen Verification Card</span>
                </button>
              </div>
            </div>

            {/* 1. Primary Standard Card */}
            {result.primary_standard && (
              <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
                
                {/* Standard Code, Match %, and QCO Tag */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs shadow-2xs">
                      {result.primary_standard.is_number}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Match: {Math.round(result.primary_standard.relevance_score * 100)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.primary_standard.mandatory_qco && (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Mandatory QCO Order</span>
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-neutral-700 bg-white px-2 py-0.5 rounded border border-neutral-200">
                      {result.conformance_scheme}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-neutral-900">
                  {result.primary_standard.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {result.primary_standard.description || result.primary_standard.scope}
                </p>

                {/* DUAL VIEW 1: MANUFACTURER ROADMAP */}
                {outputMode === 'manufacturer' && (
                  <div className="space-y-4 pt-1 animate-in fade-in">
                    {/* Why it applies */}
                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-800 space-y-1">
                      <span className="font-bold text-neutral-900 block flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Statutory Applicability Rationale:
                      </span>
                      <p className="text-neutral-700 leading-relaxed">
                        {result.why_it_applies}
                      </p>
                    </div>

                    {/* Gazette Notification Details */}
                    {result.primary_standard.gazetteNotification && (
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                          <span>Gazette Notification: <strong>{result.primary_standard.gazetteNotification.gazetteRef}</strong> ({result.primary_standard.gazetteNotification.ministry})</span>
                        </div>
                        <span className="text-[11px] font-mono text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-200 shrink-0">
                          Date: {result.primary_standard.gazetteNotification.date}
                        </span>
                      </div>
                    )}

                    {/* Global Standards Harmonization Pill */}
                    {result.primary_standard.globalHarmonization && (
                      <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                            <Globe className="w-4 h-4 text-emerald-700" />
                            Global Standards Harmonization (Export Alignment):
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-700 text-white shadow-2xs">
                            {result.primary_standard.globalHarmonization.exportEquivalence}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-700">
                          <div>
                            <span className="font-semibold text-neutral-900">International Equivalent: </span>
                            <span className="font-mono">{result.primary_standard.globalHarmonization.standard}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-neutral-900">Standard Body: </span>
                            <span>{result.primary_standard.globalHarmonization.org}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-emerald-900">
                          {result.primary_standard.globalHarmonization.note}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* DUAL VIEW 2: CITIZEN VERIFICATION CARD */}
                {outputMode === 'citizen' && (
                  <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-300 space-y-3 animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-700" />
                      <h5 className="font-bold text-sm text-amber-950">
                        {result.primary_standard.citizenCard?.headline || "Citizen Safety & Quality Mark Guide"}
                      </h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-lg border border-amber-200">
                        <span className="text-[10px] text-neutral-400 font-bold uppercase block">Mandatory Mark to Look For:</span>
                        <p className="font-bold text-neutral-900 mt-0.5">
                          {result.primary_standard.citizenCard?.mandatoryMark || "ISI Logo with 7-digit CML Number"}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-amber-200">
                        <span className="text-[10px] text-red-500 font-bold uppercase block">Safety Hazard if Uncertified:</span>
                        <p className="font-medium text-red-950 mt-0.5">
                          {result.primary_standard.citizenCard?.safetyRisk || "Substandard items pose fire, electrical shock, or material breakdown risks."}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-800 bg-white p-3 rounded-lg border border-amber-200 space-y-1">
                      <span className="font-bold text-neutral-900 block">How to Inspect:</span>
                      <p className="text-neutral-700 leading-relaxed">
                        {result.primary_standard.citizenCard?.labelInstruction || "Look for the permanent stamped or embossed ISI logo on the rating plate or packaging."}
                      </p>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-amber-950 font-medium">
                        Have a product in hand?
                      </span>
                      <button
                        onClick={() => {
                          const el = document.getElementById('consumer-check');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold inline-flex items-center gap-1.5 shadow-2xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify Mark on TrueMark Verifier →</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => onOpenStandard && onOpenStandard({ isCode: result.primary_standard.is_number, title: result.primary_standard.title })}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Full Details & Labs</span>
                  </button>

                  <button
                    onClick={() => onCheckCompliance && onCheckCompliance(result.primary_standard.is_number)}
                    className="px-4 py-2 rounded-xl bg-white border border-neutral-300 hover:border-emerald-500 text-neutral-800 hover:text-emerald-900 text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Open Scheme Roadmap</span>
                  </button>

                  <button
                    onClick={() => onAskBot && onAskBot(`Explain the compliance requirements, testing rules, and international equivalents for ${result.primary_standard.is_number} (${result.product_name})`)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ask ManakBot</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. Related Standards */}
            {result.related_standards && result.related_standards.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  Secondary / Associated Standards:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {result.related_standards.map((rel, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start justify-between gap-2"
                    >
                      <div>
                        <span className="font-mono font-bold text-xs text-neutral-900 block">
                          {rel.is_number}
                        </span>
                        <p className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                          {rel.title}
                        </p>
                      </div>
                      <button
                        onClick={() => onOpenStandard && onOpenStandard({ isCode: rel.is_number, title: rel.title })}
                        className="text-xs text-emerald-700 hover:underline font-bold shrink-0 mt-0.5"
                      >
                        Inspect →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verification Note */}
            <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-500">
              <span className="italic">
                {result.disclaimer || "AI-assisted guidance based on Indian Standards dataset. Always verify statutory requirements on the official BIS portal (manakonline.in)."}
              </span>
              <a
                href="https://www.manakonline.in"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 shrink-0"
              >
                <span>Verify on official BIS Portal (manakonline.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
