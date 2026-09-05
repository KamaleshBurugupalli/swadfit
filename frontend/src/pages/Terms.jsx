import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="space-y-1">
        <h1 className="font-display font-bold text-3xl text-on-surface">Terms & Conditions</h1>
        <p className="text-xs text-outline">Last updated: September 2026</p>
      </div>

      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl space-y-4 text-xs text-outline leading-relaxed shadow-soft">
        <h3 className="font-bold text-sm text-on-surface">1. Meal Subscriptions & Deliveries</h3>
        <p>Swadfit provides subscription-based meal delivery services in designated zones in Hyderabad. Deliveries occur during customer-selected time windows.</p>

        <h3 className="font-bold text-sm text-on-surface">2. Macro Disclaimer</h3>
        <p>Nutritional calculations are estimates based on standardized raw ingredient weights. Slight natural variations (+/- 5%) may occur during cooking.</p>

        <h3 className="font-bold text-sm text-on-surface">3. Pause & Cancellation Policy</h3>
        <p>Customers can pause active subscriptions at any time. Cancellations are subject to backend refund calculation based on unused eligible days.</p>
      </div>
    </div>
  );
}
