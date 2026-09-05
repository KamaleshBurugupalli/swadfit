import React from 'react';
import { useMacroCart } from '../context/MacroCartContext';

export default function SmartRecommendationsWidget({ onAddFood }) {
  const { remaining, recommendations } = useMacroCart();

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-tertiary-fixed/30 border border-tertiary-fixed-dim/50 p-5 rounded-3xl mb-8 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="bg-tertiary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-xs">auto_awesome</span> Smart Macro Match
          </span>
          <h3 className="font-display font-bold text-lg text-on-tertiary-fixed">
            Recommended For Your Remaining Goals
          </h3>
          <p className="text-xs text-on-tertiary-fixed-variant">
            You have <strong className="text-tertiary">{remaining.protein}g Protein</strong> & <strong className="text-primary">{remaining.calories} kcal</strong> remaining for today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.slice(0, 4).map((food) => (
          <div key={food.id} className="bg-surface-container-lowest border border-surface-container p-3 rounded-2xl flex flex-col justify-between shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <img src={food.image_url} alt={food.name} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-xs text-on-surface line-clamp-1">{food.name}</h4>
                <div className="text-[11px] text-tertiary font-semibold flex items-center gap-1">
                  <span>{food.protein}g Protein</span>
                  <span>•</span>
                  <span>{food.calories} kcal</span>
                </div>
                <div className="text-[10px] text-outline line-clamp-1">{food.fitReason}</div>
              </div>
            </div>

            <button
              onClick={() => onAddFood(food)}
              className="w-full py-1.5 px-3 text-xs font-bold text-tertiary bg-tertiary-fixed/50 hover:bg-tertiary-fixed rounded-xl transition-colors flex items-center justify-center gap-1 mt-2"
            >
              <span className="material-symbols-outlined text-sm">add</span> Add to Meal Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
