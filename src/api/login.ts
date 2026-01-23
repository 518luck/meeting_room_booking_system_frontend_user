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

export interface LoginDataResponse {
  accessToken: string;
  refreshToken: string;
  userInfo?: UserInfo;
}
export interface LoginResponse {
  code: number;
  data: LoginDataResponse;
  message: string;
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  return await axiosInstance.post('/user/login', {
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
export interface RegisterResponse {
  code: number;
  data: string;
  message: string;
}
export async function register(
  registerUser: RegisterParams,
): Promise<RegisterResponse> {
  return await axiosInstance.post('/user/register', registerUser);
}

//修改密码验证码
export interface UpdatePasswordCaptchaResponse {
  code: number;
  data: string;
  message: string;
}
export async function updatePasswordCaptcha(
  email: string,
): Promise<UpdatePasswordCaptchaResponse> {
  return await axiosInstance.get('/user/update_password/captcha', {
    params: {
      address: email,
    },
  });
}

//修改密码
export interface UpdatePasswordParams {
  username: string;
  email: string;
  captcha: string;
  password: string;
}
export interface UpdatePasswordResponse {
  code: number;
  data: string;
  message: string;
}
export async function updatePassword(
  params: UpdatePasswordParams,
): Promise<UpdatePasswordResponse> {
  return await axiosInstance.post('/user/update_password', params);
}

//更新用户信息验证码
export interface UpdateInfoCaptchaResponse {
  code: number;
  data: string;
  message: string;
}
export async function updateInfoCaptcha(): Promise<UpdateInfoCaptchaResponse> {
  return await axiosInstance.get('/user/update/captcha');
}

//获取用户信息
export interface UserInfo {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  phoneNumber: string;
  isFrozen: boolean;
  createTime: number;
}
export interface UserInfoResponse {
  code: number;
  data: UserInfo;
  message: string;
}
export async function getUserInfo(): Promise<UserInfoResponse> {
  return await axiosInstance.get('/user/info');
}

//更新用户信息
export interface UpdateInfoParams {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}
export interface UpdateInfoResponse {
  code: number;
  data: string;
  message: string;
}
export async function updateInfo(
  params: UpdateInfoParams,
): Promise<UpdateInfoResponse> {
  return await axiosInstance.post('/user/update', params);
}

//刷新token接口

export interface RefreshTokenParams {
  access_token: string;
  refresh_token: string;
}
export interface RefreshTokenResponse {
  code: number;
  data: RefreshTokenParams;
  message: string;
}
export async function refreshToken(
  refreshToken: string,
): Promise<RefreshTokenResponse> {
  return await axiosInstance.get('/user/refresh', {
    params: {
      refreshToken,
    },
  });
}
