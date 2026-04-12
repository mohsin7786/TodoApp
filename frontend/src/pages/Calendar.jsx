import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/slices/taskSlice';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calendar() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.tasks);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    dispatch(fetchTasks({ startDate: start.toISOString(), endDate: end.toISOString() }));
  }, [dispatch, currentMonth]);

  const days = eachDayOfInterval({ start: startOfMonth(currentMonth), end: endOfMonth(currentMonth) });
  const startDay = startOfMonth(currentMonth).getDay();

  const getTasksForDay = (day) => items.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), day));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Calendar</h1>
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"><ChevronLeft className="w-5 h-5" /></button>
          <h2 className="text-lg font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"><ChevronRight className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d} className="text-center text-xs font-semibold text-slate-500 py-2">{d}</div>)}
          {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {days.map(day => {
            const dayTasks = getTasksForDay(day);
            return (
              <motion.div key={day.toISOString()} whileHover={{ scale: 1.05 }}
                className={`min-h-[80px] sm:min-h-[100px] p-2 rounded-xl border transition-all cursor-pointer ${isToday(day) ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/20' : 'border-slate-100 dark:border-white/5 hover:border-brand-200'}`}>
                <span className={`text-sm font-medium ${isToday(day) ? 'text-brand-600 dark:text-brand-400' : ''}`}>{format(day, 'd')}</span>
                <div className="mt-1 space-y-1">
                  {dayTasks.slice(0, 2).map(t => (
                    <div key={t._id} className={`text-xs px-1.5 py-0.5 rounded truncate ${t.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : t.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                      {t.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && <span className="text-xs text-slate-400">+{dayTasks.length - 2} more</span>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
