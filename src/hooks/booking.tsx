import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { SearchBookingParams } from '@/types/booking';
import { apply, bookingList, reject, unbind } from '@/api/booking';

// 获取预约列表
export const useBookingList = (params: SearchBookingParams) => {
  const filteredSearchBookingParams = Object.fromEntries(
    Object.entries(params.searchBooking).filter(
      ([_, value]) => value !== undefined,
    ),
  );
  const filteredParams = {
    ...params,
    searchBooking: filteredSearchBookingParams,
  };
  return useQuery({
    queryKey: ['bookingList', filteredParams], // 缓存的唯一标识
    queryFn: () => bookingList(filteredParams), // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    // select: (res) => res, // 💡 直接提取出 MeetingRoomListResponse，组件里用起来更爽
  });
};

// 预约申请
export const useApplyBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apply(id), // 执行申请操作
    onSuccess: () => {
      // 💡 重点：当申请成功后，让所有以 "bookingList" 开头的缓存失效
      queryClient.invalidateQueries({ queryKey: ['bookingList'] });
      // 这会导致正在显示的列表立即发起新的请求，从而刷新界面
    },
  });
};

// 预约拒绝
export const useRejectBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reject(id), // 执行拒绝操作
    onSuccess: () => {
      // 💡 重点：当拒绝成功后，让所有以 "bookingList" 开头的缓存失效
      queryClient.invalidateQueries({ queryKey: ['bookingList'] });
      // 这会导致正在显示的列表立即发起新的请求，从而刷新界面
    },
  });
};

// 已解除预约
export const useUnbindBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unbind(id), // 执行解除操作
    onSuccess: () => {
      // 💡 重点：当解除成功后，让所有以 "bookingList" 开头的缓存失效
      queryClient.invalidateQueries({ queryKey: ['bookingList'] });
      // 这会导致正在显示的列表立即发起新的请求，从而刷新界面
    },
  });
};
