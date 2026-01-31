import {
  Badge,
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  type TableProps,
} from 'antd';
import { useCallback, useMemo, useState } from 'react';
import type { MeetingRoomItem } from '@/types/meetingRoom';
import { useMeetingRoomList } from '@/hooks/apiMeetingRoomHooks';
const { useForm } = Form;
// import { CreateMeetingRoomModal } from '@/views/components/CreateMeetingRoomModal';
// import { UpdateMeetingRoomModal } from '@/views/components/UpdateMeetingRoom';

interface SearchMeetingRoom {
  name?: string;
  capacity?: number;
  equipment?: string;
}

const MeetingRoomManage = () => {
  const [pageNo, setPageNo] = useState<number>(1); // 当前页码
  const [pageSize, setPageSize] = useState<number>(10); // 每页数量
  const [searchMeetingRoomParams, setSearchMeetingRoomParams] = // 查询会议室参数
    useState<SearchMeetingRoom>({
      name: '',
      capacity: undefined,
      equipment: '',
    });

  // 过滤空字符串 ,null , undefined
  const filteredParams = Object.fromEntries(
    Object.entries(searchMeetingRoomParams).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== '' && value !== null && value !== undefined,
    ),
  );
  // 获取列表信息
  const { data: meetingRoomListData } = useMeetingRoomList({
    pageNo,
    pageSize,
    ...filteredParams,
  });
  // 解构列表信息
  let tableList;
  let tableTotal;
  if (typeof meetingRoomListData?.data !== 'string') {
    tableList = meetingRoomListData?.data?.meetingRooms || [];
    tableTotal = meetingRoomListData?.data?.totalCount;
  }

  // 头部表格
  const columns: TableProps<MeetingRoomItem>['columns'] = useMemo(
    () => [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '容纳人数',
        dataIndex: 'capacity',
      },
      {
        title: '位置',
        dataIndex: 'location',
      },
      {
        title: '设备',
        dataIndex: 'equipment',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
      },
      {
        title: '上次更新时间',
        dataIndex: 'updateTime',
      },
      {
        title: '预定状态',
        dataIndex: 'isBooked',
        render: (_, record) =>
          record.isBooked ? (
            <Badge status="error">已被预订</Badge>
          ) : (
            <Badge status="success">可预定</Badge>
          ),
      },
      {
        title: '操作',
        render: (_, record) => (
          <div className="flex">
            <Popconfirm
              title="会议室删除"
              // onConfirm={() => mutate(record.id)}
              description="确认删除该会议室吗？"
              okText="确认"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </div>
        ),
      },
    ],
    [],
  );

  // 搜索会议室
  const searchMeetingRoom = useCallback(async (values: SearchMeetingRoom) => {
    setSearchMeetingRoomParams(values);
  }, []);

  const [form] = useForm();

  // 分页
  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 搜索表单卡片 */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <Form
          form={form}
          onFinish={searchMeetingRoom}
          name="search"
          layout="inline"
          colon={false}
          className="flex flex-wrap gap-4"
        >
          <Form.Item label="会议室名称" name="name">
            <Input className="w-40" placeholder="请输入名称" />
          </Form.Item>

          <Form.Item label="容纳人数" name="capacity">
            <Input className="w-32" placeholder="请输入人数" />
          </Form.Item>

          <Form.Item label="位置" name="location">
            <Input className="w-40" placeholder="请输入位置" />
          </Form.Item>

          <Form.Item label=" ">
            <div className="flex gap-3">
              <Button type="primary" htmlType="submit">
                搜索会议室
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      {/* 表格卡片 */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <Table
          columns={columns}
          dataSource={tableList}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
            total: tableTotal,
          }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default MeetingRoomManage;
