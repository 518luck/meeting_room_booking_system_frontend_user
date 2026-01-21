import axios from 'axios';
import { message } from 'antd';
import { useAuthStore } from '@/store/auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
  timeout: 10000,
});

// 请求拦截器：添加 token
axiosInstance.interceptors.request.use(
  (config) => {
    // 从 zustand store 中获取 token
    const accessToken = useAuthStore.getState().accessToken;

    // 如果存在 token，添加到请求头
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器：处理响应和错误
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log('🚀 ~ error:', error);
    let { data, config } = error.response;
    // 处理 401 未授权错误
    // if (error.response?.status === 401) {
    //   // 清除认证信息
    //   useAuthStore.getState().clearAuth();
    //   // 跳转到登录页
    //   window.location.href = '/auth/login';
    //   message.error('登录已过期，请重新登录');
    //   return Promise.reject(error);
    // }
    // message.error(error.response?.data?.data || '请求失败');
    // return Promise.reject(error);
  },
);

export default axiosInstance;
