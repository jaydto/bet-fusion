// matchesSlice.js
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import {
  clearTrackingData,
  setLocalStorage,
} from "../components/utils/local-storage";
// Async thunk for matches
export const configSettings = createAsyncThunk(
  "data/configSettings",
  async () => {
    const [status, response] = await makeRequest({
      url: "/v1/bet/settings",
      method: "POST",
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching Prematch failed");
    }
  }
);
export const printMatchesData = createAsyncThunk(
  "data/printMatchesData",
  async ({ method, endpoint }) => {
    const [status, response] = await makeRequest({
      url: endpoint,
      method: method,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Print matches Failed");
    }
  }
);
export const printJackpotData = createAsyncThunk(
  "data/printJackpotData",
  async ({ method, endpoint }) => {
    const [status, response] = await makeRequest({
      url: endpoint,
      method: method,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Print matches Failed");
    }
  }
);
export const leaderBoardData = createAsyncThunk(
  "data/leaderBoard",
  async () => {
    const [status, response] = await makeRequest({
      url: "/v1/leaderboard",
      method: "POST",
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching Leader Board failed");
    }
  }
);
export const leaderBoardxData = createAsyncThunk(
  "data/leaderBoardx",
  async () => {
    const [status, response] = await makeRequest({
      url: "/v1//jetxleaderboard",
      method: "POST",
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching Leader Board Jetx failed");
    }
  }
);
export const carouselImages = createAsyncThunk(
  "data/carouselImages",
  async () => {
    const [status, response] = await makeRequest({
      url: "/v1/carousel-images",
      method: "GET",
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching Carousel images failed");
    }
  }
);

export const casinoCarouselImages = createAsyncThunk(
  "data/casinoCarouselImages",
  async () => {
    const [status, response] = await makeRequest({
      url: "/v1/casino-carousel-images",
      method: "GET",
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching CAsino Carousel images failed");
    }
  }
);

export const userPoints = createAsyncThunk(
  "data/userPoints",
  async (values) => {
    const [status, response] = await makeRequest({
      url: "/redeem-points",
      method: "POST",
      data: values,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Redeem Points failed");
    }
  }
);

export const userWithdrawal = createAsyncThunk(
  "data/userWithdrawal",
  async (amount) => {
    const [status, response] = await makeRequest({
      url: "/withdraw",
      method: "POST",
      data: amount,
      use_jwt: true,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response || "Withdrawal Request failed");
    }
  }
);

export const userDeposits = createAsyncThunk(
  "data/userDeposits",
  async (amount) => {
    const [status, response] = await makeRequest({
      url: "/stk/deposit",
      method: "POST",
      data: amount,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching Deposit failed");
    }
  }
);
export const userSelfExclusion = createAsyncThunk(
  "data/userSelfExclusion",
  async (data) => {
    const [status, response] = await makeRequest({
      url: "/v1/self-exclude",
      method: "POST",
      data: data,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "SelfExclusion failed");
    }
  }
);
export const resetState = createAction("data/reset", (stateToReset) => {
  return { payload: stateToReset };

});

export const userDepositsConfirm = createAsyncThunk(
  "data/userDepositsConfirm",
  async (confirmation) => {
    const [status, response] = await makeRequest({
      url: "/v1/deposit-confirmation",
      method: "POST",
      data: confirmation,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Fetching Deposit failed");
    }
  }
);
export const setState = createAction("data/set", (stateToSet, data) => {
  return { payload: { stateToSet, data } };
});

const dataSlice = createSlice({
  name: "data",
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
      .addCase(userPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.points_message = null;
      })
      .addCase(userPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.points_message = action.payload?.message;
      })
      .addCase(userPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(printMatchesData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.printed_data = null;
        state.loaded = false;
      })
      .addCase(printMatchesData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const matches = action.payload.data;
        state.printed_data = matches;
        state.loaded = matches?.length > 0;
      })
      .addCase(printMatchesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(printJackpotData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.printed_data = null;
        state.loaded = false;
        state.print_jackpot_data = null;
      })
      .addCase(printJackpotData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.printed_data = action.payload?.data;
        state.loaded = action.payload.data?.length > 0;
        state.print_title = action.payload.meta.name;
        state.print_jackpot_data = action.payload.meta;
      })
      .addCase(printJackpotData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(leaderBoardData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.leader_board = null;
      })
      .addCase(leaderBoardData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.leader_board = action.payload;
      })
      .addCase(leaderBoardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(leaderBoardxData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.leader_boardx = null;
      })
      .addCase(leaderBoardxData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.leader_boardx = action.payload;
      })
      .addCase(leaderBoardxData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userSelfExclusion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.self_exclsuion_message = null;
        state.show_modal = false;
      })
      .addCase(userSelfExclusion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.self_exclsuion_message = action.payload?.success;
        state.self_exclsuion_time = action.payload?.time_duration;
        state.show_modal = true;
      })
      .addCase(userSelfExclusion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetState, (state, action) => {
        const stateToReset = action.payload;
        if (state.hasOwnProperty(stateToReset)) {
          state[stateToReset] = initialState.matchesData[stateToReset];
        }
        state.error = null;
      })

      .addCase(userWithdrawal.pending, (state) => {
        state.withdraw_loading = true;
        state.error = null;
      })
      .addCase(userWithdrawal.fulfilled, (state, action) => {
        state.error = null;
        state.withdraw_loading = false;
        state.withdrawal_message = action.payload;
      })
      .addCase(userWithdrawal.rejected, (state, action) => {
        state.withdraw_loading = false;
        state.error = action.error.message;
      })
      .addCase(userDeposits.pending, (state) => {
        state.deposit_loading = true;
        state.error = null;
      })
      .addCase(userDeposits.fulfilled, (state, action) => {
        state.deposit_loading = false;
        state.error = null;
        clearTrackingData();
        state.deposits_message = action.payload;
      })
      .addCase(userDeposits.rejected, (state, action) => {
        state.deposit_loading = false;
        state.error = action.error.message;
      })
      .addCase(userDepositsConfirm.pending, (state) => {
        state.deposit_confirm_loading = true;
        state.deposits_confirm_message = null;
        state.error = null;
      })
      .addCase(userDepositsConfirm.fulfilled, (state, action) => {
        state.deposit_confirm_loading = false;
        state.error = null;
        clearTrackingData();
        state.deposits_confirm_message = action.payload?.success;
      })
      .addCase(userDepositsConfirm.rejected, (state, action) => {
        state.deposit_confirm_loading = false;
        state.error = action.error.message;
      })
      .addCase(carouselImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(carouselImages.fulfilled, (state, action) => {
        state.carousel_banners = action.payload.images;
        state.loading = false;
        state.error = null;
        const status = action.payload.status;
        if (status === 200) {
          setLocalStorage("carousel_banners", action.payload.images, 1800000);
        }
      })
      .addCase(carouselImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(casinoCarouselImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(casinoCarouselImages.fulfilled, (state, action) => {
        state.casino_carousel_banners = action.payload.images;
        state.loading = false;
        state.error = null;
        const status = action.payload.status;
        if (status === 200) {
          setLocalStorage("casino_carousel_banners", action.payload.images, 1800000);
        }
      })
      .addCase(casinoCarouselImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(configSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(configSettings.fulfilled, (state, action) => {
        state.app_config = action.payload?.message;
        state.loading = false;
        state.error = null;
        const status = action.payload?.status_code;

        if (status === 200) {
          setLocalStorage("settings", action.payload.message, 1800000);
        }
      })
      .addCase(configSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
