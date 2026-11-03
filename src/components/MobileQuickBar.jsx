import React from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';

export default function MobileQuickBar({ onOpenQuote }) {
  return (
    <div className="sm:hidden fixed bottom-4 inset-x-4 z-40">
      <div className="bg-charcoal-900/95 backdrop-blur-xl border border-charcoal-700/80 rounded-full p-2 shadow-2xl flex items-center justify-between gap-2">
        
        {/* Direct Call Dial Button */}
        <a
          href="tel:4169105281"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-white text-xs font-semibold py-2.5 px-3 rounded-full transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-brand-leaf" />
          <span>Call Us</span>
        </a>

        {/* Request Quote Button */}
        <button
          onClick={onOpenQuote}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-forest hover:bg-brand-deep text-white text-xs font-semibold py-2.5 px-3 rounded-full transition-colors"
        >
          <span>Get a Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-brand-leaf" />
        </button>

      </div>
    </div>
  );
}
