import React, { useState } from 'react';
import { 
  ShieldCheck, Award, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, Check, Copy 
} from 'lucide-react';
import { verifyHUID, verifyCMLLicense } from '../services/aiEngine';

export default function ConsumerVerifier() {
  const [activeTab, setActiveTab] = useState('gold'); // 'gold' | 'isi'
  
  // HUID State
  const [huidCode, setHuidCode] = useState('AK79B2');
  const [huidResult, setHuidResult] = useState(null);

  // ISI Mark CML State
  const [cmlCode, setCmlCode] = useState('8400192');
  const [cmlResult, setCmlResult] = useState(null);

  const handleCheckHUID = () => {
    const res = verifyHUID(huidCode);
    setHuidResult(res);
  };

  const handleCheckCML = () => {
    const res = verifyCMLLicense(cmlCode);
    setCmlResult(res);
  };

  return (
    <section id="consumer-check" className="py-16 bg-neutral-50/70 border-b border-neutral-200 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consumer Protection Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Verify Gold Hallmarking & Genuine ISI Marks
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Check if your gold jewellery or purchased product has authentic BIS certification marks.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('gold')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              activeTab === 'gold'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'
            }`}
          >
            🥇 Verify Gold 6-Digit HUID
          </button>
          <button
            onClick={() => setActiveTab('isi')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              activeTab === 'isi'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200'
            }`}
          >
            🛡️ Verify 7-Digit ISI License (CML)
          </button>
        </div>

        {/* TAB 1: GOLD HUID CHECKER */}
        {activeTab === 'gold' && (
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-5 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Gold Hallmark Unique Identification (HUID) Verifier
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                Every genuine gold jewellery item has a laser-engraved 6-character code (e.g. <code>AK79B2</code>).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                maxLength={6}
                value={huidCode}
                onChange={(e) => setHuidCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code (e.g. AK79B2)"
                className="flex-1 px-4 py-3 text-base font-mono font-bold tracking-widest text-center uppercase bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                onClick={handleCheckHUID}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shrink-0"
              >
                Verify Gold Hallmark
              </button>
            </div>

            {/* Verification Result Display */}
            {huidResult && (
              <div className={`p-4 rounded-xl border animate-in fade-in ${
                huidResult.valid 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                  : 'bg-red-50 border-red-300 text-red-950'
              }`}>
                {huidResult.valid ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Authentic BIS Gold Hallmarking Confirmed
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200/60">
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase font-bold block">HUID Code</span>
                        <p className="font-mono font-black text-xs">{huidResult.huid}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase font-bold block">Certified Purity</span>
                        <p className="font-bold text-xs">{huidResult.purity}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-800 uppercase font-bold block">Assaying Centre</span>
                        <p className="font-medium text-xs truncate">{huidResult.assayingCentre}</p>
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

            {/* Guide to 3 Marks */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
              <span className="font-bold text-neutral-900 block mb-1.5">
                🔍 Three mandatory marks on genuine gold jewellery:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[11px] font-medium">
                <div className="bg-white p-2 rounded-lg border border-neutral-200">1. BIS Triangle Mark</div>
                <div className="bg-white p-2 rounded-lg border border-neutral-200">2. Purity (e.g. 22K916)</div>
                <div className="bg-white p-2 rounded-lg border border-neutral-200">3. 6-Digit Alphanumeric HUID</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ISI MARK CML CHECKER */}
        {activeTab === 'isi' && (
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-5 animate-in fade-in">
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                ISI Mark CML License Number Validator
              </h3>
              <p className="text-xs text-neutral-600 mt-1">
                A genuine ISI mark must always display a 7-digit CML number printed below the logo (e.g. <code>CM/L-8400192</code>).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-3 text-sm font-mono font-bold text-neutral-400">CM/L-</span>
                <input
                  type="text"
                  maxLength={7}
                  value={cmlCode}
                  onChange={(e) => setCmlCode(e.target.value)}
                  placeholder="8400192"
                  className="w-full pl-18 pr-4 py-3 text-base font-mono font-bold tracking-wider bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <button
                onClick={handleCheckCML}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shrink-0"
              >
                Validate License
              </button>
            </div>

            {/* CML Result Card */}
            {cmlResult && (
              <div className={`p-4 rounded-xl border animate-in fade-in ${
                cmlResult.valid 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                  : 'bg-red-50 border-red-300 text-red-950'
              }`}>
                {cmlResult.valid ? (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Statutory License Operative & Genuine
                    </div>
                    <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-neutral-500 font-bold block">License Number:</span>
                        <p className="font-mono font-bold text-neutral-900">{cmlResult.cmlNumber}</p>
                      </div>
                      <div>
                        <span className="text-neutral-500 font-bold block">Status:</span>
                        <p className="font-bold text-emerald-700">{cmlResult.status}</p>
                      </div>
                      <div className="col-span-full">
                        <span className="text-neutral-500 font-bold block">Monitoring & Quality Status:</span>
                        <p className="text-neutral-700">{cmlResult.monitoringStatus}</p>
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

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-snug">
              <strong>Counterfeit Warning:</strong> If an appliance or water bottle displays the ISI logo without the 7-digit CML number, it is counterfeit and illegal to sell under Section 29 of the BIS Act 2016.
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
