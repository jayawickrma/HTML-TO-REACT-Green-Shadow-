import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    staffs:[]
}

export type RootState = {
    staff: {
        staffs: Array<{
            code: string;
            firstName: string;
            lastName: string;
            joinedDate: string;
            designation:string;
            gender:string;
            dob:string;
            addressLine01:string;
            addressLine02:string;
            addressLine03:string;
            addressLine04:string;
            addressLine05:string;
            mobile:string;
            email:string;
            role:string;
        }>;
    };
};

const StaffSlice = createSlice({
    name:"staff",
    initialState:initialState,
    reducers:{
        addStaff:(state,action)=>{
            state.staffs.push(action.payload);
        },
        updateStaff:(state,action)=>{
            //@ts-ignore
            const index = state.staffs.findIndex(s => s.code === action.payload.code);
            if (index !== -1) {
                state.staffs[index] = action.payload;
            }
        },
        deleteStaff:(state,action)=>{
            //@ts-ignore
            state.staffs = state.staffs.filter(s => s.code !== action.payload.code);
        }
    }
})

export const {addStaff,updateStaff,deleteStaff} = StaffSlice.actions;
export default StaffSlice.reducer;