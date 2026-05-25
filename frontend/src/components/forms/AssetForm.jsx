import { CATEGORIES, STATUSES } from '../../constants';

const emptyForm = {
  category: 'Laptops',
  brand: '',
  model: '',
  serialNumber: '',
  assignedEmployeeName: '',
  employeeId: '',
  officeLocation: '',
  purchaseDate: '',
  warrantyExpiryDate: '',
  status: 'Available',
  notes: '',
};

export const getEmptyForm = () => ({ ...emptyForm });

export const assetToForm = (asset) => ({
  category: asset.category || 'Laptops',
  brand: asset.brand || '',
  model: asset.model || '',
  serialNumber: asset.serialNumber || '',
  assignedEmployeeName: asset.assignedEmployeeName || '',
  employeeId: asset.employeeId || '',
  officeLocation: asset.officeLocation || '',
  purchaseDate: asset.purchaseDate ? asset.purchaseDate.split('T')[0] : '',
  warrantyExpiryDate: asset.warrantyExpiryDate ? asset.warrantyExpiryDate.split('T')[0] : '',
  status: asset.status || 'Available',
  notes: asset.notes || '',
});

export default function AssetForm({ form, onChange, onSubmit, loading, submitLabel, isEdit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...form, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            disabled={isEdit}
            className="input-field disabled:opacity-60"
            required
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {isEdit && (
            <p className="mt-1 text-xs text-slate-400">Category cannot be changed after creation</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Status *
          </label>
          <select name="status" value={form.status} onChange={handleChange} className="input-field" required>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Brand *
          </label>
          <input name="brand" value={form.brand} onChange={handleChange} className="input-field" required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Model *
          </label>
          <input name="model" value={form.model} onChange={handleChange} className="input-field" required />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Serial Number *
          </label>
          <input
            name="serialNumber"
            value={form.serialNumber}
            onChange={handleChange}
            className="input-field font-mono"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Assigned Employee
          </label>
          <input
            name="assignedEmployeeName"
            value={form.assignedEmployeeName}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Employee ID
          </label>
          <input name="employeeId" value={form.employeeId} onChange={handleChange} className="input-field" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Office Location *
          </label>
          <input
            name="officeLocation"
            value={form.officeLocation}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Purchase Date *
          </label>
          <input
            type="date"
            name="purchaseDate"
            value={form.purchaseDate}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Warranty Expiry *
          </label>
          <input
            type="date"
            name="warrantyExpiryDate"
            value={form.warrantyExpiryDate}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="input-field resize-none"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
