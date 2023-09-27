import { createSlice } from '@reduxjs/toolkit';
import initialState from "./state";

const scrollSlice = createSlice({
    name: 'navigations',
    initialState,
    reducers: {
        setNavigations:(state, action)=>{
            // You can access parameters passed to the action here
            const { nav} = action.payload;
            state.top_navigations = nav;
        },
        updateNavigations : (state, action) => {
            // You can access parameters passed to the action here
            const { nav } = action.payload;
            state.top_navigations = nav;
        },

    },
});

export const { setScrollPosition, setScrollState,setScrollToTop, removeScrollPosition, setScrollPast } = scrollSlice.actions;

export default scrollSlice.reducer;
