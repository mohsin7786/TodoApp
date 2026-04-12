import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0f111e]">
      <Sidebar />
      <main className="flex-1 pb-20 md:pb-0 md:ml-64 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
