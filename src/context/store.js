import React, {createContext, useReducer, useEffect} from "react";
import Reducer from './reducer'


const initialState = {
    error: null,
    user:localStorage.getItem('auth_token')
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
   
    /**
    useEffect(() => {
        console.log("Calling useEffect in store fore the [] time");
        const local_state = JSON.parse(localStorage.getItem('state'))
        if (local_state) {
            dispatch({type: 'OVERRIDE', key:'override', payload: local_state});
        }
    }, [])
    
    useEffect(() => {
        console.log("Calling useEffect in store on state change ", state);
        localStorage.setItem('state', JSON.stringify(state))
    }, [state])
    */
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;
