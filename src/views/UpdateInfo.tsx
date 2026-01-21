import { Button, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { updateInfo, updateInfoCaptcha } from '@/api/login';
import { useState, useEffect } from 'react';
import { throttle } from 'lodash-es';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

export interface UpdateInfoForm {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

const UpdateInfo = () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 初始化表单数据
  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        headPic: userInfo.headPic,
        nickName: userInfo.nickName,
        email: userInfo.email,
      });
    }
  }, [userInfo, form]);

  // 更新用户信息
  const onFinish: FormProps<UpdateInfoForm>['onFinish'] = async (values) => {
    const res = await updateInfo(values);
    if (res.code === 200) {
      message.success('信息更新成功');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      message.error(res.message || '信息更新失败');
    }
  };
  const throttledOnFinish = throttle(onFinish, 5000, { trailing: false });

  // 发送验证码
  const sendCaptcha = async () => {
    const res = await updateInfoCaptcha();
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
          更新个人信息
        </h1>

        <Form
          name="updateInfo"
          layout="vertical"
          onFinish={throttledOnFinish}
          autoComplete="off"
          requiredMark={false}
          form={form}
        >
          <Form.Item
            label={<span className="text-app-text">头像</span>}
            name="headPic"
            rules={[{ required: true, message: '请输入头像地址!' }]}
          >
            <Input
              size="large"
              placeholder="请输入头像地址"
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
                <a
                  className="text-blue-600 transition-colors hover:text-blue-500"
                  onClick={() => navigate('/')}
                >
                  返回首页
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
              更新信息
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdateInfo;
