/**
 * Creator Competitor Route
 */

import { getCompetitors } from '../../services/creator/competitorService.js';

export const getCompetitorsRoute = async (req, res) => {
  try {
    const { topic } = req.query;
    if (!topic) {
      return res.status(400).json({ error: true, message: 'Topic is required' });
    }

    const competitors = await getCompetitors(topic);
    res.json(competitors);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
