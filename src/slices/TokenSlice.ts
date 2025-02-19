
import {createSlice} from "@reduxjs/toolkit";

const initialToken :string= ''
const tokenSlice = createSlice({
    name : 'token',
    initialState: initialToken,
    reducers: {
        setToken: (state, action) => {
            console.log(state)
            return state = action.payload;
        },
        removeToken : (state) =>{
            console.log(state)
            return state = ''
        }
    }
})
export const {setToken,removeToken} = tokenSlice.actions;
export default tokenSlice.reducer;
