import './App.css';
import React, {Suspense, useCallback, useContext, useEffect, useState} from "react";
import {StoreContext} from "./context/store";
import {useDispatch, useSelector} from "react-redux";
import {getFromLocalStorage, setLocalStorage} from "./components/utils/local-storage";
import {resetState} from "./redux/authSlice";
import {Navigate, Route, Routes, useNavigate,} from 'react-router-dom'
import Header from './components/header/header';
import {matchCategories} from "./redux/matchesSlice";
import {configSettings} from "./redux/dataSlice";

const Deposit3 = React.lazy(() => import("./components/pages/deposit-withraw/Deposit3"));
const DefaultPage = React.lazy(() => import('./components/defaultPage'));

const BetslipShareDecode = React.lazy(() => import('./components/betslip/BetslipShareDecode'))

const MatchAllMarkets = React.lazy(() => import('./components/all-markets'));

const Jackpot = React.lazy(() => import('./components/Jackpot'));

const Live = React.lazy(
    () => import('./components/live')
);

const HowToPlay = React.lazy(
    () => import('./components/pages/HowToPLay2')
);

const TermsAndConditions = React.lazy(
    () => import('./components/pages/terms-and-conditions/index')
);

const CookiePolicy = React.lazy(
    () => import('./components/pages/cookie-policy/index')
);

const DisputeResolution = React.lazy(
    () => import('./components/pages/dispute-resolution/index')
);

const ResponsibleGambling = React.lazy(
    () => import('./components/pages/responsible-gambling')
);

const AntimoneyLaundering = React.lazy(
    () => import('./components/pages/anti-money-laundering')
);

const PrivacyPolicy = React.lazy(
    () => import('./components/pages/privacy-policy')
);

const Withdraw = React.lazy(
    () => import('./components/pages/deposit-withraw/Withdraw')
);

const RedeemPoints = React.lazy(
    () => import('./components/pages/points/RedeemPoints2')
);

const Signup = React.lazy(
    () => import('./components/pages/auth/registerTwo')
);

const ResetPassword = React.lazy(
    () => import('./components/pages/auth/reset-password2')
)

const VerifyAccount = React.lazy(
    () => import('./components/pages/auth/verify-account2')
)

// const MobileApp = React.lazy(() => import('./components/pages/app'))

const ProtectedRoute = React.lazy(
    () => import('./components/utils/protected-route')
);

const PrintMatches = React.lazy(() => import('./components/pages/downloads'))

const Casino = React.lazy(() => import('./components/pages/casino/Casino'))

const LiveCasino = React.lazy(() => import('./components/pages/casino/LiveCasino'))
const FPL = React.lazy(() => import('./components/FPL'))
const LeaderBoard = React.lazy(() => import('././components/pages/LeaderBoards/LeaderBoards'))

const Virtuals = React.lazy(() => import('./components/pages/casino/Virtuals'))

const CasinoGamePlay = React.lazy(() => import('./components/pages/casino/GamePlay'))

const SpribeGamePlay = React.lazy(() => import('./components/pages/virtuals/SpribeGamePlay'))

const SpribeGames = React.lazy(() => import('./components/pages/virtuals/SpribeGames'))

const SmartSoftPlay = React.lazy(() => import('./components/pages/smart-soft/smart-soft'))

const SmartPlay = React.lazy(() => import('./components/pages/smart-soft/SmartPlay'))

const Promotions = React.lazy(() => import('./components/pages/promotions/Promotions'))

const LiveScore = React.lazy(() => import('./components/pages/livescore/LiveScore'))

const PageNotFound = React.lazy(() => import('./components/pages/404/NotFound'))

const ShaksGamePlay = React.lazy(() => import('./components/pages/shaks/ShaksGamePlay'))

const Kiron = React.lazy(() => import('./components/pages/Kiron'))

const BetslipPage = React.lazy(() => import("./components/pages/betslip/betslipPage"))

const Login = React.lazy(() => import('./components/pages/loginTwo'));

const NewProfile = React.lazy(() => import( "./components/pages/Accounts/NewProfile"));

