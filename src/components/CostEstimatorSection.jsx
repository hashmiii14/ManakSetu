import React, { useState, useEffect } from 'react';
import { Calculator, TrendingDown, HelpCircle, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { estimateCost } from '../services/api';

export default function CostEstimatorSection() {
  const popularStandards = [
    { label: "Immersion Water Heater (IS 368)", code: "IS 368: 2014" },
    { label: "Storage Geyser (IS 2082)", code: "IS 2082: 2018" },
    { label: "Packaged Drinking Water (IS 14543)", code: "IS 14543: 2016" },
    { label: "Children's Toys (IS 9873)", code: "IS 9873 (Part 1): 2019" },
    { label: "Two-Wheeler Helmet (IS 4151)", code: "IS 4151: 2020" },
    { label: "Domestic Pressure Cooker (IS 2347)", code: "IS 2347: 2017" },
    { label: "53 Grade Portland Cement (IS 12269)", code: "IS 12269: 1987" },
    { label: "Concrete Reinforcement Steel (IS 1786)", code: "IS 1786: 2008" }
  ];

  const [selectedStandard, setSelectedStandard] = useState(popularStandards[0].code);
  const [enterpriseType, setEnterpriseType] = useState("micro");
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    estimateCost(selectedStandard, enterpriseType)
      .then((res) => {
        if (isMounted) setEstimate(res);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [selectedStandard, enterpriseType]);

  return (
    <section id="cost-estimator" className="py-16 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Statutory Fee Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            BIS Certification Cost & MSME Concessions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Calculate estimated first-year licensing costs with statutory 50% Micro and 20% Small enterprise fee concessions.
          </p>
        </div>

        <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-300 shadow-sm max-w-3xl mx-auto space-y-6">
          
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                Select Product Standard:
              </label>
              <select
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-neutral-900 font-medium"
              >
                {popularStandards.map((std, idx) => (
                  <option key={idx} value={std.code}>
                    {std.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1.5">
                Enterprise Classification (Udyam MSME):
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-white p-1 rounded-xl border border-neutral-300 text-xs font-medium">
                {[
                  { id: "micro", label: "Micro (50%)" },
                  { id: "small", label: "Small (20%)" },
                  { id: "medium_large", label: "Regular" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setEnterpriseType(t.id)}
                    className={`py-2 rounded-lg transition-all text-center ${
                      enterpriseType === t.id
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Breakdown Card */}
          {estimate && (
            <div className="bg-white rounded-xl p-5 border border-neutral-200 space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase block">Selected Standard</span>
                  <p className="text-sm font-bold text-neutral-900">{estimate.standard_code}</p>
                </div>
                {estimate.concession_percent > 0 ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    {estimate.concession_percent}% MSME Concession Applied
                  </span>
                ) : (
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
                    Standard Tariff (No MSME Concession)
                  </span>
                )}
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase block">Application Fee</span>
                  <p className="text-base font-extrabold text-neutral-900 mt-1">₹{estimate.application_fee?.toLocaleString()}</p>
                </div>

                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase block">Audit / Inspection Fee</span>
                  <p className="text-base font-extrabold text-neutral-900 mt-1">₹{estimate.inspection_fee?.toLocaleString()}</p>
                </div>

                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase block">Annual Marking Fee</span>
                  <p className="text-base font-extrabold text-emerald-700 mt-1">₹{estimate.effective_marking_fee?.toLocaleString()}</p>
                  {estimate.total_savings > 0 && (
                    <span className="text-[10px] text-neutral-400 line-through">
                      ₹{estimate.base_marking_fee?.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase block">Total Estimated Cost</span>
                  <p className="text-base font-extrabold text-emerald-900 mt-1">₹{estimate.total_estimated_cost?.toLocaleString()}</p>
                  {estimate.total_savings > 0 && (
                    <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                      Saves ₹{estimate.total_savings?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Statutory Disclaimer */}
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Statutory Notice:</strong> {estimate.disclaimer}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
