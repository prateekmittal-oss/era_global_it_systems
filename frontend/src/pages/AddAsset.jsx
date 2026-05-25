import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAsset } from '../api/assets';
import { useToast } from '../context/ToastContext';
import AssetForm, { getEmptyForm } from '../components/forms/AssetForm';

export default function AddAsset() {
  const [form, setForm] = useState(getEmptyForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createAsset(form);
      showToast(res.message || 'Asset created successfully');
      navigate(`/assets/${res.data._id}`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="page-title">Add New Asset</h1>
        <p className="text-slate-500">Asset ID will be auto-generated based on category</p>
      </div>
      <div className="glass-card p-6">
        <AssetForm
          form={form}
          onChange={setForm}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Create Asset"
        />
      </div>
    </div>
  );
}
