import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fields:[]
}

export type RootState = {
    field: {
        fields: Array<{
            code: string;
            fieldName: string;
            location: string;
            extentSize: string;
            image: File | null;
        }>;
    };
};

const FieldSlice = createSlice({
   name:"field",
   initialState:initialState,
   reducers:{
       addField:(state,action) =>{
           state.fields.push(action.payload);
       },
       updateField:(state,action) => {
           // @ts-ignore
           const index = state.fields.findIndex(f => f.code === action.payload.code);
           if (index !== -1) {
               state.fields[index] = action.payload;
           }
       },
       deleteField:(state,action) => {
           //@ts-ignore
           state.fields = state.fields.filter(f => f.code !== action.payload.code);
       }
   }
});

export const {addField,updateField,deleteField} = FieldSlice.actions;
export default FieldSlice.reducer;