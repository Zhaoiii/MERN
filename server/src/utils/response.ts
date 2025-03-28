// 定义响应接口
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  code: number;
}

// 响应处理类
export class ResponseHandler {
  // 成功响应
  static success<T>(data: T, message = "", code = 200): ApiResponse<T> {
    return {
      success: true,
      data,
      code,
    };
  }

  // 错误响应
  static error(message: string, code = 400, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
      code,
    };
  }

  // 未找到资源响应
  static notFound(message = "Resource not found"): ApiResponse {
    return this.error(message, 404);
  }

  // 服务器错误响应
  static serverError(message = "Internal server error"): ApiResponse {
    return this.error(message, 500);
  }

  // 未授权响应
  static unauthorized(message = "Unauthorized access"): ApiResponse {
    return this.error(message, 401);
  }

  // 参数验证错误响应
  static validationError(message = "Validation failed"): ApiResponse {
    return this.error(message, 422);
  }
}
