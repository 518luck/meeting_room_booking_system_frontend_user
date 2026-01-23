import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserInfo, LoginDataResponse } from '@/api/login';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  setAuth: (data: LoginDataResponse) => void;
  clearAuth: () => void;
}

// 用户认证状态管理
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userInfo: null,

      setAuth: ({ accessToken, refreshToken, userInfo }) =>
        set({
          accessToken,
          refreshToken,
          userInfo,
        }),
      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, userInfo: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
