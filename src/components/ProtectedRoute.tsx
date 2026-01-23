import useAuthStore from '@/store/auth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 路由守卫组件
 * 检查用户是否已登录，未登录则重定向到登录页
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = useAuthStore((state) => {
    return state.accessToken;
  });

  if (!accessToken) {
    // 未登录，重定向到登录页
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
