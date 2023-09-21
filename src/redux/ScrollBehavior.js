import { createSlice } from '@reduxjs/toolkit';
import initialState from "./state";

const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScrollPosition: state => {
            state.scroll = true;
        },
        setScrollState:(state, action)=>{
            // You can access parameters passed to the action here
            const { position } = action.payload;
            state.position = position;
        },
        setScrollPast: (state, action) => {
            // You can access parameters passed to the action here
            const { scroll_past } = action.payload;
            state.scroll_past = scroll_past;
        },
        setScrollToTop: (state, action) => {
            // You can access parameters passed to the action here
            const { scroll_top } = action.payload;
            state.scroll_top = scroll_top;
        },
        removeScrollPosition: state => {
            state.scroll= false;
        }
    },
});

export const { setScrollPosition, setScrollState,setScrollToTop, removeScrollPosition, setScrollPast } = scrollSlice.actions;

export default scrollSlice.reducer;
