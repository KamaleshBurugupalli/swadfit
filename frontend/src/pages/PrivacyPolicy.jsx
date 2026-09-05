import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="font-display font-bold text-3xl text-on-surface">Privacy Policy</h1>
        <p className="text-xs text-outline">Last updated: September 2026</p>
      </div>

      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl space-y-4 text-xs text-outline leading-relaxed shadow-soft">
        <h3 className="font-bold text-sm text-on-surface">1. Information We Collect</h3>
        <p>We collect personal information including name, email address, delivery address, phone number, and nutrition preferences to fulfill meal orders.</p>

        <h3 className="font-bold text-sm text-on-surface">2. Data Security</h3>
        <p>All sensitive credentials and personal data are stored securely on Supabase PostgreSQL with strict Row Level Security (RLS) policies.</p>

        <h3 className="font-bold text-sm text-on-surface">3. Third-Party Services</h3>
        <p>Payment transactions are processed securely via integrated payment gateways (Razorpay). We do not store credit card details on our servers.</p>
      </div>
    </div>
  );
}
