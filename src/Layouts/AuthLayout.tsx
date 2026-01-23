import { useNavigation, Outlet } from 'react-router-dom';
import { App, Button } from 'antd';
import useThemeStore from '@/store/theme';

const AuthLayout: React.FC = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isDark = useThemeStore((state) => state.isDark);
  const setIsDark = useThemeStore((state) => state.setIsDark);

  return (
    /* 💡 使用自定义变量 app-bg，确保背景色自动切换 */
    <div className="bg-app-bg relative min-h-screen w-full transition-colors duration-500">
      {isLoading && (
        /* 💡 遮罩层使用带透明度的变量 app-loading-bg */
        <div className="bg-app-loading-bg fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md">
          <div className="relative flex items-center justify-center">
            {/* 💡 旋转环：在深色模式下稍微调暗底色 */}
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700"></div>
            <div className="absolute h-4 w-4 animate-pulse rounded-full bg-blue-600"></div>
          </div>

          <p className="mt-4 animate-pulse text-lg font-semibold tracking-widest text-blue-600">
            页面加载中...
          </p>
        </div>
      )}
      <App>
        <div style={{ position: 'fixed', right: 20, top: 20, zIndex: 1000 }}>
          <Button
            shape="circle"
            onClick={() => {
              return setIsDark(!isDark);
            }}
          >
            {isDark ? '☀️' : '🌙'}
          </Button>
        </div>
      </App>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
