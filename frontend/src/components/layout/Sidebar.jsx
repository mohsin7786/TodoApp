import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import { LayoutDashboard, CheckSquare, CalendarDays, User, Settings, Users, LogOut, Sun, Moon, Zap } from 'lucide-react';

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'My Tasks' },
  { to: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { to: '/shared', icon: Users, label: 'Shared' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { mode } = useSelector((s) => s.theme);
  const { user } = useSelector((s) => s.auth);

  return (
    <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white/80 dark:bg-[#1a1b2e]/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-white/5 z-30">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-100 dark:border-white/5">
        <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-white" /></div>
        <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">TaskFlow</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`
          }>
            <Icon className="w-5 h-5" />{label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-slate-100 dark:border-white/5 space-y-1">
        <button onClick={() => dispatch(toggleTheme())} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 w-full transition-all">
          {mode === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={() => dispatch(logout())} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full transition-all">
          <LogOut className="w-5 h-5" />Logout
        </button>
      </div>
      {user && (
        <div className="px-4 py-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold text-sm">{user.name?.charAt(0)?.toUpperCase()}</div>
            <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{user.name}</p><p className="text-xs text-slate-500 truncate">{user.email}</p></div>
          </div>
        </div>
      )}
    </aside>
  );
}
