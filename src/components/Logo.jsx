import React from 'react';

export default function Logo({ variant = 'dark', size = 'default', showTagline = true }) {
  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none">
      {/* EXACT Logo Image as requested */}
      <div className="relative flex-shrink-0">
        <img
          src="/assets/images/neatify_logo.jpg"
          alt="Neatify Solutions NS Logo"
          className={`object-contain rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 border border-black/10 ${
            size === 'lg' ? 'w-11 h-11 sm:w-12 sm:h-12' : 'w-9 h-9 sm:w-10 sm:h-10'
          }`}
        />
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className={`font-display font-bold tracking-tight ${
            size === 'lg' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          } ${isLight ? 'text-white' : 'text-charcoal-900'}`}>
            Neatify
          </span>
          <span className={`font-display font-semibold ${
            size === 'lg' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          } ${isLight ? 'text-sage-200' : 'text-sage-500'}`}>
            Solutions
          </span>
        </div>
        {showTagline && (
          <span className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold font-sans mt-0.5 ${
            isLight ? 'text-sage-200/80' : 'text-charcoal-muted'
          }`}>
            Kawartha Lakes, ON
          </span>
        )}
      </div>
    </div>
  );
}
