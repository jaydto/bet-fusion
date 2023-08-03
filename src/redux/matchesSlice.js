// matchesSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {setLocalStorage} from "../components/utils/local-storage"; // Import the makeRequest function
// Async thunk for matches
export const matchesPrematch =
    createAsyncThunk("matches/prematch",
    async (periodsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/matches",
            method: "POST",
            data: periodsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Prematch failed");
        }
    });
export const favoriteMarkets =
    createAsyncThunk("matches/favoriteMarkets",
    async () => {
        const [status, response] = await makeRequest({
            url: "/v1/user-favorite-markets",
            method: "POST"
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Prematch failed");
        }
    });
export const favoriteMarketsData =
    createAsyncThunk("matches/favoriteMarketsData",
    async (favoriteMarket) => {
        const [status, response] = await makeRequest({
            url: "/v1/favorite-market",
            method: "POST",
            data: favoriteMarket,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Prematch failed");
        }
    });

export const matchesLive =
    createAsyncThunk("matches/live",
    async (competitionsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/matches/live",
            method: "POST",
            data: competitionsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Live Matches failed");
        }
    });

export const matchesJackpot =
    createAsyncThunk("matches/jackpot",
    async () => {

        const [status, response] = await makeRequest({
            url: "/v1/matches/jackpot",
            method: "GET",
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching JackpotMatches failed");
        }
    });
export const jackpotById =
    createAsyncThunk("matches/jackpotById",
        async (jackpotData) => {
            let endpoint=  `/v1/matches/jackpot?jackpot_id=${jackpotData?.jackpot_id}&jackpot_status=${jackpotData?.jackpot_status}`;
            const [status, response] = await makeRequest({
                url: endpoint,
                method: "GET",
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching JackpotMatches failed");
            }
        });
export const jackpotHistoryData =
    createAsyncThunk("matches/jackpotHistoryData",
        async () => {

            const [status, response] = await makeRequest({
                url: "/v1/matches/jp-history",
                method: "GET",
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching JackpotMatches failed");
            }
        });
export const matchesCompetition =
    createAsyncThunk("matches/competition",
    async (marketsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/sports/competition?id=",
            method: "POST",
            data: marketsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Markets failed");
        }
    });
// Async thunk for matches
export const matchesMoreLiveMarkets =
    createAsyncThunk("matches/moreLiveMatches",
    async (matchesData) => {
        const [status, response] = await makeRequest({
            url: "/v2/matches/live?id=",
            method: "POST",
            data: matchesData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching More Live Matches failed");
        }
    });
// Async thunk for more Markets
export const matchesMorePrematchMarkets =
    createAsyncThunk(
    "matches/morePrematchMatches",
    async (standingsData) => {
        const [status, response] = await makeRequest({
            url: "/v2/matches?id=",
            method: "POST",
            data: standingsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching More Prematch markets Failed");
        }

    }
);

const matchesSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(matchesPrematch.pending, (state) => {
                state.loading = true;
            })
            .addCase(matchesPrematch.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(matchesPrematch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesLive.pending, (state) => {
                state.loading = true;
            })
            .addCase(matchesLive.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(matchesLive.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesJackpot.pending, (state) => {
                state.jackpot_loading = true;
            })
            .addCase(matchesJackpot.fulfilled, (state, action) => {
                state.jackpot_data=action.payload;
                state.error = null;
                state.jackpot_loading = false;
            })
            .addCase(matchesJackpot.rejected, (state, action) => {
                state.jackpot_loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesCompetition.pending, (state) => {
                state.loading = true;
            })
            .addCase(matchesCompetition.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(matchesCompetition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesMorePrematchMarkets.pending, (state) => {
                state.loading = true;
            })
            .addCase(matchesMorePrematchMarkets.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(matchesMorePrematchMarkets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesMoreLiveMarkets.pending, (state) => {
                state.loading = true;
            })
            .addCase(matchesMoreLiveMarkets.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(matchesMoreLiveMarkets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(favoriteMarkets.pending, (state) => {
                state.loading = true;
            })
            .addCase(favoriteMarkets.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                const responsedata = action.payload?.data || [];
                state.favorites_data = action.payload?.data || [];
                // Update localStorage with the updated favorites
                setLocalStorage('favorite_markets', responsedata);
            })
            .addCase(favoriteMarkets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(favoriteMarketsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(favoriteMarketsData.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(favoriteMarketsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(jackpotHistoryData.pending, (state) => {
                state.loading = true;
            })
            .addCase(jackpotHistoryData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const m_result = action.payload;
                if (m_result) {
                    const jp_history = m_result.map((result) => ({
                        value: result,
                        label: result?.jackpot_name,
                    }));
                    state.jackpot_history = jp_history;
                } else {
                    state.jackpot_history = [];
                }
            })
            .addCase(jackpotHistoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(jackpotById.pending, (state) => {
                state.loading = true;
            })
            .addCase(jackpotById.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.jackpot_by_id=action.payload;
            })
            .addCase(jackpotById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    },
});

export default matchesSlice.reducer;
