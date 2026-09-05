const supabase = require('../config/supabase');

// Mock food catalog fallback data
const fallbackFoods = [
  {
    id: 'f1000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    category_name: 'High Protein Chicken',
    name: 'Tandoori Chicken Breast Bowl',
    slug: 'tandoori-chicken-bowl',
    description: 'Grilled tandoori chicken breast served with brown rice and mint chutney.',
    image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
    price: 289.00,
    portion_size: '400g Bowl',
    is_veg: false,
    spice_level: 'Medium',
    is_available: true,
    calories: 480,
    protein: 48,
    carbs: 42,
    fat: 10,
    fibre: 6,
    tags: ['High Protein', 'Low Calorie', 'Bestseller']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000002',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    category_name: 'High Protein Chicken',
    name: 'Chicken Tikka & Multigrain Roti',
    slug: 'chicken-tikka-roti',
    description: 'Smoky chicken tikka chunks with 2 high-fiber multigrain rotis and cucumber salad.',
    image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    price: 269.00,
    portion_size: '350g Meal',
    is_veg: false,
    spice_level: 'Spicy',
    is_available: true,
    calories: 520,
    protein: 44,
    carbs: 48,
    fat: 12,
    fibre: 8,
    tags: ['High Protein', 'Chef Special']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000003',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    category_name: 'High Protein Chicken',
    name: 'Hyderabadi Fit Chicken Biryani',
    slug: 'fit-chicken-biryani',
    description: 'Aromatic low-oil chicken biryani made with brown basmati rice & double chicken portion.',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    price: 319.00,
    portion_size: '450g Meal',
    is_veg: false,
    spice_level: 'Medium',
    is_available: true,
    calories: 590,
    protein: 42,
    carbs: 65,
    fat: 14,
    fibre: 7,
    tags: ['Bestseller', 'High Carb']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000004',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    category_name: 'Paneer & Veg Delights',
    name: 'High Protein Paneer Bhurji Meal',
    slug: 'paneer-bhurji-meal',
    description: 'Scrambled low-fat paneer cooked with capsicum and spices, served with 2 oats rotis.',
    image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    price: 249.00,
    portion_size: '380g Meal',
    is_veg: true,
    spice_level: 'Medium',
    is_available: true,
    calories: 460,
    protein: 32,
    carbs: 38,
    fat: 18,
    fibre: 9,
    tags: ['Vegetarian', 'High Protein']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000005',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    category_name: 'Paneer & Veg Delights',
    name: 'Kadhai Paneer & Jeera Rice',
    slug: 'kadhai-paneer-rice',
    description: 'Cottage cheese cubes tossed in kadhai masala served with steamed jeera brown rice.',
    image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    price: 259.00,
    portion_size: '400g Bowl',
    is_veg: true,
    spice_level: 'Mild',
    is_available: true,
    calories: 490,
    protein: 28,
    carbs: 52,
    fat: 16,
    fibre: 6,
    tags: ['Vegetarian']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000006',
    category_id: 'c1000000-0000-0000-0000-000000000003',
    category_name: 'Seafood Power (Fish & Prawn)',
    name: 'Coastal Grilled Fish Curry Combo',
    slug: 'fish-curry-combo',
    description: 'Lean sea bass grilled and cooked in coconut fish gravy with red rice.',
    image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    price: 349.00,
    portion_size: '400g Meal',
    is_veg: false,
    spice_level: 'Medium',
    is_available: true,
    calories: 440,
    protein: 40,
    carbs: 38,
    fat: 10,
    fibre: 5,
    tags: ['Seafood', 'Keto Friendly']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000007',
    category_id: 'c1000000-0000-0000-0000-000000000003',
    category_name: 'Seafood Power (Fish & Prawn)',
    name: 'Masala Prawns Quinoa Bowl',
    slug: 'prawns-quinoa-bowl',
    description: 'Spiced tiger prawns sauteed with bell peppers over organic quinoa.',
    image_url: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
    price: 379.00,
    portion_size: '350g Bowl',
    is_veg: false,
    spice_level: 'Spicy',
    is_available: true,
    calories: 410,
    protein: 38,
    carbs: 35,
    fat: 8,
    fibre: 7,
    tags: ['Low Calorie', 'High Protein']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000008',
    category_id: 'c1000000-0000-0000-0000-000000000004',
    category_name: 'Fit Indian Breakfast',
    name: 'Desi Egg White Bhurji & Toast',
    slug: 'egg-white-bhurji',
    description: '6 egg whites scrambled with Indian spices, onion, tomato served with 2 brown bread slices.',
    image_url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    price: 179.00,
    portion_size: '300g Breakfast',
    is_veg: false,
    spice_level: 'Medium',
    is_available: true,
    calories: 310,
    protein: 34,
    carbs: 28,
    fat: 5,
    fibre: 4,
    tags: ['Breakfast', 'Low Fat']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000009',
    category_id: 'c1000000-0000-0000-0000-000000000004',
    category_name: 'Fit Indian Breakfast',
    name: 'Moong Dal Protein Cheela',
    slug: 'moong-dal-cheela',
    description: '2 savoury lentils pancakes stuffed with paneer and spinach.',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    price: 169.00,
    portion_size: '250g Breakfast',
    is_veg: true,
    spice_level: 'Mild',
    is_available: true,
    calories: 290,
    protein: 22,
    carbs: 32,
    fat: 7,
    fibre: 8,
    tags: ['Vegetarian', 'High Fibre']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000010',
    category_id: 'c1000000-0000-0000-0000-000000000005',
    category_name: 'Healthy Snacks & Whey',
    name: 'Whey Cold Coffee Shake',
    slug: 'whey-cold-coffee',
    description: 'Instant cold brew blended with 1 scoop Whey Protein Isolate & almond milk.',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    price: 149.00,
    portion_size: '350ml Shake',
    is_veg: true,
    spice_level: 'Mild',
    is_available: true,
    calories: 180,
    protein: 26,
    carbs: 12,
    fat: 3,
    fibre: 2,
    tags: ['Snacks', 'Whey']
  },
  {
    id: 'f1000000-0000-0000-0000-000000000011',
    category_id: 'c1000000-0000-0000-0000-000000000005',
    category_name: 'Healthy Snacks & Whey',
    name: 'Roasted Chana & Seed Mix',
    slug: 'roasted-chana-mix',
    description: 'Crunchy roasted chickpeas with pumpkin seeds and chat masala.',
    image_url: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
    price: 99.00,
    portion_size: '100g Pack',
    is_veg: true,
    spice_level: 'Mild',
    is_available: true,
    calories: 210,
    protein: 14,
    carbs: 24,
    fat: 6,
    fibre: 9,
    tags: ['Vegetarian', 'Snacks']
  }
];

