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
    return await request.post<LoginResponse>("/auth/login", params);
  },

  async register(params: RegisterParams) {
    return await request.post<User>("/auth/register", params);
  },

  async getProfile() {
    return await request.get<User>("/auth/profile");
  },
};
