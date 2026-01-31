import axiosInstance from '@/utils/axios';

import type {
  ApiResponse,
  MeetingRoomListParams,
  MeetingRoomListResponse,
} from '@/types/meetingRoom';

// 会议室列表
export async function meetingRoomList(
  params: MeetingRoomListParams,
): Promise<ApiResponse<MeetingRoomListResponse>> {
  return await axiosInstance.get('/meeting-room/list', {
    params,
  });
}
