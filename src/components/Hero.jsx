import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero({ onGetStarted, onHowItWorks }) {
  // Interactive product preview state
  const [activePreview, setActivePreview] = useState(0);

  const previews = [
    {
      query: "Electric storage water heater / geyser",
      isCode: "IS 2082:2018",
      title: "Stationary Storage Type Electric Water Heaters",
      scheme: "Scheme-I (ISI Mark)",
      mandatory: true,
      test: "High Voltage Dielectric (1500V) & Standing Heat Loss",
      concession: "50% Fee Concession for Micro MSMEs"
    },
    {
      query: "Packaged drinking water bottles",
      isCode: "IS 14543:2016",
      title: "Packaged Drinking Water",
      scheme: "Scheme-I (ISI Mark)",
      mandatory: true,
      test: "Microbiological Safety & Toxic Heavy Metals Assay",
      concession: "Mandatory In-House Testing Laboratory"
    },
    {
      query: "Plastic toys for infants under 36 months",
      isCode: "IS 9873 (Part 1):2019",
      title: "Safety of Toys - Mechanical Properties",
      scheme: "Scheme-I (ISI Mark)",
      mandatory: true,
      test: "Choking Hazard Cylinder & Heavy Metal Migration",
      concession: "DPIIT Mandatory Quality Control Order"
    }
  ];

  const current = previews[activePreview];

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>ManaKSetu</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
              AI Assistant for Indian Standards & BIS Services
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Find standards, understand BIS requirements, and get clear guidance without digging through complicated information.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-xs"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onHowItWorks}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-semibold border border-neutral-300 transition-colors"
              >
                How It Works
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                21,000+ Indian Standards Indexed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Statutory QCO Verifications
              </span>
            </div>

          </div>

          {/* Right Column: Clean Product Preview (Real UI, not a random image) */}
          <div className="lg:col-span-6">
            <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 border border-neutral-200 shadow-sm text-left">
              
              {/* Product Preview Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-300"></div>
                  <span className="text-xs font-semibold text-neutral-500 ml-2">Product Assistant Preview</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Live Preview
                </span>
              </div>

              {/* Sample User Query Box */}
              <div className="bg-white rounded-xl p-3.5 border border-neutral-200 shadow-xs mb-3">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                  User Inquiry
                </span>
                <p className="text-sm font-semibold text-neutral-900">
                  "{current.query}"
                </p>
              </div>

              {/* Real Output Card */}
              <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    {current.isCode}
                  </span>
                  {current.mandatory && (
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      Mandatory Quality Control Order (QCO)
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {current.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Certification Scheme: <strong className="text-neutral-700">{current.scheme}</strong>
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Required Test:</strong> {current.test}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Government Subsidy:</strong> {current.concession}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Sample Chips */}
              <div className="mt-4 pt-3 border-t border-neutral-200/80">
                <span className="text-[11px] font-medium text-neutral-500 block mb-2">
                  Click to preview different product queries:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {previews.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePreview(idx)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all ${
                        activePreview === idx
                          ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                          : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                      }`}
                    >
                      {p.isCode}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
