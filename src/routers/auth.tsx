import type { RouteObject } from 'react-router-dom';

/**
 * 公开路由（不需要登录）
 * 包括：登录、注册、修改密码
 */
const authRoutes: RouteObject[] = [
  {
    path: '/login',
    lazy: async () => {
      const module = await import('@/views/Login');
      return { Component: module.default };
    },
  },
  {
    path: '/register',
    lazy: async () => {
      const module = await import('@/views/Register');
      return { Component: module.default };
    },
  },
  {
    path: '/update_password',
    lazy: async () => {
      const module = await import('@/views/UpdatePassword');
      return { Component: module.default };
    },
  },
];

export default authRoutes;
