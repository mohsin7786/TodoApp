import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, BarChart3, Users, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  { icon: CheckCircle2, title: 'Smart Tasks', desc: 'Organize with priorities, categories, subtasks and due dates.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Track your productivity with beautiful charts and streaks.' },
  { icon: Users, title: 'Collaboration', desc: 'Share workspaces and assign tasks to your team.' },
  { icon: Sparkles, title: 'Beautiful UI', desc: 'Premium glassmorphism design that feels delightful to use.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50 dark:from-[#0a0b1a] dark:via-[#0f111e] dark:to-[#131538]">
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
          <span className="text-lg font-bold">TaskFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-colors px-4 py-2">Login</Link>
          <Link to="/register" className="gradient-btn text-sm !px-5 !py-2.5">Get Started</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-20 sm:pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />Premium Task Management
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Organize your life with{' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500 bg-clip-text text-transparent">TaskFlow</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The modern task manager that helps you stay productive, focused, and organized. Beautiful design meets powerful features.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link to="/register" className="gradient-btn text-base flex items-center gap-2 !px-8 !py-4">Start Free <ArrowRight className="w-5 h-5" /></Link>
            <Link to="/login" className="gradient-btn-outline text-base !px-8 !py-4">Sign In</Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              className="glass-card p-6 hover:shadow-premium transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/30 dark:to-brand-800/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-base font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="text-center py-8 text-sm text-slate-400 border-t border-slate-100 dark:border-white/5">
        © 2024 TaskFlow. Built with ❤️
      </footer>
    </div>
  );
}
