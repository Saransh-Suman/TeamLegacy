/**
 * Service: Creator Target Market
 * Computes target market insights based on levels and platforms.
 */
import { supabase } from '../../lib/supabase.js';

export async function getTargetMarket(topic) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .ilike('topic', topic);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return null;
  }

  const levels = {
    beginner: { count: 0, sum: 0 },
    intermediate: { count: 0, sum: 0 },
    advanced: { count: 0, sum: 0 }
  };

  const platformCounts = {};

  data.forEach(course => {
    // Platform
    const plat = course.platform;
    if (plat) {
      platformCounts[plat] = (platformCounts[plat] || 0) + 1;
    }

    // Level
    const lvl = (course.level || '').toLowerCase();
    if (levels[lvl] !== undefined) {
      levels[lvl].count += 1;
      if (course.price_inr != null) {
        levels[lvl].sum += Number(course.price_inr);
      }
    }
  });

  const level_breakdown = {};
  const avg_price_by_level = {};

  for (const [lvl, stats] of Object.entries(levels)) {
    if (stats.count === 0) {
      level_breakdown[lvl] = { count: 0, avg_price: null };
      avg_price_by_level[lvl] = null;
    } else {
      const avg = stats.sum / stats.count;
      const roundedAvg = Number(avg.toFixed(2));
      level_breakdown[lvl] = { count: stats.count, avg_price: roundedAvg };
      avg_price_by_level[lvl] = roundedAvg;
    }
  }

  let dominant_level = 'beginner';
  let maxCount = levels.beginner.count;

  if (levels.intermediate.count > maxCount) {
    dominant_level = 'intermediate';
    maxCount = levels.intermediate.count;
  }

  if (levels.advanced.count > maxCount) {
    dominant_level = 'advanced';
    maxCount = levels.advanced.count;
  }

  const top_platforms = Object.entries(platformCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(p => p[0]);

  let platformStr = '';
  if (top_platforms.length === 1) {
    platformStr = `Top platform is ${top_platforms[0]}.`;
  } else if (top_platforms.length === 2) {
    platformStr = `Top platforms are ${top_platforms[0]} and ${top_platforms[1]}.`;
  }

  const avgPriceDominant = level_breakdown[dominant_level].avg_price;
  const roundedPrice = avgPriceDominant !== null ? Math.round(avgPriceDominant) : 0;

  const insight = `Most ${topic} courses target ${dominant_level} learners. ${platformStr} Average price for ${dominant_level} courses is ₹${roundedPrice}.`;

  return {
    dominant_level,
    level_breakdown,
    avg_price_by_level,
    top_platforms,
    insight
  };
}
