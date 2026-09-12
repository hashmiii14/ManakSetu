import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, FileText, 
  FlaskConical, Tag, ArrowRight, ExternalLink, Download, Check, RefreshCw, Loader2, Sparkles
} from 'lucide-react';
import { checkCompliance } from '../services/api';

const POPULAR_CHECKLIST_PRODUCTS = [
  "Electric Immersion Water Heater (IS 368)",
  "Stationary Storage Electric Geyser (IS 2082)",
  "Two-Wheeler Motorcycle Helmet (IS 4151)",
  "Packaged Drinking Water (IS 14543)",
  "Safety of Toys (IS 9873 Part 1)",
  "Domestic Pressure Cooker (IS 2347)",
  "Ordinary Portland Cement 53 Grade (IS 12269)",
  "Electrical Switches for Fixed Installations (IS 3854)"
];

export default function ComplianceChecker({ initialProduct = '', onOpenStandard, onAskBot }) {
  const [productQuery, setProductQuery] = useState(initialProduct || 'Electric Immersion Water Heater (IS 368)');
  const [isLoading, setIsLoading] = useState(false);
  const [complianceData, setComplianceData] = useState(null);
  const [completedItems, setCompletedItems] = useState({});
  const [copiedSummary, setCopiedSummary] = useState(false);

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
            <span>✓ Identified</span>
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

  return (
    <section id="compliance" className="py-14 md:py-20 bg-neutral-50/60 border-b border-neutral-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Statutory Compliance Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Interactive Product Compliance Check
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Generate an end-to-end 7-stage statutory roadmap: standard identification, conformity scheme, in-house laboratory equipment, documents, testing, and license filing.
          </p>
        </div>

        {/* Product Selection / Input Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs mb-6">
          <label className="block text-xs font-bold text-neutral-700 mb-2">
            Select or enter your product to generate the compliance roadmap:
          </label>

          <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
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
                  <span>Generate Checklist</span>
                </>
              )}
            </button>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5">
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
                    onClick={() => onOpenStandard && onOpenStandard({ isCode: complianceData.primary_standard.is_number, title: complianceData.primary_standard.title })}
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
                {complianceData.phases.map((phase, idx) => {
                  const itemKey = `phase-${idx}`;
                  const isChecked = Boolean(completedItems[itemKey]);

                  return (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isChecked 
                          ? 'bg-emerald-50/40 border-emerald-300' 
                          : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          {/* Checkbox */}
                          <button
                            onClick={() => toggleItemCheck(itemKey)}
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                              isChecked 
                                ? 'bg-emerald-600 border-emerald-600 text-white' 
                                : 'bg-white border-neutral-300 hover:border-emerald-500'
                            }`}
                            title="Mark step verified"
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </button>

                          <span className="text-[11px] font-mono font-bold text-neutral-500">
                            {phase.phase}
                          </span>
                          <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-neutral-900'}`}>
                            {phase.title}
                          </h4>
                        </div>

                        <div>
                          {getStatusBadge(phase.status)}
                        </div>
                      </div>

                      <p className="text-xs text-neutral-600 pl-7.5 leading-relaxed mb-3">
                        {phase.description}
                      </p>

                      {/* Detail points */}
                      {phase.details && phase.details.length > 0 && (
                        <div className="pl-7.5 space-y-1.5">
                          {phase.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-neutral-700 bg-white p-2 rounded-lg border border-neutral-200/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                              <span className="leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Statutory Disclaimer */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAskBot && onAskBot(`What are the step by step BIS certification requirements for ${complianceData.product_name}?`)}
                  className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ask ManakBot Follow-up</span>
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 italic flex items-center gap-2">
                <span>Verify requirements on official portal:</span>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-0.5 hover:underline"
                >
                  <span>manakonline.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
