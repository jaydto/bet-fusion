// matchesSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {setLocalStorage} from "../components/utils/local-storage";
// Async thunk for matches
export const configSettings =
    createAsyncThunk("data/configSettings",
        async () => {
            const [status, response] = await makeRequest({
                url: "/v1/bet/settings",
                method: "POST"
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Prematch failed");
            }
        });

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(configSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(configSettings.fulfilled, (state, action) => {
                state.app_config= action.payload;
                state.loading = false;
                state.error = null;
                const status=action.payload.status
                if(status===200){
                    setLocalStorage('settings', action.payload.message, 1800000)
                }
            })
            .addCase(configSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    },
});

export default dataSlice.reducer;