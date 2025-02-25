import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Services/api.ts"; // Ensure correct API import
import logModel from "../Model/LogModel.ts";

// ✅ Fetch Logs from API
export const fetchLogs = createAsyncThunk(
    "logs/fetchLogs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("log/getAllPosts");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch logs");
        }
    }
);

// ✅ Create a new log
export const createLog = createAsyncThunk(
    "logs/createLog",
    async (logData: logModel, { rejectWithValue }) => {
        try {
            const response = await api.post("log/addLog", logData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to create log");
        }
    }
);

// ✅ Update a log
export const updateLog = createAsyncThunk(
    "logs/updateLog",
    async ({ logCode, updatedData }: { logCode: string; updatedData: Partial<logModel> }, { rejectWithValue }) => {
        try {
            const response = await api.put(`log/updateLog/${logCode}`, updatedData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update log");
        }
    }
);

// ✅ Delete a log
export const deleteLog = createAsyncThunk(
    "logs/deleteLog",
    async (logCode: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`log/deleteLog`, {
                params: { id: logCode },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete log");
        }
    }
);

// 🔹 Initial State
const initialState = {
    logs: [] as logModel[],
    loading: false,
    error: null as string | null,
};

// 🔥 Log Slice with API Integration
const logSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Logs
            .addCase(fetchLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.logs = action.payload;
                state.loading = false;
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Create Log
            .addCase(createLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLog.fulfilled, (state, action) => {
                state.logs.push(action.payload);
                state.loading = false;
            })
            .addCase(createLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update Log
            .addCase(updateLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLog.fulfilled, (state, action) => {
                const index = state.logs.findIndex((log) => log.logCode === action.payload.logCode);
                if (index !== -1) {
                    state.logs[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Log
            .addCase(deleteLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLog.fulfilled, (state, action) => {
                state.logs = state.logs.filter((log) => log.logCode !== action.payload);
                state.loading = false;
            })
            .addCase(deleteLog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default logSlice.reducer;