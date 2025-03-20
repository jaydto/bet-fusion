// matchesSlice.js
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import { setLocalStorage } from "../components/utils/local-storage";
// Async thunk for matches
export const casinoList = createAsyncThunk(
  "virtuals/casinoGames",
  async ({ endpoint, method, category, provider }) => {
    const [status, response] = await makeRequest({
      url: endpoint,
      method: method,
    });
    if (status === 200) {
      return { response: response, category: category, provider: provider };
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

export const favoriteCasinoApi = createAsyncThunk(
  "matches/favoriteCasinoApi",
  async () => {
    const [status, response] = await makeRequest({
      url: "/v1/fetch-casino-favorite-games",
      method: "POST",
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching Casino Favorites failed");
    }
  }
);
export const favoriteCasinoData = createAsyncThunk(
  "matches/favoriteCasinoData",
  async (favoriteCasinoData) => {
    const [status, response] = await makeRequest({
      url: "/v1/add-casino-favorite-games",
      method: "POST",
      data: favoriteCasinoData,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Adding Casino Favorite failed");
    }
  }
);

export const casinoGames = createAsyncThunk(
  "virtuals/casinoGamesData",
  async ({ endpoint, method }) => {
    const [status, response] = await makeRequest({
      url: endpoint,
      method: method,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "casinoGames failed");
    }
  }
);

export const setState = createAction("virtuals/set", (stateToSet, data) => {
  return { payload: { stateToSet, data } };
});

export const casinoGamesSearch = createAsyncThunk(
  "virtuals/casinoGamesDataSearch",
  async ({ endpoint, method }) => {
    const [status, response] = await makeRequest({
      url: endpoint,
      method: method,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "casinoGames failed");
    }
  }
);

const virtualsSlice = createSlice({
  name: "virtuals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(casinoGames.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.casino_game_url = null;
        state.fetching = true;
      })
      .addCase(casinoGames.fulfilled, (state, action) => {
        state.loading = false;
        state.casino_games_data = action.payload?.data;
        state.casino_games_types = action.payload?.types;
        state.casino_games_providers = action.payload?.providers;
      })
      .addCase(casinoGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(casinoGamesSearch.pending, (state) => {
        state.loading_search = true;
        state.error = null;
      })
      .addCase(casinoGamesSearch.fulfilled, (state, action) => {
        state.loading_search = false;
        state.casino_games_data_search = action.payload?.data;
        state.casino_games_types_search = action.payload?.types;
        state.casino_games_providers_search = action.payload?.providers;
      })
      .addCase(casinoGamesSearch.rejected, (state, action) => {
        state.loading_search = false;
        state.error = action.error.message;
      })
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
        const { response, category, provider } = action.payload;

        // Update casino_games state
        const existingCategories = new Set(
          state.casino_games.map((game) => Object.keys(game)[0])
        );

        if (existingCategories.has(category)) {
          // Update data for existing category
          state.casino_games = state.casino_games.map((game) => {
            const key = Object.keys(game)[0];
            if (key === category) {
              // return { [category]: { ...game[category], [provider]: response.data ?? response.games } };
              return {
                [category]: response.data ?? response.games,
                provider: provider,
              };
            }
            return game;
          });
        } else {
          // Add new category
          state.casino_games.push({
            [category]: response.data ?? response.games,
            provider: provider,
          });
        }
        // else {
        //   // Add new category with provider data if available
        //   state.casino_games.push({
        //     [category]: provider ? { [provider]: response.data ?? response.games } : response.data ?? response.games
        //   });
        // }

        // Update providers_data state if needed
        // if (provider) {
        //   state.providers_data[provider] = response.data ?? response.games;
        // }
        if (provider.toLowerCase() == "smart-soft") {
          state.smartsoft_categories = response.types;
        }
      })
      .addCase(casinoList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      })
      .addCase(favoriteCasinoApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(favoriteCasinoApi.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const responsedata = action.payload?.data || [];
        state.favorites_data = action.payload?.data || [];
        // Update localStorage with the updated favorites
        setLocalStorage("favorite_casino", responsedata);
      })
      .addCase(favoriteCasinoApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(favoriteCasinoData.pending, (state) => {
        state.loading = true;
      })
      .addCase(favoriteCasinoData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(favoriteCasinoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default virtualsSlice.reducer;
