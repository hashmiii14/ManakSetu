import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, FileText, 
  FlaskConical, Tag, ArrowRight, ExternalLink, Download, Check, RefreshCw, 
  Loader2, Sparkles, Layers, Globe, Award, Zap
} from 'lucide-react';
import { checkCompliance } from '../services/api';
import { SCHEMES_INFO } from '../data/bisStandards';

const POPULAR_CHECKLIST_PRODUCTS = [
  "Electric Immersion Water Heater (IS 368)",
  "Stationary Storage Electric Geyser (IS 2082)",
  "Two-Wheeler Motorcycle Helmet (IS 4151)",
  "Packaged Drinking Water (IS 14543)",
  "Safety of Toys (IS 9873 Part 1)",
  "Domestic Pressure Cooker (IS 2347)",
  "Ordinary Portland Cement 53 Grade (IS 12269)",
  "High Strength Deformed Steel Bars (IS 1786)",
  "Electric Dry & Steam Iron (IS 302-2-3)",
  "Information Technology Equipment (IS 13252)"
];

export default function ComplianceChecker({ initialProduct = '', onOpenStandard, onAskBot }) {
  const [productQuery, setProductQuery] = useState(initialProduct || 'Electric Immersion Water Heater (IS 368)');
  const [isLoading, setIsLoading] = useState(false);
  const [complianceData, setComplianceData] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [activeSchemeTab, setActiveSchemeTab] = useState('SCHEME_1');

  useEffect(() => {
    if (initialProduct) {
      setProductQuery(initialProduct);
      handleGenerateChecklist(initialProduct);
    } else {
      handleGenerateChecklist('Electric Immersion Water Heater (IS 368)');
    }
  }, [initialProduct]);

  const handleGenerateChecklist = async (target = null) => {
    const term = (target || productQuery).trim();
    if (!term) return;

    setIsLoading(true);
    try {
      const data = await checkCompliance({ productName: term });
      setComplianceData(data);
      setCompletedItems({});
    } catch (err) {
      console.error("[ComplianceChecker] Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItemCheck = (key) => {
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'identified':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            <span>Identified</span>
          </span>
        );
      case 'review_required':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>• Review Required</span>
          </span>
        );
      case 'verify':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5 text-blue-600" />
            <span>! Verify</span>
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
            <span>○ Not Provided</span>
          </span>
        );
    }
  };

  const handleCopySummary = () => {
    if (!complianceData) return;
    const lines = [
      `MANAKSETU COMPLIANCE CHECKLIST`,
      `Product: ${complianceData.product_name}`,
      `Primary Standard: ${complianceData.primary_standard?.is_number || 'N/A'} - ${complianceData.primary_standard?.title || ''}`,
      `Conformity Scheme: ${complianceData.conformance_scheme}`,
      `Mandatory QCO: ${complianceData.mandatory_qco ? 'YES (Statutory enforcement under Section 29 BIS Act)' : 'NO (Voluntary)'}`,
      ``,
      `--- ROADMAP STAGES ---`
    ];

    complianceData.phases.forEach((p, idx) => {
      lines.push(`${p.phase}: ${p.title} [${p.status.toUpperCase()}]`);
      lines.push(`  Description: ${p.description}`);
      p.details.forEach(d => lines.push(`  - ${d}`));
    });

    lines.push(``);
    lines.push(`Source: BIS Standards Compendium. Verify officially on www.manakonline.in.`);

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const selectedSchemeDetails = SCHEMES_INFO.find(s => s.code === activeSchemeTab) || SCHEMES_INFO[0];

  return (
    <section id="compliance" className="py-14 md:py-20 bg-neutral-50/60 border-b border-neutral-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>BIS Scheme & License Navigator • Module 2</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Conformity Schemes & Licensing Navigator
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Navigate the 4 statutory BIS certification pathways: Scheme-I (ISI Mark), Scheme-II (CRS), Scheme-IV (Hallmarking), and FMCS (Foreign Manufacturers). Generate interactive 7-stage compliance roadmaps for any product.
          </p>
        </div>

        {/* 4 Core Pathways Showcase Grid */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                Statutory Certification Frameworks
              </span>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                The 4 Pillars of BIS Conformity Assessment
              </h3>
            </div>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              Click any scheme to inspect workflow & concessions
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {SCHEMES_INFO.map((scheme) => (
              <button
                key={scheme.code}
                onClick={() => setActiveSchemeTab(scheme.code)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  activeSchemeTab === scheme.code
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-neutral-300 text-neutral-800">
                      {scheme.badge}
                    </span>
                    {activeSchemeTab === scheme.code && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 line-clamp-1">
                    {scheme.name.split(' (')[0]}
                  </h4>
                  <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2">
                    {scheme.target}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-200/60 text-[10px] font-semibold text-emerald-800">
                  {scheme.concessions}
                </div>
              </button>
            ))}
          </div>

          {/* Active Scheme Expanded Drawer */}
          {selectedSchemeDetails && (
            <div className="p-4 sm:p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono font-bold text-xs">
                    {selectedSchemeDetails.badge}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {selectedSchemeDetails.name}
                  </h4>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                  {selectedSchemeDetails.concessions}
                </span>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed">
                {selectedSchemeDetails.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                  Mandatory Statutory Progression:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedSchemeDetails.steps.map((st, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-neutral-200 text-neutral-800">
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Selection / Input Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
              Automated 7-Stage Roadmap Generator
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
              Generate Custom Compliance Roadmap & Document Checklist
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Select or type any industrial product to map required testing parameters, laboratory equipment, and documentation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              placeholder="e.g. Electric Immersion Geyser, Baby Toys, Helmet, Packaged Drinking Water..."
              className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateChecklist()}
            />
            <button
              onClick={() => handleGenerateChecklist()}
              disabled={isLoading || !productQuery.trim()}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Generate Roadmap</span>
                </>
              )}
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {POPULAR_CHECKLIST_PRODUCTS.map((prod, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setProductQuery(prod);
                  handleGenerateChecklist(prod);
                }}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-900 border border-neutral-200 text-[11px] font-medium text-neutral-700 transition-colors"
              >
                {prod.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Structured Checklist Content */}
        {complianceData && (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 sm:p-8 space-y-6 animate-in fade-in">
            
            {/* Top Overview Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Product Compliance Dossier
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {complianceData.product_name}
                </h3>
                {complianceData.primary_standard && (
                  <p className="text-xs text-neutral-600">
                    Primary Reference: <span className="font-mono font-bold text-emerald-800">{complianceData.primary_standard.is_number}</span> ({complianceData.primary_standard.title})
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="px-3.5 py-1.5 rounded-xl border border-neutral-300 hover:border-emerald-500 bg-white text-neutral-700 hover:text-emerald-900 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? "Copied to Clipboard" : "Export Summary"}</span>
                </button>

                {complianceData.primary_standard && (
                  <button
                    onClick={() => onOpenStandard && onOpenStandard(complianceData.primary_standard)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <span>View Standard Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Scheme & QCO Highlight Card */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              complianceData.mandatory_qco 
                ? 'bg-amber-50/80 border-amber-300 text-amber-950' 
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-start gap-2.5">
                <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${complianceData.mandatory_qco ? 'text-amber-600' : 'text-emerald-600'}`} />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">
                    {complianceData.conformance_scheme}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    {complianceData.mandatory_qco 
                      ? "Mandatory Quality Control Order (QCO) in effect. Under Section 29 of the BIS Act, 2016, manufacturing, storing, or selling without an operative ISI mark is prohibited."
                      : "Voluntary certification under Scheme-I. Conformance establishes benchmark market credibility and qualifies products for GeM portal tenders."}
                  </p>
                </div>
              </div>
            </div>

            {/* 7-Stage Linear Checklist */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Linear 7-Stage Compliance Verification Checklist:
              </span>

              <div className="space-y-3">
                {Array.isArray(complianceData.phases) && complianceData.phases.map((phase, idx) => {
                  const itemKey = `phase-${idx}`;
                  const isChecked = Boolean(completedItems[itemKey]);

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        isChecked 
                          ? 'bg-emerald-50/50 border-emerald-300' 
                          : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItemCheck(itemKey)}
                            className="mt-1 w-4 h-4 text-emerald-600 rounded border-neutral-300 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-neutral-500">
                                {phase.phase}
                              </span>
                              <h5 className={`text-sm font-bold ${isChecked ? 'text-emerald-950 line-through' : 'text-neutral-900'}`}>
                                {phase.title}
                              </h5>
                            </div>
                            <p className="text-xs text-neutral-600 mt-1">
                              {phase.description}
                            </p>
                          </div>
                        </div>

                        {getStatusBadge(phase.status)}
                      </div>

                      {/* Details checklist items */}
                      {phase.details && phase.details.length > 0 && (
                        <div className="mt-3 pl-7 pt-2 border-t border-neutral-200/60 space-y-1">
                          {phase.details.map((detail, dIdx) => (
                            <p key={dIdx} className="text-xs text-neutral-700 flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{detail}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footnote */}
            <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span>Guidance derived from Bureau of Indian Standards (Conformity Assessment) Regulations.</span>
              <a
                href="https://www.manakonline.in"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>File official e-application on Manakonline</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
