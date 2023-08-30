// matchesSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import { setLocalStorage} from "../components/utils/local-storage";
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
export const carouselImages =
    createAsyncThunk("data/carouselImages",
        async () => {
            const [status, response] = await makeRequest({
                url: "/v1/carousel-images",
                method: "GET"
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Carousel images failed");
            }
        });
// need to pass also the user data as part of the arguments being dispatched to userBalance thunk
export const userBalance =
    createAsyncThunk("data/userBalance",
        async (userData, user) => {
            const [status, response] = await makeRequest({
                url: "/v1/balance",
                method: "POST",
                data:userData
            });
            if (status === 200) {
                return {response, user};
            } else {
                throw new Error(response?.error || "Fetching User Balance failed");
            }
        });

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(carouselImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(carouselImages.fulfilled, (state, action) => {
                state.carousel_banners= action.payload.images;
                state.loading = false;
                state.error = null;
                const status=action.payload.status
                if(status===200){
                    setLocalStorage('carousel_banners', action.payload.images, 1800000)
                }
            })
            .addCase(carouselImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
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
            .addCase(userBalance.pending, (state) => {
                state.loading = true;
            })
            .addCase(userBalance.fulfilled, (state, action) => {
                state.app_config= action.payloadresponse;
                state.loading = false;
                state.error = null;
                const status=action.payload.response.status
                let u = {...action.payload.user, ...action.payload.user};
                state.user=u
                if(status===200){
                    setLocalStorage('user', u )
                }
            })
            .addCase(userBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    },
});

export default dataSlice.reducer;