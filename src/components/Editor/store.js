import create from 'zustand';

export const useStore = create(set => ({
  ydoc: null,
  setYdoc: (ydoc) => set(state => ({ ydoc })),
}));
