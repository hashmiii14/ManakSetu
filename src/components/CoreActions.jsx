import React from 'react';
import { Search, MessageSquare, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';

export default function CoreActions({ 
  onFindStandard, 
  onAskQuestion, 
  onVerifyConsumer, 
  onBrowseAll 
}) {
  const actions = [
    {
      num: "01",
      icon: Search,
      title: "Find a Product Standard",
      description: "Search your product (e.g. Geyser, Water, Toys, Helmet) to instantly see its official IS code and mandatory government rules.",
      buttonText: "Check Product Now",
      onClick: onFindStandard,
      tag: "Most Popular"
    },
    {
      num: "02",
      icon: MessageSquare,
      title: "Ask Compliance Question",
      description: "Ask about certification costs, required documents, lab testing benchmarks, or licensing steps in plain language.",
      buttonText: "Ask ManaKSetu",
      onClick: onAskQuestion,
      tag: "AI Assistant"
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Verify Gold Hallmark or ISI Mark",
      description: "Check a 6-digit Gold HUID code or 7-digit ISI CML number to verify if a product or jewel is authentic.",
      buttonText: "Verify Authenticity",
      onClick: onVerifyConsumer,
      tag: "Consumer Tool"
    },
    {
      num: "04",
      icon: BookOpen,
      title: "Browse Standards Directory",
      description: "Explore the directory of 21,000+ Indian Standards categorized by electronics, food, construction, and automotive.",
      buttonText: "Browse Directory",
      onClick: onBrowseAll,
      tag: "Full Catalog"
    }
  ];

  return (
    <section id="actions" className="py-14 bg-neutral-50/60 border-b border-neutral-200 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-8 max-w-xl">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Simple & Direct
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            What would you like to do?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Pick one of the 4 clear actions below to get started immediately:
          </p>
        </div>

        {/* 4 Clean Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-500 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 font-mono">
                      {act.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100">
                  <button
                    onClick={act.onClick}
                    className="w-full py-2 px-3 rounded-lg bg-neutral-50 hover:bg-emerald-600 text-neutral-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{act.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
