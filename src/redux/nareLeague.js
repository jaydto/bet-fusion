// nareLeagueSlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {setLocalStorage} from "../components/utils/local-storage"; // Import the makeRequest function
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
    async () => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/competitions",
            method: "POST",
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
    async () => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/markets",
            method: "POST",
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

export const nareLeaguePlayouts = createAsyncThunk(
    "nareLeague/playouts",
    async (playoutsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/live",
            method: "POST",
            data: playoutsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Nare League Playouts fetch  failed");
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
                state.loading = false;
                state.error = null;
                state.matches_data=action.payload
            })
            .addCase(nareLeagueMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeaguePlayouts.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeaguePlayouts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(nareLeaguePlayouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueStandings.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueStandings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.loading=false;
                state.standings_data=action.payload;
            })
            .addCase(nareLeagueStandings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueResults.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.results_data = action.payload;
            })
            .addCase(nareLeagueResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueMarkets.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueMarkets.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.markets_data=action.payload
                const marketsData=action.payload
                setLocalStorage('kiron-more',action.payload)
                const labeledOptions = marketsData.map(option => ({
                                to: "sub_type_id="+option.market_id,
                                label: option?.description
                            }));
                state.market_options=labeledOptions
                setLocalStorage('kiron-more', labeledOptions);
            })
            .addCase(nareLeagueMarkets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeaguePeriods.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeaguePeriods.fulfilled, (state,action) => {
                // When nareLeaguePeriods is fulfilled, update the state with the first period's data
                const periodsData = action.payload;

                if (periodsData.length > 0) {
                    // Get the first period from the array
                    const firstPeriod = periodsData[0];

                    // Extract round_id, start_time, and end_time from the first period
                    const { round_id, start_time, end_time } = firstPeriod;

                    // Update the Redux state with the first period's data
                    state.round_id = round_id;
                    state.start_time = start_time;
                    state.end_time = end_time;
                }
                state.loading = false;
                state.error = null;
                state.isLoading = false;
                state.error = null;
                state.periods_data = action.payload; // Update periods_data with the response
                state.periods_ready = true; // Set periods_ready to true
                state.timeLeft = null; // Reset timeLeft when periods are fetched
                state.timeAfter = null; // Reset timeAfter when periods are fetched
                state.isCountDownTimeActive = null; // Reset isCountDownTimeActive when periods are fetched
                state.current_selection_period = null; // Reset current_selection_period when periods are fetched
                state.inPlay = false; // Set inPlay to false when periods are fetched
            })
            .addCase(nareLeaguePeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(nareLeagueCompetitions.pending, (state) => {
                state.loading = true;
            })
            .addCase(nareLeagueCompetitions.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.competitions_data=action.payload;
                setLocalStorage('kiron-competitions', action.payload);
            })
            .addCase(nareLeagueCompetitions.rejected, (state, action) => {
                state.loading = false;
                state.error = "OOP's, Something went wrong please Retry ";
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
