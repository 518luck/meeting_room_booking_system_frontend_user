import { useState, useEffect } from 'react';
import { ConfigProvider, theme, Button, App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from '@/routers/index';

function App() {
  // 主题切换变量
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

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
      <AntdApp>
        <div style={{ position: 'fixed', right: 20, top: 20, zIndex: 1000 }}>
          <Button shape="circle" onClick={() => setIsDark(!isDark)}>
            {isDark ? '☀️' : '🌙'}
          </Button>
        </div>

        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
