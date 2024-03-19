import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const initialState = {
    workdayStatus: [],
    date: "",
    loading: false,
    error: null,
};

export const workdayStatus = createAsyncThunk('todayAttendence', async (date, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/dayReport/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ date }) });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const togglePresence = createAsyncThunk("markPresent", async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/dayReport/checkIn/${id}`, { method: "POST", headers: { "Content-Type": "application/json" } });
        const result = await response.json();
        console.log(result.result);
        return result;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
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
                state.date = action.payload.date.split("T")[0];
                state.workdayStatus = action.payload.workdayStatus?.checkIns ?? [];
                toast.success(action.payload.message, { autoClose: 1000 });
                state.error = null;
            })
            .addCase(workdayStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(workdayStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                console.log(action.error);
            })
            .addCase(togglePresence.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.workdayStatus.findIndex(item => item.employeeId === action.payload.result.employeeId);
                if (index !== -1) {
                    state.workdayStatus[index] = action.payload.result;
                }
            })
            .addCase(togglePresence.pending, (state) => {
                state.loading = true;
            });
    }
});

export default attendenceSlice.reducer;