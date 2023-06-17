// import zustand
import {create} from 'zustand';

// define the store
export const useStore = create(set => ({
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));