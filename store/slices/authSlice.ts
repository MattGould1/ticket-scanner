import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface AuthState {
  token: string | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Replace with your actual API call
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      // const data = await response.json();

      // if (!response.ok) {
      //   return rejectWithValue(data.message);
      // }

      // Store token in AsyncStorage
      // @TODO save this token for further uses
      // await AsyncStorage.setItem("token", data.token);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }

      return rejectWithValue("Unknown Login Error, we've been notified!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      // @TODO remove this token
      // AsyncStorage.removeItem("token");
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
