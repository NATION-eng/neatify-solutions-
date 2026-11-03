import React from 'react';
import { ArrowUpRight, Phone, Sparkles, ShieldCheck, Leaf, MapPin } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  return (
    <section id="home" className="relative pt-4 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* The CleanSpace Framed Viewport Container */}
        <div className="relative overflow-hidden bg-white rounded-3xl lg:rounded-[2.5rem] shadow-card border border-sage-100/80">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[620px]">
            
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 z-10 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-white via-white/95 to-white/60 lg:to-transparent">
              
              <div className="space-y-6 max-w-xl">
                
                {/* Eyebrow Category Badge */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-charcoal-muted">
                    Professional Cleaning Services
                  </span>
                  <div className="h-[1px] w-16 bg-sage-300"></div>
                </div>

                {/* Main Dynamic Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-charcoal-900 leading-[1.12]">
                  A Cleaner Home <br />
                  <span className="text-brand-forest">A Happier You</span>
                </h1>

                {/* Subtitle with Regional Context */}
                <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-normal">
                  Trusted cleaning services for homes, workplaces, and vacation rentals throughout{' '}
                  <span className="font-medium text-charcoal-800">Lindsay, Bobcaygeon, Fenelon Falls</span>, and the Kawartha Lakes. Fresh spaces, healthier living.
                </p>

                {/* Primary & Secondary Call to Action */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  
                  {/* Primary CTA Pill matching CleanSpace reference */}
                  <button
                    onClick={onOpenQuote}
                    className="group inline-flex items-center gap-3 bg-brand-forest hover:bg-brand-deep text-white text-sm sm:text-base font-semibold pl-6 pr-2 py-2 rounded-full shadow-float transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Book a Cleaning</span>
                    <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-brand-leaf text-white flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </button>

                  {/* Secondary Click-to-Call */}
                  <a
                    href="tel:4169105281"
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-charcoal-800 hover:text-brand-forest bg-sage-50/80 hover:bg-sage-100/90 border border-sage-200/60 px-5 py-3 rounded-full transition-all duration-200"
                  >
                    <Phone className="w-4 h-4 text-sage-600" />
                    <span>(416) 910-5281</span>
                  </a>

                </div>

                {/* Service Area Indicator Pill */}
                <div className="pt-1 flex items-center gap-2 text-xs text-charcoal-muted">
                  <MapPin className="w-3.5 h-3.5 text-brand-leaf flex-shrink-0" />
                  <span>HQ: 164 Colborne St. West, Lindsay • Serving all Kawartha Lakes</span>
                </div>

              </div>

              {/* Bottom Trust Badges (Exact CleanSpace Reference Layout) */}
              <div className="pt-8 lg:pt-12 mt-6 border-t border-sage-100/80">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  
                  {/* Badge 1 */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sage-100/90 text-brand-forest flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-charcoal-900 leading-snug">
                        100% Satisfaction
                      </div>
                      <div className="text-[11px] text-charcoal-muted">Quality Guarantee</div>
                    </div>
                  </div>

                  {/* Badge 2 */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sage-100/90 text-brand-forest flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-charcoal-900 leading-snug">
                        Trusted
                      </div>
                      <div className="text-[11px] text-charcoal-muted">Local Professionals</div>
                    </div>
                  </div>

                  {/* Badge 3 */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-sage-100/90 text-brand-forest flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-charcoal-900 leading-snug">
                        Eco-Friendly
                      </div>
                      <div className="text-[11px] text-charcoal-muted">Conscious Products</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: High-Key Scandinavian Living Room with Cleaners */}
            <div className="lg:col-span-5 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-sage-50">
              
              {/* High-definition photographic representation */}
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80" 
                alt="Professional Neatify cleaner providing spotless cleaning in a modern living space" 
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-100"
              />

              {/* Seamless feathering gradient blending into left column */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent hidden lg:block pointer-events-none"></div>
              
              {/* Top & bottom subtle ambient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:hidden pointer-events-none"></div>

              {/* Floating review/stat card overlay on desktop */}
              <div className="absolute bottom-6 right-6 hidden xl:block bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-float border border-white/60 max-w-[220px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs font-bold text-charcoal-900">5.0 Star Care</span>
                </div>
                <p className="text-[11px] text-charcoal-muted leading-tight">
                  Providing spotless homes & rental turnovers across Kawartha Lakes.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
