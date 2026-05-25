import express from 'express';
import {
  getAssets,
  getStats,
  getAssetsByCategory,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} from '../controllers/assetController.js';

const router = express.Router();

// Stats must be before /:id to avoid route conflict
router.get('/stats', getStats);
router.get('/category/:name', getAssetsByCategory);

router.route('/').get(getAssets).post(createAsset);

router.route('/:id').get(getAssetById).put(updateAsset).delete(deleteAsset);

export default router;
