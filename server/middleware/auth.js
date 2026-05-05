/**
 * Authentication Middleware
 * Handles mock user in dev and token validation in production.
 */

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (process.env.NODE_ENV !== 'production') {
    // Mock user for development
    req.user = { id: 'mock-user-123', role: 'admin' };
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: true, message: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  // In production, you would validate the token here (e.g., with Supabase Auth or JWT)
  // For now, we'll assume it's valid for the boilerplate
  req.user = { id: 'prod-user-123', role: 'user' }; 
  next();
};
