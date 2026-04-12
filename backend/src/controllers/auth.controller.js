import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const signToken = (id, remember) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: remember ? '30d' : process.env.JWT_EXPIRE || '7d' });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already in use' });
    const user = await User.create({ name, email, password });
    const token = signToken(user._id, false);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, theme: user.theme } });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    const token = signToken(user._id, rememberMe);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, theme: user.theme } });
  } catch (err) { next(err); }
};

export const getMe = async (req, res) => {
  res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, avatar: req.user.avatar, theme: req.user.theme } });
};
