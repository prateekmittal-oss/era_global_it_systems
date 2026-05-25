import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiPlus, FiDownload } from 'react-icons/fi';
import { fetchAssetsByCategory } from '../api/assets';
import { useToast } from '../context/ToastContext';
import { CATEGORY_SLUG_MAP } from '../constants';
import AssetTable from '../components/AssetTable';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { exportToCSV } from '../utils/exportCsv';

export default function CategoryPage() {
  const { slug } = useParams();
  const categoryName = CATEGORY_SLUG_MAP[slug];
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    if (!categoryName) return;
    setLoading(true);
    fetchAssetsByCategory(categoryName)
      .then((res) => setAssets(res.data))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, [categoryName, showToast]);

  if (!categoryName) {
    return <EmptyState title="Invalid category" description="The category you requested does not exist." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">{categoryName}</h1>
          <p className="text-slate-500">{assets.length} assets in this category</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              exportToCSV(assets, `${slug}-assets.csv`);
              showToast('CSV exported');
            }}
            className="btn-secondary"
            disabled={!assets.length}
          >
            <FiDownload /> Export
          </button>
          <Link to="/assets/add" className="btn-primary">
            <FiPlus /> Add Asset
          </Link>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : assets.length === 0 ? (
        <EmptyState
          title={`No ${categoryName} yet`}
          actionLabel="Add Asset"
          actionTo="/assets/add"
        />
      ) : (
        <AssetTable assets={assets} />
      )}
    </div>
  );
}
