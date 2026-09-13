import React, { useState, useMemo } from 'react';
import { 
  FlaskConical, MapPin, Phone, Mail, Navigation, ExternalLink, 
  Search, Filter, CheckCircle2, Clock, ShieldCheck, Copy, Check, Compass
} from 'lucide-react';
import { NABL_LABS_DIRECTORY, BIS_STANDARDS } from '../data/bisStandards';

// Helper: Haversine distance in kilometers
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return Math.round(R * c);
}

export default function LabLocator({ initialStandard = 'ALL' }) {
  const [selectedStandard, setSelectedStandard] = useState(initialStandard);
  const [selectedState, setSelectedState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [userCoords, setUserCoords] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // States list for filter
  const stateOptions = useMemo(() => {
    const states = new Set(NABL_LABS_DIRECTORY.map(lab => lab.state));
    return ['ALL', ...Array.from(states).sort()];
  }, []);

  // Standard options for filter
  const standardOptions = useMemo(() => {
    return [
      { code: 'ALL', label: 'All Applicable Standards' },
      ...BIS_STANDARDS.map(s => ({ code: s.isCode, label: `${s.isCode} (${s.keywords[0]})` }))
    ];
  }, []);

  const handleLocateMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            label: "Your Device Location"
          });
          setIsLocating(false);
        },
        () => {
          // Graceful fallback to New Delhi center for demo
          setUserCoords({
            lat: 28.6139,
            lng: 77.2090,
            label: "New Delhi Center (Demo)"
          });
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      setUserCoords({
        lat: 28.6139,
        lng: 77.2090,
        label: "New Delhi Center (Demo)"
      });
      setIsLocating(false);
    }
  };

  const filteredLabs = useMemo(() => {
    return NABL_LABS_DIRECTORY.map(lab => {
      let distanceKm = null;
      if (userCoords) {
        distanceKm = getDistanceFromLatLonInKm(userCoords.lat, userCoords.lng, lab.lat, lab.lng);
      }
      return { ...lab, distanceKm };
    }).filter(lab => {
      // Standard filter
      if (selectedStandard !== 'ALL') {
        const matchesStd = lab.applicableStandards.some(std => 
          std.toLowerCase().includes(selectedStandard.toLowerCase()) ||
          selectedStandard.toLowerCase().includes(std.toLowerCase())
        );
        if (!matchesStd) return false;
      }
      // State filter
      if (selectedState !== 'ALL' && lab.state !== selectedState) {
        return false;
      }
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = lab.name.toLowerCase().includes(q);
        const inCity = lab.city.toLowerCase().includes(q);
        const inScope = lab.scopes.some(s => s.toLowerCase().includes(q));
        const inCode = lab.accreditationCode.toLowerCase().includes(q);
        if (!inName && !inCity && !inScope && !inCode) return false;
      }
      return true;
    }).sort((a, b) => {
      if (a.distanceKm !== null && b.distanceKm !== null) {
        return a.distanceKm - b.distanceKm;
      }
      return a.name.localeCompare(b.name);
    });
  }, [selectedStandard, selectedState, searchQuery, userCoords]);

  const handleCopyLab = (lab) => {
    const text = `${lab.name}\n${lab.accreditationCode}\n${lab.address}\nContact: ${lab.contactPerson} (${lab.phone}) | ${lab.email}`;
    navigator.clipboard.writeText(text);
    setCopiedId(lab.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Control Bar: Filters & Geolocation Button */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
              NABL & BIS Recognized Testing Network
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
              Find Accredited Laboratories for Sample Testing
            </h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              Locate NABL accredited laboratories authorized to conduct statutory sample verification under Scheme-I & CRS.
            </p>
          </div>

          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 disabled:opacity-50"
          >
            <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{userCoords ? `Near: ${userCoords.label}` : 'Find Nearest Labs to Me'}</span>
          </button>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-100">
          {/* 1. Standard Filter */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-700 mb-1">
              Filter by Product Standard:
            </label>
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {standardOptions.map((opt, i) => (
                <option key={i} value={opt.code}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* 2. State Filter */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-700 mb-1">
              Filter by State / UT:
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {stateOptions.map((st, i) => (
                <option key={i} value={st}>{st === 'ALL' ? 'All States & UTs' : st}</option>
              ))}
            </select>
          </div>

          {/* 3. Keyword Search */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-700 mb-1">
              Search Lab or Scope:
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Geyser, High Voltage, ARAI, Mumbai"
                className="w-full pl-8 pr-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Active Results Summary */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 pt-1">
          <span>Showing <strong>{filteredLabs.length}</strong> accredited laboratories in national network</span>
          {userCoords && (
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Navigation className="w-3 h-3 text-emerald-600" />
              Sorted by proximity from {userCoords.label}
            </span>
          )}
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLabs.map((lab) => (
          <div 
            key={lab.id} 
            className="bg-white rounded-2xl border border-neutral-200 hover:border-emerald-400 p-5 shadow-2xs hover:shadow-xs transition-all space-y-4 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {lab.accreditationCode}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-900 mt-1.5 leading-snug">
                    {lab.name}
                  </h4>
                  <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{lab.city}, {lab.state}</span>
                  </p>
                </div>

                {lab.distanceKm !== null && (
                  <span className="shrink-0 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs border border-emerald-200 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-emerald-600" />
                    {lab.distanceKm} km
                  </span>
                )}
              </div>

              {/* Scopes */}
              <div className="mt-3 space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Accredited Test Capabilities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {lab.scopes.map((sc, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-neutral-50 text-neutral-700 border border-neutral-200"
                    >
                      {sc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standards Recognized */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-neutral-700">Standards:</span>
                <span className="line-clamp-1 font-mono text-[11px] text-neutral-600">
                  {lab.applicableStandards.join(', ')}
                </span>
              </div>

              {/* Turnaround Time */}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50/70 px-2.5 py-1 rounded-lg border border-amber-200/80">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Estimated turnaround: <strong>{lab.turnaroundTime}</strong></span>
              </div>
            </div>

            {/* Footer Contact & Actions */}
            <div className="pt-3 border-t border-neutral-100 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                <div className="flex items-center gap-1.5 truncate">
                  <Phone className="w-3 h-3 text-neutral-400 shrink-0" />
                  <a href={`tel:${lab.phone}`} className="hover:text-emerald-700 truncate font-medium">
                    {lab.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 text-neutral-400 shrink-0" />
                  <a href={`mailto:${lab.email}`} className="hover:text-emerald-700 truncate font-medium">
                    {lab.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => handleCopyLab(lab)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-neutral-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  {copiedId === lab.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-neutral-400" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lab.name} ${lab.city}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold inline-flex items-center gap-1 border border-emerald-200 transition-colors"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 text-emerald-600" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
