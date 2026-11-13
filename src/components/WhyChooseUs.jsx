import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function WhyChooseUs({ onOpenQuote }) {
  const points = [
    {
      icon: MapPin,
      title: 'Local to Kawartha Lakes',
      description: 'Locally based in Kawartha Lakes, Ontario. Serving Lindsay, Bobcaygeon, Fenelon Falls, and surrounding communities.'
    },
    {
      icon: Sparkles,
      title: 'Meticulous Attention to Detail',
      description: 'Uncompromising standards—from deep baseboard dusting to sanitizing high-touch surfaces.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Turnovers, recurring home cleans, or after-hours office care adapted to your calendar.'
    },
    {
      icon: HeartHandshake,
      title: 'Direct, Respectful Communication',
      description: 'Real local support. We personally review every inquiry and keep you informed every step.'
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-sage-50/70 border-y border-sage-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-forest text-xs font-bold tracking-wider uppercase font-display border border-sage-200">
              Why Neatify Solutions
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight leading-tight">
              A Local Cleaning Partner You Can Count On
            </h2>
            
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Dependable, spotless cleaning with transparent communication and care you can trust. We treat your property with the same dignity and attention we give our own.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 bg-brand-forest hover:bg-brand-deep text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Request Your Free Quote</span>
                <span className="text-brand-leaf font-bold">↗</span>
              </button>
            </div>
          </div>

          {/* Right Grid of Trust Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {points.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white p-6 rounded-3xl border border-sage-100 shadow-subtle hover:border-sage-200 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-2xl bg-sage-100 text-brand-forest flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-charcoal-900 mb-1.5">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
