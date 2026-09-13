import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, FlaskConical, Building2, 
  Calculator, ExternalLink, FileText, Globe, Sparkles, Printer, Share2, 
  MapPin, Check, HelpCircle, ChevronRight, Info
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { getStandardById, getPopularSearches } from '../services/standardsService';
import ErrorBoundary from '../components/ErrorBoundary';

export default function StandardDetailPage({ standardId }) {
  const { path, navigate } = useRouter();
  const [enterpriseType, setEnterpriseType] = useState('micro');
  const [copied, setCopied] = useState(false);

  // Extract ID from path if not explicitly passed as prop
  // e.g. path = "/standards/IS-2082" or "/standards/is-2082"
  const resolvedId = useMemo(() => {
    if (standardId) return standardId;
    const parts = path.split('/').filter(Boolean);
    if (parts[0] === 'standards' && parts[1] && parts[1] !== 'search') {
      return decodeURIComponent(parts[1]);
    }
    return null;
  }, [path, standardId]);

  const standard = useMemo(() => {
    return getStandardById(resolvedId);
  }, [resolvedId]);

  const popularChips = useMemo(() => getPopularSearches(), []);

  // MSME Fee Calculation
  const feeCalculation = useMemo(() => {
    if (!standard) return null;
    const feeObj = standard.feeStructure || {};
    const baseMarking = Number(feeObj.baseMarkingFee || 65000);
    
    let concession = 0;
    if (enterpriseType === 'micro' || enterpriseType === 'women') {
      concession = Number(feeObj.microConcessionPercent || 50);
    } else if (enterpriseType === 'small') {
      concession = Number(feeObj.smallConcessionPercent || 20);
    } else {
      concession = 0;
    }

    const effectiveMarking = Math.round(baseMarking * (1 - concession / 100));
    const appFee = Number(feeObj.applicationFee || 1000);
    const inspFee = Number(feeObj.auditFeePerManDay || 7000) * 2; // Typically 2 man-days for initial audit
    const annualLicenseFee = Number(feeObj.annualLicenseFee || 1000);
    const total = appFee + inspFee + effectiveMarking + annualLicenseFee;
    const savings = Math.max(0, baseMarking - effectiveMarking);

    return {
      baseMarking,
      concessionPercent: concession,
      effectiveMarking,
      applicationFee: appFee,
      inspectionFee: inspFee,
      annualLicenseFee,
      totalEstimatedCost: total,
      totalSavings: savings
    };
  }, [standard, enterpriseType]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // NOT FOUND STATE
  if (!standard) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 p-8 shadow-gov space-y-6 text-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gov-900">
              Standard Record Not Found
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              We could not find an Indian Standard matching identifier <code className="font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-gov-800">{resolvedId || 'Unknown'}</code> in our indexed compendium.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/standards/search')}
              className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white font-bold text-xs rounded-lg shadow-gov-sm transition-colors"
            >
              Search Standards Directory
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Popular searches suggestions */}
          <div className="pt-6 border-t border-slate-100 text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Standards You May Inspect:
            </span>
            <div className="flex flex-wrap gap-2">
              {popularChips.slice(0, 6).map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/standards/search?q=${encodeURIComponent(chip.term)}`)}
                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-gov-50 text-slate-700 hover:text-gov-800 border border-slate-200 text-xs transition-colors"
                >
                  {chip.term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    isCode,
    title,
    category,
    sector,
    scheme,
    mandatoryQCO,
    qcoNotification,
    gazetteNotification,
    description,
    keyTests,
    labsAvailable,
    documentationRequired,
    globalHarmonization,
    citizenCard,
    source
  } = standard;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* BREADCRUMB & UTILITY BAR */}
        <section className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto">
              <button onClick={() => navigate('/')} className="hover:text-gov-800 whitespace-nowrap">Home</button>
              <span>/</span>
              <button onClick={() => navigate('/standards/search')} className="hover:text-gov-800 whitespace-nowrap">Standards Directory</button>
              <span>/</span>
              <span className="text-gov-900 font-bold font-mono">{isCode}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                title="Share link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors hidden sm:inline-flex"
                title="Print standard summary"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Spec</span>
              </button>

              <button
                onClick={() => navigate('/standards/search')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Search All</span>
              </button>
            </div>
          </div>
        </section>

        {/* MAIN HERO HEADER */}
        <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-gov-900 text-white font-mono font-bold text-sm tracking-wide shadow-gov-sm">
                {isCode}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200">
                {category}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-xs border border-slate-200">
                {sector}
              </span>
              <span className="px-2.5 py-1 rounded bg-gov-50 text-gov-800 font-semibold text-xs border border-gov-200">
                {scheme}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gov-900 tracking-tight leading-tight">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-4xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* MANDATORY QCO BANNER (IF APPLICABLE) */}
            {mandatoryQCO ? (
              <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-xl space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span className="font-bold text-sm text-amber-900">
                    Mandatory Quality Control Order (QCO) in Force
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 ml-auto uppercase tracking-wide">
                    Statutory
                  </span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Manufacture, import, stocking, sale, or distribution without valid BIS Standard Mark (ISI Monogram) is an offence under Section 16 &amp; 17 of the Bureau of Indian Standards Act, 2016.
                </p>
                {gazetteNotification && (
                  <div className="text-[11px] text-amber-900/80 font-mono bg-amber-100/70 p-1.5 rounded inline-block">
                    Gazette Notification: <strong>{gazetteNotification}</strong>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-100 border-l-4 border-slate-400 p-3 rounded-r-lg flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Voluntary Standard: Manufacturers can voluntarily adopt this standard to establish quality credibility and participate in public procurement tenders.</span>
                </div>
              </div>
            )}

            {/* PRIMARY ACTION BUTTONS */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate(`/manakbot?std=${encodeURIComponent(isCode)}`)}
                className="px-4 py-2.5 rounded-lg bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-gov-sm transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask ManakBot About {isCode}</span>
              </button>

              <a
                href="https://www.manakonline.in/MANAK/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs inline-flex items-center gap-2 shadow-gov-sm transition-colors"
              >
                <span>Apply on Manak Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Official BIS Compendium</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

          </div>
        </section>

        {/* MAIN BODY: 2-COLUMN GRID (LEFT TECHNICAL SPECS, RIGHT FEE & LAB CALCULATOR) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: 2 COLS WIDE (TECHNICAL TESTS, FACTORY REQUIREMENTS, HARMONIZATION) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 1. MANDATORY LABORATORY TESTING PARAMETERS */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-gov p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-gov-100 text-gov-800 flex items-center justify-center">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gov-900">
                      Mandatory Quality &amp; Safety Testing Parameters
                    </h2>
                    <p className="text-xs text-slate-500">
                      Essential physical, electrical, and chemical performance tests required for compliance.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keyTests.map((test, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 flex items-start gap-3 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          {test}
                        </p>
                        <span className="text-[10px] text-slate-500 block">
                          Pass / Fail benchmark verified by NABL testing protocol.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. FACTORY INFRASTRUCTURE & DOCUMENTATION CHECKLIST */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-gov p-6 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-gov-100 text-gov-800 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gov-900">
                      Factory Audit &amp; Documentation Checklist
                    </h2>
                    <p className="text-xs text-slate-500">
                      Statutory prerequisites required prior to scheduling the BIS Bureau Officer factory inspection.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {documentationRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-150">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">{doc}</span>
                        <span className="text-[11px] text-slate-500">To be uploaded to Manak Online e-BIS portal during Form-I filing.</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. GLOBAL HARMONIZATION (ISO / IEC / WTO TBT) */}
              {globalHarmonization && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-gov p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-gov-900">
                        International Harmonization &amp; Export Equivalence
                      </h2>
                      <p className="text-xs text-slate-500">
                        Cross-walk with ISO, IEC, and WTO Technical Barriers to Trade (TBT) agreements.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50/50 border border-blue-150 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-blue-900/70 uppercase tracking-wider font-bold block">
                          International Equivalent Standard:
                        </span>
                        <span className="font-mono font-bold text-sm text-blue-950">
                          {globalHarmonization.standard}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 font-medium text-[11px]">
                        {globalHarmonization.org}
                      </span>
                    </div>

                    <p className="text-xs text-blue-900/80 leading-relaxed">
                      {globalHarmonization.note}
                    </p>

                    {Array.isArray(globalHarmonization.compatibleMarkets) && (
                      <div className="pt-2 border-t border-blue-200/60">
                        <span className="text-[11px] font-bold text-blue-900 block mb-1.5">
                          Target Export Compatibility:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {globalHarmonization.compatibleMarkets.map((mkt, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-white text-blue-900 border border-blue-200 text-[11px] font-medium">
                              {mkt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. CITIZEN MARK VERIFICATION GUIDE */}
              {citizenCard && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-gov p-6 space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-gov-900">
                        Consumer Quality &amp; Authenticity Mark Guide
                      </h2>
                      <p className="text-xs text-slate-500">
                        How buyers and citizens can verify authentic certification on this product.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">Required Label Mark:</span>
                      <p className="text-slate-600">{citizenCard.mandatoryMark}</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">Placement Rule:</span>
                      <p className="text-slate-600">{citizenCard.labelInstruction}</p>
                    </div>

                    <div className="md:col-span-2 p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-900 block">Non-compliance Risk:</span>
                      <p className="text-amber-800">{citizenCard.safetyRisk}</p>
                      <p className="text-[11px] text-amber-900 font-semibold pt-1">
                        Tip: {citizenCard.actionTip}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: 1 COL WIDE (FEE CALCULATOR + NABL LAB DIRECTORY) */}
            <div className="space-y-6">
              
              {/* MSME STATUTORY FEE CALCULATOR */}
              {feeCalculation && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-gov p-5 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Calculator className="w-4 h-4 text-gov-800" />
                    <h3 className="text-sm font-bold text-gov-900">
                      Statutory Fee &amp; MSME Concession
                    </h3>
                  </div>

                  {/* Enterprise Type Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                      Select Enterprise Category:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'micro', label: 'Micro (50%)' },
                        { id: 'small', label: 'Small (20%)' },
                        { id: 'large', label: 'Large (0%)' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setEnterpriseType(cat.id)}
                          className={`py-1.5 text-xs font-semibold rounded border transition-colors ${
                            enterpriseType === cat.id
                              ? 'bg-gov-800 text-white border-gov-800 shadow-gov-sm'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fee Breakdown Table */}
                  <div className="space-y-2 text-xs pt-1">
                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>Application Fee:</span>
                      <span className="font-mono font-medium">₹{feeCalculation.applicationFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>Factory Audit (2 Days):</span>
                      <span className="font-mono font-medium">₹{feeCalculation.inspectionFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                      <span>Annual License Fee:</span>
                      <span className="font-mono font-medium">₹{feeCalculation.annualLicenseFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <div className="space-y-0.5">
                        <span className="text-slate-700 font-semibold block">Marking Fee:</span>
                        {feeCalculation.concessionPercent > 0 && (
                          <span className="text-[10px] text-emerald-700 font-bold block">
                            {feeCalculation.concessionPercent}% MSME Concession applied
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-900 block">
                          ₹{feeCalculation.effectiveMarking.toLocaleString('en-IN')}
                        </span>
                        {feeCalculation.totalSavings > 0 && (
                          <span className="text-[10px] text-slate-400 line-through block font-mono">
                            ₹{feeCalculation.baseMarking.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-2 flex justify-between items-center text-sm font-bold text-gov-900 border-t-2 border-slate-200">
                      <span>Estimated Initial Cost:</span>
                      <span className="font-mono text-base text-gov-800">
                        ₹{feeCalculation.totalEstimatedCost.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {feeCalculation.totalSavings > 0 && (
                      <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold text-center">
                        Total MSME Saving: ₹{feeCalculation.totalSavings.toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-400 leading-tight">
                    *Statutory estimates based on BIS Compendium of Fees &amp; DPIIT MSME notification. Lab testing charges payable directly to NABL testing lab.
                  </p>
                </div>
              )}

              {/* NABL ACCREDITED TESTING LABORATORIES */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-gov p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gov-800" />
                    <h3 className="text-sm font-bold text-gov-900">
                      Recognized Testing Labs
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {labsAvailable.length} Labs Listed
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {labsAvailable.map((lab, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition-colors space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 text-xs">
                          {lab.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold shrink-0">
                          NABL / BIS
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{lab.city}, {lab.state}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/lab/accreditedlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg inline-flex items-center justify-center gap-1 transition-colors"
                >
                  <span>BIS Laboratory Directory</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* MANAKBOT ADVISORY CARD */}
              <div className="bg-gov-900 text-white rounded-xl p-5 shadow-gov space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-saffron-400" />
                  <h3 className="text-sm font-bold text-white">
                    Need Guidance on {isCode}?
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ask ManakBot AI about clause requirements, test procedures, sampling size, or filing procedures on Manak Online.
                </p>
                <button
                  onClick={() => navigate(`/manakbot?std=${encodeURIComponent(isCode)}`)}
                  className="w-full py-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-lg shadow-gov-sm transition-colors"
                >
                  Start Consultation on {isCode}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </ErrorBoundary>
  );
}
