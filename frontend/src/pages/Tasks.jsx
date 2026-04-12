import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTasks } from '../store/slices/taskSlice';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Plus, Search, Filter, CheckSquare } from 'lucide-react';

export default function Tasks() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.tasks);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ completed: '', priority: '', category: '' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { dispatch(fetchTasks({ search, ...filter })); }, [dispatch, search, filter]);

  const openEdit = (task) => { setEditTask(task); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditTask(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl sm:text-3xl font-bold">My Tasks</h1><p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{items.length} tasks</p></div>
        <button onClick={() => setShowForm(true)} className="gradient-btn flex items-center gap-2 !text-sm"><Plus className="w-4 h-4" />Add Task</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input className="input-field !pl-10" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="gradient-btn-outline flex items-center gap-2 !text-sm"><Filter className="w-4 h-4" />Filters</button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="grid grid-cols-3 gap-3">
              <select className="input-field text-sm" value={filter.completed} onChange={e => setFilter(f => ({ ...f, completed: e.target.value }))}>
                <option value="">All Status</option><option value="false">Pending</option><option value="true">Completed</option>
              </select>
              <select className="input-field text-sm" value={filter.priority} onChange={e => setFilter(f => ({ ...f, priority: e.target.value }))}>
                <option value="">All Priority</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
              </select>
              <select className="input-field text-sm" value={filter.category} onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}>
                <option value="">All Categories</option><option value="personal">Personal</option><option value="work">Work</option><option value="study">Study</option><option value="health">Health</option><option value="shopping">Shopping</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? <LoadingSkeleton /> : items.length === 0 ? (
        <EmptyState icon={CheckSquare} title="No tasks yet" description="Create your first task and start being productive!" action={<button onClick={() => setShowForm(true)} className="gradient-btn text-sm">Create Task</button>} />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>{items.map(task => <TaskCard key={task._id} task={task} onEdit={openEdit} />)}</AnimatePresence>
        </div>
      )}

      {/* Floating Add Button (mobile) */}
      <button onClick={() => setShowForm(true)} className="md:hidden fixed right-5 bottom-24 w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl shadow-premium flex items-center justify-center text-white z-30 hover:scale-105 transition-transform">
        <Plus className="w-6 h-6" />
      </button>

      <TaskForm isOpen={showForm} onClose={closeForm} editTask={editTask} />
    </div>
  );
}
