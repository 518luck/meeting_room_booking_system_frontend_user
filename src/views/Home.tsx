import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Avatar, Dropdown, theme } from 'antd';
import useAuthStore from '@/store/auth';
import useThemeStore from '@/store/theme';
import { createElement } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: <span className="text-app-text">{createElement(icon)}</span>,
    label: `subnav ${key}`,
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Home = () => {
  const setIsDark = useThemeStore((state) => state.setIsDark);
  const { userInfo } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const settingsMenuItems: MenuProps['items'] = [
    {
      key: 'theme',
      label: '主题设置',
      children: [
        {
          key: 'light',
          label: '浅色主题',
          onClick: () => setIsDark(false),
        },
        {
          key: 'dark',
          label: '深色主题',
          onClick: () => setIsDark(true),
        },
      ],
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between bg-gray-900 px-12">
        <div className="flex flex-1 items-center">
          <div className="mr-8 h-8 w-8 rounded bg-blue-500" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
            className="flex-1 border-none bg-transparent"
          />
        </div>

        <div className="flex items-center gap-4">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="cursor-pointer bg-blue-500 transition-all hover:bg-blue-600"
          >
            {userInfo?.username?.[0]?.toUpperCase()}
          </Avatar>

          <Dropdown menu={{ items: settingsMenuItems }} placement="bottomRight">
            <SettingOutlined className="cursor-pointer fill-current text-2xl text-amber-50! transition-all hover:rotate-90 hover:text-blue-400" />
          </Dropdown>
        </div>
      </Header>

      <div className="bg-app-bg px-12 py-0">
        <Breadcrumb
          className="py-4"
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />

        <Layout
          className="rounded-lg bg-white p-6 shadow-sm dark:bg-zinc-900"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{ background: colorBgContainer }}
            width={200}
            className="bg-transparent"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              className="h-full border-none"
              items={items2}
            />
          </Sider>

          <Content className="min-h-[280px] px-6">
            <div className="text-app-text text-lg">Content</div>
          </Content>
        </Layout>
      </div>

      <Footer className="bg-app-bg text-app-text text-center">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
