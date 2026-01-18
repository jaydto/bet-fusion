import "./App.css";
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { StoreContext } from "./context/store";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setLocalStorage } from "./components/utils/local-storage";
import { resetState } from "./redux/authSlice";
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Grid } from "antd";
import CasinoGames from "./components/pages/casino/casinoBody";

import Header from "./components/header/header";
import Sidebar from "./components/pages/casino/sidebar";
import Deposit3 from "./components/pages/deposit-withraw/Deposit3";
import HowToPlay from "./components/pages/HowToPLay2";
import LandingPage from "./components/pages/casino/landingPage";
import AppAuthLayout from "./components/pages/authPagesLayout";
import CasinoPage from "./components/pages/casino/casinoPage";
import AppPromo from "./components/pages/promotions/AppPromo";
import GamePlay from "./components/pages/casino/GamePlay";
import TermsAndConditions from "./components/pages/terms-and-conditions/index";
import CookiePolicy from "./components/pages/cookie-policy/index";
import DisputeResolution from "./components/pages/dispute-resolution/index";
import ResponsibleGambling from "./components/pages/responsible-gambling";
import AntimoneyLaundering from "./components/pages/anti-money-laundering";
import PrivacyPolicy from "./components/pages/privacy-policy";
import Withdraw from "./components/pages/deposit-withraw/Withdraw";
import Signup from "./components/pages/auth/registerTwo";
import ResetPassword from "./components/pages/auth/reset-password2";
import VerifyAccount from "./components/pages/auth/verify-account2";
// import MobileApp from './components/pages/app'
import ProtectedRoute from "./components/utils/protected-route";
import Promotions from "./components/pages/promotions/Promotions";
import Promo from "./components/pages/promotions/Promo";
import LeaderBoard from "./components/pages/LeaderBoards/LeaderBoards";
import JetxLeaderBoard from "./components/pages/LeaderBoards/JetxLeaderBoards";
import SmartSoftPlay from "./components/pages/smart-soft/smart-soft";
import SmartPlay from "./components/pages/smart-soft/SmartPlay";
import PageNotFound from "./components/pages/404/NotFound";
import BetslipPage from "./components/pages/betslip/betslipPage";
import Login from "./components/pages/loginTwo";
import NewProfile from "./components/pages/Accounts/NewProfile";
import Index from "./components/pages/casino/index";
import SportsPage from "./components/pages/sports";

const Logout = () => {
  const { dispatch } = useContext(StoreContext);
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear Redux and local storage immediately
    dispatchRedux(resetState("user"));
    removeItem("user");
    localStorage.clear();
    dispatch({ type: "CLEAR_ALL_ITEMS" });

    // Navigate after 2 seconds
    const timeout = setTimeout(() => {
      navigate("/");
    }, 1000);

    // Cleanup the timeout if component unmounts early
    return () => clearTimeout(timeout);
  }, [dispatch, dispatchRedux, navigate]);

  return null;
};
const Redirect = () => {
  const { dispatch } = useContext(StoreContext);
  const dispatchRedux = useDispatch();
  let navigate = useNavigate();
  removeItem("user");
  dispatchRedux(resetState("user"));
  const out = useCallback(() => {
    localStorage.clear();
    dispatch({ type: "CLEAR_ALL_ITEMS" }); // Dispatch the action to clear all items

    navigate("/auth/login");

  }, [navigate]);

  useEffect(() => {
    out();
  }, [out]);

  return null;
};

const { useBreakpoint } = Grid;

const App = () => {
  const isCustomFullscreen = useSelector(
    (state) => state?.data?.is_custom_fullscreen
  );
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const location = useLocation();
  const sidebarRoutes = [
    "/",
    "/promotions",
    "/promotions/promo",
    "/how-to-play",
    "/responsible-gambling",
    "/cookie-policy",
    "/privacy-policy",
    "/dispute-resolution",
    "/anti-money-laundering",
    "/terms-and-conditions",
    // "/casino",
    "/auth/login",
    // "/casino/game-play",
    "/auth/signup",
    "/forgot-password",
    "/auth/reset-password",
    "/auth/verify",
    "/profile",
    "/play"
  ];

  const ignoreMobileHeader = [
    "/auth/login",
    "/auth/signup",
    // "/casino/game-play",
    "/auth/reset-password",
  ];

  // Determine visibility
  const isGamePlayRoute = ignoreMobileHeader.includes(location.pathname);
  const showSidebar =
    sidebarRoutes.includes(location.pathname) && !isCustomFullscreen;
  const showHeader = !(isGamePlayRoute && (isCustomFullscreen || isMobile));

  return (
    // <ConfigProvider
    //   theme={
    //     {
    //       // algorithm: antdTheme.darkAlgorithm,
    //     }
    //   }
    // >
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar (only for '/') */}
      {showSidebar && (
        <aside className="sidebar site-layout-background">
          {/* You can put category list, ads, etc. */}
          <Sidebar />
        </aside>
      )}

      {/* Main Content (Header + Routes) */}
      <div style={{ flex: 1, display: "block" }}>
        {showHeader && <Header />}

        <div style={{ flex: 1 }}>
          <Suspense fallback={<></>}>
            <Routes>
              {/* <Route  path="/" element={<CasinoGames />} /> */}
              <Route path="/" element={<Index />}>
                <Route index element={<LandingPage />} />{" "}
                {/* Former HomeCasinoPage */}
              </Route>

              <Route path="/auth/*" element={<AppAuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="verify" element={<VerifyAccount />} />
                <Route path="signup" element={<Signup />} />
                <Route path="logout" element={<Logout />} />
                <Route path="redirect" element={<Redirect />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>

              {/* <Route path="/casino" element={<Index />}>
                <Route index element={<CasinoPage />} />
                <Route
                  path="game-play"
                  element={
                    <ProtectedRoute>
                      <GamePlay />
                    </ProtectedRoute>
                  }
                />
              </Route> */}

              <Route path="/play" element={<Index />}>
                <Route index element={<CasinoPage />} />
                <Route
                  path="game-play"
                  element={
                    <ProtectedRoute>
                      <GamePlay />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="/sports" element={
                <ProtectedRoute>
                  <SportsPage />
                </ProtectedRoute>
              }>
              </Route>

              <Route path="/404" element={<PageNotFound />} />
              <Route path="/smart-play" element={<SmartPlay />} />
              <Route path="/smart-soft" element={<SmartSoftPlay />} />

              <Route path="/promotions" element={<AppPromo />}>
                <Route index element={<Promotions />} />
                <Route path="promo" element={<Promo />} />
              </Route>

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <NewProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/betslip" element={<BetslipPage />} />
              <Route path="/betslip-slip" element={<BetslipPage />} />
              <Route path="/betslip-nare" element={<BetslipPage />} />
              <Route path="/betslip-jackpot" element={<BetslipPage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/anti-money-laundering"
                element={<AntimoneyLaundering />}
              />
              <Route
                path="/responsible-gambling"
                element={<ResponsibleGambling />}
              />
              <Route
                path="/dispute-resolution"
                element={<DisputeResolution />}
              />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/how-to-play" element={<HowToPlay />} />
              <Route path="/leader-board" element={<LeaderBoard />} />
              <Route path="/leader-boardx" element={<JetxLeaderBoard />} />

              <Route
                path="/deposit"
                element={
                  <ProtectedRoute>
                    <Deposit3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/withdraw"
                element={
                  <ProtectedRoute>
                    <Withdraw />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  ); // </ConfigProvider>
};

export default App;
