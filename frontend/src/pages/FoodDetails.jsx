import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchFoodById } from '../services/api';
import { useMacroCart } from '../context/MacroCartContext';
import MealCustomizerModal from '../components/MealCustomizerModal';

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useMacroCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  useEffect(() => {
    fetchFoodById(id)
      .then(res => {
        if (res.data?.data) setFood(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-outline">
        <span className="material-symbols-outlined text-4xl animate-spin">sync</span>
        <p className="text-xs mt-2">Loading dish nutrition breakdown...</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold">Dish Not Found</h2>
        <Link to="/explore-meals" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full">
          Back to Explore Meals
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-xs font-bold text-outline hover:text-on-surface"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Image & Badges */}
        <div className="space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-soft h-80 bg-surface-variant">
            <img src={food.image_url} alt={food.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              {food.is_veg ? (
                <span className="bg-white/90 text-tertiary px-3 py-1 rounded-full text-xs font-bold border border-tertiary/20">
                  100% Veg
                </span>
              ) : (
                <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                  High Protein Non-Veg
                </span>
              )}
              <span className="bg-on-surface/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {food.portion_size}
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container p-4 rounded-2xl flex items-center justify-between text-xs font-semibold">
            <span className="text-outline">Spice Level</span>
            <span className="text-secondary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">local_fire_department</span>
              {food.spice_level}
            </span>
          </div>
        </div>

        {/* Right Column: Title, Description, Macro Breakdown */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold text-tertiary uppercase tracking-widest block mb-1">
              {food.category_name}
            </span>
            <h1 className="font-display font-black text-3xl text-on-surface mb-2">{food.name}</h1>
            <p className="text-sm text-outline leading-relaxed">{food.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-3xl text-primary">₹{food.price}</span>
            <span className="text-xs text-outline font-medium">per {food.portion_size} serving</span>
          </div>

          {/* Detailed Nutritional Fact Sheet */}
          <div className="bg-surface-container-low border border-surface-container p-5 rounded-3xl space-y-4">
            <h3 className="font-display font-bold text-base text-on-surface flex items-center justify-between">
              <span>Verified Nutrition Facts</span>
              <span className="text-xs text-tertiary font-bold">{food.calories} Total kcal</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-2xl text-center border border-surface-container">
                <span className="text-[10px] text-outline font-semibold block">Protein</span>
                <span className="text-lg font-bold text-tertiary">{food.protein}g</span>
              </div>
              <div className="bg-white p-3 rounded-2xl text-center border border-surface-container">
                <span className="text-[10px] text-outline font-semibold block">Carbohydrates</span>
                <span className="text-lg font-bold text-on-surface">{food.carbs}g</span>
              </div>
              <div className="bg-white p-3 rounded-2xl text-center border border-surface-container">
                <span className="text-[10px] text-outline font-semibold block">Healthy Fats</span>
                <span className="text-lg font-bold text-secondary">{food.fat}g</span>
              </div>
              <div className="bg-white p-3 rounded-2xl text-center border border-surface-container">
                <span className="text-[10px] text-outline font-semibold block">Dietary Fibre</span>
                <span className="text-lg font-bold text-on-surface">{food.fibre}g</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="flex-1 py-4 px-6 bg-primary-fixed/40 hover:bg-primary-fixed text-primary font-display font-bold text-sm rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">tune</span>
              Customize Recipe
            </button>
            <button
              onClick={() => { addToCart(food); navigate('/cart'); }}
              className="flex-1 py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-glow transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Add to Meal Plan
            </button>
          </div>
        </div>
      </div>

      <MealCustomizerModal
        food={food}
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={(customized) => { addToCart(customized); navigate('/cart'); }}
      />
    </div>
  );
}
