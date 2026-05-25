import mongoose from 'mongoose';

export const CATEGORIES = [
  'Laptops',
  'Desktops',
  'LEDs',
  'Printers',
  'WiFi Devices',
  'Cables',
];

export const STATUSES = ['Active', 'In Repair', 'Available', 'Scrap'];

/** Category slug → asset ID prefix */
export const CATEGORY_PREFIX = {
  Laptops: 'LAP',
  Desktops: 'DESK',
  LEDs: 'LED',
  Printers: 'PRN',
  'WiFi Devices': 'WIFI',
  Cables: 'CBL',
};

const assetSchema = new mongoose.Schema(
  {
    assetId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: CATEGORIES,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    serialNumber: {
      type: String,
      required: [true, 'Serial number is required'],
      trim: true,
      unique: true,
    },
    assignedEmployeeName: {
      type: String,
      default: '',
      trim: true,
    },
    employeeId: {
      type: String,
      default: '',
      trim: true,
    },
    officeLocation: {
      type: String,
      required: [true, 'Office location is required'],
      trim: true,
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Purchase date is required'],
    },
    warrantyExpiryDate: {
      type: Date,
      required: [true, 'Warranty expiry date is required'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: STATUSES,
      default: 'Available',
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

assetSchema.index({ category: 1 });
assetSchema.index({ status: 1 });
assetSchema.index({ assetId: 1 });

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
