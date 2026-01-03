// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   login: async (credentials) => {
//     const res = await fetch("https://dummyjson.com/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });
//     const data = await res.json();
//     set({ user: data, token: data.token });
//   },
//   logout: () => set({ user: null, token: null }),
// }));

import { create } from "zustand";
import {User} from "../Type/user";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (username, password) => {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      redirect: "manual" 
    });
    
    const data = await res.json();
    
    set({ user: data.username, token: data.accessToken });
    localStorage.setItem("token", data.accessToken);
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
