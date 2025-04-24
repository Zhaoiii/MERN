import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { token } = useAuthStore();
  const location = useLocation();

  // 如果用户未登录且不在登录或注册页面，重定向到登录页
  if (!token && !["/login", "/register"].includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果用户已登录且在登录或注册页面，重定向到仪表盘
  if (token && ["/login", "/register"].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
