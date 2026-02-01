import axios, { type AxiosRequestConfig } from 'axios';
import { refreshToken } from '@/api/login';
import { message } from 'antd';
import useAuthStore from '@/store/auth';

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
    if (!error.response) {
      return Promise.reject(error);
    }
    // config : 用户发送请求的全部配置信息
    const { data, config } = error.response;

    if (config.url.includes('/user/refresh')) {
      refreshing = false;
      queue.length = 0;
      message.error('登录过期，请重新登录');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
    // refreshing是 true 的话就证明token可能失效了,如果处于刷新状态就把请求挂起存入队列当中
    // UnauthorizedException是401错误
    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        });
      });
    }
    //401 是后端你dunauthorizedException产生的错误
    // config.url.includes 防止循环刷新,如果请求是 auth/refresh,则直接返回错误
    if (data?.code === 401 && !config.url.includes('/user/refresh')) {
      //开启刷新token的锁
      refreshing = true;

      // 用refreshToken刷新token
      const refreshTokenStore = useAuthStore.getState().refreshToken || '';
      const res = await refreshToken(refreshTokenStore);

      if (res.code === 200 || res.code === 201) {
        // 刷新成功后，更新 store 中的 token
        useAuthStore.getState().setAuth({
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        });
        // 重新发送队列中的请求
        queue.forEach(({ config, resolve }) => {
          resolve(axiosInstance(config));
        });
        queue.length = 0;
        return axiosInstance(config); // 重发当前请求
      } else {
        message.error('登录已过期，请重新登录');
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1500);
      }
    } else {
      message.error(data.data);
      return error.response;
    }
  },
);

export default axiosInstance;
