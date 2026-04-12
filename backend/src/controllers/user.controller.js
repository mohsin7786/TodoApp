import User from '../models/User.model.js';
import Task from '../models/Task.model.js';

export const updateProfile = async (req, res, next) => {
  try {
    const { name, theme, language } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, theme, language }, { new: true });
    res.json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, theme: user.theme } });
  } catch (err) { next(err); }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    if (!(await user.comparePassword(currentPassword))) return res.status(400).json({ message: 'Current password incorrect' });
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated' });
  } catch (err) { next(err); }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const avatarUrl = `/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl });
    res.json({ avatar: avatarUrl });
  } catch (err) { next(err); }
};

export const deleteAccount = async (req, res, next) => {
  try {
    await Task.deleteMany({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'Account deleted' });
  } catch (err) { next(err); }
};
