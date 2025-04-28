import useAuthStore from "@/store/useAuthStore";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// 基础响应类型
export interface BaseResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  code: number;
}

// 分页请求参数类型
export interface PaginationParams {
  page: number;
  limit: number;
  [key: string]: any;
}

// 分页响应数据类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL || "http://127.0.0.1:9981/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    return Promise.reject(new Error(response.data?.message || "Error"));
  },
  (error) => {
    let message = "Request failed";
    if (error.response) {
      switch (error.response.status) {
        case 401:
          useAuthStore.getState().logout();
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          message = "Authentication failed";
          break;
        case 403:
          message = "Access denied";
          break;
        case 500:
          message = "Internal server error";
          break;
        default:
          message = error.response.data?.message || "Unknown error";
      }
    }
    return Promise.reject(new Error(message));
  }
);

// 请求工具类
export const request = {
  get<T>(url: string, params?: object): Promise<BaseResponse<T>> {
    return service
      .get<BaseResponse<T>>(url, { params })
      .then((res) => res.data);
  },

  post<T>(url: string, data?: object): Promise<BaseResponse<T>> {
    return service.post<BaseResponse<T>>(url, data).then((res) => res.data);
  },

  put<T>(url: string, data?: object): Promise<BaseResponse<T>> {
    return service.put<BaseResponse<T>>(url, data).then((res) => res.data);
  },

  delete<T>(url: string, params?: object): Promise<BaseResponse<T>> {
    return service
      .delete<BaseResponse<T>>(url, { params })
      .then((res) => res.data);
  },
};

export default service;
