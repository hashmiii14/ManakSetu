import React from 'react';

/**
 * ManakSetu Brand Logo
 * Concept: "Setu" (Bridge) + Certification Shield + Verification Checkmark
 */
export default function Logo({ className = '', iconOnly = false, size = 'default' }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    default: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    default: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Setu Bridge + Shield SVG Icon */}
      <div 
        className={`${iconSizes[size] || iconSizes.default} rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-900/20 shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Bridge Arch */}
          <path
            d="M5 21C7 16 11 13 16 13C21 13 25 16 27 21"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Bridge Pillars */}
          <path
            d="M10 21V16M22 21V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Center Checkmark / Verification Star */}
          <path
            d="M13 10L15.5 12.5L20 8"
            stroke="#A7F3D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className={`font-extrabold tracking-tight text-neutral-900 ${textSizes[size] || textSizes.default}`}>
              ManaK<span className="text-emerald-700">Setu</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mb-2"></span>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-600">
            Indian Standards AI
          </span>
        </div>
      )}
    </div>
  );
}
