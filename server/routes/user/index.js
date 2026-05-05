import express from 'express';
import { searchCoursesRoute } from './search.js';
import { compareCoursesRoute } from './pricing.js';
import { summarizeCourseRoute } from './summarize.js';

const router = express.Router();

router.get('/search', searchCoursesRoute);
router.get('/compare', compareCoursesRoute);
router.get('/:id/summary', summarizeCourseRoute);

export default router;
