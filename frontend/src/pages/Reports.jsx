import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { fetchStats, fetchAssets } from '../api/assets';
import { exportToCSV } from '../utils/exportCsv';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import StatsCard from '../components/StatsCard';
import { FiPackage, FiDownload } from 'react-icons/fi';
import { STATUS_COLORS, CATEGORIES } from '../constants';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchStats()
      .then((res) => setStats(res.data))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, [showToast]);

  const handleFullExport = async () => {
    try {
      const res = await fetchAssets({ limit: 5000 });
      exportToCSV(res.data, 'era-full-asset-report.csv');
      showToast('Full report exported');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (loading) return <Loader />;

  const categoryData = stats?.byCategory?.map((c) => ({ name: c.category, value: c.count })) || [];
  const statusData = stats?.byStatus?.map((s) => ({ name: s.status, value: s.count })) || [];

  const categoryBreakdown = CATEGORIES.map((cat) => {
    const found = stats?.byCategory?.find((c) => c.category === cat);
    return { category: cat, count: found?.count || 0 };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Reports & Statistics</h1>
          <p className="text-slate-500">Analytics and export for IT assets</p>
        </div>
        <button onClick={handleFullExport} className="btn-primary w-fit">
          <FiDownload /> Export Full Report
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Assets" value={stats?.totalAssets} icon={FiPackage} color="primary" />
        <StatsCard title="In Repair" value={stats?.inRepair} color="amber" />
        <StatsCard title="Available" value={stats?.available} color="emerald" />
        <StatsCard title="Categories" value={CATEGORIES.length} color="violet" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Category Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={categoryBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card overflow-hidden">
        <h3 className="border-b border-slate-200 p-4 font-semibold dark:border-slate-700">
          Category Summary Table
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Count</th>
              <th className="px-4 py-3 text-left font-semibold">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {categoryBreakdown.map((row) => (
              <tr key={row.category} className="border-t border-slate-100 dark:border-slate-700">
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3 font-semibold">{row.count}</td>
                <td className="px-4 py-3 text-slate-500">
                  {stats?.totalAssets
                    ? `${((row.count / stats.totalAssets) * 100).toFixed(1)}%`
                    : '0%'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        {stats?.byStatus?.map((s) => (
          <span key={s.status} className={`rounded-xl px-4 py-2 text-sm font-semibold ${STATUS_COLORS[s.status]}`}>
            {s.status}: {s.count}
          </span>
        ))}
      </div>
    </div>
  );
}
