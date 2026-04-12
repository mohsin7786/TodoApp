import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Mail } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import EmptyState from '../components/EmptyState';

export default function SharedWorkspace() {
  const [workspaces, setWorkspaces] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedWs, setSelectedWs] = useState(null);

  useEffect(() => {
    api.get('/share/workspaces').then(r => setWorkspaces(r.data)).catch(() => {});
  }, []);

  const createWorkspace = async (e) => {
    e.preventDefault();
    try { const { data } = await api.post('/share/workspace', { name }); setWorkspaces(w => [...w, data]); setName(''); setShowCreate(false); toast.success('Workspace created!'); } catch { toast.error('Failed'); }
  };

  const invite = async (e) => {
    e.preventDefault();
    if (!selectedWs) return;
    try { await api.post(`/share/workspace/${selectedWs}/invite`, { email: inviteEmail }); setInviteEmail(''); toast.success('Invite sent!'); } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">Shared Workspaces</h1>
        <button onClick={() => setShowCreate(true)} className="gradient-btn flex items-center gap-2 text-sm"><Plus className="w-4 h-4" />New</button>
      </div>
      {showCreate && (
        <motion.form initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} onSubmit={createWorkspace} className="glass-card p-5 flex gap-3">
          <input className="input-field flex-1" placeholder="Workspace name" value={name} onChange={e => setName(e.target.value)} required />
          <button type="submit" className="gradient-btn text-sm">Create</button>
        </motion.form>
      )}
      {workspaces.length === 0 ? (
        <EmptyState icon={Users} title="No workspaces" description="Create a workspace and invite your friends to collaborate!" />
      ) : (
        <div className="space-y-4">
          {workspaces.map(ws => (
            <motion.div key={ws._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`glass-card p-5 cursor-pointer transition-all ${selectedWs === ws._id ? 'ring-2 ring-brand-500' : ''}`} onClick={() => setSelectedWs(ws._id)}>
              <div className="flex items-center justify-between">
                <div><h3 className="font-bold">{ws.name}</h3><p className="text-sm text-slate-500">{ws.members?.length || 0} members</p></div>
                <div className="flex -space-x-2">
                  {ws.members?.slice(0, 3).map((m, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-white text-xs font-bold">
                      {m.user?.name?.charAt(0) || '?'}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {selectedWs && (
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={invite} className="glass-card p-5 flex gap-3">
          <Mail className="w-5 h-5 text-slate-400 mt-3" />
          <input className="input-field flex-1" type="email" placeholder="Invite by email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} required />
          <button type="submit" className="gradient-btn text-sm">Invite</button>
        </motion.form>
      )}
    </div>
  );
}
