import React from 'react';
import { Sparkles, Compass, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';

export default function CoreActions({ 
  onAskBot, 
  onFindStandards, 
  onComplianceCheck, 
  onUnderstandStandard 
}) {
  const tools = [
    {
      num: "01",
      icon: Sparkles,
      title: "Ask ManakBot",
      description: "Chat with the dedicated regulatory AI assistant. Get grounded answers on IS codes, testing benchmarks, and filing rules.",
      buttonText: "Launch ManakBot",
      onClick: onAskBot,
      tag: "Conversational AI"
    },
    {
      num: "02",
      icon: Compass,
      title: "Find Standards",
      description: "Intelligent product-to-standard discovery. Enter product name, category, and use to identify applicable IS codes and mandatory QCOs.",
      buttonText: "Discover Standards",
      onClick: onFindStandards,
      tag: "Product Discovery"
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Compliance Check",
      description: "Interactive 7-stage roadmap: standard identification, scheme mapping, in-house laboratory setup, documents, and testing.",
      buttonText: "Check Compliance",
      onClick: onComplianceCheck,
      tag: "Statutory Roadmap"
    },
    {
      num: "04",
      icon: BookOpen,
      title: "Understand a Standard",
      description: "Search 572+ Indian Standards, view technical scopes, testing laboratories, documentation checklists, and 50% MSME fee savings.",
      buttonText: "Browse Standards",
      onClick: onUnderstandStandard,
      tag: "Directory & Explorer"
    }
  ];

  return (
    <section id="actions" className="py-14 md:py-16 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Four Core Tools to Simplify Compliance
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-sm">
            Everything an MSME, manufacturer, or consumer needs to navigate the Bureau of Indian Standards ecosystem.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((t, idx) => {
            const IconComp = t.icon;
            return (
              <div
                key={idx}
                onClick={t.onClick}
                className="group p-5 rounded-2xl bg-neutral-50 hover:bg-emerald-50/30 border border-neutral-200 hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 group-hover:border-emerald-300 text-emerald-700 flex items-center justify-center shadow-2xs transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-neutral-200">
                      {t.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-emerald-950 transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                  <span>{t.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
