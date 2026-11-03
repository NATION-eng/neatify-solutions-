import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import ServiceAreasSection from './components/ServiceAreasSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import MobileQuickBar from './components/MobileQuickBar';
import QuoteModal from './components/QuoteModal';
import { Phone, MapPin, Sparkles } from 'lucide-react';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Residential');

  const handleOpenQuote = (service = 'Residential') => {
    setSelectedService(service);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EEF1EC] text-charcoal-800 flex flex-col font-sans">
      
      {/* Top Regional Notification Bar */}
      <div className="bg-brand-forest text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-brand-pine">
        <span className="inline-block w-2 h-2 rounded-full bg-brand-leaf animate-pulse"></span>
        <span>
          Serving Lindsay, Bobcaygeon, Fenelon Falls & Kawartha Lakes • Direct Line:{' '}
          <a href="tel:4169105281" className="font-bold underline hover:text-brand-leaf ml-1">
            416-910-5281
          </a>
        </span>
      </div>

      {/* Main Navigation */}
      <Navbar onOpenQuote={() => handleOpenQuote('Residential')} />

      {/* Main Content Body */}
      <main className="flex-1">
        {/* Hero Section styled after CleanSpace reference */}
        <Hero onOpenQuote={() => handleOpenQuote('Residential')} />

        {/* 3 Core Services: Residential, Commercial, Airbnb */}
        <ServicesSection onSelectService={(svc) => handleOpenQuote(svc)} />

        {/* Why Choose Neatify Solutions */}
        <WhyChooseUs onOpenQuote={() => handleOpenQuote('Residential')} />

        {/* Service Areas (Lindsay, Bobcaygeon, Fenelon Falls) */}
        <ServiceAreasSection onOpenQuote={() => handleOpenQuote('Residential')} />

        {/* About Us */}
        <AboutSection />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Global Footer */}
      <Footer onOpenQuote={() => handleOpenQuote('Residential')} />

      {/* Sticky Mobile Bar for direct conversion */}
      <MobileQuickBar onOpenQuote={() => handleOpenQuote('Residential')} />

      {/* Interactive 3-Step Quote Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        defaultService={selectedService}
      />

    </div>
  );
}
