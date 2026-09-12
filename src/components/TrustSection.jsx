import React from 'react';
import { ShieldCheck, BookOpen, Layers, ExternalLink, Award } from 'lucide-react';

export default function TrustSection() {
  const pillars = [
    {
      icon: BookOpen,
      title: "Statutory Standards Alignment",
      description: "Directly referenced from published Bureau of Indian Standards (BIS) specifications and statutory Quality Control Orders (QCOs)."
    },
    {
      icon: ShieldCheck,
      title: "Legal Framework Compliance",
      description: "Structured according to the Bureau of Indian Standards Act, 2016 and the Consumer Protection Act, 2019."
    },
    {
      icon: Layers,
      title: "MSME Enablement & Transparency",
      description: "Applies transparent concession schedules established by the Ministry of MSME for Micro and Small manufacturing units."
    },
    {
      icon: ExternalLink,
      title: "Direct Official Portals",
      description: "Provides direct links to official statutory e-governance systems including Manakonline and the National Consumer Helpline."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50/50 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
        
        {/* Section Heading */}
        <div className="mb-10 max-w-xl">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Transparency & Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Designed for Regulatory Clarity
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
            ManaKSetu is built to eliminate bureaucratic ambiguity by connecting manufacturers and consumers directly with verified Indian statutory standards.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 mb-1.5 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
