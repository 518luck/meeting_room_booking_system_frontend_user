import axiosInstance from '@/utils/axios';

export async function login(username: string, password: string) {
  return await axiosInstance.post('/user/login', {
    username,
    password,
  });
}
