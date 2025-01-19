import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    vehicles:[]
}

export type RootState = {
    vehicle: {
        vehicles: Array<{
           code: string;
           licensePlateNumber: string;
           vehicleName: string;
           category: string;
           fuelType: string;
           status: string;
           remark: string;
        }>;
    }
};

const VehicleSlice = createSlice({
    name:"vehicle",
    initialState:initialState,
    reducers: {
        addVehicle:(state,action) => {
            state.vehicles.push(action.payload);
        },
        updateVehicle:(state,action) => {
            //@ts-ignore
            const index = state.vehicles.findIndex(v => v.code === action.payload.code)
            if (index !== -1) {
                state.vehicles[index] = action.payload;
            }
        },
        deleteVehicle:(state,action) => {
            //@ts-ignore
            state.vehicles = state.vehicles.filter(v => v.code !== action.payload.code);
        }
    }
});

export const {addVehicle,updateVehicle,deleteVehicle} = VehicleSlice.actions
export default VehicleSlice.reducer;