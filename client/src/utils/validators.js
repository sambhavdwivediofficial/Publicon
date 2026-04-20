export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidURL = (url) => {
  try { new URL(url); return true; } catch { return false; }
};