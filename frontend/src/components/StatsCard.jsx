import { Link } from 'react-router-dom';

export default function StatsCard({ title, value, icon: Icon, color = 'primary', link }) {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
    blue: 'from-blue-500 to-blue-600',
    violet: 'from-violet-500 to-violet-600',
    rose: 'from-rose-500 to-rose-600',
  };

  const content = (
    <div className="glass-card group p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">{value ?? 0}</p>
        </div>
        <div
          className={`rounded-xl bg-gradient-to-br ${colors[color]} p-3 text-white shadow-soft transition group-hover:scale-105`}
        >
          {Icon && <Icon className="text-xl" />}
        </div>
      </div>
    </div>
  );

  if (link) return <Link to={link}>{content}</Link>;
  return content;
}
