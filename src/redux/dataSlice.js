// matchesSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {clearTrackingData, setLocalStorage} from "../components/utils/local-storage";
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
export const userPoints =
    createAsyncThunk("data/userPoints",
        async (values) => {
            const [status, response] = await makeRequest({
                url: "/redeem-points",
                method: "POST",
                data:values
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Redeem Points failed");
            }
        });

export const userWithdrawal =
    createAsyncThunk("data/userWithdrawal",
        async (amount) => {
            const [status, response] = await makeRequest({
                url: "/withdraw",
                method: "POST",
                data:amount,
                use_jwt: true
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response || "Withdrawal Request failed");
            }
        });

export const userDeposits =
    createAsyncThunk("data/userDeposits",
        async (amount) => {
            const [status, response] = await makeRequest({
                url: "/stk/deposit",
                method: "POST",
                data:amount
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Deposit failed");
            }
        });

export const userDepositsConfirm =
    createAsyncThunk("data/userDepositsConfirm",
        async (confirmation) => {
            const [status, response] = await makeRequest({
                url: "/v1/deposit-confirmation",
                method: "POST",
                data:confirmation
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Deposit failed");
            }
        });


const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userPoints.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.points_message=null;
            })
            .addCase(userPoints.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.points_message=action.payload?.message;

            })
            .addCase(userPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(userWithdrawal.pending, (state) => {
                state.withdraw_loading=true;
                state.error = null;
            })
            .addCase(userWithdrawal.fulfilled, (state, action) => {
                state.error = null;
                state.withdraw_loading=false;
                state.withdrawal_message=action.payload;

            })
            .addCase(userWithdrawal.rejected, (state, action) => {
                state.withdraw_loading=false;
                state.error = action.error.message;
            })
            .addCase(userDeposits.pending, (state) => {
                state.deposit_loading = true;
                state.error = null;
            })
            .addCase(userDeposits.fulfilled, (state, action) => {
                state.deposit_loading = false;
                state.error = null;
                clearTrackingData()
                state.deposits_message=action.payload;

            })
            .addCase(userDeposits.rejected, (state, action) => {
                state.deposit_loading = false;
                state.error = action.error.message;
            })
            .addCase(userDepositsConfirm.pending, (state) => {
                state.deposit_confirm_loading = true;
                state.deposits_confirm_message=null;
                state.error = null;
            })
            .addCase(userDepositsConfirm.fulfilled, (state, action) => {
                state.deposit_confirm_loading = false;
                state.error = null;
                clearTrackingData()
                state.deposits_confirm_message=action.payload;

            })
            .addCase(userDepositsConfirm.rejected, (state, action) => {
                state.deposit_confirm_loading = false;
                state.error = action.error.message;
            })
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
                const status=action.payload?.status_code

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