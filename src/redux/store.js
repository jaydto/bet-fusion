// store.js (or store.ts for TypeScript)
import { configureStore } from "@reduxjs/toolkit";
import initialState from './state'
import rootReducer from './reducers'
// Add your reducers here (we'll create them in the next step)

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools:false,
});

export default store;



