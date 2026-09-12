import React, { useState, useMemo } from 'react';
import { 
  Search, AlertTriangle, CheckCircle2, ChevronRight, Calculator, 
  FlaskConical, Building, Sparkles, Send, ArrowUpRight,
  TrendingDown, ShieldCheck, HelpCircle, Layers, FileText, Check,
  Info, Compass, UserCheck
} from 'lucide-react';
import { searchStandards, calculateLicenseFee, askManakSetuAI } from '../services/aiEngine';
import confetti from 'canvas-confetti';

export default function IndustryPortal({ lang, initialQuery = "" }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedStandardId, setSelectedStandardId] = useState("IS-2082");
  const [enterpriseType, setEnterpriseType] = useState("micro");
  const [activeTab, setActiveTab] = useState("roadmap"); // 'roadmap' | 'calculator' | 'testing' | 'ai'
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showUseCaseModal, setShowUseCaseModal] = useState(false);

  const standards = useMemo(() => {
    return searchStandards(searchQuery);
  }, [searchQuery]);

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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* CLEAR USE-CASE ONBOARDING BANNER (Removes confusion & defines exact purpose) */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-blue-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Real-World Purpose & Use Case</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Yeh Portal Kahan Aur Kaise Use Hota Hai?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Jab koi naya business ya factory shuru karta hai, use pata nahi hota ki <strong>Government of India (BIS)</strong> ke 21,000+ rules me se uske product par kaun sa standard lagta hai aur kitna kharcha aayega. 
              <strong> ManakSetu sirf 3 steps me pura compliance process clear kar deta hai.</strong>
            </p>
          </div>

          <button
            onClick={() => setShowUseCaseModal(true)}
            className="shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-white/20 transition-all"
          >
            <Info className="w-4 h-4 text-amber-400" />
            <span>Ek Real Example Dekhein (Case Study)</span>
          </button>
        </div>

        {/* 3 Clear Steps Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
            <div>
              <p className="font-bold text-white">Product Search Karein</p>
              <p className="text-[11px] text-slate-400">Apne product ka naam likhein</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
            <div>
              <p className="font-bold text-white">Standard & Rules Jaanein</p>
              <p className="text-[11px] text-slate-400">IS Code & Mandatory status dekhein</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 p-2.5 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
            <div>
              <p className="font-bold text-white">Roadmap & Subsidy Paayein</p>
              <p className="text-[11px] text-slate-400">50% MSME chhoot & labs list dekhein</p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: CLEAN SEARCH BAR */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-blue-600" />
            Step 1: Apne Product Ka Naam Likhein ya Chuney:
          </label>
          <span className="text-[11px] text-slate-500">
            {standards.length} Indian Standards Available
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search: e.g. Geyser, Water bottle, Toys, Helmet, Plug, Cement..."
            className="w-full pl-4 pr-10 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Product Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold text-[11px] mr-1">Quick Select:</span>
          {[
            { label: "Electric Geyser", query: "geyser" },
            { label: "Infant Toys", query: "toys" },
            { label: "Packaged Water", query: "packaged water" },
            { label: "Helmets", query: "helmet" },
            { label: "Plugs & Sockets", query: "plug" },
            { label: "Gold Jewellery", query: "gold" }
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(chip.query)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                searchQuery.toLowerCase() === chip.query
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2: CLEAN PRODUCT STANDARDS DISPLAY (Horizontal Carousel / Cards) */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
          Step 2: Applicable Indian Standard Select Karein:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {standards.map((std) => {
            const isSelected = activeStandard && activeStandard.id === std.id;
            return (
              <div
                key={std.id}
                onClick={() => setSelectedStandardId(std.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-600/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {std.isCode}
                    </span>
                    {std.mandatoryQCO && (
                      <span className="text-[10px] font-black text-red-700 bg-red-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <AlertTriangle className="w-3 h-3 text-red-600" /> Mandatory
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {std.title}
                  </h4>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{std.category}</span>
                  <span className={`font-bold ${isSelected ? 'text-blue-700' : 'text-slate-400'}`}>
                    {isSelected ? '✓ Selected' : 'Click to View'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: DE-CLUTTERED TABBED INTELLIGENCE PANEL */}
      {activeStandard && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header of Active Standard */}
          <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black bg-blue-900 text-white px-3 py-1 rounded-lg">
                  {activeStandard.isCode}
                </span>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200">
                  {activeStandard.scheme}
                </span>
              </div>
              {activeStandard.mandatoryQCO && (
                <span className="text-xs font-black bg-red-100 text-red-800 px-3 py-1 rounded-lg border border-red-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Statutory Mandatory Quality Control Order in Force
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mt-1">
              {activeStandard.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-4xl">
              {activeStandard.description}
            </p>
          </div>

          {/* DE-CLUTTER TABS: Only show one section at a time so it's clean and focused */}
          <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 overflow-x-auto">
            {[
              { id: "roadmap", label: "1. Licensing Roadmap (5 Steps)", icon: Compass },
              { id: "calculator", label: "2. Fees & MSME Concession", icon: Calculator },
              { id: "testing", label: "3. Lab Testing & Parameters", icon: FlaskConical },
              { id: "ai", label: "4. Ask AI Consultant", icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                    isActive
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    5-Stage BIS Certification Roadmap
                  </h4>
                  <p className="text-xs text-slate-500">
                    Application se lekar CML License prapt karne tak ka step-by-step process.
                  </p>
                </div>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  Manakonline Portal <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                {[
                  { step: "01", title: "Online Application", desc: "Submit Form-V on Manakonline with factory deed & machinery list." },
                  { step: "02", title: "In-House Lab", desc: "Install testing tools & appoint qualified QC engineer as per IS standard." },
                  { step: "03", title: "Factory Audit", desc: "BIS officer visits factory, inspects process & draws counter-samples." },
                  { step: "04", title: "Lab Testing", desc: "Sample tested in BIS recognized independent laboratory." },
                  { step: "05", title: "CML Grant", desc: "License issued. Affix ISI mark with 7-digit CML number on product." }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      STAGE {s.step}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 mt-2">{s.title}</h5>
                    <p className="text-[11px] text-slate-600 mt-1 leading-tight">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Documentation Required:</strong> Manufacturing Plant Machinery list, Calibrated Test Equipment, In-house Testing Facility proof, Process Flowchart, and Factory Premises verification.
              </div>
            </div>
          )}

          {/* TAB 2: CALCULATOR */}
          {activeTab === "calculator" && feeCalculation && (
            <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-600" />
                    Government Fee & MSME Concession Estimator
                  </h4>
                  <p className="text-xs text-slate-500">
                    Apni enterprise category choose karein aur dekhein kitni chhoot (subsidy) milti hai:
                  </p>
                </div>

                {/* Toggle Enterprise */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {[
                    { id: "micro", label: "Micro (50% Off)" },
                    { id: "small", label: "Small (20% Off)" },
                    { id: "women_startup", label: "Women/Startup (50%)" },
                    { id: "medium_large", label: "Medium/Large" }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setEnterpriseType(t.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        enterpriseType === t.id
                          ? 'bg-blue-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block">Application Fee</span>
                  <p className="text-lg font-black text-slate-900 mt-1">₹{feeCalculation.applicationFee.toLocaleString()}</p>
                  <span className="text-[10px] text-slate-400">Fixed statutory</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block">Factory Audit (2 Days)</span>
                  <p className="text-lg font-black text-slate-900 mt-1">₹{feeCalculation.inspectionFee.toLocaleString()}</p>
                  <span className="text-[10px] text-slate-400">₹7,000 / man-day</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block">Effective Marking Fee</span>
                  <p className="text-lg font-black text-blue-700 mt-1">₹{feeCalculation.effectiveMarkingFee.toLocaleString()}</p>
                  <span className="text-[10px] text-emerald-600 font-bold">
                    {feeCalculation.concessionPercent > 0 ? `${feeCalculation.concessionPercent}% Subsidy Applied` : 'Standard Rate'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300">
                  <span className="text-xs text-emerald-800 font-bold flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Total MSME Savings
                  </span>
                  <p className="text-xl font-black text-emerald-700 mt-1">₹{feeCalculation.totalSavings.toLocaleString()}</p>
                  <span className="text-[10px] text-emerald-800 font-semibold">Under 'Make In India'</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span>
                  Total First-Year Estimated Compliance Cost: <strong className="text-amber-400 text-sm">₹{feeCalculation.totalEstimatedCost.toLocaleString()}</strong>
                </span>
                <button
                  onClick={triggerCelebration}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-3.5 py-1.5 rounded-lg transition-all"
                >
                  Verify Subsidy Eligibility ✨
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: TESTING PARAMETERS & LABS */}
          {activeTab === "testing" && (
            <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Key Tests */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    Mandatory Testing Benchmarks
                  </h4>
                  <ul className="space-y-2">
                    {activeStandard.keyTests.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Labs */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-purple-600" />
                    BIS & NABL Accredited Testing Laboratories
                  </h4>
                  <div className="space-y-2">
                    {activeStandard.labsAvailable.map((lab, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                        <p className="font-bold text-slate-900">{lab.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{lab.city}, {lab.state}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: AI CONSULTANT */}
          {activeTab === "ai" && (
            <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Ask ManakSetu AI Consultant
                </h4>
                <p className="text-xs text-slate-500">
                  {activeStandard.isCode} ke baare me koi bhi technical ya statutory sawaal Hindi ya English me poochein:
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder={`e.g. What testing equipment is needed for ${activeStandard.isCode}?`}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                />
                <button
                  onClick={() => handleAskAI()}
                  disabled={aiLoading}
                  className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  {aiLoading ? <span className="animate-spin">⏳</span> : <Send className="w-3.5 h-3.5" />}
                  <span>Ask AI</span>
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5">
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
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 font-medium transition-all"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {aiAnswer && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                  <div className="font-bold text-blue-900 pb-1 mb-2 border-b border-blue-200">
                    💡 {aiAnswer.source}
                  </div>
                  {aiAnswer.text}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* REAL-WORLD CASE STUDY MODAL (Explains Exactly Where & How It Is Used) */}
      {showUseCaseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Real-World Use Case & Story
              </h3>
              <button 
                onClick={() => setShowUseCaseModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <p className="font-bold text-blue-950 text-sm mb-1">
                  📖 Story: Ramesh (MSME Entrepreneur from Okhla, Delhi)
                </p>
                <p>
                  Ramesh ne nayi electric water heater (geyser) factory shuru ki. Pehle use pata hi nahi tha ki geyser bechne ke liye government ka <strong>Mandatory Quality Control Order</strong> lagu hai. Agar wo bina ISI mark ke bechta, to use 2 saal ki jail aur ₹5,00,000 ka fine lag sakta tha!
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-900 text-sm">Yeh Portal Ramesh ki kaise madad karta hai?</p>
                <ol className="list-decimal list-inside space-y-2 text-slate-600">
                  <li>
                    <strong className="text-slate-900">Step 1 (Discovery):</strong> Ramesh portal par <em>"Electric Geyser"</em> type karta hai. ManakSetu turant batata hai: <code>IS 2082:2018</code> lagu hoga.
                  </li>
                  <li>
                    <strong className="text-slate-900">Step 2 (Alert):</strong> Portal red badge me alert deta hai ki geyser par <strong>Mandatory QCO Order</strong> hai, bina license production shuru na karein.
                  </li>
                  <li>
                    <strong className="text-slate-900">Step 3 (Subsidy):</strong> Fee calculator me Ramesh 'Micro' select karta hai aur use pata chalta hai ki use <strong>₹42,000 (50%) ki government chhoot</strong> milegi!
                  </li>
                  <li>
                    <strong className="text-slate-900">Step 4 (Roadmap):</strong> Portal use Sahibabad (NCR) ki BIS Central Lab ka address aur factory me zaroori high-voltage test machines ki list de deta hai.
                  </li>
                </ol>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <p className="font-bold">🎯 Result for the Country:</p>
                <p className="mt-0.5">
                  Ramesh ko kisi agent ya rishwat ki zaroorat nahi padi. Usne seedha BIS license apply kiya, aur aam janta tak surakshit, certified geysers pahunche.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowUseCaseModal(false)}
              className="mt-5 w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
            >
              Samajh Gaya, Wapas Portal Dekhein
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
