/**
 * User Search Route
 */

import { searchCourses } from '../../services/user/searchService.js';

export const searchCoursesRoute = async (req, res) => {
  try {
    const filters = {
      q: req.query.q,
      platform: req.query.platform,
      max_price: req.query.max_price,
      level: req.query.level,
      topic: req.query.topic
    };

    const results = await searchCourses(filters);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};
