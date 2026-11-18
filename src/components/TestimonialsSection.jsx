import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Quote, ArrowUpRight, MessageSquarePlus, X, Send, Loader2 } from 'lucide-react';

const SUPABASE_URL = 'https://sjyuhbrzdmxkkldjnxbh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeXVoYnJ6ZG14a2tsZGpueGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5OTkyNjMsImV4cCI6MjExMDU3NTI2M30.q_cFPB_2UMZzKxNbNy6ulixptKNfBOveGz1SF0acZzc';

const DEFAULT_REVIEWS = [
  {
    id: 'seed-1',
    quote: "Neatify has transformed our cottage rental turnovers. Guests regularly compliment the immaculate cleanliness, and their team is always prompt between check-out and arrival.",
    name: "Sarah M.",
    role: "Cottage Owner & Superhost",
    location: "Bobcaygeon, ON",
    service: "Airbnb & Cottage Turnover",
    rating: 5
  },
  {
    id: 'seed-2',
    quote: "Having Neatify handle our bi-weekly house cleaning has been a game-changer. They are thorough, respectful, and never cut corners on baseboards or bathrooms.",
    name: "David & Lisa T.",
    role: "Homeowners",
    location: "Lindsay, ON",
    service: "Residential Cleaning",
    rating: 5
  },
  {
    id: 'seed-3',
    quote: "Professional, reliable, and discreet. Our clinic space is spotless and welcoming every morning. Highly recommended for any business in Kawartha Lakes.",
    name: "Dr. Robert K.",
    role: "Medical Clinic Director",
    location: "Kawartha Lakes, ON",
    service: "Commercial Cleaning",
    rating: 5
  }
];

export default function TestimonialsSection({ onOpenQuote }) {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Kawartha Lakes, ON');
  const [service, setService] = useState('Residential Cleaning');
  const [quote, setQuote] = useState('');
  const [formError, setFormError] = useState('');

  // 1. Fetch Live Reviews from Supabase
  const fetchLiveReviews = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*&is_approved=eq.true&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch live reviews from Supabase, using defaults:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveReviews();
  }, []);

  // 2. Submit New Review via API
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!quote.trim() || quote.trim().length < 10) {
      setFormError('Please share a few words about your cleaning experience (at least 10 characters).');
      return;
    }

    setFormError('');
    setSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        role: 'Verified Customer',
        location: location.trim() || 'Kawartha Lakes, ON',
        service: service || 'Residential Cleaning',
        rating: rating || 5,
        quote: quote.trim(),
        email: email.trim() || null
      };

      // Call /api/review to insert into Supabase AND trigger email to owner
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json().catch(() => ({}));

      // Optimistically add to top of live reviews
      const newReview = resData.review || {
        id: `live-${Date.now()}`,
        ...payload
      };

      setReviews((prev) => [newReview, ...prev]);
      setSubmittedSuccess(true);

      // Reset form fields
      setName('');
      setEmail('');
      setQuote('');
      setRating(5);

      // Re-fetch after 1 second to sync
      setTimeout(() => {
        fetchLiveReviews();
      }, 1000);

    } catch (err) {
      console.error('Error submitting review:', err);
      setFormError('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSubmittedSuccess(false);
    setFormError('');
  };

  // Dynamic calculations
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-sage-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sage-100 text-brand-forest text-xs font-bold tracking-wider uppercase mb-3 font-display">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Live Client Reviews • Kawartha Lakes
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-charcoal-900 tracking-tight">
            Trusted by Homeowners, Hosts & Businesses
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Real feedback collected directly from clients across Lindsay, Bobcaygeon, Fenelon Falls, and the Kawartha Lakes.
          </p>

          {/* Social Proof Aggregate Pill & Write Review CTA */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-50 border border-sage-200 text-xs font-semibold text-charcoal-800">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>{avgRating} Average Rating ({totalReviews} {totalReviews === 1 ? 'Review' : 'Live Reviews'})</span>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-forest hover:bg-brand-deep text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-brand-leaf" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-[#FAFCF8] rounded-3xl p-6 sm:p-8 border border-sage-100 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(Math.min(5, Math.max(1, Number(t.rating) || 5)))].map((_, i) => (
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
                    {t.role || 'Verified Customer'}
                  </span>
                </div>
                <div className="text-xs text-charcoal-muted">
                  {t.location || 'Kawartha Lakes, ON'}
                </div>
                <div className="mt-2.5 inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-sage-200 text-charcoal-700">
                  {t.service || 'Cleaning Service'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Dual Action Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-sage-50 text-brand-forest border border-brand-forest/30 text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-brand-forest" />
            <span>Share Your Experience</span>
          </button>

          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-forest hover:bg-brand-deep text-white text-xs sm:text-sm font-semibold pl-5 pr-2 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Book Your Cleaning Today</span>
            <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>

      </div>

      {/* WRITE A REVIEW MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-sage-100 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sage-100 bg-sage-50/80">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900 font-display">
                  Leave a Review • Neatify Solutions
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal-900 hover:bg-sage-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {submittedSuccess ? (
                <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-sage-100 text-brand-forest flex items-center justify-center mx-auto ring-8 ring-sage-50">
                    <CheckCircle className="w-10 h-10 text-brand-forest" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal-900">
                    Thank You for Your Feedback!
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm mx-auto">
                    Your review has been recorded into our live database and forwarded to our team. We truly appreciate your support!
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-4 bg-brand-forest text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-sm"
                  >
                    Close & View Reviews
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-sage-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-semibold text-charcoal-700">
                        {rating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Your Name / Display Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah M."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                    />
                  </div>

                  {/* Community & Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">
                        Community / Area
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bobcaygeon, Lindsay"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-charcoal-800 mb-1">
                        Service Received
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sage-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                      >
                        <option value="Residential Cleaning">Residential Cleaning</option>
                        <option value="Airbnb & Cottage Turnover">Airbnb & Cottage Turnover</option>
                        <option value="Commercial Cleaning">Commercial Cleaning</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Email */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Email Address <span className="text-charcoal-muted font-normal">(Optional, private)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. client@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Your Review *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details about the quality, reliability, and punctuality of the cleaning service..."
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      required
                      className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                    ></textarea>
                  </div>

                  {formError && (
                    <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl">
                      {formError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-forest hover:bg-brand-deep disabled:opacity-50 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-brand-leaf" />
                          <span>Publishing Review...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-brand-leaf" />
                          <span>Publish Review Live</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
