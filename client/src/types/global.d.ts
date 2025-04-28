// 声明一些公共的类型

export type RequestWithPagination<T = unknown> = {
  page: number;
  limit: number;
} & T;

export type ResponseWithPagination<T = unknown> = {
  data: T;
  total: number;
  page: number;
  limit: number;
};
