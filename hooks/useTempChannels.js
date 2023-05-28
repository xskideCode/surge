import { create } from 'zustand';

const useTempChannels = create((set) => ({
  channels: [],
  onAdd: (newChannels) => {
    if (!Symbol.iterator in Object(newChannels)) {
      // Handle the case when `newChannels` is not iterable
      console.error('newChannels is not iterable');
      return;
    }

    set((state) => ({ channels: [...state.channels, ...newChannels] }));
  },
}));

export default useTempChannels;
