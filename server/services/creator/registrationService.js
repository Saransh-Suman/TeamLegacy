/**
 * Service: Creator Course Registration
 * Handles business logic for creator course registration.
 */
import { supabase } from '../../lib/supabase.js';

export async function registerCourse(data) {
  const { creator_id, course_url, platform, title, price_inr, rating, hours, topic, level } = data;

  if (!creator_id || !course_url || !platform) {
    throw new Error('creator_id, course_url, and platform are required');
  }

  // Check if a row already exists
  const { data: existing, error: findError } = await supabase
    .from('creator_courses')
    .select('id')
    .eq('creator_id', creator_id)
    .eq('course_url', course_url)
    .single();

  if (findError && findError.code !== 'PGRST116') { // PGRST116 is "No rows found"
    throw new Error(findError.message);
  }

  if (existing) {
    throw new Error('You have already registered this course URL');
  }

  const { data: inserted, error: insertError } = await supabase
    .from('creator_courses')
    .insert([
      {
        creator_id,
        course_url,
        platform,
        title,
        price_inr,
        rating,
        hours,
        topic,
        level
      }
    ])
    .select()
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return inserted;
}
