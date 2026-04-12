import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Camera, Save } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try { await api.put('/users/profile', { name }); toast.success('Profile updated!'); } catch { toast.error('Update failed'); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    try { await api.put('/users/password', { currentPassword, newPassword }); toast.success('Password changed!'); setCurrentPassword(''); setNewPassword(''); } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    setUploading(true);
    try { await api.post('/users/avatar', formData); toast.success('Avatar updated!'); } catch { toast.error('Upload failed'); }
    setUploading(false);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-brand-600 transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>
          <div><h2 className="text-xl font-bold">{user?.name}</h2><p className="text-slate-500">{user?.email}</p></div>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div><label className="text-sm font-medium mb-1 block">Display Name</label><input className="input-field" value={name} onChange={e => setName(e.target.value)} /></div>
          <button type="submit" className="gradient-btn flex items-center gap-2 text-sm"><Save className="w-4 h-4" />Save Changes</button>
        </form>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 sm:p-8">
        <h2 className="text-lg font-bold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div><label className="text-sm font-medium mb-1 block">Current Password</label><input className="input-field" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required /></div>
          <div><label className="text-sm font-medium mb-1 block">New Password</label><input className="input-field" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required /></div>
          <button type="submit" className="gradient-btn text-sm">Update Password</button>
        </form>
      </motion.div>
    </div>
  );
}
