import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask, undoDelete, reorderTasks, bulkDeleteCompleted, getStats, exportTasks } from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/stats', getStats);
router.get('/export', exportTasks);
router.put('/reorder', reorderTasks);
router.delete('/bulk-completed', bulkDeleteCompleted);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/:id/undo', undoDelete);

export default router;
