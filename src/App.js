import './App.css';
import React, {Suspense, useCallback, useContext, useEffect, useState} from "react";
import {StoreContext} from "./context/store";
import {useDispatch, useSelector} from "react-redux";
import {getFromLocalStorage, setLocalStorage} from "./components/utils/local-storage";
import {resetState} from "./redux/authSlice";
import {Navigate, Route, Routes, useNavigate,} from 'react-router-dom'
import Header from './components/header/header';

const Deposit3 = React.lazy(() => import("./components/pages/deposit-withraw/Deposit3"));


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

const NewCasino = React.lazy(() => import('./components/pages/new-casino/NewCasino'))

const LeaderBoard = React.lazy(() => import('./components/pages/LeaderBoards/LeaderBoards'))
const JetxLeaderBoard = React.lazy(() => import('./components/pages/LeaderBoards/JetxLeaderBoards'))


const CasinoGamePlay = React.lazy(() => import('./components/pages/new-casino/GamePlay'))

const SpribeGamePlay = React.lazy(() => import('./components/pages/virtuals/SpribeGamePlay'))

const SpribeGames = React.lazy(() => import('./components/pages/virtuals/SpribeGames'))

const SmartSoftPlay = React.lazy(() => import('./components/pages/smart-soft/smart-soft'))

const SmartPlay = React.lazy(() => import('./components/pages/smart-soft/SmartPlay'))



const PageNotFound = React.lazy(() => import('./components/pages/404/NotFound'))


const Kiron = React.lazy(() => import('./components/pages/Kiron'))

const BetslipPage = React.lazy(() => import("./components/pages/betslip/betslipPage"))

const Login = React.lazy(() => import('./components/pages/loginTwo'));

const NewProfile = React.lazy(() => import( "./components/pages/Accounts/NewProfile"));


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

const Redirect = () => {
    const {dispatch} = useContext(StoreContext);
    const dispatchRedux = useDispatch();
    let navigate = useNavigate();
    setLocalStorage('user', null)
    dispatchRedux(resetState("user"))
    const out = useCallback(() => {
        localStorage.clear();
        dispatch({type: 'CLEAR_ALL_ITEMS'}); // Dispatch the action to clear all items

        navigate("/login");
    }, [navigate]);

    useEffect(() => {
        out();
    }, [out]);

    return null
}


const App =
    () => {
        // const scrollPosition = useSelector((state) => state.scroll.scroll)
        const [flag, setFlag]=useState(true)
        // cleanup/unmounting components fix
        useEffect(()=>{
            return ()=>{
                setFlag(false)
            }

        },[])


       
  

        return (
           flag?
               <>
             <Header />
                <Suspense fallback={<></>}>
                    <Routes>
                        <Route path="*" element={<Navigate to="/404"/>}/>
                      
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/404" element={<PageNotFound/>}/>
                        <Route exact path="/casino" element={<NewCasino/>}/>
                       
                        <Route exact path="/smart-play" element={<SmartPlay/>}/>
                        <Route exact path="/smart-soft" element={<SmartSoftPlay/>}/>

                        <Route exact path={"/"} element={<Kiron/>}/>
                        <Route exact path={"/results"} element={<Kiron/>}/>
                        <Route exact path={"/standing"} element={<Kiron/>}/>
                        <Route path={"/bet-history/:betID"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>
                        <Route exact path={"/bet-history"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>

                        <Route exact path={"/profile"} element={<ProtectedRoute><NewProfile/></ProtectedRoute>}/>
                        <Route exact path={"/betslip"} element={<BetslipPage/>}/>
                        <Route exact path="/betslip-slip" element={<BetslipPage/>}/>
                        <Route exact path="/betslip-nare" element={<BetslipPage/>}/>
                        <Route exact path="/betslip-jackpot" element={<BetslipPage/>}/>

                        
                        <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
                        <Route exact path="/anti-money-laundering" element={<AntimoneyLaundering/>}/>
                        <Route exact path="/responsible-gambling" element={<ResponsibleGambling/>}/>
                        <Route exact path="/dispute-resolution" element={<DisputeResolution/>}/>
                        <Route exact path="/cookie-policy" element={<CookiePolicy/>}/>
                        <Route exact path="/terms-and-conditions" element={<TermsAndConditions/>}/>
                        <Route exact path="/how-to-play" element={<HowToPlay/>}/>
                        <Route exact path="/signup" element={<Signup/>}/>
                        <Route exact path="/leader-board" element={<LeaderBoard/>}/>
                        <Route exact path="/leader-boardx" element={<JetxLeaderBoard/>}/>
                        <Route path={"/bet-history/:betID"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>
                        <Route path={"/bet-history"} element={<ProtectedRoute><Kiron/></ProtectedRoute>}/>
                        <Route exact path="/reset-password" element={<ResetPassword/>}/>
                        <Route exact path="/verify" element={<VerifyAccount/>}/>
                        <Route exact path="/logout" element={<Logout/>}/>
                        <Route exact path="/redirect" element={<Redirect/>}/>
                      
                        <Route exact path="/deposit"
                               element={<ProtectedRoute><Deposit3/> </ProtectedRoute>}/>

                        <Route exact path="/withdraw"
                               element={<ProtectedRoute><Withdraw/></ProtectedRoute>}/>
                     
                    </Routes>
                </Suspense>

            </>:null
        )
    }

export default App;