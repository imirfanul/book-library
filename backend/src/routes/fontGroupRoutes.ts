import { Router } from 'express';
import { FontGroupController } from '../controllers/FontGroupController.js';

const router = Router();

// GET /api/font-groups - Get all font groups
router.get('/', FontGroupController.getAllGroups);

// GET /api/font-groups/:id - Get font group by ID
router.get('/:id', FontGroupController.getGroupById);

// POST /api/font-groups - Create new font group
router.post('/', FontGroupController.createGroup);

// PUT /api/font-groups/:id - Update font group
router.put('/:id', FontGroupController.updateGroup);

// DELETE /api/font-groups/:id - Delete font group
router.delete('/:id', FontGroupController.deleteGroup);

export default router;