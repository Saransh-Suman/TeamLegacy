/**
 * Creator Competitor Service
 */

import { supabase } from '../../lib/supabase.js';

export async function getCompetitors(topic) {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .eq('topic', topic)
    .order('rating', { ascending: false });

  if (error) throw error;

  return courses.map(course => {
    const strengths = [];
    if (course.rating > 4.5) strengths.push('High Rating');
    if (course.price_inr < 999) strengths.push('Low Price');
    if (['udemy', 'coursera'].includes(course.platform.toLowerCase())) strengths.push('Popular Platform');
    
    return {
      ...course,
      strengths,
      weaknesses: [] // Could be populated with AI analysis if needed
    };
  });
}
