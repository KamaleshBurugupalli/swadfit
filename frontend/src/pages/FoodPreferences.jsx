import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function FoodPreferences() {
  const navigate = useNavigate();
  const { user, updatePreferences } = useAuth();

  const [diet, setDiet] = useState(user?.preferences?.diet || 'Both');
  const [spice, setSpice] = useState(user?.preferences?.spice || 'Medium');
  const [allergies, setAllergies] = useState(user?.preferences?.allergies || []);

  const toggleAllergy = (item) => {
    setAllergies(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePreferences({ diet, spice, allergies });
    navigate('/onboarding/meal-plan-select');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-8">
        
        {/* Step Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Step 2 of 4</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Food & Flavor Preferences</h1>
          <p className="text-xs text-outline">
            Tell us your dietary style, spice level, and allergies so we display compatible Indian meals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Dietary Choice */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-outline uppercase tracking-wider block">Dietary Lifestyle</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { type: 'Veg', label: '100% Veg', icon: 'eco' },
                { type: 'Non-Veg', label: 'High Protein Non-Veg', icon: 'restaurant' },
                { type: 'Eggitarian', label: 'Egg + Veg', icon: 'egg' },
                { type: 'Both', label: 'Both / Flexible', icon: 'shuffle' }
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setDiet(item.type)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    diet === item.type
                      ? 'border-primary bg-primary-fixed/30 text-primary font-bold shadow-sm'
                      : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  <span className="text-xs font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spice Preference */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-outline uppercase tracking-wider block">Spice & Cooking Preference</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { level: 'Mild', desc: 'Gentle Indian spices, low chili' },
                { level: 'Medium', desc: 'Balanced authentic taste' },
                { level: 'Spicy', desc: 'Bold Hyderabadi spice hit' }
              ].map((item) => (
                <button
                  key={item.level}
                  type="button"
                  onClick={() => setSpice(item.level)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    spice === item.level
                      ? 'border-secondary bg-secondary-fixed/40 text-secondary font-bold'
                      : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface'
                  }`}
                >
                  <div className="text-sm font-bold">{item.level}</div>
                  <div className="text-[10px] text-outline mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Special Preferences & Restrictions */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-outline uppercase tracking-wider block">Special Dietary Restrictions</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                'No Onion & No Garlic (Vedic)',
                'Lactose / Dairy Free',
                'Gluten Free Roti / Grains',
                'Nut & Peanut Free'
              ].map((option) => {
                const isSelected = allergies.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAllergy(option)}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'border-tertiary bg-tertiary-fixed/30 text-tertiary font-bold'
                        : 'border-surface-container bg-surface text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span>{option}</span>
                    <span className="material-symbols-outlined text-sm">
                      {isSelected ? 'check_box' : 'checkbox_outline_blank'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Save Preferences & Select Meal Frequency</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
