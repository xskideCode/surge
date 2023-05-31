import { create } from 'zustand';

const useCheckoutModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useCheckoutModal;
