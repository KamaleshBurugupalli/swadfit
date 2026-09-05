import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchFoods } from '../services/api';
import { useMacroCart } from '../context/MacroCartContext';
import MacroProgressBar from '../components/MacroProgressBar';
import FoodCard from '../components/FoodCard';
import MealCustomizerModal from '../components/MealCustomizerModal';
import SmartRecommendationsWidget from '../components/SmartRecommendationsWidget';

export default function BuildYourMeal() {
  const navigate = useNavigate();
  const { cartItems, targets, consumed, remaining, warnings, addToCart, updateQuantity, removeFromCart } = useMacroCart();
  const [foods, setFoods] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCustomFood, setSelectedCustomFood] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  useEffect(() => {
    fetchFoods({ filter: activeFilter })
      .then(res => {
        if (res.data?.data) setFoods(res.data.data);
      });
  }, [activeFilter]);

  const handleOpenCustomize = (food) => {
    setSelectedCustomFood(food);
    setIsCustomModalOpen(true);
  };

  return (
    <div className="py-6 space-y-8">
      
      {/* Sticky Macro Tracker Header Bar */}
      <div className="sticky top-20 z-30 bg-surface-container-lowest/95 backdrop-blur-md border border-surface-container p-4 sm:p-6 rounded-3xl shadow-glow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              <h2 className="font-display font-bold text-xl text-on-surface">Daily Macro Tracker</h2>
            </div>
            <p className="text-xs text-outline">Real-time macro balance for your selected daily meal plan.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-outline uppercase tracking-wider font-bold block">Selected Plan Price</span>
              <span className="font-display font-black text-xl text-primary">₹{consumed.price}</span>
            </div>
            <Link
              to="/review-meals"
              className="py-3 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-xs rounded-full shadow-md transition-all flex items-center gap-1.5"
            >
              Review Meals ({cartItems.reduce((s, i) => s + i.quantity, 0)})
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Warnings Banner if Exceeded */}
        {warnings.map((w, idx) => (
          <div key={idx} className="bg-error-container text-on-error-container p-3 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-base">warning</span>
            <span>{w}</span>
          </div>
        ))}

        {/* Macro Progress Bars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          <MacroProgressBar label="Calories" consumed={consumed.calories} target={targets.calories} unit="kcal" />
          <MacroProgressBar label="Protein" consumed={consumed.protein} target={targets.protein} unit="g" />
          <MacroProgressBar label="Carbohydrates" consumed={consumed.carbs} target={targets.carbs} unit="g" />
          <MacroProgressBar label="Healthy Fats" consumed={consumed.fat} target={targets.fat} unit="g" />
          <MacroProgressBar label="Dietary Fibre" consumed={consumed.fibre} target={targets.fibre} unit="g" />
        </div>
      </div>

      {/* Smart Recommendations Engine Widget */}
      <SmartRecommendationsWidget onAddFood={(f) => addToCart(f)} />

      {/* Food Filter Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-2xl text-on-surface">Select Foods for Your Meal Plan</h3>
          <span className="text-xs font-bold text-outline">{foods.length} Dishes Available</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            'All', 'Veg', 'Non-Veg', 'High Protein', 'Low Calorie', 'Chicken', 'Seafood', 'Paneer', 'Breakfast', 'Snacks'
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Food Cards Grid & Selected Items Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Foods catalog */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAdd={(f) => addToCart(f)}
              onCustomize={handleOpenCustomize}
            />
          ))}
        </div>

        {/* Right Col: Selected Items Cart Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-4 sticky top-72">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <h4 className="font-display font-bold text-lg text-on-surface">Selected Meals</h4>
              <span className="bg-primary-fixed text-on-primary-fixed font-bold text-xs px-2.5 py-0.5 rounded-full">
                {cartItems.length} Items
              </span>
            </div>

            {cartItems.length === 0 ? (
              <div className="py-8 text-center text-outline space-y-2">
                <span className="material-symbols-outlined text-3xl">flatware</span>
                <p className="text-xs">Your meal plan is currently empty.</p>
                <p className="text-[11px]">Click "Add" on any dish above to start matching your target macros.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-surface-container-low p-3 rounded-2xl space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-bold text-xs text-on-surface">{item.name}</h5>
                        <div className="text-[10px] text-tertiary font-semibold">
                          {item.protein * item.quantity}g Protein • {item.calories * item.quantity} kcal
                        </div>
                      </div>
                      <span className="font-bold text-xs text-primary">₹{item.price * item.quantity}</span>
                    </div>

                    {item.customizations?.length > 0 && (
                      <div className="text-[10px] text-outline bg-white/60 p-1.5 rounded-lg">
                        {item.customizations.map(c => c.name).join(', ')}
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 bg-white rounded-full px-2 py-0.5 border border-surface-container">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-xs font-bold px-1.5 hover:text-primary">-</button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-xs font-bold px-1.5 hover:text-primary">+</button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-error font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="pt-3 border-t border-surface-container space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span>Subtotal</span>
                  <span className="text-primary font-display text-base">₹{consumed.price}</span>
                </div>
                <Link
                  to="/review-meals"
                  className="w-full py-3.5 px-4 bg-primary hover:bg-primary-container text-white font-display font-bold text-xs rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Review Meals</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <MealCustomizerModal
        food={selectedCustomFood}
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={(customized, customList) => addToCart(customized, customList)}
      />
    </div>
  );
}
