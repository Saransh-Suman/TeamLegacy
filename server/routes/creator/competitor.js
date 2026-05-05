/**
 * Route: Creator Competitors
 * Handles GET /api/creator/competitor route.
 */
import express from 'express';
import { getCompetitors } from '../../services/creator/competitorService.js';

export const getCompetitorsRoute = async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ error: true, message: 'topic query param is required' });
    }

    const competitors = await getCompetitors(topic);

    res.status(200).json({ success: true, count: competitors.length, competitors });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const router = express.Router();
router.get('/competitor', getCompetitorsRoute);
export default router;
