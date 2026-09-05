import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../services/api';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(res => res.data?.data && setOrders(res.data.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Account Records</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Order History</h1>
        <p className="text-xs text-outline">View past delivered meals and live dispatches.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-3">
              <div>
                <span className="font-display font-bold text-lg text-on-surface">Order #{order.order_number}</span>
                <span className="text-xs text-outline block">{new Date(order.created_at).toLocaleDateString()} • {order.delivery_slot}</span>
              </div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs px-3 py-1 rounded-full self-start">
                {order.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {order.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between text-on-surface">
                  <span>{it.name} (x{it.quantity})</span>
                  <span className="font-bold">₹{it.price}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-surface-container text-xs">
              <span className="font-bold text-tertiary">{order.total_protein}g Protein Total</span>
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-base text-primary">Total: ₹{order.total_price}</span>
                <Link to={`/dashboard/track-delivery/${order.id}`} className="py-2 px-4 bg-primary text-white font-bold rounded-full shadow-sm">
                  Track Delivery
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
