import { create } from "zustand";

type Store = {
  file: File | null;
  setFile: (file: File | null) => void;
  selectedPage: number | null;
  setSelectedPage: (page: number | null ) => void;
};

export const useStore = create<Store>((set) => ({
  file: null,
  selectedPage: null,
  setFile: (file: File | null) => {
    set({ file });
    set({selectedPage: 0});
  },
  setSelectedPage: (page: number | null) => set({selectedPage: page}),
}));
