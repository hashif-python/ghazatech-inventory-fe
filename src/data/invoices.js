export const invoices = [
  { id: 'INV-2026-00412', date: '2026-02-08', dueDate: '2026-03-10', customer: 'Al Noor Computer Trading LLC', customerId: 'C-1001', branch: 'Main Branch', total: 12450.00, paid: 5000.00, balance: 7450.00, status: 'Partially Paid', salesperson: 'Ahmed Rashid' },
  { id: 'INV-2026-00411', date: '2026-02-08', dueDate: '2026-02-08', customer: 'Walk-in Customer', customerId: 'C-1005', branch: 'Dubai Branch', total: 845.00, paid: 845.00, balance: 0, status: 'Paid', salesperson: 'Sameer Ali' },
  { id: 'INV-2026-00410', date: '2026-02-07', dueDate: '2026-03-09', customer: 'Tech Zone Electronics', customerId: 'C-1002', branch: 'Dubai Branch', total: 6280.50, paid: 0, balance: 6280.50, status: 'Unpaid', salesperson: 'Sameer Ali' },
  { id: 'INV-2026-00409', date: '2026-02-06', dueDate: '2026-03-08', customer: 'Fast Laptop Repair Center', customerId: 'C-1003', branch: 'Deira Branch', total: 18760.00, paid: 0, balance: 18760.00, status: 'Unpaid', salesperson: 'Mohammed Aslam' },
  { id: 'INV-2026-00408', date: '2026-02-05', dueDate: '2026-03-07', customer: 'Al Ain IT Solutions', customerId: 'C-1004', branch: 'Abu Dhabi Branch', total: 8900.00, paid: 4000.00, balance: 4900.00, status: 'Partially Paid', salesperson: 'Nabeel Hassan' },
  { id: 'INV-2026-00407', date: '2026-02-04', dueDate: '2026-03-06', customer: 'Future Star Computers', customerId: 'C-1006', branch: 'Main Branch', total: 14580.00, paid: 14580.00, balance: 0, status: 'Paid', salesperson: 'Ahmed Rashid' },
  { id: 'INV-2026-00406', date: '2026-02-03', dueDate: '2026-02-03', customer: 'Walk-in Customer', customerId: 'C-1005', branch: 'Main Branch', total: 365.00, paid: 365.00, balance: 0, status: 'Paid', salesperson: 'Ahmed Rashid' },
  { id: 'INV-2026-00405', date: '2026-02-02', dueDate: '2026-03-04', customer: 'Bright Horizon Trading', customerId: 'C-1007', branch: 'Dubai Branch', total: 22100.00, paid: 0, balance: 22100.00, status: 'Overdue', salesperson: 'Sameer Ali' },
  { id: 'INV-2026-00404', date: '2026-02-01', dueDate: '2026-03-03', customer: 'Gulf Tech Enterprises', customerId: 'C-1008', branch: 'Abu Dhabi Branch', total: 14810.00, paid: 0, balance: 14810.00, status: 'Unpaid', salesperson: 'Nabeel Hassan' },
];

export const quotations = [
  { id: 'QT-2026-00124', date: '2026-02-08', validUntil: '2026-02-22', customer: 'Al Noor Computer Trading LLC', total: 8450.00, status: 'Sent', salesperson: 'Ahmed Rashid', branch: 'Main Branch' },
  { id: 'QT-2026-00123', date: '2026-02-07', validUntil: '2026-02-21', customer: 'Tech Zone Electronics', total: 4280.00, status: 'Approved', salesperson: 'Sameer Ali', branch: 'Dubai Branch' },
  { id: 'QT-2026-00122', date: '2026-02-06', validUntil: '2026-02-20', customer: 'Fast Laptop Repair Center', total: 12750.00, status: 'Converted to Invoice', salesperson: 'Mohammed Aslam', branch: 'Deira Branch' },
  { id: 'QT-2026-00121', date: '2026-02-05', validUntil: '2026-02-19', customer: 'Al Ain IT Solutions', total: 6900.00, status: 'Draft', salesperson: 'Nabeel Hassan', branch: 'Abu Dhabi Branch' },
  { id: 'QT-2026-00120', date: '2026-02-04', validUntil: '2026-02-18', customer: 'Future Star Computers', total: 14580.00, status: 'Rejected', salesperson: 'Ahmed Rashid', branch: 'Main Branch' },
  { id: 'QT-2026-00119', date: '2026-02-03', validUntil: '2026-02-17', customer: 'Bright Horizon Trading', total: 9320.00, status: 'Expired', salesperson: 'Sameer Ali', branch: 'Dubai Branch' },
  { id: 'QT-2026-00118', date: '2026-02-02', validUntil: '2026-02-16', customer: 'Gulf Tech Enterprises', total: 22400.00, status: 'Sent', salesperson: 'Nabeel Hassan', branch: 'Abu Dhabi Branch' },
];

export const creditNotes = [
  { id: 'CN-2026-0014', date: '2026-02-07', invoiceRef: 'INV-2026-00405', customer: 'Bright Horizon Trading', reason: 'Damaged product', amount: 1240.00, status: 'Issued' },
  { id: 'CN-2026-0013', date: '2026-02-04', invoiceRef: 'INV-2026-00398', customer: 'Tech Zone Electronics', reason: 'Wrong item delivered', amount: 580.00, status: 'Approved' },
  { id: 'CN-2026-0012', date: '2026-02-01', invoiceRef: 'INV-2026-00382', customer: 'Al Noor Computer Trading LLC', reason: 'Return accepted', amount: 2150.00, status: 'Issued' },
  { id: 'CN-2026-0011', date: '2026-01-28', invoiceRef: 'INV-2026-00367', customer: 'Fast Laptop Repair Center', reason: 'Pricing correction', amount: 320.00, status: 'Approved' },
];
