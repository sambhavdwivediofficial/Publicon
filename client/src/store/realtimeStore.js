import { create } from 'zustand';

export const useRealtimeStore = create((set) => ({
  liveCounts: {},
  updateCount: (key, count) => set((state) => ({
    liveCounts: { ...state.liveCounts, [key]: count }
  })),
}));