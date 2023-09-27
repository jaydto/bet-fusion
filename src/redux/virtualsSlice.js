// matchesSlice.js
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
// Async thunk for matches
export const casinoList =
    createAsyncThunk("virtuals/casinoGames",
        async ({endpoint,method}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method: method
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Casino failed");
            }
        });
export const casinoCreatePlayer =
    createAsyncThunk("virtuals/casinoCreatePlayer",
        async () => {
            const [status, response] = await makeRequest({
                url: "/v1/casino/create/player",
                method: "GET"
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Create Casino Player failed");
            }
        });

export const casinoGamePlay =
    createAsyncThunk("virtuals/casinoGameplay",
        async ({endpoint,method}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method:method
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "casinoGamePlay failed");
            }
        });



const virtualsSlice = createSlice({
    name: "virtuals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(casinoList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(casinoList.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.casino_games=action.payload?.data;
                state.casino_categories=action.payload?.types;
            })
            .addCase(casinoList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.fetching=false
            })
            .addCase(casinoGamePlay.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.casino_game_url=null
                state.fetching=true

            })
            .addCase(casinoGamePlay.fulfilled, (state, action) => {
                state.loading = false;
                state.casino_game_url=action.payload.result?.gameURL

            })
            .addCase(casinoGamePlay.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;


            })
            .addCase(casinoCreatePlayer.pending, (state) => {
                state.error = null;

            })
            .addCase(casinoCreatePlayer.fulfilled, (state, action) => {
                state.error = null;

            })
            .addCase(casinoCreatePlayer.rejected, (state, action) => {
                state.error = action.error.message;


            })



    },
});

export default virtualsSlice.reducer;
