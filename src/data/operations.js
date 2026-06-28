export const purchaseOrders = [
  { id: 'PO-2026-0042', date: '2026-02-08', supplier: 'Shenzhen Laptop Parts Co.', expectedDelivery: '2026-02-25', total: 48600.00, status: 'Sent', payStatus: 'Unpaid', branch: 'Main Branch' },
  { id: 'PO-2026-0041', date: '2026-02-07', supplier: 'Dubai Computer Parts Trading', expectedDelivery: '2026-02-12', total: 14800.00, status: 'Partially Received', payStatus: 'Partially Paid', branch: 'Dubai Branch' },
  { id: 'PO-2026-0040', date: '2026-02-05', supplier: 'Laptop World Wholesale LLC', expectedDelivery: '2026-02-10', total: 8950.00, status: 'Received', payStatus: 'Paid', branch: 'Main Branch' },
  { id: 'PO-2026-0039', date: '2026-02-03', supplier: 'TechSource Electronics', expectedDelivery: '2026-02-09', total: 16700.00, status: 'Received', payStatus: 'Paid', branch: 'Main Branch' },
  { id: 'PO-2026-0038', date: '2026-02-01', supplier: 'Guangzhou Spare Parts Supplier', expectedDelivery: '2026-02-28', total: 32450.00, status: 'Sent', payStatus: 'Unpaid', branch: 'Main Branch' },
  { id: 'PO-2026-0037', date: '2026-01-30', supplier: 'PrimeTech Manufacturers', expectedDelivery: '2026-02-15', total: 18400.00, status: 'Draft', payStatus: 'Unpaid', branch: 'Dubai Branch' },
];

export const supplierBills = [
  { id: 'BILL-2026-0028', supplier: 'Shenzhen Laptop Parts Co.', date: '2026-02-08', dueDate: '2026-03-10', amount: 48600.00, paid: 0, balance: 48600.00, status: 'Unpaid' },
  { id: 'BILL-2026-0027', supplier: 'Dubai Computer Parts Trading', date: '2026-02-07', dueDate: '2026-02-22', amount: 14800.00, paid: 5000.00, balance: 9800.00, status: 'Partially Paid' },
  { id: 'BILL-2026-0026', supplier: 'TechSource Electronics', date: '2026-02-03', dueDate: '2026-02-18', amount: 16700.00, paid: 16700.00, balance: 0, status: 'Paid' },
  { id: 'BILL-2026-0025', supplier: 'Guangzhou Spare Parts Supplier', date: '2026-02-01', dueDate: '2026-03-03', amount: 32450.00, paid: 0, balance: 32450.00, status: 'Unpaid' },
];

export const transfers = [
  { id: 'TRF-2026-0018', date: '2026-02-08', from: 'Main Branch', to: 'Dubai Branch', requestedBy: 'Mohammed Aslam', items: 12, total: 6840.00, status: 'In Transit' },
  { id: 'TRF-2026-0017', date: '2026-02-07', from: 'Main Branch', to: 'Abu Dhabi Branch', requestedBy: 'Nabeel Hassan', items: 8, total: 3450.00, status: 'Received' },
  { id: 'TRF-2026-0016', date: '2026-02-06', from: 'Dubai Branch', to: 'Deira Branch', requestedBy: 'Sameer Ali', items: 5, total: 2180.00, status: 'Dispatched' },
  { id: 'TRF-2026-0015', date: '2026-02-05', from: 'Main Branch', to: 'Ajman Branch', requestedBy: 'Ahmed Rashid', items: 14, total: 8940.00, status: 'Approved' },
  { id: 'TRF-2026-0014', date: '2026-02-04', from: 'Abu Dhabi Branch', to: 'Main Branch', requestedBy: 'Nabeel Hassan', items: 3, total: 1240.00, status: 'Requested' },
  { id: 'TRF-2026-0013', date: '2026-02-02', from: 'Dubai Branch', to: 'Main Branch', requestedBy: 'Sameer Ali', items: 7, total: 4180.00, status: 'Draft' },
];

