import React from 'react';
import { useMacroCart } from '../context/MacroCartContext';
import SmartRecommendationsWidget from '../components/SmartRecommendationsWidget';
import FoodCard from '../components/FoodCard';

export default function SmartRecommendationsPage() {
  const { remaining, recommendations, addToCart } = useMacroCart();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs font-bold text-tertiary uppercase tracking-widest block">AI-Powered Macro Engine</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Smart Food Recommendations</h1>
        <p className="text-xs text-outline">
          Calculated dynamically to fill your remaining <strong className="text-tertiary">{remaining.protein}g Protein</strong> & <strong className="text-primary">{remaining.calories} kcal</strong> target.
        </p>
      </div>

      {/* Widget */}
      <SmartRecommendationsWidget onAddFood={(f) => addToCart(f)} />

      {/* Recommended Food Cards */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-on-surface">Top Matched Dishes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAdd={(f) => addToCart(f)}
              onCustomize={(f) => addToCart(f)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
