import FieldModel from "../model/FieldModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialFields:FieldModel[] = []
const fieldSlice = createSlice({
    name : "fields",
    initialState : initialFields,
    reducers : {
        addField: (state, action) => {
            state.push(action.payload);
        },
        deleteField: (state, action) => {
            return state.filter(field => field.field_id !== action.payload.field_id);
        },
        updateField: (state, action) => {
            const index = state.findIndex(field => field.field_id === action.payload.field_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        }
    }
})

export const {addField, deleteField, updateField} = fieldSlice.actions;
export default fieldSlice.reducer;