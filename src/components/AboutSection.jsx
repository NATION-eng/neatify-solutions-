import React from 'react';
import { Sparkles, Users, Award, Shield } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-sage-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with Clean Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] bg-sage-50">
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
                alt="Neatify Solutions team providing organized cleaning care"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/60">
                <div className="font-display font-bold text-sm text-charcoal-900">
                  Neatify Solutions Inc.
                </div>
                <div className="text-[11px] text-charcoal-muted">
                  Headquartered in Lindsay, Ontario
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-brand-forest text-xs font-bold tracking-wider uppercase font-display">
              About Neatify Solutions
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight leading-tight">
              Dedicated to Fresher Spaces & Brighter Days
            </h2>

            <p className="text-base text-charcoal-muted leading-relaxed">
              At Neatify Solutions, we believe that a clean environment directly shapes your daily peace of mind and productivity. Whether returning home after a demanding day, welcoming vacationers to your lakeside rental, or opening office doors to clients, you deserve a space that feels refreshed, sanitary, and inviting.
            </p>

            <p className="text-base text-charcoal-muted leading-relaxed">
              We operate with clear communication, punctuality, and unwavering attention to detail. Every property is treated with the utmost respect, using proven methods and responsible cleaning practices tailored to your specific schedule.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-sage-100">
              <div>
                <div className="text-2xl font-display font-extrabold text-brand-forest">100%</div>
                <div className="text-xs text-charcoal-muted mt-0.5">Focus on Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-display font-extrabold text-brand-forest">Local</div>
                <div className="text-xs text-charcoal-muted mt-0.5">Kawartha Lakes Rooted</div>
              </div>
              <div>
                <div className="text-2xl font-display font-extrabold text-brand-forest">3 Core</div>
                <div className="text-xs text-charcoal-muted mt-0.5">Specialized Cleanings</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
