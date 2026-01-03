import { create } from "zustand";
import { api } from "@/lib/api";
import {User} from "../Type/user";

interface UserState {
  users: User[];
  total: number;
  fetchUsers: (limit: number, skip: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  total: 0,

  fetchUsers: async (limit, skip) => {
    const res = await api.get(`/users?limit=${limit}&skip=${skip}`);
    set({ users: res.data.users, total: res.data.total });
  },

  searchUsers: async (query) => {
    const res = await api.get(`/users/search?q=${query}`);
    set({ users: res.data.users, total: res.data.total });
  },
}));
