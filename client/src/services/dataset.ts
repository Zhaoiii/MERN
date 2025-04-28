import request from "../utils/request";
import {
  PaginationParams,
  PaginatedResponse,
  BaseResponse,
} from "../utils/request";

// 数据集类型定义
export interface Dataset {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// 维度类型定义
export interface Dimension {
  _id: string;
  name: string;
  dataset: Dataset;
  createdAt: string;
  updatedAt: string;
}

// 规则类型定义
export interface Rule {
  _id: string;
  name: string;
  dimension: Dimension;
  createdAt: string;
  updatedAt: string;
}

// 数据集管理
export const getDatasets = (params: PaginationParams) =>
  request
    .get<PaginatedResponse<Dataset>>("/dataset", { params })
    .then((res) => res.data);

export const createDataset = (data: Pick<Dataset, "name">) =>
  request.post<Dataset>("/dataset", data).then((res) => res.data);

export const updateDataset = (id: string, data: Pick<Dataset, "name">) =>
  request.put<Dataset>(`/dataset/${id}`, data).then((res) => res.data);

export const deleteDataset = (id: string) =>
  request.delete<{ message: string }>(`/dataset/${id}`).then((res) => res.data);

// 维度管理
export const getDimensions = (params: PaginationParams) =>
  request
    .get<PaginatedResponse<Dimension>>("/dimension", { params })
    .then((res) => res.data);

export const createDimension = (data: Pick<Dimension, "name" | "dataset">) =>
  request.post<Dimension>("/dimension", data).then((res) => res.data);

export const updateDimension = (
  id: string,
  data: Pick<Dimension, "name" | "dataset">
) => request.put<Dimension>(`/dimension/${id}`, data).then((res) => res.data);

export const deleteDimension = (id: string) =>
  request
    .delete<{ message: string }>(`/dimension/${id}`)
    .then((res) => res.data);

// 规则管理
export const getRules = (params: PaginationParams) =>
  request
    .get<PaginatedResponse<Rule>>("/rule", { params })
    .then((res) => res.data);

export const createRule = (data: Pick<Rule, "name" | "dimension">) =>
  request.post<Rule>("/rule", data).then((res) => res.data);

export const updateRule = (
  id: string,
  data: Pick<Rule, "name" | "dimension">
) => request.put<Rule>(`/rule/${id}`, data).then((res) => res.data);

export const deleteRule = (id: string) =>
  request.delete<{ message: string }>(`/rule/${id}`).then((res) => res.data);
