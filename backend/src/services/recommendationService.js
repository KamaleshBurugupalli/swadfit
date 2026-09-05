/**
 * Smart Recommendation Engine
 * Calculates best fitting food items based on remaining user target macros.
 */

function generateRecommendations(remainingMacros, foodItems, limit = 4) {
  const { calories = 0, protein = 0, carbs = 0, fat = 0, fibre = 0 } = remainingMacros;

  if (calories <= 0 && protein <= 0) {
    return {
      message: "You have completed your macro targets for today! Great job hitting your goals.",
      recommendations: [],
      warning: "Consuming additional items will exceed your daily target."
    };
  }

  // Score each food item based on how well it satisfies remaining protein & fibre without blowing past calories
  const scoredItems = foodItems.map(item => {
    let score = 0;

    // Protein score (highest priority)
    if (protein > 0) {
      const proteinDiff = Math.abs(item.protein - protein);
      score += Math.max(0, 100 - proteinDiff * 2);
    }

    // Fibre score
    if (fibre > 0) {
      const fibreDiff = Math.abs(item.fibre - fibre);
      score += Math.max(0, 50 - fibreDiff * 3);
    }

    // Calorie penalty if item exceeds remaining calories by > 150 kcal
    if (item.calories > calories + 150) {
      score -= 80;
    } else {
      score += 40;
    }

    return {
      ...item,
      fitScore: Math.round(score),
      fitReason: `Provides ${item.protein}g protein & ${item.calories} kcal (${Math.round((item.protein / Math.max(1, protein)) * 100)}% of remaining protein goal)`
    };
  });

  // Sort descending by fit score
  scoredItems.sort((a, b) => b.fitScore - a.fitScore);

  return {
    remainingTarget: { calories, protein, carbs, fat, fibre },
    message: `Based on your remaining ${protein}g Protein & ${calories} kcal target, here are top recommendations:`,
    recommendations: scoredItems.slice(0, limit)
  };
}

module.exports = { generateRecommendations };
