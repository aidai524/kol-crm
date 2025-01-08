import { storageStore } from "@/utils";
import { create } from "zustand";

const authStorage = storageStore("auth");

interface AuthState {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: authStorage?.get("token") || undefined,
  setToken: (token) => {
    authStorage?.set("token", token);
    set({ token });
  },
}));
