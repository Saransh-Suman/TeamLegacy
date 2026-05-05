/**
 * User Pricing Service
 */

import { supabase } from '../../lib/supabase.js';

export async function compareCourses(ids) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .in('id', ids);

  if (error) throw error;

  return data.map(course => {
    const value_score = course.price_inr > 0 ? (course.rating / course.price_inr) * 1000 : 0;
    return {
      ...course,
      value_score: Math.round(value_score * 100) / 100
    };
  });
}
