import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Services/api.ts";
import Staff from "../Model/StaffModel.ts";

const initialState: { staffs: Staff[] } = {
    staffs: [],
};

export type StaffRootState = {
    staff: {
        staffs: Array<Staff>;
    };
};

export const saveStaff = createAsyncThunk(
    "staff/saveStaff",
    async (staff: Staff, { dispatch }) => {
        try {
            const response = await api.post("staff/saveStaff", staff);
            dispatch(getAllStaffs());
            return response.data;
        } catch (e) {
            console.error("Failed to save staff!", e);
            throw e;
        }
    }
);

export const updateStaff = createAsyncThunk(
    "staff/updateStaff",
    async (staff: Staff, { dispatch }) => {
        try {
            const response = await api.put(`staff/updateStaff/${staff.memberCode}`, staff);
            dispatch(getAllStaffs());
            return response.data;
        } catch (e) {
            console.error("Failed to update staff!", e);
            throw e;
        }
    }
);

export const deleteStaff = createAsyncThunk(
    "staff/deleteStaff",
    async (memberCode: string) => {
        try {
            return await api.delete(`staff/deleteStaff/${memberCode}`);
        } catch (e) {
            console.log("Failed to delete staff!", e);
            throw e;
        }
    }
);

export const getAllStaffs = createAsyncThunk(
    "staff/getAllStaffs",
    async () => {
        try {
            const response = await api.get("staff/getAllStaff");
            console.log(response.data)
            return response.data;
        } catch (e) {
            console.log("Failed to get all staff!", e);
            throw e;
        }
    }
);

const staffSlice = createSlice({
    name: "staffs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveStaff.fulfilled, (state, action) => {
                if (action.payload) {
                    state.staffs = [...state.staffs, action.payload];
                }
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                const updatedStaff = action.payload;
                const index = state.staffs.findIndex(s => s.memberCode === updatedStaff.memberCode);
                if (index !== -1) {
                    state.staffs[index] = updatedStaff;
                }
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.staffs = state.staffs.filter(s => s.memberCode !== action.meta.arg);
            })
            .addCase(getAllStaffs.fulfilled, (state, action) => {
                state.staffs = action.payload || [];
            });
    },
});

export default staffSlice.reducer;
