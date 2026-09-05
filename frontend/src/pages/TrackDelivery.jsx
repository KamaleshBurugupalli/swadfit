import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderById } from '../services/api';
import OrderStatusTracker from '../components/OrderStatusTracker';

export default function TrackDelivery() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderById(orderId || 'ORD-89412').then(res => res.data?.data && setOrder(res.data.data));
  }, [orderId]);

  if (!order) return <div className="py-20 text-center text-outline">Loading delivery location...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Live Dispatch Tracker</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Order #{order.order_number}</h1>
          <p className="text-xs text-outline">Dispatched from {order.kitchen}</p>
        </div>
        <Link to="/dashboard" className="py-2 px-4 bg-surface-container-high text-xs font-bold rounded-full">
          Back to Dashboard
        </Link>
      </div>

      {/* Tracker Banner */}
      <OrderStatusTracker status={order.status} />

      {/* Delivery Agent Card & Mock Interactive Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mock Map View */}
        <div className="bg-surface-container-low border border-surface-container rounded-3xl h-72 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-soft">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#a93200_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 space-y-2">
            <span className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto shadow-glow animate-bounce">
              <span className="material-symbols-outlined text-2xl">two_wheeler</span>
            </span>
            <h4 className="font-display font-bold text-base text-on-surface">Hyderabad Hitec City Corridor</h4>
            <p className="text-xs text-outline max-w-xs">
              Delivery partner Suresh Kumar is en route on Mindspace Rd (~1.8 km away).
            </p>
          </div>
        </div>

        {/* Delivery Partner Details */}
        <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-6 shadow-soft">
          <h3 className="font-display font-bold text-lg text-on-surface border-b border-surface-container pb-3">
            Delivery Partner Information
          </h3>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xl">
              SK
            </div>
            <div>
              <h4 className="font-bold text-base text-on-surface">{order.delivery_agent?.name || 'Suresh Kumar'}</h4>
              <p className="text-xs text-outline">Vehicle: {order.delivery_agent?.vehicle || 'TS 09 SW 4092'}</p>
              <p className="text-xs text-tertiary font-bold mt-0.5">Rating: 4.9 ★ (1,200+ deliveries)</p>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <a
              href={`tel:${order.delivery_agent?.phone}`}
              className="flex-1 py-3 px-4 bg-tertiary hover:bg-tertiary-container text-white font-display font-bold text-xs rounded-full shadow-md text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              Call Partner
            </a>
            <button
              onClick={() => alert("Instruction sent to delivery agent!")}
              className="flex-1 py-3 px-4 bg-surface-container-high text-on-surface font-display font-bold text-xs rounded-full border border-surface-container text-center"
            >
              Add Drop Instruction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
