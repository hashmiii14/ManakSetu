import React, { useState, useMemo } from 'react';
import { 
  X, AlertTriangle, CheckCircle2, FlaskConical, Building, 
  Calculator, ExternalLink, ShieldCheck, FileText, TrendingDown, Info, Globe, Award, Sparkles 
} from 'lucide-react';

export default function StandardDetailModal({ standard, onClose, onAskBot, onCheckCompliance }) {
  const [enterpriseType, setEnterpriseType] = useState('micro');

  const feeCalculation = useMemo(() => {
    if (!standard) return null;
    const feeObj = standard.feeStructure || standard.fee_structure || {};
    const baseMarking = Number(feeObj.baseMarkingFee || feeObj.base_marking_fee || 65000);
    
    let concession = 0;
    if (enterpriseType === 'micro') {
      concession = Number(feeObj.microConcessionPercent ?? feeObj.micro_concession_percent ?? 50);
    } else if (enterpriseType === 'small') {
      concession = Number(feeObj.smallConcessionPercent ?? feeObj.small_concession_percent ?? 20);
    } else {
      concession = 0;
    }

    const effectiveMarking = Math.round(baseMarking * (1 - concession / 100));
    const appFee = Number(feeObj.applicationFee ?? feeObj.application_fee ?? 1000);
    const inspFee = Number(feeObj.auditFeePerManDay ?? feeObj.audit_fee_per_man_day ?? 7000) * 2;
    const total = appFee + inspFee + effectiveMarking;
    const savings = Math.max(0, baseMarking - effectiveMarking);

    return {
      baseMarking,
      concessionPercent: concession,
      effectiveMarking,
      effectiveMarkingFee: effectiveMarking,
      applicationFee: appFee,
      inspectionFee: inspFee,
      totalEstimatedCost: total,
      totalSavings: savings
    };
  }, [standard, enterpriseType]);

  if (!standard) return null;

  const isCode = standard.isCode || standard.is_number || 'IS Standard';
  const title = standard.title || 'Standard Specification';
  const category = standard.category || 'General Standard';
  const description = standard.description || standard.scope || standard.text || 'Specification details from BIS compendium.';
  const scope = standard.scope || '';
  const mandatoryQCO = Boolean(standard.mandatoryQCO ?? standard.mandatory_qco);
  const qcoNotification = standard.qcoNotification || standard.qco_notification || 'Quality Control Order (Statutory Compliance)';
  const source = standard.source || 'BIS Catalogue';
  const globalHarmonization = standard.globalHarmonization || standard.global_harmonization;

  const keyTests = Array.isArray(standard.keyTests) ? standard.keyTests : (
    Array.isArray(standard.key_tests) ? standard.key_tests : [
      "Compressive / Tensile Mechanical Strength Testing",
      "Dimensional Tolerances & Material Uniformity",
      "Chemical Purity & Deleterious Substances Assay",
      "Durability, Soundness & Environmental Conditioning"
    ]
  );

  const labs = Array.isArray(standard.labsAvailable) ? standard.labsAvailable : (
    Array.isArray(standard.labs_available) ? standard.labs_available : [
      { name: "BIS Central Laboratory", city: "Sahibabad", state: "Uttar Pradesh" },
      { name: "National Test House (NTH)", city: "Kolkata", state: "West Bengal" }
    ]
  );

  const docs = Array.isArray(standard.documentationRequired) ? standard.documentationRequired : (
    Array.isArray(standard.documentation_required) ? standard.documentation_required : [
      "Manufacturing plant machinery layout and calibration certificates",
      "In-house test equipment verification and inspection reports",
      "Raw material test certificates from recognized laboratories"
    ]
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] flex flex-col shadow-lg border border-slate-300 animate-in zoom-in-95 text-left">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-4 sticky top-0 bg-white rounded-t-sm z-10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gov-900 bg-gov-50 px-2.5 py-0.5 rounded-sm border border-gov-300 font-mono">
                {isCode}
              </span>
              <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-200">
                {category}
              </span>
              {mandatoryQCO ? (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Mandatory QCO
                </span>
              ) : (
                <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-sm border border-slate-200">
                  Voluntary Standard
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gov-900 leading-snug">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-sm transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* 1. Overview & Scope */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Overview & Scope
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {description}
            </p>

            {scope && scope !== description && (
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-300 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Technical Scope: </span>
                <span>{scope}</span>
              </div>
            )}

            {mandatoryQCO && (
              <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-sm text-xs text-amber-950 flex items-start gap-2 mt-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Statutory Quality Control Order: </span>
                  <span>{qcoNotification}. Manufacturing, storing, or selling without an operative ISI mark is prohibited under Section 29 of the BIS Act, 2016.</span>
                </div>
              </div>
            )}
          </section>

          {/* Global Standards Harmonization */}
          {globalHarmonization && (
            <section className="p-4 bg-gov-50/50 border border-gov-300 rounded-sm space-y-2.5 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-gov-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-gov-800" />
                  Global Standards Harmonization (Export Alignment)
                </h3>
                <span className="px-2.5 py-0.5 rounded-sm text-[11px] font-bold bg-gov-800 text-white shadow-2xs">
                  {globalHarmonization.exportEquivalence}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
                <div>
                  <span className="font-semibold text-slate-900">International Standard: </span>
                  <span className="font-mono font-bold text-gov-900">{globalHarmonization.standard}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Standard Body: </span>
                  <span>{globalHarmonization.org}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-700 leading-relaxed">
                {globalHarmonization.note}
              </p>

              {Array.isArray(globalHarmonization.compatibleMarkets) && globalHarmonization.compatibleMarkets.length > 0 && (
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Export Markets:</span>
                  {globalHarmonization.compatibleMarkets.map((m, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-sm bg-white text-gov-900 border border-slate-300 text-[10px] font-semibold">
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 2. Compliance Guidance */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gov-800" />
                Compliance Guidance
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Source: {source}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-300">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Applicable Standard</span>
                <p className="font-bold text-slate-900 mt-0.5">{isCode}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-300">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Conformity Scheme</span>
                <p className="font-bold text-gov-800 mt-0.5">Scheme-I (ISI Certification Mark)</p>
              </div>
            </div>
          </section>

          {/* 3. Key Testing Benchmarks */}
          <section className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-gov-800" />
              Key Testing Parameters
            </h3>
            {keyTests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {keyTests.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-sm border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gov-800 shrink-0 mt-0.5" />
                    <span>{typeof t === 'string' ? t : (t?.name || t?.title || JSON.stringify(t))}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Information not available in the current prototype dataset.</p>
            )}
          </section>

          {/* 4. Cost Estimator & MSME Concessions */}
          {feeCalculation && (
            <section className="space-y-3 bg-slate-50 p-4 rounded-sm border border-slate-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-gov-800" />
                    Estimated Cost &amp; MSME Concessions
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Select enterprise scale to see applicable statutory concessions:
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-sm border border-slate-300 text-xs font-medium">
                  {[
                    { id: 'micro', label: 'Micro (50% Off)' },
                    { id: 'small', label: 'Small (20% Off)' },
                    { id: 'medium', label: 'Medium/Large' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setEnterpriseType(t.id)}
                      className={`px-2.5 py-1 rounded-sm transition-colors text-xs ${
                        enterpriseType === t.id
                          ? 'bg-gov-800 text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="bg-white p-2.5 rounded-sm border border-slate-300">
                  <span className="text-[10px] text-slate-500 font-bold block">Application Fee</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5 font-mono">₹{(feeCalculation.applicationFee ?? 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white p-2.5 rounded-sm border border-slate-300">
                  <span className="text-[10px] text-slate-500 font-bold block">Audit Fee (2 Days)</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5 font-mono">₹{(feeCalculation.inspectionFee ?? 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white p-2.5 rounded-sm border border-slate-300">
                  <span className="text-[10px] text-slate-500 font-bold block">Effective Marking Fee</span>
                  <p className="text-sm font-bold text-gov-800 mt-0.5 font-mono">₹{(feeCalculation.effectiveMarking ?? 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-sm border border-emerald-300">
                  <span className="text-[10px] text-emerald-800 font-bold block flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> Total Savings
                  </span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5 font-mono">₹{(feeCalculation.totalSavings ?? 0).toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Estimated First-Year Total:</span>
                <span className="text-sm font-extrabold text-gov-900 font-mono">₹{(feeCalculation.totalEstimatedCost ?? 0).toLocaleString('en-IN')}</span>
              </div>

              <p className="text-[10px] text-slate-400 italic pt-1">
                Fee estimates are for prototype guidance and should be verified against the latest official BIS fee schedule.
              </p>
            </section>
          )}

          {/* 5. Recognized Laboratories */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gov-800" />
              BIS Recognized Testing Laboratories
            </h3>
            {labs.length > 0 ? (
              <div className="space-y-1.5 text-xs text-slate-700">
                {labs.map((lab, idx) => (
                  <div key={idx} className="p-2.5 rounded-sm bg-white border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">{typeof lab === 'string' ? lab : (lab?.name || "BIS Recognized Lab")}</span>
                    <span className="text-slate-500">{typeof lab === 'object' && lab?.city ? `${lab.city}${lab.state ? ', ' + lab.state : ''}` : ''}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Information not available in the current prototype dataset.</p>
            )}
          </section>

          {/* 6. Required Documentation */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gov-800" />
              Required Documentation
            </h3>
            {docs.length > 0 ? (
              <ul className="space-y-1 text-xs text-slate-600">
                {docs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-xs bg-gov-800 mt-1.5 shrink-0"></span>
                    <span>{typeof doc === 'string' ? doc : (doc?.title || doc?.name || JSON.stringify(doc))}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic">Information not available in the current prototype dataset.</p>
            )}
          </section>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-300 bg-slate-50 rounded-b-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {onAskBot && (
              <button
                onClick={() => {
                  onClose();
                  onAskBot(`Explain the compliance requirements, testing parameters, and factory setup for ${isCode} (${title})`);
                }}
                className="px-3.5 py-2 text-xs font-bold text-gov-900 bg-gov-50 border border-gov-300 rounded-sm hover:bg-gov-100 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Ask ManakBot About This Standard</span>
              </button>
            )}

            {onCheckCompliance && (
              <button
                onClick={() => {
                  onClose();
                  onCheckCompliance(isCode);
                }}
                className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-sm hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-gov-800" />
                <span>Run Compliance Check</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-sm hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gov-800 rounded-sm hover:bg-gov-900 transition-colors shadow-2xs"
            >
              <span>e-BIS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
