import React from 'react';
import { ArrowUpRight, Phone, Sparkles, ShieldCheck, Leaf, MapPin, Star } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  const heroImageUrl = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80";

  return (
    <section id="home" className="relative pt-3 sm:pt-4 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* The CleanSpace Framed Viewport Container */}
        <div className="relative overflow-hidden bg-white rounded-3xl lg:rounded-[2.5rem] shadow-card border border-sage-100">
          
          {/* MOBILE ONLY: Seamless Blended Top Background (Merged Desktop Feel) */}
          <div className="absolute inset-x-0 top-0 h-[420px] lg:hidden pointer-events-none z-0 overflow-hidden">
            <img 
              src={heroImageUrl} 
              alt="Neatify clean Scandinavian living space" 
              className="w-full h-full object-cover object-top opacity-60 filter brightness-[1.03]"
              loading="eager"
            />
            {/* Directional feather masks: fade down into white and fade from left */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[620px] relative z-10">
            
            {/* Content Column (Mobile: overlaying the blended image; Desktop: Left column) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-transparent lg:bg-gradient-to-r lg:from-white lg:via-white/95 lg:to-transparent">
              
              <div className="space-y-4 sm:space-y-6 max-w-xl">
                
                {/* Eyebrow Category Badge with floating glass pill on mobile */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/60 lg:border-none lg:bg-transparent lg:p-0">
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-charcoal-700 lg:text-charcoal-muted">
                    Professional Cleaning Services
                  </span>
                  <div className="h-[1px] w-8 sm:w-16 bg-sage-300"></div>
                </div>

                {/* Main Dynamic Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-charcoal-900 leading-[1.12]">
                  A Cleaner Home <br />
                  <span className="text-brand-forest">A Happier You</span>
                </h1>

                {/* Subtitle with Regional Context */}
                <p className="text-sm sm:text-base lg:text-lg text-charcoal-800 lg:text-charcoal-muted leading-relaxed font-normal">
                  Trusted cleaning services for homes, workplaces, and vacation rentals throughout{' '}
                  <span className="font-semibold text-charcoal-900">Lindsay, Bobcaygeon, Fenelon Falls</span>, and the Kawartha Lakes. Fresh spaces, healthier living.
                </p>

                {/* Action Buttons: Stacked on small screens, row on sm+ */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                  
                  {/* Primary CTA Pill */}
                  <button
                    onClick={onOpenQuote}
                    className="group w-full sm:w-auto inline-flex items-center justify-between sm:justify-center gap-3 bg-brand-forest hover:bg-brand-deep text-white text-sm sm:text-base font-semibold pl-5 pr-2 py-2.5 rounded-full shadow-float transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Book a Cleaning</span>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 group-hover:bg-brand-leaf text-white flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </button>

                  {/* Secondary Click-to-Call */}
                  <a
                    href="tel:4169105281"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-charcoal-800 hover:text-brand-forest bg-white/90 lg:bg-sage-50 hover:bg-white border border-sage-200/80 px-5 py-2.5 sm:py-3 rounded-full shadow-sm lg:shadow-none transition-all duration-200"
                  >
                    <Phone className="w-4 h-4 text-sage-600" />
                    <span>(416) 910-5281</span>
                  </a>

                </div>

                {/* Service Area Indicator Pill */}
                <div className="pt-1 flex items-center gap-2 text-[11px] sm:text-xs text-charcoal-muted">
                  <MapPin className="w-3.5 h-3.5 text-brand-leaf flex-shrink-0" />
                  <span>HQ: 164 Colborne St. West, Lindsay • Serving Kawartha Lakes</span>
                </div>

              </div>

              {/* Bottom Trust Badges (Compact on mobile, 3-col on desktop) */}
              <div className="pt-6 lg:pt-10 mt-6 border-t border-sage-100/90">
                <div className="grid grid-cols-3 gap-2 sm:gap-5">
                  
                  {/* Badge 1 */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sage-100/90 text-brand-forest flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-sm font-bold text-charcoal-900 leading-snug">
                        100% Satisfied
                      </div>
                      <div className="hidden sm:block text-[10px] sm:text-[11px] text-charcoal-muted">Guarantee</div>
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sage-100/90 text-brand-forest flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-sm font-bold text-charcoal-900 leading-snug">
                        Trusted
                      </div>
                      <div className="hidden sm:block text-[10px] sm:text-[11px] text-charcoal-muted">Professionals</div>
                    </div>
                  </div>

                  {/* Badge 3 */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sage-100/90 text-brand-forest flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-sm font-bold text-charcoal-900 leading-snug">
                        Eco-Friendly
                      </div>
                      <div className="hidden sm:block text-[10px] sm:text-[11px] text-charcoal-muted">Conscious Care</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* DESKTOP ONLY: Dedicated Right Column (Side-by-side with horizontal feather mask) */}
            <div className="hidden lg:block lg:col-span-5 relative min-h-full overflow-hidden bg-sage-50">
              
              <img 
                src={heroImageUrl} 
                alt="Professional Neatify cleaner providing spotless cleaning in a modern living space" 
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-100"
                loading="eager"
              />

              {/* Seamless feathering gradient blending into left column on desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent pointer-events-none"></div>

              {/* Floating review/stat card overlay on desktop */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-float border border-white/60 max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs font-bold text-charcoal-900">5.0 Star Care</span>
                </div>
                <p className="text-[11px] text-charcoal-muted leading-tight">
                  Spotless homes & rental turnovers across Kawartha Lakes.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
