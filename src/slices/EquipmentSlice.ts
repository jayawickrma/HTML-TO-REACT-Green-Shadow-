import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Services/api.ts"; // Your API service to make requests
import {EquipmentModel} from "../Model/EquipmentModel.ts"; // Your model class for equipment

const initialState = {
    equipment: [] as EquipmentModel[], // State holding the equipment data
};

export type EquipmentRootState = {
    equipment: {
        equipments: Array<{
            equipmentCode: string;
            equipmentName: string;
            equipmentType: string;
            equipmentStatus: string;
            availableCount: string;
            fieldList: string;
        }>;
    };
};


export const saveEquipment = createAsyncThunk(
    "equipment/saveEquipment",
    async (equipment: FormData, { dispatch }) => {
        try {
            const response = await api.post("equipment/saveEquipment", equipment, {
                headers: {
                    "Content-Type": "application/json", // Assuming you're handling images or files
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
    async (equipment: FormData, { dispatch }) => {
        try {
            const response = await api.put(`equipment/updateEquipment/${equipment.get("code")}`, equipment, {
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
    async (equipmentCode: string) => {
        try {
            const response = await api.delete(`equipment/deleteEquipment`,{
                params :{id :equipmentCode},
            });
            return response.data
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
            console.log("all equipment details =======",response.data)
            return response.data;
        } catch (e) {
            console.log("Failed to get all equipment!", e);
            throw e;
        }
    }
);

// The slice for managing equipment data

const equipmentSlice = createSlice({
    name: "equipment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveEquipment.pending, () => {
                console.error("Pending save equipment");
            })
            .addCase(saveEquipment.fulfilled, (state, action) => {
                if (action.payload) {
                    state.equipment = [...state.equipment, action.payload];
                }
            })
            .addCase(saveEquipment.rejected, () => {
                console.error("Rejected save equipment");
            })
            .addCase(updateEquipment.fulfilled, (state, action) => {
                const formData = action.meta.arg;
                const code = formData.get("code") || " ";

                if (!code) {
                    console.error("Error: No code in FormData!");
                    return;
                }
                const index = state.equipment.findIndex(e => e.equipmentCode === code);
                if (index !== -1) {
                    state.equipment[index] = action.payload;
                }
            })
            .addCase(updateEquipment.pending, () => {
                console.log("Pending updating equipment");
            })
            .addCase(updateEquipment.rejected, () => {
                console.log("Rejected updating equipment");
            })
            .addCase(deleteEquipment.fulfilled, (state, action) => {
                state.equipment = state.equipment.filter(e => e.equipmentCode !== action.meta.arg);
            })
            .addCase(deleteEquipment.pending, () => {
                console.log("Pending to delete equipment!");
            })
            .addCase(deleteEquipment.rejected, () => {
                console.log("Rejected to delete equipment");
            })
            .addCase(getAllEquipment.fulfilled, (state, action) => {
                state.equipment = action.payload || [];
            })
            .addCase(getAllEquipment.pending, () => {
                console.log("Pending get all equipment");
            })
            .addCase(getAllEquipment.rejected, () => {
                console.log("Rejected get all equipment");
            });
    },
});

export default equipmentSlice.reducer;
