import React, { useState, useMemo } from 'react';
import { 
  Search, AlertTriangle, CheckCircle2, ChevronRight, Calculator, 
  FlaskConical, Building, Sparkles, Send, ArrowUpRight,
  TrendingDown, ShieldCheck, Layers, FileText, Check,
  Info, Compass, UserCheck, HelpCircle
} from 'lucide-react';
import { searchStandards, calculateLicenseFee, askManakSetuAI } from '../services/aiEngine';
import confetti from 'canvas-confetti';

export default function IndustryPortal({ initialQuery = "" }) {
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

      {/* EXECUTIVE PURPOSE & ONBOARDING BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>National Standards & Statutory Compliance Navigator</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Accelerating Industrial Compliance for Indian Manufacturers & MSMEs
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              India has over <strong>21,000+ Indian Standards (IS Codes)</strong> published by the Bureau of Indian Standards (BIS). 
              ManakSetu demystifies regulatory requirements, identifies mandatory Quality Control Orders (QCOs), and computes government fee concessions in three simple steps.
            </p>
          </div>

          <button
            onClick={() => setShowUseCaseModal(true)}
            className="shrink-0 flex items-center gap-2 bg-blue-600/30 hover:bg-blue-600/50 text-white px-4 py-2.5 rounded-xl text-xs font-bold border border-blue-400/30 transition-all shadow-xs"
          >
            <Info className="w-4 h-4 text-blue-300" />
            <span>View Real-World Case Study</span>
          </button>
        </div>

        {/* 3 Step Regulatory Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
            <div>
              <p className="font-bold text-white">Identify Applicable Standard</p>
              <p className="text-[11px] text-slate-400">Search product by name or keyword</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
            <div>
              <p className="font-bold text-white">Verify Regulatory Status</p>
              <p className="text-[11px] text-slate-400">Check mandatory QCOs and penalties</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
            <div>
              <p className="font-bold text-white">Licensing & Concession Roadmap</p>
              <p className="text-[11px] text-slate-400">Calculate 50% MSME subsidy & labs</p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: PRODUCT SEARCH & FILTERS */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-blue-600" />
            Step 1: Search or Select Your Manufactured Product
          </label>
          <span className="text-[11px] font-medium text-slate-500">
            {standards.length} Indian Standards Indexed
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search: e.g. Electric geyser, packaged drinking water, toys, plug, helmet, cement..."
            className="w-full pl-4 pr-16 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200 px-2.5 py-1 rounded-md"
            >
              Clear
            </button>
          )}
        </div>

        {/* Popular Product Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-bold text-[11px] mr-1">Popular Standards:</span>
          {[
            { label: "Electric Geyser", query: "geyser" },
            { label: "Infant Toys", query: "toys" },
            { label: "Packaged Water", query: "packaged water" },
            { label: "Rider Helmets", query: "helmet" },
            { label: "Plugs & Sockets", query: "plug" },
            { label: "Gold Jewellery", query: "gold" },
            { label: "Cement (OPC 53)", query: "cement" }
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(chip.query)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                searchQuery.toLowerCase() === chip.query
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2: IDENTIFIED STANDARDS CARDS */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider px-1">
          Step 2: Select Standard to View Comprehensive Guidance
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
                        <AlertTriangle className="w-3 h-3 text-red-600" /> Mandatory QCO
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
                    {isSelected ? '✓ Selected' : 'View Guidance →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: TABBED INTELLIGENCE PANEL */}
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
                  Statutory Mandatory Quality Control Order (QCO) in Force
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

          {/* CLEAN NAVIGATION TABS */}
          <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 overflow-x-auto">
            {[
              { id: "roadmap", label: "1. Licensing Roadmap (5 Stages)", icon: Compass },
              { id: "calculator", label: "2. Statutory Fees & MSME Concessions", icon: Calculator },
              { id: "testing", label: "3. Test Benchmarks & Laboratories", icon: FlaskConical },
              { id: "ai", label: "4. AI Regulatory Advisory", icon: Sparkles }
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

          {/* TAB 1: LICENSING ROADMAP */}
          {activeTab === "roadmap" && (
            <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    5-Stage BIS Certification & Licensing Workflow
                  </h4>
                  <p className="text-xs text-slate-500">
                    Standard operating procedure from online filing to statutory grant of license.
                  </p>
                </div>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  Official Manakonline Portal <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                {[
                  { stage: "01", title: "Online Application", desc: "Submit statutory Form-V on Manakonline with factory deeds and machinery schedules." },
                  { stage: "02", title: "In-House Lab Setup", desc: "Install required calibrated testing equipment and appoint a certified QC engineer." },
                  { stage: "03", title: "Factory Audit", desc: "A designated BIS officer conducts physical inspection and draws counter-samples." },
                  { stage: "04", title: "Independent Testing", desc: "Official samples undergo rigorous evaluation in a BIS-recognized testing laboratory." },
                  { stage: "05", title: "Grant of License", desc: "Issuance of 7-digit CML number granting legal authority to affix the ISI Mark." }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      STAGE {s.stage}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 mt-2">{s.title}</h5>
                    <p className="text-[11px] text-slate-600 mt-1 leading-tight">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Mandatory Documentation Checklist:</strong> Manufacturing machinery list, calibrated test equipment schedule, certified in-house testing personnel, process quality control plan, and premises proof.
              </div>
            </div>
          )}

          {/* TAB 2: FEES & MSME CONCESSIONS */}
          {activeTab === "calculator" && feeCalculation && (
            <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-600" />
                    Statutory Fee Structure & MSME Concession Estimator
                  </h4>
                  <p className="text-xs text-slate-500">
                    Select enterprise classification under the MSMED Act to calculate applicable government fee concessions:
                  </p>
                </div>

                {/* Enterprise Type Selector */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {[
                    { id: "micro", label: "Micro Enterprise (50% Off)" },
                    { id: "small", label: "Small Enterprise (20% Off)" },
                    { id: "women_startup", label: "Women/Startup (50% Off)" },
                    { id: "medium_large", label: "Medium / Large" }
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

              {/* Fee Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block">Statutory Application Fee</span>
                  <p className="text-lg font-black text-slate-900 mt-1">₹{feeCalculation.applicationFee.toLocaleString()}</p>
                  <span className="text-[10px] text-slate-400">Fixed statutory fee</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block">Factory Audit (2 Days)</span>
                  <p className="text-lg font-black text-slate-900 mt-1">₹{feeCalculation.inspectionFee.toLocaleString()}</p>
                  <span className="text-[10px] text-slate-400">₹7,000 / man-day</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block">Annual Marking Fee</span>
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
                  <span className="text-[10px] text-emerald-800 font-semibold">Under 'Make in India'</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span>
                  Total First-Year Estimated Statutory Cost: <strong className="text-amber-400 text-sm">₹{feeCalculation.totalEstimatedCost.toLocaleString()}</strong> (Exclusive of independent lab testing)
                </span>
                <button
                  onClick={triggerCelebration}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-1.5 rounded-lg transition-all"
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
                
                {/* Mandatory Parameters */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    Mandatory Laboratory Test Benchmarks
                  </h4>
                  <ul className="space-y-2">
                    {activeStandard.keyTests.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Accredited Labs */}
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

          {/* TAB 4: AI ADVISORY */}
          {activeTab === "ai" && (
            <div className="p-5 sm:p-6 space-y-4 animate-in fade-in">
              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Ask ManakSetu Regulatory Advisory
                </h4>
                <p className="text-xs text-slate-500">
                  Inquire regarding compliance timelines, penalty clauses, or in-house machinery for {activeStandard.isCode}:
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder={`e.g. What in-house testing equipment is required for ${activeStandard.isCode}?`}
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

              {/* Sample Queries */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Is factory audit mandatory before license grant?",
                  "What is the statutory penalty for non-compliance under BIS Act 2016?",
                  "How long does the licensing process take on average?"
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

      {/* REAL-WORLD CASE STUDY MODAL */}
      {showUseCaseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Real-World Case Study: Accelerating MSME Manufacturing
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
                  Profile: Rajesh Sharma, Electric Appliance Manufacturer (Okhla Industrial Area, New Delhi)
                </p>
                <p>
                  Rajesh established a new manufacturing facility for domestic electric storage water heaters (geysers). 
                  Previously, discovering statutory compliance obligations required hiring expensive regulatory liaison agents or navigating hundreds of pages of gazette notifications.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-900 text-sm">How ManakSetu Streamlines Compliance:</p>
                <ol className="list-decimal list-inside space-y-2 text-slate-600">
                  <li>
                    <strong className="text-slate-900">Immediate Standard Identification:</strong> Rajesh inputs "Electric Geyser" into ManakSetu, instantly receiving <code>IS 2082:2018</code> as the governing statutory standard.
                  </li>
                  <li>
                    <strong className="text-slate-900">Mandatory QCO Alert:</strong> The system flags that domestic geysers are governed by a mandatory Quality Control Order, legally preventing commercial sale without an operative ISI mark.
                  </li>
                  <li>
                    <strong className="text-slate-900">Transparent Subsidy Computation:</strong> Selecting 'Micro Enterprise' confirms a <strong>50% marking fee concession (saving ₹42,000)</strong> under central MSME promotion policies.
                  </li>
                  <li>
                    <strong className="text-slate-900">Testing & Lab Directory:</strong> Direct access to technical parameters (dielectric strength, standing heat loss) and mapping to the nearby BIS Central Laboratory in Sahibabad, NCR.
                  </li>
                </ol>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <p className="font-bold">National Outcome:</p>
                <p className="mt-0.5">
                  Eliminates compliance ambiguity, reduces certification turnaround time by up to 70%, and ensures high-quality, certified products for Indian consumers.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowUseCaseModal(false)}
              className="mt-5 w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
            >
              Close & Return to Portal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
