"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticateUser, loginUser, logoutUser, registerUser } from "./authApi";

// Reusable function to handle async logic
const handleAsync = (builder, thunkAction, successCallback) => {
  builder
    .addCase(thunkAction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMessage = "";
    })
    .addCase(thunkAction.fulfilled, (state, action) => {
      state.isLoading = false;
      successCallback(state, action);
    })
    .addCase(thunkAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message || "An error occurred";
    });
};

// Async thunks for auth operations
export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await registerUser(userData);
    console.log(response)
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const response = await loginUser(userData);
    return response;
  }
);

export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    const response = await logoutUser();
    return response;
  }
);

export const authenticateUserAsync = createAsyncThunk(
  "auth/authenticateUser",
  async () => {
    const response = await authenticateUser();
    return response;
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLogin: false,
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    // Register User
    handleAsync(builder, registerUserAsync, (state, action) => {
      state.user = action.payload;
    });

    // Login User
    handleAsync(builder, loginUserAsync, (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    });

    // Logout User
    handleAsync(builder, logoutUserAsync, (state) => {
      state.isLogin = false;
      state.user = null;
    });

    // Authenticate User
    handleAsync(builder, authenticateUserAsync, (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
