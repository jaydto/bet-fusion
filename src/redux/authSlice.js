// authSlice.js
import {createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {setLocalStorage} from "../components/utils/local-storage";
// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (loginData) => {
    const [status, response] = await makeRequest({
        url: "/v1/login",
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
        url: "/v1/signup",
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
// Redux action to reset a state
export const resetState =
    createAction("auth/reset", (stateToReset) => {
        return { payload: stateToReset };
    });

// need to pass also the user data as part of the arguments being dispatched to userBalance thunk
export const userBalance =
    createAsyncThunk("auth/userBalance",
        async ({udata,user}) => {
            const [status, response] = await makeRequest({
                url: "/v1/balance",
                method: "POST",
                data:udata
            });
            const [status1, response1] = await makeRequest({
                url: "/v1/promopoints",
                method: "POST",
                data:udata
            });

            if (status === 200) {
                return { user: user, data: response , promo_points:response1}; // Return an object with both user and data properties
            } else {
                throw new Error(response?.error || "Fetching User Balance failed");
            }
        });

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
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
            .addCase(userBalance.pending, (state) => {
                state.loading = true;
            })
            .addCase(userBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const { user, data, promo_points } = action.payload;

                let u = {...user, ...data.user,...{ promo_points: {
                    points:promo_points?.points,
                    title:promo_points?.title,
                    end_date:promo_points?.end_date
                }}, };

                state.user=u

                setLocalStorage('user', u )

            })
            .addCase(userBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.user_sign_up = action.payload;
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
            })
            .addCase(resetState, (state, action) => {
                const stateToReset = action.payload;
                if (state.hasOwnProperty(stateToReset)) {
                    state[stateToReset] = initialState.auth[stateToReset];
                }
                state.error = null;
            });
    },
});

export default authSlice.reducer;
