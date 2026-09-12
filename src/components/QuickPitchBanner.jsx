import React from 'react';
import { PlayCircle, Sparkles } from 'lucide-react';

export const PITCH_DEMOS = [
  {
    title: "⚡ Electric Geyser (IS 2082)",
    query: "electric geyser",
    desc: "Demonstrates Mandatory QCO, 50% MSME fee discount, and high-voltage dielectric testing."
  },
  {
    title: "🧸 Infant Toys (IS 9873)",
    query: "toys",
    desc: "DPIIT Toy Safety Order, choking hazard test, and chemical heavy-metal migration."
  },
  {
    title: "💧 Packaged Water (IS 14543)",
    query: "packaged water",
    desc: "Microbiological safety (E. coli, coliforms) and in-house laboratory mandate."
  },
  {
    title: "🔌 Sockets & Plugs (IS 1293)",
    query: "plug",
    desc: "Glow-wire fire resistance test and electrical pin tolerance standard."
  }
];

export default function QuickPitchBanner({ onSelectDemo, lang }) {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="text-xs font-black text-amber-900 uppercase tracking-wider">
              {lang === 'hi' ? 'जज लाइव पिच शॉर्टकट:' : 'SIH Jury Live Pitch Shortcuts:'}
            </span>
            <span className="text-xs text-amber-800 ml-1.5 hidden lg:inline">
              (1-Click trigger test scenarios without typing delays)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {PITCH_DEMOS.map((demo, idx) => (
            <button
              key={idx}
              onClick={() => onSelectDemo(demo.query)}
              className="group flex items-center gap-1.5 bg-white hover:bg-amber-100/80 text-amber-950 px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-300 shadow-2xs transition-all hover:scale-102"
              title={demo.desc}
            >
              <PlayCircle className="w-3 h-3 text-amber-600 group-hover:text-amber-800" />
              <span>{demo.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
