import React, { useState } from 'react';
import { 
  Search, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, BookOpen, HelpCircle, ExternalLink, Loader2, Layers, Compass 
} from 'lucide-react';
import { discoverProductStandards } from '../services/api';

const SAMPLE_PRODUCTS = [
  { name: "Electric Kettle", category: "Electrical Appliance", description: "1.5 litre household electric kettle for boiling water", use: "Domestic home appliance" },
  { name: "Domestic Immersion Heater", category: "Electrical Appliance", description: "Portable electric water heating element 1500W", use: "Bathroom water heating" },
  { name: "Motorcycle Helmet", category: "Personal Protective Equipment", description: "Full face protective rider helmet", use: "Two-wheeled vehicle safety" },
  { name: "Packaged Drinking Water", category: "Food & Water", description: "Bottled and jarred processed potable water", use: "Direct human consumption" },
  { name: "Baby Doll Toys", category: "Consumer Products", description: "Plastic and plush mechanical dolls for infants under 14", use: "Child recreation" },
  { name: "Ordinary Portland Cement (OPC 53)", category: "Construction Materials", description: "High strength structural hydraulic cement", use: "Concrete reinforcement" }
];

export default function ProductDiscovery({ onOpenStandard, onCheckCompliance, onAskBot }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Electrical Appliance');
  const [description, setDescription] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRunDiscovery = async (customProduct = null) => {
    const targetName = customProduct ? customProduct.name : productName;
    const targetCat = customProduct ? customProduct.category : category;
    const targetDesc = customProduct ? customProduct.description : description;
    const targetUse = customProduct ? customProduct.use : intendedUse;

    if (!targetName.trim()) return;

    if (customProduct) {
      setProductName(customProduct.name);
      setCategory(customProduct.category);
      setDescription(customProduct.description);
      setIntendedUse(customProduct.use);
    }

    setIsLoading(true);
    try {
      const data = await discoverProductStandards({
        productName: targetName,
        category: targetCat,
        description: targetDesc,
        intendedUse: targetUse
      });
      setResult(data);
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
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Product → Standard Discovery Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Find Applicable Indian Standards
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Enter your product details below. ManakSetu analyzes the technical scope across 572+ Indian Standards, identifies mandatory QCOs, and maps statutory certification schemes.
          </p>
        </div>

        {/* 1-Click Example Chips */}
        <div className="mb-6 space-y-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            Click to test common industrial & consumer products:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PRODUCTS.map((prod, idx) => (
              <button
                key={idx}
                onClick={() => handleRunDiscovery(prod)}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-emerald-500 bg-neutral-50 hover:bg-emerald-50/50 text-xs font-semibold text-neutral-700 hover:text-emerald-900 transition-colors shadow-2xs"
              >
                {prod.name}
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
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Electric Kettle, Baby Doll, OPC Cement"
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
                Technical Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 1.5 litre cordless household electric kettle with automatic boil-dry cut-off"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>

            {/* Intended Use */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Intended Use & Market (Optional)
              </label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Domestic home use in India, commercial kitchen, or industrial"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
              />
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-neutral-500 italic">
              Powered by hybrid retrieval engine (BM25 + vectorized cosine similarity).
            </span>
            <button
              onClick={() => handleRunDiscovery()}
              disabled={!productName.trim() || isLoading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Specifications...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Discover Applicable Standards</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Discovery Results Display */}
        {result && (
          <div className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in">
            
            {/* Header: Product & Scheme Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
                  Discovery Assessment
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {result.product_name}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${
                  result.mandatory_qco 
                    ? 'bg-amber-50 text-amber-900 border-amber-300' 
                    : 'bg-neutral-50 text-neutral-800 border-neutral-200'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{result.conformance_scheme}</span>
                </span>
              </div>
            </div>

            {/* 1. Primary Standard Card */}
            {result.primary_standard && (
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs">
                      {result.primary_standard.is_number}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Match: {Math.round(result.primary_standard.relevance_score * 100)}%
                    </span>
                  </div>
                  {result.primary_standard.mandatory_qco && (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Mandatory QCO
                    </span>
                  )}
                </div>

                <h4 className="text-base sm:text-lg font-bold text-neutral-900">
                  {result.primary_standard.title}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {result.primary_standard.description || result.primary_standard.scope}
                </p>

                {/* Why it applies */}
                <div className="p-3 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-800 space-y-1">
                  <span className="font-bold text-neutral-900 block flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Why This Standard Applies:
                  </span>
                  <p className="text-neutral-700 leading-relaxed">
                    {result.why_it_applies}
                  </p>
                </div>

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
                    <span>Open Compliance Checklist</span>
                  </button>

                  <button
                    onClick={() => onAskBot && onAskBot(`Explain the compliance requirements and testing rules for ${result.primary_standard.is_number} (${result.product_name})`)}
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

            {/* 3. Questions / Missing Details to Confirm */}
            {result.missing_details_to_confirm && result.missing_details_to_confirm.length > 0 && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1.5">
                <span className="font-bold flex items-center gap-1.5 text-amber-950">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  Parameters to Verify for Accurate Scope Determination:
                </span>
                <ul className="list-disc pl-5 space-y-1 text-amber-900">
                  {result.missing_details_to_confirm.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Verification Note */}
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
