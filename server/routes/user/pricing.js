/**
 * User Pricing/Compare Route
 */

import { compareCourses } from '../../services/user/pricingService.js';

export const compareCoursesRoute = async (req, res) => {
  try {
    const ids = req.query.ids ? req.query.ids.split(',') : [];
    if (ids.length === 0) {
      return res.status(400).json({ error: true, message: 'No course IDs provided' });
    }

    const results = await compareCourses(ids);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
