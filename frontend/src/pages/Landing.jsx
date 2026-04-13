import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, BarChart3, Users, ArrowRight, Sparkles, Rocket, Target, Zap as ZapIcon } from 'lucide-react';

const features = [
  { icon: CheckCircle2, title: 'Smart Tasks', desc: 'Organize with priorities, categories, subtasks and due dates.' },
  { icon: BarChart3, title: 'Analytics', desc: 'Track your productivity with beautiful charts and streaks.' },
  { icon: Users, title: 'Collaboration', desc: 'Share workspaces and assign tasks to your team.' },
  { icon: Sparkles, title: 'Beautiful UI', desc: 'Premium glassmorphism design that feels delightful to use.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50 dark:from-[#0a0b1a] dark:via-[#0f111e] dark:to-[#131538] overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-200/20 dark:bg-brand-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-2s"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">TaskFlow</span>
          </motion.div>
          <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-4 py-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/10">Login</Link>
            <Link to="/register" className="gradient-btn text-sm !px-5 !py-2.5 shadow-lg">Get Started</Link>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 pt-20 sm:pt-32 pb-20">
          {/* Hero Section */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-sm font-medium mb-8 border border-brand-200/30 dark:border-brand-800/30">
              <Sparkles className="w-4 h-4" />
              Premium Task Management
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Organize your life with{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500 bg-clip-text text-transparent">TaskFlow</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The modern task manager that helps you stay productive, focused, and organized. Beautiful design meets powerful features.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link to="/register" className="gradient-btn text-base flex items-center gap-2 !px-8 !py-4 shadow-lg hover:shadow-2xl transition-all duration-300">
                Start Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="gradient-btn-outline text-base !px-8 !py-4">
                Sign In
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="glass-card p-6 h-full hover:shadow-premium transition-all duration-300 border border-white/40 dark:border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/30 dark:to-brand-800/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-brand-200 group-hover:to-brand-100 dark:group-hover:from-brand-800/40 dark:group-hover:to-brand-700/30 transition-all duration-300 shadow-md">
                    <f.icon className="w-6 h-6 text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32"
          >
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Tasks Completed', value: '500K+' },
              { label: 'Teams', value: '2K+' },
              { label: 'Uptime', value: '99.9%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-slate-400 border-t border-slate-100 dark:border-white/5">
          © 2026 TaskFlow. Built with M❤️MIN
        </footer>
      </div>

      {/* Blob animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2s {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
