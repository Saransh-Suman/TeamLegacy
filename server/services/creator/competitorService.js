/**
 * Service: Creator Competitor Analysis
 * Handles fetching and analyzing competitor courses.
 */
import { supabase } from '../../lib/supabase.js';

export async function getCompetitors(topic) {
  if (!topic) {
    throw new Error('topic query param is required');
  }

  // Fetch all rows from courses table where topic matches (case-insensitive)
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .ilike('topic', topic);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const competitors = data.map(course => {
    const strengths = [];

    // Push 'High Rating' if rating > 4.5
    if (course.rating > 4.5) {
      strengths.push('High Rating');
    }

    // Push 'Low Price' if price_inr < 999
    if (course.price_inr < 999) {
      strengths.push('Low Price');
    }

    // Push 'Popular Platform' if platform is 'udemy' or 'coursera'
    const platform = (course.platform || '').toLowerCase();
    if (platform === 'udemy' || platform === 'coursera') {
      strengths.push('Popular Platform');
    }

    // Push 'Hidden Gem' if hidden_gem is true
    if (course.hidden_gem === true) {
      strengths.push('Hidden Gem');
    }

    return {
      id: course.id,
      title: course.title,
      platform: course.platform,
      price_inr: course.price_inr,
      rating: course.rating,
      hours: course.hours,
      level: course.level,
      url: course.url,
      hidden_gem: course.hidden_gem,
      strengths
    };
  });

  // Sort by rating descending
  return competitors.sort((a, b) => (b.rating || 0) - (a.rating || 0));
}
