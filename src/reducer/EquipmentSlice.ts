import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    equipments:[]
}

export type RootState = {
    equipment: {
        equipments: Array<{
            code:string;
            name:string;
            type:string;
            status:string;
            count:number;
        }>
    }
}

const EquipmentSlice = createSlice({
    name:"equipment",
    initialState:initialState,
    reducers:{
        addEquipment:(state,action) => {
            state.equipments.push(action.payload);
        },
        updateEquipment:(state,action) => {
            //@ts-ignore
            const index = state.equipments.findIndex(e => e.code === action.payload.code);
            if (index !== -1) {
                state.equipments[index] = action.payload;
            }
        },
        deleteEquipment:(state,action) => {
            //@ts-ignore
            state.equipments = state.equipments.filter(e => e.code !== action.payload.code);
        }
    }
});

export const {addEquipment,updateEquipment,deleteEquipment} = EquipmentSlice.actions
export default EquipmentSlice.reducer