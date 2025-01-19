import CropModel from "../Model/CropModel.ts"
import {createSlice} from "@reduxjs/toolkit";

const initialCrops: CropModel[] = []
const cropSlice = createSlice({
    name : 'crops',
    initialState : initialCrops,
    reducers :{
        addCrop: (state, action) => {
            state.push(action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(crop => crop.cropCode === action.payload.crop_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        deleteCrop: (state, action) => {
            return state.filter(crop => crop.cropCode !== action.payload.crop_id);
        }
    }
})

export const {addCrop, updateCrop, deleteCrop} = cropSlice.actions;
export default cropSlice.reducer;