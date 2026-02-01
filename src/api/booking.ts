import axiosInstance from '@/utils/axios';
import dayjs from 'dayjs';
import type { SearchBookingParams, CreateBooking } from '@/types/booking';
import type { ApiResponse } from '@/types/meetingRoom';

// 预约列表
export async function bookingList({
  searchBooking,
  pageNo,
  pageSize,
}: SearchBookingParams) {
  let bookingTimeRangeStart;
  let bookingTimeRangeEnd;

  if (searchBooking.rangeStartDate && searchBooking.rangeStartTime) {
    const rangeStartDateStr = dayjs(searchBooking.rangeStartDate).format(
      'YYYY-MM-DD',
    );
    const rangeStartTimeStr = dayjs(searchBooking.rangeStartTime).format(
      'HH:mm',
    );
    bookingTimeRangeStart = dayjs(
      rangeStartDateStr + ' ' + rangeStartTimeStr,
    ).valueOf();
  }

  if (searchBooking.rangeEndDate && searchBooking.rangeEndTime) {
    const rangeEndDateStr = dayjs(searchBooking.rangeEndDate).format(
      'YYYY-MM-DD',
    );
    const rangeEndTimeStr = dayjs(searchBooking.rangeEndTime).format('HH:mm');
    bookingTimeRangeEnd = dayjs(
      rangeEndDateStr + ' ' + rangeEndTimeStr,
    ).valueOf();
  }

  return await axiosInstance.get('/booking/list', {
    params: {
      username: searchBooking.username,
      meetingRoomName: searchBooking.meetingRoomName,
      meetingRoomPosition: searchBooking.meetingRoomPosition,
      bookingTimeRangeStart,
      bookingTimeRangeEnd,
      pageNo: pageNo,
      pageSize: pageSize,
    },
  });
}

// 预约申请
export async function apply(id: number) {
  return await axiosInstance.get('/booking/apply/' + id);
}

// 已解除
export async function unbind(id: number) {
  return await axiosInstance.get('/booking/unbind/' + id);
}

// 预约添加
export async function bookingAdd(
  booking: CreateBooking,
): Promise<ApiResponse<string>> {
  const rangeStartDateStr = dayjs(booking.rangeStartDate).format('YYYY-MM-DD');
  const rangeStartTimeStr = dayjs(booking.rangeStartTime).format('HH:mm');
  const startTime = dayjs(
    rangeStartDateStr + ' ' + rangeStartTimeStr,
  ).valueOf();

  const rangeEndDateStr = dayjs(booking.rangeEndDate).format('YYYY-MM-DD');
  const rangeEndTimeStr = dayjs(booking.rangeEndTime).format('HH:mm');
  const endTime = dayjs(rangeEndDateStr + ' ' + rangeEndTimeStr).valueOf();

  return await axiosInstance.post('/booking/add', {
    meetingRoomId: booking.meetingRoomId,
    startTime,
    endTime,
    note: booking.note,
  });
}
