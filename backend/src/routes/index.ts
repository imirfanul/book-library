import { Router } from 'express';
import fontRoutes from './fontRoutes.js';
import fontGroupRoutes from './fontGroupRoutes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running successfully',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/fonts', fontRoutes);
router.use('/font-groups', fontGroupRoutes);

export default router;