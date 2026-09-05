import React from 'react';

export default function FoodCard({ food, onAdd, onCustomize }) {
  return (
    <div className="bg-surface-container-lowest border border-surface-container rounded-2xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300 flex flex-col group">
      {/* Image Header with Veg / Non-Veg Indicator */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-variant">
        <img 
          src={food.image_url} 
          alt={food.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {food.is_veg ? (
            <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-tertiary border border-tertiary/20 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> Veg
            </span>
          ) : (
            <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-primary border border-primary/20 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Non-Veg
            </span>
          )}
          <span className="bg-on-surface/80 text-white backdrop-blur-md text-[11px] font-medium px-2 py-0.5 rounded-full">
            {food.portion_size}
          </span>
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-on-surface shadow-sm">
          ₹{food.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-secondary mb-1">
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            <span>{food.calories} kcal</span>
            <span>•</span>
            <span className="text-tertiary font-semibold">{food.protein}g Protein</span>
          </div>

          <h3 className="font-display font-bold text-lg text-on-surface line-clamp-1 mb-1">
            {food.name}
          </h3>
          
          <p className="text-xs text-outline line-clamp-2 mb-3">
            {food.description}
          </p>

          {/* Macro Pills */}
          <div className="grid grid-cols-4 gap-1.5 bg-surface-container-low p-2 rounded-xl text-center mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline font-medium">Protein</span>
              <span className="text-xs font-bold text-tertiary">{food.protein}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-outline font-medium">Carbs</span>
              <span className="text-xs font-bold text-on-surface">{food.carbs}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-outline font-medium">Fats</span>
              <span className="text-xs font-bold text-secondary">{food.fat}g</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-outline font-medium">Fibre</span>
              <span className="text-xs font-bold text-on-surface">{food.fibre}g</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-surface-container">
          <button
            onClick={() => onCustomize(food)}
            className="flex-1 py-2 px-3 text-xs font-semibold text-primary bg-primary-fixed/40 hover:bg-primary-fixed rounded-full transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            Customize
          </button>
          <button
            onClick={() => onAdd(food)}
            className="py-2 px-4 text-xs font-bold text-white bg-primary hover:bg-primary-container rounded-full transition-colors flex items-center justify-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
