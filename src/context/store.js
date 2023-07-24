// context/store.js
import React, { createContext, useReducer, useContext } from "react";
import Reducer from "./reducer";

const initialState = {
    error: null,
    user: localStorage.getItem("auth_token")
};

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
};

export { StoreProvider, useStore, StoreContext }; // Export StoreContext
