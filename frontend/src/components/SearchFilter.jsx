import { FiSearch, FiFilter } from 'react-icons/fi';
import { CATEGORIES, STATUSES } from '../constants';

export default function SearchFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  showFilters = true,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by ID, brand, model, serial, employee..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field pl-10"
        />
      </div>
      {showFilters && (
        <div className="flex gap-2">
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="input-field min-w-[140px] appearance-none pl-9 pr-8"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="input-field min-w-[130px]"
          >
            <option value="">All Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
