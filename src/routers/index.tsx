import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import ErrorPage from '@/views/ErrorPage';
import AuthLayout from '@/Layouts/AuthLayout';
import MainLayout from '@/Layouts/MainLayout';
import authRoutes from './auth';

const routers: RouteObject[] = [
  {
    path: '/',
    Component: MainLayout,
    children: [
      // 受保护路由（需要登录）
      {
        index: true,
        lazy: async () => {
          const module = await import('@/views/Home');
          return { Component: module.default };
        },
      },
      {
        path: 'update-info',
        lazy: async () => {
          const module = await import('@/views/UpdateInfo');
          return { Component: module.default };
        },
      },
    ],
  },
  // 公开路由（不需要登录）
  {
    path: '/auth',
    Component: AuthLayout,
    children: [...authRoutes],
  },
  {
    path: '*',
    Component: ErrorPage,
  },
];

const router = createBrowserRouter(routers);

export default router;
