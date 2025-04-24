import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

type ResponseData<T> = {
  success: boolean;
  message?: string;
  data?: T;
  code: number;
};

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL || "http://127.0.0.1:9981/api",
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 这里可以添加token逻辑
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
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
          if (window.location.pathname !== "/login")
            window.location.href = "/login";
          message = "Authentication failed";
          break;
        case 403:
          message = "Access denied";
          break;
        case 500:
          message = "Internal server error";
          break;
      }
    }
    alert(error.response.data?.message || message);
    return Promise.reject(new Error(message));
  }
);

export default service;

export const request = {
  get<T>(url: string, params?: object) {
    return service.get<ResponseData<T>>(url, { params });
  },
  post<T>(url: string, data?: object) {
    return service.post<ResponseData<T>>(url, data);
  },
  put<T>(url: string, data?: object) {
    return service.put<ResponseData<T>>(url, data);
  },
  delete<T>(url: string, params?: object) {
    return service.delete<ResponseData<T>>(url, { params });
  },
};
