import { useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from '@/routers/index';
import useThemeStore from '@/store/theme';

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

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
