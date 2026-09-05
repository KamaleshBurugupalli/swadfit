const { generateRecommendations } = require('../services/recommendationService');
const { fallbackFoods } = require('./foodController');

async function calculateMacros(req, res) {
  try {
    const { target = {}, selectedItems = [] } = req.body;

    const defaultTarget = {
      calories: target.calories || 2000,
      protein: target.protein || 150,
      carbs: target.carbs || 200,
      fat: target.fat || 60,
      fibre: target.fibre || 30
    };

    let consumed = { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 };

    selectedItems.forEach(item => {
      const qty = item.quantity || 1;
      consumed.calories += (item.calories || 0) * qty;
      consumed.protein += (item.protein || 0) * qty;
      consumed.carbs += (item.carbs || 0) * qty;
      consumed.fat += (item.fat || 0) * qty;
      consumed.fibre += (item.fibre || 0) * qty;
    });

    const remaining = {
      calories: defaultTarget.calories - consumed.calories,
      protein: defaultTarget.protein - consumed.protein,
      carbs: defaultTarget.carbs - consumed.carbs,
      fat: defaultTarget.fat - consumed.fat,
      fibre: defaultTarget.fibre - consumed.fibre
    };

    const warnings = [];
    if (consumed.calories > defaultTarget.calories) {
      warnings.push(`You are above your daily calorie target by ${consumed.calories - defaultTarget.calories} kcal.`);
    }
    if (consumed.fat > defaultTarget.fat) {
      warnings.push(`You have exceeded your daily fat limit by ${consumed.fat - defaultTarget.fat}g.`);
    }

    return res.json({
      success: true,
      data: {
        target: defaultTarget,
        consumed,
        remaining,
        warnings,
        percentage: {
          calories: Math.min(100, Math.round((consumed.calories / defaultTarget.calories) * 100)),
          protein: Math.min(100, Math.round((consumed.protein / defaultTarget.protein) * 100)),
          carbs: Math.min(100, Math.round((consumed.carbs / defaultTarget.carbs) * 100)),
          fat: Math.min(100, Math.round((consumed.fat / defaultTarget.fat) * 100)),
          fibre: Math.min(100, Math.round((consumed.fibre / defaultTarget.fibre) * 100))
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function getRecommendations(req, res) {
  try {
    const { remaining = { calories: 400, protein: 35, carbs: 40, fat: 12, fibre: 8 } } = req.body;
    const recommendations = generateRecommendations(remaining, fallbackFoods);
    return res.json({ success: true, data: recommendations });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { calculateMacros, getRecommendations };
