import { create } from "zustand";
import { Storage } from "@/utils/storage";

type Store = {
  count: number;
  themeMode: any;
  inc: () => void;
  toggleTheme: (mode: any) => void;
};

const themeMode = Storage.getItem("themeMode") || "light"; // 默认light

const useStore = create<Store>()((set) => ({
  count: 1,
  themeMode: themeMode,
  inc: () => set((state) => ({ count: state.count + 1 })),
  toggleTheme: (mode) => set(() => ({ themeMode: mode })),
}));

export default useStore;
