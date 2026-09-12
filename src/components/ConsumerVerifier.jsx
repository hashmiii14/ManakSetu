import React, { useState } from 'react';
import { 
  ShieldCheck, Award, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, Sparkles, Check, Copy, AlertCircle, Flag, Loader2 
} from 'lucide-react';
import { verifyIdentifier } from '../services/api';

export default function ConsumerVerifier({ onOpenReport }) {
  const [activeTab, setActiveTab] = useState('gold'); // 'gold' | 'isi'
  
  // HUID State
  const [huidCode, setHuidCode] = useState('AK79B2');
  const [huidResult, setHuidResult] = useState(null);
  const [huidLoading, setHuidLoading] = useState(false);

  // ISI Mark CML State
  const [cmlCode, setCmlCode] = useState('8400192');
  const [cmlResult, setCmlResult] = useState(null);
  const [cmlLoading, setCmlLoading] = useState(false);

  const handleCheckHUID = async () => {
    setHuidLoading(true);
    try {
      const res = await verifyIdentifier(huidCode, 'huid');
      setHuidResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setHuidLoading(false);
    }
  };

  const handleCheckCML = async () => {
    setCmlLoading(true);
    try {
      const res = await verifyIdentifier(cmlCode, 'cml');
      setCmlResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCmlLoading(false);
    }
  };

  return (
    <section id="consumer-check" className="py-16 bg-neutral-50/70 border-b border-neutral-200 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Prototype Consumer Verification Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Verify Gold Hallmarking & Genuine ISI Marks
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Check 6-character Gold HUIDs or 7-digit ISI CML license numbers against our prototype verification provider.
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
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Gold Hallmark Unique Identification (HUID) Verifier
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Every authentic hallmarked gold article contains a laser-inscribed 6-character alphanumeric code.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span>Demo codes:</span>
                {['AK79B2', 'MH41C9', 'KA88X1'].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setHuidCode(c); }}
                    className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded hover:bg-emerald-100 border border-emerald-200"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                maxLength={6}
                value={huidCode}
                onChange={(e) => setHuidCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code (e.g. AK79B2)"
                className="flex-1 px-4 py-3 text-base font-mono font-bold tracking-widest text-center uppercase bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                onKeyDown={(e) => e.key === 'Enter' && handleCheckHUID()}
              />
              <button
                onClick={handleCheckHUID}
                disabled={huidLoading}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shrink-0 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {huidLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>Verify Hallmark</span>
              </button>
            </div>

            {/* Verification Result Display */}
            {huidResult && (
              <div className={`p-4 sm:p-5 rounded-xl border animate-in fade-in space-y-3 ${
                huidResult.is_valid 
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                  : 'bg-red-50/80 border-red-300 text-red-950'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {huidResult.is_valid ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Status: {huidResult.status}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>Status: {huidResult.status}</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 border border-neutral-300">
                    Prototype Verification Provider
                  </span>
                </div>

                {huidResult.is_valid && huidResult.details && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200/80 text-xs">
                    <div>
                      <span className="text-[10px] text-emerald-800 uppercase font-bold block">HUID Code</span>
                      <p className="font-mono font-bold text-xs mt-0.5">{huidResult.details.huid}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-800 uppercase font-bold block">Certified Purity</span>
                      <p className="font-bold text-xs mt-0.5">{huidResult.details.purity}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-800 uppercase font-bold block">Assaying Centre</span>
                      <p className="font-medium text-xs mt-0.5 line-clamp-1">{huidResult.details.assaying_centre}</p>
                    </div>
                  </div>
                )}

                {!huidResult.is_valid && (
                  <div className="text-xs space-y-2">
                    <p>{huidResult.details?.message || "HUID not found in prototype verification registry."}</p>
                    {onOpenReport && (
                      <button
                        onClick={() => onOpenReport(huidCode, "Fake or Unverified HUID")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-xs"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>Report Suspicious Hallmark</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Mandatory Prototype Disclaimer */}
                <p className="text-[10px] text-neutral-500 italic pt-1 border-t border-neutral-200/60">
                  {huidResult.disclaimer}
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ISI CML LICENSE CHECKER */}
        {activeTab === 'isi' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-5 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  ISI Mark License (CM/L Number) Verifier
                </h3>
                <p className="text-xs text-neutral-600 mt-0.5">
                  Manufacturers authorized to use the ISI mark print a 7-digit CML number directly under the logo.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span>Demo licenses:</span>
                {['8400192', '9200341', '7100456'].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCmlCode(c); }}
                    className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded hover:bg-emerald-100 border border-emerald-200"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={cmlCode}
                onChange={(e) => setCmlCode(e.target.value)}
                placeholder="Enter 7-digit CML number (e.g. 8400192)"
                className="flex-1 px-4 py-3 text-base font-mono font-bold tracking-widest text-center bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                onKeyDown={(e) => e.key === 'Enter' && handleCheckCML()}
              />
              <button
                onClick={handleCheckCML}
                disabled={cmlLoading}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shrink-0 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {cmlLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>Verify License</span>
              </button>
            </div>

            {/* Verification Result Display */}
            {cmlResult && (
              <div className={`p-4 sm:p-5 rounded-xl border animate-in fade-in space-y-3 ${
                cmlResult.is_valid 
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                  : 'bg-red-50/80 border-red-300 text-red-950'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {cmlResult.is_valid ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Status: {cmlResult.status}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span>Status: {cmlResult.status}</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 border border-neutral-300">
                    Prototype Verification Provider
                  </span>
                </div>

                {cmlResult.is_valid && cmlResult.details && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200/80 text-xs">
                    <div>
                      <span className="text-[10px] text-emerald-800 uppercase font-bold block">CML Number</span>
                      <p className="font-mono font-bold text-xs mt-0.5">{cmlResult.details.cml_number}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-800 uppercase font-bold block">Licensee Firm</span>
                      <p className="font-bold text-xs mt-0.5">{cmlResult.details.licensee}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-800 uppercase font-bold block">Valid Upto</span>
                      <p className="font-medium text-xs mt-0.5">{cmlResult.details.valid_upto}</p>
                    </div>
                  </div>
                )}

                {!cmlResult.is_valid && (
                  <div className="text-xs space-y-2">
                    <p>{cmlResult.details?.message || "License number not found in prototype verification registry."}</p>
                    {onOpenReport && (
                      <button
                        onClick={() => onOpenReport(cmlCode, "Suspected Counterfeit ISI Mark")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-xs"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>Report Fake ISI Mark</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Mandatory Prototype Disclaimer */}
                <p className="text-[10px] text-neutral-500 italic pt-1 border-t border-neutral-200/60">
                  {cmlResult.disclaimer}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
