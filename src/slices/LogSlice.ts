import LogModel from "../model/LogModel.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialLogs:LogModel[] = []
const logSlice = createSlice({
    name : 'logs',
    initialState : initialLogs,
    reducers :{
        addLog: (state, action) => {
            state.push(action.payload);
        },
        updateLog: (state, action) => {
            const index = state.findIndex(log => log.log_id === action.payload.log_id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
        deleteLog: (state, action) => {
            return state.filter(log => log.log_id !== action.payload.log_id);

        }

    }
})

export const {addLog, updateLog,deleteLog} = logSlice.actions;
export default logSlice.reducer;

