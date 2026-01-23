import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      setIsDark: (isDark) => set({ isDark }),
    }),
    {
      name: 'theme-storage',
    },
  ),
);
export default useThemeStore;
