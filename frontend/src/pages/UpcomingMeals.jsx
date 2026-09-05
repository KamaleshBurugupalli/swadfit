import React from 'react';
import { Link } from 'react-router-dom';

export default function UpcomingMeals() {
  const upcomingList = [
    { date: 'Tomorrow (Sep 6)', lunch: 'Hyderabadi Fit Chicken Biryani', dinner: 'Coastal Grilled Fish Curry Combo' },
    { date: 'Sunday (Sep 7)', lunch: 'Chicken Tikka & Multigrain Roti', dinner: 'High Protein Paneer Bhurji Meal' },
    { date: 'Monday (Sep 8)', lunch: 'Masala Prawns Quinoa Bowl', dinner: 'Tandoori Chicken Breast Bowl' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-tertiary uppercase tracking-widest block">Subscription Calendar</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Upcoming Scheduled Meals</h1>
        <p className="text-xs text-outline">Swap upcoming dishes up to 8 hours before delivery window opens.</p>
      </div>

      <div className="space-y-4">
        {upcomingList.map((item, idx) => (
          <div key={idx} className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-3">
            <div className="flex justify-between items-center border-b border-surface-container pb-2">
              <h3 className="font-display font-bold text-lg text-on-surface">{item.date}</h3>
              <span className="text-xs text-tertiary font-bold">Confirmed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-surface-container-low p-3.5 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-outline font-semibold block text-[10px]">Lunch (12 PM)</span>
                  <span className="font-bold text-on-surface">{item.lunch}</span>
                </div>
                <Link to="/dashboard/change-meal/ORD-89412" className="text-xs font-bold text-primary hover:underline">
                  Swap
                </Link>
              </div>

              <div className="bg-surface-container-low p-3.5 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-outline font-semibold block text-[10px]">Dinner (8 PM)</span>
                  <span className="font-bold text-on-surface">{item.dinner}</span>
                </div>
                <Link to="/dashboard/change-meal/ORD-89412" className="text-xs font-bold text-primary hover:underline">
                  Swap
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
