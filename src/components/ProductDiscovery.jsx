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

export default function ProductDiscovery({ onOpenStandard, onCheckCompliance, onAskBot, onOpenVerifier, embedded = false }) {
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

  const discoveryContent = (
    <div className="w-full space-y-6 text-left">
      {!embedded && (
        <div className="border-b border-slate-300 pb-4 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-gov-100 border border-gov-300 text-gov-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-gov-700" />
            <span>Vernacular &amp; Colloquial Query Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gov-900 tracking-tight">
            Colloquial &amp; Vernacular Standards Discovery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Search product queries in plain Hindi, Hinglish, or everyday trade terminology. Automatically resolves colloquial terms to formal Indian Standards, Gazette Quality Control Orders (QCOs), and international trade equivalences.
          </p>
        </div>
      )}

      {/* 1-Click Vernacular Demo Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Sample Vernacular &amp; Colloquial Trade Queries:
          </span>
          <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline">
            Hindi &amp; Hinglish trade mapping
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COLLOQUIAL_DEMO_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleRunDiscovery(chip)}
              className="px-2.5 py-1 rounded-sm border border-slate-300 hover:border-gov-800 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors shadow-xs"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Input Form Card */}
      <div className="bg-slate-50 rounded-sm border border-slate-300 p-5 sm:p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          
          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Product Name or Vernacular Term <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. geyser, paani ki botal, khilona, sariya, switch"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-gov-800 focus:border-gov-800"
              onKeyDown={(e) => e.key === 'Enter' && handleRunDiscovery()}
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Product Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-gov-800 focus:border-gov-800"
            >
              <option value="Electrical Appliance">Electrical Appliance &amp; Electronics</option>
              <option value="Food & Water">Food &amp; Packaged Beverages</option>
              <option value="Personal Protective Equipment">Personal Protective Equipment (PPE)</option>
              <option value="Consumer Products">Consumer Products &amp; Toys</option>
              <option value="Construction Materials">Construction &amp; Building Materials</option>
              <option value="Mechanical & Hardware">Mechanical, Cookware &amp; Hardware</option>
              <option value="Chemicals & Plastics">Chemicals, Paints &amp; Polymers</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Technical Scope / Specs (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 15 Litre storage boiler, 20L water container, rebar fe 500d"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-gov-800 focus:border-gov-800"
            />
          </div>

          {/* Intended Use */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Intended Use &amp; Target Market (Optional)
            </label>
            <input
              type="text"
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              placeholder="e.g. Domestic Indian market, export to Middle East / EU"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-sm text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-gov-800 focus:border-gov-800"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
          <span className="text-[11px] text-slate-500 font-medium">
            Powered by dual semantic index + Gazette QCO mapping.
          </span>
          <button
            onClick={() => handleRunDiscovery()}
            disabled={!productName.trim() || isLoading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Mapping Standards...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Discover Standards &amp; QCOs</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Discovery Results Display */}
      {result && (
        <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-5 sm:p-6 space-y-6">
          
          {/* Header: Product & Dual Output View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-gov-800 uppercase tracking-widest block mb-0.5">
                StandardFinder Result
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {result.product_name}
              </h3>
            </div>

            {/* Dual Output Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-sm border border-slate-300">
              <button
                onClick={() => setOutputMode('manufacturer')}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition-all flex items-center gap-1.5 ${
                  outputMode === 'manufacturer'
                    ? 'bg-gov-800 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Factory className="w-3.5 h-3.5" />
                <span>Manufacturer Roadmap</span>
              </button>

              <button
                onClick={() => setOutputMode('citizen')}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition-all flex items-center gap-1.5 ${
                  outputMode === 'citizen'
                    ? 'bg-gov-800 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Citizen Verification Card</span>
              </button>
            </div>
          </div>

          {/* 1. Primary Standard Card */}
          {result.primary_standard && (
            <div className="p-5 sm:p-6 rounded-sm bg-slate-50 border border-slate-300 space-y-4">
              
              {/* Standard Code, Match %, and QCO Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-sm bg-gov-800 text-white font-mono font-bold text-xs shadow-xs">
                    {result.primary_standard.is_number}
                  </span>
                  <span className="text-xs font-semibold text-gov-800 bg-gov-100 px-2 py-0.5 rounded-sm border border-gov-300">
                    Match: {Math.round(result.primary_standard.relevance_score * 100)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {result.primary_standard.mandatory_qco && (
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-sm border border-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>Mandatory QCO Order</span>
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-sm border border-slate-300">
                    {result.conformance_scheme}
                  </span>
                </div>
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                {result.primary_standard.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {result.primary_standard.description || result.primary_standard.scope}
              </p>

              {/* DUAL VIEW 1: MANUFACTURER ROADMAP */}
              {outputMode === 'manufacturer' && (
                <div className="space-y-4 pt-1">
                  {/* Why it applies */}
                  <div className="p-3.5 bg-white rounded-sm border border-slate-300 text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-gov-700" />
                      Statutory Applicability Rationale:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {result.why_it_applies}
                    </p>
                  </div>

                  {/* Gazette Notification Details */}
                  {result.primary_standard.gazetteNotification && (
                    <div className="p-3 bg-amber-50 rounded-sm border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Gazette Notification: <strong>{result.primary_standard.gazetteNotification.gazetteRef}</strong> ({result.primary_standard.gazetteNotification.ministry})</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-900 bg-white px-2 py-0.5 rounded-sm border border-amber-300 shrink-0">
                        Date: {result.primary_standard.gazetteNotification.date}
                      </span>
                    </div>
                  )}

                  {/* Global Standards Harmonization Pill */}
                  {result.primary_standard.globalHarmonization && (
                    <div className="p-4 bg-white rounded-sm border border-slate-300 text-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-gov-900 flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-gov-700" />
                          Global Standards Harmonization (Export Alignment):
                        </span>
                        <span className="px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-gov-800 text-white">
                          {result.primary_standard.globalHarmonization.exportEquivalence}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                        <div>
                          <span className="font-semibold text-slate-900">International Equivalent: </span>
                          <span className="font-mono">{result.primary_standard.globalHarmonization.standard}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">Standard Body: </span>
                          <span>{result.primary_standard.globalHarmonization.org}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600">
                        {result.primary_standard.globalHarmonization.note}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* DUAL VIEW 2: CITIZEN VERIFICATION CARD */}
              {outputMode === 'citizen' && (
                <div className="p-4 bg-amber-50 rounded-sm border border-amber-300 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-800" />
                    <h5 className="font-bold text-sm text-amber-950">
                      {result.primary_standard.citizenCard?.headline || "Citizen Safety & Quality Mark Guide"}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-sm border border-amber-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Mandatory Mark to Look For:</span>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {result.primary_standard.citizenCard?.mandatoryMark || "ISI Logo with 7-digit CML Number"}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-sm border border-amber-200">
                      <span className="text-[10px] text-red-600 font-bold uppercase block">Safety Hazard if Uncertified:</span>
                      <p className="font-medium text-red-950 mt-0.5">
                        {result.primary_standard.citizenCard?.safetyRisk || "Substandard items pose fire, electrical shock, or material breakdown risks."}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 bg-white p-3 rounded-sm border border-amber-200 space-y-1">
                    <span className="font-bold text-slate-900 block">How to Inspect:</span>
                    <p className="text-slate-600 leading-relaxed">
                      {result.primary_standard.citizenCard?.labelInstruction || "Look for the permanent stamped or embossed ISI logo on the rating plate or packaging."}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-amber-950 font-medium">
                      Have a product in hand?
                    </span>
                    <button
                      onClick={() => onOpenVerifier && onOpenVerifier()}
                      className="px-3.5 py-1.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white font-bold inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verify Mark on BIS CARE / Portal</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Primary Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  onClick={() => onOpenStandard && onOpenStandard(result.primary_standard)}
                  className="px-4 py-2 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Full Details &amp; Labs</span>
                </button>

                <button
                  onClick={() => onCheckCompliance && onCheckCompliance(result.primary_standard.is_number || result.primary_standard.isCode)}
                  className="px-4 py-2 rounded-sm bg-white border border-slate-300 hover:border-gov-800 text-slate-800 hover:text-gov-900 text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-gov-700" />
                  <span>Open Scheme Roadmap</span>
                </button>

                <button
                  onClick={() => onAskBot && onAskBot(`Explain the compliance requirements, testing rules, and international equivalents for ${result.primary_standard.is_number || result.primary_standard.isCode} (${result.product_name})`)}
                  className="px-4 py-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ask ManakBot</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. Related Standards */}
          {Array.isArray(result.related_standards) && result.related_standards.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Secondary / Associated Standards:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {result.related_standards.map((rel, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-sm border border-slate-300 flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="font-mono font-bold text-xs text-slate-900 block">
                        {rel.is_number || rel.isCode}
                      </span>
                      <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {rel.title}
                      </p>
                    </div>
                    <button
                      onClick={() => onOpenStandard && onOpenStandard(rel)}
                      className="text-xs text-gov-800 hover:underline font-bold shrink-0 mt-0.5 inline-flex items-center gap-0.5"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Note */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="italic">
              {result.disclaimer || "AI-assisted guidance based on Indian Standards dataset. Always verify statutory requirements on the official BIS portal (manakonline.in)."}
            </span>
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="text-gov-800 hover:text-gov-900 font-semibold inline-flex items-center gap-1 shrink-0"
            >
              <span>Verify on official BIS Portal (manakonline.in)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}

    </div>
  );

  if (embedded) {
    return discoveryContent;
  }

  return (
    <section id="discovery" className="py-8 md:py-12 bg-white border-b border-slate-300 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {discoveryContent}
      </div>
    </section>
  );
}
