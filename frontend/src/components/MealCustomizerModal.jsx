import React, { useState } from 'react';

export default function MealCustomizerModal({ food, isOpen, onClose, onSave }) {
  if (!isOpen || !food) return null;

  const [portion, setPortion] = useState('Regular');
  const [extraProtein, setExtraProtein] = useState(false);
  const [lessSpicy, setLessSpicy] = useState(false);
  const [noOnionGarlic, setNoOnionGarlic] = useState(false);
  const [addRaita, setAddRaita] = useState(false);

  // Dynamic calculations based on options selected
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

  const handleConfirm = () => {
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

    onSave(customizedFood, customizations);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest border border-surface-container rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative h-40 w-full overflow-hidden bg-surface-variant">
          <img src={food.image_url} alt={food.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 text-on-surface p-1.5 rounded-full hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h2 className="font-display text-xl font-bold">{food.name}</h2>
            <p className="text-xs text-slate-200">{food.portion_size}</p>
          </div>
        </div>

        {/* Customization Options */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Portion Selection */}
          <div>
            <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Select Portion Size</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Regular', 'Large (+25% Portion)'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPortion(p)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    portion === p
                      ? 'border-primary bg-primary-fixed/30 text-primary'
                      : 'border-surface-container bg-surface hover:bg-surface-container-low text-on-surface'
                  }`}
                >
                  <div className="font-bold">{p}</div>
                  <div className="text-[11px] text-outline">
                    {p === 'Regular' ? 'Standard Macros' : '+₹60 | +14g Protein'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Extra Protein Upgrade */}
          <div>
            <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Protein Upgrade</h4>
            <label className="flex items-center justify-between p-3 rounded-xl border border-surface-container bg-surface hover:bg-surface-container-low cursor-pointer transition-colors">
              <div>
                <div className="text-sm font-semibold text-on-surface">
                  {food.is_veg ? 'Extra Low-Fat Paneer (+20g Protein)' : 'Extra Grilled Chicken (+30g Protein)'}
                </div>
                <div className="text-xs text-tertiary font-medium">
                  {food.is_veg ? '+₹75 | +140 kcal' : '+₹90 | +130 kcal'}
                </div>
              </div>
              <input 
                type="checkbox"
                checked={extraProtein}
                onChange={(e) => setExtraProtein(e.target.checked)}
                className="w-5 h-5 accent-primary rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Dietary Prep */}
          <div>
            <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Preparation Preferences</h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-surface-container bg-surface hover:bg-surface-container-low cursor-pointer">
                <span className="text-sm font-medium text-on-surface">Less Spice & Oil</span>
                <input 
                  type="checkbox" 
                  checked={lessSpicy}
                  onChange={(e) => setLessSpicy(e.target.checked)}
                  className="w-5 h-5 accent-primary rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-surface-container bg-surface hover:bg-surface-container-low cursor-pointer">
                <span className="text-sm font-medium text-on-surface">No Onion & No Garlic (Vedic)</span>
                <input 
                  type="checkbox"
                  checked={noOnionGarlic}
                  onChange={(e) => setNoOnionGarlic(e.target.checked)}
                  className="w-5 h-5 accent-primary rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-surface-container bg-surface hover:bg-surface-container-low cursor-pointer">
                <div>
                  <span className="text-sm font-medium text-on-surface">Add Side Boondi Raita</span>
                  <span className="text-xs text-outline block">+₹35 | +4g Protein</span>
                </div>
                <input 
                  type="checkbox"
                  checked={addRaita}
                  onChange={(e) => setAddRaita(e.target.checked)}
                  className="w-5 h-5 accent-primary rounded"
                />
              </label>
            </div>
          </div>

          {/* Dynamic Macro Preview */}
          <div className="bg-surface-container p-3 rounded-2xl">
            <span className="text-xs font-bold text-on-surface block mb-1">Updated Macro Breakdown</span>
            <div className="grid grid-cols-5 gap-1 text-center text-xs">
              <div className="bg-white p-2 rounded-xl">
                <div className="text-[10px] text-outline font-semibold">Calories</div>
                <div className="font-bold text-primary">{currentCalories}</div>
              </div>
              <div className="bg-white p-2 rounded-xl">
                <div className="text-[10px] text-outline font-semibold">Protein</div>
                <div className="font-bold text-tertiary">{currentProtein}g</div>
              </div>
              <div className="bg-white p-2 rounded-xl">
                <div className="text-[10px] text-outline font-semibold">Carbs</div>
                <div className="font-bold text-on-surface">{currentCarbs}g</div>
              </div>
              <div className="bg-white p-2 rounded-xl">
                <div className="text-[10px] text-outline font-semibold">Fat</div>
                <div className="font-bold text-secondary">{currentFat}g</div>
              </div>
              <div className="bg-white p-2 rounded-xl">
                <div className="text-[10px] text-outline font-semibold">Fibre</div>
                <div className="font-bold text-on-surface">{currentFibre}g</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-surface-container bg-surface flex items-center justify-between">
          <div>
            <span className="text-xs text-outline block">Total Price</span>
            <span className="text-xl font-display font-bold text-primary">₹{currentPrice}</span>
          </div>
          <button
            onClick={handleConfirm}
            className="py-3 px-6 text-sm font-bold text-white bg-primary hover:bg-primary-container rounded-full shadow-md transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Add Customized Dish
          </button>
        </div>
      </div>
    </div>
  );
}
