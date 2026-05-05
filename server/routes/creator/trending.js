/**
 * Creator Trending Route
 */

import { getTrending } from '../../services/creator/trendingService.js';

export const getTrendingRoute = async (req, res) => {
  try {
    const trends = await getTrending();
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
