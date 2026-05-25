import Asset, { CATEGORY_PREFIX, CATEGORIES } from '../models/Asset.js';

/**
 * Generate next unique asset ID for a category (e.g. LAP-0001)
 */
const generateAssetId = async (category) => {
  const prefix = CATEGORY_PREFIX[category];
  if (!prefix) {
    throw new Error('Invalid category for asset ID generation');
  }

  const regex = new RegExp(`^${prefix}-(\\d+)$`);
  const assets = await Asset.find({ category }).select('assetId').lean();

  let maxNum = 0;
  for (const asset of assets) {
    const match = asset.assetId?.match(regex);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  }

  const nextNum = String(maxNum + 1).padStart(4, '0');
  return `${prefix}-${nextNum}`;
};

/**
 * GET /api/assets - List all assets with optional search, filter, pagination
 */
export const getAssets = async (req, res) => {
  try {
    const {
      search = '',
      category = '',
      status = '',
      page = 1,
      limit = 10,
      sort = '-createdAt',
    } = req.query;

    const query = {};

    if (category && CATEGORIES.includes(category)) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      query.$or = [
        { assetId: searchRegex },
        { brand: searchRegex },
        { model: searchRegex },
        { serialNumber: searchRegex },
        { assignedEmployeeName: searchRegex },
        { employeeId: searchRegex },
        { officeLocation: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const [assets, total] = await Promise.all([
      Asset.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
      Asset.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: assets,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/assets/stats - Dashboard statistics
 */
export const getStats = async (req, res) => {
  try {
    const [
      totalAssets,
      laptops,
      desktops,
      printers,
      inRepair,
      available,
      byStatus,
      byCategory,
      recentAssets,
    ] = await Promise.all([
      Asset.countDocuments(),
      Asset.countDocuments({ category: 'Laptops' }),
      Asset.countDocuments({ category: 'Desktops' }),
      Asset.countDocuments({ category: 'Printers' }),
      Asset.countDocuments({ status: 'In Repair' }),
      Asset.countDocuments({ status: 'Available' }),
      Asset.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Asset.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
      Asset.find().sort({ createdAt: -1 }).limit(8).lean(),
    ]);

    res.json({
      success: true,
      data: {
        totalAssets,
        laptops,
        desktops,
        printers,
        inRepair,
        available,
        byStatus: byStatus.map((s) => ({ status: s._id, count: s.count })),
        byCategory: byCategory.map((c) => ({ category: c._id, count: c.count })),
        recentAssets,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/assets/category/:name
 */
export const getAssetsByCategory = async (req, res) => {
  try {
    const categoryName = decodeURIComponent(req.params.name);

    if (!CATEGORIES.includes(categoryName)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const assets = await Asset.find({ category: categoryName }).sort('-createdAt').lean();

    res.json({ success: true, data: assets, count: assets.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/assets/:id - Single asset by MongoDB _id or assetId
 */
export const getAssetById = async (req, res) => {
  try {
    const { id } = req.params;

    let asset = await Asset.findById(id).lean();
    if (!asset) {
      asset = await Asset.findOne({ assetId: id.toUpperCase() }).lean();
    }

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.json({ success: true, data: asset });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/assets
 */
export const createAsset = async (req, res) => {
  try {
    const { category, ...rest } = req.body;

    if (!category || !CATEGORIES.includes(category)) {
      return res.status(400).json({ success: false, message: 'Valid category is required' });
    }

    const assetId = await generateAssetId(category);

    const asset = await Asset.create({
      assetId,
      category,
      ...rest,
    });

    res.status(201).json({ success: true, data: asset, message: 'Asset created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Serial number or asset ID already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUT /api/assets/:id
 */
export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // assetId and category should not change on update (ID is tied to category)
    delete updates.assetId;
    delete updates.category;

    const asset = await Asset.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.json({ success: true, data: asset, message: 'Asset updated successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /api/assets/:id
 */
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    res.json({ success: true, message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