export const shipments = [
  { id: 'SHP-2026-0098', invoiceRef: 'INV-2026-00410', customer: 'Tech Zone Electronics', address: 'Al Karama, Dubai', deliveryPerson: 'Aslam Khan', deliveryDate: '2026-02-09', tracking: 'GZ8847-DXB', status: 'Out for Delivery' },
  { id: 'SHP-2026-0097', invoiceRef: 'INV-2026-00409', customer: 'Fast Laptop Repair Center', address: 'Deira, Dubai', deliveryPerson: 'Rashid Ali', deliveryDate: '2026-02-08', tracking: 'GZ8846-DEI', status: 'Delivered' },
  { id: 'SHP-2026-0096', invoiceRef: 'INV-2026-00408', customer: 'Al Ain IT Solutions', address: 'Sanaiya, Al Ain', deliveryPerson: 'Hamza Iqbal', deliveryDate: '2026-02-08', tracking: 'GZ8845-AUH', status: 'Packed' },
  { id: 'SHP-2026-0095', invoiceRef: 'INV-2026-00407', customer: 'Future Star Computers', address: 'Ajman China Mall Area', deliveryPerson: 'Aslam Khan', deliveryDate: '2026-02-07', tracking: 'GZ8844-AJM', status: 'Delivered' },
  { id: 'SHP-2026-0094', invoiceRef: 'INV-2026-00405', customer: 'Bright Horizon Trading', address: 'Rolla, Sharjah', deliveryPerson: 'Rashid Ali', deliveryDate: '2026-02-09', tracking: 'GZ8843-SHJ', status: 'Pending' },
];

export const expenses = [
  { id: 'EXP-0145', date: '2026-02-08', category: 'Shop Rent', amount: 18000, paymentMethod: 'Bank Transfer', vendor: 'Sharjah Properties LLC', branch: 'Main Branch', notes: 'February rent' },
  { id: 'EXP-0144', date: '2026-02-07', category: 'Electricity', amount: 2450, paymentMethod: 'Bank Transfer', vendor: 'SEWA', branch: 'Main Branch', notes: 'Jan electricity bill' },
  { id: 'EXP-0143', date: '2026-02-06', category: 'Internet', amount: 580, paymentMethod: 'Credit Card', vendor: 'Etisalat', branch: 'Dubai Branch', notes: 'Monthly fiber' },
  { id: 'EXP-0142', date: '2026-02-05', category: 'Transportation', amount: 850, paymentMethod: 'Cash', vendor: 'Local transport', branch: 'Main Branch', notes: 'Delivery fuel' },
  { id: 'EXP-0141', date: '2026-02-04', category: 'Office Supplies', amount: 320, paymentMethod: 'Cash', vendor: 'Office Land', branch: 'Main Branch', notes: 'Stationery' },
  { id: 'EXP-0140', date: '2026-02-03', category: 'Marketing', amount: 1200, paymentMethod: 'Card', vendor: 'Google Ads', branch: 'Main Branch', notes: 'Ad spend' },
  { id: 'EXP-0139', date: '2026-02-02', category: 'Repair Charges', amount: 650, paymentMethod: 'Cash', vendor: 'AC Repair Services', branch: 'Deira Branch', notes: 'AC servicing' },
];

export const paymentsReceived = [
  { id: 'RCT-2026-0089', date: '2026-02-08', customer: 'Al Noor Computer Trading LLC', invoiceRef: 'INV-2026-00412', method: 'Bank Transfer', amount: 5000, reference: 'TXN-998877', status: 'Cleared' },
  { id: 'RCT-2026-0088', date: '2026-02-08', customer: 'Walk-in Customer', invoiceRef: 'INV-2026-00411', method: 'Cash', amount: 845, reference: '-', status: 'Received' },
  { id: 'RCT-2026-0087', date: '2026-02-07', customer: 'Future Star Computers', invoiceRef: 'INV-2026-00407', method: 'Card', amount: 14580, reference: 'POS-44512', status: 'Cleared' },
  { id: 'RCT-2026-0086', date: '2026-02-05', customer: 'Al Ain IT Solutions', invoiceRef: 'INV-2026-00408', method: 'Bank Transfer', amount: 4000, reference: 'TXN-998866', status: 'Cleared' },
];

