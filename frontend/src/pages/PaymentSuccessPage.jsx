import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PaymentSuccessPage() {
  const location = useLocation();
  const order = location.state?.order || {
    order_number: 'SWAD-89412',
    total_price: 558,
    delivery_slot: '12:00 PM - 01:00 PM',
    kitchen: 'Swadfit Kitchen Hitec City',
    total_protein: 92,
    total_calories: 1000
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-glow text-center space-y-6">
        
        <div className="w-20 h-20 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center mx-auto shadow-md animate-bounce">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-tertiary uppercase tracking-wider block">Payment Verified</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Order Placed Successfully!</h1>
          <p className="text-xs text-outline">
            Order <strong className="text-on-surface">#{order.order_number}</strong> is confirmed with {order.kitchen}.
          </p>
        </div>

        <div className="bg-surface-container-low p-4 rounded-2xl space-y-2 text-xs text-left">
          <div className="flex justify-between">
            <span className="text-outline font-semibold">Delivery Window:</span>
            <span className="font-bold text-on-surface">{order.delivery_slot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline font-semibold">Protein Delivered:</span>
            <span className="font-bold text-tertiary">{order.total_protein}g Protein</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline font-semibold">Total Paid:</span>
            <span className="font-bold text-primary font-display text-base">₹{order.total_price}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to={`/dashboard/track-delivery/${order.id || 'ORD-89412'}`}
            className="flex-1 py-3.5 px-4 bg-primary hover:bg-primary-container text-white font-display font-bold text-xs rounded-full shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">near_me</span>
            Track Live Delivery
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 py-3.5 px-4 bg-surface-container-high hover:bg-surface-container text-on-surface font-display font-bold text-xs rounded-full border border-surface-container transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
