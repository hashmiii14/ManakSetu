import React, { useState, useMemo } from 'react';
import { 
  Search, AlertTriangle, CheckCircle2, ChevronRight, Calculator, 
  FlaskConical, FileText, Building, Sparkles, Send, ArrowUpRight,
  TrendingDown, ShieldCheck, HelpCircle, Layers
} from 'lucide-react';
import { searchStandards, calculateLicenseFee, askManakSetuAI } from '../services/aiEngine';
import confetti from 'canvas-confetti';

export default function IndustryPortal({ lang, initialQuery = "" }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedStandardId, setSelectedStandardId] = useState("IS-2082");
  const [enterpriseType, setEnterpriseType] = useState("micro");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const standards = useMemo(() => {
    let list = searchStandards(searchQuery);
    if (selectedCategory !== "ALL") {
      list = list.filter(s => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const activeStandard = useMemo(() => {
    return standards.find(s => s.id === selectedStandardId) || standards[0] || null;
  }, [standards, selectedStandardId]);

  const feeCalculation = useMemo(() => {
    if (!activeStandard) return null;
    return calculateLicenseFee(activeStandard, enterpriseType);
  }, [activeStandard, enterpriseType]);

  const handleAskAI = async (customPrompt) => {
    const q = customPrompt || aiQuestion;
    if (!q.trim()) return;
    setAiLoading(true);
    try {
      const response = await askManakSetuAI(q, { standard: activeStandard });
      setAiAnswer(response);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const categories = [
    { id: "ALL", label: lang === 'hi' ? "सभी उत्पाद" : "All Products" },
    { id: "Electrical", label: lang === 'hi' ? "इलेक्ट्रिकल उपकरण" : "Electrical & Appliances" },
    { id: "Food", label: lang === 'hi' ? "खाद्य व पेय" : "Food & Drinking Water" },
    { id: "Children", label: lang === 'hi' ? "खिलौने (Toys)" : "Children & Toys" },
    { id: "Construction", label: lang === 'hi' ? "निर्माण सामग्री" : "Construction & Steel" }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Search & Filter Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-3 border border-blue-200">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            {lang === 'hi' ? 'उद्योग व निर्माता अनुपालन' : 'MSME & Industry Standards Navigator'}
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'अपने उत्पाद का भारतीय मानक (IS Code) खोजें' : 'Discover Applicable Indian Standards (IS Codes) for Your Product'}
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {lang === 'hi' 
              ? 'उत्पाद का नाम, उपकरण या कीवर्ड दर्ज करें। प्रणाली स्वतः लागू मानक, QCO अनिवार्य स्थिति, व सरकारी शुल्क गणना करेगी।'
              : 'Enter product name, appliance, or keyword. The system auto-identifies statutory standards, Quality Control Orders, and subsidies.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="mt-5 relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'उदा: Electric geyser, water bottle, plastic toys, plug, cement...' : 'e.g. Electric geyser, packaged water, toys, 3-pin plug, cement...'}
            className="w-full pl-12 pr-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-bis-accent focus:bg-white transition-all shadow-inner font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-200 px-2 py-1 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-bis-navy text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Standards List on Left, Active Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Matched Standards Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>{lang === 'hi' ? 'पहचाने गए मानक' : 'Identified Standards'} ({standards.length})</span>
            <span>{lang === 'hi' ? 'चुनें' : 'Select to View'}</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {standards.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center border border-slate-200">
                <p className="text-sm font-semibold text-slate-700">No matching standard found in offline cache.</p>
                <p className="text-xs text-slate-500 mt-1">Try keywords like 'geyser', 'toys', 'water', 'plug', 'cement'.</p>
              </div>
            ) : (
              standards.map((std) => {
                const isSelected = activeStandard && activeStandard.id === std.id;
                return (
                  <div
                    key={std.id}
                    onClick={() => {
                      setSelectedStandardId(std.id);
                      setAiAnswer(null);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 shadow-md ring-1 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                          {std.isCode}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug line-clamp-2">
                          {std.title}
                        </h4>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400'}`} />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
                      {std.mandatoryQCO ? (
                        <span className="flex items-center gap-1 bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-200">
                          <AlertTriangle className="w-3 h-3" /> Mandatory QCO
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                          Voluntary
                        </span>
                      )}
                      <span className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                        {std.schemeCode === "SCHEME_1" ? "ISI Mark" : std.schemeCode}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Deep-Dive Standard Intelligence & Roadmap (8 cols) */}
        {activeStandard && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Standard Header Banner */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-sm font-black text-white bg-bis-navy px-3 py-1 rounded-lg tracking-wide shadow-xs">
                  {activeStandard.isCode}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200">
                    {activeStandard.scheme}
                  </span>
                  {activeStandard.mandatoryQCO && (
                    <span className="flex items-center gap-1 text-xs font-black bg-red-100 text-red-800 px-2.5 py-1 rounded-md border border-red-300 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      MANDATORY QCO ORDER
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 leading-snug">
                {activeStandard.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {activeStandard.description}
              </p>

              {activeStandard.qcoNotification && (
                <div className="mt-4 p-3 bg-red-50/60 rounded-xl border border-red-200/80 flex items-start gap-2.5 text-xs text-red-900">
                  <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Statutory Enforcement: </span>
                    <span>{activeStandard.qcoNotification}. It is a punishable offense under Section 29 of the BIS Act 2016 to manufacture, store, or sell without standard mark.</span>
                  </div>
                </div>
              )}
            </div>

            {/* 5-Stage Interactive Licensing Roadmap */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-bis-navy text-white text-xs flex items-center justify-center font-bold">5</span>
                  {lang === 'hi' ? 'लाइसेंसिंग का 5-चरणीय रोडमैप' : '5-Stage BIS Licensing & Compliance Roadmap'}
                </h4>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-bis-accent hover:underline flex items-center gap-1"
                >
                  Official Manakonline Portal <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {[
                  { step: "01", title: "Online Filing", desc: "Submit Form-V on Manakonline with factory deed & machinery list." },
                  { step: "02", title: "In-House Lab", desc: "Install testing tools & appoint qualified QC engineer as per IS standard." },
                  { step: "03", title: "Factory Audit", desc: "BIS officer visits factory, inspects process & draws counter-samples." },
                  { step: "04", title: "Lab Testing", desc: "Sample tested in BIS recognized independent laboratory." },
                  { step: "05", title: "CML Grant", desc: "License issued. Affix ISI mark with 7-digit CML number." }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 hover:bg-blue-50/50 hover:border-blue-300 transition-all">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                      STEP {s.step}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 mt-2">{s.title}</h5>
                    <p className="text-[11px] text-slate-600 mt-1 leading-tight">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic MSME Concession Fee Calculator */}
            {feeCalculation && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                      MSME Concession Engine
                    </span>
                    <h4 className="text-lg font-black mt-1 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-bis-gold" />
                      {lang === 'hi' ? 'लाइसेंस शुल्क व MSME सरकारी छूट कैलकुलेटर' : 'BIS Licensing Fee & Subsidy Estimator'}
                    </h4>
                  </div>

                  {/* Enterprise Type Selector */}
                  <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
                    {[
                      { id: "micro", label: "Micro (50% Off)" },
                      { id: "small", label: "Small (20% Off)" },
                      { id: "women_startup", label: "Women/Startup (50%)" },
                      { id: "medium_large", label: "Medium/Large" }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setEnterpriseType(t.id)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                          enterpriseType === t.id
                            ? 'bg-bis-gold text-slate-950 shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-[11px] text-slate-400">Application Fee</span>
                    <p className="text-base font-bold text-white mt-0.5">₹{feeCalculation.applicationFee.toLocaleString()}</p>
                    <span className="text-[10px] text-slate-500">Fixed statutory</span>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-[11px] text-slate-400">Factory Audit (2 Days)</span>
                    <p className="text-base font-bold text-white mt-0.5">₹{feeCalculation.inspectionFee.toLocaleString()}</p>
                    <span className="text-[10px] text-slate-500">₹7,000 / man-day</span>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <span className="text-[11px] text-slate-400">Effective Marking Fee</span>
                    <p className="text-base font-bold text-amber-400 mt-0.5">₹{feeCalculation.effectiveMarkingFee.toLocaleString()}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {feeCalculation.concessionPercent > 0 ? `${feeCalculation.concessionPercent}% Subsidy Applied` : 'Standard Rate'}
                    </span>
                  </div>

                  <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40">
                    <span className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" /> Total MSME Savings
                    </span>
                    <p className="text-lg font-black text-emerald-400 mt-0.5">₹{feeCalculation.totalSavings.toLocaleString()}</p>
                    <span className="text-[10px] text-emerald-300">Under 'Make In India'</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Total Estimated First-Year Cost: <strong className="text-white text-sm">₹{feeCalculation.totalEstimatedCost.toLocaleString()}</strong> (Excluding external lab tests)
                  </span>
                  <button 
                    onClick={triggerCelebration}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-4"
                  >
                    Verify Subsidy Eligibility ✨
                  </button>
                </div>
              </div>
            )}

            {/* Lab Testing Parameters & Recognized Testing Houses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Mandatory Test Parameters */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <FlaskConical className="w-4 h-4 text-blue-600" />
                  Mandatory Testing Benchmarks
                </h4>
                <ul className="space-y-2">
                  {activeStandard.keyTests.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BIS Recognized Testing Labs */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Building className="w-4 h-4 text-purple-600" />
                  Mapped BIS / NABL Test Laboratories
                </h4>
                <div className="space-y-2">
                  {activeStandard.labsAvailable.map((lab, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      <p className="font-bold text-slate-900">{lab.name}</p>
                      <p className="text-[11px] text-slate-500">{lab.city}, {lab.state}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick AI Consultant Card */}
            <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Ask ManakSetu AI about {activeStandard.isCode}
                </span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  Dual English / Hindi
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder={`e.g. What in-house equipment is required for ${activeStandard.isCode}?`}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-blue-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                />
                <button
                  onClick={() => handleAskAI()}
                  disabled={aiLoading}
                  className="bg-bis-navy text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-900 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                >
                  {aiLoading ? <span className="animate-spin">⏳</span> : <Send className="w-3.5 h-3.5" />}
                  <span>Ask</span>
                </button>
              </div>

              {/* Sample Quick Questions */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[
                  "Is factory audit mandatory before license?",
                  "What is the penalty for selling without ISI mark?",
                  "लाइसेंस मिलने में कितना समय लगता है?"
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiQuestion(preset);
                      handleAskAI(preset);
                    }}
                    className="text-[11px] bg-white hover:bg-blue-100/80 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-200/80 transition-all font-medium"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* AI Answer Output */}
              {aiAnswer && (
                <div className="mt-4 p-4 rounded-xl bg-white border border-blue-200 shadow-sm animate-in fade-in">
                  <div className="flex items-center justify-between text-[11px] text-blue-800 font-bold border-b border-slate-100 pb-1.5 mb-2">
                    <span>💡 {aiAnswer.source}</span>
                    <button onClick={() => setAiAnswer(null)} className="text-slate-400 hover:text-slate-600">Close</button>
                  </div>
                  <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-normal">
                    {aiAnswer.text}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
