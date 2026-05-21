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
                <FontAwesomeIcon icon={faWallet} style={{ color: "#E55F32", fontSize: "14px" }} />
                <span style={{ color: "#E55F32", fontWeight: 700, fontSize: "14px", whiteSpace: "nowrap" }}>
                  KES {formatNumber(user?.balance || 0)}
                </span>
              </div>
            </Link>
          )}
          <Link
            to={{ pathname: "/deposit" }}
            style={{
              background: "rgba(59, 170, 237, 0.15)",
              color: "#E55F32",
              fontWeight: 700,
              fontSize: "13px",
              padding: "7px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(59, 170, 237, 0.3)",
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
                  color: "white",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  padding: "8px 20px",
                  transition: "opacity 0.2s",
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
                  background: "#E55F32",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "14px",
                  textDecoration: "none",
                  padding: "10px 28px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 20px rgba(59, 170, 237, 0.3)",
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
