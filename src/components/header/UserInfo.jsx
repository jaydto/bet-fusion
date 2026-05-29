import { Link, useLocation, useNavigate } from "react-router-dom";

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
import { faWallet } from "@fortawesome/free-solid-svg-icons";

export const UserInfo = React.memo((props) => {
  const { profile } = props;
  const pathname = window.location.pathname;
  const { state, dispatch } = useContext(StoreContext);
  const gaEventTracker = useAnalyticsEventTracker("Navigation");

  const location = useLocation();
  const navigate = useNavigate();
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
                  background: "transparent",
                  border: "none",
                  borderRadius: "999px",
                  padding: "6px 8px",
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
                  fontSize: "13px",
                  textDecoration: "none",
                  padding: "6px 14px",
                  border: "1px solid #1e2235",
                  borderRadius: "8px",
                  transition: "border-color 0.2s, color 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
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
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s",
                  boxShadow: "0 2px 12px rgba(251, 134, 3, 0.3)",
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
