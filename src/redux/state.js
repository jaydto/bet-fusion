import {getFromLocalStorage} from "../components/utils/local-storage";

const initialState = {
    data: [], // Initial state for the data reducer
    betting: {
        loading: false,
        error: null,
        matchesGames: null,
        jackpot: null,
        kiron: null,
        slip:null,
        picked:'',
    },
    auth: {
        isLoading: false,
        error: null,
        isLoggedIn: false,
        user: null,
        loading: false,
    }, // Initial state for the auth reducer
    nareLeague: {
            isLoading: false,
            error: null,
            isLoggedIn: false,
            user: null,
            loading: false,
            time_left:null,
            play_time:null,
            periods_data:null,
            isCountDownTimeActive:null,
            current_selection_period:null,
            periods_ready:false,
            inPlay:false,
            matches_data:null,
            playouts_data:null,
            results_data:null,
            standings_data:null,
            competitions_data:null,
            bet_history_data:null,
            bet_details_data:null,
            old_bets_data:null,
            old_bet_details:null,
            current_selection:null,
            round_id:null,
            first_period:null,
            market_id:null,
            competition_id:2,
            active_market:3,
            start_time:null,
            end_time:null,
            markets_data:null,
            market_options:null,
            close_spinner:null,
            start_playouts:null,
            game_week:null,
            ended:null

        }, // Initial state for the nareLeague reducer
    matchesData:{
        isLoading: false,
        error: null,
        user: null,
        loading: false,
        favorites_data:[],
    }
};

export default initialState;