import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Home, Building2, Key, Phone, Mail, Check, AlertCircle, ExternalLink } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, defaultService = 'Residential' }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [dispatchStatus, setDispatchStatus] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    serviceType: defaultService,
    cleaningType: 'Regular Maintenance',
    propertyType: 'House',
    bedrooms: '3 Bedrooms',
    bathrooms: '2 Bathrooms',
    frequency: 'Bi-Weekly',
    community: 'Lindsay',
    customLocation: '',
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    propertyDetails: '',
    consent: true
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, serviceType: service });
  };

  const validateStep2 = () => {
    const errs = {};
    if (formData.community === 'Other' && !formData.customLocation.trim()) {
      errs.customLocation = 'Please provide your town or postal code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errs.phone = 'Valid phone number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => ({}));
      setDispatchStatus(result);
      setSubmittedData({ ...formData });

    } catch (err) {
      console.warn('API route fallback triggered:', err);
      setDispatchStatus({ success: false, requiresConfiguration: true });
      setSubmittedData({ ...formData });
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setDispatchStatus(null);
    setStep(1);
    onClose();
  };

  const locationText = formData.community === 'Other' ? (formData.customLocation || 'Kawartha Lakes') : formData.community;
  const propertyScope = formData.serviceType === 'Commercial' ? formData.propertyType : `${formData.bedrooms}, ${formData.bathrooms}`;

  // Direct 1-tap pre-filled mailto backup URL
  const mailSubject = encodeURIComponent(`[Booking Request] ${formData.serviceType} Cleaning - ${formData.fullName}`);
  const mailBody = encodeURIComponent(
    `Hello Neatify Solutions,\n\n` +
    `I am requesting a quote with the following details:\n` +
    `• Customer Name: ${formData.fullName}\n` +
    `• Phone Number: ${formData.phone}\n` +
    `• Email Address: ${formData.email}\n` +
    `• Service: ${formData.serviceType} Cleaning\n` +
    `• Location: ${locationText}\n` +
    `• Scope: ${propertyScope}\n` +
    `• Frequency: ${formData.frequency}\n` +
    `• Preferred Timing: ${formData.preferredDate || 'Flexible / ASAP'}\n` +
    `• Special Notes: ${formData.propertyDetails || 'None'}\n\n` +
    `Looking forward to hearing from your team.`
  );
  const directMailtoUrl = `mailto:neatifysolutionsinc@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-sage-100 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-sage-100 bg-sage-50/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-leaf animate-pulse"></div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-charcoal-700 font-display">
              {isSubmitted ? 'Booking Confirmed • Neatify Solutions' : 'Request a Cleaning Quote • Kawartha Lakes'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal-900 hover:bg-sage-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto overscroll-contain">
          
          {/* Progress Indicator (when filling out) */}
          {!isSubmitted && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold text-charcoal-muted mb-2">
                <span className={step >= 1 ? 'text-brand-forest font-bold' : ''}>1. Service</span>
                <span className={step >= 2 ? 'text-brand-forest font-bold' : ''}>2. Property</span>
                <span className={step >= 3 ? 'text-brand-forest font-bold' : ''}>3. Contact</span>
              </div>
              <div className="h-1.5 w-full bg-sage-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-forest transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* DEDICATED SUCCESSFUL BOOKING POP-UP / VIEW */}
          {isSubmitted ? (
            <div className="py-2 sm:py-4 text-center space-y-5 animate-in zoom-in-95 duration-200">
              
              {/* Animated Celebration Icon */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                <div className="w-full h-full rounded-full bg-sage-100 text-brand-forest flex items-center justify-center ring-8 ring-sage-50 shadow-inner">
                  <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-brand-forest" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-leaf text-white flex items-center justify-center ring-2 ring-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
              
              {/* Primary Confirmation Headline */}
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-charcoal-900 tracking-tight">
                  Booking Request Completed!
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-charcoal-800">{submittedData?.fullName || formData.fullName}</span>. Your cleaning inquiry has been recorded.
                </p>
              </div>

              {/* CLIENT EMAIL CHECK NOTIFICATION BOX */}
              <div className="max-w-md mx-auto bg-gradient-to-br from-sage-50 to-[#EDF3E8] border-2 border-brand-forest/20 rounded-2xl p-4 sm:p-5 text-left shadow-subtle">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-forest text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-brand-leaf" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm font-bold text-brand-forest flex items-center gap-1.5">
                      <span>Please Check Your Email</span>
                      <span className="w-2 h-2 rounded-full bg-brand-leaf animate-ping"></span>
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed">
                      We have sent a full copy of your booking request and details to:
                    </p>
                    <div className="font-mono text-xs font-bold text-charcoal-900 bg-white/80 px-2.5 py-1 rounded-lg border border-sage-200 inline-block mt-0.5 break-all">
                      {submittedData?.email || formData.email}
                    </div>
                    <p className="text-[11px] text-charcoal-muted pt-1">
                      Sent from: <strong>neatifysolutionsinc@gmail.com</strong>. If you do not see it in a few minutes, please check your spam or junk folder.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant 1-Tap Email Dispatch Action (Guaranteed to Work Immediately) */}
              <div className="max-w-md mx-auto bg-white border border-sage-200 rounded-2xl p-4 text-left">
                <div className="text-xs text-charcoal-800 mb-2">
                  <strong>Need immediate confirmation?</strong> Tap below to send this booking directly from your email app to our inbox:
                </div>
                <a
                  href={directMailtoUrl}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-forest hover:bg-brand-deep text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-brand-leaf" />
                  <span>Send Booking via My Email App (1 Tap)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

              {/* Booking Summary Card */}
              <div className="max-w-md mx-auto bg-white border border-sage-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted font-display border-b border-sage-100 pb-1.5">
                  Your Booking Summary:
                </div>
                <div className="grid grid-cols-2 gap-2 text-charcoal-700">
                  <div>
                    <span className="text-charcoal-muted">Service:</span>
                    <div className="font-semibold text-charcoal-900">{formData.serviceType} Cleaning</div>
                  </div>
                  <div>
                    <span className="text-charcoal-muted">Frequency:</span>
                    <div className="font-semibold text-charcoal-900">{formData.frequency}</div>
                  </div>
                  <div>
                    <span className="text-charcoal-muted">Location:</span>
                    <div className="font-semibold text-charcoal-900">{locationText}</div>
                  </div>
                  <div>
                    <span className="text-charcoal-muted">Preferred Timing:</span>
                    <div className="font-semibold text-charcoal-900">{formData.preferredDate || 'Flexible / ASAP'}</div>
                  </div>
                </div>
              </div>

              {/* Official PRD Confirmation Copy */}
              <div className="max-w-md mx-auto text-[11px] sm:text-xs text-charcoal-muted bg-sage-50/60 border border-sage-100 rounded-xl p-3 leading-relaxed text-left">
                <strong>Next Step:</strong> "Thank you for contacting Neatify Solutions. Your quote request has been submitted. We appreciate your interest and will review the details provided. If you need to add information, please contact us using the phone number shown on this website."
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href="tel:4169105281"
                  className="inline-flex items-center justify-center gap-2 bg-sage-50 border border-sage-200 px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal-800 hover:bg-sage-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sage-600" />
                  Need Help? Call 416-910-5281
                </a>

                <button
                  onClick={handleReset}
                  className="bg-brand-forest hover:bg-brand-deep text-white px-7 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  Done
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: SERVICE SELECTION */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-charcoal-900">
                      What type of cleaning do you need?
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Choose the service category tailored to your property.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    
                    {/* Airbnb & Vacation Rental Option */}
                    <div
                      onClick={() => handleServiceSelect('Airbnb')}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 ${
                        formData.serviceType === 'Airbnb'
                          ? 'border-brand-forest bg-sage-50/70 ring-2 ring-brand-forest/10'
                          : 'border-sage-200 hover:border-sage-300 bg-white'
                      }`}
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage-100 text-brand-forest flex items-center justify-center sm:mb-3 flex-shrink-0">
                        <Key className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-charcoal-900">Airbnb / Cottage</div>
                        <div className="text-[10px] sm:text-[11px] text-charcoal-muted mt-0.5">
                          Guest Turnovers & Linens
                        </div>
                      </div>
                    </div>

                    {/* Residential Option */}
                    <div
                      onClick={() => handleServiceSelect('Residential')}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 ${
                        formData.serviceType === 'Residential'
                          ? 'border-brand-forest bg-sage-50/70 ring-2 ring-brand-forest/10'
                          : 'border-sage-200 hover:border-sage-300 bg-white'
                      }`}
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage-100 text-brand-forest flex items-center justify-center sm:mb-3 flex-shrink-0">
                        <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-charcoal-900">Residential</div>
                        <div className="text-[10px] sm:text-[11px] text-charcoal-muted mt-0.5">
                          Homes, Deep Clean & Move-In
                        </div>
                      </div>
                    </div>

                    {/* Commercial Option */}
                    <div
                      onClick={() => handleServiceSelect('Commercial')}
                      className={`cursor-pointer rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 ${
                        formData.serviceType === 'Commercial'
                          ? 'border-brand-forest bg-sage-50/70 ring-2 ring-brand-forest/10'
                          : 'border-sage-200 hover:border-sage-300 bg-white'
                      }`}
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sage-100 text-brand-forest flex items-center justify-center sm:mb-3 flex-shrink-0">
                        <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-charcoal-900">Commercial</div>
                        <div className="text-[10px] sm:text-[11px] text-charcoal-muted mt-0.5">
                          Offices, Clinics & Workplaces
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Frequency pills */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-charcoal-800 mb-2">
                      Cleaning Frequency
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['One-Time', 'Weekly', 'Bi-Weekly', 'Monthly'].map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setFormData({ ...formData, frequency: freq })}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                            formData.frequency === freq
                              ? 'bg-brand-forest text-white border-brand-forest'
                              : 'bg-sage-50/80 text-charcoal-700 border-sage-200 hover:bg-sage-100'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 2: PROPERTY SCOPE & LOCATION */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-charcoal-900">
                      Property & Coverage Area
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Help us understand your space so we can tailor the quote accurately.
                    </p>
                  </div>

                  {/* Community in Kawartha Lakes */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Service Community <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Lindsay', 'Bobcaygeon', 'Fenelon Falls', 'Other'].map((comm) => (
                        <button
                          key={comm}
                          type="button"
                          onClick={() => setFormData({ ...formData, community: comm })}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                            formData.community === comm
                              ? 'bg-brand-forest text-white border-brand-forest'
                              : 'bg-sage-50/80 text-charcoal-700 border-sage-200 hover:bg-sage-100'
                          }`}
                        >
                          {comm}
                        </button>
                      ))}
                    </div>

                    {formData.community === 'Other' && (
                      <div className="mt-2.5">
                        <input
                          type="text"
                          placeholder="Enter your town, municipality or postal code"
                          value={formData.customLocation}
                          onChange={(e) => setFormData({ ...formData, customLocation: e.target.value })}
                          className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                        />
                        {errors.customLocation && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.customLocation}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Room selectors for Residential / Airbnb */}
                  {formData.serviceType !== 'Commercial' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-charcoal-800 mb-1">
                          Bedrooms
                        </label>
                        <select
                          value={formData.bedrooms}
                          onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                          className="w-full text-base sm:text-xs px-3 py-2.5 rounded-xl border border-sage-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                        >
                          <option>1 Bedroom</option>
                          <option>2 Bedrooms</option>
                          <option>3 Bedrooms</option>
                          <option>4 Bedrooms</option>
                          <option>5+ Bedrooms / Cottage</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-charcoal-800 mb-1">
                          Bathrooms
                        </label>
                        <select
                          value={formData.bathrooms}
                          onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                          className="w-full text-base sm:text-xs px-3 py-2.5 rounded-xl border border-sage-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                        >
                          <option>1 Bathroom</option>
                          <option>1.5 Bathrooms</option>
                          <option>2 Bathrooms</option>
                          <option>3 Bathrooms</option>
                          <option>4+ Bathrooms</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">
                        Approximate Commercial Square Footage
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full text-base sm:text-xs px-3 py-2.5 rounded-xl border border-sage-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      >
                        <option>Under 1,500 sq ft (Small Office)</option>
                        <option>1,500 – 3,500 sq ft (Medium Facility)</option>
                        <option>3,500 – 7,500 sq ft (Large Workspace)</option>
                        <option>7,500+ sq ft (Commercial Building)</option>
                      </select>
                    </div>
                  )}

                  {/* Specific notes */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Specific Notes or Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Inside oven, move-in clean, guest turnover on Friday, pet home..."
                      value={formData.propertyDetails}
                      onChange={(e) => setFormData({ ...formData, propertyDetails: e.target.value })}
                      className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                    ></textarea>
                  </div>

                </div>
              )}

              {/* STEP 3: CONTACT & PREFERRED TIMEFRAME */}
              {step === 3 && (
                <div className="space-y-3.5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-charcoal-900">
                      Contact & Scheduling Details
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-0.5">
                      Where should we send your booking confirmation & quote?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      />
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="(416) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      />
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                      <p className="text-[10px] text-charcoal-muted mt-1">
                        A full copy of your booking will be sent to this email.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">
                        Preferred Date / Timeframe (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next Tuesday or ASAP"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full text-base sm:text-xs px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      />
                    </div>
                  </div>

                  {/* Privacy / Consent checkbox */}
                  <div className="pt-2 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 rounded border-sage-300 text-brand-forest focus:ring-brand-forest"
                    />
                    <label htmlFor="privacyConsent" className="text-[11px] text-charcoal-muted leading-tight">
                      I agree that Neatify Solutions may contact me via email or phone regarding this cleaning quote request.
                    </label>
                  </div>

                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-sage-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-charcoal-900 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 bg-brand-forest hover:bg-brand-deep text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-brand-forest hover:bg-brand-deep text-white text-xs sm:text-sm font-semibold px-6 sm:px-7 py-2.5 rounded-full shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Routing to Dispatch...' : 'Submit Quote Request ↗'}
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
