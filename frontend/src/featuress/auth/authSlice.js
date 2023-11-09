import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  isLoading: true,
  message: "",
};

// Register user
export const register = createAsyncThunk("auth/register", async (user) => {
  try {
    return await authService.register(user);
  } catch (error) {
    return null;
  }
});

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return null;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const validateUser = createAsyncThunk("auth/validate-user", async () => {
  return await authService.validateUser();
});

export const authSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
        state.message = "";
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.message = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = true;
        state.user = null;
        state.message = "";
      })
      .addCase(validateUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.message = "";
      })
      .addCase(validateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.message = "";
      })
      .addCase(validateUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.message = "";
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
