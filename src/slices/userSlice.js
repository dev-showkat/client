import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlert } from "./alertSlice";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "user/register",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "http://localhost:8000/api/users/register",
        user
      );
      localStorage.setItem("token", data.token);
      dispatch(
        showAlert({
          message: "Account created successfully!",
          severity: "success",
        })
      );
      return data;
    } catch (error) {
      const err = error?.response?.data?.message || error?.message;
      dispatch(
        showAlert({
          message: err || error?.message || "Something went wrong",
          severity: "error",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "http://localhost:8000/api/users/login",
        credentials
      );
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      const err = error?.response?.data?.message || error?.message;
      dispatch(
        showAlert({
          message: err || error?.message || "Something went wrong",
          severity: "error",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get(
        "http://localhost:8000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      const err = error?.response?.data?.message || error?.message;
      dispatch(
        showAlert({
          message: err || error?.message || "Something went wrong",
          severity: "error",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    dispatch(
      showAlert({ message: "Logged out successfully", severity: "info" })
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(register.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(fetchProfile.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
      });
  },
});

export default userSlice.reducer;
