import { Link } from 'react-router-dom';
import { FiEye, FiEdit2 } from 'react-icons/fi';
import { STATUS_COLORS } from '../constants';
import { formatDate } from '../utils/formatDate';

export default function AssetCard({ asset }) {
  return (
    <div className="glass-card p-5 transition-all hover:shadow-lg">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <span className="font-mono text-xs font-semibold text-primary-600 dark:text-primary-400">
            {asset.assetId}
          </span>
          <h3 className="mt-1 font-semibold text-slate-800 dark:text-white">
            {asset.brand} {asset.model}
          </h3>
          <p className="text-sm text-slate-500">{asset.category}</p>
        </div>
        <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[asset.status]}`}>
          {asset.status}
        </span>
      </div>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
        {asset.assignedEmployeeName || 'Unassigned'} · {asset.officeLocation}
      </p>
      <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
        <span className="text-xs text-slate-400">Added {formatDate(asset.createdAt)}</span>
        <div className="flex gap-2">
          <Link
            to={`/assets/${asset._id}`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30"
          >
            <FiEye />
          </Link>
          <Link
            to={`/assets/edit/${asset._id}`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30"
          >
            <FiEdit2 />
          </Link>
        </div>
      </div>
    </div>
  );
}
