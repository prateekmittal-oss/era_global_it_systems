import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiDownload, FiPlus } from 'react-icons/fi';
import { fetchAssets, deleteAsset } from '../api/assets';
import { useToast } from '../context/ToastContext';
import AssetTable from '../components/AssetTable';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';
import { exportToCSV } from '../utils/exportCsv';

export default function AllAssets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useToast();

  const [assets, setAssets] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const loadAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAssets({ search, category, status, page, limit: 10 });
      setAssets(res.data);
      setPagination(res.pagination);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [search, category, status, page, showToast]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    if (!updates.page) params.set('page', '1');
    setSearchParams(params);
  };

  const handleExport = async () => {
    try {
      const res = await fetchAssets({ search, category, status, limit: 1000 });
      exportToCSV(res.data);
      showToast('CSV exported successfully');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAsset(deleteTarget._id);
      showToast('Asset deleted successfully');
      setDeleteTarget(null);
      loadAssets();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">All Assets</h1>
          <p className="text-slate-500">Manage and search all company IT assets</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="btn-secondary">
            <FiDownload /> Export CSV
          </button>
          <Link to="/assets/add" className="btn-primary">
            <FiPlus /> Add Asset
          </Link>
        </div>
      </div>

      <div className="glass-card p-4">
        <SearchFilter
          search={search}
          onSearchChange={(v) => updateParams({ search: v, page: '1' })}
          category={category}
          onCategoryChange={(v) => updateParams({ category: v, page: '1' })}
          status={status}
          onStatusChange={(v) => updateParams({ status: v, page: '1' })}
        />
      </div>

      {loading ? (
        <Loader />
      ) : assets.length === 0 ? (
        <EmptyState
          title="No assets found"
          description="Try adjusting your search or filters, or add a new asset."
          actionLabel="Add Asset"
          actionTo="/assets/add"
        />
      ) : (
        <>
          <AssetTable assets={assets} onDelete={setDeleteTarget} />
          <Pagination
            page={pagination.page}
            pages={pagination.pages}
            total={pagination.total}
            onPageChange={(p) => updateParams({ page: String(p) })}
          />
        </>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Delete asset ${deleteTarget?.assetId}? This cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
