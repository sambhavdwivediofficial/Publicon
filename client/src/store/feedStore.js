import { create } from 'zustand';

export const useFeedStore = create((set) => ({
  items: [],
  hasMore: true,
  page: 1,
  setItems: (items) => set({ items }),
  appendItems: (newItems) => set((state) => ({ items: [...state.items, ...newItems] })),
  incrementPage: () => set((state) => ({ page: state.page + 1 })),
  reset: () => set({ items: [], hasMore: true, page: 1 }),
}));