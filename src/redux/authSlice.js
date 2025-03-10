// authSlice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import initialState from "./state"; // Import the initial state from state.js
import makeRequest from "../components/utils/fetch-request";
import { setLocalStorage } from "../components/utils/local-storage";
// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData) => {
    const [status, response] = await makeRequest({
      url: "/v1/login",
      method: "POST",
      data: loginData,
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.message || "Login failed");
    }
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (signupData) => {
    const [status, response] = await makeRequest({
      url: "/v1/signup",
      method: "POST",
      data: signupData,
    });
    if (status === 200 ) {
      return response;
    } else {
      throw new Error(response?.error || response?.success?.message || "Signup failed");
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    const [status, response] = await makeRequest({
      url: "/api/forgotPassword",
      method: "POST",
      data: { email },
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Forgot password failed");
    }
  }
);


export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (values, { getState }) => {
      console.log("Values in resetPassword action:", values);  // Log here
      const state = getState();
      values.mobile = state?.auth?.reset_mobile;  // Make sure this is correct

      const endpoint = '/v1/reset-password';

      const [status, response] = await makeRequest({
          url: endpoint,
          method: 'POST',
          data: values
      });

      if (status === 200 || status === 201) {
        return response; // Return user data if successful
      } else {
        throw new Error(response?.error?.message || "Reset Password failed");
      }
  }
);

// Thunk action for submitting the form
// Async thunk for verifying the password reset token
export const verifyPassword = createAsyncThunk(
  "auth/verifyPassword",
  async (resetToken) => {
    const [status, response] = await makeRequest({
      url: "/api/verifyPassword",
      method: "POST",
      data: { resetToken },
    });
    if (status === 200) {
      return response;
    } else {
      throw new Error(response?.error || "Password verification failed");
    }
  }
);
// Redux action to reset a state
export const resetState = createAction("auth/reset", (stateToReset) => {
  return { payload: stateToReset };
});

export const setState = createAction(
  "auth/setAuthState",
  (stateToSet, data) => {
    return { payload: { stateToSet, data } };
  }
);


export const resetSubmitForm = createAsyncThunk(
  'auth/resetSubmitForm',
  async (values, { dispatch }) => {

    console.log("values", values)

      const endpoint = '/v1/code';

      const [status, response] = await makeRequest({
          url: endpoint,
          method: 'POST',
          data: values
      });



      dispatch(
        setState("reset_mobile", values?.mobile)
      );

      if (status === 200 || status === 201) {
        return response; // Return an object with both user and data properties
      } else {
        throw new Error(response?.error || "Otp failed");
      }

  }
);

// need to pass also the user data as part of the arguments being dispatched to userBalance thunk
export const userBalance = createAsyncThunk(
  "auth/userBalance",
  async ({ udata, user }) => {
    const [status, response] = await makeRequest({
      url: "/v1/balance",
      method: "POST",
      data: udata,
    });
    

    if (status === 200) {
      return { user: user, data:response}; // Return an object with both user and data properties
    } else {
      throw new Error(response?.error || "Fetching User Balance failed");
    }
  }
);

export const userPromoPoints = createAsyncThunk(
  "auth/userPromoPoints",
  async ({ udata, user }) => {
  
    const [status, response] = await makeRequest({
      url: "/v1/promopoints",
      method: "POST",
      data: udata,
    });

    if (status === 200) {
      return { user: user, promo_points: response }; // Return an object with both user and data properties
    } else {
      throw new Error(response?.error || "Fetching User Balance failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
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

  .addCase(resetSubmitForm .pending, (state) => {
      state.loading = true;
  })
  .addCase(resetSubmitForm .fulfilled, (state, action) => {
    console.log("action information", action)
      state.loading = false;
      state.resetSuccess = true;
      state.resetMessage=action.payload.success.message
      state.reset_id=action.payload.success.id
      state.otp_sent= true
  })
  .addCase(resetSubmitForm .rejected, (state, action) => {
      state.loading = false;
      state.resetSuccess = false;
      state.resetMessage = action.error.message;
      state.otp_sent=false
  })
    .addCase(resetPassword.pending, (state) => {
      state.loading = true;
  })
  .addCase(resetPassword.fulfilled, (state, action) => {
    console.log("new action information", action)
      state.loading = false;
      state.resetSuccessPassword = action.payload?.error?.message?false:true;
      state.resetPasswordMessage=action.payload?.success?.message ?? action.payload?.error?.message
  })
  .addCase(resetPassword.rejected, (state, action) => {
    console.log("action information", action)
      state.loading = false;
      state.resetSuccessPassword = false;
      state.resetPasswordMessage = action.error.message;
  })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(userBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { user, data } = action.payload;

        let u = {
          ...user,
          ...data.user,
         
        };

        state.user = u;

        setLocalStorage("user", u);
      })
      .addCase(userBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(userPromoPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(userPromoPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { user, data, promo_points } = action.payload;

        let u = {
          ...user,
          ...{
            promo_points: {
              points: promo_points?.points,
              promo_image:promo_points?.promo_image,
              title: promo_points?.title,
              end_date: promo_points?.end_date,
            },
          },
        };

        state.user = u;

        setLocalStorage("user", u);
      })
      .addCase(userPromoPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log("action made", action)
        state.user_sign_up = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        console.log("action error", action)
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(verifyPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetState, (state, action) => {
        const stateToReset = action.payload;
        if (state.hasOwnProperty(stateToReset)) {
          state[stateToReset] = initialState.auth[stateToReset];
        }
        state.error = null;
      });
  },
});

export default authSlice.reducer;
