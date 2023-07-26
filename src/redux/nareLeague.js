// nareLeagueSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request"; // Import the makeRequest function
// Async thunk for nareLeague
export const nareLeaguePeriods = createAsyncThunk("nareLeague/periods",
    async (periodsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/periods",
            method: "POST",
            data: periodsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Periods failed");
        }
    });
export const nareLeagueCompetitions = createAsyncThunk("nareLeague/competitions",
    async (competitionsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/competitions",
            method: "POST",
            data: competitionsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Competitons failed");
        }
    });

export const nareLeagueBetHistory =
    createAsyncThunk("nareLeague/betHistory",
    async (betHistoryData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/bet-history",
            method: "POST",
            data: betHistoryData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching BetHistory failed");
        }
    });
export const nareLeagueBetDetails =
    createAsyncThunk("nareLeague/betDetails",
    async (betDetailsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/bet-details",
            method: "POST",
            data: betDetailsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching BetHistory failed");
        }
    });

export const nareLeagueMarkets = createAsyncThunk("nareLeague/markets",
    async (marketsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/markets",
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
export const nareLeagueMatches = createAsyncThunk("nareLeague/matches",
    async (matchesData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/matches",
            method: "POST",
            data: matchesData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Nare League Matches failed");
        }
    });

// Async thunk for standings
export const nareLeagueStandings = createAsyncThunk(
    "nareLeague/standings",
    async (standingsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/standings",
            method: "POST",
            data: standingsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Standings Failed");
        }

    }
);

// Async thunk for Results
export const nareLeagueResults = createAsyncThunk(
    "nareLeague/results",
    async (resultsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/results",
            method: "POST",
            data: resultsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Nare League Results  failed");
        }

    }
);

const nareLeagueSlice = createSlice({
    name: "nareLeague",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(nareLeagueMatches.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueMatches.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeagueMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueStandings.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueStandings.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeagueStandings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueResults.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeagueResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueMarkets.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueMarkets.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeagueMarkets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeaguePeriods.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeaguePeriods.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeaguePeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueCompetitions.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueCompetitions.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeagueCompetitions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueBetHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueBetHistory.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeagueBetHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueBetDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueBetDetails.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeagueBetDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default nareLeagueSlice.reducer;
