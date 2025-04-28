import React, { useMemo, useState } from "react";
import { Layout, Menu, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import useAuthStore from "../store/useAuthStore";
import { RouteConfig, routeConfigs } from "../routes";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getMenuItem = (
    route: RouteConfig,
    prefix: string = ""
  ): ItemType<MenuItemType> => {
    return {
      key: [prefix, route.path].join("/"),
      icon: route.icon,
      label: route.label,
      children: route.children
        ? route.children.map((t) =>
            getMenuItem(t, [prefix, route.path].join("/"))
          )
        : undefined,
      onClick: (e) => {
        console.log([prefix, route.path].join("/"), "----", e);

        navigate(e.key);
      },
    };
  };

  // 从routeConfigs中提取菜单项
  const menuItems = useMemo(() => {
    return (
      routeConfigs[0].children
        ?.filter((route) => !route.hideInMenu)
        .map((t) => getMenuItem(t)) || []
    );
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <span style={{ marginLeft: 8 }}>Welcome, {user?.username}</span>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ float: "right", marginRight: 24 }}
          >
            Logout
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
