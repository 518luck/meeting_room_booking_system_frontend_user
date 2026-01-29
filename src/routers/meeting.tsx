import MeetingRoomList from '@/views/MeetingRoomList';
import BookingHistory from '@/views/BookingHistory';
import type { RouteObject } from 'react-router-dom';

const meetingRoutes: RouteObject[] = [
  {
    path: '/meeting-list',
    Component: MeetingRoomList,
  },
  {
    path: '/meeting-history',
    Component: BookingHistory,
  },
];
export default meetingRoutes;
