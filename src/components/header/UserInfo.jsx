import { Link } from "react-router-dom";

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
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { get } from "lodash";

export const UserInfo = React.memo((props) => {
  const { profile } = props;
  const pathname = window.location.pathname;
  const { state, dispatch } = useContext(StoreContext);
  const gaEventTracker = useAnalyticsEventTracker("Navigation");

  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    if (getFromLocalStorage("user")) {
      setUser(getFromLocalStorage("user"));
    } else {
      setUser(null);
    }
  }, [getFromLocalStorage("user")]);

  const dispatchRedux = useDispatch();

  const handleCasinoSearch = () => {
    dispatchRedux(setStateV("casino_search_modal", true));
  };

  return (
    <>
      {user && (
        <div
          className="col-md-4  d-flex  right justify-content-end align-items-center w-change2 gap-2 ipad-show"
          style={{ marginLeft: "auto" }}
        >
          <div>
            <Link
              to={{ pathname: "/deposit" }}
              className={"cg  login-color login-size btn "}
            >
              <span className="">Deposit</span>
            </Link>
          </div>
          <FontAwesomeIcon
            icon={faSearch}
            onClick={handleCasinoSearch}
            style={{
              fontSize: "24px",
              color: "var(--header-icon)",
              fontWeight: "700",
              paddingRight: "10px",
              paddingLeft: "10px",
              // opacity: "0.7",
            }}
          />

          {/* <FontAwesomeIcon
            icon={faBell}
            style={{
              fontSize: "24px",
              color: "var(--header-icon)",
              fontWeight: "700",
              paddingRight: "10px",

              // opacity: "0.7",
            }}
          /> */}
        </div>
      )}
      <>
        {!user && (
          <div className="col-sm-2 mobile-profile1 align-items-center gap-3 ipad-show px-2 mb-2 col-lg-3 justify-content-end">
            {pathname !== "/auth/login" && (
              <Link
                to={"/auth/login"}
                className="cg  login-color login-size btn"
                type="submit"
              >
                <span>Login</span>
              </Link>
            )}
            {pathname !== "/auth/signup" && (
              <div className="">
                <Link
                  className="cg   login-size btn btn-button-bg-2 text-light"
                  to={"/auth/signup"}
                  title="Join now"
                  onClick={() => gaEventTracker("Register")}
                >
                  <span className=" text-weight-md">Register</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </>
    </>
  );
});
