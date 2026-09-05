import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getRecommendationsAPI } from '../services/api';

const MacroCartContext = createContext();

export const MacroCartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('swadfit_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'f1000000-0000-0000-0000-000000000001',
        name: 'Tandoori Chicken Breast Bowl',
        price: 289,
        portion_size: '400g Bowl',
        calories: 480,
        protein: 48,
        carbs: 42,
        fat: 10,
        fibre: 6,
        quantity: 1,
        image_url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
        customizations: []
      }
    ];
  });

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    localStorage.setItem('swadfit_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const targets = user?.targets || { calories: 1800, protein: 140, carbs: 160, fat: 50, fibre: 30 };

  const consumed = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        const qty = item.quantity || 1;
        acc.calories += (item.calories || 0) * qty;
        acc.protein += (item.protein || 0) * qty;
        acc.carbs += (item.carbs || 0) * qty;
        acc.fat += (item.fat || 0) * qty;
        acc.fibre += (item.fibre || 0) * qty;
        acc.price += (item.price || 0) * qty;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0, price: 0 }
    );
  }, [cartItems]);

  const remaining = useMemo(() => {
    return {
      calories: targets.calories - consumed.calories,
      protein: targets.protein - consumed.protein,
      carbs: targets.carbs - consumed.carbs,
      fat: targets.fat - consumed.fat,
      fibre: targets.fibre - consumed.fibre
    };
  }, [targets, consumed]);

  const warnings = useMemo(() => {
    const list = [];
    if (consumed.calories > targets.calories) {
      list.push(`You are above your daily calorie target by ${consumed.calories - targets.calories} kcal.`);
    }

    if (consumed.fat > targets.fat) {
      list.push(`You have exceeded your daily fat target by ${consumed.fat - targets.fat}g.`);
    }

    return list;
  }, [consumed, targets]);

  // Fetch recommendations when remaining macros change
  useEffect(() => {
    let isMounted = true;
    getRecommendationsAPI(remaining)
      .then(res => {
        if (isMounted && res.data?.data?.recommendations) {
          setRecommendations(res.data.data.recommendations);
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, [remaining.calories, remaining.protein]);

  const addToCart = (item, customizations = []) => {
    setCartItems(prev => {
      const customKey = JSON.stringify(customizations);
      const existingIdx = prev.findIndex(i => i.id === item.id && JSON.stringify(i.customizations || []) === customKey);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { ...item, quantity: 1, customizations }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <MacroCartContext.Provider value={{
      cartItems,
      targets,
      consumed,
      remaining,
      warnings,
      recommendations,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </MacroCartContext.Provider>
  );
};

export const useMacroCart = () => useContext(MacroCartContext);
