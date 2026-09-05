let activeSubscription = {
  id: 'SUB-77291',
  subscription_number: 'SWAD-SUB-77291',
  plan_name: 'Daily Dual Fuel (2 Meals/Day)',
  meals_per_day: 2,
  status: 'Active',
  start_date: '2026-09-01',
  end_date: '2026-09-30',
  total_days: 30,
  used_days: 5,
  remaining_days: 25,
  daily_price: 459.00,
  total_price: 13770.00,
  discount: 1652.00,
  delivery_slot: 'Lunch (12 PM) & Dinner (8 PM)',
  delivery_address: 'Flat 402, Oakwood Heights, Hitec City, Hyderabad',
  selected_meals: [
    { type: 'Lunch', dish: 'Tandoori Chicken Breast Bowl', calories: 480, protein: 48 },
    { type: 'Dinner', dish: 'High Protein Paneer Bhurji Meal', calories: 460, protein: 32 }
  ]
};

async function getSubscription(req, res) {
  return res.json({ success: true, data: activeSubscription });
}

async function createSubscription(req, res) {
  const { planName, mealsPerDay, selectedMeals, deliverySlot, address } = req.body;

  const subId = 'SUB-' + Math.floor(10000 + Math.random() * 90000);
  const totalDays = 30;
  const dailyPrice = mealsPerDay === 1 ? 249 : mealsPerDay === 2 ? 459 : mealsPerDay === 3 ? 629 : 789;
  const totalPrice = dailyPrice * totalDays;
  const discount = Math.round(totalPrice * 0.12);

  activeSubscription = {
    id: subId,
    subscription_number: 'SWAD-' + subId,
    plan_name: planName || `${mealsPerDay} Meals Daily Plan`,
    meals_per_day: mealsPerDay || 2,
    status: 'Active',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    total_days: totalDays,
    used_days: 0,
    remaining_days: totalDays,
    daily_price: dailyPrice,
    total_price: totalPrice - discount,
    discount,
    delivery_slot: deliverySlot || 'Lunch & Dinner',
    delivery_address: address || 'Hyderabad',
    selected_meals: selectedMeals || []
  };

  return res.json({ success: true, message: 'Subscription created successfully!', data: activeSubscription });
}

async function pauseSubscription(req, res) {
  if (activeSubscription.status !== 'Active') {
    return res.status(400).json({ success: false, error: 'Subscription is not currently active' });
  }

  const { pauseStartDate, resumeDate } = req.body;
  activeSubscription.status = 'Paused';
  activeSubscription.pause_details = {
    paused_from: pauseStartDate || new Date().toISOString().split('T')[0],
    resume_on: resumeDate || 'Next Monday'
  };

  return res.json({
    success: true,
    message: 'Subscription paused successfully. You will not be charged for paused days.',
    data: activeSubscription
  });
}

async function resumeSubscription(req, res) {
  if (activeSubscription.status !== 'Paused') {
    return res.status(400).json({ success: false, error: 'Subscription is not currently paused' });
  }

  activeSubscription.status = 'Active';
  delete activeSubscription.pause_details;

  return res.json({
    success: true,
    message: 'Subscription resumed successfully!',
    data: activeSubscription
  });
}

async function cancelSubscription(req, res) {
  const { reason } = req.body;

  // Server-side refund calculation: calculate unused eligible days
  const remainingDays = activeSubscription.remaining_days || (activeSubscription.total_days - activeSubscription.used_days);
  const perDayPrice = activeSubscription.total_price / activeSubscription.total_days;
  const eligibleRefund = Math.round(remainingDays * perDayPrice * 0.90); // 10% processing fee deduction

  activeSubscription.status = 'Cancelled';
  activeSubscription.cancel_reason = reason || 'Customer requested';
  activeSubscription.refund_amount = eligibleRefund;

  return res.json({
    success: true,
    message: `Subscription cancelled. Refund of ₹${eligibleRefund} for ${remainingDays} unused days will be credited within 3-5 business days.`,
    data: {
      ...activeSubscription,
      refundSummary: {
        unusedDays: remainingDays,
        dailyRate: perDayPrice,
        grossRefund: remainingDays * perDayPrice,
        processingFee: Math.round(remainingDays * perDayPrice * 0.10),
        netRefundAmount: eligibleRefund
      }
    }
  });
}

async function updateSubscription(req, res) {
  const { selectedMeals, deliverySlot } = req.body;
  if (selectedMeals) activeSubscription.selected_meals = selectedMeals;
  if (deliverySlot) activeSubscription.delivery_slot = deliverySlot;

  return res.json({ success: true, message: 'Upcoming subscription meals updated!', data: activeSubscription });
}

module.exports = {
  getSubscription,
  createSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  updateSubscription
};
