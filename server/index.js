/**
 * Express Server Entry Point
 * Sets up middleware, routes, and error handling.
 */

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user/index.js';
import creatorRoutes from './routes/creator/index.js';
import registerRoute from './routes/creator/register.js';
import myCoursesRoute from './routes/creator/myCourses.js';
import trendingRoute from './routes/creator/trending.js';
import pricingAnalysisRoute from './routes/creator/pricingAnalysis.js';
import competitorRoute from './routes/creator/competitor.js';
import targetMarketRoute from './routes/creator/targetMarket.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', userRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/creator', registerRoute);
app.use('/api/creator', myCoursesRoute);
app.use('/api/creator', trendingRoute);
app.use('/api/creator', pricingAnalysisRoute);
app.use('/api/creator', competitorRoute);
app.use('/api/creator', targetMarketRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown for node --watch
const shutdown = () => {
  console.log('Signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
