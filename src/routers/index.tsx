import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import ErrorPage from '@/views/ErrorPage';
import RootLayout from '@/Layouts/RootLayout';
import longRouter from './long';

const routers: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: async () => {
          const module = await import('@/views/Home');
          return { Component: module.default };
        },
      },
      ...longRouter,
    ],
  },
  {
    path: '*',
    Component: ErrorPage,
  },
];

const router = createBrowserRouter(routers);

export default router;
