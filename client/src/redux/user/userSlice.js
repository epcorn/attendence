import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const createEmployee = createAsyncThunk(
  "createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/employee/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/employee/logout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message, { autoClose: 1000 });
        state.currentUser = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
