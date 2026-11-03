import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

export default function Footer({ onOpenQuote }) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="bg-charcoal-900 text-white pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-charcoal-700/60">
          
          {/* Col 1: Brand & Bio */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-xs sm:text-sm text-sage-200/80 leading-relaxed max-w-sm pt-2">
              Dependable, premium cleaning solutions for homes, commercial workplaces, and Airbnb vacation rentals throughout Lindsay and the Kawartha Lakes.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 bg-brand-leaf hover:bg-[#60A035] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
              >
                <span>Request a Free Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Cleaning Services */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Our Services
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-sage-200/80">
              <li>
                <a href="#airbnb" className="hover:text-white transition-colors">Airbnb & Vacation Rental Turnovers</a>
              </li>
              <li>
                <a href="#airbnb" className="hover:text-white transition-colors">Cottage Rental Staging</a>
              </li>
              <li>
                <a href="#residential" className="hover:text-white transition-colors">Residential Cleaning</a>
              </li>
              <li>
                <a href="#residential" className="hover:text-white transition-colors">Deep & Seasonal Cleaning</a>
              </li>
              <li>
                <a href="#residential" className="hover:text-white transition-colors">Move-In / Move-Out Cleans</a>
              </li>
              <li>
                <a href="#commercial" className="hover:text-white transition-colors">Commercial & Office Cleaning</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Service Areas
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-sage-200/80">
              <li>
                <a href="#service-areas" className="hover:text-white transition-colors">Lindsay (HQ)</a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-white transition-colors">Bobcaygeon</a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-white transition-colors">Fenelon Falls</a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-white transition-colors">Kawartha Lakes Region</a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-white transition-colors">Surrounding Communities</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Info (PRD Strict NAP) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3">
            <div className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Get In Touch
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-sage-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-leaf mt-0.5 flex-shrink-0" />
                <span>164 Colborne St. West, Lindsay, Kawartha Lakes, ON</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-leaf flex-shrink-0" />
                <a href="tel:4169105281" className="hover:text-white transition-colors font-medium">
                  416-910-5281
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-leaf flex-shrink-0" />
                <a href="mailto:neatifysolutionsinc@gmail.com" className="hover:text-white transition-colors break-all">
                  neatifysolutionsinc@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-200/60 gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Neatify Solutions Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <a href="https://neatifysolutions.ca" className="hover:text-white transition-colors">
              neatifysolutions.ca
            </a>
          </div>
        </div>

      </div>

      {/* PRIVACY POLICY MODAL */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-charcoal-900 rounded-3xl p-6 sm:p-8 max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl border border-sage-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-sage-100">
              <h3 className="font-display font-bold text-lg text-charcoal-900">
                Privacy Policy — Neatify Solutions
              </h3>
              <button 
                onClick={() => setPrivacyOpen(false)}
                className="text-charcoal-muted hover:text-charcoal-900 font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>
            
            <div className="text-xs space-y-3 leading-relaxed text-charcoal-700">
              <p>
                <strong>Effective Date:</strong> November 3, 2026
              </p>
              <p>
                Neatify Solutions Inc. respects your privacy. This policy outlines how we handle information collected through our website (<a href="https://neatifysolutions.ca" className="text-brand-forest underline">neatifysolutions.ca</a>).
              </p>
              <p><strong>1. Information Collection:</strong> When you submit a quote request, we collect your full name, email address, phone number, property community, and specific cleaning requirements strictly for preparing your quote and coordinating service.</p>
              <p><strong>2. Use of Information:</strong> Your details are sent directly to our business management team at <code>neatifysolutionsinc@gmail.com</code>. We do not sell, rent, or distribute your personal information to third parties.</p>
              <p><strong>3. Spam Protection & Analytics:</strong> We use standard security and privacy-conscious analytics to understand website usage and improve usability.</p>
              <p><strong>4. Contact:</strong> If you wish to review, update, or delete your contact details, please contact us at <code>neatifysolutionsinc@gmail.com</code> or 416-910-5281.</p>
            </div>

            <div className="mt-6 pt-4 border-t border-sage-100 text-right">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="bg-brand-forest text-white px-5 py-2 rounded-full text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
