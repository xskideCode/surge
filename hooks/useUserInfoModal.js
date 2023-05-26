import { create } from 'zustand';

const useUserInfoModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useUserInfoModal;
