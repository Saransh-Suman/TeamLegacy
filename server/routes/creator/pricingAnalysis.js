/**
 * Route: Creator Pricing Analysis
 * Handles GET /api/creator/pricing-analysis/:creatorCourseId route.
 */
import express from 'express';
import { getPricingAnalysis } from '../../services/creator/pricingService.js';

const router = express.Router();

router.get('/pricing-analysis/:creatorCourseId', async (req, res) => {
  try {
    const creatorCourseId = req.params.creatorCourseId;
    const result = await getPricingAnalysis(creatorCourseId);
    
    res.status(200).json({ success: true, analysis: result });
  } catch (err) {
    res.status(400).json({ error: true, message: err.message });
  }
});

export default router;
