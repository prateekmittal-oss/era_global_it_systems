import { Link } from 'react-router-dom';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { STATUS_COLORS } from '../constants';
import { formatDate } from '../utils/formatDate';

export default function AssetTable({ assets, onDelete, showActions = true }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-700">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-800/50">
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Asset ID</th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Category</th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Brand / Model</th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Employee</th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Location</th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Status</th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Created</th>
            {showActions && (
              <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset._id}
              className="border-b border-slate-100 transition hover:bg-slate-50/50 dark:border-slate-700/50 dark:hover:bg-slate-800/30"
            >
              <td className="px-4 py-3 font-mono text-xs font-semibold text-primary-600 dark:text-primary-400">
                {asset.assetId}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{asset.category}</td>
              <td className="px-4 py-3">
                <span className="font-medium text-slate-800 dark:text-white">{asset.brand}</span>
                <span className="text-slate-500"> · {asset.model}</span>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {asset.assignedEmployeeName || '—'}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{asset.officeLocation}</td>
              <td className="px-4 py-3">
                <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[asset.status]}`}>
                  {asset.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">{formatDate(asset.createdAt)}</td>
              {showActions && (
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Link
                      to={`/assets/${asset._id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30"
                      title="View"
                    >
                      <FiEye />
                    </Link>
                    <Link
                      to={`/assets/edit/${asset._id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </Link>
                    {onDelete && (
                      <button
                        onClick={() => onDelete(asset)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
