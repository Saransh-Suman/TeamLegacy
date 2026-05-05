/**
 * Service: Creator My Courses
 * Handles business logic for fetching a creator's registered courses.
 */
import { supabase } from '../../lib/supabase.js';

export async function getCreatorCourses(creatorId) {
  if (!creatorId) {
    throw new Error('creator_id is required');
  }

  const { data, error } = await supabase
    .from('creator_courses')
    .select('*')
    .eq('creator_id', creatorId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
