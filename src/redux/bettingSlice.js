// bettingSlice.js
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import { getBetslip, getJackpotBetslip } from "../components/utils/betslip"; // Import the makeRequest function
// Async thunk for matches

export const bettingMatchesGames = createAsyncThunk(
  "betting/matchesGames",
  async ({ endpoint, method, data, jackpot, use_jwt }) => {
    const errors = []; // Collect errors in an array

    try {
      const [status, response] = await makeRequest({
        url: endpoint,
        method: method,
        data: data,
        use_jwt: use_jwt,
      });

      if (status === 201 || status === 200 || response?.status === 201) {
        return response;
      } else {
        const customError = {};

        customError.message = jackpot
          ? response?.error
          : response?.message ||
            `${jackpot ? "jackpot " : ""} Bet placement failed`;

        customError.status_balance = response?.insufficient_balance || false;

        errors.push(customError); // Collect the custom error object in the array
      }
    } catch (error) {
      errors.push(error); // Collect the error in the array
    }

    if (errors.length > 0) {
      // If there are errors, throw the errors array itself

      throw new Error(JSON.stringify(errors));
      //return thunkAPI.
    }
  }
);

export const bettingJackpot = createAsyncThunk(
  "betting/jackpot",
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
  }
);
export const bettingKiron = createAsyncThunk(
  "betting/kiron",
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
  }
);

const findPostableSlip = () => {
    let betslips = getBetslip() || {};
    var values = Object.keys(betslips).map(function (key) {
      return betslips[key];
    });
    return values;
  };
const findPostableReduxSlip = (betslips={}) => {
    
    var values = Object.keys(betslips).map(function (key) {
      return betslips[key];
    });
    console.log("values information")
    return values;
  };

  export const betslipValidation = createAsyncThunk(
    "betting/betslipValidation",
    async ({ endpoint, method, payload }, { getState }) => {
        const state = getState();
        let dataToSend = payload && payload.length > 0 ? payload : findPostableReduxSlip(state.betting.betslip)  || {};

        const [status, response] = await makeRequest({
            url: endpoint,
            method: method,
            data: dataToSend,
        });
        if (status === 200) {
            return response;
        } else {
            throw new Error(response?.error || "BetslipValidation failed");
        }
    }
);

  

// Your regular action creator (if needed)
export const matchSelector = (matchId, matchSelector, ucn) => ({
  type: "matchSelector",
  payload: { matchId, matchSelector, ucn },
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
export const removeFromSlip = createAction(
  "betting/removeFromSlip",
  (match_id, isitJackpot, kiron, matches) => {
    return { payload: { match_id, isitJackpot, kiron, matches } };
  }
);
export const setSelected = createAction(
  "betting/setSelected",
  (reference, cstn) => {
    return { payload: { reference, cstn } };
  }
);
export const resetStateBetslip = createAction(
  "betting/reset",
  (stateToReset) => {
    return { payload: stateToReset };
  }
);

let fetchInterval; // Declare the interval variable outside the action creator

export const startBetslipValidation =
  ({ endpoint, method, interval, data = {}}) =>
  async (dispatch) => {
    // Dispatch the initial fetch
    const payload = { endpoint, method, data };

    // Set up the interval to fetch matches every 20 seconds
    fetchInterval = setInterval(() => {
      dispatch(betslipValidation(payload));
    }, interval); // 20000 milliseconds = 20 seconds //5000 milliseconds = 5 seconds
  };

export const stopBetslipValidation = () => () => {
  if (fetchInterval) {
    clearInterval(fetchInterval);
  }
};

export const setState = createAction("betting/set", (stateToSet, data) => {
  return { payload: { stateToSet, data } };
});
export const getSelected = (reference) => {
  return (dispatch, getState) => {
    const state = getState();
    const referencedState = state.betting[reference]; // Assuming 'betting' is your slice name
    return referencedState;
  };
};

export const removeSelected = createAction(
  "betting/removeSelected",
  (reference) => {
    return { payload: { reference } };
  }
);

export const setPickedData = createAction("betting/setPickedData", (picked) => {
  return { payload: { picked } };
});

export const removePickedData = createAction(
  "betting/removePickedData",
  (picked) => {
    return { payload: { picked } };
  }
);
export const setMatchBetslip = createAction(
  "betting/setMatchBetslip",
  ({ betslip_type, data }) => {
    return { payload: { betslip_type, data } };
  }
);
export const maxPickReached = createAction("betting/maxPickReached");
export const updateMatchPicked = createAction("betting/updateMatchPicked");
export const updatePickedChoices = createAction("betting/updatePickedChoices");
export const updateOddValue = createAction("betting/updateOddValue");
export const removeSlipSelection = createAction(
  "betting/removeSlipSelection",
  ({ match_selector, ucn }) => {
    return { payload: { match_selector, ucn } };
  }
);

const bettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setState, (state, action) => {
        const { stateToSet, data } = action.payload;
        if (state.hasOwnProperty(stateToSet)) {
          state[stateToSet] = data;
        }
        state.error = null;
      })
      .addCase(bettingMatchesGames.pending, (state) => {
        state.loading = true;
        state.bet_placement_message = null;
      })
      .addCase(bettingMatchesGames.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        const insufficient_balance = action.payload.insufficient_balance;
        if (insufficient_balance) {
          state.insufficient_balance = insufficient_balance;
        }
        state.bet_placement_message = action.payload.message;
      })
      .addCase(bettingMatchesGames.rejected, (state, action) => {
        state.loading = false;
        const message = JSON.parse(action.error.message);
        state.error = message[0].message;
        state.insufficient_balance = message[0].status_balance;
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
      .addCase(betslipValidation.pending, (state) => {
        state.loading_slip_validation = true;
      })
      .addCase(betslipValidation.fulfilled, (state, action) => {
        state.loading_slip_validation = false;
        state.error_slip_validation = null;
        state.slip_validation_data = action.payload.data;
      })
      .addCase(betslipValidation.rejected, (state, action) => {
        state.loading_slip_validation = false;
        state.error_slip_validation = action.error.message;
        state.slip_validation_data = [];
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
        state.slip = state.slip.filter(
          (item) => item.match_id !== action.payload
        );
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
      })
      .addCase(setSelected, (state, action) => {
        const dynamicKey = action.payload.reference;
        state[dynamicKey] = action.payload.cstn;
      })
      .addCase(setMatchBetslip, (state, action) => {
        const type = action.payload.betslip_type;
        const data = action.payload.data;
        if (type === "betslip") {
          state.betslip = data;
        } else {
          state.jackpotbestlip = data;
        }
      })
      .addCase(removeSlipSelection, (state, action) => {
        const dynamicKey = action.payload.match_selector;
        state[dynamicKey] = action.payload.ucn;
      })

      .addCase(removeSelected, (state, action) => {
        const dynamicKey = action.payload.reference;
        delete state[dynamicKey];
      })
      .addCase(setPickedData, (state, action) => {
        state.picked = action.payload.picked;
      })
      .addCase(removePickedData, (state, action) => {
        state.picked = action.payload.picked;
      })
      .addCase(resetStateBetslip, (state, action) => {
        const stateToReset = action.payload;
        if (state.hasOwnProperty(stateToReset)) {
          state[stateToReset] = initialState.betting[stateToReset];
        }
      });
  },
});

export default bettingSlice.reducer;
