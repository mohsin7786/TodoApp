import { Router } from 'express';
import { createWorkspace, getWorkspaces, inviteToWorkspace } from '../controllers/share.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect);

router.post('/workspace', createWorkspace);
router.get('/workspaces', getWorkspaces);
router.post('/workspace/:id/invite', inviteToWorkspace);

export default router;
