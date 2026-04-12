import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, CalendarDays, Users, Settings } from 'lucide-react';

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/calendar', icon: CalendarDays, label: 'Calendar' },
  { to: '/shared', icon: Users, label: 'Shared' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 dark:bg-[#1a1b2e]/90 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/5 z-40 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`
          }>
            <Icon className="w-5 h-5" />{label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
