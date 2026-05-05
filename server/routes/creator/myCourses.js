/**
 * Route: Creator My Courses
 * Handles GET /api/creator/courses/:creatorId route.
 */
import express from 'express';
import { getCreatorCourses } from '../../services/creator/myCoursesService.js';

const router = express.Router();

router.get('/courses/:creatorId', async (req, res) => {
  try {
    const creatorId = req.params.creatorId;
    const results = await getCreatorCourses(creatorId);

    res.status(200).json({ success: true, count: results.length, courses: results });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
});

export default router;
