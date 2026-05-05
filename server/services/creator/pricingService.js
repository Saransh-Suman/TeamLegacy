/**
 * Service: Creator Pricing Analysis
 * Handles business logic for comparing a creator's course price against the market.
 */
import { supabase } from '../../lib/supabase.js';

export async function getPricingAnalysis(creatorCourseId) {
  if (!creatorCourseId) {
    throw new Error('creatorCourseId is required');
  }

  const { data: course, error: courseError } = await supabase
    .from('creator_courses')
    .select('*')
    .eq('id', creatorCourseId)
    .single();

  if (courseError || !course) {
    throw new Error('Creator course not found');
  }

  const creatorPrice = Number(course.price_inr);

  const { data: marketCourses, error: marketError } = await supabase
    .from('courses')
    .select('price_inr')
    .eq('topic', course.topic);

  if (marketError) {
    throw new Error(marketError.message);
  }

  const validPrices = (marketCourses || [])
    .map(c => Number(c.price_inr))
    .filter(p => !isNaN(p));

  if (validPrices.length === 0) {
    return {
      creator_price: creatorPrice,
      market_avg: null,
      market_min: null,
      market_max: null,
      verdict: 'no_data',
      percentile: null,
      message: 'No market data available for this topic yet'
    };
  }

  const sum = validPrices.reduce((acc, p) => acc + p, 0);
  const avg = sum / validPrices.length;
  const min = Math.min(...validPrices);
  const max = Math.max(...validPrices);

  const market_avg = Number(avg.toFixed(2));
  const market_min = min;
  const market_max = max;

  let verdict = 'competitive';
  if (creatorPrice > market_avg * 1.2) {
    verdict = 'overpriced';
  } else if (creatorPrice < market_avg * 0.8) {
    verdict = 'underpriced';
  }

  const lessCount = validPrices.filter(p => p < creatorPrice).length;
  const percentile = Math.round((lessCount / validPrices.length) * 100);

  return {
    creator_price: creatorPrice,
    market_avg,
    market_min,
    market_max,
    verdict,
    percentile
  };
}
