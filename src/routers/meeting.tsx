import MeetingRoomList from '@/views/MeetingRoomList';
import BookingHistory from '@/views/BookingHistory';
import type { RouteObject } from 'react-router-dom';

const meetingRoutes: RouteObject[] = [
  {
    path: '/meeting-list',
    Component: MeetingRoomList,
    handle: {
      label: '会议房间列表',
    },
  },
  {
    path: '/meeting-history',
    Component: BookingHistory,
    handle: {
      label: '预约历史',
    },
  },
];
export default meetingRoutes;
