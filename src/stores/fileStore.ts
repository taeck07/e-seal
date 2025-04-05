import { create } from "zustand";

type Store = {
  // selected pdf file
  file: File | null;
  setFile: (file: File | null) => void;
  // selected pdf page on pdf previewer
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
