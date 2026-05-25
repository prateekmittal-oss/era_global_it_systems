import { FiInbox } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function EmptyState({ title = 'No assets found', description, actionLabel, actionTo }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16 dark:border-slate-700 dark:bg-slate-800/30">
      <div className="mb-4 rounded-full bg-primary-100 p-4 dark:bg-primary-900/30">
        <FiInbox className="text-3xl text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="mb-1 text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
      {description && (
        <p className="mb-4 max-w-sm text-center text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
