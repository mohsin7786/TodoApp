import { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateTask, deleteTask } from '../store/slices/taskSlice';
import { Check, Trash2, Edit3, Clock, Tag, AlertCircle, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const priorityColors = { high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
const categoryIcons = { personal: '👤', work: '💼', study: '📚', health: '🏃', shopping: '🛒', other: '📌' };

function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const toggleComplete = () => {
    dispatch(updateTask({ id: task._id, completed: !task.completed }));
    toast.success(task.completed ? 'Task reopened' : 'Task completed! 🎉');
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    toast('Task deleted', { icon: '🗑️' });
    setShowMenu(false);
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
      className={`glass-card p-4 sm:p-5 group hover:shadow-premium transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3 sm:gap-4">
        <button onClick={toggleComplete} className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${task.completed ? 'bg-brand-500 border-brand-500' : 'border-slate-300 dark:border-slate-600 hover:border-brand-400'}`}>
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold text-sm sm:text-base leading-tight ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</h3>
            <div className="relative flex-shrink-0">
              <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-premium border border-slate-100 dark:border-slate-700 py-1 min-w-[120px] z-10">
                  <button onClick={() => { onEdit?.(task); setShowMenu(false); }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/5 w-full"><Edit3 className="w-3.5 h-3.5" />Edit</button>
                  <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full"><Trash2 className="w-3.5 h-3.5" />Delete</button>
                </div>
              )}
            </div>
          </div>
          {task.description && <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{task.description}</p>}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 font-medium">{categoryIcons[task.category]} {task.category}</span>
            {task.dueDate && (
              <span className="text-xs flex items-center gap-1 text-slate-500"><Clock className="w-3 h-3" />{format(new Date(task.dueDate), 'MMM d')}</span>
            )}
            {task.tags?.map((tag, i) => <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">#{tag}</span>)}
          </div>
          {task.subtasks?.length > 0 && (
            <div className="mt-2 text-xs text-slate-500">{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default memo(TaskCard);
