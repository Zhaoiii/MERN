import { request } from "@/utils/request";

export type Student = {
  _id: string;
  studentId: string;
  name: string;
  age: number;
  grade: string;
  major: string;
  email: string;
  phone: string;
};

export const getStudents = async (
  params: RequestWithPagination<{ keyword?: string }>
) => {
  return request.get<ResponseWithPagination<Student[]>>("/students", params);
};

export const createStudent = async (data: Student) => {
  return request.post<Student>("/students", data);
};

export const updateStudent = async (id: string, data: Partial<Student>) => {
  return request.put<Student>(`/students/${id}`, data);
};

export const deleteStudent = async (id: string) => {
  return request.delete<Student>(`/students/${id}`);
};
