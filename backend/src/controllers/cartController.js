let inMemoryCart = [];

async function getCart(req, res) {
  const totals = inMemoryCart.reduce((acc, item) => {
    const qty = item.quantity || 1;
    acc.price += (item.price || 0) * qty;
    acc.calories += (item.calories || 0) * qty;
    acc.protein += (item.protein || 0) * qty;
    acc.carbs += (item.carbs || 0) * qty;
    acc.fat += (item.fat || 0) * qty;
    acc.fibre += (item.fibre || 0) * qty;
    return acc;
  }, { price: 0, calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 });

  return res.json({
    success: true,
    data: {
      items: inMemoryCart,
      itemCount: inMemoryCart.reduce((sum, i) => sum + i.quantity, 0),
      totals
    }
  });
}

async function addToCart(req, res) {
  const { foodItem, customizations = [] } = req.body;
  if (!foodItem) {
    return res.status(400).json({ success: false, error: 'Food item is required' });
  }

  const existingIndex = inMemoryCart.findIndex(item => item.id === foodItem.id && JSON.stringify(item.customizations) === JSON.stringify(customizations));

  if (existingIndex > -1) {
    inMemoryCart[existingIndex].quantity += 1;
  } else {
    inMemoryCart.push({
      ...foodItem,
      quantity: 1,
      customizations
    });
  }

  return getCart(req, res);
}

async function updateCartQuantity(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  const itemIndex = inMemoryCart.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    if (quantity <= 0) {
      inMemoryCart.splice(itemIndex, 1);
    } else {
      inMemoryCart[itemIndex].quantity = quantity;
    }
  }

  return getCart(req, res);
}

async function removeFromCart(req, res) {
  const { id } = req.params;
  inMemoryCart = inMemoryCart.filter(item => item.id !== id);
  return getCart(req, res);
}

async function clearCart(req, res) {
  inMemoryCart = [];
  return getCart(req, res);
}

module.exports = { getCart, addToCart, updateCartQuantity, removeFromCart, clearCart };
