import { request } from "../utils/request";

type LoginParams = {
  username: string;
  password: string;
};

type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

type User = {
  id: string;
  username: string;
  email: string;
};

type LoginResponse = {
  user: User;
  token: string;
};

export const authService = {
  async login(params: LoginParams) {
    const response = await request.post<LoginResponse>("/auth/login", params);
    return response.data;
  },

  async register(params: RegisterParams) {
    const response = await request.post<User>("/auth/register", params);
    return response.data;
  },

  async getProfile() {
    const response = await request.get<User>("/auth/profile");
    return response.data;
  },
};
