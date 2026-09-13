import React, { useState, useMemo } from 'react';
import { 
  Bell, FileText, ExternalLink, Calendar, Filter, Search, 
  AlertTriangle, ShieldCheck, ArrowRight, Building2, CheckCircle2
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import ErrorBoundary from '../components/ErrorBoundary';

export default function NewsPage() {
  const { navigate } = useRouter();
  const [selectedMinistry, setSelectedMinistry] = useState('ALL');
  const [filterQuery, setFilterQuery] = useState('');

  const notifications = [
    {
      id: "qco-2026-elec",
      title: "Electrical Appliances for Domestic Use (Quality Control) Order, 2026",
      ministry: "DPIIT",
      gazetteNo: "S.O. 1248(E) / 2026",
      date: "15-February-2026",
      enforcementDate: "01-August-2026",
      microGracePeriod: "12 Months Grace for Micro Enterprises (Up to Aug 2027)",
      standards: ["IS 302-2-3", "IS 302-2-201", "IS 2082"],
      summary: "Mandatory ISI mark requirement notified for immersion water heaters, electric irons, and storage geysers. Substandard imported appliances prohibited at all Indian ports.",
      pdfUrl: "https://www.egazette.gov.in"
    },
    {
      id: "qco-2025-steel",
      title: "Steel and Steel Products (Quality Control) Second Amendment Order, 2025",
      ministry: "Ministry of Steel",
      gazetteNo: "S.O. 4512(E) / 2025",
      date: "10-November-2025",
      enforcementDate: "01-April-2026",
      microGracePeriod: "6 Months Extension for Re-rolling Mills",
      standards: ["IS 1786", "IS 2062"],
      summary: "Tightening chemical and mechanical yield benchmarks for Fe 500D and Fe 550D TMT reinforcement bars. Strict traceability of mill test certificates mandated.",
      pdfUrl: "https://www.egazette.gov.in"
    },
    {
      id: "qco-2025-toys",
      title: "Toys (Safety and Quality Control) Amendment Order, 2025",
      ministry: "DPIIT",
      gazetteNo: "S.O. 3890(E) / 2025",
      date: "20-September-2025",
      enforcementDate: "Immediate Enforcement",
      microGracePeriod: "Exemption only for registered handloom & artisan clusters",
      standards: ["IS 9873 Part 1", "IS 15644"],
      summary: "All electric and mechanical toys for children under 14 years must comply with safety standards for flammability, phthalates, and heavy metal migration.",
      pdfUrl: "https://www.egazette.gov.in"
    },
    {
      id: "qco-2025-it",
      title: "Solar Inverters & Smart Electricity Meters (CRS Inclusion) Order, 2025",
      ministry: "MeitY",
      gazetteNo: "S.O. 2911(E) / 2025",
      date: "05-July-2025",
      enforcementDate: "01-January-2026",
      microGracePeriod: "Concessional testing fee under MSME testing scheme",
      standards: ["IS 16221", "IS 16444"],
      summary: "Grid-interactive solar photovoltaic inverters and smart prepayment meters brought under mandatory Scheme-II Compulsory Registration (CRS).",
      pdfUrl: "https://www.crsbis.in"
    },
    {
      id: "qco-2025-auto",
      title: "Protective Helmets for Two-Wheeler Motor Vehicles Enforcement Circular",
      ministry: "MoRTH",
      gazetteNo: "RT-11036/45/2025",
      date: "18-May-2025",
      enforcementDate: "Active Mandate Nationwide",
      microGracePeriod: "Zero tolerance for non-ISI helmets",
      standards: ["IS 4151"],
      summary: "Strict prohibition of roadside non-certified helmets. Traffic authorities empowered to confiscate and penalize under Motor Vehicles (Amendment) Act.",
      pdfUrl: "https://morth.nic.in"
    }
  ];

  const filtered = useMemo(() => {
    return notifications.filter(item => {
      const matchesMinistry = selectedMinistry === 'ALL' || item.ministry === selectedMinistry;
      const matchesText = !filterQuery.trim() || 
        item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(filterQuery.toLowerCase()) ||
        item.standards.some(s => s.toLowerCase().includes(filterQuery.toLowerCase()));
      return matchesMinistry && matchesText;
    });
  }, [selectedMinistry, filterQuery]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 text-left">
        
        {/* HEADER */}
        <section className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button onClick={() => navigate('/')} className="hover:text-gov-800">Home</button>
              <span>/</span>
              <span className="text-gov-900 font-bold">Gazette Notifications &amp; QCOs</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
                  Quality Control Orders &amp; Gazette Circulars
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  Real-time statutory tracking of Quality Control Orders (QCOs) published by DPIIT, Ministry of Steel, MeitY, and MoRTH with enforcement schedules.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://www.egazette.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-gov-sm transition-colors"
                >
                  <span>e-Gazette of India</span>
                  <ExternalLink className="w-3.5 h-3.5 text-saffron-400" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTROLS BAR */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
          <div className="bg-white rounded-sm border border-slate-300 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            
            {/* Search filter */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by order, product, or IS code..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-sm focus:outline-none focus:border-gov-800"
              />
            </div>

            {/* Ministry pill filters */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['ALL', 'DPIIT', 'Ministry of Steel', 'MeitY', 'MoRTH'].map((min) => (
                <button
                  key={min}
                  onClick={() => setSelectedMinistry(min)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-colors ${
                    selectedMinistry === min
                      ? 'bg-gov-800 text-white font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {min === 'ALL' ? 'All Ministries' : min}
                </button>
              ))}
            </div>

          </div>

          {/* NOTIFICATION CARDS */}
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-sm border border-slate-300 hover:border-gov-800 transition-all p-4 sm:p-5 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-gov-100 text-gov-800 font-bold text-[11px]">
                      {item.ministry}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {item.gazetteNo}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Published: {item.date}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gov-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900">
                    <span className="font-bold block">Enforcement Date:</span>
                    <span>{item.enforcementDate}</span>
                  </div>

                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold block">MSME Relief Extension:</span>
                    <span>{item.microGracePeriod}</span>
                  </div>
                </div>

                {/* Covered standards */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-500 font-medium">Covered Standards:</span>
                    {item.standards.map((std, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(`/standards/search?q=${encodeURIComponent(std)}`)}
                        className="px-2 py-0.5 rounded bg-slate-100 hover:bg-gov-50 text-gov-800 border border-slate-200 font-mono font-bold text-[11px] transition-colors"
                      >
                        {std}
                      </button>
                    ))}
                  </div>

                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-gov-800 hover:text-gov-950 inline-flex items-center gap-1"
                  >
                    <span>View Gazette Notice</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </ErrorBoundary>
  );
}
