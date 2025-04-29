import { authService } from "@/services/auth";
import { create } from "zustand";
import { message } from "antd";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (query: {
    username: string;
    password: string;
  }) => Promise<{ isSuccess: boolean; error: string | null }>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  login: async (query: { username: string; password: string }) => {
    const result = await authService.login(query);

    if (result.isSuccess && result.data) {
      const { token, user } = result.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ token, user });
      return { isSuccess: true, error: null };
    } else {
      return { isSuccess: false, error: result.error };
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
