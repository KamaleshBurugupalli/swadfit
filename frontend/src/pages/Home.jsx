import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchFoods } from '../services/api';
import { useMacroCart } from '../context/MacroCartContext';
import FoodCard from '../components/FoodCard';
import MealCustomizerModal from '../components/MealCustomizerModal';

export default function Home() {
  const navigate = useNavigate();
  const { addToCart } = useMacroCart();
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [selectedCustomFood, setSelectedCustomFood] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  useEffect(() => {
    fetchFoods().then(res => {
      if (res.data?.data) {
        setFeaturedFoods(res.data.data.slice(0, 6));
      }
    });
  }, []);

  const handleOpenCustomize = (food) => {
    setSelectedCustomFood(food);
    setIsCustomModalOpen(true);
  };

  const handleCustomSave = (customizedFood, customizations) => {
    addToCart(customizedFood, customizations);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-container-low rounded-3xl p-8 sm:p-14 border border-surface-container mt-4 shadow-soft">
        <div className="max-w-3xl space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            Hyderabad's #1 Fitness Kitchen
          </span>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-on-surface leading-tight tracking-tight">
            Hit Your <span className="text-primary">Macros.</span><br />
            Eat Your <span className="text-secondary">Cravings.</span>
          </h1>

          <p className="text-body-lg text-outline max-w-xl">
            Freshly prepared, high-protein Indian meals cooked for gym-goers, IT professionals & fitness lovers. Control your exact calories & protein without sacrificing taste.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/onboarding/targets"
              className="py-4 px-8 rounded-full bg-primary text-white font-display font-bold text-base hover:bg-primary-container shadow-glow transition-all flex items-center gap-2"
            >
              Set Your Macro Goals
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              to="/build-meals"
              className="py-4 px-8 rounded-full bg-surface-container-highest text-on-surface font-display font-bold text-base hover:bg-surface-container-high border border-surface-container transition-all"
            >
              Build Daily Meal Plan
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-outline font-semibold border-t border-surface-container">
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Tested Protein Macros</span>
            </div>
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Zero Refined Oil / Low Fat</span>
            </div>
            <div className="flex items-center gap-1.5 text-tertiary">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Daily Hot Slot Delivery</span>
            </div>
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div className="hidden lg:block absolute right-[-40px] bottom-[-40px] w-[500px] h-[500px] rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />
      </section>

      {/* How SWADFIT Works */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Macro Science</span>
          <h2 className="font-display font-bold text-3xl text-on-surface">How SWADFIT Solves Your Diet</h2>
          <p className="text-xs text-outline">Simple 3-step workflow to stay consistent on your fitness journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-3 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Set Macro Targets</h3>
            <p className="text-xs text-outline leading-relaxed">
              Enter your target Calories, Protein, Carbs, and Fats. Choose Muscle Gain, Fat Loss, or Maintenance.
            </p>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-3 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Build Indian Meals</h3>
            <p className="text-xs text-outline leading-relaxed">
              Select Tandoori Chicken, Paneer Bhurji, Prawn Quinoa, or Protein Cheela. Customize portions & toppings.
            </p>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container p-6 rounded-3xl space-y-3 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold text-xl">
              3
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">Track & Hit Target</h3>
            <p className="text-xs text-outline leading-relaxed">
              Our dynamic macro bar updates in real time. Get smart recommendations for any remaining protein gap.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-tertiary uppercase tracking-widest">Bestsellers</span>
            <h2 className="font-display font-bold text-3xl text-on-surface">Popular Fit Meals</h2>
          </div>
          <Link
            to="/explore-meals"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            View All Dishes
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAdd={(f) => addToCart(f)}
              onCustomize={handleOpenCustomize}
            />
          ))}
        </div>
      </section>

      {/* Subscription CTA Card */}
      <section className="bg-gradient-to-r from-primary to-primary-container text-white p-8 sm:p-12 rounded-3xl shadow-glow flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center md:text-left">
          <span className="bg-white/20 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
            Save Up to 25% Off
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl">Weekly & Monthly Meal Subscriptions</h2>
          <p className="text-sm text-white/80 max-w-lg">
            Enjoy automated daily meal deliveries to your office or doorstep in Hyderabad with easy pause, change, and cancel options.
          </p>
        </div>

        <Link
          to="/subscriptions/plans"
          className="py-4 px-8 rounded-full bg-white text-primary font-display font-bold text-sm hover:bg-slate-100 shadow-md transition-all whitespace-nowrap"
        >
          Explore Subscription Plans
        </Link>
      </section>

      {/* Modal Customizer */}
      <MealCustomizerModal
        food={selectedCustomFood}
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onSave={handleCustomSave}
      />
    </div>
  );
}
