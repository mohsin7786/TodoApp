import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-brand-50 dark:from-[#0a0b1a] dark:via-[#0f111e] dark:to-[#131538] px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-8xl font-extrabold bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">404</p>
        <h1 className="text-2xl font-bold mt-4">Page not found</h1>
        <p className="text-slate-500 mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="gradient-btn inline-flex items-center gap-2 mt-6"><Home className="w-4 h-4" />Go Home</Link>
      </motion.div>
    </div>
  );
}
