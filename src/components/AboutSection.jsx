import React from 'react';
import { ShieldCheck, Users, Factory, Award, Building2, CheckCircle2, FileCheck, Scale } from 'lucide-react';

export default function AboutSection() {
  const userAudiences = [
    {
      title: "MSMEs & Startups",
      desc: "Unlock 50% marking fee concessions and step-by-step guidance on setting up cost-effective in-house test benches.",
      icon: Factory
    },
    {
      title: "Manufacturers & Importers",
      desc: "Navigate mandatory Quality Control Orders (QCOs), avoid Section 29 penalties, and file Form-I smoothly.",
      icon: Building2
    },
    {
      title: "Compliance & QA Teams",
      desc: "Instant cross-referencing across 572+ Indian Standards, NABL lab directories, and testing frequency tables.",
      icon: FileCheck
    },
    {
      title: "Consumers & Citizens",
      desc: "Verify 6-digit Hallmark HUID gold purity and 7-digit ISI CML licenses to protect against substandard goods.",
      icon: Users
    }
  ];

  return (
    <section id="about" className="py-14 md:py-20 bg-white border-b border-neutral-200 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bridging Industry & Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            About ManakSetu (मानक सेतु)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            In Hindi, <strong>"Setu" means bridge</strong>. ManakSetu bridges the gap between dense technical Indian Standards, statutory BIS compliance mandates, and Indian manufacturers.
          </p>
        </div>

        {/* 3 Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              What is ManakSetu?
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              An AI-powered regulatory assistant combining BM25 keyword search, semantic vector retrieval, and grounded language models over the official Bureau of Indian Standards compendium.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Why Does It Exist?
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              India has notified mandatory QCOs for hundreds of daily products. Non-compliance risks supply-chain disruption. ManakSetu simplifies technical IS jargon into clear actionable roadmaps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Statutory Transparency
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              ManakSetu provides AI-assisted informational guidance. It does not replace official BIS statutory determinations. Users are directly routed to <strong>www.manakonline.in</strong> for formal licensing.
            </p>
          </div>
        </div>

        {/* Who is it for */}
        <div className="space-y-4">
          <h3 className="text-center text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Designed for the Indian Manufacturing Ecosystem
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userAudiences.map((aud, idx) => {
              const IconComp = aud.icon;
              return (
                <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-emerald-500 transition-colors space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900">
                    {aud.title}
                  </h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    {aud.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
