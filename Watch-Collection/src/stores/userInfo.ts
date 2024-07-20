import { checkToken } from "@/models/member";
import { create } from "zustand";

interface UserInfo {
  user: checkToken | null;
  setUser: (user: checkToken | null) => void;
}

export const useUserZustand = create<UserInfo>((set) => {
  return {
    user: null,
    setUser: (user) => {
      set({ user });
    },
  };
});
