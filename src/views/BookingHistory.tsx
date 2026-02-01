import {
  Button,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Table,
  TimePicker,
  message,
  type TableProps,
} from 'antd';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import type { MeetingRoomItem } from '@/types/meetingRoom';
import { useBookingList, useUnbindBooking } from '@/hooks/booking';
import type { SearchBooking } from '@/types/booking';

interface BookingSearchResult {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  note: string;
  createTime: string;
  updateTime: string;
  room: MeetingRoomItem;
}

const BookingHistory = () => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [searchParams, setSearchParams] = useState<SearchBooking>({}); // 搜索参数

  // 列表接口
  const { data: bookingListDataObject } = useBookingList({
    searchBooking: searchParams,
    pageNo,
    pageSize,
  });
  // 从列表接口提取数据数组和总记录数
  const bookingListDataArray = bookingListDataObject?.data?.bookings || [];
  const totalCount = bookingListDataObject?.data?.totalCount || 0;

  // 解除预约hooks
  const { mutateAsync } = useUnbindBooking();
  // 解除预约
  const handleUnbind = async (id: number) => {
    try {
      await mutateAsync(id);
      message.success('解除成功');
      // 刷新列表
      setPageNo(1);
    } catch {
      message.error('解除失败');
    }
  };

  const [form] = useForm();

  // 分页
  const changePage = function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  };

  // 表格列
  const columns: TableProps<BookingSearchResult>['columns'] = [
    {
      title: '会议室名称',
      dataIndex: 'room',
      render(_, record) {
        return record.room.name;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      render(_, record) {
        return dayjs(new Date(record.startTime)).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render(_, record) {
        return dayjs(new Date(record.endTime)).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '审批状态',
      dataIndex: 'status',
      onFilter: (value, record) => record.status.startsWith(value as string),
      filters: [
        {
          text: '审批通过',
          value: '审批通过',
        },
        {
          text: '审批驳回',
          value: '审批驳回',
        },
        {
          text: '申请中',
          value: '申请中',
        },
        {
          text: '已解除',
          value: '已解除',
        },
      ],
    },
    {
      title: '预定时间',
      dataIndex: 'createTime',
      render(_, record) {
        return dayjs(new Date(record.createTime)).format('YYYY-MM-DD hh:mm:ss');
      },
    },
    {
      title: '备注',
      dataIndex: 'note',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      render: (_, record) =>
        record.status === '申请中' ? (
          <div>
            <Popconfirm
              title="解除申请"
              description="确认解除吗？"
              onConfirm={() => handleUnbind(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">解除预定</a>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  return (
    <div id="bookingHistory-container">
      <div className="bookingHistory-form">
        <Form
          form={form}
          onFinish={async (values: SearchBooking) => {
            setSearchParams(values);
          }}
          name="search"
          layout="inline"
          colon={false}
        >
          <Form.Item label="会议室名称" name="meetingRoomName">
            <Input />
          </Form.Item>

          <Form.Item label="预定开始日期" name="rangeStartDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="预定开始时间" name="rangeStartTime">
            <TimePicker />
          </Form.Item>

          <Form.Item label="预定结束日期" name="rangeEndDate">
            <DatePicker />
          </Form.Item>

          <Form.Item label="预定结束时间" name="rangeEndTime">
            <TimePicker />
          </Form.Item>

          <Form.Item label="位置" name="meetingRoomPosition">
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索预定历史
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="bookingHistory-table">
        <Table
          columns={columns}
          dataSource={bookingListDataArray}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
            total: totalCount,
          }}
        />
      </div>
    </div>
  );
};

export default BookingHistory;
