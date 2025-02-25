import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Services/api.ts";
import FieldModel from "../Model/FieldModel.ts";

// Initial State with proper typing
const initialState: { fields: FieldModel[] } = {
    fields: [],
};

// RootState type definition for typing the Redux store state
export type FieldRootState = {
    field: {
        fields: Array<{
            fieldCode:string;
            fieldName:string;
            fieldLocation:string;
            fieldExtentSize:string;
            fieldImage:File|null;
            equipmentList:string;
            cropList:string;
            logList:string;
        }>;
    };
};

// Async Thunks for Field operations

// Save Field
export const saveField = createAsyncThunk(
    "field/saveField",
    async (field: FormData, { dispatch }) => {
        try {
            const response = await api.post("field/addField", field, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // Fetch the updated list of fields after successful save
            dispatch(getAllFields());
            return response.data;
        } catch (e) {
            console.error("Failed to save field!", e);
            throw e; // Propagate error to the caller
        }
    }
);

// Update Field
export const updateField = createAsyncThunk(
    "field/updateField",
    async (field: FormData, { dispatch }) => {
        try {
            const response = await api.put(
                `field/updateField/${field.get("fieldCode")}`,
                field,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            // Fetch the updated list of fields after successful update
            dispatch(getAllFields());
            return response.data;
        } catch (e) {
            console.error("Failed to update field!", e);
            throw e; // Propagate error to the caller
        }
    }
);

// Delete Field
export const deleteField = createAsyncThunk(
    "field/deleteField",
    async (fieldCode: string) => {
        try {
            const response= await api.delete(`field/deleteField`,{
                params:{id:fieldCode}
            });
            return  response.data
        } catch (e) {
            console.error("Failed to delete field!", e);
            throw e; // Propagate error to the caller
        }
    }
);

// Get All Fields
export const getAllFields = createAsyncThunk(
    "field/getAllFields",
    async () => {
        try {
            const response = await api.get("field/getAllField");
            console.log("Fetched Fields:", response.data);
            return response.data;
        } catch (e) {
            console.error("Failed to fetch all fields!", e);
            throw e; // Propagate error to the caller
        }
    }
);

// Slice for Field operations
const fieldSlice = createSlice({
    name: "fields",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handling save field actions
            .addCase(saveField.pending, () => {
                console.log("Pending save field");
            })
            .addCase(saveField.fulfilled, (state, action) => {
                if (action.payload) {
                    // Adding new field to the state
                    state.fields = [...state.fields, action.payload];
                }
            })
            .addCase(saveField.rejected, () => {
                console.log("Rejected save field");
            })

            // Handling update field actions
            .addCase(updateField.fulfilled, (state, action) => {
                const formData = action.meta.arg;
                const fieldCode = formData.get("fieldCode") || "";

                if (!fieldCode) {
                    console.error("Error: No fieldCode in FormData!");
                    return;
                }

                const index = state.fields.findIndex((f) => f.fieldCode === fieldCode);
                if (index !== -1) {
                    // Updating the existing field in the state
                    state.fields[index] = action.payload;
                }
            })
            .addCase(updateField.pending, () => {
                console.log("Pending updating field");
            })
            .addCase(updateField.rejected, () => {
                console.log("Rejected updating field");
            })

            // Handling delete field actions
            .addCase(deleteField.fulfilled, (state, action) => {
                // Removing the deleted field from the state
                state.fields = state.fields.filter(
                    (field) => field.fieldCode !== action.meta.arg
                );
            })
            .addCase(deleteField.pending, () => {
                console.log("Pending deleting field");
            })
            .addCase(deleteField.rejected, () => {
                console.log("Rejected deleting field");
            })

            // Handling get all fields actions
            .addCase(getAllFields.fulfilled, (state, action) => {
                state.fields = action.payload || [];
            })
            .addCase(getAllFields.pending, () => {
                console.log("Pending fetching all fields");
            })
            .addCase(getAllFields.rejected, () => {
                console.log("Rejected fetching all fields");
            });
    },
});

export default fieldSlice.reducer;
