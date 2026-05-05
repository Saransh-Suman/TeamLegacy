import express from 'express';
import { getTrendingRoute } from './trending.js';
import { getCompetitorsRoute } from './competitor.js';
import { getSuggestionsRoute } from './suggestions.js';
import { authMiddleware } from '../../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all creator routes
router.use(authMiddleware);

router.get('/trending', getTrendingRoute);
router.get('/competitor', getCompetitorsRoute);
router.get('/:id/suggestions', getSuggestionsRoute);

export default router;
