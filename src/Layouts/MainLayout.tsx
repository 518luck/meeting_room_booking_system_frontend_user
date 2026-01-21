import { Outlet } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

/**
 * 主应用布局
 * 用于已登录用户的主界面
 * 可以在这里添加：顶部导航栏、侧边菜单、用户信息等
 */
const MainLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="bg-app-bg relative min-h-screen w-full transition-colors duration-500">
        {/* TODO: 这里可以添加顶部导航栏、侧边菜单等 */}
        12312321
        <main>
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default MainLayout;
