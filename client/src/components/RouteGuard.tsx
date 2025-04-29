import React from "react";
import { Navigate, useLocation, useRouteLoaderData } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import appRoutes from "@/routes";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { token } = useAuthStore();
  const location = useLocation();

  // 查找当前路径对应的路由配置
  const findRouteByPath = (
    path: string,
    routes: typeof appRoutes
  ): (typeof appRoutes)[0] | undefined => {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }

      if (route.children) {
        const childRoute = findRouteByPath(path, route.children);
        if (childRoute) {
          return childRoute;
        }
      }
    }
    return undefined;
  };

  const currentPath = location.pathname;
  const currentRoute = findRouteByPath(currentPath, appRoutes);

  // 如果路由配置了 requireAuth: false，则不需要认证
  const requireAuth = currentRoute?.requireAuth !== false;

  // 如果需要认证但用户未登录，重定向到登录页
  if (requireAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果不需要认证（如登录页、注册页）但用户已登录，重定向到首页
  if (!requireAuth && token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
