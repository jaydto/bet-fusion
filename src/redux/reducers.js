// reducers.js
import { combineReducers } from "redux";
import initialState from './state'

// Import your individual reducers here
import dataReducer from "./dataSlice"
import authReducer from "./authSlice"
import nareLeagueReducer from "./nareLeague"
import bettingReducer from "./bettingSlice"
import matchesReducer from "./matchesSlice"
import virtualsReducer from './virtualsSlice';
import scrollReducer from './ScrollBehavior';
import navigationReducer from './Navigations';



const rootReducer = combineReducers({
    // Add your individual reducers here
    data: dataReducer,
    auth: authReducer,
    nareLeague: nareLeagueReducer,
    betting: bettingReducer,
    matchesData:matchesReducer,
    virtuals: virtualsReducer,
    scroll: scrollReducer,
    navigations:navigationReducer


});

export default (state = initialState, action) => rootReducer(state, action);
