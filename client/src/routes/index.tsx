import React from "react";
import AdminLayout from "../layout/AdminLayout";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { RouteObject } from "react-router-dom";

export interface RouteConfig {
  key?: string;
  icon?: React.ReactNode;
  label?: string;
  path: string;
  Component?: React.ComponentType;
  children?: RouteConfig[];
  hideInMenu?: boolean;
}

export const routeConfigs: RouteConfig[] = [
  {
    path: "/",
    Component: AdminLayout,
    hideInMenu: true,
    children: [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "仪表盘",
        path: "dashboard",
        Component: React.lazy(() => import("../pages/Dashboard")),
      },
      {
        key: "users",
        icon: <TeamOutlined />,
        label: "用户管理",
        path: "users",
        Component: React.lazy(() => import("../pages/NotFound")),
      },
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "个人信息",
        path: "profile",
        Component: React.lazy(() => import("../pages/Profile")),
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "系统设置",
        path: "settings",
        Component: React.lazy(() => import("../pages/NotFound")),
      },
      {
        key: "404",
        path: "*",
        Component: React.lazy(() => import("../pages/NotFound")),
        hideInMenu: true,
      },
    ],
  },
  {
    path: "/login",
    Component: React.lazy(() => import("../pages/Login")),
    hideInMenu: true,
  },
  {
    path: "/register",
    Component: React.lazy(() => import("../pages/Register")),
    hideInMenu: true,
  },
  {
    path: "*",
    Component: React.lazy(() => import("../pages/NotFound")),
    hideInMenu: true,
  },
];

const routes: RouteObject[] = routeConfigs.map((route) => {
  const { path, Component, children, ...rest } = route;
  return {
    path,
    Component,
    children: children
      ? children.map((child) => ({ ...child, path: `${path}/${child.path}` }))
      : undefined,
    ...rest,
  };
});

export default routes;
