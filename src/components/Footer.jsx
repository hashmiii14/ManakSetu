import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Code2, Users } from 'lucide-react';

export default function Footer({ lang }) {
  const teamMembers = [
    { name: "Hashmi", role: "Team Lead & AI Full-Stack" },
    { name: "Huzaifa", role: "Frontend & UI Developer" },
    { name: "Tanzil", role: "Pitch Lead & Presenter" },
    { name: "Zia", role: "Domain & Policy Lead" },
    { name: "Ashad", role: "Pitch Deck & Visuals Lead" },
    { name: "Sharique", role: "QA & Live Demo Specialist" }
  ];

  return (
    <footer className="mt-16 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About Platform */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
                MS
              </div>
              <h3 className="text-lg font-black tracking-tight">
                ManakSetu <span className="text-xs text-amber-400 font-semibold">(मानक सेतु)</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              AI-Powered Intelligent Assistant for Indian Standards and BIS Services.
              Developed for <strong>Smart India Hackathon 2026</strong> (Problem Statement ID: <strong>26107</strong>), 
              under Department of Consumer Affairs (DoCA), Ministry of Consumer Affairs, Food & Public Distribution.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                Team SnippetSquad
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                Jamia Hamdard, New Delhi
              </span>
            </div>
          </div>

          {/* Col 2: Official Statutory Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Official BIS Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  Manakonline Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  Bureau of Indian Standards (BIS) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://consumerhelpline.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  National Consumer Helpline (NCH 1915) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  Know Your Standards Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Team Credits */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              SnippetSquad (Jamia Hamdard)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              {teamMembers.map((m, idx) => (
                <div key={idx} className="bg-slate-800/60 p-1.5 rounded-lg border border-slate-800">
                  <span className="font-bold text-white block">{m.name}</span>
                  <span className="text-[10px] text-slate-400">{m.role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Notice */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 ManakSetu • Built for Smart India Hackathon • Promoting 'Make in India' & 'Zero Defect Zero Effect'</p>
          <p className="flex items-center gap-1">
            Complies with Bureau of Indian Standards Act, 2016
          </p>
        </div>
      </div>
    </footer>
  );
}
