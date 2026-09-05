import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMacroCart } from '../context/MacroCartContext';

export default function DailyMealReview() {
  const navigate = useNavigate();
  const { cartItems, consumed, targets, updateQuantity, removeFromCart } = useMacroCart();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Summary Review</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Review Your Daily Meal Plan</h1>
        <p className="text-xs text-outline">
          Verify your selected Indian meals and macro totals before advancing to checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-surface-container-lowest border border-surface-container p-12 rounded-3xl text-center space-y-4 shadow-soft">
          <span className="material-symbols-outlined text-4xl text-outline">no_meals</span>
          <h3 className="font-display font-bold text-lg text-on-surface">Your Meal Plan is Empty</h3>
          <p className="text-xs text-outline">Add high-protein meals from our catalog to review your plan.</p>
          <Link to="/build-meals" className="inline-block py-3 px-6 bg-primary text-white font-bold text-xs rounded-full shadow-md">
            Go to Meal Builder
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Selected Items List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display font-bold text-xl text-on-surface">Selected Dishes ({cartItems.length})</h3>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-surface-container-lowest border border-surface-container p-4 rounded-3xl shadow-soft flex items-center gap-4">
                  <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-base text-on-surface">{item.name}</h4>
                      <span className="font-display font-bold text-base text-primary">₹{item.price * item.quantity}</span>
                    </div>

                    <div className="text-xs text-tertiary font-semibold mt-0.5">
                      {item.protein * item.quantity}g Protein • {item.calories * item.quantity} kcal
                    </div>

                    {item.customizations?.length > 0 && (
                      <div className="text-[11px] text-outline mt-1 bg-surface-container-low p-1.5 rounded-lg">
                        {item.customizations.map(c => c.name).join(', ')}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-2.5 py-1 border border-surface-container">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-xs font-bold px-1.5 hover:text-primary">-</button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-xs font-bold px-1.5 hover:text-primary">+</button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-error font-semibold hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Macro Summary & Proceed */}
          <div className="space-y-6">
            <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-6">
              <h3 className="font-display font-bold text-lg text-on-surface border-b border-surface-container pb-3">
                Plan Macro Totals
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-outline">Calories</span>
                  <span className="text-primary font-display text-sm">{consumed.calories} / {targets.calories} kcal</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-outline">Protein</span>
                  <span className="text-tertiary font-display text-sm">{consumed.protein} / {targets.protein} g</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-outline">Carbohydrates</span>
                  <span>{consumed.carbs} / {targets.carbs} g</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-outline">Fats</span>
                  <span className="text-secondary">{consumed.fat} / {targets.fat} g</span>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container space-y-3">
                <div className="flex justify-between font-bold text-sm">
                  <span>Grand Total</span>
                  <span className="text-primary font-display text-xl">₹{consumed.price}</span>
                </div>

                <button
                  onClick={() => navigate('/cart')}
                  className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Cart & Delivery Address</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
