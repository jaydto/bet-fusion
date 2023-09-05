import { createSlice } from '@reduxjs/toolkit';
import initialState from "./state";

const scrollSlice = createSlice({
	name: 'scroll',
	initialState,
	reducers: {
		startFetching: state => {
			state.fetching = true;
		},
		increaseLimit: state => {
			state.limit += 10;
		}
	},
});

export const { startFetching, increaseLimit, increaseReset } = scrollSlice.actions;

export default scrollSlice.reducer;