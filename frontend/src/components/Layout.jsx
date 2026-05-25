import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const pageTitles = {
  '/': 'Dashboard',
  '/assets': 'All Assets',
  '/assets/add': 'Add Asset',
  '/reports': 'Reports & Statistics',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  let title = pageTitles[location.pathname] || 'ERA IT AMS';
  if (location.pathname.startsWith('/assets/edit')) title = 'Edit Asset';
  if (location.pathname.match(/^\/assets\/[^/]+$/) && !location.pathname.includes('add'))
    title = 'Asset Details';
  if (location.pathname.startsWith('/category')) {
    const slug = location.pathname.split('/').pop();
    title = slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Category';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
