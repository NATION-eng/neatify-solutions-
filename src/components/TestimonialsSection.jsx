import React from 'react';
import { Star, CheckCircle, Quote, ArrowUpRight } from 'lucide-react';

export default function TestimonialsSection({ onOpenQuote }) {
  const testimonials = [
    {
      id: 1,
      quote:
        "Neatify has transformed our cottage rental turnovers. Guests regularly compliment the immaculate cleanliness, and their team is always prompt between check-out and arrival.",
      name: "Sarah M.",
      role: "Cottage Owner & Superhost",
      location: "Bobcaygeon, ON",
      service: "Airbnb & Cottage Turnover",
      rating: 5
    },
    {
      id: 2,
      quote:
        "Having Neatify handle our bi-weekly house cleaning has been a game-changer. They are thorough, respectful, and never cut corners on baseboards or bathrooms.",
      name: "David & Lisa T.",
      role: "Homeowners",
      location: "Lindsay, ON",
      service: "Residential Cleaning",
      rating: 5
    },
    {
      id: 3,
      quote:
        "Professional, reliable, and discreet. Our clinic space is spotless and welcoming every morning. Highly recommended for any business in Kawartha Lakes.",
      name: "Dr. Robert K.",
      role: "Medical Clinic Director",
      location: "Kawartha Lakes, ON",
      service: "Commercial Cleaning",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-sage-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sage-100 text-brand-forest text-xs font-bold tracking-wider uppercase mb-3 font-display">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Verified Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Trusted by Homeowners, Hosts & Businesses
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
            See why property owners across Kawartha Lakes rely on Neatify Solutions for meticulous, worry-free cleaning.
          </p>

          {/* Social Proof Aggregate Pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-50 border border-sage-200 text-xs font-semibold text-charcoal-800">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>5.0 Average Rating Across Kawartha Lakes</span>
          </div>
        </div>

        {/* 3-Column Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#FAFCF8] rounded-3xl p-6 sm:p-8 border border-sage-100 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-sage-300 rotate-180" />
                </div>

                {/* Review Text */}
                <p className="text-charcoal-800 text-sm leading-relaxed mb-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Service Badge */}
              <div className="pt-4 border-t border-sage-100">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-sm text-charcoal-900">
                    {t.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-forest">
                    <CheckCircle className="w-3 h-3 text-brand-leaf" />
                    Verified Client
                  </span>
                </div>
                <div className="text-xs text-charcoal-muted">
                  {t.role} • {t.location}
                </div>
                <div className="mt-2.5 inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-sage-200 text-charcoal-700">
                  {t.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 bg-brand-forest hover:bg-brand-deep text-white text-xs sm:text-sm font-semibold pl-5 pr-2 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Experience the Neatify Difference</span>
            <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
