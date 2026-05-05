/**
 * Service: Creator Trending Topics
 * Computes trending EV course topics from scraped data.
 */
import { supabase } from '../../lib/supabase.js';

export async function getTrending() {
  const { data, error } = await supabase
    .from('courses')
    .select('id, topic, price_inr, rating');

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const grouped = data.reduce((acc, course) => {
    const topic = course.topic || 'unknown';
    if (!acc[topic]) {
      acc[topic] = {
        course_count: 0,
        prices: [],
        ratings: []
      };
    }
    
    acc[topic].course_count += 1;
    
    if (course.price_inr != null) {
      acc[topic].prices.push(Number(course.price_inr));
    }
    
    if (course.rating != null) {
      acc[topic].ratings.push(Number(course.rating));
    }
    
    return acc;
  }, {});

  const topics = Object.keys(grouped).map(topic => {
    const group = grouped[topic];
    
    const avg_price = group.prices.length > 0 
      ? group.prices.reduce((sum, p) => sum + p, 0) / group.prices.length 
      : 0;
      
    const min_price = group.prices.length > 0 
      ? Math.min(...group.prices) 
      : 0;
      
    const max_price = group.prices.length > 0 
      ? Math.max(...group.prices) 
      : 0;
      
    const avg_rating = group.ratings.length > 0 
      ? group.ratings.reduce((sum, r) => sum + r, 0) / group.ratings.length 
      : 0;
      
    const demand_score = group.course_count * avg_rating;

    return {
      topic,
      course_count: group.course_count,
      avg_price: Number(avg_price.toFixed(2)),
      min_price: Number(min_price.toFixed(2)),
      max_price: Number(max_price.toFixed(2)),
      avg_rating: Number(avg_rating.toFixed(2)),
      demand_score: Number(demand_score.toFixed(2))
    };
  });

  return topics.sort((a, b) => b.demand_score - a.demand_score);
}
