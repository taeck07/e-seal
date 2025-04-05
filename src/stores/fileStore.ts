import { create } from "zustand";

type Store = {
  // selected pdf file
  file: File | null;
  setFile: (file: File | null) => void;
};

export const useStore = create<Store>((set) => ({
  file: null,
  setFile: (file: File | null) => set({ file })
}));
