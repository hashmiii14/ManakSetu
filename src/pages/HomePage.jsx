import React, { useState } from 'react';
import { 
  Search, ArrowRight, ExternalLink, ShieldCheck, FileText, 
  Building2, CheckCircle2, ChevronRight, BookOpen, Sparkles, 
  FlaskConical, Award, Globe, Scale, Users, MapPin, Calendar, HelpCircle, Calculator
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { POPULAR_SEARCH_CHIPS, SECTORS_LIST } from '../data/bisStandards';
import ErrorBoundary from '../components/ErrorBoundary';

export default function HomePage({ onOpenStandard, onOpenReport }) {
  const { navigate } = useRouter();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/standards/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/standards/search');
    }
  };

  const handleAskBotSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/manakbot?prompt=${encodeURIComponent(`Explain standard and certification requirements for ${searchQuery.trim()}`)}`);
    } else {
      navigate('/manakbot');
    }
  };

  const handleChipClick = (term) => {
    navigate(`/standards/search?q=${encodeURIComponent(term)}`);
  };

  // 12 Institutional Service Modules (Strictly aligned with Manak Online / e-BIS)
  const portalServices = [
    {
      id: "standardization",
      code: "STD",
      title: "Standardization",
      desc: "Formulation and periodic revision of Indian Standards (IS Codes) across electrotechnical, chemical, civil and mechanical divisions.",
      link: "/standards/search",
      icon: BookOpen
    },
    {
      id: "conformity",
      code: "Scheme-I",
      title: "Conformity Assessment (ISI Mark)",
      desc: "Product certification for domestic manufacturers. Mandatory for 760+ items governed by Gazette Quality Control Orders (QCOs).",
      link: "/services",
      icon: ShieldCheck
    },
    {
      id: "crs",
      code: "Scheme-II",
      title: "Compulsory Registration (CRS)",
      desc: "Self-declaration registration scheme for electronics, IT goods, and solar equipment based on recognized lab test reports.",
      link: "/services",
      icon: FileText
    },
    {
      id: "fmcs",
      code: "FMCS",
      title: "Foreign Manufacturers Scheme",
      desc: "Certification for overseas manufacturing facilities producing goods destined for export into Indian customs territory.",
      link: "/services",
      icon: Globe
    },
    {
      id: "mscs",
      code: "MSCS",
      title: "Management Systems Certification",
      desc: "Accredited certification for ISO 9001 (Quality), ISO 14001 (Environment), ISO 22000 (Food Safety), and ISO 45001 (OH&S).",
      link: "/services",
      icon: Scale
    },
    {
      id: "laboratory",
      code: "LRS",
      title: "Laboratory Recognition Scheme",
      desc: "Network of Central, Regional, Branch, and NABL-accredited commercial testing facilities for conformity sample evaluation.",
      link: "/standards/search",
      icon: FlaskConical
    },
    {
      id: "hallmarking",
      code: "Scheme-IV",
      title: "Hallmarking (Gold & Silver HUID)",
      desc: "Mandatory third-party purity certification of gold jewellery with laser-etched 6-digit Hallmark Unique Identification (HUID).",
      link: "/consumer",
      icon: Award
    },
    {
      id: "standards-promotion",
      code: "PROMO",
      title: "Standards Promotion & Outreach",
      desc: "Standard clubs in educational institutions, consumer awareness campaigns, and industry stakeholder consultation workshops.",
      link: "/about",
      icon: Users
    },
    {
      id: "nits",
      code: "NITS",
      title: "National Training Institute (NITS)",
      desc: "Standardization training courses, quality management programs, and statistical process control certifications for industry.",
      link: "/services",
      icon: Building2
    },
    {
      id: "careers",
      code: "HR",
      title: "Human Resources & Recruitment",
      desc: "Official notifications for Scientist-B technical recruitment, Graduate Engineers, and BIS administrative personnel.",
      link: "https://www.bis.gov.in/",
      isExternal: true,
      icon: Users
    },
    {
      id: "gis",
      code: "GIS",
      title: "GIS & Testing Lab Locator",
      desc: "Geospatial mapping of authorized BIS assaying centres, branch offices, and accredited testing laboratories across Indian states.",
      link: "/standards/search",
      icon: MapPin
    },
    {
      id: "links",
      code: "PORTAL",
      title: "Important Official Links",
      desc: "Direct gateways to official Manak Online, e-BIS Officer Login, e-Gazette of India, and the National Consumer Helpline 1915.",
      link: "https://www.manakonline.in/MANAK/",
      isExternal: true,
      icon: ExternalLink
    }
  ];

  // News & Gazette Circulars in Classic Government Portal List Layout
  const portalCirculars = [
    {
      date: "15-Feb-2026",
      ministry: "DPIIT",
      title: "Electrical Appliances for Domestic Use (Quality Control) Order, 2026 notified in Gazette",
      ref: "S.O. 1248(E)",
      link: "/news"
    },
    {
      date: "10-Jan-2026",
      ministry: "Ministry of Steel",
      title: "Mandatory BIS certification enforced for High Strength Deformed Steel Bars (Fe 500D)",
      ref: "IS 1786:2008",
      link: "/news"
    },
    {
      date: "28-Dec-2025",
      ministry: "BIS HQ",
      title: "Renewal of 50% marking fee concession for Udyam-registered Micro Enterprises and Startups",
      ref: "Circular CMD-III/MSME",
      link: "/msme"
    },
    {
      date: "15-Nov-2025",
      ministry: "Consumer Affairs",
      title: "Phase-V mandatory gold hallmarking expanded to 28 additional districts nationwide",
      ref: "Hallmarking Order 2025",
      link: "/consumer"
    }
  ];

  const popularSearchesList = [
    { label: "Cement (IS 1489/12269)", query: "cement" },
    { label: "IS 302 (Electric Iron)", query: "IS 302" },
    { label: "Helmet (IS 4151)", query: "helmet" },
    { label: "Electrical Appliances", query: "electrical" },
    { label: "Packaged Drinking Water", query: "water" },
    { label: "Toys (IS 9873)", query: "toys" },
    { label: "TMT Steel Bars", query: "sariya" }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* 1. WELCOME & SEARCH AREA (BALANCED GOVERNMENT PORTAL HERO) */}
        <section className="bg-white border-b border-slate-300 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT 7 COLS: HEADING, SEARCH & ACTIONS */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Breadcrumb / Portal Label */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span>{t('nav.home', 'Home')}</span>
                  <span>/</span>
                  <span className="text-gov-800 font-semibold">{t('hero.badge', 'Public Service Navigation Portal')}</span>
                </div>

                {/* Restrained Title & Description */}
                <div className="space-y-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                    {t('hero.title', 'Find Indian Standards and BIS Services')}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t('hero.subtitle', 'National assistance portal for Indian enterprises, manufacturers, exporters, and citizens to discover Indian Standards (IS Codes), verify statutory Quality Control Orders (QCOs), and navigate Bureau of Indian Standards (BIS) conformity assessment procedures.')}
                  </p>
                </div>

                {/* Main Portal Search Form */}
                <div className="pt-2">
                  <form onSubmit={handleSearchSubmit} className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={t('search.placeholder', 'Search by IS Number, product, keyword or standard (e.g., IS 2082, geyser, cement, helmet)...')}
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 rounded-sm focus:outline-none focus:border-gov-800 focus:ring-1 focus:ring-gov-800 placeholder:text-slate-400"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs rounded-sm transition-colors shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <Search className="w-3.5 h-3.5 text-amber-400" />
                          <span>{t('btn.search', 'Search Standards')}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleAskBotSubmit}
                          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-gov-800 border border-gov-800 font-bold text-xs rounded-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>{t('btn.manakbot', 'Ask ManakBot')}</span>
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Popular Searches Row (No Emojis) */}
                  <div className="pt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-slate-600 text-[11px]">{t('search.quick_searches', 'Popular Searches:')}</span>
                    {popularSearchesList.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleChipClick(item.query)}
                        className="px-2 py-0.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium border border-slate-200 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Official Portal Notice Banner */}
                <div className="mt-4 p-3 bg-slate-100 border-l-4 border-gov-800 rounded-r-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gov-900">Notice:</span>
                    <span>ManakSetu provides assistive guidance. Official applications and fee filings must be submitted at</span>
                    <a 
                      href="https://www.manakonline.in/MANAK/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gov-800 font-bold underline inline-flex items-center gap-0.5"
                    >
                      <span>manakonline.in</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <button 
                    onClick={() => navigate('/about')}
                    className="text-[11px] text-slate-500 hover:text-slate-800 underline shrink-0"
                  >
                    About this Project
                  </button>
                </div>

              </div>

              {/* RIGHT 5 COLS: NATIONAL STANDARDIZATION AT A GLANCE DASHBOARD */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-300 rounded-sm p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gov-800" />
                    <span className="font-bold text-xs text-gov-900 uppercase tracking-wider">
                      National Standardization Matrix
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-gov-100 text-gov-800 font-mono font-bold text-[10px] rounded-sm">
                    Live BIS Data
                  </span>
                </div>

                {/* 2x2 Key Government Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-left">
                  <div className="bg-white border border-slate-200 rounded-sm p-2.5 space-y-0.5">
                    <div className="text-base font-extrabold font-mono text-gov-900">21,000+</div>
                    <div className="text-[11px] font-medium text-slate-600 leading-tight">Indian Standards Active</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-sm p-2.5 space-y-0.5">
                    <div className="text-base font-extrabold font-mono text-amber-700">760+</div>
                    <div className="text-[11px] font-medium text-slate-600 leading-tight">Mandatory QCO Orders</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-sm p-2.5 space-y-0.5">
                    <div className="text-base font-extrabold font-mono text-gov-800">1,200+</div>
                    <div className="text-[11px] font-medium text-slate-600 leading-tight">NABL / BIS Testing Labs</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-sm p-2.5 space-y-0.5">
                    <div className="text-base font-extrabold font-mono text-gov-800">10,000+</div>
                    <div className="text-[11px] font-medium text-slate-600 leading-tight">Active Standards Clubs</div>
                  </div>
                </div>

                {/* Quick Gateways */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                    Statutory Action Gateways:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => navigate('/consumer')}
                      className="p-2.5 bg-white hover:bg-gov-50 border border-slate-200 hover:border-gov-400 rounded-sm text-left transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="font-bold text-xs text-gov-900 block group-hover:text-gov-800">
                          Verify HUID &amp; ISI
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Hallmark &amp; License Check
                        </span>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </button>

                    <button
                      onClick={() => navigate('/msme')}
                      className="p-2.5 bg-white hover:bg-gov-50 border border-slate-200 hover:border-gov-400 rounded-sm text-left transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <span className="font-bold text-xs text-gov-900 block group-hover:text-gov-800">
                          MSME 50% Relief
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Fee Concession Calculator
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gov-700 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 leading-snug border-t border-slate-200 pt-2 flex items-center justify-between">
                  <span>Operated under BIS Act, 2016 Mandate</span>
                  <span className="font-mono text-gov-800 font-semibold">NCH: 1915</span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 1.5 CEMENT CERTIFICATION SIH DEMONSTRATION SPOTLIGHT */}
        <section className="bg-slate-100/70 border-b border-slate-300 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-sm border-2 border-gov-800 shadow-sm p-5 sm:p-6 space-y-4">
              
              {/* Header Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>{t('SIH 2026 Evaluation Demo • Problem Statement 26107')}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gov-900 tracking-tight">
                    {t('Cement Certification Showcase: IS 1489 (PPC) & IS 12269 (OPC 53)')}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {t('Comprehensive regulatory roadmap for Portland Pozzolana Cement (PPC) and 53 Grade Ordinary Portland Cement (OPC) under the Cement (Quality Control) Order.')}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 shrink-0">
                  <span className="px-2 py-1 rounded-sm bg-slate-100 border border-slate-300 font-mono font-bold text-gov-900 text-[11px]">
                    {t('Mandatory QCO in Force')}
                  </span>
                </div>
              </div>

              {/* 3 Information Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Pillar 1: Mandatory Testing Benchmarks */}
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-gov-900 border-b border-slate-200 pb-1.5 text-xs">
                    <FlaskConical className="w-4 h-4 text-gov-800" />
                    <span>{t('Statutory Testing Benchmarks:')}</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-700">
                    <div className="flex justify-between py-0.5 border-b border-slate-100">
                      <span className="text-slate-500">{t('Compressive Strength (28-day):')}</span>
                      <span className="font-mono font-bold text-gov-900">≥ 33 MPa (PPC) / ≥ 53 MPa (OPC)</span>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-slate-100">
                      <span className="text-slate-500">{t('Soundness (Le-Chatelier):')}</span>
                      <span className="font-mono font-bold text-gov-900">≤ 10 mm</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span className="text-slate-500">{t('Initial Setting Time:')}</span>
                      <span className="font-mono font-bold text-gov-900">≥ 30 min (Final ≤ 600 min)</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 2: Packaging Regulations */}
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-gov-900 border-b border-slate-200 pb-1.5 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>{t('Packaging Regulations:')}</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-700">
                    <p className="leading-relaxed">
                      {t('PPC bags must feature RED lettering. OPC bags require BLACK lettering under BIS packaging rules.')}
                    </p>
                    <div className="flex items-center gap-2 pt-1 font-mono font-bold text-[10px]">
                      <span className="px-2 py-0.5 rounded-xs bg-red-100 text-red-800 border border-red-300">IS 1489 PPC: RED</span>
                      <span className="px-2 py-0.5 rounded-xs bg-slate-200 text-slate-900 border border-slate-400">IS 12269 OPC: BLACK</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 3: Apex Recognized Testing Labs */}
                <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-gov-900 border-b border-slate-200 pb-1.5 text-xs">
                    <Building2 className="w-4 h-4 text-gov-800" />
                    <span>{t('Recognized Cement Testing Facilities:')}</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-700">
                    <p className="font-semibold text-gov-900">
                      {t('National Council for Cement and Building Materials (NCCBM), Ballabgarh & Hyderabad.')}
                    </p>
                    <p className="text-slate-500">
                      {t('National Test House (NTH), Kolkata, Mumbai, Chennai.')}
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Toolbar */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => navigate('/consumer?cml=6200145')}
                    className="px-3.5 py-2 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                    title="Verify UltraTech Cement CML 6200145 in Consumer Verifier"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t('Verify UltraTech Cement (CM/L-6200145)')}</span>
                  </button>

                  <button
                    onClick={() => navigate('/msme?standard=IS 1489')}
                    className="px-3.5 py-2 rounded-sm bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                    title="Calculate MSME 50% Concession on Cement Unit"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>{t('Calculate Cement MSME Relief')}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenStandard) {
                        onOpenStandard({
                          isCode: 'IS 1489 (Part 1): 2015',
                          id: 'IS-1489',
                          title: 'Portland Pozzolana Cement (Fly Ash based) - Specification'
                        });
                      } else {
                        navigate('/standards/search?q=IS 1489');
                      }
                    }}
                    className="px-3.5 py-2 rounded-sm bg-white hover:bg-slate-100 text-gov-900 border border-slate-300 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-gov-800" />
                    <span>{t('View Full Standard & Roadmap')}</span>
                  </button>
                </div>

                <button
                  onClick={() => navigate('/manakbot?prompt=' + encodeURIComponent('What are the mandatory testing requirements and BIS certification procedure for Portland Pozzolana Cement (IS 1489) and 53 Grade OPC (IS 12269)?'))}
                  className="text-gov-800 hover:underline font-bold text-xs inline-flex items-center gap-1"
                >
                  <span>{t('Ask ManakBot')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 2. CORE BIS SERVICES (12 COMPACT GOVERNMENT TILES) */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-300 pb-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gov-900">
                BIS Services Directory
              </h2>
              <p className="text-xs text-slate-600">
                Statutory schemes and service divisions operated by the Bureau of Indian Standards
              </p>
            </div>

            <button
              onClick={() => navigate('/services')}
              className="text-xs font-bold text-gov-800 hover:text-gov-950 inline-flex items-center gap-1"
            >
              <span>View All Services</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {portalServices.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    if (service.isExternal) {
                      window.open(service.link, '_blank', 'noopener,noreferrer');
                    } else {
                      navigate(service.link);
                    }
                  }}
                  className="bg-white border border-slate-300 rounded-sm p-4 hover:border-gov-800 hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between group h-full"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-sm bg-slate-100 text-gov-800 flex items-center justify-center border border-slate-200">
                        <IconComp className="w-4 h-4 text-gov-800" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        {service.code}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-gov-900 group-hover:text-gov-700 transition-colors line-clamp-1">
                        {t(service.title)}
                      </h3>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {t(service.desc)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-gov-800">
                    <span>{service.isExternal ? t('Official Portal') : t('View Details')}</span>
                    {service.isExternal ? (
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. TWO-COLUMN SPLIT: STANDARDS DIRECTORY & MANAKBOT ASSISTANT */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT 2 COLS: INSTANT STANDARDS SEARCH PANEL */}
            <div className="lg:col-span-2 bg-white border border-slate-300 rounded-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gov-900">
                    Instant Standards Directory
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct access to indexed Indian Standards across major industrial sectors
                  </p>
                </div>

                <button
                  onClick={() => navigate('/standards/search')}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-sm border border-slate-300 transition-colors"
                >
                  Full Directory
                </button>
              </div>

              {/* Sector Quick Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Browse by Sector:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                  {SECTORS_LIST.filter(s => s !== 'All Sectors').slice(0, 6).map((sector, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/standards/search?sector=${encodeURIComponent(sector)}`)}
                      className="p-2 text-left bg-slate-50 hover:bg-gov-50 border border-slate-200 hover:border-gov-400 rounded-sm text-[11px] font-medium text-slate-800 transition-colors truncate"
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Standards Table */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">
                  Frequently Referenced Mandatory Standards:
                </span>
                <div className="border border-slate-200 rounded-sm overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 text-[11px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">IS Number</th>
                        <th className="py-2 px-3">Title</th>
                        <th className="py-2 px-3 hidden sm:table-cell">Status</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { code: "IS 2082:2018", id: "IS-2082", isCode: "IS 2082:2018", title: "Stationary Storage Electric Water Heaters", qco: true },
                        { code: "IS 4151:2020", id: "IS-4151", isCode: "IS 4151:2020", title: "Protective Helmets for Two-Wheeler Vehicles", qco: true },
                        { code: "IS 14543:2016", id: "IS-14543", isCode: "IS 14543:2016", title: "Packaged Drinking Water", qco: true },
                        { code: "IS 1786:2008", id: "IS-1786", isCode: "IS 1786:2008", title: "High Strength Deformed Steel Bars (Fe 500D)", qco: true }
                      ].map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2 px-3 font-mono font-bold text-gov-800 text-[11px] whitespace-nowrap">
                            {item.code}
                          </td>
                          <td className="py-2 px-3 text-slate-800 text-[11px] line-clamp-1">
                            {item.title}
                          </td>
                          <td className="py-2 px-3 hidden sm:table-cell">
                            <span className="px-1.5 py-0.5 rounded-sm bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold">
                              Mandatory QCO
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                if (onOpenStandard) {
                                  onOpenStandard(item);
                                } else {
                                  navigate(`/standards/${encodeURIComponent(item.id)}`);
                                }
                              }}
                              className="text-gov-800 font-bold hover:underline text-[11px]"
                            >
                              View Details &rarr;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT 1 COL: COMPACT MANAKBOT ASSISTANT PANEL */}
            <div className="bg-white border border-slate-300 rounded-sm p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <div className="w-7 h-7 rounded-sm bg-gov-800 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gov-900">
                      ManakBot AI Assistant
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Automated Standards &amp; QCO Guidance
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Ask compliance questions regarding Indian Standards, testing tolerances, factory audit requirements, or MSME fee concessions.
                </p>

                {/* Suggested Query Buttons */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                    Quick Consultation Topics:
                  </span>
                  {[
                    "What are the testing requirements for IS 2082 geysers?",
                    "How does 50% MSME fee concession work under Scheme-I?",
                    "Which standard applies to electric immersion heaters?",
                    "What documents are required for BIS factory audit?"
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/manakbot?prompt=${encodeURIComponent(q)}`)}
                      className="w-full text-left p-2 rounded-sm bg-slate-50 hover:bg-gov-50 hover:text-gov-900 border border-slate-200 text-[11px] text-slate-700 transition-colors leading-snug truncate"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={() => navigate('/manakbot')}
                  className="w-full py-2 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs rounded-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Full ManakBot Assistant</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* 4. NEWS & CIRCULARS (GOVERNMENT PORTAL LIST FORMAT) */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-3">
          <div className="flex items-center justify-between border-b border-slate-300 pb-2">
            <div>
              <h2 className="text-lg font-bold text-gov-900">
                Gazette Notifications &amp; Quality Control Orders
              </h2>
              <p className="text-xs text-slate-600">
                Recent statutory orders published in the Gazette of India
              </p>
            </div>

            <button
              onClick={() => navigate('/news')}
              className="text-xs font-bold text-gov-800 hover:text-gov-950 inline-flex items-center gap-1"
            >
              <span>All Circulars</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white border border-slate-300 rounded-sm divide-y divide-slate-200">
            {portalCirculars.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 sm:p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded-sm border border-slate-200 whitespace-nowrap">
                    {item.date}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 hover:text-gov-800 block cursor-pointer" onClick={() => navigate(item.link)}>
                      {item.title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Notifying Authority: <strong>{item.ministry}</strong> | Gazette Reference: {item.ref}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(item.link)}
                  className="text-gov-800 font-bold text-xs hover:underline inline-flex items-center gap-1 shrink-0 self-start sm:self-auto"
                >
                  <span>Read Order</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CITIZEN & MSME ASSISTANCE SHORTCUTS */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Consumer Protection */}
            <div className="bg-white border border-slate-300 rounded-sm p-5 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-sm bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900">
                  Consumer Verification &amp; Hallmarking
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Verify 6-digit Hallmark Unique Identification (HUID) on gold jewellery or 7-digit ISI Certification License (CM/L) numbers.
                </p>
                <button
                  onClick={() => navigate('/consumer')}
                  className="text-[11px] font-bold text-gov-800 hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Verify Mark Authenticity &rarr;</span>
                </button>
              </div>
            </div>

            {/* MSME Guidance */}
            <div className="bg-white border border-slate-300 rounded-sm p-5 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-sm bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 border border-blue-200">
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900">
                  MSME &amp; Startup Statutory Relief
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Micro enterprises and women-led startups receive 50% concession on BIS marking fees. Learn how to link your Udyam Certificate.
                </p>
                <button
                  onClick={() => navigate('/msme')}
                  className="text-[11px] font-bold text-gov-800 hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Calculate MSME Concessions &rarr;</span>
                </button>
              </div>
            </div>

          </div>
        </section>

      </div>
    </ErrorBoundary>
  );
}
