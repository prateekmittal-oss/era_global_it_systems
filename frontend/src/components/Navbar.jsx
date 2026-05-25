import { FiMenu, FiMoon, FiSun, FiSearch } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { useAssetContext } from '../context/AssetContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onMenuClick, title }) {
  const { darkMode, toggleTheme } = useTheme();
  const { globalSearch, setGlobalSearch } = useAssetContext();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/assets?search=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex items-center gap-4 px-4 py-3 lg:px-6">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FiMenu className="text-xl" />
        </button>

        <h2 className="hidden text-lg font-bold text-slate-800 dark:text-white sm:block">{title}</h2>

        <form onSubmit={handleSearch} className="relative ml-auto max-w-md flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search assets..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="input-field w-full pl-10 !py-2"
          />
        </form>

        <button
          onClick={toggleTheme}
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          title={darkMode ? 'Light mode' : 'Dark mode'}
        >
          {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
      </div>
    </header>
  );
}
