import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    logs:[]
}

export type RootState = {
    log: {
        logs: Array<{
            code: string;
            logDate: string;
            logDetails: string;
            image: File | null;
        }>;
    };
};

const LogSlice = createSlice({
    name:"log",
    initialState:initialState,
    reducers:{
        addLog:(state,action) => {
            state.logs.push(action.payload);
        },
        updateLog:(state,action) => {
            //@ts-ignore
            const index = state.logs.findIndex(l => l.code === action.payload.code);
            if (index !== -1) {
                state.logs[index] = action.payload;
            }
        },
        deleteLog:(state,action) => {
            //@ts-ignore
            state.logs = state.logs.filter(l => l.code !== action.payload.code);
        }
    }
})

export const {addLog,updateLog,deleteLog} = LogSlice.actions;
export default LogSlice.reducer;