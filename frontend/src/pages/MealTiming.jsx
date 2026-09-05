import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MealTiming() {
  const navigate = useNavigate();
  const [area, setArea] = useState('Hitec City');
  const [pincode, setPincode] = useState('500081');
  const [addressLine, setAddressLine] = useState('Flat 402, Oakwood Heights, Mindspace Rd');
  const [lunchSlot, setLunchSlot] = useState('12:00 PM - 01:00 PM');
  const [dinnerSlot, setDinnerSlot] = useState('08:00 PM - 09:00 PM');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/build-meals');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-8">
        
        {/* Step Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Step 4 of 4</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Delivery Location & Slot Timings</h1>
          <p className="text-xs text-outline">
            Set your Hyderabad delivery address and exact daily time slots for hot food arrivals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Location / Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-outline block mb-1">Hyderabad Service Zone</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Hitec City">Hitec City & Madhapur</option>
                <option value="Gachibowli">Gachibowli & Financial District</option>
                <option value="Jubilee Hills">Jubilee Hills & Banjara Hills</option>
                <option value="Kondapur">Kondapur & Hafeezpet</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-outline block mb-1">Pincode</label>
              <input 
                type="text" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
                placeholder="500081"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-outline block mb-1">Delivery Address & Flat/Office No.</label>
            <textarea 
              rows={2}
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* Time Slot Selectors */}
          <div className="space-y-4 pt-4 border-t border-surface-container">
            <h3 className="font-display font-bold text-base text-on-surface">Fixed Daily Delivery Window</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-outline block mb-1">Lunch Delivery Window</label>
                <select
                  value={lunchSlot}
                  onChange={(e) => setLunchSlot(e.target.value)}
                  className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM (Early Lunch)</option>
                  <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM (Standard Office)</option>
                  <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM (Late Lunch)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-outline block mb-1">Dinner Delivery Window</label>
                <select
                  value={dinnerSlot}
                  onChange={(e) => setDinnerSlot(e.target.value)}
                  className="w-full p-3 rounded-xl border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary"
                >
                  <option value="07:30 PM - 08:30 PM">07:30 PM - 08:30 PM (Early Dinner)</option>
                  <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM (Standard Dinner)</option>
                  <option value="09:00 PM - 10:00 PM">09:00 PM - 10:00 PM (Post Workout)</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Onboarding Complete! Build Your Meals</span>
            <span className="material-symbols-outlined">restaurant</span>
          </button>
        </form>
      </div>
    </div>
  );
}
