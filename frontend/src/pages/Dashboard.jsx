import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchStats } from '../store/slices/taskSlice';
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, Flame, ListTodo } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const dayMap = { 1: 'Sun', 2: 'Mon', 3: 'Tue', 4: 'Wed', 5: 'Thu', 6: 'Fri', 7: 'Sat' };

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats } = useSelector((s) => s.tasks);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => { dispatch(fetchStats()); }, [dispatch]);

  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const dayNum = i + 1;
    const found = stats?.weeklyCompleted?.find(w => w._id === dayNum);
    return { day: dayMap[dayNum], completed: found?.count || 0 };
  });

  const statCards = [
    { icon: ListTodo, label: 'Total Tasks', value: stats?.total || 0, color: 'from-brand-500 to-brand-600' },
    { icon: CheckCircle2, label: 'Completed', value: stats?.completed || 0, color: 'from-emerald-500 to-emerald-600' },
    { icon: Clock, label: 'Pending', value: stats?.pending || 0, color: 'from-amber-500 to-amber-600' },
    { icon: AlertTriangle, label: 'Overdue', value: stats?.overdue || 0, color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h5>Created By Momin Brothers</h5>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl sm:text-3xl font-bold">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </motion.h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here's your productivity overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card p-5 hover:shadow-premium transition-all duration-300">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass-card p-6">
          <h2 className="text-lg font-bold mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="completed" fill="url(#gradient)" radius={[8, 8, 0, 0]} />
              <defs><linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4c6ef5" /><stop offset="100%" stopColor="#748ffc" /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-500 flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <p className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">{stats?.productivity || 0}%</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Productivity Rate</p>
          <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-3 mt-4 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats?.productivity || 0}%` }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
