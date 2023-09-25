// matchesSlice.js
import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {setLocalStorage} from "../components/utils/local-storage";
import {addToSlip} from "../components/utils/betslip";
// Async thunk for matches
export const matchesPrematch =
    createAsyncThunk("matches/prematch",
        async ({endpoint, method, data, search=false, active_sport=null, active_sub_type=null}, {getState}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method: method,
                data: data,
            });
            const state = getState();
            const searched_data = state.matchesData.searched_matches;
            const matches_data = state.matchesData.matches;


            if (status === 200) {
                return {response, search, searched_data, matches_data, active_sport, active_sub_type};
            } else {
                throw new Error(response?.error || "Fetching Prematch failed");
            }
        });
export const matchesLive =
    createAsyncThunk("matches/live",
        async ({endpoint, method, data, search=false, active_sport=null}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method: method,
                data: data,
            });
            if (status === 200) {
                return {search,  active_sport, response}
            } else {
                throw new Error(response?.error || "Fetching Live Matches failed");
            }
        });
export const matchesCompetition =
    createAsyncThunk("matches/competition",
        async ({endpoint, method, data,search=false, active_sport=null, active_sub_type=null}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method: method,
                data: data,
            });
            if (status === 200) {
                return {response, search, active_sport, active_sub_type};
            } else {
                throw new Error(response?.error || "Fetching Markets failed");
            }
        });
export const matchesSearch =
    createAsyncThunk("matches/matchesSearch",
        async ({endpoint, method, active_sport}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method: method,
                data: [],
            });
            if (status === 200) {
                return {response, active_sport};
            } else {
                throw new Error(response?.error || "Search failed");
            }
        });

