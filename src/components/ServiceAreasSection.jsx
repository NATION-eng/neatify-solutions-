import React, { useState } from 'react';
import { MapPin, CheckCircle2, Search, ArrowRight } from 'lucide-react';

export default function ServiceAreasSection({ onOpenQuote }) {
  const [query, setQuery] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const primaryHubs = [
    {
      name: 'Lindsay',
      status: 'Primary Hub & Office Location',
      address: '164 Colborne St. West',
      highlights: 'Residential homes, commercial offices, healthcare clinics & move-in cleanings.'
    },
    {
      name: 'Bobcaygeon',
      status: 'Full Service Area',
      address: 'Cottage Country & Town',
      highlights: 'Lakeside vacation properties, Airbnb guest turnovers & residential maintenance.'
    },
    {
      name: 'Fenelon Falls',
      status: 'Full Service Area',
      address: 'Cameron Lake & Sturgeon Lake',
      highlights: 'Short-term rentals, family residences, retail spaces & seasonal turnovers.'
    }
  ];

  const handleCheck = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setCheckResult(`Great news! We review cleaning inquiries for "${query}" across Kawartha Lakes.`);
  };

  return (
    <section id="service-areas" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 text-brand-forest text-xs font-bold tracking-wider uppercase mb-3 font-display">
            Local Regional Coverage
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Proudly Serving Kawartha Lakes
          </h2>
          <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
            Our teams are based locally, ensuring prompt arrivals, dependable scheduling, and intimate knowledge of rural, town, and cottage properties.
          </p>
        </div>

        {/* 3 Core Communities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {primaryHubs.map((hub, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-sage-100 shadow-card hover:border-sage-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-sage-100 text-brand-forest flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200">
                    {hub.status}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-1">
                  {hub.name}
                </h3>
                <div className="text-xs font-semibold text-sage-600 mb-3">
                  {hub.address}
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  {hub.highlights}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-sage-100">
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest hover:text-brand-deep cursor-pointer"
                >
                  <span>Book in {hub.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coverage Verification Banner */}
        <div className="bg-brand-forest text-white rounded-3xl p-8 sm:p-10 shadow-card relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-2">
              Located in a Surrounding Kawartha Community?
            </h3>
            <p className="text-sm sm:text-base text-sage-100/90 leading-relaxed mb-6">
              Whether you are located in Omemee, Coboconk, Little Britain, or along the lakes, we frequently accommodate surrounding areas. Tell us where you are located.
            </p>

            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter your town or postal code (e.g. K9V...)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-full bg-white text-charcoal-900 placeholder:text-charcoal-muted focus:outline-none focus:ring-2 focus:ring-brand-leaf"
                />
              </div>
              <button
                type="submit"
                className="bg-brand-leaf hover:bg-[#60A035] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer flex-shrink-0"
              >
                Check Coverage
              </button>
            </form>

            {checkResult && (
              <div className="mt-4 p-3 bg-white/10 rounded-2xl text-xs sm:text-sm text-white flex items-center justify-between animate-in fade-in">
                <span>{checkResult}</span>
                <button
                  onClick={onOpenQuote}
                  className="underline font-bold hover:text-brand-leaf ml-2"
                >
                  Proceed to Quote →
                </button>
              </div>
            )}
          </div>

          {/* Subtle background ambient graphic */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/5 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
