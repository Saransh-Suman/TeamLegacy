/**
 * User Summarize Route
 */

import { summarizeCourse } from '../../services/user/aiService.js';
import { supabase } from '../../lib/supabase.js';

export const summarizeCourseRoute = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data: course, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !course) {
      return res.status(404).json({ error: true, message: 'Course not found' });
    }

    const summary = await summarizeCourse(course);
    res.json({ ...summary, ai_generated: true });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
