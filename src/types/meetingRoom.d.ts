//公共返回类型
export interface ApiResponse<T, E = string> {
  code: number;
  data: T | E; // 核心：使用联合类型处理 data 的不确定性
  message: string;
}

// 会议室列表
//返回类型
export interface MeetingRoomItem {
  id: number;
  /** 会议室名称 */
  name: string;
  /** 容纳人数 */
  capacity: number;
  /** 所在位置 */
  location: string;
  /** 设备设施 */
  equipment: string;
  /** 描述备注 */
  description: string;
  /** 当前是否已被预订 */
  isBooked: boolean;
  /** 创建时间 (ISO 字符串) */
  createTime: string;
  /** 更新时间 (ISO 字符串) */
  updateTime: string;
}
export interface MeetingRoomListResponse {
  meetingRooms: MeetingRoomItem[];
  totalCount: number;
}
//参数类型
export interface MeetingRoomListParams {
  /** 会议室名称（模糊搜索） */
  name?: string;
  /** 容纳人数（最小值） */
  capacity?: number;
  /** 设备设施（模糊搜索） */
  equipment?: string;
  /** 当前页码 */
  pageNo: number;
  /** 每页条数 */
  pageSize: number;
}
