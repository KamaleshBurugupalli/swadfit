import React, { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">24/7 Support</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Contact Swadfit</h1>
          <p className="text-xs text-outline">Have a question regarding your meal plan or corporate catering in Hyderabad?</p>
        </div>

        {submitted ? (
          <div className="p-4 bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs rounded-2xl text-center space-y-1">
            <span className="material-symbols-outlined text-3xl text-tertiary">check_circle</span>
            <p>Message received! Our team will contact you within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-outline block mb-1">Your Name</label>
              <input type="text" className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm" required placeholder="Karan Sharma" />
            </div>

            <div>
              <label className="text-xs font-bold text-outline block mb-1">Email / Phone</label>
              <input type="text" className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm" required placeholder="karan@swadfit.in" />
            </div>

            <div>
              <label className="text-xs font-bold text-outline block mb-1">Message / Inquiry</label>
              <textarea rows={4} className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm" required placeholder="How can we help?" />
            </div>

            <button type="submit" className="w-full py-3.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-full shadow-md">
              Send Message
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-surface-container text-xs text-outline space-y-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span>Swadfit Foods Pvt. Ltd, Hitec City, Hyderabad - 500081</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">call</span>
            <span>+91 98765 43210 (Mon - Sun: 7:00 AM - 10:00 PM)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
