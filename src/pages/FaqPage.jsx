import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function FaqPage() {
  const { navigate } = useRouter();
  const [openIdx, setOpenIdx] = useState(0);

  const categories = [
    {
      category: "Standards & QCO Orders",
      items: [
        {
          q: "What is an Indian Standard (IS Code)?",
          a: "Indian Standards are formal technical specifications, safety codes, and quality benchmarks published by the Bureau of Indian Standards (BIS) under the BIS Act 2016. There are over 21,000 active Indian Standards covering industrial, electronic, civil, chemical, and consumer goods."
        },
        {
          q: "What is a Quality Control Order (QCO)?",
          a: "While Indian Standards are inherently voluntary, the Government of India through line ministries (such as DPIIT, Ministry of Steel, MeitY) issues mandatory Quality Control Orders (QCOs) in the Gazette of India. Once a QCO is notified, manufacturing, importing, stocking, selling, or distributing non-certified goods is a non-bailable statutory violation under Sections 16, 17 & 29 of the BIS Act, 2016."
        },
        {
          q: "How can I check if my product falls under a mandatory QCO?",
          a: "Use ManakSetu's Instant Standards Search. Standards subject to mandatory QCOs are highlighted with an amber 'Mandatory QCO' badge, including the official Gazette S.O. order number and enforcement date."
        }
      ]
    },
    {
      category: "Certification & Testing (Scheme-I vs CRS)",
      items: [
        {
          q: "What is the difference between Scheme-I (ISI Mark) and Scheme-II (CRS)?",
          a: "Scheme-I grants the traditional ISI Mark and requires an in-house factory testing laboratory, an on-site audit by BIS officers, and independent sample testing. Scheme-II (Compulsory Registration Scheme) applies to IT and electronic goods (e.g. mobile phones, adapters, solar inverters) and operates on self-declaration of conformity supported by test reports from BIS recognized labs."
        },
        {
          q: "Are factory audits required for BIS certification?",
          a: "Yes, under Scheme-I (ISI Mark) and FMCS (Foreign Manufacturers), a BIS Technical Officer conducts a physical inspection of the factory to verify machinery, production processes, quality control personnel, and calibrated laboratory apparatus."
        },
        {
          q: "What is the validity period of a BIS license?",
          a: "A BIS license is initially granted for 1 or 2 years and can be renewed periodically for up to 5 years upon payment of renewal fees and verification of continuous compliance through market and factory surveillance audits."
        }
      ]
    },
    {
      category: "MSME Relief & Fee Concessions",
      items: [
        {
          q: "What statutory fee concessions are available for Micro enterprises?",
          a: "Micro enterprises holding a valid Udyam Registration Certificate receive a 50% statutory concession on application fees, annual license fees, and minimum marking fees. Women-owned enterprises and DPIIT-recognized startups also receive 50% concession."
        },
        {
          q: "What concession do Small enterprises receive?",
          a: "Small enterprises holding a valid Udyam Registration receive a 20% statutory concession on the minimum marking fee."
        }
      ]
    },
    {
      category: "Consumer Verification & Hallmarking",
      items: [
        {
          q: "What is a 6-digit Gold HUID?",
          a: "HUID stands for Hallmark Unique Identification. It is a 6-digit alphanumeric code laser-engraved onto every piece of hallmarked gold jewellery. Consumers can verify this code in the official BIS CARE app or ManakSetu's Consumer Verifier to inspect purity, jeweller registration, and assaying center."
        },
        {
          q: "How do I report a suspected fake ISI mark?",
          a: "You can file a complaint directly using ManakSetu's Report Violation modal, through the official BIS CARE app, or by calling the National Consumer Helpline at toll-free 1915."
        }
      ]
    }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* HEADER */}
        <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-gov-900 font-bold">Frequently Asked Questions</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                Frequently Asked Questions (FAQ)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Clear, authoritative answers to common inquiries regarding Indian Standards, BIS certification schemes, mandatory QCOs, and consumer hallmarking.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ LIST */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-3">
              <h2 className="text-sm font-bold text-gov-900 uppercase tracking-wide border-b border-slate-200 pb-2">
                {cat.category}
              </h2>

              <div className="space-y-2.5">
                {cat.items.map((item, itemIdx) => {
                  const globalIdx = `${catIdx}-${itemIdx}`;
                  const isOpen = openIdx === globalIdx;

                  return (
                    <div
                      key={itemIdx}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-gov-sm transition-all"
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-xs sm:text-sm text-gov-950 hover:text-gov-700 transition-colors"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-gov-800' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* AI CTA */}
          <div className="p-6 rounded-2xl bg-gov-900 text-white shadow-gov flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-white">Have a Specific Technical Question?</h3>
              <p className="text-xs text-slate-300">
                Ask ManakBot AI to look up clauses, testing tolerances, or specific BIS orders.
              </p>
            </div>
            <button
              onClick={() => navigate('/manakbot')}
              className="px-4 py-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-lg inline-flex items-center gap-2 shadow-gov-sm transition-colors shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consult ManakBot</span>
            </button>
          </div>
        </div>

      </div>
    </ErrorBoundary>
  );
}
