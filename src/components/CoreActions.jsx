import React from 'react';
import { MessageSquare, Search, FileCheck2, Compass, ArrowRight } from 'lucide-react';

export default function CoreActions({ 
  onAskQuestion, 
  onFindStandard, 
  onUnderstandRequirements, 
  onGetGuidance 
}) {
  const actions = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Ask ManaKSetu",
      description: "Get answers about Indian Standards and BIS requirements in plain, accessible language.",
      buttonText: "Ask Question",
      onClick: onAskQuestion,
      accent: "border-emerald-200 hover:border-emerald-500 bg-white"
    },
    {
      step: "02",
      icon: Search,
      title: "Find a Standard",
      description: "Search and discover relevant Indian Standards, IS codes, and applicable categories.",
      buttonText: "Search Standards",
      onClick: onFindStandard,
      accent: "border-neutral-200 hover:border-emerald-500 bg-white"
    },
    {
      step: "03",
      icon: FileCheck2,
      title: "Understand Requirements",
      description: "Get complicated regulatory information, mandatory QCOs, and testing parameters explained simply.",
      buttonText: "View Requirements",
      onClick: onUnderstandRequirements,
      accent: "border-neutral-200 hover:border-emerald-500 bg-white"
    },
    {
      step: "04",
      icon: Compass,
      title: "Get Guidance",
      description: "Follow a clear 5-stage step-by-step roadmap from application filing to grant of license.",
      buttonText: "Explore Roadmap",
      onClick: onGetGuidance,
      accent: "border-neutral-200 hover:border-emerald-500 bg-white"
    }
  ];

  return (
    <section id="actions" className="py-16 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-10 max-w-xl">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Core Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            What can you do?
          </h2>
          <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
            Choose what you need assistance with. Every tool provides verified, statutory guidance without unnecessary complexity.
          </p>
        </div>

        {/* 4 Clean Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border ${act.accent} shadow-xs hover:shadow-sm transition-all flex flex-col justify-between text-left group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      {act.step}
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>{act.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
