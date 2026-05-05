/**
 * Creator Suggestions Route
 */

import { getCreatorSuggestions } from '../../services/creator/aiService.js';
import { getCompetitors } from '../../services/creator/competitorService.js';
import { supabase } from '../../lib/supabase.js';

export const getSuggestionsRoute = async (req, res) => {
  try {
    const { id } = req.params;

    let course = null;
    const { data, error } = await supabase
      .from('creator_courses')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      // Fallback for demo/mock competitor IDs
      console.warn(`Course ${id} not found in DB. Using mock course for AI demo.`);
      course = {
        id,
        title: "Complete EV Battery Management",
        topic: "Battery",
        price_inr: 1500,
        rating: 4.5
      };
    } else {
      course = data;
    }

    const competitors = await getCompetitors(course.topic);
    const suggestions = await getCreatorSuggestions(course, competitors);
    
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
