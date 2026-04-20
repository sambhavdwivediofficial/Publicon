import { formatDistanceToNow, format } from 'date-fns';

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
};

export const formatDate = (date, pattern = 'MMM d, yyyy') => {
  return format(new Date(date), pattern);
};