import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { createTask, updateTask } from '../store/slices/taskSlice';
import { X, Plus, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['personal', 'work', 'study', 'health', 'shopping', 'other'];
const priorities = ['low', 'medium', 'high'];

export default function TaskForm({ isOpen, onClose, editTask }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', category: 'personal', dueDate: '', dueTime: '', tags: '', recurring: 'none', notes: '', subtasks: [] });
  const [newSubtask, setNewSubtask] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (editTask) setForm({ ...editTask, tags: editTask.tags?.join(', ') || '', subtasks: editTask.subtasks || [] });
    else setForm({ title: '', description: '', priority: 'medium', category: 'personal', dueDate: '', dueTime: '', tags: '', recurring: 'none', notes: '', subtasks: [] });
  }, [editTask, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    const taskData = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    if (editTask) dispatch(updateTask({ id: editTask._id, ...taskData }));
    else dispatch(createTask(taskData));
    toast.success(editTask ? 'Task updated!' : 'Task created! 🎉');
    onClose();
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    setForm(f => ({ ...f, subtasks: [...f.subtasks, { title: newSubtask, completed: false }] }));
    setNewSubtask('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
          className="w-full sm:max-w-lg bg-white dark:bg-[#1e1f36] rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="sticky top-0 bg-white/90 dark:bg-[#1e1f36]/90 backdrop-blur-xl px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-bold">{editTask ? 'Edit Task' : 'New Task'}</h2>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input className="input-field text-lg font-medium" placeholder="Task title..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} autoFocus />
            <textarea className="input-field resize-none" rows={2} placeholder="Description (optional)" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-slate-500 mb-1 block">Priority</label>
                <select className="input-field" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                  {priorities.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
              <div><label className="text-xs font-medium text-slate-500 mb-1 block">Category</label>
                <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-medium text-slate-500 mb-1 block">Due Date</label>
                <input type="date" className="input-field" value={form.dueDate?.slice(0, 10) || ''} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
              </div>
              <div><label className="text-xs font-medium text-slate-500 mb-1 block">Due Time</label>
                <input type="time" className="input-field" value={form.dueTime || ''} onChange={e => setForm(f => ({ ...f, dueTime: e.target.value }))} />
              </div>
            </div>
            <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 font-medium">
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />Advanced options
            </button>
            {showAdvanced && (
              <div className="space-y-4 animate-fade-in">
                <input className="input-field" placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Recurring</label>
                  <select className="input-field" value={form.recurring} onChange={e => setForm(f => ({ ...f, recurring: e.target.value }))}>
                    {['none', 'daily', 'weekly', 'monthly'].map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                  </select>
                </div>
                <textarea className="input-field resize-none" rows={2} placeholder="Notes..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-2 block">Subtasks</label>
                  {form.subtasks.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input type="checkbox" checked={s.completed} onChange={() => setForm(f => ({ ...f, subtasks: f.subtasks.map((st, idx) => idx === i ? { ...st, completed: !st.completed } : st) }))} className="rounded" />
                      <span className={`text-sm flex-1 ${s.completed ? 'line-through text-slate-400' : ''}`}>{s.title}</span>
                      <button type="button" onClick={() => setForm(f => ({ ...f, subtasks: f.subtasks.filter((_, idx) => idx !== i) }))} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input className="input-field flex-1" placeholder="Add subtask..." value={newSubtask} onChange={e => setNewSubtask(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubtask())} />
                    <button type="button" onClick={addSubtask} className="gradient-btn !px-3 !py-2"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            )}
            <button type="submit" className="gradient-btn w-full mt-4">{editTask ? 'Update Task' : 'Create Task'}</button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
