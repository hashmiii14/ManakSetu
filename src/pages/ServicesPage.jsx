import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, ExternalLink, Sparkles, CheckCircle2, 
  ArrowRight, FileText, Globe, Award, HelpCircle, Layers, 
  FlaskConical, Scale, Users, ChevronRight, Info
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ServicesPage() {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState('ALL');

  const serviceCategories = [
    {
      categoryKey: "CERTIFICATION",
      categoryTitle: "Certification & Conformity Assessment",
      description: "Product certification schemes governing domestic and foreign production under the Bureau of Indian Standards Act, 2016.",
      services: [
        {
          id: "scheme1",
          code: "Scheme-I",
          name: "Product Certification Scheme (ISI Mark)",
          statutoryAuthority: "Bureau of Indian Standards (Conformity Assessment) Regulations, 2018",
          mandate: "Grants license to use the Standard ISI Mark based on factory premises audit, calibrated in-house testing facility verification, and independent lab test reports.",
          scope: "Mandatory for 760+ products covered under Gazette Quality Control Orders (QCOs) including electrical appliances, steel rebars, cement, and packaged drinking water.",
          msmeRelief: "50% concession on application fee, annual license fee, and minimum marking fee for Micro enterprises and women startups; 20% for Small enterprises.",
          portalUrl: "https://www.manakonline.in/MANAK/eBISLogin"
        },
        {
          id: "scheme2",
          code: "Scheme-II",
          name: "Compulsory Registration Scheme (CRS)",
          statutoryAuthority: "Ministry of Electronics & IT (MeitY) / Ministry of New and Renewable Energy (MNRE)",
          mandate: "Self-Declaration of Conformity registration for notified electronic, IT, and solar photovoltaic products based on third-party test reports from BIS recognized labs.",
          scope: "Over 70 notified categories including laptops, mobile phones, power adapters, LED luminaires, and grid solar inverters.",
          msmeRelief: "Standard government fees; testing fee subsidies available under Ministry of MSME testing reimbursement scheme.",
          portalUrl: "https://www.crsbis.in/BIS/"
        },
        {
          id: "fmcs",
          code: "FMCS",
          name: "Foreign Manufacturers Certification Scheme",
          statutoryAuthority: "Section 13, Bureau of Indian Standards Act, 2016",
          mandate: "Enables overseas production facilities exporting goods to India to obtain an operative BIS license and affix the ISI mark prior to dispatch.",
          scope: "Ensures imported goods adhere to identical quality and safety benchmarks as domestic Indian manufacturing.",
          msmeRelief: "Restricted to domestic Indian registered manufacturing units.",
          portalUrl: "https://www.manakonline.in/MANAK/fmcs"
        },
        {
          id: "mscs",
          code: "MSCS",
          name: "Management Systems Certification Scheme",
          statutoryAuthority: "ISO/IEC 17021 Accreditation Standard",
          mandate: "Statutory third-party certification of organizational management systems for quality, environment, food safety, and occupational health.",
          scope: "ISO 9001 (Quality), ISO 14001 (Environment), ISO 22000 (Food Safety), ISO 45001 (OH&S), ISO 50001 (Energy).",
          msmeRelief: "Subsidized government audit tariffs compared to private foreign certification registries.",
          portalUrl: "https://www.manakonline.in/MANAK/mscs"
        }
      ]
    },
    {
      categoryKey: "STANDARDS",
      categoryTitle: "Standardization & Technical Specifications",
      description: "Establishment, harmonization, and maintenance of the national repository of Indian Standards (IS Codes).",
      services: [
        {
          id: "formulation",
          code: "FORMULATION",
          name: "Standard Formulation & Revision",
          statutoryAuthority: "Section 10, Bureau of Indian Standards Act, 2016",
          mandate: "Formulation of national standards through 15 Division Councils and 400+ Sectional Technical Committees representing industry, consumers, and government.",
          scope: "Covers over 21,000 active Indian Standards, periodically reviewed every 5 years for technological and international alignment.",
          msmeRelief: "Open public review and stakeholder comment mechanism available to all industry associations and MSME clusters.",
          portalUrl: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails/"
        },
        {
          id: "promotion",
          code: "PROMO",
          name: "Standards Promotion & Standards Clubs",
          statutoryAuthority: "Bureau of Indian Standards Educational Outreach Mandate",
          mandate: "Promotion of quality consciousness through Standards Clubs in schools, colleges, engineering institutions, and consumer organizations.",
          scope: "Over 10,000 Standards Clubs established across India providing youth exposure to scientific testing and quality control.",
          msmeRelief: "Grants and technical kits provided by BIS to academic and polytechnic institutions.",
          portalUrl: "https://www.bis.gov.in/"
        }
      ]
    },
    {
      categoryKey: "TESTING",
      categoryTitle: "Testing & Laboratory Services",
      description: "State-of-the-art laboratory network verifying product compliance against technical parameters.",
      services: [
        {
          id: "lrs",
          code: "LRS",
          name: "Laboratory Recognition Scheme",
          statutoryAuthority: "Bureau of Indian Standards (Conformity Assessment) Regulations",
          mandate: "Recognition and monitoring of independent external laboratories meeting ISO/IEC 17025 accreditation standards for testing official enforcement samples.",
          scope: "Directory of 120+ NABL accredited testing facilities across chemical, civil, electrical, food, and mechanical sectors.",
          msmeRelief: "MSMEs can select geographically proximate accredited laboratories to minimize transport and dispatch lead times.",
          portalUrl: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/lab/accreditedlabs"
        },
        {
          id: "central-labs",
          code: "CL",
          name: "BIS In-House Central & Regional Laboratories",
          statutoryAuthority: "Direct Apex Testing Facilities of the Bureau",
          mandate: "Operates apex facilities including Central Laboratory (Sahibabad), Western (Mumbai), Eastern (Kolkata), Southern (Chennai), and Northern (Mohali).",
          scope: "Reference testing, inter-laboratory proficiency testing, dispute arbitration, and research development.",
          msmeRelief: "Statutory calibration and verification support for factory in-house equipment.",
          portalUrl: "https://www.bis.gov.in/"
        }
      ]
    },
    {
      categoryKey: "CONSUMER",
      categoryTitle: "Consumer Affairs & Hallmarking",
      description: "Consumer protection mechanisms, precious metal purity verification, and grievance redressal.",
      services: [
        {
          id: "hallmarking-scheme",
          code: "Scheme-IV",
          name: "Hallmarking of Gold & Silver Jewellery",
          statutoryAuthority: "Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020",
          mandate: "Mandatory hallmarking of gold articles with 3 canonical marks: BIS triangular mark, purity in Karat/fineness (e.g. 22K916), and 6-digit laser-etched HUID.",
          scope: "Mandatory across 340+ notified districts in India for 14K, 18K, 20K, 22K, 23K, and 24K gold articles.",
          msmeRelief: "Free online lifetime registration for jewellers. Subsidized testing fee of ₹45 per gold article at recognized AHCs.",
          portalUrl: "https://www.manakonline.in/MANAK/hallmarkingNew"
        },
        {
          id: "grievances",
          code: "JAN SUNVAI",
          name: "Grievance Redressal & Surveillance (BIS CARE)",
          statutoryAuthority: "Consumer Protection Act, 2019 & BIS Act, 2016",
          mandate: "Public platform to file complaints regarding substandard goods, fake ISI marks, hallmarking discrepancies, and unlicensed manufacturers.",
          scope: "Empowers consumers to verify license status and report statutory violations directly to BIS Branch Officers and NCH 1915.",
          msmeRelief: "Protects compliant MSME manufacturers against unfair competition from counterfeit and substandard imports.",
          portalUrl: "https://play.google.com/store/apps/details?id=com.bis.biscare"
        }
      ]
    },
    {
      categoryKey: "TRAINING",
      categoryTitle: "Training & Capacity Building",
      description: "Human resource development, professional certification, and technical training in standardization.",
      services: [
        {
          id: "nits-institute",
          code: "NITS",
          name: "National Institute of Training for Standardization",
          statutoryAuthority: "BIS Capacity Building Mandate",
          mandate: "Training institute at Noida, UP, conducting residential and virtual workshops on quality auditing, laboratory test methods, and statistical quality control.",
          scope: "Trains over 4,000 industry professionals, laboratory analysts, and foreign delegates annually.",
          msmeRelief: "Special subsidized fee packages for MSME executives and academic polytechnic faculty.",
          portalUrl: "https://www.manakonline.in/MANAK/nits"
        }
      ]
    }
  ];

  const filteredCategories = serviceCategories.filter(cat => {
    if (activeCategory === 'ALL') return true;
    return cat.categoryKey === activeCategory;
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* HEADER SECTION */}
        <section className="bg-white border-b border-slate-300 py-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-gov-800 font-semibold">BIS Services Directory</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  BIS Services &amp; Conformity Assessment Directory
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Government-directory architectural guide to statutory conformity schemes, standardization divisions, laboratory networks, and citizen services operated by the Bureau of Indian Standards.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://www.manakonline.in/MANAK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs rounded-sm inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>Official Manak Online</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY SELECTOR TABS */}
        <div className="bg-slate-100 border-b border-slate-300 px-4 sm:px-6 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center gap-1 overflow-x-auto py-2 text-xs">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-3 py-1.5 rounded-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === 'ALL'
                  ? 'bg-gov-800 text-white'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {serviceCategories.map((cat) => (
              <button
                key={cat.categoryKey}
                onClick={() => setActiveCategory(cat.categoryKey)}
                className={`px-3 py-1.5 rounded-sm font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.categoryKey
                    ? 'bg-gov-800 text-white'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.categoryTitle.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN DIRECTORY CONTENT */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          {filteredCategories.map((catGroup) => (
            <div key={catGroup.categoryKey} className="space-y-3">
              
              {/* Category Header */}
              <div className="border-b-2 border-gov-800 pb-1.5">
                <h2 className="text-base sm:text-lg font-bold text-gov-900 uppercase tracking-wide">
                  {catGroup.categoryTitle}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {catGroup.description}
                </p>
              </div>

              {/* Service Rows */}
              <div className="space-y-3">
                {catGroup.services.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-300 rounded-sm p-4 sm:p-5 hover:border-gov-800 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-gov-100 text-gov-900 font-mono font-bold text-[11px] rounded-sm">
                          {item.code}
                        </span>
                        <h3 className="text-sm font-bold text-gov-900">
                          {item.name}
                        </h3>
                      </div>

                      <span className="text-[11px] text-slate-500 font-mono">
                        {item.statutoryAuthority}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block">Mandate &amp; Method:</span>
                        <p className="text-slate-600 leading-relaxed">{item.mandate}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block">Product Scope &amp; Applicability:</span>
                        <p className="text-slate-600 leading-relaxed">{item.scope}</p>
                      </div>
                    </div>

                    {/* MSME Concession Note */}
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-sm text-xs text-slate-700 flex items-start gap-2">
                      <span className="font-bold text-gov-800 shrink-0">MSME Relief:</span>
                      <p className="text-slate-600">{item.msmeRelief}</p>
                    </div>

                    {/* Action Links */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <button
                        onClick={() => navigate(`/manakbot?prompt=${encodeURIComponent(`Explain application requirements and fees for ${item.name}`)}`)}
                        className="text-gov-800 hover:text-gov-950 font-bold inline-flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Ask ManakBot about {item.code}</span>
                      </button>

                      <a
                        href={item.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-sm border border-slate-300 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>Official Portal Access</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </ErrorBoundary>
  );
}
