import { Router } from 'express';
import multer from 'multer';
import { updateProfile, changePassword, uploadAvatar, deleteAccount } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only images allowed'), false);
}});

const router = Router();
router.use(protect);

router.put('/profile', updateProfile);
router.put('/password', changePassword);
router.post('/avatar', upload.single('avatar'), uploadAvatar);
router.delete('/account', deleteAccount);

export default router;
