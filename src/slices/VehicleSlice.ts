import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Services/api"; // Your API service to make requests
import  VehicleModel  from "../Model/VehicleModel"; // Your model class for vehicles

const initialState = {
    vehicles: [] as VehicleModel[], // State holding the vehicle data
};

// Fetch all vehicles
export const getAllVehicles = createAsyncThunk(
    "vehicle/getAllVehicles",
    async () => {
        try {
            const response = await api.get("vehicle/getAllVehicles");
            return response.data;
        } catch (e) {
            console.error("Failed to fetch vehicles!", e);
            throw e;
        }
    }
);

// Save a new vehicle
export const saveVehicle = createAsyncThunk(
    "vehicle/saveVehicle",
    async (vehicle: VehicleModel, { dispatch }) => {
        try {
            const response = await api.post("vehicle/saveVehicle", vehicle, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            dispatch(getAllVehicles()); // Refresh the list after saving
            return response.data;
        } catch (e) {
            console.error("Failed to save vehicle!", e);
            throw e;
        }
    }
);

// Update vehicle
export const updateVehicle = createAsyncThunk(
    "vehicle/updateVehicle",
    async (vehicle: VehicleModel, { dispatch }) => {
        try {
            const response = await api.put(`vehicle/updateVehicle/${vehicle.vehicleCode}`, vehicle, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            dispatch(getAllVehicles()); // Refresh the list after updating
            return response.data;
        } catch (e) {
            console.error("Failed to update vehicle!", e);
            throw e;
        }
    }
);

// Delete vehicle
export const deleteVehicle = createAsyncThunk(
    "vehicle/deleteVehicle",
    async (vehicleCode: string) => {
        try {
            const response = await api.delete(`vehicle/deleteVehicle`,{
                params:{id: vehicleCode}
            });
            return response.data
        } catch (e) {
            console.error("Failed to delete vehicle!", e);
            throw e;
        }
    }
);

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all vehicles
            .addCase(getAllVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload || [];
            })

            // Save a new vehicle
            .addCase(saveVehicle.fulfilled, (state, action) => {
                if (action.payload) {
                    state.vehicles.push(action.payload);
                }
            })

            // Update vehicle
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const updatedVehicle = action.payload;
                const index = state.vehicles.findIndex(
                    (v) => v.vehicleCode === updatedVehicle.vehicleCode
                );
                if (index !== -1) {
                    state.vehicles[index] = updatedVehicle;
                }
            })

            // Delete vehicle
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                const vehicleCode = action.payload;
                state.vehicles = state.vehicles.filter((v) => v.vehicleCode !== vehicleCode);
            });
    },
});

export default vehicleSlice.reducer;