import { Button, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { register, registerCaptcha } from '@/api/login';
import { useState, useEffect } from 'react';
import { throttle } from 'lodash-es';
import { useNavigate } from 'react-router-dom';

export interface RegisterUser {
  username: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}

const Register = () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 注册
  const onFinish: FormProps<RegisterUser>['onFinish'] = async (values) => {
    if (values.confirmPassword !== values.password) {
      message.error('两次密码输入不一致');
      return;
    }
    const res = await register(values);
    if (res.code === 201) {
      message.success('注册成功');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } else {
      message.error(res.message || '注册失败');
    }
  };
  const throttledOnFinish = throttle(onFinish, 5000, { trailing: false });

  // 发送验证码
  const sendCaptcha = async () => {
    const email = form.getFieldValue('email');
    const res = await registerCaptcha(email);
    if (res.code === 200) {
      message.success('验证码发送成功');
      setCountdown(60);
    } else {
      message.error(res.message || '验证码发送失败');
    }
  };
  const throttledSendCaptcha = throttle(sendCaptcha, 50000, {
    trailing: false,
  });

  return (
    <div className="flex">
      <div className="bg-app-bg mx-auto mt-24 w-96 rounded-2xl border border-gray-100 p-8 shadow-2xl transition-all duration-500 dark:border-zinc-800">
        <h1 className="text-app-text mb-8 text-center text-3xl font-bold tracking-tight">
          会议室预定系统
        </h1>

        <Form
          name="register"
          layout="vertical"
          onFinish={throttledOnFinish}
          autoComplete="off"
          requiredMark={false}
          form={form}
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
            label={<span className="text-app-text">昵称</span>}
            name="nickName"
            rules={[{ required: true, message: '请输入昵称!' }]}
          >
            <Input
              size="large"
              placeholder="请输入昵称"
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

          <Form.Item
            label={<span className="text-app-text">确认密码</span>}
            name="confirmPassword"
            rules={[{ required: true, message: '请输入确认密码!' }]}
          >
            <Input.Password
              size="large"
              placeholder="请再次输入密码"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-app-text">邮箱</span>}
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入合法邮箱地址!' },
            ]}
          >
            <Input
              size="large"
              placeholder="请输入邮箱"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-app-text">验证码</span>}
            name="captcha"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <div className="flex gap-2">
              <Input
                size="large"
                placeholder="请输入验证码"
                className="flex-1 rounded-lg"
              />
              <Button
                size="large"
                className="rounded-lg"
                onClick={throttledSendCaptcha}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `${countdown}秒` : '发送验证码'}
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-center text-sm">
              <span className="text-gray-400">
                已有账号？
                <a
                  className="ml-1 text-blue-600 transition-colors hover:text-blue-500"
                  onClick={() => navigate('/login')}
                >
                  去登录
                </a>
              </span>
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
              注 册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
