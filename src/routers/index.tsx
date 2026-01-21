import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import ErrorPage from '@/views/ErrorPage';
import AuthLayout from '@/Layouts/AuthLayout';
import MainLayout from '@/Layouts/MainLayout';
import authRoutes from './auth';

const routers: RouteObject[] = [
  {
    path: '/',
    Component: AuthLayout,
    children: [
      // 公开路由（不需要登录）
      ...authRoutes,

      // 受保护路由（需要登录）
      {
        path: '/',
        Component: MainLayout,
        children: [
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
          // TODO: 在这里添加其他需要登录的路由
          // 例如：
          // {
          //   path: 'meeting-rooms',
          //   lazy: async () => {
          //     const module = await import('@/views/MeetingRooms');
          //     return { Component: module.default };
          //   },
          // },
          // {
          //   path: 'bookings',
          //   lazy: async () => {
          //     const module = await import('@/views/Bookings');
          //     return { Component: module.default };
          //   },
          // },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: ErrorPage,
  },
];

const router = createBrowserRouter(routers);

export default router;
