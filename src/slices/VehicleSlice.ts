import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VehicleModel from "../Model/VehicleModel";
import { api } from "../Services/api";

interface VehicleState {
    vehicles: VehicleModel[];
}

const initialState: VehicleState = {
    vehicles: [],
};

// Fetch all vehicles
export const getAllVehicles = createAsyncThunk("vehicle/getAll", async () => {
    const response = await api.get("/vehicle/getAllVehicles");
    console.log(response.data)
    return response.data;
});

// Save a new vehicle
export const saveVehicle = createAsyncThunk("vehicle/save", async (vehicle: VehicleModel, { dispatch }) => {
    await api.post("/vehicle/saveVehicle", vehicle);
    dispatch(getAllVehicles());
});

// Update vehicle
export const updateVehicle = createAsyncThunk("vehicle/update", async (vehicle: VehicleModel, { dispatch }) => {
    await api.put(`/vehicle/updateVehicle/${vehicle.vehicleCode}`, vehicle);
    dispatch(getAllVehicles());
});

// Delete vehicle
export const deleteVehicle = createAsyncThunk("vehicle/delete", async (vehicleCode: string, { dispatch }) => {
    await api.delete(`/vehicle/deleteVehicle/${vehicleCode}`);
    dispatch(getAllVehicles());
});

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload;
            })
            .addCase(saveVehicle.fulfilled, (state, action) => {
                state.vehicles.push(action.meta.arg);
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const index = state.vehicles.findIndex(v => v.vehicleCode === action.meta.arg.vehicleCode);
                if (index !== -1) state.vehicles[index] = action.meta.arg;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.vehicles = state.vehicles.filter(v => v.vehicleCode !== action.meta.arg);
            });
    },
});

export default vehicleSlice.reducer;
