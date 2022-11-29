
import { useRoutes } from "react-router-dom";
import './App.css';
import React, {useCallback, useEffect} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Profile from "./components/pages/Accounts/Profile";

const Index = React.lazy(() => import('./components/index'));
const CompetitionsMatches = React.lazy(
    () => import('./components/competition/competition-matches')
);
const MatchAllMarkets = React.lazy(() => import('./components/competition/all-markets'));

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
    () => import('./components/pages/deposit-withraw/Withdraw')
);
const RedeemPoints = React.lazy(
    () => import('./components/pages/points/RedeemPoints')
);
const Deposit = React.lazy(
    () => import('./components/pages/deposit-withraw/Deposit')
);

const Signup = React.lazy(
    () => import('./components/pages/signup')
);
const Login=React.lazy(
    ()=>import('./components/pages/Login')
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


const PrintMatches = React.lazy(() => import('./components/pages/downloads'))

const Casino = React.lazy(() => import('./components/pages/casino/Casino'))

const LiveCasino = React.lazy(() => import('./components/pages/casino/LiveCasino'))

const Virtuals = React.lazy(() => import('./components/pages/casino/Virtuals'))

const CasinoGamePlay = React.lazy(() => import('./components/pages/casino/GamePlay'))

const Promotions = React.lazy(() => import('./components/pages/promotions/Promotions'))

const LiveScore = React.lazy(() => import('./components/pages/livescore/LiveScore'))

const PageNotFound = React.lazy(() => import('./components/pages/404/NotFound'))


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
export function MobileRoutes() {
    let element = useRoutes([
        {
            path: "/",
            element: <Index />,
            children: [
                {
                    path: "highlights",
                    element: <Index />,
                },
                { path: "upcoming", element: <Index /> },
                {
                    path: "tomorrow",
                    element: <Index/>,
                },
               ],
        },
        { path: "*", element: <Navigate to="/404"/> },
        {
            path: "/virtuals",
            element: <Virtuals />,
        },
        { path: "/livescore", element: <LiveScore /> },
        {
            path: "/404",
            element: <PageNotFound />,
        },
        { path: "/privacy-policy", element: <PrivacyPolicy /> },
        {
            path: "/anti-money-laundering",
            element: <AntimoneyLaundering />,
        },
        { path: "/responsive-gambling", element: <ResponsibleGambling /> },
        {
            path: "/dispute-resolution",
            element: <DisputeResolution />,
        },
        { path: "/cookie-policy", element: < CookiePolicy/> },
        {
            path: "/terms-and-conditions",
            element: <TermsAndConditions/>,
        },
        { path: "/how-to-play", element: <HowToPlay /> },
        {
            path: "/signup",
            element: <Signup />,
        },
        { path: "/login", element: <Login /> },
        {
            path: "/reset-password",
            element: <ResetPassword/>,
        },
        { path: "/verify-account", element: <VerifyAccount /> },
        {
            path: "/app",
            element: <MobileApp />,
        },
        { path: "/logout", element: <Logout /> },
        {
            path: "print-matches",
            element: <PrintMatches />,
        },
        { path: "/promotions", element: < Promotions/> },
        {
            path: "/deposit",
            element: <ProtectedRoute><Deposit/> </ProtectedRoute>,
        },
        { path: "/withdraw", element: <ProtectedRoute><Withdraw/></ProtectedRoute> },
        { path:"/redeem-points", element:<ProtectedRoute><RedeemPoints/></ProtectedRoute> },
        {
            path:"/my-bets",
            element: <ProtectedRoute><MyBets/> </ProtectedRoute>,
        },
        { path: "/gameplay/:game_id/:live", element: <CasinoGamePlay /> },
        { path: "/:competitionid", element: <CompetitionsMatches /> },
        {
            path: "/competition/:sport_id/:categoryid/:competitipnid",
            element: <CompetitionsMatches />,
        },
        { path: "/match/:id", element: <MatchAllMarkets/> },
        {
            path: "/match/:live/:id",
            element: <MatchAllMarkets/>,
        },
        {path:"/profile", element: <Profile/>}
        ,
        { path: "/jackpot", element: <Jackpot /> },
        {
            path: "/live",
            element: <Live />,
        },
        { path: "/live/:spid", element: <Live /> },
        {
            path: "/virtuals",
            element: <Virtuals />,
        },


    ]);

    return element;
}