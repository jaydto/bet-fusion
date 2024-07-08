// virtualLeagueSlice.js
import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";// Import the makeRequest function
import {setLocalStorage} from "../components/utils/local-storage";
// Async thunk for virtualLeague
export const virtualLeaguePeriods =
    createAsyncThunk("virtualLeague/periods",
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
    export const virtualLeagueBetDetails =
        createAsyncThunk("virtualLeague/betDetails",
        async (betDetailsData) => {
            const [status, response] = await makeRequest({
                url: "/v1/nare-league/bet-details",
                method: "POST",
                data: betDetailsData,
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching betDetails failed");
            }
        });
export const virtualLeagueBetHistory =
    createAsyncThunk("virtualLeague/betHistory",
    async () => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/bet-history",
            method: "POST"
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching BetHistory failed");
        }
    });
export const virtualLeagueOldBetDetails =
    createAsyncThunk("virtualLeague/oldBetDetails",
    async (betDetailsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/old-bet-details",
            method: "POST",
            data: betDetailsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching BetHistory failed");
        }
    });
export const virtualLeagueOldBets =
    createAsyncThunk("virtualLeague/virtualLeagueOldBets",
        async () => {
            const [status, response] = await makeRequest({
                url: "/v1/nare-league/old-bets",
                method: "POST"
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching virtualLeagueOldBets failed");
            }
        });
export const virtualLeagueMarkets =
    createAsyncThunk("virtualLeague/markets",
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
export const virtualLeagueMatches =
    createAsyncThunk("virtualLeague/matches",
    async (matchesData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/matches",
            method: "POST",
            data: matchesData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Fetching Virtual League Matches failed");
        }
    });
export const virtualLeagueStandings =
    createAsyncThunk(
    "virtualLeague/standings",
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
export const virtualLeagueResults =
    createAsyncThunk(
    "virtualLeague/results",
    async (resultsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/results",
            method: "POST",
            data: resultsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Virtual League Results  failed");
        }

    }
);
export const virtualLeaguePlayouts =
    createAsyncThunk(
    "virtualLeague/playouts",
    async (playoutsData) => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/live",
            method: "POST",
            data: playoutsData,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Virtual League Playouts fetch  failed");
        }

    }
);
export const virtualLeagueCompetitions =
    createAsyncThunk(
    "virtualLeague/competitions",
    async () => {
        const [status, response] = await makeRequest({
            url: "/v1/nare-league/competitions",
            method: "POST",
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "Virtual League competitions fetch  failed");
        }

    }
);
export const resetState =
    createAction("betting/reset", (stateToReset) => {
    return { payload: stateToReset };
});
export const setState =
    createAction("betting/set", (stateToSet,data) => {
        return {payload:{stateToSet, data} };
    });
export const setTimerData =
    createAction("betting/timerData", (stateToSet,data) => {
        return {payload:{stateToSet, data} };
    });
const virtualLeagueSlice = createSlice({
    name: "virtualLeague",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(virtualLeagueMatches.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueMatches.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.matches_data=action.payload
            })
            .addCase(virtualLeagueMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeaguePlayouts.pending, (state) => {
                state.loading = false;
            })
            .addCase(virtualLeaguePlayouts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.playouts_data=action.payload
            })
            .addCase(virtualLeaguePlayouts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeagueStandings.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueStandings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.loading=false;
                state.standings_data=action.payload;
            })
            .addCase(virtualLeagueStandings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeagueResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueResults.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.results_data = action.payload;
            })
            .addCase(virtualLeagueResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeagueMarkets.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueMarkets.fulfilled, (state,action) => {
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
            .addCase(virtualLeagueMarkets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeaguePeriods.pending, (state) => {
                // state.loading = true;
                state.periods_ready=false
                state.time_set = false; // Reset timeAfter when periods are fetched
                state.inPlay=false

            })
            .addCase(virtualLeaguePeriods.fulfilled, (state,action) => {
                // When virtualLeaguePeriods is fulfilled, update the state with the first period's data
                const periodsData = action.payload;

                if (periodsData.length > 0) {
                    // Get the first period from the array
                    const firstPeriod = periodsData[0];

                    // Extract round_id, start_time, and end_time from the first period
                    const { round_id, start_time, end_time,round_number } = firstPeriod;

                    // Update the Redux state with the first period's data
                    state.round_id = round_id;
                    state.start_time = start_time;
                    state.end_time = end_time;
                    state.game_week = round_number;
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
                // state.current_selection_period = null; // Reset current_selection_period when periods are fetched
                state.inPlay = false; // Set inPlay to false when periods are fetched
            })
            .addCase(virtualLeaguePeriods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeagueCompetitions.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueCompetitions.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.competitions_data=action.payload;
                setLocalStorage('kiron-competitions', action.payload);
            })
            .addCase(virtualLeagueCompetitions.rejected, (state, action) => {
                state.loading = false;
                state.error = "OOP's, Something went wrong please Retry ";
            })
            .addCase(virtualLeagueBetHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueBetHistory.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.bet_history_data=action.payload;
                const status=action.payload.status;
                if(status===200){
                    state.bet_history_data=action.payload;
                }else if(status===undefined){
                    state.bet_history_data=action.payload;
                }
                else{
                    state.bet_history_data=[]
                }
            })
            .addCase(virtualLeagueBetHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeagueBetDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueBetDetails.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.bet_details_data=action.payload;
            })
            .addCase(virtualLeagueBetDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeagueOldBetDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueOldBetDetails.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                state.old_bet_details=action.payload;

            })
            .addCase(virtualLeagueOldBetDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(virtualLeagueOldBets.pending, (state) => {
                state.loading = true;
            })
            .addCase(virtualLeagueOldBets.fulfilled, (state,action) => {
                state.loading = false;
                state.error = null;
                const status=action.payload.status;
                if(status===200){
                    state.old_bets_data=action.payload;
                }else if(status===undefined){
                    state.old_bets_data=action.payload;
                }
                else{
                    state.old_bets_data=[]
                }


            })
            .addCase(virtualLeagueOldBets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(resetState, (state, action) => {
                const stateToReset = action.payload;
                if (state.hasOwnProperty(stateToReset)) {
                    state[stateToReset] = initialState.virtualLeague[stateToReset];
                }
                state.error = null;
            })
            .addCase(setState, (state, action) => {
                const { stateToSet, data } = action.payload;
                if (state.hasOwnProperty(stateToSet)) {
                    state[stateToSet] = data;
                }
                state.error = null;
            })
            .addCase(setTimerData, (state, action) => {
                const { stateToSet, data } = action.payload;
                if (state.hasOwnProperty(stateToSet)) {
                    state[stateToSet] = data;
                }
                state.error = null;
            })
    },
});

export default virtualLeagueSlice.reducer;
