import API from './axios';

export const fetchAssets = (params = {}) =>
  API.get('/assets', { params }).then((r) => r.data);

export const fetchStats = () => API.get('/assets/stats').then((r) => r.data);

export const fetchAssetById = (id) => API.get(`/assets/${id}`).then((r) => r.data);

export const fetchAssetsByCategory = (name) =>
  API.get(`/assets/category/${encodeURIComponent(name)}`).then((r) => r.data);

export const createAsset = (data) => API.post('/assets', data).then((r) => r.data);

export const updateAsset = (id, data) => API.put(`/assets/${id}`, data).then((r) => r.data);

export const deleteAsset = (id) => API.delete(`/assets/${id}`).then((r) => r.data);
