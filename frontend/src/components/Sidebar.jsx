import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiPackage,
  FiPlusCircle,
  FiBarChart2,
  FiMonitor,
  FiCpu,
  FiTv,
  FiPrinter,
  FiWifi,
  FiLink,
  FiX,
} from 'react-icons/fi';
import { CATEGORY_ROUTES } from '../constants';

const navItems = [
  { to: '/', label: 'Dashboard', icon: FiHome },
  { to: '/assets', label: 'All Assets', icon: FiPackage },
  { to: '/assets/add', label: 'Add Asset', icon: FiPlusCircle },
  { to: '/reports', label: 'Reports', icon: FiBarChart2 },
];

const categoryItems = [
  { to: CATEGORY_ROUTES.Laptops, label: 'Laptops', icon: FiMonitor },
  { to: CATEGORY_ROUTES.Desktops, label: 'Desktops', icon: FiCpu },
  { to: CATEGORY_ROUTES.LEDs, label: 'LEDs', icon: FiTv },
  { to: CATEGORY_ROUTES.Printers, label: 'Printers', icon: FiPrinter },
  { to: CATEGORY_ROUTES['WiFi Devices'], label: 'WiFi Devices', icon: FiWifi },
  { to: CATEGORY_ROUTES.Cables, label: 'Cables', icon: FiLink },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
    isActive
      ? 'bg-primary-600 text-white shadow-soft'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
  }`;

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`glass-sidebar fixed left-0 top-0 z-50 flex h-full w-64 flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 p-5 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-sm">
              ERA
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 dark:text-white">ERA IT AMS</h1>
              <p className="text-xs text-slate-500">Asset Management</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 lg:hidden text-slate-500">
            <FiX className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={linkClass} onClick={onClose}>
                  <item.icon className="text-lg" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Categories
          </p>
          <ul className="space-y-1">
            {categoryItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass} onClick={onClose}>
                  <item.icon className="text-lg" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-200/80 p-4 dark:border-slate-700">
          <p className="text-center text-xs text-slate-400">© 2026 ERA Global IT</p>
          <p className="text-center text-xs text-slate-400">Designed by Prateek Mittal</p>
        </div>
      </aside>
    </>
  );
}
