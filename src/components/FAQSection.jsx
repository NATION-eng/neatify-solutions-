import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Which communities in Kawartha Lakes do you service?',
      a: 'We proudly serve homes, businesses, and rental properties across Lindsay, Bobcaygeon, Fenelon Falls, and surrounding Kawartha Lakes communities. If you are located in a nearby lakeside area, feel free to submit an inquiry and we will confirm availability.'
    },
    {
      q: 'How does the quote process work?',
      a: 'Simply fill out our quick 3-step online quote form or call us directly at 416-910-5281. We review your property size, cleaning requirements, and preferred schedule, then provide a clear, transparent quote before any service begins.'
    },
    {
      q: 'Do you bring your own cleaning supplies and equipment?',
      a: 'Yes! Our cleaners arrive fully equipped with high-grade, eco-conscious cleaning supplies, microfiber cloths, and commercial vacuum equipment. If you have specific specialty products you prefer for delicate surfaces, we are happy to accommodate.'
    },
    {
      q: 'How do you handle Airbnb & short-term cottage turnovers?',
      a: 'We coordinate with your booking calendar to ensure prompt same-day turnovers between check-out and check-in. Our turnover service covers complete sanitation, fresh bed linen staging, towel prep, bathroom descaling, and visual inspection.'
    },
    {
      q: 'Can I schedule recurring cleanings?',
      a: 'Yes, we offer flexible recurring schedules including weekly, bi-weekly, or monthly visits for both residential homes and commercial offices.'
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-sage-50/50">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-forest text-xs font-bold tracking-wider uppercase font-display border border-sage-200 mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-charcoal-muted">
            Everything you need to know about our cleaning standards and booking process.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-sage-100 overflow-hidden shadow-subtle transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-display font-bold text-charcoal-900 hover:text-brand-forest transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-sage-600 transition-transform duration-200 flex-shrink-0 ${openIndex === idx ? 'rotate-180 text-brand-forest' : ''}`} />
              </button>
              
              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-sage-50 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
