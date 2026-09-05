import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateSubscriptionAPI } from '../services/api';

export default function ChangeSubscription() {
  const navigate = useNavigate();
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [slot, setSlot] = useState('Breakfast, Lunch & Dinner');

  const handleChange = async (e) => {
    e.preventDefault();
    await updateSubscriptionAPI('SUB-77291', { mealsPerDay, deliverySlot: slot });
    navigate('/dashboard/subscription');
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-display font-bold text-2xl text-on-surface">Change Subscription Tier</h1>
          <p className="text-xs text-outline">Adjust your daily meal count and delivery slots.</p>
        </div>

        <form onSubmit={handleChange} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-outline block mb-1">Meals Per Day</label>
            <select 
              value={mealsPerDay}
              onChange={(e) => setMealsPerDay(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
            >
              <option value="1">1 Meal / Day</option>
              <option value="2">2 Meals / Day</option>
              <option value="3">3 Meals / Day</option>
              <option value="4">4 Meals / Day</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-outline block mb-1">Delivery Time Slots</label>
            <input 
              type="text"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md"
          >
            Update Subscription Plan
          </button>
        </form>
      </div>
    </div>
  );
}
