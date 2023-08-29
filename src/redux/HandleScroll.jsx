// scrollThunks.js
import { startFetching, increaseLimit } from './scrollSlice';
import throttle from "lodash/throttle";

export const handleScroll = () => (dispatch, getState) => {
	const { fetching, limit } = getState().scroll;

	const throttledHandleScroll = throttle(() => {
		const scrollPosition = window.scrollY;
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const distanceToBottom = documentHeight - (scrollPosition + windowHeight);

		if (!fetching && distanceToBottom <= 500 && limit >= 20) {
			dispatch(startFetching());
			dispatch(increaseLimit());
		}
	}, 100);

	window.addEventListener('scroll', throttledHandleScroll);

	return () => {
		window.removeEventListener('scroll', throttledHandleScroll);
	};
};