const Promo = React.lazy(() => import('./components/pages/promotions/Promo'))
const BetHistory = React.lazy(() => import( "./components/pages/Accounts/component/BetHistory"));

const Logout = () => {
    const {dispatch} = useContext(StoreContext);
    const dispatchRedux = useDispatch();
    let navigate = useNavigate();
    setLocalStorage('user', null)
    dispatchRedux(resetState("user"))
    const out = useCallback(() => {
        localStorage.clear();
        dispatch({type: 'CLEAR_ALL_ITEMS'}); // Dispatch the action to clear all items

        navigate("/");
    }, [navigate]);

    useEffect(() => {
        out();
    }, [out]);

    return null
}


const App = React.memo(
    () => {
    const dispatchRedux = useDispatch()
    const scrollPosition = useSelector((state) => state.scroll.scroll)
    const appConfigs = useSelector((state) => state.data.app_config)
    const sport_categories = useSelector((state) => state.matchesData.sport_categories)

    const [settings, setSettings] = useState(getFromLocalStorage('settings'));
    const [sportCategories, setSportCategories] = useState(getFromLocalStorage('sport_categories'));

    useEffect(() => {
        setSettings(appConfigs || getFromLocalStorage('settings'))
    }, [appConfigs,getFromLocalStorage('settings')])

    useEffect(() => {
        setSportCategories(sport_categories || getFromLocalStorage('sport_categories'))
    }, [sport_categories, getFromLocalStorage('sport_categories')])

    const fetchData = async () => {
        let cached_categories = getFromLocalStorage('sport_categories');

        if (!cached_categories||cached_categories?.all_sports?.length===0) {
            dispatchRedux(matchCategories())
        }

    };

    const fetchAppConfigurations = async () => {

        let cached_settings = getFromLocalStorage('settings');

        if (!cached_settings) {
            dispatchRedux(configSettings())
        }
    }

    const cleanUpFuction = async () => {
        await fetchAppConfigurations();

        // Custom function to clear settings from localStorage
        // const clearLocalStorageSettings = () => {
        //     localStorage.removeItem('settings');
        //     // Manually call fetchAppConfigurations to update the settings
        //     fetchAppConfigurations();
        // };

        // Listen for the "storage" event to detect changes in "settings" localStorage
        const handleStorageChange = (event) => {
            if (event.key === 'settings') {
                fetchAppConfigurations();
            }
        };

        // Listen for "beforeunload" event to handle clearing localStorage in the same tab
        // const handleBeforeUnload = () => {
        //     clearLocalStorageSettings();
        // };

        window?.addEventListener('storage', handleStorageChange);
        // window?.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Clean up the event listeners when the component unmounts
            window?.removeEventListener('storage', handleStorageChange);
            // window?.removeEventListener('beforeunload', handleBeforeUnload);

        };
    }
    const cleanUpFuctionSportCategories = async () => {
        await fetchData();

    }


    useEffect(() => {
        if (settings === undefined || settings === null) {
            cleanUpFuction()
        }

    }, [settings]);

    useEffect(() => {
        if (sportCategories === undefined || sportCategories === null||sportCategories?.all_sports?.length===0) {
            cleanUpFuctionSportCategories()
        }

    }, [sportCategories]);

    return (
        <>
            <Header scrollPosition={scrollPosition}/>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route exact path="/" element={<DefaultPage/>}/>
                    <Route exact path="/highlights" element={<DefaultPage/>}/>
                    <Route exact path="/upcoming" element={<DefaultPage/>}/>
                    <Route exact path="/tomorrow" element={<DefaultPage/>}/>
                    <Route exact path="/countries" element={<DefaultPage/>}/>
                    <Route exact path="/competition/:id" element={<DefaultPage/>}/>
                    <Route exact path="/competition/:sportid/:categoryid/:competitionid" element={<DefaultPage/>}/>
                    <Route exact path="/highlights-competition/competition/:sportid/:categoryid/:competitionid" element={<DefaultPage/>}/>
                    <Route exact path="/upcoming-competition/competition/:sportid/:categoryid/:competitionid" element={<DefaultPage/>}/>
                    <Route exact path="/tomorrow-competition/competition/:sportid/:categoryid/:competitionid" element={<DefaultPage/>}/>

                    <Route exact path="/live" element={<Live/>}/>
                    <Route exact path="/live/:spid" element={<Live/>}/>

                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/fpl" element={<FPL/>}/>
                    <Route exact path="/share" element={<BetslipShareDecode/>}/>
                    <Route exact path="/virtuals" element={<Virtuals/>}/>
                    <Route exact path="/livescore" element={<LiveScore/>}/>
                    <Route exact path="/404" element={<PageNotFound/>}/>
                    <Route exact path="/casino" element={<Casino/>}/>
                    <Route exact path="/live-casino" element={<LiveCasino/>}/>
                    <Route exact path="/gameplay/:game_id/:live" element={<CasinoGamePlay/>}/>
                    <Route exact path="/nare-games/:game" element={<SpribeGamePlay/>}/>
                    <Route exact path="/nare-games" element={<SpribeGames/>}/>
                    <Route exact path="/smart-play" element={<SmartPlay/>}/>
                    <Route exact path="/smart-soft" element={<SmartSoftPlay/>}/>
                    <Route exact path="/shaks/:game" element={<ShaksGamePlay/>}/>

                    <Route exact path={"/nare-league"} element={<Kiron/>}/>
                    <Route exact path={"/results"} element={<Kiron/>}/>
                    <Route exact path={"/standing"} element={<Kiron/>}/>
                    <Route path={"/bet-history/:betID"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>
                    <Route exact path={"/bet-history"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>

                    <Route exact path={"/profile"} element={<ProtectedRoute><NewProfile/></ProtectedRoute>}/>
                    <Route exact path={"/my-bets"} element={<ProtectedRoute><BetHistory/></ProtectedRoute>}/>
                    <Route exact path={"/betslip"} element={<BetslipPage/>}/>
                    <Route exact path="/betslip-slip" element={<BetslipPage/>}/>
                    <Route exact path="/betslip-nare" element={<BetslipPage/>}/>
                    <Route exact path="/betslip-jackpot" element={<BetslipPage/>}/>
                    <Route exact path="/match/:id" element={<MatchAllMarkets/>}/>
                    <Route exact path="/match/live/:id" element={<MatchAllMarkets live/>}/>
                    <Route exact path="/jackpot" element={<Jackpot/>}/>
                    <Route exact path="/live1" element={<Live/>}/>
                    <Route exact path="/live1/:spid" element={<Live/>}/>
                    <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
                    <Route exact path="/anti-money-laundering" element={<AntimoneyLaundering/>}/>
                    <Route exact path="/responsible-gambling" element={<ResponsibleGambling/>}/>
                    <Route exact path="/dispute-resolution" element={<DisputeResolution/>}/>
                    <Route exact path="/cookie-policy" element={<CookiePolicy/>}/>
                    <Route exact path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                    <Route exact path="/how-to-play" element={<HowToPlay/>}/>
                    {/*<Route exact path="/lobby" element={<Lobby/>}/>*/}
                    <Route exact path="/signup" element={<Signup/>}/>
                    <Route exact path="/leader-board" element={<LeaderBoard/>}/>
                    <Route path={"/bet-history/:betID"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>
                    <Route path={"/bet-history"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>
                    <Route exact path="/reset-password" element={<ResetPassword/>}/>
                    <Route exact path="/verify" element={<VerifyAccount/>}/>
                    <Route exact path="/logout" element={<Logout/>}/>
                    <Route exact path="/print-matches" element={<PrintMatches/>}/>
                    <Route exact path="/promotions" element={<Promotions/>}/>
                    <Route exact path="/promo" element={<Promo/>}/>
                    <Route exact path="/deposit"
                           element={<ProtectedRoute><Deposit3/> </ProtectedRoute>}/>

                    <Route exact path="/withdraw"
                           element={<ProtectedRoute><Withdraw/></ProtectedRoute>}/>
                    <Route exact path="/redeem-points"
                           element={<ProtectedRoute><RedeemPoints/></ProtectedRoute>}/>
                </Routes>
            </Suspense>

        </>
    )
})

export default React.memo(App);
