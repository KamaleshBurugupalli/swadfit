import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMacroCart } from '../context/MacroCartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, consumed, updateQuantity, removeFromCart, clearCart } = useMacroCart();

  const deliveryFee = consumed.price > 500 ? 0 : 40;
  const tax = Math.round(consumed.price * 0.05);
  const grandTotal = consumed.price + deliveryFee + tax;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Checkout Ready</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Your Food Cart</h1>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-error hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">delete</span> Empty Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-surface-container-lowest border border-surface-container p-12 rounded-3xl text-center space-y-4 shadow-soft">
          <span className="material-symbols-outlined text-5xl text-outline">shopping_cart</span>
          <h3 className="font-display font-bold text-xl text-on-surface">Your Cart is Currently Empty</h3>
          <p className="text-xs text-outline">Browse our menu of high-protein Indian dishes to populate your cart.</p>
          <Link to="/explore-meals" className="inline-block py-3 px-6 bg-primary text-white font-bold text-xs rounded-full shadow-md">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-surface-container-lowest border border-surface-container p-4 rounded-3xl shadow-soft flex items-center gap-4">
                <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-on-surface">{item.name}</h4>
                      <div className="text-xs text-tertiary font-bold mt-0.5">
                        {item.protein * item.quantity}g Protein • {item.calories * item.quantity} kcal
                      </div>
                    </div>
                    <span className="font-display font-bold text-base text-primary">₹{item.price * item.quantity}</span>
                  </div>

                  {item.customizations?.length > 0 && (
                    <div className="text-[11px] text-outline mt-1 bg-surface-container-low p-1.5 rounded-lg">
                      Customizations: {item.customizations.map(c => c.name).join(', ')}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-surface-container-low rounded-full px-2.5 py-1 border border-surface-container">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-xs font-bold px-1.5 hover:text-primary">-</button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-xs font-bold px-1.5 hover:text-primary">+</button>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link to={`/customize-dish/${item.id}`} className="text-xs text-primary font-bold hover:underline">
                        Customize
                      </Link>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-error font-semibold hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment & Order Summary */}
          <div className="space-y-6">
            <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl shadow-soft space-y-4">
              <h3 className="font-display font-bold text-lg text-on-surface border-b border-surface-container pb-3">
                Order Bill Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-outline">Item Total</span>
                  <span className="font-bold">₹{consumed.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Delivery Charge (Hyderabad Zone)</span>
                  <span className="font-bold">{deliveryFee === 0 ? <span className="text-tertiary font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">Taxes & Packaging (5%)</span>
                  <span className="font-bold">₹{tax}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container flex justify-between font-bold text-sm">
                <span>To Pay</span>
                <span className="text-primary font-display text-xl">₹{grandTotal}</span>
              </div>

              <button
                onClick={() => navigate('/checkout/address')}
                className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-glow transition-colors flex items-center justify-center gap-2"
              >
                <span>Proceed to Select Address</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
