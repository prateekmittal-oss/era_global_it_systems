import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { fetchAssetById, deleteAsset } from '../api/assets';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import { STATUS_COLORS } from '../constants';
import { formatDate } from '../utils/formatDate';

export default function AssetDetails() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    fetchAssetById(id)
      .then((res) => setAsset(res.data))
      .catch((err) => {
        showToast(err.message, 'error');
        navigate('/assets');
      })
      .finally(() => setLoading(false));
  }, [id, navigate, showToast]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteAsset(id);
      showToast('Asset deleted successfully');
      navigate('/assets');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loader fullScreen />;
  if (!asset) return null;

  const fields = [
    { label: 'Asset ID', value: asset.assetId },
    { label: 'Category', value: asset.category },
    { label: 'Brand', value: asset.brand },
    { label: 'Model', value: asset.model },
    { label: 'Serial Number', value: asset.serialNumber },
    { label: 'Assigned Employee', value: asset.assignedEmployeeName || '—' },
    { label: 'Employee ID', value: asset.employeeId || '—' },
    { label: 'Office Location', value: asset.officeLocation },
    { label: 'Purchase Date', value: formatDate(asset.purchaseDate) },
    { label: 'Warranty Expiry', value: formatDate(asset.warrantyExpiryDate) },
    { label: 'Created Date', value: formatDate(asset.createdAt) },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/assets" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600">
          <FiArrowLeft /> Back to assets
        </Link>
        <div className="flex gap-2">
          <Link to={`/assets/edit/${id}`} className="btn-secondary">
            <FiEdit2 /> Edit
          </Link>
          <button onClick={() => setShowDelete(true)} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
            <FiTrash2 className="inline mr-1" /> Delete
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="font-mono text-sm font-semibold text-primary-600">{asset.assetId}</span>
            <h1 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
              {asset.brand} {asset.model}
            </h1>
            <p className="text-slate-500">{asset.category}</p>
          </div>
          <span className={`rounded-xl px-4 py-2 text-sm font-semibold ${STATUS_COLORS[asset.status]}`}>
            {asset.status}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.label} className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{f.label}</p>
              <p className="mt-1 font-medium text-slate-800 dark:text-white">{f.value}</p>
            </div>
          ))}
        </div>

        {asset.notes && (
          <div className="mt-4 rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Notes</p>
            <p className="mt-1 text-slate-700 dark:text-slate-300">{asset.notes}</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Delete ${asset.assetId}? This cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
