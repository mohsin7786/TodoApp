import { motion } from 'framer-motion';

export default function EmptyState({ title, description, icon: Icon, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/30 dark:to-brand-800/20 flex items-center justify-center mb-6"><Icon className="w-10 h-10 text-brand-500" /></div>}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  );
}
