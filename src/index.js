import React, {useEffect, useCallback, Suspense} from "react";
import {render} from "react-dom";

import {
    BrowserRouter,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/application.css';
import './assets/css/tolkits.css';
import './assets/css/sidebar-menu.css';
import './index.css';
import Store from './context/store';

const Index = React.lazy(() => import('./components/index'));
const CompetitionsMatches = React.lazy(
    () => import('./components/competition-matches')
);
const MatchAllMarkets = React.lazy(() => import('./components/all-markets'));
const Jackpot = React.lazy(() => import('./components/jackpot'));
const Live = React.lazy(
    () => import('./components/live')
);
const MyBets = React.lazy(
    () => import('./components/my-bets')
);
const HowToPlay = React.lazy(
    () => import('./components/pages/HowToPlay')
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
    () => import('./components/pages/privacy-policy/index')
);
const Withdraw = React.lazy(
    () => import('./components/pages/deposit-withraw/Withdraw'))
;
const Deposit = React.lazy(
    () => import('./components/pages/deposit-withraw/Deposit')
);

const Signup = React.lazy(
    () => import('./components/pages/signup')
);

const ResetPassword = React.lazy(
    () => import('./components/pages/auth/reset-password')
)

const VerifyAccount = React.lazy(
    () => import('./components/pages/auth/verify-account')
)

const MobileApp = React.lazy(() => import('./components/pages/app'))

const ProtectedRoute = React.lazy(
    () => import('./components/utils/protected-route')
);

const Logout = () => {
    let navigate = useNavigate();

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
            <Suspense fallback={<p> Loading ... </p>}>
                <Routes>
                    <Route exact path="/" element={<Index/>}/>
                    <Route exact path="/highlights" element={<Index/>}/>
                    <Route exact path="/upcoming" element={<Index/>}/>
                    <Route exact path="/tomorrow" element={<Index/>}/>
                    <Route exact path="/competition/:id" element={<CompetitionsMatches/>}/>
                    <Route exact path="/competition/:sportid/:categoryid/:competitionid"
                           element={<CompetitionsMatches/>}/>
                    <Route exact path="/match/:id" element={<MatchAllMarkets/>}/>
                    <Route exact path="/match/live/:id" element={<MatchAllMarkets live/>}/>
                    <Route exact path="/jackpot" element={<Jackpot/>}/>
                    <Route exact path="/live" element={<Live/>}/>
                    <Route exact path="/live/:spid" element={<Live/>}/>
                    <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
                    <Route exact path="/anti-money-laundering" element={<AntimoneyLaundering/>}/>
                    <Route exact path="/responsible-gambling" element={<ResponsibleGambling/>}/>
                    <Route exact path="/dispute-resolution" element={<DisputeResolution/>}/>
                    <Route exact path="/cookie-policy" element={<CookiePolicy/>}/>
                    <Route exact path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                    <Route exact path="/how-to-play" element={<HowToPlay/>}/>
                    <Route exact path="/signup" element={<Signup/>}/>
                    <Route exact path="/reset-password" element={<ResetPassword/>}/>
                    <Route exact path="/verify-account" element={<VerifyAccount/>}/>
                    <Route exact path="/app" element={<MobileApp/>}/>
                    <Route exact path="/logout" element={<Logout/>}/>

                    <Route exact path="/deposit"
                           element={<ProtectedRoute><Deposit/> </ProtectedRoute>}/>
                    <Route exact path="/withdraw"
                           element={<ProtectedRoute><Withdraw/></ProtectedRoute>}/>
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
