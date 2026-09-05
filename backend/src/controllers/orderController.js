const paymentService = require('../services/paymentService');

let ordersStore = [
  {
    id: 'ORD-89412',
    order_number: 'SWAD-89412',
    status: 'Out for Delivery',
    total_price: 558.00,
    delivery_fee: 30.00,
    tax: 28.00,
    total_calories: 1000,
    total_protein: 92,
    total_carbs: 90,
    total_fat: 22,
    total_fibre: 14,
    delivery_slot: '12:00 PM - 01:00 PM',
    delivery_address: 'Flat 402, Oakwood Heights, Hitec City, Hyderabad - 500081',
    kitchen: 'Swadfit Kitchen Hitec City',
    delivery_agent: { name: 'Suresh Kumar', phone: '+91 98765 12345', vehicle: 'TS 09 SW 4092' },
    created_at: new Date().toISOString(),
    items: [
      { name: 'Tandoori Chicken Breast Bowl', quantity: 1, price: 289, protein: 48, calories: 480 },
      { name: 'Chicken Tikka & Multigrain Roti', quantity: 1, price: 269, protein: 44, calories: 520 }
    ]
  }
];

async function createOrder(req, res) {
  try {
    const { items = [], deliveryAddress, deliverySlot, paymentMethod = 'UPI' } = req.body;

    if (!items.length) {
      return res.status(400).json({ success: false, error: 'Cannot place empty order' });
    }

    // Security check: Recalculate totals on backend
    let totalPrice = 0;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFibre = 0;

    items.forEach(item => {
      const q = item.quantity || 1;
      totalPrice += (item.price || 0) * q;
      totalCalories += (item.calories || 0) * q;
      totalProtein += (item.protein || 0) * q;
      totalCarbs += (item.carbs || 0) * q;
      totalFat += (item.fat || 0) * q;
      totalFibre += (item.fibre || 0) * q;
    });

    const deliveryFee = totalPrice > 500 ? 0 : 40;
    const tax = Math.round(totalPrice * 0.05);
    const grandTotal = totalPrice + deliveryFee + tax;

    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const payment = await paymentService.createPaymentOrder({ amount: grandTotal, receipt: orderId });

    const newOrder = {
      id: orderId,
      order_number: 'SWAD-' + orderId.split('-')[1],
      status: 'Confirmed',
      total_price: grandTotal,
      delivery_fee: deliveryFee,
      tax: tax,
      total_calories: totalCalories,
      total_protein: totalProtein,
      total_carbs: totalCarbs,
      total_fat: totalFat,
      total_fibre: totalFibre,
      delivery_slot: deliverySlot || '12:00 PM - 01:00 PM',
      delivery_address: deliveryAddress || 'Hitec City, Hyderabad',
      kitchen: 'Swadfit Kitchen Hitec City',
      payment_method: paymentMethod,
      transaction_id: payment.transactionId,
      created_at: new Date().toISOString(),
      items
    };

    ordersStore.unshift(newOrder);

    return res.json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function getOrders(req, res) {
  return res.json({ success: true, count: ordersStore.length, data: ordersStore });
}

async function getOrderById(req, res) {
  const { id } = req.params;
  const order = ordersStore.find(o => o.id === id || o.order_number === id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  // Delivery status timeline
  const timeline = [
    { status: 'Confirmed', time: '11:30 AM', completed: true },
    { status: 'Preparing', time: '11:42 AM', completed: true },
    { status: 'Out for Delivery', time: '12:15 PM', completed: order.status === 'Out for Delivery' || order.status === 'Delivered' },
    { status: 'Delivered', time: '12:35 PM', completed: order.status === 'Delivered' }
  ];

  return res.json({ success: true, data: { ...order, timeline } });
}

module.exports = { createOrder, getOrders, getOrderById, ordersStore };
