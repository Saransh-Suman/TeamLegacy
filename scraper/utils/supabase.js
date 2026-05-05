/**
 * Supabase client and database operations for the scraper.
 */

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Upserts an array of courses to the courses table.
 */
export async function upsertCourses(courses) {
  for (const course of courses) {
    const { data, error } = await supabase
      .from('courses')
      .upsert(course, { onConflict: 'url' })
      .select();

    if (error) {
      console.error(`Error upserting course ${course.title}:`, error.message);
    } else if (data && data.length > 0) {
      await insertPriceHistory(data[0].id, course.price_inr);
    }
  }
}

/**
 * Inserts a row into the price_history table.
 */
export async function insertPriceHistory(courseId, price) {
  const { error } = await supabase
    .from('price_history')
    .insert({ course_id: courseId, price_inr: price });

  if (error) {
    console.error(`Error inserting price history for course ${courseId}:`, error.message);
  }
}
