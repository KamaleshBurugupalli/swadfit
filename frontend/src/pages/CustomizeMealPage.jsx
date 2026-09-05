import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFoodById } from '../services/api';
import { useMacroCart } from '../context/MacroCartContext';

export default function CustomizeMealPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useMacroCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [portion, setPortion] = useState('Regular');
  const [extraProtein, setExtraProtein] = useState(false);
  const [lessSpicy, setLessSpicy] = useState(false);
  const [noOnionGarlic, setNoOnionGarlic] = useState(false);
  const [addRaita, setAddRaita] = useState(false);

  useEffect(() => {
    fetchFoodById(id)
      .then(res => {
        if (res.data?.data) setFood(res.data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-20 text-center text-outline">Loading customizer...</div>;
  if (!food) return <div className="py-20 text-center">Dish not found</div>;

  let currentPrice = food.price;
  let currentCalories = food.calories;
  let currentProtein = food.protein;
  let currentCarbs = food.carbs;
  let currentFat = food.fat;
  let currentFibre = food.fibre;

  if (portion === 'Large (+25% Portion)') {
    currentPrice += 60;
    currentCalories += 120;
    currentProtein += 14;
    currentCarbs += 12;
    currentFat += 3;
  }

  if (extraProtein) {
    const isVeg = food.is_veg;
    currentPrice += isVeg ? 75 : 90;
    currentCalories += isVeg ? 140 : 130;
    currentProtein += isVeg ? 20 : 30;
  }

  if (addRaita) {
    currentPrice += 35;
    currentCalories += 60;
    currentProtein += 4;
  }

  const handleSave = () => {
    const customizations = [
      { name: `Portion: ${portion}` },
      ...(extraProtein ? [{ name: food.is_veg ? 'Extra Paneer (+20g Protein)' : 'Extra Chicken (+30g Protein)' }] : []),
      ...(lessSpicy ? [{ name: 'Less Spice & Oil' }] : []),
      ...(noOnionGarlic ? [{ name: 'No Onion & No Garlic' }] : []),
      ...(addRaita ? [{ name: 'Side Boondi Raita' }] : [])
    ];

    const customizedFood = {
      ...food,
      price: currentPrice,
      calories: currentCalories,
      protein: currentProtein,
      carbs: currentCarbs,
      fat: currentFat,
      fibre: currentFibre
    };

    addToCart(customizedFood, customizations);
    navigate('/build-meals');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-surface-container-lowest border border-surface-container rounded-3xl p-8 shadow-soft space-y-6">
        
        <div className="flex items-center gap-4">
          <img src={food.image_url} alt={food.name} className="w-24 h-24 rounded-2xl object-cover" />
          <div>
            <span className="text-xs font-bold text-tertiary uppercase">{food.portion_size}</span>
            <h1 className="font-display font-bold text-2xl text-on-surface">{food.name}</h1>
            <p className="text-xs text-outline line-clamp-1">{food.description}</p>
          </div>
        </div>

        {/* Portions */}
        <div className="space-y-3 pt-4 border-t border-surface-container">
          <h3 className="font-display font-bold text-sm text-on-surface">Portion Size</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Regular', 'Large (+25% Portion)'].map((p) => (
              <button
                key={p}
                onClick={() => setPortion(p)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  portion === p
                    ? 'border-primary bg-primary-fixed/30 text-primary font-bold'
                    : 'border-surface-container bg-surface text-on-surface'
                }`}
              >
                <div className="text-sm">{p}</div>
                <div className="text-xs text-outline">{p === 'Regular' ? 'Standard Macros' : '+₹60 | +14g Protein'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Protein upgrade */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-sm text-on-surface">Extra Protein Portion</h3>
          <label className="flex items-center justify-between p-4 rounded-2xl border border-surface-container bg-surface cursor-pointer">
            <div>
              <div className="text-sm font-semibold text-on-surface">
                {food.is_veg ? 'Extra Low-Fat Paneer (+20g Protein)' : 'Extra Grilled Chicken (+30g Protein)'}
              </div>
              <div className="text-xs text-tertiary font-bold">{food.is_veg ? '+₹75 | +140 kcal' : '+₹90 | +130 kcal'}</div>
            </div>
            <input 
              type="checkbox" 
              checked={extraProtein}
              onChange={(e) => setExtraProtein(e.target.checked)}
              className="w-5 h-5 accent-primary"
            />
          </label>
        </div>

        {/* Preparation options */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-sm text-on-surface">Preparation Preferences</h3>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-surface-container bg-surface cursor-pointer">
              <span className="text-sm font-medium">Less Spice & Oil</span>
              <input type="checkbox" checked={lessSpicy} onChange={(e) => setLessSpicy(e.target.checked)} className="w-5 h-5 accent-primary" />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-surface-container bg-surface cursor-pointer">
              <span className="text-sm font-medium">No Onion & No Garlic</span>
              <input type="checkbox" checked={noOnionGarlic} onChange={(e) => setNoOnionGarlic(e.target.checked)} className="w-5 h-5 accent-primary" />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-surface-container bg-surface cursor-pointer">
              <div>
                <span className="text-sm font-medium">Add Side Boondi Raita</span>
                <span className="text-xs text-outline block">+₹35 | +4g Protein</span>
              </div>
              <input type="checkbox" checked={addRaita} onChange={(e) => setAddRaita(e.target.checked)} className="w-5 h-5 accent-primary" />
            </label>
          </div>
        </div>

        {/* Updated preview */}
        <div className="bg-surface-container p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-outline block">Total Price</span>
            <span className="font-display font-black text-2xl text-primary">₹{currentPrice}</span>
          </div>
          <div className="flex gap-4 text-xs font-bold">
            <div><span className="text-outline block">Calories</span><span className="text-primary">{currentCalories}</span></div>
            <div><span className="text-outline block">Protein</span><span className="text-tertiary">{currentProtein}g</span></div>
            <div><span className="text-outline block">Carbs</span><span>{currentCarbs}g</span></div>
            <div><span className="text-outline block">Fats</span><span className="text-secondary">{currentFat}g</span></div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 px-6 bg-primary hover:bg-primary-container text-white font-display font-bold text-sm rounded-full shadow-md transition-colors"
        >
          Save Customization & Return to Meal Builder
        </button>
      </div>
    </div>
  );
}
