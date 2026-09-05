import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchFoods = (params) => API.get('/foods', { params });
export const fetchFoodById = (id) => API.get(`/foods/${id}`);
export const fetchCategories = () => API.get('/categories');

export const calculateMacrosAPI = (data) => API.post('/macros/calculate', data);
export const getRecommendationsAPI = (remaining) => API.post('/recommendations', { remaining });

export const fetchCart = () => API.get('/cart');
export const addToCartAPI = (foodItem, customizations) => API.post('/cart', { foodItem, customizations });
export const updateCartItemAPI = (id, quantity) => API.put(`/cart/${id}`, { quantity });
export const removeCartItemAPI = (id) => API.delete(`/cart/${id}`);
export const clearCartAPI = () => API.delete('/cart');

export const createOrderAPI = (orderData) => API.post('/orders', orderData);
export const fetchOrders = () => API.get('/orders');
export const fetchOrderById = (id) => API.get(`/orders/${id}`);

export const fetchSubscription = () => API.get('/subscriptions');
export const createSubscriptionAPI = (subData) => API.post('/subscriptions', subData);
export const updateSubscriptionAPI = (id, data) => API.put(`/subscriptions/${id}`, data);
export const pauseSubscriptionAPI = (id, details) => API.post(`/subscriptions/${id}/pause`, details);
export const resumeSubscriptionAPI = (id) => API.post(`/subscriptions/${id}/resume`);
export const cancelSubscriptionAPI = (id, details) => API.post(`/subscriptions/${id}/cancel`, details);

export const fetchDashboardData = () => API.get('/dashboard');

export default API;
