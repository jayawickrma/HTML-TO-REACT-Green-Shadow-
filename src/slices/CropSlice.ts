import CropModel from "../Model/CropModel.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api_call from "../Services/api.call.ts";
import {AxiosResponse} from "axios";

const initialCrops: CropModel[] = [];

// Fetch Crops
export const getCrops = createAsyncThunk('crops/getCrops', async (_, { rejectWithValue }) => {
    try {
        const response: AxiosResponse<CropModel[]> = await Api_call.getApiCall('/crop/getAllCrops');
        return response.data;
    } catch (err) {
        return rejectWithValue(err);
    }
});

// Delete Crop
export const deleteCrop = createAsyncThunk('crops/deleteCrop', async (cropCode: string, { rejectWithValue }) => {
    try {
        await Api_call.deleteApiCall(`/crop/deleteCrop/${cropCode}`);
        return { cropCode }; // Return cropCode to identify which crop was deleted
    } catch (err) {
        return rejectWithValue(err);
    }
});

// Update Crop
export const updateCrop = createAsyncThunk('crops/updateCrop', async (crop: CropModel, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("cropCode", crop.cropCode);
        formData.append("cropName", crop.cropName);
        formData.append("scientificName", crop.scientificName);
        formData.append("cropCategory", crop.cropCategory);
        formData.append("cropSeason", crop.cropSeason);
        formData.append("fieldList", Array.isArray(crop.fieldList) ? crop.fieldList.join(",") : "");
        if (crop.cropImage) {
            formData.append("cropImage", crop.cropImage);
        }
        const response: AxiosResponse<CropModel> = await Api_call.patchApiCallWithFormData('/crop/updateCrop', formData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err);
    }
});

// Save Crop
export const saveCrop = createAsyncThunk('crops/saveCrop', async (crop: CropModel, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("cropCode", crop.cropCode);
        formData.append("cropName", crop.cropName);
        formData.append("scientificName", crop.scientificName);
        formData.append("cropCategory", crop.cropCategory);
        formData.append("cropSeason", crop.cropSeason);
        formData.append("fieldList", Array.isArray(crop.fieldList) ? crop.fieldList.join(",") : "");
        if (crop.cropImage) {
            formData.append("cropImage", crop.cropImage);
        }
        const response: AxiosResponse<CropModel> = await Api_call.postApiCallWithFormData('/crop/saveCrop', formData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err);
    }
});

const cropSlice = createSlice({
    name: 'crops',
    initialState: initialCrops,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCrops.fulfilled, (_, action) => action.payload)
            .addCase(getCrops.rejected, (_, action) => {
                console.error("Failed to fetch crops:", action.payload);
            });

        builder
            .addCase(saveCrop.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCrop.rejected, (_, action) => {
                console.error("Failed to save crop:", action.payload);
            });

        builder
            .addCase(updateCrop.fulfilled, (state, action) => {
                const index = state.findIndex(crop => crop.cropCode === action.payload.cropCode);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateCrop.rejected, (_, action) => {
                console.error("Failed to update crop:", action.payload);
            });

        builder
            .addCase(deleteCrop.fulfilled, (state, action) => {
                return state.filter(crop => crop.cropCode !== action.payload.cropCode);
            })
            .addCase(deleteCrop.rejected, (_, action) => {
                console.error("Failed to delete crop:", action.payload);
            });
    },
});

export default cropSlice.reducer;
