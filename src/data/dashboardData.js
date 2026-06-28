export const kpis = {
  stockValue: 1245780.50,
  salesThisMonth: 354600.00,
  purchasesThisMonth: 211450.00,
  receivables: 96800.00,
  payables: 78250.00,
  expenses: 24550.00,
  lowStock: 18,
  pendingQuotations: 12,
};

export const monthlySalesPurchases = [
  { month: 'Sep', sales: 245000, purchases: 178000 },
  { month: 'Oct', sales: 312000, purchases: 205000 },
  { month: 'Nov', sales: 287000, purchases: 192000 },
  { month: 'Dec', sales: 398000, purchases: 224000 },
  { month: 'Jan', sales: 342000, purchases: 198000 },
  { month: 'Feb', sales: 354600, purchases: 211450 },
];

export const stockByBranch = [
  { name: 'Main – Sharjah', value: 524800 },
  { name: 'Dubai', value: 312400 },
  { name: 'Deira', value: 178600 },
  { name: 'Abu Dhabi', value: 142200 },
  { name: 'Ajman', value: 87780 },
];

export const topSelling = [
  { name: 'DDR4 16GB RAM', qty: 142 },
  { name: 'Samsung 512GB SSD', qty: 118 },
  { name: 'Dell 5400 Keyboard', qty: 96 },
  { name: 'HP 840 G5 Battery', qty: 84 },
  { name: 'Asus X515 Charger', qty: 72 },
  { name: 'Lenovo T480 Battery', qty: 65 },
];

export const salesByCategory = [
  { category: 'Screens', value: 124000 },
  { category: 'Batteries', value: 86000 },
  { category: 'Keyboards', value: 42000 },
  { category: 'SSD/HDD', value: 38000 },
  { category: 'Chargers', value: 32000 },
  { category: 'RAM', value: 22000 },
  { category: 'Others', value: 10600 },
];

export const recentActivities = [
  { id: 1, user: 'Ahmed Rashid', action: 'created invoice', target: 'INV-2026-00412', time: '5 minutes ago', module: 'Sales' },
  { id: 2, user: 'Mohammed Aslam', action: 'adjusted stock for', target: 'Dell 5400 Keyboard', time: '22 minutes ago', module: 'Inventory' },
  { id: 3, user: 'Fathima Noor', action: 'recorded payment from', target: 'Al Noor Computer Trading', time: '1 hour ago', module: 'Finance' },
  { id: 4, user: 'Riyas Kareem', action: 'sent purchase order to', target: 'Shenzhen Laptop Parts', time: '2 hours ago', module: 'Purchase' },
  { id: 5, user: 'Ayesha Rahman', action: 'approved leave request for', target: 'Sameer Ali', time: '3 hours ago', module: 'HRMS' },
];
