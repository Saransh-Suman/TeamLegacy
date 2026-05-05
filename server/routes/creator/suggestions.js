/**
 * Creator Suggestions Route
 */

import { getCreatorSuggestions } from '../../services/creator/aiService.js';
import { getCompetitors } from '../../services/creator/competitorService.js';
import { supabase } from '../../lib/supabase.js';

export const getSuggestionsRoute = async (req, res) => {
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

    const competitors = await getCompetitors(course.topic);
    const suggestions = await getCreatorSuggestions(course, competitors);
    
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