export const paymentsMade = [
  { id: 'PMT-2026-0067', date: '2026-02-07', supplier: 'Dubai Computer Parts Trading', billRef: 'BILL-2026-0027', method: 'Bank Transfer', amount: 5000, notes: 'Partial payment' },
  { id: 'PMT-2026-0066', date: '2026-02-03', supplier: 'TechSource Electronics', billRef: 'BILL-2026-0026', method: 'Bank Transfer', amount: 16700, notes: 'Full settlement' },
  { id: 'PMT-2026-0065', date: '2026-01-30', supplier: 'Laptop World Wholesale LLC', billRef: 'BILL-2026-0024', method: 'Card', amount: 8950, notes: 'Card payment' },
];

export const stockMovements = [
  { id: 'MOV-001', date: '2026-02-08', product: 'Dell Latitude 5400 Keyboard', type: 'Sale completed', qty: -2, balance: 24, branch: 'Main Branch', ref: 'INV-2026-00412' },
  { id: 'MOV-002', date: '2026-02-08', product: 'HP EliteBook 840 G5 Screen', type: 'Purchase received', qty: 10, balance: 8, branch: 'Dubai Branch', ref: 'PO-2026-0041' },
  { id: 'MOV-003', date: '2026-02-07', product: 'DDR4 16GB Laptop RAM', type: 'Stock transfer sent', qty: -5, balance: 68, branch: 'Main Branch', ref: 'TRF-2026-0018' },
  { id: 'MOV-004', date: '2026-02-06', product: 'Samsung 512GB NVMe SSD', type: 'Sale completed', qty: -3, balance: 52, branch: 'Main Branch', ref: 'INV-2026-00410' },
  { id: 'MOV-005', date: '2026-02-05', product: 'Asus X515 Charger 65W', type: 'Customer return', qty: 1, balance: 45, branch: 'Deira Branch', ref: 'CN-2026-0013' },
  { id: 'MOV-006', date: '2026-02-04', product: 'Lenovo ThinkPad T480 Battery', type: 'Manual stock adjustment', qty: -1, balance: 32, branch: 'Main Branch', ref: 'ADJ-0021' },
];

export const notifications = [
  { id: 'N-1', type: 'urgent', icon: 'AlertTriangle', title: 'Visa expiring in 7 days', body: 'Sameer Ali visa expires on Feb 15, 2026', module: 'HRMS', time: '10 min ago', unread: true },
  { id: 'N-2', type: 'warning', icon: 'PackageX', title: 'Low stock alert', body: 'MacBook Air M1 Screen below reorder level (3/4)', module: 'Inventory', time: '32 min ago', unread: true },
  { id: 'N-3', type: 'warning', icon: 'Calendar', title: 'Emirates ID expiring', body: 'Ayesha Rahman Emirates ID expires in 28 days', module: 'HRMS', time: '1 hr ago', unread: true },
  { id: 'N-4', type: 'info', icon: 'FileText', title: 'New quotation request', body: 'Al Noor Computer Trading requested quote QT-2026-00124', module: 'Sales', time: '2 hrs ago', unread: true },
  { id: 'N-5', type: 'urgent', icon: 'Clock', title: 'Invoice overdue', body: 'INV-2026-00405 from Bright Horizon overdue by 5 days', module: 'Finance', time: '3 hrs ago', unread: true },
  { id: 'N-6', type: 'success', icon: 'CheckCircle', title: 'Payment received', body: 'AED 5,000 received from Al Noor Computer Trading', module: 'Finance', time: '5 hrs ago', unread: false },
  { id: 'N-7', type: 'info', icon: 'TruckIcon', title: 'Stock transfer received', body: 'TRF-2026-0017 received at Abu Dhabi Branch', module: 'Transfers', time: '6 hrs ago', unread: false },
  { id: 'N-8', type: 'warning', icon: 'UserCheck', title: 'Leave approval pending', body: 'Sameer Ali requested 3 days annual leave', module: 'HRMS', time: '8 hrs ago', unread: false },
];

