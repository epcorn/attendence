import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const initialState = {
    workdayStatus: null,
    loading: false,
    error: null,
};

export const workdayStatus = createAsyncThunk('todayAttendence', async (date, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/dayReport/status", { method: "GET", body: JSON.stringify({ date }) });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const attendenceSlice = createSlice({
    name: "attendence",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(workdayStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.workdayStatus = action.payload.workdayStatus;
                toast.success(action.payload.message, { autoClose: 1000 });
                state.error = null;
            })
            .addCase(workdayStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(workdayStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default attendenceSlice.reducer;