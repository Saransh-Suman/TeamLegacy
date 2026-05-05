/**
 * Route: Creator Target Market
 * Handles GET /api/creator/target-market route.
 */
import express from 'express';
import { getTargetMarket } from '../../services/creator/targetMarketService.js';

const router = express.Router();

router.get('/target-market', async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ error: true, message: 'topic query param is required' });
    }

    const result = await getTargetMarket(topic);

    if (!result) {
      return res.status(404).json({ error: true, message: 'No courses found for this topic' });
    }

    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
