/**
 * Route: Creator Trending Topics
 * Handles GET /api/creator/trending route.
 */
import express from 'express';
import { getTrending } from '../../services/creator/trendingService.js';

const router = express.Router();

router.get('/trending', async (req, res) => {
  try {
    const results = await getTrending();
    res.status(200).json({ success: true, count: results.length, topics: results });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
