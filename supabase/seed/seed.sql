-- SWADFIT Seed Data

-- Insert Categories
INSERT INTO public.food_categories (id, name, slug, description, image_url, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'High Protein Chicken', 'chicken', 'Lean chicken meals tailored for muscle gain & fat loss', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80', 1),
('c1000000-0000-0000-0000-000000000002', 'Paneer & Veg Delights', 'paneer-veg', 'Rich cottage cheese & high-fiber vegetarian preparations', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', 2),
('c1000000-0000-0000-0000-000000000003', 'Seafood Power (Fish & Prawn)', 'seafood', 'Fresh omega-3 rich fish and prawn meals', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', 3),
('c1000000-0000-0000-0000-000000000004', 'Fit Indian Breakfast', 'breakfast', 'High-protein oat upma, egg bhurji, and protein cheela', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 4),
('c1000000-0000-0000-0000-000000000005', 'Healthy Snacks & Whey', 'snacks', 'Clean protein shakes, roasted chana, and protein laddoos', 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert Food Items
INSERT INTO public.food_items (id, category_id, name, slug, description, image_url, price, portion_size, is_veg, spice_level, is_available, calories, protein, carbs, fat, fibre, tags) VALUES
('f1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Tandoori Chicken Breast Bowl', 'tandoori-chicken-bowl', 'Grilled tandoori chicken breast served with brown rice and mint chutney', 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80', 289.00, '400g Bowl', false, 'Medium', true, 480, 48, 42, 10, 6, ARRAY['High Protein', 'Low Calorie', 'Bestseller']),

('f1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Chicken Tikka & Multigrain Roti', 'chicken-tikka-roti', 'Smoky chicken tikka chunks with 2 high-fiber multigrain rotis and cucumber salad', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80', 269.00, '350g Meal', false, 'Spicy', true, 520, 44, 48, 12, 8, ARRAY['High Protein', 'Chef Special']),

('f1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Hyderabadi Fit Chicken Biryani', 'fit-chicken-biryani', 'Aromatic low-oil chicken biryani made with brown basmati rice & double chicken portion', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', 319.00, '450g Meal', false, 'Medium', true, 590, 42, 65, 14, 7, ARRAY['Bestseller', 'High Carb']),

('f1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000002', 'High Protein Paneer Bhurji Meal', 'paneer-bhurji-meal', 'Scrambled low-fat paneer cooked with capsicum and spices, served with 2 oats rotis', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', 249.00, '380g Meal', true, 'Medium', true, 460, 32, 38, 18, 9, ARRAY['Vegetarian', 'High Protein']),

('f1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000002', 'Kadhai Paneer & Jeera Rice', 'kadhai-paneer-rice', 'Cottage cheese cubes tossed in kadhai masala served with steamed jeera brown rice', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80', 259.00, '400g Bowl', true, 'Mild', true, 490, 28, 52, 16, 6, ARRAY['Vegetarian']),

('f1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000003', 'Coastal Grilled Fish Curry Combo', 'fish-curry-combo', 'Lean sea bass grilled and cooked in coconut fish gravy with red rice', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', 349.00, '400g Meal', false, 'Medium', true, 440, 40, 38, 10, 5, ARRAY['Seafood', 'Keto Friendly']),

('f1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000003', 'Masala Prawns Quinoa Bowl', 'prawns-quinoa-bowl', 'Spiced tiger prawns sauteed with bell peppers over organic quinoa', 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80', 379.00, '350g Bowl', false, 'Spicy', true, 410, 38, 35, 8, 7, ARRAY['Low Calorie', 'High Protein']),

('f1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000004', 'Desi Egg White Bhurji & Toast', 'egg-white-bhurji', '6 egg whites scrambled with Indian spices, onion, tomato served with 2 brown bread slices', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80', 179.00, '300g Breakfast', false, 'Medium', true, 310, 34, 28, 5, 4, ARRAY['Breakfast', 'Low Fat']),

('f1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000004', 'Moong Dal Protein Cheela', 'moong-dal-cheela', '2 savoury lentils pancakes stuffed with paneer and spinach', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', 169.00, '250g Breakfast', true, 'Mild', true, 290, 22, 32, 7, 8, ARRAY['Vegetarian', 'High Fibre']),

('f1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000005', 'Whey Cold Coffee Shake', 'whey-cold-coffee', 'Instant cold brew blended with 1 scoop Whey Protein Isolate & almond milk', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80', 149.00, '350ml Shake', true, 'Mild', true, 180, 26, 12, 3, 2, ARRAY['Snacks', 'Whey']),

('f1000000-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000005', 'Roasted Chana & Seed Mix', 'roasted-chana-mix', 'Crunchy roasted chickpeas with pumpkin seeds and chat masala', 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80', 99.00, '100g Pack', true, 'Mild', true, 210, 14, 24, 6, 9, ARRAY['Vegetarian', 'Snacks'])
ON CONFLICT (slug) DO NOTHING;

-- Insert Meal Plans
INSERT INTO public.meal_plans (id, name, description, meals_per_day, price_per_day, discount_percentage, is_popular) VALUES
('m1000000-0000-0000-0000-000000000001', 'Single Meal Essential', '1 targeted meal daily (Lunch or Dinner)', 1, 249.00, 5, false),
('m1000000-0000-0000-0000-000000000002', 'Daily Dual Fuel', '2 macro-balanced meals daily (Lunch + Dinner)', 2, 459.00, 12, true),
('m1000000-0000-0000-0000-000000000003', 'Full Day Athlete Stack', '3 complete meals (Breakfast + Lunch + Dinner)', 3, 629.00, 18, false),
('m1000000-0000-0000-0000-000000000004', 'Pro Bodybuilder Pro', '4 meals (Breakfast + Lunch + Pre-workout + Dinner)', 4, 789.00, 22, false),
('m1000000-0000-0000-0000-000000000005', 'Ultimate Macro Transformation', '5 meals including whey shake & snacks', 5, 899.00, 25, false);

-- Insert Delivery Slots
INSERT INTO public.delivery_slots (slot_time, meal_type) VALUES
('07:30 AM - 08:30 AM', 'Breakfast'),
('12:00 PM - 01:00 PM', 'Lunch'),
('05:00 PM - 06:00 PM', 'Pre-workout'),
('08:00 PM - 09:00 PM', 'Dinner');

-- Insert Central Hyderabad Kitchen
INSERT INTO public.kitchens (id, name, address, city, serviceable_pincodes, status) VALUES
('k1000000-0000-0000-0000-000000000001', 'Swadfit Kitchen Hitec City', 'Plot 42, Hitec City Main Rd, Madhapur', 'Hyderabad', ARRAY['500081', '500032', '500084', '500033'], 'Active'),
('k1000000-0000-0000-0000-000000000002', 'Swadfit Kitchen Gachibowli', 'Financial District, Nanakramguda', 'Hyderabad', ARRAY['500032', '500075', '500019'], 'Active');
