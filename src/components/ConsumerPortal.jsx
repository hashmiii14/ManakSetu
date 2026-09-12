import React, { useState } from 'react';
import { 
  ShieldCheck, Award, AlertOctagon, CheckCircle2, XCircle, 
  HelpCircle, Copy, Check, FileWarning, Search, Sparkles 
} from 'lucide-react';
import { verifyHUID, verifyCMLLicense } from '../services/aiEngine';
import confetti from 'canvas-confetti';

export default function ConsumerPortal() {
  // HUID verification state
  const [huidInput, setHuidInput] = useState('AK79B2');
  const [huidResult, setHuidResult] = useState(null);

  // ISI Mark verification state
  const [cmlInput, setCmlInput] = useState('8400192');
  const [cmlResult, setCmlResult] = useState(null);

  // Grievance generator state
  const [merchantName, setMerchantName] = useState('');
  const [productCategory, setProductCategory] = useState('Rider Helmet (Non-ISI)');
  const [grievanceCity, setGrievanceCity] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);

  const handleVerifyHUID = () => {
    const res = verifyHUID(huidInput);
    setHuidResult(res);
    if (res.valid) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleVerifyCML = () => {
    const res = verifyCMLLicense(cmlInput);
    setCmlResult(res);
    if (res.valid) {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    }
  };

  const grievanceText = `To: The Director (Grievance Cell), Bureau of Indian Standards / BIS Care Portal
Subject: Statutory Complaint against sale of Substandard/Non-Certified product under Section 29 of BIS Act 2016

Respected Authority,
I wish to bring to your urgent statutory attention a serious compliance violation regarding the sale of uncertified and potentially counterfeit goods in our locality.

Grievance Particulars:
- Product Type: ${productCategory}
- Merchant / Retailer: ${merchantName || '[Retailer / Shop Name]'}
- Location / City: ${grievanceCity || '[Market Address & City]'}
- Nature of Violation: Retailer is actively marketing products without mandatory statutory ISI certification mark or displaying counterfeit CML license credentials, in direct contravention of the applicable Quality Control Order.
- Consumer Safety Risk: Immediate electrical, mechanical, or health hazard.

I request designated BIS enforcement officers to initiate a statutory surveillance inspection and enforce penal action as prescribed under Section 29 of the Bureau of Indian Standards Act, 2016.

Complainant: Consumer Vigilance (via ManakSetu Statutory Portal)`;

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(grievanceText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Consumer Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-emerald-900">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Citizen Vigilance & Statutory Authenticity Verifier
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Verify Gold Hallmarking (6-Digit HUID) & Genuine ISI Mark Licenses
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Protect yourself against duplicate goods and uncertified gold artefacts. Perform instant statutory verification backed by Bureau of Indian Standards benchmarks.
          </p>
        </div>
      </div>

      {/* Grid: 2 Verification Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Section 1: Gold Hallmark 6-Digit HUID Checker */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                IS 1417 : 2016 Gold Hallmarking
              </span>
              <span className="text-[11px] font-bold text-slate-500">6-Digit Alphanumeric</span>
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Verify 6-Digit Gold HUID
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Every authentic hallmarked jewellery piece carries a laser-engraved 6-character alphanumeric code (e.g. <code>AK79B2</code>).
            </p>

            {/* Input Form */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={huidInput}
                onChange={(e) => setHuidInput(e.target.value.toUpperCase())}
                placeholder="e.g. AK79B2"
                className="w-full text-center text-base font-mono font-black tracking-widest px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase bg-slate-50"
              />
              <button
                onClick={handleVerifyHUID}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0"
              >
                Verify HUID
              </button>
            </div>

            {/* Verification Result Card */}
            {huidResult && (
              <div className={`mt-4 p-4 rounded-xl border animate-in fade-in ${
                huidResult.valid 
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
                  : 'bg-red-50/70 border-red-300 text-red-950'
              }`}>
                {huidResult.valid ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-black text-emerald-800 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Authentic BIS Hallmarking Confirmed
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60">
                      <div>
                        <span className="text-[10px] text-emerald-700 uppercase font-bold">HUID Number</span>
                        <p className="font-mono font-black text-xs">{huidResult.huid}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-700 uppercase font-bold">Certified Purity</span>
                        <p className="font-bold text-xs">{huidResult.purity}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-emerald-700 uppercase font-bold">Assaying & Hallmarking Centre</span>
                        <p className="font-medium text-xs">{huidResult.assayingCentre}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-xs text-red-800">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{huidResult.message}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Educational Visual Aid */}
          <div className="mt-5 p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-950">
            <span className="font-bold block mb-1">🔍 3 Statutory Marks on Authentic Gold:</span>
            <div className="grid grid-cols-3 gap-1.5 text-center mt-2 font-medium">
              <div className="bg-white p-2 rounded-lg border border-amber-200">1. BIS Triangle Logo</div>
              <div className="bg-white p-2 rounded-lg border border-amber-200">2. Purity (e.g. 22K916)</div>
              <div className="bg-white p-2 rounded-lg border border-amber-200">3. 6-Digit HUID</div>
            </div>
          </div>
        </div>

        {/* Section 2: ISI Mark & CML Authenticator */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-blue-900 bg-blue-100 px-2.5 py-1 rounded-md border border-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                Scheme-I ISI Mark Verifier
              </span>
              <span className="text-[11px] font-bold text-slate-500">7-Digit CML License</span>
            </div>

            <h3 className="text-lg font-black text-slate-900">
              Validate ISI Mark License (CML Number)
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Every genuine ISI mark <strong>must display a 7-digit CML number</strong> embossed or printed below the logo (e.g. <code>CM/L-8400192</code>).
            </p>

            {/* Input Form */}
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">CM/L-</span>
                <input
                  type="text"
                  maxLength={7}
                  value={cmlInput}
                  onChange={(e) => setCmlInput(e.target.value)}
                  placeholder="8400192"
                  className="w-full pl-16 pr-3 py-2.5 text-sm font-mono font-bold tracking-wider rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>
              <button
                onClick={handleVerifyCML}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all shrink-0"
              >
                Verify CML
              </button>
            </div>

            {/* CML Result Card */}
            {cmlResult && (
              <div className={`mt-4 p-4 rounded-xl border animate-in fade-in ${
                cmlResult.valid 
                  ? 'bg-blue-50/80 border-blue-300 text-blue-950' 
                  : 'bg-red-50/70 border-red-300 text-red-950'
              }`}>
                {cmlResult.valid ? (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-black text-blue-900 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      Statutory License Operative & Genuine
                    </div>
                    <div className="pt-2 border-t border-blue-200/60 grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-500 font-bold">CML Registration:</span>
                        <p className="font-mono font-bold text-blue-900">{cmlResult.cmlNumber}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 font-bold">Status:</span>
                        <p className="font-bold text-emerald-700">{cmlResult.status}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 font-bold">Surveillance Quality Status:</span>
                        <p className="text-slate-700">{cmlResult.monitoringStatus}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-xs text-red-800">
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{cmlResult.message}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Warning Flag */}
          <div className="mt-5 p-3 rounded-xl bg-red-50/70 border border-red-200/80 text-[11px] text-red-900">
            <span className="font-bold flex items-center gap-1.5 text-red-800">
              <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
              Counterfeit Indicator:
            </span>
            <p className="mt-1 leading-snug">
              If an ISI logo is affixed to an electrical appliance, helmet, or packaged drinking water <strong>without</strong> the 7-digit CML number, it is completely counterfeit and illegal.
            </p>
          </div>
        </div>

      </div>

      {/* Section 3: Formal Legal Grievance Drafter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="max-w-2xl mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 text-xs font-bold mb-2 border border-red-200">
            <FileWarning className="w-3.5 h-3.5 text-red-600" />
            Statutory Grievance Drafter for BIS Care Portal
          </div>
          <h3 className="text-lg font-black text-slate-900">
            Lodge a Formal Statutory Complaint Against Substandard Goods
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            Auto-generate a legally structured complaint formatted according to Section 29 of the Bureau of Indian Standards Act, 2016.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Product Category</label>
              <select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Rider Helmet (Non-ISI)">Two-Wheeler Helmet (Non-ISI / Roadside Counterfeit)</option>
                <option value="Packaged Drinking Water">Packaged Drinking Water (Missing CML / Broken Seal)</option>
                <option value="Electric Storage Geyser">Electric Storage Geyser (Missing Mandatory ISI Mark)</option>
                <option value="Uncertified Gold Jewellery">Gold Jewellery (Missing 6-Digit HUID Laser Inscription)</option>
                <option value="Uncertified Children Toys">Plastic Toys with Choking Hazard / Toxic Paint</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Retailer / Vendor Name</label>
              <input
                type="text"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                placeholder="e.g. Apex Electricals, Main Market"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Market Location / City</label>
              <input
                type="text"
                value={grievanceCity}
                onChange={(e) => setGrievanceCity(e.target.value)}
                placeholder="e.g. Lajpat Nagar Market, New Delhi"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 leading-snug">
              <span className="font-bold">Official Statutory Filing Channels:</span>
              <ul className="mt-1 list-disc list-inside text-[11px] text-blue-800 space-y-0.5">
                <li>BIS Care Mobile Application (Android / iOS)</li>
                <li>National Consumer Helpline Toll-Free: <strong>1915</strong></li>
                <li>Statutory Email: <code>complaints@bis.gov.in</code></li>
              </ul>
            </div>
          </div>

          {/* Output Preview (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 text-slate-200 rounded-xl p-4 flex flex-col justify-between font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-sans font-bold">Formal Statutory Grievance Template</span>
              <button
                onClick={handleCopyDraft}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-[11px] font-sans font-bold transition-all"
              >
                {copiedDraft ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDraft ? 'Copied to Clipboard!' : 'Copy Draft'}</span>
              </button>
            </div>

            <div className="py-3 whitespace-pre-line text-slate-300 text-[11px] leading-relaxed max-h-[220px] overflow-y-auto">
              {grievanceText}
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-sans">
              Statutory Basis: Section 29, Bureau of Indian Standards Act 2016 (Penal fine up to ₹5,00,000 and 2 years imprisonment).
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
