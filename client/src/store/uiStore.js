import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: false,
  modal: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));