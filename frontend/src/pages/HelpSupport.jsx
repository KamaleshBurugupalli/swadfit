import React from 'react';
import { Link } from 'react-router-dom';

export default function HelpSupport() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display font-bold text-3xl text-on-surface">Help & Support Desk</h1>
        <p className="text-xs text-outline">Instant assistance for your active orders and meal plan queries.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-3 shadow-soft text-center">
          <span className="material-symbols-outlined text-primary text-4xl">two_wheeler</span>
          <h3 className="font-bold text-base text-on-surface">Order Delivery Issue</h3>
          <p className="text-xs text-outline">Order delayed or drop location change needed?</p>
          <Link to="/contact" className="inline-block py-2 px-4 bg-primary text-white text-xs font-bold rounded-full">
            Chat with Dispatch
          </Link>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-3 shadow-soft text-center">
          <span className="material-symbols-outlined text-tertiary text-4xl">local_hospital</span>
          <h3 className="font-bold text-base text-on-surface">Dietary & Nutrition Query</h3>
          <p className="text-xs text-outline">Consult our sports nutritionist regarding macro targets.</p>
          <Link to="/contact" className="inline-block py-2 px-4 bg-tertiary text-white text-xs font-bold rounded-full">
            Consult Nutritionist
          </Link>
        </div>
      </div>
    </div>
  );
}
