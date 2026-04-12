import SharedWorkspace from '../models/SharedWorkspace.model.js';
import User from '../models/User.model.js';

export const createWorkspace = async (req, res, next) => {
  try {
    const workspace = await SharedWorkspace.create({ name: req.body.name, owner: req.user._id, members: [{ user: req.user._id, role: 'editor' }] });
    res.status(201).json(workspace);
  } catch (err) { next(err); }
};

export const getWorkspaces = async (req, res, next) => {
  try {
    const workspaces = await SharedWorkspace.find({ $or: [{ owner: req.user._id }, { 'members.user': req.user._id }] }).populate('owner', 'name email avatar').populate('members.user', 'name email avatar');
    res.json(workspaces);
  } catch (err) { next(err); }
};

export const inviteToWorkspace = async (req, res, next) => {
  try {
    const workspace = await SharedWorkspace.findOne({ _id: req.params.id, owner: req.user._id });
    if (!workspace) return res.status(404).json({ message: 'Workspace not found' });
    const invitedUser = await User.findOne({ email: req.body.email });
    if (invitedUser) {
      workspace.members.push({ user: invitedUser._id, role: req.body.role || 'editor' });
    } else {
      workspace.invites.push({ email: req.body.email });
    }
    await workspace.save();
    res.json(workspace);
  } catch (err) { next(err); }
};
