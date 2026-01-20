import axiosInstance from '@/utils/axios';

//登录
export interface UserInfo {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  phoneNumber: string;
  isFrozen: boolean;
  isAdmin: boolean;
  createTime: number;
  roles: string[]; // 字符串数组
  permissions: string; // 如果有多个权限，通常是逗号分隔的字符串
}

export interface LoginResponse {
  userInfo: UserInfo; // 保持与后端 JSON 键名一致
  accessToken: string;
  refreshToken: string;
}

export async function login(username: string, password: string) {
  return await axiosInstance.post<LoginResponse>('/user/login', {
    username,
    password,
  });
}

//注册验证码
export interface RegisterCaptchaResponse {
  code: number;
  data: string;
  message: string;
}
export async function registerCaptcha(
  email: string,
): Promise<RegisterCaptchaResponse> {
  return await axiosInstance.get('/user/register-captcha', {
    params: {
      address: email,
    },
  });
}

//注册
export interface RegisterParams {
  username: string; // 用户名（通常是唯一的标识）
  nickName: string; // 昵称（显示的名称）
  password: string; // 密码
  email: string; // 邮箱地址
  captcha: string; // 验证码（通常是 4-6 位字符或数字）
}
export async function register(registerUser: RegisterParams) {
  return await axiosInstance.post('/user/register', registerUser);
}
