import mongoose from 'mongoose';

const sharedWorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, role: { type: String, enum: ['viewer', 'editor'], default: 'editor' } }],
  invites: [{ email: String, createdAt: { type: Date, default: Date.now } }],
}, { timestamps: true });

export default mongoose.model('SharedWorkspace', sharedWorkspaceSchema);
