-- SWADFIT Supabase PostgreSQL Schema Migration

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  food_preference TEXT DEFAULT 'Both', -- Veg, Non-Veg, Both
  allergies TEXT[],
  dietary_restrictions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nutrition Targets Table
CREATE TABLE IF NOT EXISTS public.nutrition_targets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_calories INT NOT NULL DEFAULT 2000,
  daily_protein INT NOT NULL DEFAULT 150,
  daily_carbs INT NOT NULL DEFAULT 200,
  daily_fat INT NOT NULL DEFAULT 60,
  daily_fibre INT NOT NULL DEFAULT 30,
  goal TEXT DEFAULT 'Maintenance', -- Muscle Gain, Fat Loss, Maintenance
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Food Categories Table
CREATE TABLE IF NOT EXISTS public.food_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Food Items Table
CREATE TABLE IF NOT EXISTS public.food_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.food_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  portion_size TEXT NOT NULL, -- e.g., '350g', '1 Bowl', '2 Pieces'
  is_veg BOOLEAN DEFAULT false,
  spice_level TEXT DEFAULT 'Medium', -- Mild, Medium, Spicy, Extra Spicy
  is_available BOOLEAN DEFAULT true,
  calories INT NOT NULL,
  protein INT NOT NULL,
  carbs INT NOT NULL,
  fat INT NOT NULL,
  fibre INT NOT NULL,
  tags TEXT[], -- ['High Protein', 'Low Calorie', 'Chef Special', 'Quick Prep']
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Food Customizations Table
CREATE TABLE IF NOT EXISTS public.food_customizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  food_id UUID REFERENCES public.food_items(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL, -- 'Portion Size', 'Extra Protein', 'Dietary Preference', 'Sides'
  option_name TEXT NOT NULL,
  delta_price DECIMAL(10,2) DEFAULT 0.00,
  delta_calories INT DEFAULT 0,
  delta_protein INT DEFAULT 0,
  delta_carbs INT DEFAULT 0,
  delta_fat INT DEFAULT 0,
  delta_fibre INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meal Plans Table
CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  meals_per_day INT NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  discount_percentage INT DEFAULT 0,
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart Table
CREATE TABLE IF NOT EXISTS public.cart (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart Items Table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID REFERENCES public.cart(id) ON DELETE CASCADE,
  food_id UUID REFERENCES public.food_items(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  customizations JSONB DEFAULT '[]'::jsonb,
  item_price DECIMAL(10,2) NOT NULL,
  calories INT NOT NULL,
  protein INT NOT NULL,
  carbs INT NOT NULL,
  fat INT NOT NULL,
  fibre INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Addresses Table
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  label TEXT NOT NULL, -- 'Home', 'Work', 'Gym', 'Other'
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  landmark TEXT,
  city TEXT NOT NULL DEFAULT 'Hyderabad',
  state TEXT NOT NULL DEFAULT 'Telangana',
  pincode TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Delivery Slots Table
CREATE TABLE IF NOT EXISTS public.delivery_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_time TEXT NOT NULL, -- '08:00 AM - 09:00 AM', '01:00 PM - 02:00 PM', '08:00 PM - 09:00 PM'
  meal_type TEXT NOT NULL, -- 'Breakfast', 'Lunch', 'Dinner', 'Snacks'
  is_active BOOLEAN DEFAULT true
);

-- Kitchens Table
CREATE TABLE IF NOT EXISTS public.kitchens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Hyderabad',
  serviceable_pincodes TEXT[],
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  address_id UUID REFERENCES public.addresses(id),
  kitchen_id UUID REFERENCES public.kitchens(id),
  status TEXT DEFAULT 'Confirmed', -- Pending, Confirmed, Preparing, Ready, Out for Delivery, Delivered, Cancelled
  total_price DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0.00,
  tax DECIMAL(10,2) DEFAULT 0.00,
  total_calories INT NOT NULL,
  total_protein INT NOT NULL,
  total_carbs INT NOT NULL,
  total_fat INT NOT NULL,
  total_fibre INT NOT NULL,
  delivery_slot TEXT,
  payment_status TEXT DEFAULT 'Completed', -- Pending, Completed, Failed, Refunded
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  food_id UUID REFERENCES public.food_items(id),
  dish_name TEXT NOT NULL,
  quantity INT NOT NULL,
  customizations JSONB DEFAULT '[]'::jsonb,
  price DECIMAL(10,2) NOT NULL,
  calories INT NOT NULL,
  protein INT NOT NULL,
  carbs INT NOT NULL,
  fat INT NOT NULL,
  fibre INT NOT NULL
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.meal_plans(id),
  status TEXT DEFAULT 'Active', -- Active, Paused, Cancelled, Expired
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  meals_per_day INT NOT NULL,
  delivery_slot TEXT,
  total_days INT NOT NULL DEFAULT 30,
  used_days INT NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0.00,
  refund_amount DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Delivery Assignments Table
CREATE TABLE IF NOT EXISTS public.delivery_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  kitchen_id UUID REFERENCES public.kitchens(id),
  agent_name TEXT DEFAULT 'Ramesh Kumar',
  agent_phone TEXT DEFAULT '+91 98765 43210',
  status TEXT DEFAULT 'Assigned', -- Assigned, Picked Up, In Transit, Delivered
  estimated_delivery TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'UPI', -- UPI, Card, NetBanking, COD
  payment_status TEXT NOT NULL DEFAULT 'Success',
  transaction_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info', -- info, success, warning, order, subscription
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
