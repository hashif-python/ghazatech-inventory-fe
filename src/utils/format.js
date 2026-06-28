export const formatAED = (amount, opts = {}) => {
  const { showSymbol = true, decimals = 2 } = opts;
  const n = Number(amount) || 0;
  const formatted = n.toLocaleString('en-AE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return showSymbol ? `AED ${formatted}` : formatted;
};

export const formatNumber = (n) => Number(n || 0).toLocaleString('en-AE');

export const formatDate = (date) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
};

export const daysUntil = (date) => {
  if (!date) return 0;
  const target = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const diff = Math.floor((target - today) / (1000 * 60 * 60 * 24));
  return diff;
};

export const expiryLevel = (date) => {
  const days = daysUntil(date);
  if (days < 0) return { level: 'expired', label: 'Expired', days };
  if (days <= 7) return { level: 'critical', label: `${days}d left`, days };
  if (days <= 30) return { level: 'warning', label: `${days}d left`, days };
  if (days <= 60) return { level: 'soon', label: `${days}d left`, days };
  return { level: 'valid', label: `${days}d`, days };
};
