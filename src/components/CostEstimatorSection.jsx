import React, { useState, useEffect } from 'react';
import { 
  Calculator, TrendingDown, HelpCircle, AlertCircle, ShieldCheck, 
  CheckCircle2, FlaskConical, MapPin, Sparkles, Building2, Award, FileCheck 
} from 'lucide-react';
import { estimateCost } from '../services/api';
import LabLocator from './LabLocator';

export default function CostEstimatorSection() {
  const [activeTab, setActiveTab] = useState('fees'); // 'fees' | 'labs'

  const popularStandards = [
    { label: "Immersion Water Heater (IS 368)", code: "IS 368: 2014" },
    { label: "Storage Geyser (IS 2082)", code: "IS 2082: 2018" },
    { label: "Packaged Drinking Water (IS 14543)", code: "IS 14543: 2016" },
    { label: "Children's Toys (IS 9873)", code: "IS 9873 (Part 1): 2019" },
    { label: "Two-Wheeler Helmet (IS 4151)", code: "IS 4151: 2020" },
    { label: "Domestic Pressure Cooker (IS 2347)", code: "IS 2347: 2017" },
    { label: "53 Grade Portland Cement (IS 12269)", code: "IS 12269: 2013" },
    { label: "Concrete Reinforcement Steel (IS 1786)", code: "IS 1786: 2008" },
    { label: "Household Plugs & Sockets (IS 1293)", code: "IS 1293: 2019" },
    { label: "Electric Iron / Press (IS 302-2-3)", code: "IS 302 (Part 2/Sec 3): 2007" }
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
    <section id="cost-estimator" className="py-14 md:py-20 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Smart Cost Estimator & Lab Locator • Module 5</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            BIS Certification Costs & NABL Lab Network
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Calculate dynamic first-year licensing tariffs with statutory 50% Micro / 20% Small enterprise fee concessions and locate accredited testing laboratories near your manufacturing unit.
          </p>
        </div>

        {/* Tab Switcher: Fee Estimator vs Lab Locator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-2 ${
              activeTab === 'fees'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Dynamic Fee & MSME Concessions</span>
          </button>

          <button
            onClick={() => setActiveTab('labs')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-2 ${
              activeTab === 'labs'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>NABL Lab Geolocation Locator</span>
          </button>
        </div>

        {/* TAB 1: DYNAMIC FEE ESTIMATOR */}
        {activeTab === 'fees' && (
          <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-300 shadow-sm max-w-4xl mx-auto space-y-6 animate-in fade-in">
            
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
                  Enterprise Classification (Udyam MSME / Startup):
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

                {/* ROI & Concession Footnote */}
                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold">
                      MSME Concession Policy (Regulation 3 of BIS Conformity Assessment):
                    </p>
                    <p className="text-emerald-900 leading-relaxed">
                      Micro enterprises (turnover &lt; ₹5 Cr) receive 50% marking fee waiver. Small enterprises (turnover &lt; ₹50 Cr) receive 20% waiver upon submitting valid Udyam Registration Certificate. Women-led enterprises and DPIIT-recognized startups qualify for maximum 50% concession.
                    </p>
                  </div>
                </div>

                {/* Switch to Lab Locator CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-neutral-500">
                    Need sample testing for {selectedStandard}?
                  </span>
                  <button
                    onClick={() => setActiveTab('labs')}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Accredited Labs for {selectedStandard} →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NABL LAB LOCATOR */}
        {activeTab === 'labs' && (
          <div className="animate-in fade-in">
            <LabLocator initialStandard={selectedStandard} />
          </div>
        )}

      </div>
    </section>
  );
}
