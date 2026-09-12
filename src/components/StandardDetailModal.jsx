import React, { useState, useMemo } from 'react';
import { 
  X, AlertTriangle, CheckCircle2, FlaskConical, Building, 
  Calculator, ExternalLink, ShieldCheck, FileText, TrendingDown 
} from 'lucide-react';
import { calculateLicenseFee } from '../services/aiEngine';

export default function StandardDetailModal({ standard, onClose }) {
  const [enterpriseType, setEnterpriseType] = useState('micro');

  const feeCalculation = useMemo(() => {
    if (!standard) return null;
    return calculateLicenseFee(standard, enterpriseType);
  }, [standard, enterpriseType]);

  if (!standard) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-modal border border-neutral-200 animate-in zoom-in-95 text-left">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-start justify-between gap-4 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-mono">
                {standard.isCode}
              </span>
              <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                {standard.scheme}
              </span>
              {standard.mandatoryQCO && (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Mandatory QCO
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
              {standard.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* 1. Overview */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Overview & Scope
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {standard.description}
            </p>

            {standard.mandatoryQCO && standard.qcoNotification && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2 mt-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Statutory Quality Control Order: </span>
                  <span>{standard.qcoNotification}. Manufacturing, storing, or selling without an operative ISI mark is prohibited under Section 29 of the BIS Act 2016.</span>
                </div>
              </div>
            )}
          </section>

          {/* 2. Key Testing Benchmarks */}
          <section className="space-y-2.5">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
              Key Testing Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              {standard.keyTests.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Fee Structure & MSME Calculator */}
          {feeCalculation && (
            <section className="space-y-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-emerald-700" />
                    Statutory Fees & MSME Concessions
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Select enterprise type to preview applicable government concessions:
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-200 text-xs font-medium">
                  {[
                    { id: 'micro', label: 'Micro (50% Off)' },
                    { id: 'small', label: 'Small (20% Off)' },
                    { id: 'medium', label: 'Medium/Large' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setEnterpriseType(t.id)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        enterpriseType === t.id
                          ? 'bg-emerald-600 text-white font-semibold'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                  <span className="text-[10px] text-neutral-400 font-bold block">Application Fee</span>
                  <p className="text-sm font-bold text-neutral-900 mt-0.5">₹{feeCalculation.applicationFee.toLocaleString()}</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                  <span className="text-[10px] text-neutral-400 font-bold block">Audit Fee (2 Days)</span>
                  <p className="text-sm font-bold text-neutral-900 mt-0.5">₹{feeCalculation.inspectionFee.toLocaleString()}</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-neutral-200">
                  <span className="text-[10px] text-neutral-400 font-bold block">Annual Marking Fee</span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">₹{feeCalculation.effectiveMarkingFee.toLocaleString()}</p>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-bold block flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> Concession
                  </span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">₹{feeCalculation.totalSavings.toLocaleString()}</p>
                </div>
              </div>
            </section>
          )}

          {/* 4. Recognized Laboratories */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-neutral-500" />
              BIS Recognized Testing Laboratories
            </h3>
            <div className="space-y-1.5 text-xs text-neutral-700">
              {standard.labsAvailable.map((lab, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-between">
                  <span className="font-semibold text-neutral-900">{lab.name}</span>
                  <span className="text-neutral-500">{lab.city}, {lab.state}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Required Documents */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-neutral-500" />
              Required Documentation
            </h3>
            <ul className="space-y-1 text-xs text-neutral-600">
              {standard.documentationRequired.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0"></span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            Apply online on the official e-governance portal:
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Close
            </button>
            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <span>Manakonline Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
