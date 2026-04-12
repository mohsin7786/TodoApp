import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { register, clearError } from '../store/slices/authSlice';
import { Zap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => { if (isAuthenticated) navigate('/dashboard'); }, [isAuthenticated, navigate]);
  useEffect(() => { if (error) { toast.error(error); dispatch(clearError()); } }, [error, dispatch]);

  const handleSubmit = (e) => { e.preventDefault(); if (password.length < 6) return toast.error('Password must be at least 6 characters'); dispatch(register({ name, email, password })); };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-brand-50 dark:from-[#0a0b1a] dark:via-[#0f111e] dark:to-[#131538] px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-bold">TaskFlow</span>
          </Link>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-slate-500 mt-1">Start managing tasks like a pro</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
          <div><label className="text-sm font-medium mb-1 block">Name</label><input className="input-field" required value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" /></div>
          <div><label className="text-sm font-medium mb-1 block">Email</label><input className="input-field" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
          <div><label className="text-sm font-medium mb-1 block">Password</label>
            <div className="relative"><input className="input-field !pr-12" type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="gradient-btn w-full disabled:opacity-50">{loading ? 'Creating account...' : 'Create Account'}</button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-6">Already have an account? <Link to="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link></p>
      </motion.div>
    </div>
  );
}
