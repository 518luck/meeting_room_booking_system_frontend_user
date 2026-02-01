// 预约列表item
export interface SearchBooking {
  username?: string;
  meetingRoomName?: string;
  meetingRoomPosition?: string;
  rangeStartDate?: Date;
  rangeStartTime?: Date;
  rangeEndDate?: Date;
  rangeEndTime?: Date;
}

// 预约列表参数
export interface SearchBookingParams {
  searchBooking: SearchBooking;
  pageNo: number;
  pageSize: number;
}
