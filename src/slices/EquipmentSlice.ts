import EquipmentModel from "../model/EquipmentModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialEquipments:EquipmentModel[] = []

const EquipmentSlice = createSlice({
    name : 'equipment',
    initialState : initialEquipments,
    reducers : {
        addEquipment : (state , action) =>{
            state.push(action.payload)
        },
        updateEquipment : (state, action) =>{
            const index = state.findIndex(equipment => equipment.equipment_id === action.payload.equipment_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        deleteEquipment : (state, action) =>{
            return state.filter(equipment => equipment.equipment_id !== action.payload.equipment_id);
        }
    }
})

export const {addEquipment,updateEquipment, deleteEquipment} = EquipmentSlice.actions
export default EquipmentSlice.reducer;