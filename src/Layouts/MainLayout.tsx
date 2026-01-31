import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Avatar, Dropdown, theme } from 'antd';
import useAuthStore from '@/store/auth';
import useThemeStore from '@/store/theme';
import { Outlet, useNavigate } from 'react-router-dom';
import meetingRoutes from '@/routers/meeting';

const { Header, Content, Footer, Sider } = Layout;

// 从路由文件过滤数组进行跳转
const menuItems: MenuProps['items'] = meetingRoutes.map((item) => {
  // 其实还可以在路由的handle中添加一个属性,来指定菜单的label
  // 有子路由,则递归处理
  const childrenItems = item.children
    ? item.children.map((child) => ({
        key: child.path,
        label: child.handle?.label,
      }))
    : [];

  return {
    key: item.path || Math.random().toString(36).substring(2),
    label: item.handle?.label,
    children:
      childrenItems && childrenItems.length > 0
        ? childrenItems
        : (undefined as MenuProps['items']),
  };
});

const MainLayout = () => {
  const setIsDark = useThemeStore((state) => state.setIsDark);
  const navigate = useNavigate();

  // 处理菜单点击事件 (进行跳转)
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

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
    <Layout className="flex min-h-screen flex-col">
      <Header className="flex items-center justify-between bg-gray-900 px-12">
        <div className="flex flex-1 items-center"></div>

        <div className="flex items-center gap-4">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            className="cursor-pointer bg-blue-500/50 transition-all hover:bg-blue-600"
            onClick={() => navigate('/update-info')}
          >
            {userInfo?.username?.[0]?.toUpperCase()}
          </Avatar>

          <Dropdown menu={{ items: settingsMenuItems }} placement="bottomRight">
            <SettingOutlined className="cursor-pointer fill-current text-2xl text-amber-50! transition-all hover:rotate-90 hover:text-blue-400" />
          </Dropdown>
        </div>
      </Header>

      <div className="bg-app-bg flex flex-1 flex-col px-12 py-0">
        <Breadcrumb
          className="py-4"
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />

        <Layout
          className="rounded-lg p-6 shadow-sm dark:bg-zinc-900"
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
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Sider>

          <Content className="min-h-[280px] px-6">
            {/* <div className="text-app-text text-lg">Content</div> */}
            <Outlet />
          </Content>
        </Layout>
      </div>

      <Footer className="bg-app-bg text-app-text text-center">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
