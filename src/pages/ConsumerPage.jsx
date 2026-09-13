import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, PhoneCall, ExternalLink, 
  HelpCircle, Sparkles, Award, ArrowRight, FileWarning, Search, Eye
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ConsumerVerifier from '../components/ConsumerVerifier';
import ErrorBoundary from '../components/ErrorBoundary';

export default function ConsumerPage({ onOpenReport }) {
  const { navigate } = useRouter();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* HEADER SECTION */}
        <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-gov-900 font-bold">Consumer Protection &amp; Hallmarking</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  Consumer Verification &amp; Hallmarking Portal
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Verify authentic BIS Standard Marks (ISI), validate 6-digit Gold Hallmark Unique Identifiers (HUID), and protect yourself from counterfeit goods.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://play.google.com/store/apps/details?id=com.bis.biscare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-gov-sm transition-colors"
                >
                  <span>Download Official BIS CARE App</span>
                  <ExternalLink className="w-3.5 h-3.5 text-saffron-400" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN BODY CONTAINER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
          
          {/* 1. INTERACTIVE VERIFICATION WIDGET */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-gov p-6 sm:p-8 space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Anti-Counterfeit Engine</span>
              </div>
              <h2 className="text-xl font-bold text-gov-900 mt-1">
                Instant HUID &amp; ISI License Verification
              </h2>
              <p className="text-xs text-slate-500">
                Enter your 6-digit alphanumeric gold hallmark code or 7-digit ISI license number to verify authenticity against national records.
              </p>
            </div>

            <ConsumerVerifier onOpenReport={onOpenReport} />
          </div>

          {/* 2. EDUCATIONAL GUIDE: HOW TO READ MARKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD A: HOW TO READ GOLD HALLMARK */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-gov-sm p-6 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  Au
                </div>
                <div>
                  <h3 className="text-base font-bold text-gov-900">
                    How to Read a Genuine Gold Hallmark
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Mandatory 3 Marks on Gold Jewellery since 1 April 2023
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gov-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <div>
                    <span className="font-bold text-slate-900 block">BIS Standard Mark</span>
                    <span className="text-slate-500">Triangular stylized mark signifying official Bureau of Indian Standards certification.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gov-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <div>
                    <span className="font-bold text-slate-900 block">Purity in Karat &amp; Fineness</span>
                    <span className="text-slate-500">E.g., 22K916 (91.6% pure gold), 18K750 (75.0% pure gold), or 14K585 (58.5% pure gold).</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gov-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <div>
                    <span className="font-bold text-slate-900 block">6-Digit Alphanumeric HUID</span>
                    <span className="text-slate-500">Unique identifier laser-etched on each piece of jewellery, traceable to the specific assaying centre and jeweller.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD B: HOW TO READ ISI MARK */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-gov-sm p-6 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  ISI
                </div>
                <div>
                  <h3 className="text-base font-bold text-gov-900">
                    How to Read an Authentic ISI Mark
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Product Certification Mark under Scheme-I
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gov-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <div>
                    <span className="font-bold text-slate-900 block">Indian Standard Code (Top)</span>
                    <span className="text-slate-500">The relevant standard number (e.g., IS 2082 for geysers or IS 14543 for packaged water) must appear above the logo.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gov-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <div>
                    <span className="font-bold text-slate-900 block">Canonical ISI Monogram</span>
                    <span className="text-slate-500">The authentic geometric 'ISI' emblem with correct proportion and font geometry.</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gov-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <div>
                    <span className="font-bold text-slate-900 block">7-Digit CM/L License Number (Bottom)</span>
                    <span className="text-slate-500">The Certification Marks License number (e.g., CM/L-8400192) identifies the specific manufacturing facility.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. GRIEVANCE REDRESSAL & NCH TOLL FREE */}
          <div className="bg-gov-900 text-white rounded-2xl p-6 sm:p-8 shadow-gov flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-2.5 py-0.5 rounded bg-saffron-500/20 text-saffron-400 font-bold text-xs uppercase tracking-wide inline-block">
                Consumer Rights
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Suspect a Fake ISI Mark or Failed Hallmark?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Selling uncertified goods under mandatory QCOs is a statutory offence under Section 16 &amp; 17 of the BIS Act, 2016. Report directly to BIS Enforcement or National Consumer Helpline.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenReport ? onOpenReport('', 'Suspected Fake Mark') : null}
                className="px-4 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-lg shadow-gov-sm transition-colors inline-flex items-center gap-2"
              >
                <FileWarning className="w-4 h-4" />
                <span>File Violation Report</span>
              </button>

              <a
                href="tel:1915"
                className="px-4 py-2.5 bg-gov-800 hover:bg-gov-700 text-white border border-gov-700 font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call NCH 1915</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </ErrorBoundary>
  );
}
