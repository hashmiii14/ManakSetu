import React, { useState } from 'react';
import { 
  ShieldCheck, Award, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, Check, Copy, AlertCircle, Flag, Loader2, 
  QrCode, ExternalLink, PhoneCall, Send, FileWarning, CheckCheck, X
} from 'lucide-react';
import { verifyIdentifier } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';

export default function ConsumerVerifier({ onOpenReport }) {
  const { t } = useLanguage();
  const { searchParams } = useRouter();
  const [activeTab, setActiveTab] = useState('gold'); // 'gold' | 'isi'
  
  // HUID State
  const [huidCode, setHuidCode] = useState('AK79B2');
  const [huidResult, setHuidResult] = useState(null);
  const [huidLoading, setHuidLoading] = useState(false);

  // ISI Mark CML State
  const [cmlCode, setCmlCode] = useState('6200145');
  const [cmlResult, setCmlResult] = useState(null);
  const [cmlLoading, setCmlLoading] = useState(false);

  // NCH Escalation Modal State
  const [nchModal, setNchModal] = useState({
    isOpen: false,
    itemCode: '',
    itemType: '',
    firmName: '',
    reason: '',
    docketNumber: '',
    submitted: false
  });

  const handleCheckHUID = async (targetCode = null) => {
    const codeToTest = (targetCode || huidCode).trim().toUpperCase();
    if (!codeToTest) return;
    if (targetCode) setHuidCode(targetCode);

    setHuidLoading(true);
    try {
      const res = await verifyIdentifier(codeToTest, 'huid');
      setHuidResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setHuidLoading(false);
    }
  };

  const handleCheckCML = async (targetCode = null) => {
    const codeToTest = (targetCode || cmlCode).trim().toUpperCase();
    if (!codeToTest) return;
    if (targetCode) setCmlCode(codeToTest);

    setCmlLoading(true);
    try {
      const res = await verifyIdentifier(codeToTest, 'cml');
      setCmlResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCmlLoading(false);
    }
  };

  // Auto-run verification if URL parameters provided (e.g. /consumer?cml=6200145)
  React.useEffect(() => {
    const cmlParam = searchParams.get('cml');
    const huidParam = searchParams.get('huid');
    const tabParam = searchParams.get('tab');

    if (cmlParam) {
      setActiveTab('isi');
      setCmlCode(cmlParam);
      handleCheckCML(cmlParam);
    } else if (huidParam) {
      setActiveTab('gold');
      setHuidCode(huidParam);
      handleCheckHUID(huidParam);
    } else if (tabParam === 'isi') {
      setActiveTab('isi');
    }
  }, [searchParams]);

  const handleOpenNCH = (code, type, firm, reason) => {
    const docket = `NCH-2026-BIS-${Math.floor(10000 + Math.random() * 90000)}`;
    setNchModal({
      isOpen: true,
      itemCode: code,
      itemType: type,
      firmName: firm || 'Unverified Vendor',
      reason: reason || 'Suspected Counterfeit Hallmark / Expired ISI Mark',
      docketNumber: docket,
      submitted: false
    });
  };

  const handleSubmitNCH = (e) => {
    e.preventDefault();
    setNchModal(prev => ({ ...prev, submitted: true }));
  };

  return (
    <div className="space-y-6 text-left">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('gold')}
          className={`px-4 py-2 rounded-sm text-xs font-bold transition-all border flex items-center gap-2 ${
            activeTab === 'gold'
              ? 'bg-gov-800 text-white border-gov-800 shadow-2xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Verify Gold 6-Digit HUID</span>
        </button>
        <button
          onClick={() => setActiveTab('isi')}
          className={`px-4 py-2 rounded-sm text-xs font-bold transition-all border flex items-center gap-2 ${
            activeTab === 'isi'
              ? 'bg-gov-800 text-white border-gov-800 shadow-2xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verify 7-Digit ISI CML License</span>
        </button>
      </div>

      {/* TAB 1: GOLD HUID CHECKER */}
      {activeTab === 'gold' && (
        <div className="bg-slate-50 p-5 sm:p-6 rounded-sm border border-slate-300 shadow-2xs space-y-5 animate-in fade-in">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gov-900">
                Hallmark Unique Identification (HUID) Verifier
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Laser-inscribed 6-character alphanumeric code engraved by BIS Assaying and Hallmarking Centres (AHC).
              </p>
            </div>

            {/* Sample test chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-600 text-[11px]">Sample Codes:</span>
              {[
                { code: 'AK79B2', label: 'Tanishq 22K', isFake: false },
                { code: 'MH41C9', label: 'Malabar 18K', isFake: false },
                { code: 'KA88X1', label: 'Kalyan 24K', isFake: false },
                { code: 'XX9999', label: 'Unregistered Fake', isFake: true }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleCheckHUID(item.code)}
                  className={`font-mono font-bold px-2 py-0.5 rounded-sm border transition-all text-[11px] flex items-center gap-1 ${
                    item.isFake 
                      ? 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100' 
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.code}</span>
                  <span className="text-[10px] font-normal opacity-80">({item.label})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              maxLength={6}
              value={huidCode}
              onChange={(e) => setHuidCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-digit code (e.g. AK79B2 or XX9999)"
              className="flex-1 px-3.5 py-2.5 text-base font-mono font-bold tracking-widest text-center uppercase bg-white border border-slate-300 rounded-sm focus:outline-none focus:border-gov-800 focus:ring-1 focus:ring-gov-800"
              onKeyDown={(e) => e.key === 'Enter' && handleCheckHUID()}
            />
            <button
              onClick={() => handleCheckHUID()}
              disabled={huidLoading}
              className="px-5 py-2.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs font-bold transition-colors shrink-0 disabled:opacity-50 flex items-center justify-center gap-2 shadow-2xs"
            >
              {huidLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Award className="w-3.5 h-3.5" />}
              <span>Verify Hallmark HUID</span>
            </button>
          </div>

          {/* Verification Result Card */}
          {huidResult && (
            <div className="animate-in fade-in space-y-4 pt-1">
              {/* CASE A: VALID HUID DIGITAL PASSPORT */}
              {huidResult.is_valid && (
                <div className="rounded-sm border border-emerald-600 bg-white shadow-sm overflow-hidden">
                  <div className="h-1 w-full bg-emerald-600"></div>
                  
                  <div className="p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-sm bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800">
                          <Award className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                            Authentic BIS Hallmark Digital Record
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            {huidResult.details?.jeweler || "BIS Registered Hallmark Jeweller"}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-sm text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>STATUTORILY AUTHENTIC</span>
                        </span>
                      </div>
                    </div>

                    {/* Certificate Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-sm border border-slate-200 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">HUID Identifier</span>
                        <p className="font-mono font-extrabold text-sm text-gov-900 mt-0.5">{huidResult.details?.huid}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Certified Purity</span>
                        <p className="font-extrabold text-sm text-amber-700 mt-0.5">{huidResult.details?.purity}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Article Type</span>
                        <p className="font-medium text-xs text-slate-800 mt-0.5">{huidResult.details?.jewellery_type || 'Gold Article'}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Standard</span>
                        <p className="font-mono font-bold text-xs text-slate-800 mt-0.5">{huidResult.details?.standard || 'IS 1417:2016'}</p>
                      </div>
                    </div>

                    {/* Assaying Centre & Trace */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600 pt-1">
                      <div>
                        <span className="font-semibold text-slate-700">Assaying &amp; Hallmarking Centre: </span>
                        <span>{huidResult.details?.assaying_centre}</span>
                      </div>
                      <div className="font-mono text-[11px] text-slate-500">
                        Audit Trace: <strong>{huidResult.details?.audit_trace || 'TLOG-2026'}</strong>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-sm border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{huidResult.details?.note || "Authentic BIS 6-digit laser hallmarking verified on prototype registry."}</span>
                      </span>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-sm text-emerald-800 border border-emerald-300">
                        Verified: {huidResult.details?.tested_date || 'Today'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE B: FRAUD / COUNTERFEIT HUID */}
              {!huidResult.is_valid && (
                <div className="rounded-sm border-2 border-red-600 bg-red-50 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-red-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-sm bg-red-100 border border-red-300 flex items-center justify-center text-red-700">
                        <FileWarning className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest block">
                          Hallmark Counterfeit Alert
                        </span>
                        <h4 className="text-base font-extrabold text-red-950">
                          {huidResult.status || "SUSPECTED COUNTERFEIT / UNREGISTERED HUID"}
                        </h4>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-sm text-xs font-bold bg-red-700 text-white flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>VIOLATION DETECTED</span>
                    </span>
                  </div>

                  <div className="p-4 bg-white rounded-sm border border-red-200 text-xs text-red-950 space-y-2">
                    <p className="font-semibold text-sm">
                      {huidResult.details?.message || huidResult.message || "This HUID does not exist in the National BIS Hallmarking Database."}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      Selling un-hallmarked or fake laser-engraved gold violates Section 14 &amp; 15 of the BIS Act, 2016. Penalties include imprisonment up to 2 years and a fine of minimum ₹2,00,000 or up to 10 times the value of the article.
                    </p>
                  </div>

                  {/* 1-Click NCH Escalation Action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <span className="text-xs text-red-900 font-medium">
                      Did a jeweller sell this gold article to you?
                    </span>
                    <button
                      onClick={() => handleOpenNCH(huidCode, 'Gold HUID', huidResult.details?.jeweler || 'Local Jeweller', 'Counterfeit Gold Hallmark HUID')}
                      className="px-4 py-2 rounded-sm bg-red-700 hover:bg-red-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-2xs transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>1-Click NCH (National Consumer Helpline) Fraud Escalation</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ISI CML LICENSE CHECKER */}
      {activeTab === 'isi' && (
        <div className="bg-slate-50 p-5 sm:p-6 rounded-sm border border-slate-300 shadow-2xs space-y-5 animate-in fade-in">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gov-900">
                ISI Mark License (CM/L Number) Verifier
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Statutory 7-digit license number issued under Scheme-I printed below the ISI logo on conforming products.
              </p>
            </div>

            {/* Sample test chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-600 text-[11px]">Sample Licenses:</span>
              {[
                { code: '6200145', label: 'UltraTech Cement', isFake: false },
                { code: '8400192', label: 'Havells Geyser', isFake: false },
                { code: '9200341', label: 'Bisleri Water', isFake: false },
                { code: '4151908', label: 'Steelbird Helmet', isFake: false },
                { code: '7100456', label: 'SAIL TMT Steel', isFake: false },
                { code: '3344556', label: 'Suspended License', isFake: true }
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleCheckCML(item.code)}
                  className={`font-mono font-bold px-2 py-0.5 rounded-sm border transition-all text-[11px] flex items-center gap-1 ${
                    item.isFake 
                      ? 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100' 
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.code}</span>
                  <span className="text-[10px] font-normal opacity-80">({item.label})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={cmlCode}
              onChange={(e) => setCmlCode(e.target.value)}
              placeholder="Enter 7-digit CML number (e.g. 8400192 or 3344556)"
              className="flex-1 px-3.5 py-2.5 text-base font-mono font-bold tracking-widest text-center bg-white border border-slate-300 rounded-sm focus:outline-none focus:border-gov-800 focus:ring-1 focus:ring-gov-800"
              onKeyDown={(e) => e.key === 'Enter' && handleCheckCML()}
            />
            <button
              onClick={() => handleCheckCML()}
              disabled={cmlLoading}
              className="px-5 py-2.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs font-bold transition-colors shrink-0 disabled:opacity-50 flex items-center justify-center gap-2 shadow-2xs"
            >
              {cmlLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span>Verify ISI License</span>
            </button>
          </div>

          {/* CML Verification Result Card */}
          {cmlResult && (
            <div className="animate-in fade-in space-y-4 pt-1">
              {/* CASE A: VALID CML DIGITAL PASSPORT */}
              {cmlResult.is_valid && (
                <div className="rounded-sm border border-emerald-600 bg-white shadow-sm overflow-hidden">
                  <div className="h-1 w-full bg-emerald-600"></div>

                  <div className="p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-sm bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800">
                          <ShieldCheck className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                            BIS Statutory Conformity Assessment License
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            {cmlResult.details?.licensee || "Registered Manufacturer"}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-sm text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>STATUTORILY OPERATIVE</span>
                        </span>
                      </div>
                    </div>

                    {/* Certificate Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-sm border border-slate-200 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">CML Number</span>
                        <p className="font-mono font-extrabold text-sm text-gov-900 mt-0.5">{cmlResult.details?.cml_number}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Brand Name</span>
                        <p className="font-extrabold text-sm text-emerald-800 mt-0.5">{cmlResult.details?.brand || 'Standard Mark'}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Product Category</span>
                        <p className="font-medium text-xs text-slate-800 mt-0.5 line-clamp-1">{cmlResult.details?.product}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Valid Upto</span>
                        <p className="font-bold text-xs text-slate-900 mt-0.5">{cmlResult.details?.valid_upto}</p>
                      </div>
                    </div>

                    {/* Factory Location & Surveillance Status */}
                    <div className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-sm border border-slate-200">
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-slate-900 shrink-0">Factory Premise:</span>
                        <span className="text-slate-600">{cmlResult.details?.factory_location}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px]">
                        <span className="text-emerald-700 font-semibold">
                          Surveillance: {cmlResult.details?.surveillance_status || 'Periodic Audit Passed'}
                        </span>
                        <span className="font-mono text-slate-400">
                          Audit Trace: {cmlResult.details?.audit_trace || 'AUDIT-BIS-2026'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE B: SUSPENDED / FRAUDULENT LICENSE */}
              {!cmlResult.is_valid && (
                <div className="rounded-sm border-2 border-red-600 bg-red-50 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-red-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-sm bg-red-100 border border-red-300 flex items-center justify-center text-red-700">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest block">
                          Statutory License Revocation Alert
                        </span>
                        <h4 className="text-base font-extrabold text-red-950">
                          {cmlResult.status || "LICENSE SUSPENDED / FRAUD DETECTED"}
                        </h4>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-sm text-xs font-bold bg-red-700 text-white flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>SECTION 14 VIOLATION</span>
                    </span>
                  </div>

                  <div className="p-4 bg-white rounded-sm border border-red-200 text-xs text-red-950 space-y-2">
                    <p className="font-semibold text-sm">
                      {cmlResult.details?.message || cmlResult.message || `License CM/L-${cmlCode} is statutorily SUSPENDED.`}
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      Firm: <strong>{cmlResult.details?.licensee || "Apex Electricals"}</strong>. The license expired on <strong>{cmlResult.details?.valid_upto || "10-Jan-2024"}</strong> and was canceled by the BIS Enforcement Directorate. Selling electrical items under an expired or suspended mark is a non-bailable criminal offense under Section 29 of the BIS Act 2016.
                    </p>
                  </div>

                  {/* 1-Click NCH Action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <span className="text-xs text-red-900 font-medium">
                      Found this product being sold in a retail shop or e-commerce marketplace?
                    </span>
                    <button
                      onClick={() => handleOpenNCH(cmlCode, 'ISI CML License', cmlResult.details?.licensee || 'Apex Electricals', 'Selling with Suspended / Fake ISI CML Mark')}
                      className="px-4 py-2 rounded-sm bg-red-700 hover:bg-red-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-2xs transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>1-Click NCH Fraud Escalation to Ministry of Consumer Affairs</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* NCH ESCALATION MODAL / DRAWER */}
      {nchModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-sm max-w-lg w-full p-5 sm:p-6 border border-slate-300 shadow-lg text-left animate-in zoom-in-95 space-y-4">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-red-50 border border-red-200 text-red-800 text-[10px] font-bold">
                  <Flag className="w-3 h-3 text-red-600" />
                  <span>National Consumer Helpline (NCH) • 1915 Portal</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Direct Fraud Escalation Dossier
                </h3>
              </div>
              <button
                onClick={() => setNchModal(prev => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!nchModal.submitted ? (
              <form onSubmit={handleSubmitNCH} className="space-y-3 text-xs">
                <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-950 space-y-1">
                  <span className="font-bold block">Statutory Offense Classification:</span>
                  <p>Consumer Protection Act, 2019 &amp; Section 29 of Bureau of Indian Standards Act, 2016.</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-sm border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Violation Code</span>
                    <p className="font-mono font-bold text-slate-900">{nchModal.itemCode}</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-sm border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Complaint Type</span>
                    <p className="font-bold text-slate-900">{nchModal.itemType}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Store / Seller Name &amp; City:
                  </label>
                  <input
                    type="text"
                    defaultValue={nchModal.firmName}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-xs font-medium text-slate-900 focus:outline-none focus:border-gov-800 focus:ring-1 focus:ring-gov-800"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Consumer Grievance Narrative:
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={`The vendor is offering products bearing invalid/suspended certification marks (${nchModal.itemCode}). Request immediate raid and penal inspection under BIS Act Section 29.`}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-sm text-xs font-medium text-slate-900 focus:outline-none focus:border-gov-800 focus:ring-1 focus:ring-gov-800"
                    required
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setNchModal(prev => ({ ...prev, isOpen: false }))}
                    className="px-4 py-2 rounded-sm text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-sm bg-red-700 hover:bg-red-800 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Grievance to NCH &amp; BIS</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4 animate-in fade-in">
                <div className="w-10 h-10 rounded-sm bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">
                    Grievance Statutorily Dispatched
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your complaint has been logged with the National Consumer Helpline &amp; dispatched to the BIS Regional Enforcement Cell.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-sm border border-slate-300 font-mono text-xs text-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">NCH Dossier Docket Number:</span>
                  <span className="text-sm font-extrabold text-gov-800">{nchModal.docketNumber}</span>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  SMS acknowledgement simulated to complainant. Status updates will track under Rule 12 of Consumer Protection Act.
                </p>

                <button
                  onClick={() => setNchModal(prev => ({ ...prev, isOpen: false }))}
                  className="w-full py-2 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs font-bold transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
