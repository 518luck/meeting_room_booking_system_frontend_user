import { useMemo } from 'react';
import { Button, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { login } from '@/api/login';
import useAuthStore from '@/store/auth';
import { useNavigate } from 'react-router-dom';
import { throttle } from 'lodash-es';

interface LoginUser {
  username?: string;
  password?: string;
}

const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const throttledSendCaptcha = useMemo(() => {
    const onFinish: FormProps<LoginUser>['onFinish'] = async (values) => {
      if (!values.username || !values.password) {
        return;
      }
      const { username, password } = values;

      const res = await login(username, password);
      if (res.code !== 201) {
        message.error(res.message || '登录失败');
        return;
      }
      if (res.data) {
        const { accessToken, refreshToken, userInfo } = res.data;

        setAuth({
          accessToken,
          refreshToken,
          userInfo,
        });

        message.success('登录成功');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    };

    return throttle(onFinish, 3000, { trailing: false });
  }, [navigate, setAuth]);

  return (
    <div className="flex">
      <div className="bg-app-bg mx-auto mt-24 w-96 rounded-2xl border border-gray-100 p-8 shadow-2xl transition-all duration-500 dark:border-zinc-800">
        <h1 className="text-app-text mb-8 text-center text-3xl font-bold tracking-tight">
          会议室预定系统
        </h1>

        <Form
          name="login"
          layout="vertical"
          onFinish={throttledSendCaptcha}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label={<span className="text-app-text">用户名</span>}
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              size="large"
              placeholder="请输入用户名"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-app-text">密码</span>}
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              size="large"
              placeholder="请输入密码"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-between text-sm">
              <a
                className="text-blue-600 transition-colors hover:text-blue-500"
                onClick={() => navigate('/auth/register')}
              >
                创建账号
              </a>
              <a
                className="text-gray-400 transition-colors hover:text-gray-300"
                onClick={() => navigate('/auth/update_password')}
              >
                忘记密码
              </a>
            </div>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="h-12 rounded-lg font-bold shadow-md shadow-blue-500/20"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
