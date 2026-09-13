import React from 'react';

/**
 * ORIGINAL MANAKSETU LOGO MARK
 * 
 * Concept: 
 * Manak (Standard) = Two solid structural foundation pillars
 * Setu (Bridge)    = Clean architectural lintel and connector arch
 * Identity         = Stable, institutional, print-friendly, 2D flat geometric mark
 * 
 * Complies strictly with Master Prompt:
 * - NOT a recreation or modification of the BIS emblem
 * - No 3D, no gradients, no glow, no cartoon ornamentation
 */
export function LogoMark({ className = "w-8 h-8", variant = "default" }) {
  // Color variants: 'default' (gov blue + saffron accent), 'white', 'monochrome'
  const pillarColor = variant === 'white' ? '#FFFFFF' : variant === 'monochrome' ? '#0F172A' : '#0A3871';
  const bridgeColor = variant === 'white' ? '#FDBA74' : variant === 'monochrome' ? '#334155' : '#D97706';
  const baseColor = variant === 'white' ? '#FFFFFF' : variant === 'monochrome' ? '#0F172A' : '#0A3871';

  return (
    <svg 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ManakSetu Institutional Mark"
    >
      {/* Foundation plinth */}
      <rect x="4" y="32" width="32" height="3" rx="0.5" fill={baseColor} />

      {/* Left Standard Pillar (Manak) */}
      <rect x="7" y="15" width="6" height="15" fill={pillarColor} />
      <rect x="5.5" y="13" width="9" height="2" fill={pillarColor} />

      {/* Right Standard Pillar (Manak) */}
      <rect x="27" y="15" width="6" height="15" fill={pillarColor} />
      <rect x="25.5" y="13" width="9" height="2" fill={pillarColor} />

      {/* Connecting Bridge Arch & Deck (Setu) */}
      <path 
        d="M13 19C15 16 25 16 27 19V15H13V19Z" 
        fill={bridgeColor} 
      />
      {/* Upper Arch Connector Bar */}
      <rect x="4" y="8" width="32" height="3" rx="0.5" fill={pillarColor} />
      
      {/* Center Keystone / Calibration Benchmark */}
      <polygon points="20,4 23.5,8 16.5,8" fill={bridgeColor} />
      <rect x="18.5" y="10" width="3" height="12" fill={bridgeColor} />
    </svg>
  );
}

/**
 * Full Horizontal & Compact Logo Component
 */
export default function Logo({ 
  variant = 'default', // 'default' | 'white' | 'monochrome'
  iconOnly = false,
  size = 'default', // 'sm' | 'default' | 'lg'
  className = ''
}) {
  const markSizes = {
    sm: 'w-7 h-7',
    default: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const titleSizes = {
    sm: 'text-base',
    default: 'text-lg sm:text-xl',
    lg: 'text-2xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    default: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs'
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-slate-900';
  const subtitleColor = variant === 'white' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* The Original ManakSetu Architectural Emblem */}
      <div className="shrink-0">
        <LogoMark className={markSizes[size] || markSizes.default} variant={variant} />
      </div>

      {!iconOnly && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold tracking-tight font-sans ${titleSizes[size] || titleSizes.default} ${textColor}`}>
              MANAKSETU
            </span>
          </div>
          <span className={`font-medium tracking-normal ${subtitleSizes[size] || subtitleSizes.default} ${subtitleColor}`}>
            AI-assisted BIS &amp; Standards Guidance
          </span>
        </div>
      )}
    </div>
  );
}
