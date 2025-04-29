import useAuthStore from "@/store/useAuthStore";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";

// 基础响应类型
interface BaseResponse<T> {
  success: boolean;
  message?: string;
  code: number;
  data: T;
}

// 分页数据类型
interface PaginationData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 分页响应类型
interface PaginationResponse<T> extends BaseResponse<PaginationData<T>> {}

// 普通响应类型
interface NormalResponse<T> extends BaseResponse<T> {}

// 请求配置类型
interface RequestConfig extends Omit<AxiosRequestConfig, "url" | "method"> {
  showError?: boolean; // 是否显示错误消息
}

// 请求结果类型
interface RequestResult<T> {
  isSuccess: boolean;
  data: T | null;
  error: string | null | unknown;
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL || "http://127.0.0.1:9981/api",
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
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

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "Request failed";

    if (error.response) {
      switch (error.response.status) {
        case 401:
          useAuthStore.getState().logout();
          if (window.location.pathname !== "/login")
            window.location.href = "/login";
          errorMessage = "Authentication failed";
          break;
        case 403:
          errorMessage = "Access denied";
          break;
        case 500:
          errorMessage = "Internal server error";
          break;
        default:
          errorMessage = error.response.data?.message || errorMessage;
      }
    }

    return Promise.reject(new Error(errorMessage));
  }
);

// 处理响应数据
const handleResponse = <T>(
  response: AxiosResponse<BaseResponse<T>>
): RequestResult<T> => {
  const { data } = response;

  if (data.success) {
    return {
      isSuccess: true,
      data: data.data,
      error: null,
    };
  }

  return {
    isSuccess: false,
    data: null,
    error: data.message || "Request failed",
  };
};

// 处理错误
const handleError = <T>(
  error: unknown,
  showError: boolean = true
): RequestResult<T> => {
  const errorMessage = error || "Request failed";

  if (showError) {
    message.error(errorMessage as any);
  }

  return {
    isSuccess: false,
    data: null,
    error: errorMessage,
  };
};

const request = {
  async get<T>(url: string, config?: RequestConfig): Promise<RequestResult<T>> {
    try {
      const response = await service.get<NormalResponse<T>>(url, config);
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error, config?.showError);
    }
  },

  async post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<RequestResult<T>> {
    try {
      const response = await service.post<NormalResponse<T>>(url, data, config);
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error, config?.showError);
    }
  },

  async put<T>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<RequestResult<T>> {
    try {
      const response = await service.put<NormalResponse<T>>(url, data, config);
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error, config?.showError);
    }
  },

  async delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<RequestResult<T>> {
    try {
      const response = await service.delete<NormalResponse<T>>(url, config);
      return handleResponse<T>(response);
    } catch (error) {
      return handleError(error, config?.showError);
    }
  },
};

export default service;
export { request };
