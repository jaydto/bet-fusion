// reducers.js
import { combineReducers } from "redux";
import initialState from './state'

// Import your individual reducers here
import dataReducer from "./dataSlice"
import authReducer from "./authSlice"
import virtualLeagueReducer from "./virtualLeague"
import bettingReducer from "./bettingSlice"
import virtualsReducer from './virtualsSlice';
import scrollReducer from './ScrollBehavior';
import navigationReducer from './Navigations';



const rootReducer = combineReducers({
    // Add your individual reducers here
    data: dataReducer,
    auth: authReducer,
    virtualLeague: virtualLeagueReducer,
    betting: bettingReducer,
    virtuals: virtualsReducer,
    scroll: scrollReducer,
    navigations:navigationReducer


});

export default (state = initialState, action) => rootReducer(state, action);
