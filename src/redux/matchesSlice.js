// matchesSlice.js
import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {setLocalStorage} from "../components/utils/local-storage"; // Import the localstorage function
// Async thunk for matches
export const matchesPrematch =
    createAsyncThunk("matches/prematch",
    async ({endpoint,method,data}) => {
        const [status, response] = await makeRequest({
            url: endpoint,
            method: method,
            data: data,
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
export const marketGroups =
    createAsyncThunk("matches/marketGroups",
        async (sport_id) => {
            const [status, response] = await makeRequest({
                url: "'/v1/market-groups",
                method: "POST",
                data: sport_id,
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Market Groups failed");
            }
        });
export const matchesLive =
    createAsyncThunk("matches/live",
    async ({endpoint,method,data}) => {
        const [status, response] = await makeRequest({
            url: endpoint,
            method: method,
            data: data,
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
export const setInitialLoadingState = createAction("matches/set", ( param_fetch_type, tab, sport_id) => {
    return { payload: {param_fetch_type ,tab, sport_id } };
});

export const setFetching = createAction("matches/setFetching", ( status) => {
    return { payload: {status } };
});

export const setLimit = createAction("matches/setLimit", ( limit) => {
    return { payload: {limit } };
});

export const resetState =
    createAction("matches/reset", (stateToReset) => {
        return { payload: stateToReset };
    });

let fetchInterval; // Declare the interval variable outside the action creator

export const startFetchingMatches = ({ endpoint, method, data, interval, prematch }) => async (dispatch) =>  {
    // Dispatch the initial fetch
    const matchesData={endpoint, method, data}

    // Set up the interval to fetch matches every 20 seconds
    fetchInterval = setInterval(() => {
        if(prematch){
            dispatch(matchesPrematch(matchesData));
        }else{
            matchesLive(matchesData)
        }

    }, interval); // 20000 milliseconds = 20 seconds
};

// Action creator to stop fetching matches
export const stopFetchingMatches = () => () => {
    if (fetchInterval) {
        clearInterval(fetchInterval);
    }
};

const matchesSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(matchesPrematch.pending, (state) => {
                if (state.initialLoading) {
                    state.loading = true; // Set loading to true only during the initial fetch
                }
            })
            .addCase(matchesPrematch.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loading=false;

                const newMatches = action.payload?.data;

                const mergedMatches = newMatches.length > 0 ? { ...state.matches, ...newMatches } : newMatches;

                state.matches = mergedMatches;
                console.log("matches_data", mergedMatches);
                console.log("matches_data_length_of_data", newMatches.length);

                if (newMatches.slip_data) {
                    state.user_slip_validation=newMatches.slip_data
                }
                state.producer_down=action.payload.producer_status === 1
                // Reset initialLoading flag after initial fetch
                if (state.initialLoading) {
                    state.initialLoading = false;
                }
                state.error = null;
                state.fetching=false
                // state.prev_match_size = state.match_size || 10// prev_match_size
                state.match_size = newMatches?.length;

            })
            .addCase(matchesPrematch.rejected, (state, action) => {
                state.loading=false;
                if (state.initialLoading) {
                    state.initialLoading = false;
                }
                state.error = action.error.message;
            })
            .addCase(marketGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(marketGroups.fulfilled, (state, action) => {
                state.market_groups = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(marketGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesLive.pending, (state) => {
                state.loading = true;
            })
            .addCase(matchesLive.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.live_matches = action.payload;
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
                state.error = null;
            })
            .addCase(matchesMoreLiveMarkets.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.matches=action.payload
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
            .addCase(setInitialLoadingState, (state, action) => {
                const { param_fetch_type,tab, sport_id } = action.payload;
                // Append tab or sport_id to the list of visited tabs
                if(param_fetch_type==="tabs"){
                    state.initialLoading = !state.visited_tabs.includes(tab);
                    state.visited_tabs = Array.from(new Set([...state.visited_tabs, tab]));
                    // Update initialLoading based on visitedTabs

                }else{
                    state.visited_sport_id = Array.from(new Set([...state.visited_sport_id, sport_id]));
                    // Update initialLoading based on visitedTabs
                    state.initialLoading = !state.visited_sport_id.includes(sport_id);

                }

                state.error = null;
            })
            .addCase(setFetching, (state, action) => {
                const { status } = action.payload;
                // fetching status
                state.fetching = status;
            })
            .addCase(setLimit, (state, action) => {
                const { limit } = action.payload;
                state.limit +=limit
            })
            .addCase(resetState, (state, action) => {
            const stateToReset = action.payload;
            if (state.hasOwnProperty(stateToReset)) {
                state[stateToReset] = initialState.matchesData[stateToReset];
            }
            state.error = null;
        })
    },
});

export default matchesSlice.reducer;
