import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../Services/api.ts";
import {User} from "../Model/User.ts";

const initialState : { user: User | null, jwt_token: null, refresh_token: null, username: null, isAuthenticated: boolean, loading: false, error: string } = {
    user: null,
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: ""
};


export type UserRootState = {
    user: {
        user: User | null;
        jwt_token: null;
        refresh_token: null;
        username: null;
        isAuthenticated: boolean;
        loading: boolean;
        error: string;
    };
};


export const register = createAsyncThunk(
    "auth/signUp",
    async (user: User) => {
        try {
            const response = await api.post("auth/signUp", user, {withCredentials: true}
            );
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const login = createAsyncThunk(
    'auth/signIn',
    async (user: User) => {
        try {
            const response = await api.post(
                'auth/signIn',
                user,
                {withCredentials: true}
            );
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("jwt_token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(register.pending, () => {
                console.error("Pending register user");
            })
            .addCase(register.rejected, () => {
                console.error("Rejected register user");
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.jwt_token = action.payload.accessToken;
                    state.refresh_token = action.payload.refreshToken;
                    state.username = action.payload.username;
                    state.isAuthenticated = true;

                    localStorage.setItem("jwt_token", action.payload.accessToken);
                    localStorage.setItem("refresh_token", action.payload.refreshToken);
                }
            })
            .addCase(login.rejected, (state) => {
                state.isAuthenticated = false;
                console.error("Login failed");
            });
    }
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;

