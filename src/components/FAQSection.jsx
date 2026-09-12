import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What is ManaKSetu?",
      a: "ManaKSetu is an AI-powered regulatory assistant and standards discovery platform. It helps Indian manufacturers, startups, MSMEs, and consumers identify applicable Indian Standards (IS Codes), understand mandatory Quality Control Orders (QCOs), and navigate BIS certification procedures."
    },
    {
      q: "What can I ask ManaKSetu?",
      a: "You can ask product-specific compliance questions (e.g., 'Which standard applies to electric storage geysers?'), certification procedures ('How do I apply for an ISI mark?'), testing parameters ('What laboratory tests are required for packaged drinking water?'), or fee concession calculations."
    },
    {
      q: "What are Indian Standards (IS Codes)?",
      a: "Indian Standards are formal quality, safety, and performance benchmarks published by the Bureau of Indian Standards (BIS) under the BIS Act 2016. There are over 21,000+ standards covering products across electronics, appliances, construction, food, and automotive domains."
    },
    {
      q: "What is the difference between the ISI Mark (Scheme-I) and CRS (Scheme-II)?",
      a: "Scheme-I (ISI Mark) requires both in-house factory testing facilities, a physical factory audit by BIS officers, and sample testing at accredited labs. Scheme-II (Compulsory Registration Scheme - CRS) applies primarily to electronics and IT goods (e.g. mobile phones, adapters) and relies on third-party test reports without prior physical factory audits."
    },
    {
      q: "Are all Indian Standards mandatory?",
      a: "No. By default, Indian Standards are voluntary. However, the Government of India regularly issues Quality Control Orders (QCOs) through ministries like DPIIT, MeitY, and the Ministry of Consumer Affairs, making specific standards statutory and mandatory. Manufacturing or selling items covered under a mandatory QCO without a BIS license is a legal offense."
    },
    {
      q: "How does ManaKSetu help MSMEs and startups save on fees?",
      a: "ManaKSetu incorporates the Ministry of MSME's statutory concession guidelines. Micro enterprises receive a 50% discount on annual minimum marking fees, Small enterprises receive a 20% concession, and special allowances exist for women entrepreneurs and recognized startups."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Section Heading */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Clear answers to common questions about Indian Standards and BIS compliance.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50 transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-neutral-900 hover:text-emerald-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 bg-white animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
