import React, { useState, useEffect } from 'react';
import { 
  Calculator, TrendingDown, HelpCircle, AlertCircle, ShieldCheck, 
  CheckCircle2, FlaskConical, MapPin, Sparkles, Building2, Award, FileCheck 
} from 'lucide-react';
import { estimateCost } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import LabLocator from './LabLocator';

export default function CostEstimatorSection({ embedded = false }) {
  const { t } = useLanguage();
  const { searchParams } = useRouter();
  const [activeTab, setActiveTab] = useState('fees'); // 'fees' | 'labs'

  const popularStandards = [
    { label: "Portland Pozzolana Cement PPC (IS 1489)", code: "IS 1489 (Part 1): 2015" },
    { label: "53 Grade Portland Cement (IS 12269)", code: "IS 12269: 2013" },
    { label: "Ordinary Portland Cement (IS 269)", code: "IS 269: 2015" },
    { label: "Immersion Water Heater (IS 368)", code: "IS 368: 2014" },
    { label: "Storage Geyser (IS 2082)", code: "IS 2082: 2018" },
    { label: "Packaged Drinking Water (IS 14543)", code: "IS 14543: 2016" },
    { label: "Children's Toys (IS 9873)", code: "IS 9873 (Part 1): 2019" },
    { label: "Two-Wheeler Helmet (IS 4151)", code: "IS 4151: 2020" },
    { label: "Domestic Pressure Cooker (IS 2347)", code: "IS 2347: 2017" },
    { label: "Concrete Reinforcement Steel (IS 1786)", code: "IS 1786: 2008" }
  ];

  const [selectedStandard, setSelectedStandard] = useState(popularStandards[0].code);
  const [enterpriseType, setEnterpriseType] = useState("micro");
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Read URL query parameters
  useEffect(() => {
    const stdParam = searchParams.get('standard') || searchParams.get('isCode');
    const tabParam = searchParams.get('tab');
    if (stdParam) {
      const match = popularStandards.find(s => s.code.toLowerCase().includes(stdParam.toLowerCase()) || stdParam.toLowerCase().includes(s.code.toLowerCase().slice(0, 7)));
      if (match) {
        setSelectedStandard(match.code);
      }
    }
    if (tabParam === 'labs') {
      setActiveTab('labs');
    }
  }, [searchParams]);

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

  const content = (
    <div className="w-full space-y-6 text-left">
      {!embedded && (
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-gov-100 border border-gov-300 text-gov-800 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-gov-800" />
            <span>Statutory Tariff &amp; Lab Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
            BIS Certification Costs &amp; NABL Lab Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Calculate dynamic first-year licensing tariffs with statutory 50% Micro / 20% Small enterprise fee concessions and locate accredited testing laboratories near your manufacturing unit.
          </p>
        </div>
      )}

      {/* Tab Switcher: Fee Estimator vs Lab Locator */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('fees')}
          className={`px-4 py-2 rounded-sm text-xs font-bold transition-all border flex items-center gap-2 ${
            activeTab === 'fees'
              ? 'bg-gov-800 text-white border-gov-800 shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Dynamic Fee &amp; MSME Concessions</span>
        </button>

        <button
          onClick={() => setActiveTab('labs')}
          className={`px-4 py-2 rounded-sm text-xs font-bold transition-all border flex items-center gap-2 ${
            activeTab === 'labs'
              ? 'bg-gov-800 text-white border-gov-800 shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>NABL Lab Geolocation Locator</span>
        </button>
      </div>

      {/* TAB 1: DYNAMIC FEE ESTIMATOR */}
      {activeTab === 'fees' && (
        <div className="bg-slate-50 rounded-sm p-5 sm:p-6 border border-slate-300 shadow-sm space-y-6">
          
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Select Product Standard:
              </label>
              <select
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gov-800 text-slate-900 font-medium"
              >
                {popularStandards.map((std, idx) => (
                  <option key={idx} value={std.code}>
                    {std.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Enterprise Classification (Udyam MSME / Startup):
              </label>
              <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-sm border border-slate-300 text-xs font-medium">
                {[
                  { id: "micro", label: "Micro (50%)" },
                  { id: "small", label: "Small (20%)" },
                  { id: "medium_large", label: "Regular" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setEnterpriseType(t.id)}
                    className={`py-1.5 rounded-sm transition-all text-center ${
                      enterpriseType === t.id
                        ? "bg-gov-800 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
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
              <div className="bg-white rounded-sm p-5 border border-slate-300 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Selected Standard</span>
                    <p className="text-sm font-bold text-slate-900">{estimate.standard_code}</p>
                  </div>
                  {estimate.concession_percent > 0 ? (
                    <span className="text-xs font-bold text-gov-800 bg-gov-100 px-2.5 py-1 rounded-sm border border-gov-300 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5 text-gov-700" />
                      {estimate.concession_percent}% MSME Concession Applied
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-sm">
                      Standard Tariff (No MSME Concession)
                    </span>
                  )}
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Application Fee</span>
                    <p className="text-base font-extrabold text-slate-900 mt-1">₹{estimate.application_fee?.toLocaleString()}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Audit / Inspection Fee</span>
                    <p className="text-base font-extrabold text-slate-900 mt-1">₹{estimate.inspection_fee?.toLocaleString()}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Annual Marking Fee</span>
                    <p className="text-base font-extrabold text-gov-800 mt-1">₹{estimate.effective_marking_fee?.toLocaleString()}</p>
                    {estimate.total_savings > 0 && (
                      <span className="text-[10px] text-slate-400 line-through">
                        ₹{estimate.base_marking_fee?.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="bg-gov-50 p-3 rounded-sm border border-gov-200">
                    <span className="text-[10px] text-gov-800 font-bold uppercase block">Total Estimated Cost</span>
                    <p className="text-base font-extrabold text-gov-900 mt-1">₹{estimate.total_estimated_cost?.toLocaleString()}</p>
                    {estimate.total_savings > 0 && (
                      <span className="text-[10px] text-gov-800 font-bold block mt-0.5">
                        Saves ₹{estimate.total_savings?.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* ROI & Concession Footnote */}
                <div className="p-3.5 bg-slate-50 rounded-sm border border-slate-300 flex items-start gap-2.5 text-xs text-slate-800">
                  <Award className="w-4 h-4 text-gov-800 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-gov-900">
                      MSME Concession Policy (Regulation 3 of BIS Conformity Assessment):
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Micro enterprises (turnover &lt; ₹5 Cr) receive 50% marking fee waiver. Small enterprises (turnover &lt; ₹50 Cr) receive 20% waiver upon submitting valid Udyam Registration Certificate. Women-led enterprises and DPIIT-recognized startups qualify for maximum 50% concession.
                    </p>
                  </div>
                </div>

                {/* Switch to Lab Locator CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500">
                    Need sample testing for {selectedStandard}?
                  </span>
                  <button
                    onClick={() => setActiveTab('labs')}
                    className="px-4 py-2 rounded-sm bg-gov-800 hover:bg-gov-900 text-white font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Accredited Labs for {selectedStandard}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NABL LAB LOCATOR */}
        {activeTab === 'labs' && (
          <div>
            <LabLocator initialStandard={selectedStandard} />
          </div>
        )}

      </div>
    );

  if (embedded) {
    return content;
  }

  return (
    <section id="cost-estimator" className="py-8 md:py-12 bg-white border-b border-slate-300 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
}
