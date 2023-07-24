// bettingSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request"; // Import the makeRequest function
// Async thunk for matches
export const bettingMatchesGames =
    createAsyncThunk("betting/matchesGames",
        async (periodsData) => {
            const [status, response] = await makeRequest({
                url: "/bet",
                method: "POST",
                data: periodsData,
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Prematch failed");
            }
        });
export const bettingJackpot =
    createAsyncThunk("betting/jackpot",
        async (jackpotPayload) => {
            const [status, response] = await makeRequest({
                url: "/jp/bet",
                method: "POST",
                data: jackpotPayload,
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching JackpotMatches failed");
            }
        });
export const bettingKiron =
    createAsyncThunk("betting/kiron",
        async (kironbetPayload) => {
            const [status, response] = await makeRequest({
                url: "/v1/nare-league/bet=",
                method: "POST",
                data: kironbetPayload,
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Markets failed");
            }
        });
// Async thunk for matches


const bettingSlice = createSlice({
    name: "betting",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bettingMatchesGames.pending, (state) => {
                state.loading = true;
            })
            .addCase(bettingMatchesGames.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(bettingMatchesGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(bettingJackpot.pending, (state) => {
                state.loading = true;
            })
            .addCase(bettingJackpot.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(bettingJackpot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(bettingKiron.pending, (state) => {
                state.loading = true;
            })
            .addCase(bettingKiron.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(bettingKiron.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    },
});

export default bettingSlice.reducer;
