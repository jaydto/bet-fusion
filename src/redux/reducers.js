// reducers.js (or reducers.ts for TypeScript)
import { combineReducers } from "redux";
import initialState from './state'

// Import your individual reducers here
import dataReducer from "./dataSlice"
import authReducer from "./authSlice"
import nareLeagueReducer from "./nareLeague"
import bettingReducer from "./bettingSlice"
import matchesReducer from "./matchesSlice"

const rootReducer = combineReducers({
    // Add your individual reducers here
    data: dataReducer,
    auth: authReducer,
    nareLeague: nareLeagueReducer,
    betting: bettingReducer,
    matchesData:matchesReducer
});

export default (state = initialState, action) => rootReducer(state, action);
