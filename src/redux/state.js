const initialState = {
    data: [], // Initial state for the data reducer
    auth: {
        isLoading: false,
        error: null,
        isLoggedIn: false,
        user: null,
        loading: false,
    }, // Initial state for the auth reducer
        // nareLeague: {
        //     isLoading: false,
        //     error: null,
        //     isLoggedIn: false,
        //     user: null,
        //     loading: false,
        // }, // Initial state for the nareLeague reducer
};

export default initialState;