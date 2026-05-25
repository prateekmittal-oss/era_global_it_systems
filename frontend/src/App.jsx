import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AllAssets from './pages/AllAssets';
import AddAsset from './pages/AddAsset';
import EditAsset from './pages/EditAsset';
import AssetDetails from './pages/AssetDetails';
import CategoryPage from './pages/CategoryPage';
import Reports from './pages/Reports';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="assets" element={<AllAssets />} />
        <Route path="assets/add" element={<AddAsset />} />
        <Route path="assets/edit/:id" element={<EditAsset />} />
        <Route path="assets/:id" element={<AssetDetails />} />
        <Route path="category/:slug" element={<CategoryPage />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
