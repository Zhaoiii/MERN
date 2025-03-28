import { authService } from "@/services/auth";
import { create } from "zustand";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (query: { username: string; password: string }) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  login: async (query: { username: string; password: string }) => {
    const res = await authService.login(query);
    if (!res.success) throw new Error(res.message);
    const { token, user } = res.data ?? {};
    if (!token || !user) throw new Error("登录失败");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