const fallbackCategories = [
  { id: 'c1000000-0000-0000-0000-000000000001', name: 'High Protein Chicken', slug: 'chicken' },
  { id: 'c1000000-0000-0000-0000-000000000002', name: 'Paneer & Veg Delights', slug: 'paneer-veg' },
  { id: 'c1000000-0000-0000-0000-000000000003', name: 'Seafood Power (Fish & Prawn)', slug: 'seafood' },
  { id: 'c1000000-0000-0000-0000-000000000004', name: 'Fit Indian Breakfast', slug: 'breakfast' },
  { id: 'c1000000-0000-0000-0000-000000000005', name: 'Healthy Snacks & Whey', slug: 'snacks' }
];

async function getFoods(req, res) {
  try {
    const { category, search, filter } = req.query;
    let foods = [...fallbackFoods];

    if (category && category !== 'All') {
      foods = foods.filter(f => f.category_name.toLowerCase().includes(category.toLowerCase()) || f.slug.includes(category.toLowerCase()));
    }

    if (filter === 'Veg') {
      foods = foods.filter(f => f.is_veg);
    } else if (filter === 'Non-Veg') {
      foods = foods.filter(f => !f.is_veg);
    } else if (filter === 'High Protein') {
      foods = foods.filter(f => f.protein >= 30);
    } else if (filter === 'Low Calorie') {
      foods = foods.filter(f => f.calories <= 450);
    }

    if (search) {
      foods = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase()));
    }

    return res.json({ success: true, count: foods.length, data: foods });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function getFoodById(req, res) {
  try {
    const { id } = req.params;
    const food = fallbackFoods.find(f => f.id === id || f.slug === id);
    if (!food) {
      return res.status(404).json({ success: false, error: 'Food item not found' });
    }

    // Include customizable options
    const customizations = [
      {
        group: 'Portion Size',
        options: [
          { name: 'Regular (Standard Macros)', priceDelta: 0, calorieDelta: 0, proteinDelta: 0 },
          { name: 'Large (+25% Extra Portion)', priceDelta: 60, calorieDelta: 120, proteinDelta: 14 }
        ]
      },
      {
        group: 'Dietary Preferences',
        options: [
          { name: 'Less Oil / Less Spicy', priceDelta: 0 },
          { name: 'No Onion & No Garlic', priceDelta: 0 },
          { name: 'Dairy Free / No Ghee', priceDelta: 0 }
        ]
      },
      {
        group: 'Add-ons',
        options: [
          { name: 'Extra Grilled Chicken (+30g Protein)', priceDelta: 90, calorieDelta: 140, proteinDelta: 30 },
          { name: 'Extra Low-fat Paneer (+20g Protein)', priceDelta: 75, calorieDelta: 150, proteinDelta: 20 },
          { name: 'Side Mint & Boondi Raita', priceDelta: 35, calorieDelta: 60, proteinDelta: 4 }
        ]
      }
    ];

    return res.json({ success: true, data: { ...food, customizations } });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function getCategories(req, res) {
  return res.json({ success: true, data: fallbackCategories });
}

module.exports = { getFoods, getFoodById, getCategories, fallbackFoods };
