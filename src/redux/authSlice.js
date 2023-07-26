// authSlice.js (or authSlice.ts for TypeScript)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request"; // Import the makeRequest function
// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (loginData) => {
    const [status, response] = await makeRequest({
        url: "/api/login",
        method: "POST",
        data: loginData,
    });
    if (status === 200) {
        return response;
    } else {
        throw new Error(response?.error || "Login failed");
    }
});

// Async thunk for user signup
export const signupUser = createAsyncThunk("auth/signupUser", async (signupData) => {
    const [status, response] = await makeRequest({
        url: "/api/signup",
        method: "POST",
        data: signupData,
    });
    if (status === 200) {
        return response;
    } else {
        throw new Error(response?.error || "Signup failed");
    }
});

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email) => {
        const [status, response] = await makeRequest({
            url: "/api/forgotPassword",
            method: "POST",
            data: { email },
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Forgot password failed");
        }

    }
);

// Async thunk for verifying the password reset token
export const verifyPassword = createAsyncThunk(
    "auth/verifyPassword",
    async (resetToken) => {
        const [status, response] = await makeRequest({
            url: "/api/verifyPassword",
            method: "POST",
            data: { resetToken },
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Password verification failed");
        }

    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(verifyPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
