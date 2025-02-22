// VehicleSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VehicleModel from "../Model/VehicleModel";  // Import VehicleModel
import { api } from "../Services/api"; // Assuming you have an Axios instance configured for API calls

// Initial state for vehicle data
const initialState: { vehicles: VehicleModel[] } = {
    vehicles: [],
};

// Async Thunks for Vehicle operations

// Save Vehicle
export const saveVehicle = createAsyncThunk(
    "vehicle/saveVehicle",
    async (vehicle: VehicleModel, { dispatch }) => {
        try {
            const response = await api.post("/vehicle/saveVehicle", vehicle, {
                headers: { "Content-Type": "application/json" },
            });
            dispatch(getAllVehicles());
            return response.data;
        } catch (e) {
            console.error("Failed to save vehicle!", e);
            throw e; // Propagate error
        }
    }
);

// Update Vehicle
export const updateVehicle = createAsyncThunk(
    "vehicle/updateVehicle",
    async (vehicle: VehicleModel, { dispatch }) => {
        try {
            const response = await api.put(`/vehicle/updateVehicle/${vehicle.vehicleCode}`, vehicle, {
                headers: { "Content-Type": "application/json" },
            });
            dispatch(getAllVehicles());
            return response.data;
        } catch (e) {
            console.error("Failed to update vehicle!", e);
            throw e; // Propagate error
        }
    }
);

// Delete Vehicle
export const deleteVehicle = createAsyncThunk(
    "vehicle/deleteVehicle",
    async (vehicleCode: string, { dispatch }) => {
        try {
            await api.delete(`/vehicle/deleteVehicle/${vehicleCode}`);
            dispatch(getAllVehicles()); // Fetch updated vehicle list after deletion
        } catch (e) {
            console.error("Failed to delete vehicle!", e);
            throw e; // Propagate error
        }
    }
);

// Get All Vehicles
export const getAllVehicles = createAsyncThunk(
    "vehicle/getAllVehicles",
    async () => {
        try {
            const response = await api.get("/vehicle/getAllVehicles");
            console.log(response.data)
            return response.data;
        } catch (e) {
            console.error("Failed to fetch all vehicles!", e);
            throw e; // Propagate error
        }
    }
);

// Vehicle Slice
const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Save Vehicle
            .addCase(saveVehicle.fulfilled, (state, action) => {
                state.vehicles.push(action.payload); // Add the new vehicle to the state
            })

            // Update Vehicle
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const updatedVehicle = action.payload;
                const index = state.vehicles.findIndex((v) => v.vehicleCode === updatedVehicle.vehicleCode);
                if (index !== -1) {
                    state.vehicles[index] = updatedVehicle; // Update the existing vehicle
                }
            })

            // Delete Vehicle
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                const vehicleCode = action.meta.arg;
                state.vehicles = state.vehicles.filter((vehicle) => vehicle.vehicleCode !== vehicleCode);
            })

            // Get All Vehicles
            .addCase(getAllVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload || [];
            });
    },
});

export default vehicleSlice.reducer;