export const matchCategories =
    createAsyncThunk("matches/matchCategories",
        async () => {
            const [status, response] = await makeRequest({
                url: "/v1/categories",
                method: "GET"
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Categories failed");
            }
        });
export const fullBetDetails =
    createAsyncThunk("matches/fullBetDetails",
        async () => {
            const [status, response] = await makeRequest({
                url: "/v1/full/betdetails",
                method: "POST"
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching fullBetDetails failed");
            }
        });
export const betHistoryDetails =
    createAsyncThunk("matches/betHistoryDetails",
        async (data) => {
            const [status, response] = await makeRequest({
                url: "/v1/betdetails",
                method: "POST",
                data: data
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching betHistoryDetails failed");
            }
        });

export const betCancel =
    createAsyncThunk("matches/betCancel",
        async (data) => {
            const {bet_id} = data
            const [status, response] = await makeRequest({
                url: "/bet-cancel",
                method: "POST",
                data: data,
                use_jwt: true
            });
            if (status === 201) {
                return {bet_id, response};
            } else {
                throw new Error(response?.error || " betCancel failed");
            }
        });
export const sportLiveCount =
    createAsyncThunk("matches/sportLiveCount",
        async () => {

            const [status, response] = await makeRequest({
                url: "/v1/sports?live=1",
                method: "GET"
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Sports Count failed");
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
                url: "/v1/market-groups",
                method: "POST",
                data: sport_id,
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Fetching Market Groups failed");
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
            let endpoint = `/v1/matches/jackpot?jackpot_id=${jackpotData?.jackpot_id}&jackpot_status=${jackpotData?.jackpot_status}`;
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
export const matchesRebet =
    createAsyncThunk("matches/matchesRebet",
        async (data) => {

            const [status, response] = await makeRequest({
                url: "/v1/rebet",
                method: "POST",
                data: data
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Rebet  failed");
            }
        });

export const matchesShareBet =
    createAsyncThunk("matches/matchesShareBet",
        async (data) => {

            const [status, response] = await makeRequest({
                url: "/v1/bs-encode",
                method: "POST",
                data: data
            });
            if (status === 200) {
                return response;
            } else {
                throw new Error(response?.error || "Share Bet Request failed");
            }
        });

export const matchesDecodeBet =
    createAsyncThunk("matches/matchesDecodeBet",
        async (data) => {
            const {betslip_share_code} = data

            const [status, response] = await makeRequest({
                url: "/v1/bs-decode",
                method: "POST",
                data: data
            });
            if (status === 200) {
                if (betslip_share_code) {
                    return {response, betslip_share_code}
                } else {
                    return response;
                }

            } else {
                throw new Error(response?.error || "Bet Decode Request failed");
            }
        });

// Async thunk for matches
export const matchesMoreLiveMarkets =
    createAsyncThunk("matches/moreLiveMatches",
        async ({endpoint, method, data}, {getState}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method: method,
                data: data,
            });
            const state=getState()
            const more_matches=state.matchesData.more_matches
            if (status === 200) {
                return {response, more_matches};
            } else {
                throw new Error(response?.error || "Fetching More Live Matches failed");
            }
        });
// Async thunk for more Markets
export const matchesMorePrematchMarkets =
    createAsyncThunk(
        "matches/morePrematchMatches",
        async ({endpoint, method, data},{getState}) => {
            const [status, response] = await makeRequest({
                url: endpoint,
                method: method,
                data: data,
            });
            const state = getState();
            const more_matches=state.matchesData.more_matches

            if (status === 200) {
                return {response, more_matches};
            } else {
                throw new Error(response?.error || "Fetching More Prematch markets Failed");
            }

        }
    );
export const setInitialLoadingState = createAction("matches/set", ({param_fetch_type="", tab="", sport_id="", filters="", match=""}) => {
    return {payload: {param_fetch_type, tab, sport_id, filters, match}};
});

export const setFetching = createAction("matches/setFetching", (type, status) => {
    return {payload: {type, status}};
});
export const backNavigation = createAction("matches/backNavigation", (status) => {
    return {payload: {status}};
});
export const setLimit = createAction("matches/setLimit", (limit) => {
    return {payload: {limit}};
});

export const resetState =
    createAction("matches/reset", (stateToReset) => {
        return {payload: stateToReset};
    });

let fetchInterval; // Declare the interval variable outside the action creator

export const startFetchingMatches = ({endpoint, method, data, interval,
                                         prematch = false,
                                         live = false,
                                         competition = false,
                                         search=false,
                                         active_sport='Soccer',
                                         active_sub_type=null


}) => async (dispatch) => {
        // Dispatch the initial fetch
        const matchesData = {endpoint, method, data, search, active_sport, active_sub_type}

        // Set up the interval to fetch matches every 20 seconds
        fetchInterval = setInterval(() => {
            if (prematch) {
                dispatch(matchesPrematch(matchesData));
            }
            if (live) {
                dispatch(matchesLive(matchesData));
            }
            if (competition) {
                dispatch(matchesCompetition(matchesData))
            }

        }, interval); // 20000 milliseconds = 20 seconds //5000 milliseconds = 5 seconds
    };
let fetchMoreInterval;
export const startFetchingMoreMatches = ({
                                             endpoint,
                                             method,
                                             data,
                                             interval,
                                             more_prematch = false,
                                             more_live = false
                                         }) =>
    async (dispatch) => {
        // Dispatch the initial fetch
        const matchesData = {endpoint, method, data}

        // Set up the interval to fetch matches every 20 seconds
        fetchMoreInterval = setInterval(() => {
            if (more_prematch) {
                dispatch(matchesMorePrematchMarkets(matchesData));
            }
            if (more_live) {
                dispatch(matchesMoreLiveMarkets(matchesData));
            }


        }, interval); // 20000 milliseconds = 20 seconds //5000 milliseconds = 5 seconds
    };
export const stopFetchingMoreMatches = () => () => {
    if (fetchMoreInterval) {
        clearInterval(fetchMoreInterval);
    }
};
let countInterval; // Declare the interval variable outside the action creator

export const startFetchingLiveCount = ({interval}) =>
    async (dispatch) => {

        // Set up the interval to fetch matches every 20 seconds
        countInterval = setInterval(() => {

            dispatch(sportLiveCount())
        }, interval); // 20000 milliseconds = 20 seconds //5000 milliseconds = 5 seconds
    };

export const stopFetchingLiveCount = () => () => {
    if (countInterval) {
        clearInterval(countInterval);
    }
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
                const newMatches = action.payload?.response.data;

                const search=action.payload?.search
                const active_sport=action.payload.active_sport
                const active_sub_type=action.payload.active_sub_type


                state.active_sport=active_sport

                state.active_sub_type=active_sub_type
                state.search=search


                // const mergedMatches = newMatches.length > 0 ? {...action.payload.matches_data, ...newMatches} : newMatches;
                // if(search){
                //     state.matches=newMatches
                // }else if(active_sport!=='Soccer'){
                // }
                // else{
                //     if(search_data){
                //         state.matches=newMatches
                //         state.searched_matches=null
                //     }else{
                //         state.matches = mergedMatches;
                //
                //     }
                // }
                state.matches=newMatches

                if (newMatches.slip_data) {
                    state.user_slip_validation = newMatches.slip_data
                }
                state.producer_down = action.payload.response.producer_status === 1
                // Reset initialLoading flag after initial fetch
                if (state.initialLoading) {
                    state.initialLoading = false;
                }
                state.error = null;
                state.fetching = false
                // state.prev_match_size = state.match_size || 10// prev_match_size
                state.match_size = newMatches?.length;
                state.loading=false

            })
            .addCase(matchesPrematch.rejected, (state, action) => {
                state.loading = false;
                if (state.initialLoading) {
                    state.initialLoading = false;
                }
                state.error = action.error.message;
                state.loading=false
            })
            .addCase(matchesSearch.pending, (state) => {
                if (state.initialLoading) {
                    state.loading = true; // Set loading to true only during the initial fetch
                }
                state.searched_matches = null;

            })
            .addCase(matchesSearch.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loading = false;
                state.active_sport=action.payload.active_sport

                const newMatches = action.payload?.response.data;
                state.searched_matches = newMatches;
                if (newMatches.slip_data) {
                    state.user_slip_validation = newMatches.slip_data
                }
                state.producer_down = action.payload.response.producer_status === 1
                // Reset initialLoading flag after initial fetch
                if (state.initialLoading) {
                    state.initialLoading = false;
                }
                state.error = null;
                state.fetching = false
                // state.prev_match_size = state.match_size || 10// prev_match_size
                state.match_size = newMatches?.length;
                state.matches = newMatches;

            })
            .addCase(matchesSearch.rejected, (state, action) => {
                state.loading = false;
                if (state.initialLoading) {
                    state.initialLoading = false;
                }
                state.error = action.error.message;
            })

            .addCase(matchesLive.pending, (state) => {
                state.loading = false;
            })
            .addCase(matchesLive.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loading = false;
                state.search=action.payload?.search
                state.active_sport=action.payload.active_sport
                const newMatches = action.payload?.response?.data;

                state.live_matches = newMatches;

                if (newMatches.slip_data) {
                    state.live_user_slip_validation = newMatches.slip_data
                }
                state.live_producer_down = action.payload.response?.producer_status === 1
                // Reset initialLoading flag after initial fetch
                state.error = null;
                state.live_fetching = false
                // state.prev_match_size = state.match_size || 10// prev_match_size
                state.live_match_size = newMatches?.length;

                state.isLoggedIn = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(matchesLive.rejected, (state, action) => {
                state.loading = false;
                state.fetching = false;
                state.error = action.error.message;
            })
            .addCase(matchesRebet.pending, (state) => {
                state.error = null;
                state.loading_bet_history = true
                state.rebet_match = null

            })
            .addCase(matchesRebet.fulfilled, (state, action) => {

                state.loading_bet_history = false
                const rebet_data = action.payload.success
                state.rebet_match = action.payload
                Object.entries(rebet_data).map(([match_id, match]) => {
                    match.live = Number(match?.live) !== 0
                    match.bet_type = String(match?.bet_type)
                    addToSlip(match)
                })
            })
            .addCase(matchesRebet.rejected, (state, action) => {
                state.error = action.error.message
                state.loading_bet_history = false
            })
            .addCase(matchesShareBet.pending, (state) => {
                state.error = null;
                state.loading_bet_history = true
                state.show_share_modal = false

            })
            .addCase(matchesShareBet.fulfilled, (state, action) => {
                state.share_bet = action.payload
                state.loading_bet_history = false
                state.show_share_modal = true

            })
            .addCase(matchesShareBet.rejected, (state, action) => {
                state.error = action.error.message
                state.loading_bet_history = false
            })
            .addCase(matchesDecodeBet.pending, (state) => {
                state.error = null;
                state.loading_bet_history = true
                state.show_share_modal = false
                state.share_bet = null

            })
            .addCase(matchesDecodeBet.fulfilled, (state, action) => {
                state.share_bet = true
                const decoded_match = action.payload.response.success
                const addDataToSlip = action.payload.betslip_share_code
                if (addDataToSlip) {
                    Object.entries(decoded_match).map(([match_id, match]) => {
                        match.live = Number(match?.live) !== 0
                        match.bet_type = String(match?.bet_type)
                        addToSlip(match)
                    })
                    setLocalStorage('betslip_share_code', addDataToSlip)
                }
                state.loading_bet_history = false
                state.show_share_modal = true

            })
            .addCase(matchesDecodeBet.rejected, (state, action) => {
                state.error = action.error.message
                state.loading_bet_history = false
            })
            .addCase(matchCategories.pending, (state) => {
                state.error = null;
            })
            .addCase(matchCategories.fulfilled, (state, action) => {
                state.sport_categories = action.payload;
                const data = action.payload
                setLocalStorage('sport_categories', data);
                state.error = null;
            })
            .addCase(matchCategories.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(fullBetDetails.pending, (state) => {
                state.error = null
                state.full_bet_details = null;
            })
            .addCase(fullBetDetails.fulfilled, (state, action) => {
                state.full_bet_details = action.payload
                state.fetching = false
                state.error = null
            })
            .addCase(fullBetDetails.rejected, (state, action) => {
                state.error = action.error.message;
                state.fetching = false
            })
            .addCase(betHistoryDetails.pending, (state) => {
                state.error = null
                state.bet_details = null
                state.bet_details_meta = null
            })
            .addCase(betHistoryDetails.fulfilled, (state, action) => {
                state.fetching = false
                state.bet_details = action.payload.data
                state.bet_details_meta = action.payload.meta
                state.error = null;
            })
            .addCase(betHistoryDetails.rejected, (state, action) => {
                state.fetching = false
                state.error = action.error.message;
            })
            .addCase(betCancel.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(betCancel.pending, (state) => {
                state.error = null;
                state.bet_cancel = null;
            })
            .addCase(betCancel.fulfilled, (state, action) => {
                state.bet_cancel = action.payload.response.message
                const bet_id = action.payload.bet_id
                state.bet_cancel_status = bet_id + "cancel_rq"
                setLocalStorage("bet_history_status", bet_id + "cancel_rq")
                state.bet_can_cancel_status = false
                state.bet_cancel_end_time = null
                state.error = null;
            })

            .addCase(sportLiveCount.pending, (state) => {
                state.error = null;
            })
            .addCase(sportLiveCount.fulfilled, (state, action) => {
                state.sport_live_count = action.payload.data;
                state.error = null;
            })
            .addCase(sportLiveCount.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase(marketGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(marketGroups.fulfilled, (state, action) => {
                state.market_groups = action.payload.data;
                setLocalStorage("market_groups",action.payload.data, 1800000 )
                state.loading = false;
                state.error = null;
            })
            .addCase(marketGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesJackpot.pending, (state) => {
                state.jackpot_loading = true;
            })
            .addCase(matchesJackpot.fulfilled, (state, action) => {
                state.jackpot_data = action.payload;
                state.error = null;
                state.jackpot_loading = false;
            })
            .addCase(matchesJackpot.rejected, (state, action) => {
                state.jackpot_loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesCompetition.pending, (state) => {
                // state.loading = true;
            })
            .addCase(matchesCompetition.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loading = false;
                const search=action.payload?.search
                state.search=search
                state.active_sport=action.payload.active_sport
                state.active_sub_type=action.payload.active_sub_type

                const newMatches = action.payload?.response.data;

                state.matches = newMatches;

                if (newMatches.slip_data) {
                    state.user_slip_validation = newMatches.slip_data
                }
                state.producer_down = action.payload.producer_status === 1
                // Reset initialLoading flag after initial fetch
                if (state.initialLoading) {
                    state.initialLoading = false;
                }
                state.error = null;
                state.fetching = false
                // state.prev_match_size = state.match_size || 10// prev_match_size
                state.match_size = newMatches?.length;
            })
            .addCase(matchesCompetition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesMorePrematchMarkets.pending, (state) => {
                state.error = null;
                if (state.initialLoading) {
                    state.more_matches = null
                }
            })
            .addCase(matchesMorePrematchMarkets.fulfilled, (state, action) => {
                state.fetching = false
                state.initialLoading = false
                state.loading = false;
                const more_matches = action.payload?.response.data;
                const more_matches_data=action.payload?.more_matches;

                const mergedMatches = more_matches.length > 0 ? {...more_matches_data , ...more_matches } : more_matches ;

                state.more_matches = mergedMatches
                state.user_slip_validation = action.payload?.response.slip_data
                state.producer_down = action.payload?.response.producer_status === 1
                state.error = null;
            })
            .addCase(matchesMorePrematchMarkets.rejected, (state, action) => {
                state.fetching = false;
                state.initialLoading = false
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(matchesMoreLiveMarkets.pending, (state) => {
                state.error = null;
                if (state.initialLoading) {
                    state.more_matches = null
                }            })
            .addCase(matchesMoreLiveMarkets.fulfilled, (state, action) => {
                state.fetching = false;
                state.initialLoading = false
                state.loading = false;
                state.user_slip_validation = action.payload.response.slip_data
                state.producer_down = action.payload.response.producer_status === 1
                state.error = null;
                const more_matches_data=action.payload.more_matches
                const more_matches = action.payload?.response.data;
                const mergedMatches = more_matches .length > 0 ? {...more_matches_data , ...more_matches } : more_matches ;
                state.more_matches = mergedMatches
            })
            .addCase(matchesMoreLiveMarkets.rejected, (state, action) => {
                state.fetching = false;
                state.initialLoading = false
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(favoriteMarkets.pending, (state) => {
                state.loading = true;
            })
            .addCase(favoriteMarkets.fulfilled, (state, action) => {
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
            .addCase(jackpotById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.jackpot_by_id = action.payload;
            })
            .addCase(jackpotById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(setInitialLoadingState, (state, action) => {
                const {param_fetch_type, tab, sport_id, filters, match} = action.payload;
                // Append tab or sport_id to the list of visited tabs

                if (param_fetch_type === "tabs") {
                    state.initialLoading = true
                    state.visited_tabs = Array.from(new Set([...state.visited_tabs, tab]));// Update initialLoading based on visitedTabs

                }else if(param_fetch_type==="filters"){
                    state.initialLoading = true
                    state.visited_filters = Array.from(new Set([...state.visited_filters, filters]));

                } else if(param_fetch_type==="sport_id"){
                    state.initialLoading = true
                    state.visited_sport_id = Array.from(new Set([...state.visited_sport_id, sport_id]));
                    // Update initialLoading based on visitedTabs

                }else if(param_fetch_type === "more_markets"){
                    state.initialLoading = true
                    state.visited_more_markets=   Array.from(new Set([...state.visited_more_markets, match]));

                }

                state.error = null;
            })
            .addCase(setFetching, (state, action) => {
                const {type, status} = action.payload;
                // fetching status
                if (state.hasOwnProperty(type)) {
                    state[type] = status
                }
            })
            .addCase(backNavigation, (state, action) => {
                const {status} = action.payload;
                // fetching status
                state.back_navigation = status
            })
            .addCase(setLimit, (state, action) => {
                const {limit} = action.payload;
                state.limit += limit
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
