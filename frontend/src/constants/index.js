export const CATEGORIES = [
  'Laptops',
  'Desktops',
  'LEDs',
  'Printers',
  'WiFi Devices',
  'Cables',
];

export const STATUSES = ['Active', 'In Repair', 'Available', 'Scrap'];

export const CATEGORY_ROUTES = {
  Laptops: '/category/laptops',
  Desktops: '/category/desktops',
  LEDs: '/category/leds',
  Printers: '/category/printers',
  'WiFi Devices': '/category/wifi-devices',
  Cables: '/category/cables',
};

export const CATEGORY_SLUG_MAP = {
  laptops: 'Laptops',
  desktops: 'Desktops',
  leds: 'LEDs',
  printers: 'Printers',
  'wifi-devices': 'WiFi Devices',
  cables: 'Cables',
};

export const STATUS_COLORS = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'In Repair': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Available: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Scrap: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};
