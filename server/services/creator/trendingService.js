/**
 * Creator Trending Service
 */

import { supabase } from '../../lib/supabase.js';

export async function getTrending() {
  const { data: courses, error } = await supabase.from('courses').select('*');

  if (error) throw error;

  const groupedByTopic = courses.reduce((acc, course) => {
    const topic = course.topic || 'general';
    if (!acc[topic]) {
      acc[topic] = {
        topic,
        course_count: 0,
        total_price: 0,
        prices: [],
        total_rating: 0
      };
    }
    acc[topic].course_count++;
    acc[topic].total_price += course.price_inr;
    acc[topic].prices.push(course.price_inr);
    acc[topic].total_rating += course.rating || 0;
    return acc;
  }, {});

  const trends = Object.values(groupedByTopic).map(t => {
    const avg_price = t.total_price / t.course_count;
    const avg_rating = t.total_rating / t.course_count;
    return {
      topic: t.topic,
      course_count: t.course_count,
      avg_price: Math.round(avg_price * 100) / 100,
      min_price: Math.min(...t.prices),
      max_price: Math.max(...t.prices),
      avg_rating: Math.round(avg_rating * 100) / 100,
      demand_score: Math.round((t.course_count * avg_rating) * 100) / 100
    };
  });

  return trends.sort((a, b) => b.demand_score - a.demand_score);
}
