import { useQuery } from '@tanstack/react-query';
import type { MeetingRoomListParams } from '@/types/meetingRoom';
import { meetingRoomList } from '@/api/meetingRoom';

// 获取会议室列表
export const useMeetingRoomList = (params: MeetingRoomListParams) => {
  return useQuery({
    queryKey: ['meetingRoomList', params], // 缓存的唯一标识
    queryFn: () => meetingRoomList(params), // 执行的异步函数
    staleTime: 1000 * 60 * 5, // 5分钟内数据被认为是“新鲜”的，不会重复请求
    // select: (res) => res, // 💡 直接提取出 MeetingRoomListResponse，组件里用起来更爽
  });
};
