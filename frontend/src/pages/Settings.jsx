import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toggleTheme } from '../store/slices/themeSlice';
import { logout } from '../store/slices/authSlice';
import { Sun, Moon, Download, Trash2, LogOut } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((s) => s.theme);

  const exportTasks = async (format) => {
    try {
      const { data } = await api.get(`/tasks/export?format=${format}`, { responseType: format === 'csv' ? 'blob' : 'json' });
      const blob = format === 'csv' ? new Blob([data], { type: 'text/csv' }) : new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `tasks.${format}`; a.click();
      URL.revokeObjectURL(url);
      toast.success(`Tasks exported as ${format.toUpperCase()}`);
    } catch { toast.error('Export failed'); }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout successful!', { position: 'top-right', duration: 2000 });
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure? This action cannot be undone.')) return;
    try { await api.delete('/users/account'); dispatch(logout()); toast.success('Account deleted'); navigate('/'); } catch { toast.error('Failed to delete account'); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <h2 className="text-lg font-bold mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">{mode === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}<div><p className="font-medium">Dark Mode</p><p className="text-sm text-slate-500">{mode === 'dark' ? 'Currently dark' : 'Currently light'}</p></div></div>
          <button onClick={() => dispatch(toggleTheme())} className={`w-14 h-8 rounded-full p-1 transition-colors ${mode === 'dark' ? 'bg-brand-500' : 'bg-slate-200'}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${mode === 'dark' ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
        <h2 className="text-lg font-bold mb-4">Export Data</h2>
        <div className="flex gap-3">
          <button onClick={() => exportTasks('json')} className="gradient-btn-outline flex items-center gap-2 text-sm"><Download className="w-4 h-4" />Export JSON</button>
          <button onClick={() => exportTasks('csv')} className="gradient-btn-outline flex items-center gap-2 text-sm"><Download className="w-4 h-4" />Export CSV</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 border-red-200 dark:border-red-900/30">
        <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-500 font-medium hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors text-sm w-full border border-amber-200 dark:border-amber-800/30">
            <LogOut className="w-4 h-4" />Logout
          </button>
          <button onClick={handleDeleteAccount} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-500 font-medium hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-sm w-full border border-red-200 dark:border-red-800/30">
            <Trash2 className="w-4 h-4" />Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
