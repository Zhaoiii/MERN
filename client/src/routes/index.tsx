import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React from "react";
import { lazy } from "react";

export interface RouteConfig {
  path: string;
  name: string;
  icon?: React.ReactNode;
  Component?: React.LazyExoticComponent<any>;
  children?: RouteConfig[];
  hideInMenu?: boolean;
  hideInBread?: boolean;
  auth?: string[];
  requireAuth?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Management",
    icon: <UserOutlined />,
    Component: lazy(() => import("@/layouts/AdminLayout")),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: <DashboardOutlined />,
        Component: lazy(() => import("@/pages/Dashboard")),
      },
      {
        path: "/user",
        name: "User",
        icon: <UserOutlined />,
        Component: lazy(() => import("@/pages/user")),
        children: [
          {
            path: "/user/list",
            name: "User List",
            Component: lazy(() => import("@/pages/user/UserList")),
          },
          {
            path: "/user/profile",
            name: "User Profile",
            Component: lazy(() => import("@/pages/user/Profile")),
            // hideInMenu: true,
          },
        ],
      },
      {
        path: "/settings",
        name: "Settings",
        icon: <SettingOutlined />,
        Component: lazy(() => import("@/pages/Settings")),
      },
      {
        path: "*",
        name: "NotFound",
        hideInMenu: true,
        Component: lazy(() => import("@/pages/NotFound")),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    Component: lazy(() => import("@/pages/Login")),
    requireAuth: false,
  },
  {
    path: "/register",
    name: "Register",
    Component: lazy(() => import("@/pages/Register")),
    requireAuth: false,
  },
  {
    path: "*",
    name: "NotFound",
    Component: lazy(() => import("@/pages/NotFound")),
  },
];

export default routes;
