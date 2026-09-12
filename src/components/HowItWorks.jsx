import React from 'react';
import { Search, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Tell us what you need",
      description: "Enter your manufactured product name or ask any regulatory compliance question."
    },
    {
      num: "02",
      icon: Sparkles,
      title: "ManaKSetu finds & explains",
      description: "Our system identifies the governing IS Code, Quality Control Orders, and scheme requirements."
    },
    {
      num: "03",
      icon: FileText,
      title: "Review requirements",
      description: "Inspect mandatory test benchmarks, required documentation, and calculate MSME fee concessions."
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: "Take the next step",
      description: "Follow the 5-stage roadmap to apply with complete preparation on the official Manakonline portal."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Section Heading */}
        <div className="mb-12 max-w-xl">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Simple Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
            From initial product inquiry to formal licensing application in four straightforward steps.
          </p>
        </div>

        {/* 4 Steps Grid (Horizontal on desktop, vertical on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="bg-neutral-50 p-5 rounded-xl border border-neutral-200 flex flex-col justify-between text-left space-y-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      STEP {s.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 leading-snug">
                    {s.title}
                  </h3>

                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-200/60 text-[11px] font-medium text-emerald-700">
                  {idx === 0 && "Instant keyword lookup"}
                  {idx === 1 && "21,000+ Standards mapped"}
                  {idx === 2 && "50% MSME concession computed"}
                  {idx === 3 && "Direct Manakonline application"}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
