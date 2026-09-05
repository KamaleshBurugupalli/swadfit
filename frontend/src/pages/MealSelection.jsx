import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MealSelection() {
  const navigate = useNavigate();
  const [mealsPerDay, setMealsPerDay] = useState(2);
  const [selectedTypes, setSelectedTypes] = useState(['Lunch', 'Dinner']);
  const [duration, setDuration] = useState('Monthly (30 Days)');

  const toggleMealType = (type) => {
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter(t => t !== type));
      }
    } else {
      if (selectedTypes.length < mealsPerDay) {
        setSelectedTypes([...selectedTypes, type]);
      }
    }
  };

  const handleMealsCountChange = (count) => {
    setMealsPerDay(count);
    const defaultTypes = ['Breakfast', 'Lunch', 'Pre-workout', 'Dinner', 'Snacks'];
    setSelectedTypes(defaultTypes.slice(0, count));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/onboarding/timings');
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-8">
        
        {/* Step Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Step 3 of 4</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Select Number of Meals & Slots</h1>
          <p className="text-xs text-outline">
            Choose how many macro-driven meals you want per day and specify your daily meal types.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Meals Count Selector (1-5 Meals) */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-outline uppercase tracking-wider block">Meals Per Day</label>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleMealsCountChange(num)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    mealsPerDay === num
                      ? 'border-primary bg-primary text-white font-bold shadow-md scale-105'
                      : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface'
                  }`}
                >
                  <span className="font-display font-black text-2xl">{num}</span>
                  <span className="text-[10px] uppercase font-semibold">{num === 1 ? 'Meal' : 'Meals'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Meal Types checkboxes */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-outline uppercase tracking-wider block">
                Select {mealsPerDay} Meal Types for Delivery
              </label>
              <span className="text-xs font-bold text-tertiary">
                {selectedTypes.length} / {mealsPerDay} Selected
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { type: 'Breakfast', icon: 'free_breakfast', time: '08:00 AM' },
                { type: 'Lunch', icon: 'lunch_dining', time: '12:30 PM' },
                { type: 'Pre-workout', icon: 'bolt', time: '05:00 PM' },
                { type: 'Post-workout', icon: 'fitness_center', time: '06:30 PM' },
                { type: 'Dinner', icon: 'dinner_dining', time: '08:00 PM' },
                { type: 'Snacks', icon: 'bakery_dining', time: '04:00 PM' }
              ].map((item) => {
                const isSelected = selectedTypes.includes(item.type);
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => toggleMealType(item.type)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 ${
                      isSelected
                        ? 'border-tertiary bg-tertiary-fixed/30 text-on-tertiary-fixed font-bold shadow-sm'
                        : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                      <span className="material-symbols-outlined text-base text-tertiary">
                        {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.type}</div>
                      <div className="text-[10px] text-outline">{item.time} Slot</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subscription Duration */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-outline uppercase tracking-wider block">Plan Commitment</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Weekly (7 Days)', disc: '5% Off', rate: '₹489/day' },
                { title: 'Monthly (30 Days)', disc: '15% Off (Best Value)', rate: '₹429/day' }
              ].map((plan) => (
                <button
                  key={plan.title}
                  type="button"
                  onClick={() => setDuration(plan.title)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    duration === plan.title
                      ? 'border-primary bg-primary-fixed/30 text-primary font-bold'
                      : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface'
                  }`}
                >
                  <div className="font-bold text-sm">{plan.title}</div>
                  <div className="text-xs text-tertiary font-bold">{plan.disc}</div>
                  <div className="text-[11px] text-outline mt-1">{plan.rate}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Proceed to Delivery Timings & Address</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
