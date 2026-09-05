import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionPlans() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Single Meal Essential',
      meals: 1,
      price: '₹249/day',
      discount: '5% OFF',
      desc: '1 targeted high-protein lunch or dinner meal daily.',
      features: ['Fixed Lunch or Dinner slot', 'Pause anytime', 'Free Hyderabad delivery'],
      popular: false
    },
    {
      name: 'Daily Dual Fuel',
      meals: 2,
      price: '₹459/day',
      discount: '12% OFF (Popular)',
      desc: '2 complete macro-engineered meals daily (Lunch + Dinner).',
      features: ['Lunch & Dinner slots', 'Meal swapping allowed', 'Priority kitchen dispatch', 'Save ~₹2,500/month'],
      popular: true
    },
    {
      name: 'Full Day Athlete Stack',
      meals: 3,
      price: '₹629/day',
      discount: '18% OFF',
      desc: '3 meals daily (Fit Breakfast + Lunch + High Protein Dinner).',
      features: ['3 slot deliveries', 'Custom portion sizes', 'Whey shake add-on eligible', 'Save ~₹4,500/month'],
      popular: false
    },
    {
      name: 'Pro Bodybuilder Stack',
      meals: 4,
      price: '₹789/day',
      discount: '22% OFF',
      desc: '4 meals daily including pre & post-workout fueling.',
      features: ['4 slot deliveries', 'Max protein focus', 'Direct nutritionist chat', 'Save ~₹7,000/month'],
      popular: false
    }
  ];

  return (
    <div className="py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Automated Daily Nutrition</span>
        <h1 className="font-display font-black text-4xl text-on-surface">SWADFIT Subscription Plans</h1>
        <p className="text-sm text-outline">
          Save up to 25% off individual meal prices. Flexible pause, resume, meal swapping, and cancel at any time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-surface-container-lowest border rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
              plan.popular
                ? 'border-secondary ring-2 ring-secondary/50 shadow-glow bg-gradient-to-b from-secondary-fixed/20 to-surface-container-lowest'
                : 'border-surface-container shadow-soft hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-tertiary uppercase">{plan.discount}</span>
                <h3 className="font-display font-bold text-xl text-on-surface">{plan.name}</h3>
                <p className="text-xs text-outline mt-1">{plan.desc}</p>
              </div>

              <div className="py-2 border-y border-surface-container">
                <span className="font-display font-black text-3xl text-primary">{plan.price}</span>
                <span className="text-[11px] text-outline block">Billed monthly (30 days)</span>
              </div>

              <ul className="space-y-2 text-xs text-on-surface">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-tertiary">check_circle</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/onboarding/meal-plan-select')}
              className={`w-full py-3.5 px-4 font-display font-bold text-xs rounded-full shadow-md transition-colors mt-6 ${
                plan.popular
                  ? 'bg-secondary hover:bg-secondary-container text-white'
                  : 'bg-primary hover:bg-primary-container text-white'
              }`}
            >
              Select {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
