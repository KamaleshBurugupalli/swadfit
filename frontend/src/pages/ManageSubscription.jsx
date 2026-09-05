import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSubscription } from '../services/api';

export default function ManageSubscription() {
  const [sub, setSub] = useState(null);

  useEffect(() => {
    fetchSubscription().then(res => res.data?.data && setSub(res.data.data));
  }, []);

  if (!sub) return <div className="py-20 text-center text-outline">Loading subscription plan...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Active Commitment</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Manage Meal Subscription</h1>
        <p className="text-xs text-outline">Full control over your daily food plan, delivery slots, and status.</p>
      </div>

      {/* Main Status Banner */}
      <div className="bg-surface-container-lowest border border-surface-container p-6 sm:p-8 rounded-3xl shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-4">
          <div>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold px-3 py-1 rounded-full">
              Status: {sub.status}
            </span>
            <h2 className="font-display font-bold text-2xl text-on-surface mt-2">{sub.plan_name}</h2>
            <p className="text-xs text-outline">{sub.delivery_slot} • {sub.delivery_address}</p>
          </div>

          <div className="text-right">
            <span className="text-xs text-outline block">Total Paid</span>
            <span className="font-display font-black text-2xl text-primary">₹{sub.total_price}</span>
            <span className="text-[11px] text-tertiary font-bold block">Saved ₹{sub.discount}</span>
          </div>
        </div>

        {/* Days Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-on-surface">Plan Duration Progress</span>
            <span className="text-tertiary">{sub.used_days} / {sub.total_days} Days Delivered</span>
          </div>
          <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
            <div 
              className="bg-tertiary h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.round((sub.used_days / sub.total_days) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-outline font-semibold">
            {sub.remaining_days} unused eligible days remaining in current cycle.
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-surface-container">
          {sub.status === 'Active' ? (
            <Link
              to="/dashboard/subscription/pause"
              className="py-3 px-4 bg-secondary-fixed/50 hover:bg-secondary-fixed text-on-secondary-fixed font-display font-bold text-xs rounded-2xl text-center transition-colors flex flex-col items-center gap-1"
            >
              <span className="material-symbols-outlined text-lg">pause_circle</span>
              Pause Subscription
            </Link>
          ) : (
            <Link
              to="/dashboard/subscription/resume"
              className="py-3 px-4 bg-tertiary-fixed text-on-tertiary-fixed font-display font-bold text-xs rounded-2xl text-center transition-colors flex flex-col items-center gap-1"
            >
              <span className="material-symbols-outlined text-lg">play_circle</span>
              Resume Subscription
            </Link>
          )}

          <Link
            to="/dashboard/subscription/change"
            className="py-3 px-4 bg-surface-container-high hover:bg-surface-container text-on-surface font-display font-bold text-xs rounded-2xl text-center transition-colors flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined text-lg">published_with_changes</span>
            Change Plan / Meals
          </Link>

          <Link
            to="/dashboard/upcoming-meals"
            className="py-3 px-4 bg-surface-container-high hover:bg-surface-container text-on-surface font-display font-bold text-xs rounded-2xl text-center transition-colors flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Upcoming Meals
          </Link>

          <Link
            to="/dashboard/subscription/cancel"
            className="py-3 px-4 bg-error-container/40 hover:bg-error-container text-on-error-container font-display font-bold text-xs rounded-2xl text-center transition-colors flex flex-col items-center gap-1"
          >
            <span className="material-symbols-outlined text-lg">cancel</span>
            Cancel Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}
