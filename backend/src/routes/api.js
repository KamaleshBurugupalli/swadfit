const express = require('express');
const router = express.Router();

const { getFoods, getFoodById, getCategories } = require('../controllers/foodController');
const { calculateMacros, getRecommendations } = require('../controllers/macroController');
const { getCart, addToCart, updateCartQuantity, removeFromCart, clearCart } = require('../controllers/cartController');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const {
  getSubscription,
  createSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  updateSubscription
} = require('../controllers/subscriptionController');

// Food Routes
router.get('/foods', getFoods);
router.get('/foods/:id', getFoodById);
router.get('/categories', getCategories);

// Macro & Recommendation Routes
router.post('/macros/calculate', calculateMacros);
router.post('/recommendations', getRecommendations);

// Cart Routes
router.get('/cart', getCart);
router.post('/cart', addToCart);
router.put('/cart/:id', updateCartQuantity);
router.delete('/cart/:id', removeFromCart);
router.delete('/cart', clearCart);

// Order Routes
router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);

// Subscription Routes
router.get('/subscriptions', getSubscription);
router.post('/subscriptions', createSubscription);
router.put('/subscriptions/:id', updateSubscription);
router.post('/subscriptions/:id/pause', pauseSubscription);
router.post('/subscriptions/:id/resume', resumeSubscription);
router.post('/subscriptions/:id/cancel', cancelSubscription);

// Dashboard Summary Route
router.get('/dashboard', async (req, res) => {
  return res.json({
    success: true,
    data: {
      profile: {
        name: 'Karan Sharma',
        email: 'karan@swadfit.in',
        phone: '+91 98765 43210',
        goal: 'Fat Loss & Lean Muscle',
        targets: { calories: 1800, protein: 140, carbs: 160, fat: 50, fibre: 30 }
      },
      todaysProgress: {
        calories: { consumed: 1220, target: 1800 },
        protein: { consumed: 92, target: 140 },
        carbs: { consumed: 110, target: 160 },
        fat: { consumed: 32, target: 50 },
        fibre: { consumed: 20, target: 30 }
      },
      nextMeal: {
        dish: 'High Protein Paneer Bhurji Meal',
        deliverySlot: 'Dinner (08:00 PM)',
        status: 'Out for Delivery',
        eta: '30 mins'
      }
    }
  });
});

module.exports = router;
