import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAssetById, updateAsset } from '../api/assets';
import { useToast } from '../context/ToastContext';
import AssetForm, { assetToForm } from '../components/forms/AssetForm';
import Loader from '../components/Loader';

export default function EditAsset() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    fetchAssetById(id)
      .then((res) => setForm(assetToForm(res.data)))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, [id, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateAsset(id, form);
      showToast(res.message || 'Asset updated successfully');
      navigate(`/assets/${id}`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <Loader fullScreen />;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="page-title">Edit Asset</h1>
        <p className="text-slate-500">Update asset information</p>
      </div>
      <div className="glass-card p-6">
        <AssetForm
          form={form}
          onChange={setForm}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Save Changes"
          isEdit
        />
      </div>
    </div>
  );
}
