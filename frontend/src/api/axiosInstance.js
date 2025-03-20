                                        import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, name, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", {
        username,
        name,
        password,
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export default axiosInstance;