export const auditLogs = [
  { id: 'L-001', timestamp: '2026-02-08 14:32', user: 'Ahmed Rashid', module: 'Sales', action: 'Create', description: 'Created invoice INV-2026-00412', ip: '192.168.1.45', branch: 'Main Branch' },
  { id: 'L-002', timestamp: '2026-02-08 14:18', user: 'Mohammed Aslam', module: 'Inventory', action: 'Update', description: 'Adjusted stock for Dell 5400 Keyboard', ip: '192.168.1.62', branch: 'Dubai Branch' },
  { id: 'L-003', timestamp: '2026-02-08 13:55', user: 'Fathima Noor', module: 'Finance', action: 'Create', description: 'Recorded payment RCT-2026-0089 from Al Noor', ip: '192.168.1.45', branch: 'Main Branch' },
  { id: 'L-004', timestamp: '2026-02-08 12:40', user: 'Riyas Kareem', module: 'Purchase', action: 'Create', description: 'Sent PO-2026-0042 to Shenzhen Laptop Parts', ip: '192.168.1.45', branch: 'Main Branch' },
  { id: 'L-005', timestamp: '2026-02-08 11:22', user: 'Ayesha Rahman', module: 'HRMS', action: 'Update', description: 'Updated employee Sameer Ali visa details', ip: '192.168.1.78', branch: 'Deira Branch' },
  { id: 'L-006', timestamp: '2026-02-08 10:48', user: 'Sameer Ali', module: 'Sales', action: 'Create', description: 'Added walk-in sale INV-2026-00411', ip: '192.168.1.62', branch: 'Dubai Branch' },
  { id: 'L-007', timestamp: '2026-02-08 09:30', user: 'Ahmed Rashid', module: 'Settings', action: 'Update', description: 'Updated VAT rate from 5% to 5%', ip: '192.168.1.45', branch: 'Main Branch' },
];

export const users = [
  { id: 'U-001', name: 'Ahmed Rashid', email: 'ahmed@ghazacomputer.ae', role: 'Super Admin', branch: 'All Branches', status: 'Active', lastLogin: '2026-02-08 14:32' },
  { id: 'U-002', name: 'Mohammed Aslam', email: 'aslam@ghazacomputer.ae', role: 'Inventory Manager', branch: 'Dubai Branch', status: 'Active', lastLogin: '2026-02-08 14:18' },
  { id: 'U-003', name: 'Fathima Noor', email: 'fathima@ghazacomputer.ae', role: 'Accountant', branch: 'Main Branch', status: 'Active', lastLogin: '2026-02-08 13:55' },
  { id: 'U-004', name: 'Sameer Ali', email: 'sameer@ghazacomputer.ae', role: 'Sales Executive', branch: 'Dubai Branch', status: 'Active', lastLogin: '2026-02-08 10:48' },
  { id: 'U-005', name: 'Riyas Kareem', email: 'riyas@ghazacomputer.ae', role: 'Purchase Manager', branch: 'Main Branch', status: 'Active', lastLogin: '2026-02-08 12:40' },
  { id: 'U-006', name: 'Ayesha Rahman', email: 'ayesha@ghazacomputer.ae', role: 'HR Manager', branch: 'Deira Branch', status: 'Active', lastLogin: '2026-02-08 11:22' },
  { id: 'U-007', name: 'Nabeel Hassan', email: 'nabeel@ghazacomputer.ae', role: 'Sales Executive', branch: 'Abu Dhabi Branch', status: 'Inactive', lastLogin: '2026-02-05 16:40' },
];

