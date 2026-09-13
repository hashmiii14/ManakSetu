import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, ExternalLink, Sparkles, CheckCircle2, 
  ArrowRight, FileText, Globe, Award, HelpCircle, Layers, Check,
  AlertTriangle, Users, ChevronRight, PhoneCall, Info
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ServicesPage() {
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('scheme1');

  const services = [
    {
      id: 'scheme1',
      title: 'Scheme-I: Product Certification (ISI Mark)',
      shortCode: 'Scheme-I',
      subtitle: 'Mandatory & Voluntary Certification for Domestic Manufacturers',
      statutoryRef: 'Bureau of Indian Standards (Conformity Assessment) Regulations, 2018 (Scheme-I)',
      overview: 'The Product Certification Scheme of BIS is one of the largest in the world, with over 41,000 active licenses. It grants licenses to use the prestigious standard ISI Mark upon verification of manufacturing infrastructure, production process, quality control capabilities, and in-house testing facilities.',
      eligibility: [
        'Manufacturers with physical factory premises in India',
        'Capability to produce goods conforming to relevant Indian Standard (IS Code)',
        'Fully equipped in-house testing laboratory with calibrated apparatus',
        'Competent technical quality control personnel'
      ],
      steps: [
        'Step 1: Submission of online Form-I application along with required factory layout & machinery documents on Manak Online',
        'Step 2: Preliminary scrutiny of technical documents by BIS Bureau officers within 15 working days',
        'Step 3: On-site factory audit by BIS inspection officer and extraction of official verification test samples',
        'Step 4: Independent laboratory testing of samples in BIS or NABL recognized testing facilities',
        'Step 5: Grant of Certification Marks License (CM/L) and authorization to affix ISI Monogram'
      ],
      msmeRelief: '50% concession on application fee, annual license fee, and base minimum marking fee for Micro enterprises and women/SC/ST owned startups; 20% concession for Small enterprises.',
      portalUrl: 'https://www.manakonline.in/MANAK/eBISLogin'
    },
    {
      id: 'scheme2',
      title: 'Scheme-II: Compulsory Registration Scheme (CRS)',
      shortCode: 'Scheme-II (CRS)',
      subtitle: 'Self-Declaration of Conformity for Electronic & IT Goods',
      statutoryRef: 'Ministry of Electronics & Information Technology (MeitY) & BIS CRO Orders',
      overview: 'Under Scheme-II, manufacturers of notified electronic and IT goods (laptops, mobile phones, power adapters, LED luminaires, solar inverters) obtain registration based on Self-Declaration of Conformity and submission of test reports from BIS recognized labs.',
      eligibility: [
        'Manufacturers of electronic and IT products covered under the Electronics & IT Goods (Requirements for Compulsory Registration) Order',
        'Both domestic and overseas manufacturers are eligible (overseas manufacturers must nominate an Authorized Indian Representative - AIR)',
        'Product tested in BIS recognized labs in India prior to filing'
      ],
      steps: [
        'Step 1: Sample testing in a BIS recognized laboratory in India as per applicable IS standard',
        'Step 2: Receipt of test report (valid for 90 days from issuance)',
        'Step 3: Online application on CRS portal (crsbis.in) with test reports & Authorized Indian Representative undertaking',
        'Step 4: Document verification by BIS registration division',
        'Step 5: Grant of R-Number (Registration Number) and authorization to display CRS standard mark'
      ],
      msmeRelief: 'Statutory government fee is uniform; testing fee concessions available under Ministry of MSME testing subsidy reimbursement scheme.',
      portalUrl: 'https://www.crsbis.in/BIS/'
    },
    {
      id: 'scheme4',
      title: 'Scheme-IV: Hallmarking of Gold & Silver Jewellery',
      shortCode: 'Scheme-IV (HUID)',
      subtitle: 'Consumer Protection & Purity Certification for Precious Metals',
      statutoryRef: 'Hallmarking of Gold Jewellery and Gold Artefacts Order, 2020 (as amended)',
      overview: 'Mandatory hallmarking guarantees purity and fineness of gold jewellery in India. Each hallmarked item carries the BIS Triangle logo, purity in Karat/fineness (e.g., 22K916), and a 6-digit laser-etched alphanumeric Hallmark Unique Identification (HUID) code tracked in the national central server.',
      eligibility: [
        'All jewellers selling gold jewellery in notified hallmarking districts across India',
        'Jewellers with annual turnover below ₹40 Lakhs are exempted from mandatory registration, though consumers can request hallmarking'
      ],
      steps: [
        'Step 1: Online jeweller registration on Manak Online portal (zero government fee for registration)',
        'Step 2: Submission of jewellery batches to BIS-recognized Assaying and Hallmarking Centres (AHC)',
        'Step 3: Fire assay purity testing and laser engraving of 6-digit HUID onto each article',
        'Step 4: Uploading HUID serial numbers to central national database for citizen verification in BIS CARE app'
      ],
      msmeRelief: 'Registration is free for life for all jewellers. Hallmarking fee is fixed at ₹45 per gold article.',
      portalUrl: 'https://www.manakonline.in/MANAK/hallmarkingNew'
    },
    {
      id: 'fmcs',
      title: 'Foreign Manufacturers Certification Scheme (FMCS)',
      shortCode: 'FMCS',
      subtitle: 'ISI Mark Certification for Overseas Manufacturing Facilities',
      statutoryRef: 'Section 13, Bureau of Indian Standards Act, 2016',
      overview: 'FMCS enables foreign manufacturing facilities located outside India to obtain a BIS license and affix the ISI mark on goods exported to India. Certification ensures that imported goods meet the exact same statutory safety and quality standards as domestic production.',
      eligibility: [
        'Foreign manufacturers having their own manufacturing plant outside India',
        'Appointment of an Authorized Indian Representative (AIR) based in India',
        'Conformity to relevant Indian Standard and acceptance of factory inspection'
      ],
      steps: [
        'Step 1: Submission of Form-I application along with preliminary document fee and AIR agreement',
        'Step 2: Technical review and scheduling of factory inspection by BIS auditor team',
        'Step 3: Physical factory audit abroad, testing witness, and drawing of counter-samples',
        'Step 4: Sample testing in Indian BIS laboratory',
        'Step 5: Submission of Performance Bank Guarantee (PBG) and grant of CM/L license'
      ],
      msmeRelief: 'Standard foreign inspection travel and per-diem fees apply. MSME concessions are restricted to domestic Indian registered entities.',
      portalUrl: 'https://www.manakonline.in/MANAK/fmcs'
    },
    {
      id: 'nits',
      title: 'National Institute of Training for Standardization (NITS)',
      shortCode: 'NITS',
      subtitle: 'Capacity Building, Training & Certification for Industry Personnel',
      statutoryRef: 'Bureau of Indian Standards Training Mandate',
      overview: 'NITS is the training arm of BIS established to impart training in the fields of standardization, quality control, laboratory testing, statistical quality control, and management system auditing.',
      eligibility: [
        'Quality managers, test engineers, laboratory technicians, and industry executives',
        'Government procurement officers and academic institutions'
      ],
      steps: [
        'Step 1: Selection of specialized course from annual training calendar',
        'Step 2: Online registration through Manak Online NITS portal',
        'Step 3: Completion of theoretical instruction and practical laboratory hands-on training',
        'Step 4: Examination and award of Certificate of Competence'
      ],
      msmeRelief: 'Special subsidized fee packages for MSME personnel and academic researchers.',
      portalUrl: 'https://www.manakonline.in/MANAK/nits'
    },
    {
      id: 'mscs',
      title: 'Management Systems Certification Scheme (MSCS)',
      shortCode: 'MSCS',
      subtitle: 'Auditing & Certification for International Management Standards',
      statutoryRef: 'ISO/IEC 17021 Accreditation Framework',
      overview: 'BIS provides statutory third-party audit and certification for organizations implementing management systems like ISO 9001 (Quality), ISO 14001 (Environment), ISO 45001 (Occupational Health & Safety), and ISO 22000 (Food Safety).',
      eligibility: [
        'Any industrial, commercial, healthcare, or government enterprise operating an active management system for at least 3 months'
      ],
      steps: [
        'Step 1: Application submission with quality manual and internal audit records',
        'Step 2: Stage-1 readiness review audit',
        'Step 3: Stage-2 full compliance audit of organization processes',
        'Step 4: Corrective action verification and grant of Management System Certificate'
      ],
      msmeRelief: 'Competitive statutory audit tariffs compared to private foreign certification bodies.',
      portalUrl: 'https://www.manakonline.in/MANAK/mscs'
    }
  ];

  const current = services.find(s => s.id === activeTab) || services[0];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* HEADER SECTION */}
        <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-gov-900 font-bold">Services &amp; Schemes Directory</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  BIS Services &amp; Conformity Schemes
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Comprehensive architectural guide to the Bureau of Indian Standards certification schemes, compliance pathways, statutory regulations, and official portal destinations.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://www.manakonline.in/MANAK/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-gov-sm transition-colors"
                >
                  <span>Official Manak Online Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-saffron-400" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TABS NAVIGATION & CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* LEFT SIDEBAR: SCHEME TABS */}
            <div className="lg:col-span-1 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
                Conformity Schemes:
              </span>
              {services.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                    activeTab === item.id
                      ? 'bg-gov-800 text-white border-gov-800 shadow-gov font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <span className={`text-[10px] font-mono block ${activeTab === item.id ? 'text-saffron-400' : 'text-slate-400'}`}>
                    {item.shortCode}
                  </span>
                  <span className="line-clamp-1">{item.title.split(':')[1] || item.title}</span>
                </button>
              ))}

              {/* Quick AI consultation card */}
              <div className="pt-4">
                <div className="p-4 rounded-xl bg-gov-900 text-white shadow-gov space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-saffron-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Unsure Which Scheme?</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    ManakBot AI can analyze your product description and identify the exact statutory scheme applicable to your facility.
                  </p>
                  <button
                    onClick={() => navigate('/manakbot')}
                    className="w-full py-1.5 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    Ask ManakBot
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN PANEL: ACTIVE SCHEME DETAILS */}
            <div className="lg:col-span-3 space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 shadow-gov p-6 sm:p-8 space-y-6">
                
                {/* Title & Statutory Reference */}
                <div className="space-y-2 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-gov-100 text-gov-800 font-mono font-bold text-xs">
                      {current.shortCode}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      Official Conformity Assessment Scheme
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-gov-900 tracking-tight">
                    {current.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {current.subtitle}
                  </p>
                  <div className="text-[11px] text-slate-500 font-mono pt-1">
                    Statutory Authority: <strong>{current.statutoryRef}</strong>
                  </div>
                </div>

                {/* Overview */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-gov-900 uppercase tracking-wide">
                    Scheme Overview
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {current.overview}
                  </p>
                </div>

                {/* Eligibility Criteria */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gov-900 uppercase tracking-wide">
                    Applicant Eligibility Criteria
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.eligibility.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Procedure */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gov-900 uppercase tracking-wide">
                    Step-by-Step Licensing Procedure
                  </h3>
                  <div className="space-y-2">
                    {current.steps.map((step, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/80 transition-colors flex items-start gap-3 text-xs text-slate-800">
                        <span className="w-5 h-5 rounded-full bg-gov-100 text-gov-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MSME Relief & Concession Banner */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Statutory MSME Fee Concession &amp; Relief:</span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {current.msmeRelief}
                  </p>
                </div>

                {/* Action CTA Bar */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => navigate(`/manakbot?prompt=${encodeURIComponent(`Explain the application requirements and step-by-step procedure for ${current.title}.`)}`)}
                    className="px-4 py-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-lg inline-flex items-center gap-2 shadow-gov-sm transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Consult ManakBot on this Scheme</span>
                  </button>

                  <a
                    href={current.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs rounded-lg inline-flex items-center gap-2 shadow-gov-sm transition-colors"
                  >
                    <span>Proceed to Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </ErrorBoundary>
  );
}
