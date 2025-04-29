import React, { useEffect, useState } from "react";
import { Layout, Menu, theme, Dropdown, Avatar, Space } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import routes from "@/routes";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useAuthStore from "@/store/useAuthStore";

const { Header, Sider, Content } = Layout;

type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: string;
  children?: MenuItem[];
};

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("/dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderMenuItems = (appRoutes: typeof routes): MenuItem[] => {
    return appRoutes
      .filter((route) => !route.hideInMenu)
      .map((route) => {
        if (route.children) {
          return {
            key: route.path,
            icon: route.icon,
            label: route.name,
            children: renderMenuItems(route.children),
          };
        }

        return {
          key: route.path,
          icon: route.icon,
          label: route.name,
        };
      });
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setActiveKey(key);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人资料",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      handleLogout();
    } else if (key === "profile") {
      navigate("/profile");
    }
  };

  useEffect(() => {
    console.log(location.pathname, "---");
    setActiveKey(location.pathname);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          items={renderMenuItems(routes[0].children!)}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
                style: {
                  fontSize: "18px",
                  padding: "0 24px",
                  cursor: "pointer",
                },
              }
            )}
          </div>
          <div style={{ marginRight: 24 }}>
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                <span>{user?.username || "User"}</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
