import React, { useState, useEffect } from 'react';
import { fetchFoods, fetchCategories } from '../services/api';
import { useMacroCart } from '../context/MacroCartContext';
import FoodCard from '../components/FoodCard';
import MealCustomizerModal from '../components/MealCustomizerModal';

export default function ExploreMeals() {
  const { addToCart } = useMacroCart();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [selectedCustomFood, setSelectedCustomFood] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories().then(res => {
      if (res.data?.data) setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchFoods({ category: activeCategory, filter: activeFilter, search })
      .then(res => {
        if (res.data?.data) setFoods(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [activeCategory, activeFilter, search]);

  const handleOpenCustomize = (food) => {
    setSelectedCustomFood(food);
    setIsCustomModalOpen(true);
  };

  const handleCustomSave = (customizedFood, customizations) => {
    addToCart(customizedFood, customizations);
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Clean Indian Menu</span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-on-surface">Explore Macro-Engineered Dishes</h1>
        <p className="text-xs text-outline max-w-xl">
          High-protein Indian food cooked fresh in Hyderabad kitchens. Filter by protein content, calories, or dietary style.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Chicken Tikka, Paneer, Biryani, Whey Cold Coffee..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-surface-container bg-surface text-sm text-on-surface focus:outline-none focus:border-primary shadow-sm"
          />
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
              activeCategory === 'All'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                activeCategory === cat.slug
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-outline text-[11px] uppercase tracking-wider font-bold">Filter By:</span>
          {['All', 'Veg', 'Non-Veg', 'High Protein', 'Low Calorie'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-lg border text-xs transition-colors ${
                activeFilter === f
                  ? 'border-tertiary bg-tertiary-fixed/30 text-tertiary font-bold'
                  : 'border-surface-container bg-surface text-outline hover:bg-surface-container-low'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Foods Grid */}
      {loading ? (
        <div className="py-20 text-center text-outline">
          <span className="material-symbols-outlined text-4xl animate-spin mb-2">sync</span>
          <p className="text-xs">Loading delicious fit meals...</p>
        </div>
      ) : foods.length === 0 ? (
        <div className="bg-surface-container-lowest border border-surface-container p-12 rounded-3xl text-center space-y-3">
          <span className="material-symbols-outlined text-4xl text-outline">no_meals</span>
          <h3 className="font-display font-bold text-lg text-on-surface">No matching food items found</h3>
          <p className="text-xs text-outline">Try adjusting your search query or filter criteria.</p>
          <button
            onClick={() => { setActiveCategory('All'); setActiveFilter('All'); setSearch(''); }}
            className="py-2 px-4 bg-primary text-white text-xs font-bold rounded-full"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onAdd={(f) => addToCart(f)}
              onCustomize={handleOpenCustomize}
            />
          ))}
        </div>
      )}

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
