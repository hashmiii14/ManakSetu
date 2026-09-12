import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onGetStarted }) {
  return (
    <section className="py-16 bg-emerald-900 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Statutory Compliance Made Simple</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Ready to identify standards for your product?
        </h2>

        <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto leading-relaxed">
          Ask questions, explore Indian Standards, and understand BIS requirements in minutes.
        </p>

        <div className="pt-2">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-neutral-100 text-emerald-900 text-sm font-bold transition-colors shadow-sm"
          >
            <span>Ask ManaKSetu Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
