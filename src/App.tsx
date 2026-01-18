import { useState, useEffect } from 'react';
import { ConfigProvider, theme, Button, App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import router from '@/routers/index';

function App() {
  // 1. 定义 React 状态
  const [isDark, setIsDark] = useState(false);

  // 2. 这里的 useEffect 相当于你那个 toggle 函数的逻辑
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
        // 3. 根据状态切换 antd 算法
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
