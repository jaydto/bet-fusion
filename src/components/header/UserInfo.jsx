import { Link, useLocation } from "react-router-dom";

import { formatNumber } from "../utils/betslip";
import { Navbar } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/local-storage";
import { StoreContext } from "../../context/store";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../redux/dataSlice";
import { setState as setStateV } from "../../redux/virtualsSlice";
import { shouldShowSearch } from "../../redux/navigationAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch, faWallet } from "@fortawesome/free-solid-svg-icons";
import { get } from "lodash";

export const UserInfo = React.memo((props) => {
  const { profile } = props;
  const pathname = window.location.pathname;
  const { state, dispatch } = useContext(StoreContext);
  const gaEventTracker = useAnalyticsEventTracker("Navigation");

  const location = useLocation();
  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    if (getFromLocalStorage("user")) {
      setUser(getFromLocalStorage("user"));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const dispatchRedux = useDispatch();

  const handleCasinoSearch = () => {
    dispatchRedux(setStateV("casino_search_modal", true));
  };

  const urlPath = window.location.pathname;
  const [showBalance, setShowBalance] = useState(
    !urlPath.includes("nare-games") &&
      !urlPath.includes("game-play") &&
      !urlPath.includes("smart-play")
  );

  useEffect(() => {
    setShowBalance(
      !urlPath.includes("nare-games") &&
        !urlPath.includes("game-play") &&
        !urlPath.includes("smart-play")
    );
  }, [urlPath]);

  return (
    <>
      {user && (
        <div
          className="d-flex align-items-center gap-2 ipad-show"
          style={{ marginLeft: "auto" }}
        >
          {!profile && showBalance && (
            <Link to={{ pathname: "/deposit" }} style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(59, 170, 237, 0.10)",
                  border: "1px solid rgba(59, 170, 237, 0.25)",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faWallet} style={{ color: "#fb8603", fontSize: "14px" }} />
                <span style={{ color: "#fb8603", fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap" }}>
                  KES {formatNumber(user?.balance || 0)}
                </span>
              </div>
            </Link>
          )}
          {/* Notification bell */}
          <button
            aria-label="Notifications"
            style={{
              background: "transparent",
              border: "none",
              padding: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              color: "#94a3b8",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
          </button>
          <Link
            to={{ pathname: "/deposit" }}
            style={{
              background: "linear-gradient(135deg, #cc3366 0%, #fb8603 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "13px",
              padding: "7px 22px",
              borderRadius: "8px",
              border: "none",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Deposit
          </Link>
        </div>
      )}
      <>
        {!user && (
          <div className="d-flex align-items-center gap-2 justify-content-end ipad-show px-2">
            {pathname !== "/auth/login" && (
              <Link
                to={"/auth/login"}
                style={{
                  color: "#f8fafc",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  padding: "7px 20px",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  transition: "border-color 0.2s, color 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Login
              </Link>
            )}

            {pathname !== "/auth/signup" && (
              <Link
                to={"/auth/signup"}
                onClick={() => gaEventTracker("Register")}
                style={{
                  background: "linear-gradient(135deg, #cc3366 0%, #fb8603 100%)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "14px",
                  textDecoration: "none",
                  padding: "10px 28px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 20px rgba(251, 134, 3, 0.3)",
                }}
              >
                Register
              </Link>
            )}
          </div>
        )}
      </>
    </>
  );
});
