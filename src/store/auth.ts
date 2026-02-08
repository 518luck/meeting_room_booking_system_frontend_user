import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { UserInfo, LoginDataResponse } from '@/api/login';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  setAuth: (data: LoginDataResponse) => void;
  clearAuth: () => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
}

// 用户认证状态管理
const useAuthStore = create<AuthState>()(
  // 💡 第一层包裹 devtools
  devtools(
    // 💡 第二层包裹 persist
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        userInfo: null,

        setAuth: ({ accessToken, refreshToken, userInfo }) =>
          set({ accessToken, refreshToken, userInfo }),

        clearAuth: () =>
          set({ accessToken: null, refreshToken: null, userInfo: null }),

        // 实现更新逻辑
        updateUserInfo: (info: Partial<UserInfo>) =>
          set((state) => ({
            userInfo: state.userInfo
              ? { ...state.userInfo, ...info }
              : (info as UserInfo),
          })),
      }),
      {
        name: 'auth-storage',
      },
    ),
    {
      name: 'AuthStore', // 💡 在调试工具中显示的名称
    },
  ),
);
export default useAuthStore;
