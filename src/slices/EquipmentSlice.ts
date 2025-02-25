import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Services/api.ts"; // Your API service to make requests
import { EquipmentModel } from "../Model/EquipmentModel.ts"; // Your model class for equipment

const initialState = {
    equipment: [] as EquipmentModel[], // State holding the equipment data
};

export const saveEquipment = createAsyncThunk(
    "equipment/saveEquipment",
    async (equipment: EquipmentModel, { dispatch }) => {
        try {
            const response = await api.post("equipment/addEquipment", equipment, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            dispatch(getAllEquipment());
            return response.data;
        } catch (e) {
            console.error("Failed to save equipment!", e);
            throw e;
        }
    }
);

export const updateEquipment = createAsyncThunk(
    "equipment/updateEquipment",
    async (equipment: EquipmentModel, { dispatch }) => {
        try {
            const response = await api.put(`equipment/updateEquipment/${equipment.equipmentCode}`, equipment, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            dispatch(getAllEquipment());
            return response.data;
        } catch (e) {
            console.error("Failed to update equipment!", e);
            throw e;
        }
    }
);

export const deleteEquipment = createAsyncThunk(
    "equipment/deleteEquipment",
    async (equipmentCode: number) => {
        try {
            const response = await api.delete(`equipment/deleteEquipment`, {
                params: { id: equipmentCode },
            });
            return response.data;
        } catch (e) {
            console.log("Failed to delete equipment!", e);
            throw e;
        }
    }
);

export const getAllEquipment = createAsyncThunk(
    "equipment/getAllEquipment",
    async () => {
        try {
            const response = await api.get("equipment/getAllEquipment");
            return response.data;
        } catch (e) {
            console.log("Failed to get all equipment!", e);
            throw e;
        }
    }
);

const equipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveEquipment.fulfilled, (state, action) => {
                if (action.payload) {
                    state.equipment.push(action.payload);
                }
            })
            .addCase(updateEquipment.fulfilled, (state, action) => {
                const updatedEquipment = action.payload;
                const index = state.equipment.findIndex(
                    (e) => e.equipmentCode === updatedEquipment.equipmentCode // Ensure both are numbers
                );
                if (index !== -1) {
                    state.equipment[index] = updatedEquipment;
                }
            })
            .addCase(deleteEquipment.fulfilled, (state, action) => {
                const code = action.meta.arg; // Ensure this is a number
                state.equipment = state.equipment.filter((e) => e.equipmentCode !== code);
            })
            .addCase(getAllEquipment.fulfilled, (state, action) => {
                state.equipment = action.payload || [];
            });
    },
});

export default equipmentSlice.reducer;