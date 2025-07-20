import { Router } from 'express';
import { FontController } from '../controllers/FontController.js';
import { uploadMiddleware } from '../middleware/upload.js';

const router = Router();

// GET /api/fonts - Get all fonts
router.get('/', FontController.getAllFonts);

// GET /api/fonts/:id - Get font by ID
router.get('/:id', FontController.getFontById);

// POST /api/fonts - Upload new font
router.post('/', uploadMiddleware.single('font'), FontController.uploadFont);

// PUT /api/fonts/:id - Update font
router.put('/:id', FontController.updateFont);

// DELETE /api/fonts/:id - Delete font
router.delete('/:id', FontController.deleteFont);

export default router;