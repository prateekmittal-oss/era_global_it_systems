/**
 * Export assets array to CSV and trigger download
 */
export const exportToCSV = (assets, filename = 'era-it-assets.csv') => {
  if (!assets?.length) return;

  const headers = [
    'Asset ID',
    'Category',
    'Brand',
    'Model',
    'Serial Number',
    'Employee Name',
    'Employee ID',
    'Office Location',
    'Purchase Date',
    'Warranty Expiry',
    'Status',
    'Notes',
    'Created Date',
  ];

  const rows = assets.map((a) => [
    a.assetId,
    a.category,
    a.brand,
    a.model,
    a.serialNumber,
    a.assignedEmployeeName || '',
    a.employeeId || '',
    a.officeLocation,
    a.purchaseDate ? new Date(a.purchaseDate).toLocaleDateString() : '',
    a.warrantyExpiryDate ? new Date(a.warrantyExpiryDate).toLocaleDateString() : '',
    a.status,
    (a.notes || '').replace(/"/g, '""'),
    a.createdAt ? new Date(a.createdAt).toLocaleDateString() : '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};
