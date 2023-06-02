import { create } from 'zustand';

const useDelVidModal = create((set) => ({
  isOpen: false,
  deletionObject: null, // Added deletionObject in the state

  onOpen: (deletionObject) => set({ isOpen: true, deletionObject }), // Updated onOpen function
  onClose: () => set({ isOpen: false, deletionObject: null }) // Reset deletionObject on close
}));

export default useDelVidModal;
