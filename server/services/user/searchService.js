
/**
 * User Search Service
 */

import { supabase } from '../../lib/supabase.js';

export async function searchCourses(filters) {
  let query = supabase.from('courses').select('*');

  if (filters.q) {
    query = query.ilike('title', `%${filters.q}%`);
  }
  if (filters.platform) {
    query = query.eq('platform', filters.platform);
  }
  if (filters.max_price) {
    query = query.lte('price_inr', filters.max_price);
  }
  if (filters.level) {
    query = query.eq('level', filters.level);
  }
  if (filters.topic) {
    query = query.eq('topic', filters.topic);
  }

  const { data, error } = await query.order('rating', { ascending: false });

  if (error) throw error;

  // Add hidden_gem flag in JS to ensure logic consistency
  return data.map(course => ({
    ...course,
    hidden_gem: course.rating > 4.3 && course.price_inr < 999
  }));
}
