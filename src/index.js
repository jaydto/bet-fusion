import React, {Suspense, useCallback, useEffect} from "react";
import {render} from "react-dom";

import {BrowserRouter, Navigate, Route, Routes, useNavigate,} from 'react-router-dom'
import {setLocalStorage} from "./components/utils/local-storage";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/application.css';
import './assets/css/tolkits.css';
import './assets/css/sidebar-menu.css';
import './index.css';
import './assets/css/newCss.css'
import './tailwind.css';
import './assets/css/Themes.css'
import Store from './context/store';
import ReactGA from 'react-ga4';
import Loading from "./components/loading/LoadingSuspense";


const TRACKING_ID = "G-5NLSN9BLN4";
ReactGA.initialize(TRACKING_ID);

const Deposit3=React.lazy(()=>import("./components/pages/deposit-withraw/Deposit3"));

const Index = React.lazy(() => import('./components'));

const CompetitionsMatches = React.lazy(
    () => import('./components/competition-matches')
);
const BetslipShareDecode = React.lazy(() => import('./components/betslip/BetslipShareDecode'))

const MatchAllMarkets = React.lazy(() => import('./components/all-markets'));


const Jackpot = React.lazy(() => import('./components/Jackpot'));

const Live = React.lazy(
    () => import('./components/live')
);

const MyBets = React.lazy(
    () => import('./components/pages/Accounts/component/my-bets2')
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
const MobileApp = React.lazy(() => import('./components/pages/app'))


const ProtectedRoute = React.lazy(
    () => import('./components/utils/protected-route')
);

const PrintMatches = React.lazy(() => import('./components/pages/downloads'))

const Casino = React.lazy(() => import('./components/pages/casino/Casino'))

const LiveCasino = React.lazy(() => import('./components/pages/casino/LiveCasino'))

const Virtuals = React.lazy(() => import('./components/pages/casino/Virtuals'))

const CasinoGamePlay = React.lazy(() => import('./components/pages/casino/GamePlay'))

const SpribeGamePlay = React.lazy(() => import('./components/pages/virtuals/SpribeGamePlay'))

const SpribeGames = React.lazy(() => import('./components/pages/virtuals/SpribeGames'))

const SmartSoftPlay = React.lazy(() => import('./components/pages/smart-soft/smart-soft'))

const SmartPlay = React.lazy(() => import('./components/pages/smart-soft/SmartPlay'))

const Promotions = React.lazy(() => import('./components/pages/promotions/Promotions'))

const LiveScore = React.lazy(() => import('./components/pages/livescore/LiveScore'))

const PageNotFound = React.lazy(() => import('./components/pages/404/NotFound'))

const ShaksGamePlay=React.lazy(()=>import('./components/pages/shaks/ShaksGamePlay') )

// const Kiron=React.lazy(()=>import('./components/pages/Kiron/index'))
const Kiron=React.lazy(()=>import('./components/pages/Kiron'))

const BetslipPage =React.lazy(()=> import("./components/pages/betslip/betslipPage"))

const Login=React.lazy(()=>import('./components/pages/loginTwo'));

const NewProfile =React.lazy(()=>import( "./components/pages/Accounts/NewProfile"));

const Affiliate =React.lazy(()=>import( "./components/Affiliate/Affiliate"));

const Logout = () => {
    let navigate = useNavigate();
    setLocalStorage('user', null)
    const out = useCallback(() => {
        localStorage.clear();
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        out();
    }, [out]);
    return null;
}

const container = document.getElementById("app");
render((
    <Store>
        <BrowserRouter>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                    <Route exact path="/" element={<Index/>}/>
                    <Route exact path="/highlights" element={<Index/>}/>
                    <Route exact path="/upcoming" element={<Index/>}/>
                    <Route exact path="/tomorrow" element={<Index/>}/>
                    <Route exact path= "/countries" element={<Index/>}/>
                    <Route exact path="/live" element={<Live/>}/>
                    <Route exact path="/live/:spid" element={<Live/>}/>
                    <Route exact path="/login" element={<Login/>}/>
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
                    <Route exact path={"/bet-history"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>
                    <Route exact path={"/profile"} element={<NewProfile/>}/>
                     <Route exact path={"/betslip"} element={<BetslipPage/>}/>
                    <Route exact path="/betslip-slip" element={<BetslipPage/>}/>
                    <Route exact path="/betslip-nare" element={<BetslipPage/>}/>
                    <Route exact path="/betslip-jackpot" element={<BetslipPage/>}/>
                    <Route exact path="/competition/:id" element={<CompetitionsMatches/>}/>
                    <Route exact path="/competition/:sportid/:categoryid/:competitionid"
                           element={<CompetitionsMatches/>}/>
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
                    <Route exact path="/signup" element={<Signup/>}/>
                    <Route exact path="/reset-password" element={<ResetPassword/>}/>
                    <Route exact path="/verify" element={<VerifyAccount/>}/>
                    <Route exact path="/app" element={<MobileApp/>}/>
                    <Route exact path="/logout" element={<Logout/>}/>
                    <Route exact path="/print-matches" element={<PrintMatches/>}/>
                    <Route exact path="/promotions" element={<Promotions/>}/>
                    <Route exact path="/deposit"
                           element={<ProtectedRoute><Deposit3/> </ProtectedRoute>}/>
                    <Route exact path="/affiliate"
                           element={<Affiliate/> }/>
                    <Route exact path="/withdraw"
                           element={<ProtectedRoute><Withdraw/></ProtectedRoute>}/>
                    <Route exact path="/redeem-points"
                           element={<ProtectedRoute><RedeemPoints/></ProtectedRoute>}/>
                    <Route exact path="/my-bets"
                           element={<ProtectedRoute><MyBets/> </ProtectedRoute>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    </Store>
), container);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
