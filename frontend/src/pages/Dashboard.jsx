import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchStats } from '../store/slices/taskSlice';
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, Flame, ListTodo, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const dayMap = { 1: 'Sun', 2: 'Mon', 3: 'Tue', 4: 'Wed', 5: 'Thu', 6: 'Fri', 7: 'Sat' };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

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
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-indigo-500/10 rounded-2xl blur-2xl pointer-events-none"></div>
        <div className="relative">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">Created By Momin Brothers</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Welcome back, <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">{user?.name?.split(' ')[0]} 👋</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Here's your productivity overview</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group"
          >
            <div className="glass-card p-5 hover:shadow-premium transition-all duration-300 h-full border border-white/40 dark:border-white/10">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="glass-card p-6 border border-white/40 dark:border-white/10 hover:shadow-premium transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Weekly Activity</h2>
              <div className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400">
                <Zap className="w-4 h-4" />
                Last 7 days
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs text-slate-500" />
                <YAxis axisLine={false} tickLine={false} className="text-xs text-slate-500" />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
                <Bar dataKey="completed" fill="url(#gradient)" radius={[8, 8, 0, 0]} />
                <defs><linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4c6ef5" /><stop offset="100%" stopColor="#748ffc" /></linearGradient></defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Productivity Rate Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ y: -4 }}
        >
          <div className="glass-card p-6 border border-white/40 dark:border-white/10 flex flex-col items-center justify-center text-center h-full hover:shadow-premium transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-500 flex items-center justify-center mb-4 shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="text-5xl font-bold bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">{stats?.productivity || 0}%</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Productivity Rate</p>
            <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2 mt-5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats?.productivity || 0}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full shadow-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