export const roles = [
  'Super Admin', 'Branch Manager', 'Sales Manager', 'Sales Executive', 'Inventory Manager',
  'Purchase Manager', 'Accountant', 'HR Manager', 'HR Executive', 'Warehouse Staff', 'Viewer'
];

export const attendance = [
  { employee: 'Ahmed Rashid', empId: 'EMP-001', dept: 'Sales', checkIn: '08:55', checkOut: '18:10', hours: 9.25, late: false, ot: 0.25, status: 'Present' },
  { employee: 'Mohammed Aslam', empId: 'EMP-002', dept: 'Inventory', checkIn: '09:12', checkOut: '18:05', hours: 8.88, late: true, ot: 0, status: 'Late' },
  { employee: 'Fathima Noor', empId: 'EMP-003', dept: 'Finance', checkIn: '08:48', checkOut: '17:55', hours: 9.12, late: false, ot: 0, status: 'Present' },
  { employee: 'Sameer Ali', empId: 'EMP-004', dept: 'Sales', checkIn: '-', checkOut: '-', hours: 0, late: false, ot: 0, status: 'On Leave' },
  { employee: 'Riyas Kareem', empId: 'EMP-005', dept: 'Purchase', checkIn: '08:50', checkOut: '18:00', hours: 9.17, late: false, ot: 0, status: 'Present' },
  { employee: 'Ayesha Rahman', empId: 'EMP-006', dept: 'HR', checkIn: '09:00', checkOut: '14:00', hours: 5.0, late: false, ot: 0, status: 'Half Day' },
  { employee: 'Nabeel Hassan', empId: 'EMP-007', dept: 'Sales', checkIn: '-', checkOut: '-', hours: 0, late: false, ot: 0, status: 'On Leave' },
];

export const leaveRequests = [
  { id: 'LV-0034', employee: 'Sameer Ali', empId: 'EMP-004', type: 'Annual Leave', start: '2026-02-08', end: '2026-02-12', days: 5, reason: 'Family event', status: 'Approved' },
  { id: 'LV-0033', employee: 'Nabeel Hassan', empId: 'EMP-007', type: 'Sick Leave', start: '2026-02-07', end: '2026-02-10', days: 4, reason: 'Medical', status: 'Approved' },
  { id: 'LV-0032', employee: 'Ayesha Rahman', empId: 'EMP-006', type: 'Annual Leave', start: '2026-02-20', end: '2026-02-22', days: 3, reason: 'Personal', status: 'Pending' },
  { id: 'LV-0031', employee: 'Mohammed Aslam', empId: 'EMP-002', type: 'Emergency Leave', start: '2026-02-15', end: '2026-02-15', days: 1, reason: 'Family emergency', status: 'Pending' },
];

export const payroll = [
  { id: 'PR-2026-02-001', month: 'Feb 2026', employee: 'Ahmed Rashid', basic: 12000, allowances: 3500, deductions: 0, overtime: 250, net: 15750, status: 'Pending' },
  { id: 'PR-2026-02-002', month: 'Feb 2026', employee: 'Mohammed Aslam', basic: 7500, allowances: 2000, deductions: 100, overtime: 0, net: 9400, status: 'Pending' },
  { id: 'PR-2026-02-003', month: 'Feb 2026', employee: 'Fathima Noor', basic: 6500, allowances: 1800, deductions: 0, overtime: 0, net: 8300, status: 'Pending' },
  { id: 'PR-2026-02-004', month: 'Feb 2026', employee: 'Sameer Ali', basic: 4500, allowances: 1200, deductions: 200, overtime: 0, net: 5500, status: 'Pending' },
  { id: 'PR-2026-01-005', month: 'Jan 2026', employee: 'Riyas Kareem', basic: 9500, allowances: 2500, deductions: 0, overtime: 320, net: 12320, status: 'Paid' },
  { id: 'PR-2026-01-006', month: 'Jan 2026', employee: 'Ayesha Rahman', basic: 5500, allowances: 1500, deductions: 0, overtime: 0, net: 7000, status: 'Paid' },
];
