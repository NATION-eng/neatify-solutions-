import React from 'react';

export default function Logo({ variant = 'dark', size = 'default', showTagline = true }) {
  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-3 cursor-pointer group select-none">
      {/* Monogram Symbol "NS" */}
      <div className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
        size === 'lg' ? 'w-12 h-12 rounded-2xl' : 'w-10 h-10 rounded-xl'
      } ${isLight ? 'bg-white/10 ring-1 ring-white/20' : 'bg-brand-forest shadow-sm ring-1 ring-black/5'}`}>
        {/* Stylized Interlocking NS */}
        <svg viewBox="0 0 100 100" className="w-4/5 h-4/5" fill="none">
          <text 
            x="32" 
            y="68" 
            fill={isLight ? '#FFFFFF' : '#72B743'} 
            fontSize="52" 
            fontWeight="800" 
            fontFamily="'Plus Jakarta Sans', serif"
            letterSpacing="-3"
          >
            N
          </text>
          <text 
            x="52" 
            y="74" 
            fill={isLight ? '#72B743' : '#88D455'} 
            fontSize="46" 
            fontWeight="700" 
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            S
          </text>
        </svg>
        {/* Subtle fresh leaf dot */}
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-leaf ring-2 ring-white"></span>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`font-display font-bold tracking-tight ${
            size === 'lg' ? 'text-2xl' : 'text-xl'
          } ${isLight ? 'text-white' : 'text-charcoal-900'}`}>
            Neatify
          </span>
          <span className={`font-display font-semibold ${
            size === 'lg' ? 'text-2xl' : 'text-xl'
          } ${isLight ? 'text-sage-200' : 'text-sage-500'}`}>
            Solutions
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-semibold font-sans ${
            isLight ? 'text-sage-200/80' : 'text-charcoal-muted'
          }`}>
            Kawartha Lakes, Ontario
          </span>
        )}
      </div>
    </div>
  );
}
