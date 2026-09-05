import React from 'react';
import { Link } from 'react-router-dom';
import { useMacroCart } from '../context/MacroCartContext';
import MacroProgressBar from '../components/MacroProgressBar';

export default function MacroTrackerPage() {
  const { targets, consumed, remaining, warnings, cartItems } = useMacroCart();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Scientific Nutrition</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Daily Macro Analytics</h1>
          <p className="text-xs text-outline">Detailed comparison of target vs selected food intake.</p>
        </div>
        <Link
          to="/onboarding/targets"
          className="py-2.5 px-5 bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-xs rounded-full border border-surface-container transition-colors self-start"
        >
          Edit Target Goals
        </Link>
      </div>

      {/* Warning Banners */}
      {warnings.map((w, idx) => (
        <div key={idx} className="bg-error-container text-on-error-container p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-lg">warning</span>
          <span>{w}</span>
        </div>
      ))}

      {/* Main Macro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Calories Card */}
        <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Calorie Intake</span>
            <span className="bg-primary-fixed text-on-primary-fixed font-bold text-xs px-3 py-1 rounded-full">
              {consumed.calories} / {targets.calories} kcal
            </span>
          </div>

          <div className="text-center py-4">
            <span className="font-display font-black text-5xl text-primary">{consumed.calories}</span>
            <span className="text-xs text-outline block mt-1">kcal consumed</span>
            <span className="text-xs font-bold text-tertiary block mt-1">
              {remaining.calories >= 0 ? `${remaining.calories} kcal remaining` : `${Math.abs(remaining.calories)} kcal over limit`}
            </span>
          </div>

          <MacroProgressBar label="Calorie Target" consumed={consumed.calories} target={targets.calories} unit="kcal" />
        </div>

        {/* Protein Card */}
        <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-outline uppercase tracking-wider">Protein Goal</span>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs px-3 py-1 rounded-full">
              {consumed.protein} / {targets.protein} g
            </span>
          </div>

          <div className="text-center py-4">
            <span className="font-display font-black text-5xl text-tertiary">{consumed.protein}g</span>
            <span className="text-xs text-outline block mt-1">protein consumed</span>
            <span className="text-xs font-bold text-tertiary block mt-1">
              {remaining.protein >= 0 ? `${remaining.protein}g protein to reach goal` : `Goal Achieved! (+${Math.abs(remaining.protein)}g)`}
            </span>
          </div>

          <MacroProgressBar label="Protein Target" consumed={consumed.protein} target={targets.protein} unit="g" />
        </div>
      </div>

      {/* Secondary Macros Breakdown Grid */}
      <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-6 shadow-soft">
        <h3 className="font-display font-bold text-lg text-on-surface">Carbohydrates, Fats & Fibre</h3>
        
        <div className="space-y-4">
          <MacroProgressBar label="Carbohydrates" consumed={consumed.carbs} target={targets.carbs} unit="g" />
          <MacroProgressBar label="Healthy Fats" consumed={consumed.fat} target={targets.fat} unit="g" />
          <MacroProgressBar label="Dietary Fibre" consumed={consumed.fibre} target={targets.fibre} unit="g" />
        </div>
      </div>

      {/* Selected Items Breakdown List */}
      <div className="bg-surface-container-low border border-surface-container p-6 rounded-3xl space-y-4">
        <h3 className="font-display font-bold text-lg text-on-surface">Included Dishes ({cartItems.length})</h3>

        {cartItems.length === 0 ? (
          <p className="text-xs text-outline">No dishes selected yet in current meal plan.</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-surface-container text-xs">
                <div>
                  <div className="font-bold text-on-surface">{item.name} (x{item.quantity})</div>
                  <div className="text-outline text-[11px]">
                    {item.calories * item.quantity} kcal | {item.protein * item.quantity}g Protein | {item.carbs * item.quantity}g Carbs
                  </div>
                </div>
                <div className="font-bold text-primary font-display text-sm">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
