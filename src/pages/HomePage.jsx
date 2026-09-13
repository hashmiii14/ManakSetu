import React, { useState } from 'react';
import { 
  Search, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, 
  Sparkles, ExternalLink, Calculator, FlaskConical, ChevronRight, 
  Bot, Globe, Award, Factory, Users, Building2, Bell, FileText,
  BadgeCheck, Scale, Compass, HelpCircle, Layers, Check
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { POPULAR_SEARCH_CHIPS, SECTORS_LIST } from '../data/bisStandards';
import ErrorBoundary from '../components/ErrorBoundary';
import ConsumerVerifier from '../components/ConsumerVerifier';
import FAQSection from '../components/FAQSection';

export default function HomePage({ onOpenStandard, onOpenReport }) {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/standards/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/standards/search');
    }
  };

  const handleChipClick = (term) => {
    navigate(`/standards/search?q=${encodeURIComponent(term)}`);
  };

  // 12 Services matching official Manak Online / e-BIS structure
  const officialServices = [
    {
      id: "scheme1",
      code: "Scheme-I",
      title: "Product Certification (ISI Mark)",
      desc: "Mandatory & voluntary certification for domestic manufacturers. Includes factory inspection, testing facility validation & grant of CM/L license.",
      link: "/services#scheme-1",
      isGov: true,
      badge: "Most Common"
    },
    {
      id: "scheme2",
      code: "Scheme-II (CRS)",
      title: "Compulsory Registration (CRS)",
      desc: "Self-declaration of conformity for IT, electronics, solar inverters, and telecom equipment based on NABL test reports.",
      link: "/services#scheme-2",
      isGov: true,
      badge: "IT & Electronics"
    },
    {
      id: "scheme4",
      code: "Scheme-IV",
      title: "Hallmarking of Gold & Silver (HUID)",
      desc: "Mandatory hallmarking for 14K, 18K, 20K, 22K, 23K and 24K gold jewellery with 6-digit alphanumeric laser-etched HUID.",
      link: "/consumer",
      isGov: true,
      badge: "Mandatory (300+ Dists)"
    },
    {
      id: "fmcs",
      code: "FMCS",
      title: "Foreign Manufacturers Scheme",
      desc: "Certification for overseas manufacturing facilities exporting goods to India under mandatory Quality Control Orders (QCOs).",
      link: "/services#fmcs",
      isGov: true,
      badge: "Import / Export"
    },
    {
      id: "labs",
      code: "LRS",
      title: "Laboratory Recognition Scheme",
      desc: "Directory of 120+ NABL accredited & BIS recognized commercial testing laboratories across India for compliance samples.",
      link: "/standards/search",
      isGov: true,
      badge: "NABL Accredited"
    },
    {
      id: "nits",
      code: "NITS",
      title: "National Training Institute (NITS)",
      desc: "Capacity building, quality management training, and standardization workshops for industry professionals & MSMEs.",
      link: "/services#nits",
      isGov: false,
      badge: "Skill Development"
    },
    {
      id: "mscs",
      code: "MSCS",
      title: "Management Systems Certification",
      desc: "Accreditation for ISO 9001 (Quality), ISO 14001 (Environment), ISO 22000 (Food Safety) and ISO 45001 (OH&S).",
      link: "/services#mscs",
      isGov: false,
      badge: "ISO Standards"
    },
    {
      id: "qco",
      code: "QCO Tracker",
      title: "Quality Control Orders Monitor",
      desc: "Track statutory QCOs published in Gazette of India by DPIIT, Ministry of Steel, MeitY, and MoRTH with enforcement dates.",
      link: "/news",
      isGov: true,
      badge: "Statutory"
    },
    {
      id: "truemark",
      code: "TrueMark",
      title: "Citizen Mark Verifier (HUID & CML)",
      desc: "Instant verification of 6-digit Gold HUID codes and 7-digit ISI License (CM/L) numbers against national databases.",
      link: "/consumer",
      isGov: true,
      badge: "Consumer Protection"
    },
    {
      id: "msme",
      code: "Udyam Rel",
      title: "MSME 50% Concession Helpdesk",
      desc: "Statutory fee calculator with 50% concession for Micro enterprises & women startups, and 20% for Small enterprises.",
      link: "/msme",
      isGov: true,
      badge: "50% Discount"
    },
    {
      id: "gem",
      code: "GeM Tender",
      title: "GeM Portal Compliance Integration",
      desc: "Mandatory BIS certification documentation and compliance validation for participating in Central & State Government tenders.",
      link: "/msme#gem",
      isGov: true,
      badge: "Public Procurement"
    },
    {
      id: "grievance",
      code: "Jan Sunvai",
      title: "Grievance & Fake Mark Redressal",
      desc: "File complaints regarding counterfeit ISI marks, misuse of hallmarks, or non-compliant goods directly with BIS and NCH 1915.",
      link: "/consumer#report",
      isGov: true,
      badge: "Toll Free 1915"
    }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* 1. OFFICIAL NOTIFICATION TICKER / STATUTORY BANNER */}
        <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-xs text-amber-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wide flex items-center gap-1">
                <Bell className="w-3 h-3 animate-pulse" />
                Gazette Alert
              </span>
              <span className="font-medium text-amber-950 truncate max-w-2xl">
                DPIIT notifies Mandatory Quality Control Orders (QCOs) for Electrical Accessories &amp; Solar Inverters. Micro enterprises granted 12-month grace period.
              </span>
            </div>
            <button 
              onClick={() => navigate('/news')}
              className="font-bold underline underline-offset-2 hover:text-amber-800 text-[11px] shrink-0"
            >
              View QCO Schedule &rarr;
            </button>
          </div>
        </div>

        {/* 2. HERO PORTAL SECTION */}
        <section className="bg-gradient-to-b from-gov-950 via-gov-900 to-gov-800 text-white py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
          
          {/* Subtle decorative grid background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            
            {/* Ministry / Institutional Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gov-800/80 border border-gov-700 text-slate-200 text-xs font-semibold shadow-gov-sm backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
              <span>Smart India Hackathon 2026 • AI Assistance Platform for BIS &amp; Indian Standards</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Intelligent Gateway to <br className="hidden sm:inline" />
                <span className="text-saffron-400">Indian Standards</span> &amp; <span className="text-bisgreen-400">BIS Services</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
                Empowering Indian MSMEs, manufacturers, exporters, and consumers to discover Indian Standards (IS Codes), verify mandatory Quality Control Orders (QCOs), and test authentic ISI &amp; Gold Hallmarks.
              </p>
            </div>

            {/* SEARCH BOX CONTAINER */}
            <div className="max-w-3xl mx-auto pt-2">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by IS code (IS 2082), product (geyser, helmet), sector, or colloquial term..."
                    className="w-full pl-12 pr-32 py-4 text-sm sm:text-base text-slate-900 bg-white rounded-xl shadow-gov border-2 border-transparent focus:border-saffron-500 focus:outline-none transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-5 py-2.5 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-1.5 shadow-gov-sm"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4 text-saffron-400" />
                  </button>
                </div>
              </form>

              {/* POPULAR SEARCH CHIPS */}
              <div className="pt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-300">
                <span className="text-slate-400 font-medium">Quick Standards:</span>
                {POPULAR_SEARCH_CHIPS.slice(0, 6).map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChipClick(chip.term)}
                    className="px-2.5 py-1 rounded-md bg-gov-800/80 hover:bg-gov-700 text-slate-200 hover:text-white border border-gov-700/80 transition-colors text-[11px]"
                  >
                    {chip.term}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 FAST PILLARS / ACTION BUTTONS */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
              <button
                onClick={() => navigate('/standards/search')}
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all group backdrop-blur-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-saffron-500/20 text-saffron-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Search className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Search Standards</div>
                <div className="text-[10px] text-slate-300 mt-0.5">21,000+ IS catalog</div>
              </button>

              <button
                onClick={() => navigate('/manakbot')}
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all group backdrop-blur-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-saffron-500/20 text-saffron-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Consult ManakBot AI</div>
                <div className="text-[10px] text-slate-300 mt-0.5">5-part regulatory advice</div>
              </button>

              <button
                onClick={() => navigate('/consumer')}
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all group backdrop-blur-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-bisgreen-400 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">Verify HUID &amp; ISI</div>
                <div className="text-[10px] text-slate-300 mt-0.5">Anti-counterfeit check</div>
              </button>

              <button
                onClick={() => navigate('/msme')}
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition-all group backdrop-blur-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-white">MSME Fee Calculator</div>
                <div className="text-[10px] text-slate-300 mt-0.5">50% statutory relief</div>
              </button>
            </div>

          </div>
        </section>

        {/* 3. STATISTICAL METRICS STRIP */}
        <section className="bg-white border-b border-slate-200 py-6 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-gov-900 font-mono">21,000+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Indian Standards Indexed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono">760+</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Mandatory QCO Products</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">50%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">MSME Fee Concession</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-gov-800 font-mono">100%</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Free Open Access AI</div>
            </div>
          </div>
        </section>

        {/* 4. OFFICIAL BIS E-GOVERNANCE SERVICES DIRECTORY (12 TILES) */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-saffron-700 uppercase tracking-wider">
                Services Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight mt-1">
                Official BIS Services &amp; Schemes Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Structured reference inspired by the official Manak Online and e-BIS portals of the Bureau of Indian Standards.
              </p>
            </div>

            <button
              onClick={() => navigate('/services')}
              className="text-gov-800 hover:text-gov-950 font-bold text-xs inline-flex items-center gap-1 shrink-0"
            >
              <span>View Comprehensive Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {officialServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => navigate(srv.link)}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-gov-sm hover:shadow-gov hover:border-gov-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-gov-100 text-gov-800 font-mono font-bold text-[10px]">
                      {srv.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px]">
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gov-900 group-hover:text-gov-700 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-gov-800 group-hover:text-saffron-700">
                  <span>Explore Guidelines</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CONSUMER VERIFICATION SPOTLIGHT (INLINE VERIFIER) */}
        <section className="bg-slate-100/70 border-y border-slate-200 py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Citizen Protection
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                Authenticity &amp; Anti-Counterfeit Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Verify 6-digit Hallmark Unique Identification (HUID) for gold jewellery or 7-digit ISI License (CM/L) number.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-gov p-6 max-w-4xl mx-auto">
              <ConsumerVerifier onOpenReport={onOpenReport} />
            </div>
          </div>
        </section>

        {/* 6. SECTORS COMPENDIUM EXPLORER */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-bold text-saffron-700 uppercase tracking-wider">
              Browse by Industry
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
              Indian Standards Across Key Sectors
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SECTORS_LIST.filter(s => s !== 'All Sectors').map((sector, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/standards/search?sector=${encodeURIComponent(sector)}`)}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-gov-400 shadow-gov-sm hover:shadow-gov text-center transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-gov-50 text-gov-800 flex items-center justify-center mx-auto mb-2.5 group-hover:bg-gov-100 transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-gov-800 transition-colors">
                  {sector}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  View Standards &rarr;
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <section className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <FAQSection />
          </div>
        </section>

      </div>
    </ErrorBoundary>
  );
}
