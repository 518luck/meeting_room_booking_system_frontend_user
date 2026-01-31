import { useEffect } from 'react';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from '@/routers/index';
import useThemeStore from '@/store/theme';
import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const isDark = useThemeStore((state) => state.isDark);
  const setIsDark = useThemeStore((state) => state.setIsDark);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
  }, [setIsDark]);

  // 进入界面加载
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // 1. 创建一个客户端实例（这个实例负责管理所有缓存）
  const queryClient = new QueryClient();

  return (
    <StyleProvider layer>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: '#1677ff',
          },
        }}
      >
        <AntdApp>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
