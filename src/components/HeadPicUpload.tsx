import {
  CameraOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { message, Upload, Avatar } from 'antd';
import type { UploadProps } from 'antd';
import { getPresignedUrl } from '@/api/login';
import axios from 'axios';

const { Dragger } = Upload;

interface HeadPicUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function HeadPicUpload(props: HeadPicUploadProps) {
  const uploadProps: UploadProps = {
    name: 'file',
    action: async (file) => {
      const res = await getPresignedUrl(file.name);
      return res.data;
    },
    async customRequest(options) {
      const { onSuccess, file, action } = options;
      const res = await axios.put(action, file);
      onSuccess!(res.data);
    },
    showUploadList: false,
    accept: 'image/*',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        props?.onChange?.(
          'http://localhost:9000/meeting-room-booking-system/' + info.file.name,
        );
        message.success(`头像上传成功`);
      } else if (status === 'error') {
        message.error(`头像上传失败，请重试`);
      }
    },
  };

  const handleRemove = () => {
    props.onChange?.('');
  };

  // 有头像时显示头像预览
  if (props.value) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="group relative">
          <Avatar
            size={120}
            src={props.value}
            className="border-4 border-white shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Upload {...uploadProps}>
              <button className="cursor-pointer p-2 text-white transition-colors hover:text-blue-400">
                <CameraOutlined className="text-xl" />
              </button>
            </Upload>
            <button
              onClick={handleRemove}
              className="cursor-pointer p-2 text-white transition-colors hover:text-red-400"
            >
              <DeleteOutlined className="text-xl" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500">点击头像可更换或删除</p>
      </div>
    );
  }

  // 无头像时显示上传区域
  return (
    <div className="flex flex-col items-center">
      <Dragger
        {...uploadProps}
        className="rounded-full border-2 border-dashed border-gray-300 bg-gray-50! transition-all hover:border-blue-400! hover:bg-blue-50!"
        style={{ width: 140, height: 140, padding: 0 }}
      >
        <div className="flex h-full flex-col items-center justify-center py-6">
          <Avatar
            size={60}
            icon={<UserOutlined />}
            className="mb-2 bg-gray-200 text-gray-400"
          />
          <p className="px-2 text-xs text-gray-500">点击或拖拽上传头像</p>
        </div>
      </Dragger>
    </div>
  );
}
