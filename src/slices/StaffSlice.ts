import StaffModel from "../model/StaffModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialStaffs : StaffModel[] = []

const staffSlice = createSlice({
    name : 'staff',
    initialState : initialStaffs,
    reducers :{
        addStaff: (state, action) => {
            state.push(action.payload);
        },
        updateStaff: (state, action) => {
            const index = state.findIndex(staff => staff.staff_id === action.payload.staff_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        deleteStaff: (state, action) => {
            return state.filter(staff => staff.staff_id !== action.payload.staff_id);
        }
    }
})

export const {addStaff, updateStaff, deleteStaff} = staffSlice.actions;
export default staffSlice.reducer;