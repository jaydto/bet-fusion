// matchesSlice.js
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
// Async thunk for matches
export const casinoList = createAsyncThunk(
  "virtuals/casinoGames",
  async ({ endpoint, method, category }) => {
    const [status, response] = await makeRequest({
      url: endpoint,
      method: method,
    });
    if (status === 200) {
      return {response:response, category:category};
    } else {
      throw new Error(response?.error || "Fetching Casino failed");
    }
  }
);
export const casinoCreatePlayer = createAsyncThunk(
  "virtuals/casinoCreatePlayer",
  async () => {
    const [status, response] = await makeRequest({
      url: "/v1/casino/create/player",
      method: "GET",
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Create Casino Player failed");
    }
  }
);

export const casinoGamePlay = createAsyncThunk(
  "virtuals/casinoGameplay",
  async ({ endpoint, method }) => {
    const [status, response] = await makeRequest({
      url: endpoint,
      method: method,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "casinoGamePlay failed");
    }
  }
);

export const setState = createAction("virtuals/set", (stateToSet, data) => {
  return { payload: { stateToSet, data } };
});

const virtualsSlice = createSlice({
  name: "virtuals",
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
      .addCase(casinoList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(casinoList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { response, category } = action.payload;
        // console.log("casino_games_data", category);
      
        // Create a Set of existing categories
        const existingCategories = new Set(state.casino_games.map(game => Object.keys(game)[0]));
      
        if (existingCategories.has(category)) {
          // If the category already exists, update its data
          state.casino_games = state.casino_games.map(game => {
            const key = Object.keys(game)[0];
            if (key === category) {
              return { [category]: response.data };
            }
            return game;
          });
        } else {
          // If the category doesn't exist, add it to casino_games
          state.casino_games.push({ [category]: response.data });
        }
      
        state.casino_categories = response.types;
      })
      
      // .addCase(casinoList.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   // state.casino_games = action.payload?.data;
      //   const { response, category } = action.payload;
      //   console.log("casino_games_data", category)
        

      //   state.casino_games.push({ [category]: response.data });
      //   state.casino_categories = response.types;
      // })
      .addCase(casinoList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.fetching = false;
      })
      .addCase(casinoGamePlay.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.casino_game_url = null;
        state.fetching = true;
      })
      .addCase(casinoGamePlay.fulfilled, (state, action) => {
        state.loading = false;
        state.casino_game_url = action.payload.result?.gameURL;
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
      });
  },
});

export default virtualsSlice.reducer;
