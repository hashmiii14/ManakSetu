import React, { useState, useMemo } from 'react';
import { 
  Building2, Calculator, ShieldCheck, CheckCircle2, ArrowRight, 
  ExternalLink, Sparkles, Award, FileText, BadgePercent, TrendingDown, Info
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { BIS_STANDARDS } from '../data/bisStandards';
import CostEstimatorSection from '../components/CostEstimatorSection';
import ErrorBoundary from '../components/ErrorBoundary';

export default function MsmePage() {
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
              <span className="text-gov-900 font-bold">MSME &amp; Startup Assistance</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  MSME &amp; Startup BIS Compliance Assistance
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Special 50% statutory fee concessions, Udyam registration linking, GeM public procurement compliance, and simplified testing pathways for small businesses.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://udyamregistration.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-sm bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Verify Udyam Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN BODY */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
          
          {/* 1. KEY MSME INCENTIVES STRIP (3 CARDS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-6 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                <BadgePercent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gov-900">
                  50% Concession for Micro Units
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Micro enterprises with active Udyam registration receive a 50% discount on statutory Application, Annual License, and Minimum Marking fees.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-6 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-base">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gov-900">
                  Women &amp; SC/ST Entrepreneurs
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  DPIIT recognized startups and enterprises owned by women or SC/ST entrepreneurs qualify for the highest tier 50% concession on certification fees.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-6 space-y-3">
              <div className="w-10 h-10 rounded-sm bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gov-900">
                  GeM Tender Eligibility
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  A valid BIS CM/L license provides statutory preference in Government e-Marketplace (GeM) tenders under the Public Procurement (Preference to Make in India) Order.
                </p>
              </div>
            </div>

          </div>

          {/* 2. INTERACTIVE FEE CONCESSION ESTIMATOR */}
          <div className="bg-white rounded-sm border border-slate-300 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gov-800 uppercase tracking-wide">
                <Calculator className="w-4 h-4" />
                <span>Statutory Tariff Calculator</span>
              </div>
              <h2 className="text-xl font-bold text-gov-900 mt-1">
                Calculate Your Enterprise's Net Certification Cost
              </h2>
              <p className="text-xs text-slate-500">
                Estimate exact application, inspection, and marking fees with statutory MSME concessions applied.
              </p>
            </div>

            <CostEstimatorSection embedded={true} />
          </div>

          {/* 3. GEM PORTAL & PUBLIC PROCUREMENT ROADMAP */}
          <div id="gem" className="bg-white rounded-sm border border-slate-300 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-sm bg-gov-100 text-gov-900 text-xs font-bold uppercase tracking-wide border border-gov-300">
                Public Procurement Integration
              </span>
              <h3 className="text-xl font-bold text-gov-900">
                How to Link BIS Certification to Your GeM Seller Account
              </h3>
              <p className="text-xs text-slate-600">
                Follow these 4 verified steps to qualify for government tenders and defense/railway procurement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Obtain CM/L License", desc: "Complete BIS factory audit and receive your 7-digit CM/L license number." },
                { step: "02", title: "Login to GeM Portal", desc: "Access your GeM seller dashboard under 'My Offerings' > 'Products'." },
                { step: "03", title: "Select Product Category", desc: "Select the catalog category matching your Indian Standard (e.g., Geyser IS 2082)." },
                { step: "04", title: "Validate BIS License", desc: "Enter your CM/L number; GeM validates directly against the BIS API database." }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-sm bg-slate-50 border border-slate-300 space-y-2">
                  <span className="text-xl font-extrabold text-gov-800 font-mono block">
                    {item.step}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
              <span className="text-slate-500">Need assistance navigating GeM tender compliance?</span>
              <button
                onClick={() => navigate('/manakbot?prompt=How do I comply with BIS standards for selling on the GeM portal?')}
                className="text-gov-800 font-bold hover:text-gov-950 flex items-center gap-1"
              >
                <span>Consult ManakBot on GeM Compliance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </ErrorBoundary>
  );
}
