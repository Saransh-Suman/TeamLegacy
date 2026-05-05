/**
 * Express Server Entry Point
 * Sets up middleware, routes, and error handling.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user/index.js';
import creatorRoutes from './routes/creator/index.js';
import registerRoute from './routes/creator/register.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', userRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/creator', registerRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
