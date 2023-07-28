// bettingSlice.js
import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {getBetslip, getJackpotBetslip} from "../components/utils/betslip"; // Import the makeRequest function
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
const clean = (str) => {
    if (typeof str !== "string") return "";
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};
// Add the Jackpot, kiron, and matches parameters to addToSlip
export const addToSlip = createAction("betting/addToSlip", (slipData) => {
    return { payload: slipData };
});

// Add the Jackpot, kiron, and matches parameters to removeFromSlip
export const removeFromSlip = createAction("betting/removeFromSlip", (match_id, isitJackpot, kiron, matches) => {
    return { payload: { match_id, isitJackpot, kiron, matches } };
});
export const maxPickReached = createAction("betting/maxPickReached");
export const updateMatchPicked = createAction("betting/updateMatchPicked");
export const updatePickedChoices = createAction("betting/updatePickedChoices");
export const updateOddValue = createAction("betting/updateOddValue");

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
                state.loading = false;
                state.error = null;
                state.matche = action.payload;
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
                state.jackpot = action.payload;
            })
            .addCase(bettingKiron.pending, (state) => {
                state.loading = true;
            })
            .addCase(bettingKiron.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.kiron = action.payload;
            })
            .addCase(bettingKiron.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle adding and removing items from the slip
            .addCase(addToSlip, (state, action) => {
                state.slip = [...state.slip, action.payload];
            })
            .addCase(removeFromSlip, (state, action) => {
                state.slip = state.slip.filter((item) => item.match_id !== action.payload);
            })
            .addCase(maxPickReached, (state) => {
                state.picked = ""; // Assuming 'picked' is a state property
            })
            .addCase(updateMatchPicked, (state, action) => {
                const { reference, match, mkt } = action.payload;
                if (state?.[reference]) {
                    if (state?.[reference].startsWith("remove.")) {
                        state.picked = "";
                    } else {
                        let uc = clean(
                            match.match_id +
                            "" +
                            match.sub_type_id +
                            (match?.[mkt] || match?.odd_key || "draw")
                        );

                        if (state?.[reference] === uc) {
                            state.picked = "picked";
                        } else {
                            state.picked = "";
                        }
                    }
                }
            })
            .addCase(updatePickedChoices, (state, action) => {
                const { match, mkt, jackpot } = action.payload;
                const betslip = jackpot ? getJackpotBetslip() : getBetslip() || {};

                let uc = clean(
                    match.match_id +
                    "" +
                    match.sub_type_id +
                    (match?.[mkt] || match?.odd_key || "draw")
                );

                if (
                    betslip?.[match.match_id]?.match_id === match.match_id &&
                    uc === betslip?.[match.match_id]?.ucn
                ) {
                    state.picked = "picked";
                } else {
                    state.picked = "";
                }
            })
            .addCase(updateOddValue, (state, action) => {
                const { match, mkt } = action.payload;
                if (match) {
                    const { match_id, sub_type_id, odds, odd_key } = match;

                    let uc = clean(
                        match_id + "" + sub_type_id + (match?.[mkt] || odd_key || "draw")
                    );

                    state.ucn = uc;

                    switch (mkt) {
                        case "home_team":
                            state.oddValue = odds.home_odd;
                            break;
                        case "away_team":
                            state.oddValue = odds.away_odd;
                            break;
                        case "draw":
                            state.oddValue = odds.neutral_odd || odd_key;
                            break;
                        default:
                            state.oddValue = match.odd_value;
                    }
                }
            });

    },
});

export default bettingSlice.reducer;
