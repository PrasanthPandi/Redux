import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API base URL
const API_URL = "http://localhost:5000/api/auth";

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      console.log("Registration Response:", response.data);

      toast.success("Registration successful! Please login.");
      return response.data.user; // Do NOT store user in sessionStorage
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      console.error("Registration Error:", message);
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      console.log("Login Response:", response.data);

      sessionStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login successful!");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid credentials. Please try again.";
      console.error("Login Error:", message);
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("user");
      state.user = null;
      toast.info("Logged out successfully");
      window.location.reload(); // Force UI update
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload;
        // toast.success("Registration successful! Please login.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
