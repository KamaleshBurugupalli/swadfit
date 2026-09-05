import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMacroCart } from '../context/MacroCartContext';
import { createOrderAPI } from '../services/api';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cartItems, consumed, clearCart } = useMacroCart();

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);

  const deliveryFee = consumed.price > 500 ? 0 : 40;
  const tax = Math.round(consumed.price * 0.05);
  const grandTotal = consumed.price + deliveryFee + tax;

  const handlePayNow = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        items: cartItems,
        deliveryAddress: 'Flat 402, Oakwood Heights, Hitec City, Hyderabad',
        deliverySlot: '12:00 PM - 01:00 PM',
        paymentMethod
      };

      const res = await createOrderAPI(orderPayload);
      if (res.data?.success) {
        const createdOrder = res.data.data;
        clearCart();
        navigate('/checkout/success', { state: { order: createdOrder } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-surface-container-lowest border border-surface-container p-8 rounded-3xl shadow-soft space-y-6">
        
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Checkout Step 2</span>
          <h1 className="font-display font-bold text-3xl text-on-surface">Payment Options</h1>
          <p className="text-xs text-outline">Isolated Razorpay sandbox gateway interface.</p>
        </div>

        {/* Amount to Pay */}
        <div className="bg-surface-container p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs text-outline block">Total Payable Amount</span>
            <span className="font-display font-black text-2xl text-primary">₹{grandTotal}</span>
          </div>
          <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">lock</span>
            256-Bit Encrypted
          </span>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-outline block">Select Method</label>
          <div className="space-y-3">
            {[
              { id: 'UPI', name: 'Google Pay / PhonePe / Paytm (UPI)', desc: 'Instant 1-click payment', icon: 'qr_code_scanner' },
              { id: 'Card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: 'credit_card' },
              { id: 'NetBanking', name: 'Net Banking', desc: 'All Indian Banks supported', icon: 'account_balance' },
              { id: 'COD', name: 'Pay on Delivery', desc: 'Cash or UPI on meal arrival', icon: 'payments' }
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary-fixed/30 text-on-surface font-bold shadow-sm'
                    : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-primary">{method.icon}</span>
                  <div>
                    <div className="text-sm font-bold">{method.name}</div>
                    <div className="text-xs text-outline">{method.desc}</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-base text-primary">
                  {paymentMethod === method.id ? 'radio_button_checked' : 'radio_button_unchecked'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handlePayNow}
          disabled={loading}
          className="w-full py-4 px-6 bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-display font-bold text-sm rounded-full shadow-glow transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-lg animate-spin">sync</span>
              <span>Processing Payment safely...</span>
            </>
          ) : (
            <>
              <span>Pay ₹{grandTotal} & Confirm Order</span>
              <span className="material-symbols-outlined text-sm">check_circle</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
