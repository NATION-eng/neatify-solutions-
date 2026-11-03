import React from 'react';
import { Home, Building2, Key, Check, ArrowUpRight } from 'lucide-react';

export default function ServicesSection({ onSelectService }) {
  const services = [
    {
      id: 'airbnb',
      title: 'Airbnb & Vacation Rental',
      category: 'Cottages & Short-Term',
      icon: Key,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      description: 'Reliable turnover cleaning to prepare your rental property or cottage for 5-star guest reviews.',
      inclusions: [
        'Rapid same-day guest turnover service',
        'Crisp bed making & linen preparation',
        'Thorough kitchen & bathroom sanitizing',
        'Property inspection & damage reporting',
        'Recurring turnover schedules across cottage country'
      ],
      idealFor: 'Short-term rental hosts, cottage owners & property managers.'
    },
    {
      id: 'residential',
      title: 'Residential Cleaning',
      category: 'Home & Living',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      description: 'Keep your home fresh, comfortable, and spotless without the stress of doing everything yourself.',
      inclusions: [
        'Regular maintenance (weekly, bi-weekly, monthly)',
        'Kitchen degreasing & deep sanitization',
        'Complete bathroom descaling & polishing',
        'Move-in & move-out deep cleanings',
        'Dusting, baseboards & hardwood floor care'
      ],
      idealFor: 'Busy professionals, families & homeowners in Kawartha Lakes.'
    },
    {
      id: 'commercial',
      title: 'Commercial Cleaning',
      category: 'Workplaces & Offices',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      description: 'Maintain a clean, welcoming, and productive environment for your staff, clients, and visitors.',
      inclusions: [
        'Routine office & workplace sanitization',
        'Restroom cleaning & supply replenishment',
        'Common-area & conference room upkeep',
        'Floor care, vacuuming & waste removal',
        'Flexible after-hours & weekend schedules'
      ],
      idealFor: 'Offices, clinics, retail shops & commercial properties.'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 text-brand-forest text-xs font-bold tracking-wider uppercase mb-3 font-display">
            Our Cleaning Specialties
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Tailored Cleaning Solutions <br className="hidden sm:inline" />
            for Every Property
          </h2>
          <p className="mt-3 text-base text-charcoal-muted leading-relaxed">
            From rural lakeside cottages in Bobcaygeon to family homes and commercial offices in Lindsay, Neatify provides meticulous care.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="group bg-white rounded-3xl p-6 sm:p-7 border border-sage-100 shadow-card hover:shadow-float hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 bg-sage-50">
                    <img 
                      src={svc.image} 
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-brand-forest flex items-center gap-1.5 shadow-sm">
                      <Icon className="w-3.5 h-3.5" />
                      {svc.category}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-display font-bold text-charcoal-900 mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-5">
                    {svc.description}
                  </p>

                  {/* Inclusions List */}
                  <div className="space-y-2 mb-6 border-t border-sage-100/80 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700 font-display">
                      What's Included:
                    </div>
                    {svc.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-charcoal-700">
                        <Check className="w-3.5 h-3.5 text-brand-leaf mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-sage-100/80">
                  <button
                    onClick={() => onSelectService(svc.title.includes('Residential') ? 'Residential' : svc.title.includes('Commercial') ? 'Commercial' : 'Airbnb')}
                    className="w-full inline-flex items-center justify-between bg-sage-50 hover:bg-brand-forest text-charcoal-800 hover:text-white px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span>Request a Quote for this</span>
                    <div className="w-6 h-6 rounded-full bg-white text-brand-forest group-hover/btn:bg-white/20 group-hover/btn:text-white flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
