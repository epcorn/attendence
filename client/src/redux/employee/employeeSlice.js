import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { workdayStatus } from '../attendence/attendenceSlice';
import { toast } from 'react-toastify';

const initialState = {
    employees: [],
    loading: false,
    error: null,
};

export const getEmployees = createAsyncThunk(
    "getEmployees",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/employee/");
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload.result;
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
            });
    },
});

export default employeeSlice.reducer;