import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPackage,
  FiMonitor,
  FiCpu,
  FiPrinter,
  FiTool,
  FiCheckCircle,
} from 'react-icons/fi';
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
} from 'recharts';
import { fetchStats } from '../api/assets';
import StatsCard from '../components/StatsCard';
import AssetTable from '../components/AssetTable';
import Loader from '../components/Loader';
import { STATUS_COLORS } from '../constants';

const CHART_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats()
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const statusData =
    stats?.byStatus?.map((s) => ({
      name: s.status,
      value: s.count,
    })) || [];

  const categoryData =
    stats?.byCategory?.map((c) => ({
      name: c.category,
      count: c.count,
    })) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Overview of your IT assets</p>
        </div>
        <Link to="/assets/add" className="btn-primary w-fit">
          + Add New Asset
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatsCard title="Total Assets" value={stats?.totalAssets} icon={FiPackage} color="primary" link="/assets" />
        <StatsCard title="Laptops" value={stats?.laptops} icon={FiMonitor} color="blue" link="/category/laptops" />
        <StatsCard title="Desktops" value={stats?.desktops} icon={FiCpu} color="violet" link="/category/desktops" />
        <StatsCard title="Printers" value={stats?.printers} icon={FiPrinter} color="rose" link="/category/printers" />
        <StatsCard title="In Repair" value={stats?.inRepair} icon={FiTool} color="amber" link="/assets?status=In+Repair" />
        <StatsCard title="Available" value={stats?.available} icon={FiCheckCircle} color="emerald" link="/assets?status=Available" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Assets by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Status Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {statusData.map((s) => (
              <span key={s.name} className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[s.name]}`}>
                {s.name}: {s.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 dark:text-white">Recent Assets</h3>
          <Link to="/assets" className="text-sm font-medium text-primary-600 hover:underline">
            View all
          </Link>
        </div>
        {stats?.recentAssets?.length ? (
          <AssetTable assets={stats.recentAssets} onDelete={null} />
        ) : (
          <p className="py-8 text-center text-slate-500">No assets yet. Add your first asset!</p>
        )}
      </div>
    </div>
  );
}
