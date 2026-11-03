import React, { useState } from 'react';
import { Phone, ArrowUpRight, Menu, X, ChevronDown, Home, Building2, Key } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenQuote }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <header className="relative z-40 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="glass-pill border border-white/70 bg-white/95 backdrop-blur-md rounded-full px-3.5 sm:px-5 py-2.5 sm:py-3 shadow-subtle flex items-center justify-between transition-all duration-300">
          
          {/* Brand Logo with exact uploaded graphic */}
          <a href="#" className="flex-shrink-0">
            <Logo />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-charcoal-700">
            <a 
              href="#home" 
              className="px-3.5 py-2 rounded-full hover:text-brand-forest hover:bg-sage-50 transition-colors"
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <a 
                href="#services" 
                className="px-3.5 py-2 rounded-full hover:text-brand-forest hover:bg-sage-50 transition-colors inline-flex items-center gap-1"
              >
                Services
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </a>

              {servicesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-card border border-sage-100 p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
                  <a 
                    href="#airbnb" 
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-sage-50 text-charcoal-800 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sage-100 flex items-center justify-center text-brand-forest">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal-900">Airbnb & Vacation Rentals</div>
                      <div className="text-[11px] text-charcoal-muted">Turnovers, Staging & Cottages</div>
                    </div>
                  </a>

                  <a 
                    href="#residential" 
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-sage-50 text-charcoal-800 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sage-100 flex items-center justify-center text-brand-forest">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal-900">Residential Cleaning</div>
                      <div className="text-[11px] text-charcoal-muted">Home, Deep Clean & Move-In</div>
                    </div>
                  </a>

                  <a 
                    href="#commercial" 
                    className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-sage-50 text-charcoal-800 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sage-100 flex items-center justify-center text-brand-forest">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-charcoal-900">Commercial Cleaning</div>
                      <div className="text-[11px] text-charcoal-muted">Offices, Workspaces & Clinics</div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a 
              href="#why-us" 
              className="px-3.5 py-2 rounded-full hover:text-brand-forest hover:bg-sage-50 transition-colors"
            >
              Why Us
            </a>

            <a 
              href="#service-areas" 
              className="px-3.5 py-2 rounded-full hover:text-brand-forest hover:bg-sage-50 transition-colors"
            >
              Service Areas
            </a>

            <a 
              href="#about" 
              className="px-3.5 py-2 rounded-full hover:text-brand-forest hover:bg-sage-50 transition-colors"
            >
              About
            </a>

            <a 
              href="#faq" 
              className="px-3.5 py-2 rounded-full hover:text-brand-forest hover:bg-sage-50 transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 md:gap-3">
            {/* Click-to-call direct phone */}
            <a 
              href="tel:4169105281" 
              className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-charcoal-700 hover:text-brand-forest px-3.5 py-2 rounded-full border border-sage-200/80 hover:border-brand-forest/30 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sage-600" />
              <span>416-910-5281</span>
            </a>

            {/* "Get a Quote" Pill Button */}
            <button 
              onClick={onOpenQuote}
              className="group inline-flex items-center gap-2 bg-brand-forest hover:bg-brand-deep text-white text-xs sm:text-sm font-semibold pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span>Get a Quote</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 group-hover:bg-brand-leaf text-white flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>
          </div>

          {/* Mobile Actions: Quote + Hamburger */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            <button 
              onClick={onOpenQuote}
              className="inline-flex sm:hidden items-center gap-1 bg-brand-forest text-white text-[11px] font-bold px-3 py-1.5 rounded-full"
            >
              <span>Quote</span>
              <ArrowUpRight className="w-3 h-3 text-brand-leaf" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-sage-50 text-charcoal-800 hover:bg-sage-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white/98 backdrop-blur-xl border border-sage-100 rounded-3xl p-5 shadow-card animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 font-medium text-sm text-charcoal-800">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-sage-50"
              >
                Home
              </a>
              <div className="border-t border-sage-100 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-sage-600 px-2.5 mb-1">
                  Our Services
                </div>
                <a 
                  href="#airbnb" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-sage-50"
                >
                  <Key className="w-4 h-4 text-brand-forest" />
                  Airbnb & Vacation Rentals
                </a>
                <a 
                  href="#residential" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-sage-50"
                >
                  <Home className="w-4 h-4 text-brand-forest" />
                  Residential Cleaning
                </a>
                <a 
                  href="#commercial" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-sage-50"
                >
                  <Building2 className="w-4 h-4 text-brand-forest" />
                  Commercial Cleaning
                </a>
              </div>
              <div className="border-t border-sage-100 pt-2 flex flex-col gap-1">
                <a 
                  href="#why-us" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-sage-50"
                >
                  Why Neatify
                </a>
                <a 
                  href="#service-areas" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-sage-50"
                >
                  Service Areas (Kawartha Lakes)
                </a>
                <a 
                  href="#about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-sage-50"
                >
                  About Us
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-sage-50"
                >
                  Frequently Asked Questions
                </a>
              </div>
              <div className="border-t border-sage-100 pt-3 flex flex-col gap-2">
                <a 
                  href="tel:4169105281" 
                  className="flex items-center justify-center gap-2 py-3 rounded-full border border-sage-200 text-charcoal-800 font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-sage-600" />
                  Call 416-910-5281
                </a>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-brand-forest text-white py-3 rounded-full font-semibold text-sm"
                >
                  Request a Free Quote
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
