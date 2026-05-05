/**
 * Route: Creator Course Registration
 * Handles POST /api/creator/register route.
 */
import express from 'express';
import { registerCourse } from '../../services/creator/registrationService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { creator_id, course_url, platform, title, price_inr, rating, hours, topic, level } = req.body;
    
    const result = await registerCourse({
      creator_id,
      course_url,
      platform,
      title,
      price_inr,
      rating,
      hours,
      topic,
      level
    });

    res.status(201).json({ success: true, course: result });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
});

export default router;
