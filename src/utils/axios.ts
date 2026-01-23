import axios, { type AxiosRequestConfig } from 'axios';
import useAuthStore from '@/store/auth';
import { refreshToken } from '@/api/login';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
  timeout: 10000,
});

// 请求拦截器：添加 token
axiosInstance.interceptors.request.use(
  async (config) => {
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
interface PendingTask {
  config: AxiosRequestConfig;
  resolve: (value?: unknown) => void;
}
let refreshing = false;
const queue: PendingTask[] = [];
axiosInstance.interceptors.response.use(
  async (response) => {
    return response.data;
  },

  async (error) => {
    console.log('🚀 ~ error:', error);
    // config : 用户发送请求的全部配置信息

    const { data, config } = error.response;

    console.log('请求到了');
    // refreshing是 true 的话就证明token可能失效了,如果处于刷新状态就把请求挂起UnauthorizedException是401错误
    if (refreshing) {
      console.log('请求到了1231231');
      return new Promise((resolve) => {
        queue.push({ config, resolve });
      });
    }

    //401 是后端你dunauthorizedException产生的错误
    // config.url.includes 防止循环刷新,如果请求是 auth/refresh,则直接返回错误
    if (data?.code === 401 && !config.url.includes('/user/refresh')) {
      refreshing = true;
      console.log('开始刷新 Token...');

      try {
        const refreshTokenStore = useAuthStore.getState().refreshToken || '';
        const res = await refreshToken(refreshTokenStore);

        if (res.code === 200 || res.code === 201) {
          console.log('刷新成功，重发队列请求');
          // 重新发送队列中的请求
          queue.forEach(({ config, resolve }) => {
            resolve(axiosInstance(config));
          });
          queue.length = 0;
          return axiosInstance(config); // 重发当前请求
        } else {
          throw new Error('Refresh token invalid');
        }
      } catch (err) {
        console.error('刷新 Token 彻底失败:', err);
        queue.length = 0; // 清空队列
        message.error('登录已过期，请重新登录');
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1500);
        return Promise.reject(err);
      } finally {
        // 【关键】无论 try 成功还是 catch 报错，最后都要把锁解开
        refreshing = false;
      }
    } else {
      //
      message.error(data.data);
    }
  },
);

export default axiosInstance;
