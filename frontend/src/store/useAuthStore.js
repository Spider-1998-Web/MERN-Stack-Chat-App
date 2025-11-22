import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoading: false,
  isUpdatingProfile: false,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ authUser: res.data }); // FIXED 🔥
      toast.success("Account created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  },

  login: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ authUser: res.data });
      toast.success("Welcome!");
    } catch (error) {
      toast.error("Invalid login");
    }
  },


  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");

    }
  },

  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", formData);
      set({authUser: res.data});
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  }  
}));
