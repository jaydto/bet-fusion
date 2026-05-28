import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { StoreContext } from "../../context/store";
import { getFromLocalStorage } from "../utils/local-storage";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Navbar, } from "react-bootstrap";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";

import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";

import { useDispatch, useSelector } from "react-redux";
import { configSettings, setState } from "../../redux/dataSlice";
import { userBalance } from "../../redux/authSlice";
import casino_table from "../../assets/img/casino_table.png";
import {
  checkDesktopTopNavigation,
  checkNavigation,
  shouldShowMobileNav,
  shouldShowHeader,
} from "../../redux/navigationAction";
import "./header.css";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CustomNavbarBrand from "./customNavbar";
import DepositModal from "../modals/DepositModal";

const Header = React.memo((props) => {
  const { slip, scrollPosition, jackpot, onToggleSidebar } = props;
  const gaEventTracker = useAnalyticsEventTracker("Navigation");
  const { state, dispatch } = useContext(StoreContext);

  const show = useSelector((state) => state.data.show_menu);

  const navigate = useNavigate();
  // Import the navigationConfig object
  const [isOpen, setIsOpen] = useState(false);
  // const pathname = window.location.pathname;
  const path_origin = useLocation();
  const search_param = path_origin?.search && path_origin?.search;
  const pathname = `${path_origin?.pathname}${search_param}`;

  const dispatchRedux = useDispatch();
  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );

  // const notShowMobileNav = dispatchRedux(shouldShowMobileNav(pathname));
  const notShowHeaderNav = dispatchRedux(shouldShowHeader(pathname));
  // const showDownload = dispatchRedux(shouldShowDownload(pathname));
  const changeNav = dispatchRedux(checkNavigation(pathname));
  const checkDesktop = dispatchRedux(checkDesktopTopNavigation(pathname));
  const close_call_to_action = useSelector(
    (state) => state.data.call_to_action
  );

  const userData = useSelector((state) => state.auth.user);

  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  useEffect(() => {
    if (pathname !== "/auth/login") {
      dispatch({ type: "SET", key: "page_view", payload: pathname });
    }
  }, [pathname]);

  const appConfigs = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    setSettings(appConfigs || getFromLocalStorage("settings"));
  }, [appConfigs]);

  const fetchAppConfigurations = useCallback(async () => {
    let cached_settings = getFromLocalStorage("settings");

    if (!cached_settings) {
      dispatchRedux(configSettings());
    }
  });

  const cleanUpFuction = async () => {
    await fetchAppConfigurations();

    const handleStorageChange = (event) => {
      if (event.key === "settings") {
        fetchAppConfigurations();
      }
    };

    const abort = new AbortController();

    window?.addEventListener("storage", handleStorageChange);
    // window?.addEventListener('beforeunload', handleBeforeUnload);

    const clearLocalStorageSettings = () => {
      localStorage.removeItem("settings");
      // Manually call fetchAppConfigurations to update the settings
      // fetchAppConfigurations();
    };

    // Listen for "beforeunload" event to handle clearing localStorage in the same tab
    const handleBeforeUnload = () => {
      clearLocalStorageSettings();
    };

    window?.addEventListener("storage", handleStorageChange);
    window?.addEventListener("beforeunload", handleBeforeUnload);
    // Listen for the "storage" event to detect changes in "settings" localStorage

    return () => {
      // Clean up the event listeners when the component unmounts
      window?.removeEventListener("storage", handleStorageChange);
      window?.removeEventListener("beforeunload", handleBeforeUnload);
      abort.abort();
    };
  };

  useEffect(() => {
    if (
      getFromLocalStorage("settings") == undefined ||
      appConfigs == undefined
    ) {
      cleanUpFuction();
    }
  }, [appConfigs, getFromLocalStorage("settings")]);

  const updateUserOnHistory = () => {
    if (!user) {
      return false;
    }
    let udata = {
      token: user.token,
    };
    const userValues = {
      udata: udata,
      user: user,
    };

    dispatchRedux(userBalance(userValues));
  };

  useEffect(() => {
    const abort = new AbortController();
    updateUserOnHistory();
    return () => {
      abort.abort();
    };
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleShow = () => {
    dispatchRedux(setState("show_menu", true));
  };
  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };
  const toggleMenu = () => {
    onToggleSidebar?.();
    show ? handleClose() : handleShow();
  };

  const expand = "md";
  const styles = { color: "var(--gold)" }; // Define your styles here

  useEffect(() => {
    if (pathname == "nare-league") {
      dispatch({ type: "SET", key: "kiron_page", payload: true });
    } else {
      dispatch({ type: "SET", key: "kiron_page", payload: false });
    }
  }, [pathname]);

 


  return (
    <>
      {showDepositModal && <DepositModal />}

      {notShowHeaderNav && (
        <div className={"d-flex flex-column"}>
          <Navbar
            expand="md"
            className={`${
               "fixed-top-nav"
            }
         ${changeNav ? "d-none" : ""}
         mb-0 ck pt-sm-0 pt-md-2 pc os app-navbar ${
           slip  ? "top-betslip-page-fix" : ""
         } ${user ? "top-nav-login" : "top-nav-login"}`}
            fixed="top"
            variant="dark"
          >
            <div
              className={`${
                close_call_to_action
                  ? "optional-action"
                  : "optional-action active"
              }  w-100`}
            >
              {/* <CallToAction
                settings={settings}
                appConfigs={appConfigs}
                handleCloseCallToAction={handleCloseCallToAction} // Pass the handler down as a prop
                navigate={navigate}
                gaEventTracker={gaEventTracker}
                PromoActive={PromoActive}
              /> */}
            </div>
            <div
              className={
                "w-100 d-flex justify-content-between desktop-ipad-size top-header-main"
              }
            >
              <div className={"d-flex w-100 directions-header-nav"}>
                <CustomNavbarBrand
                  toggleMenu={toggleMenu}
                  user={user}
                  checkDesktop={checkDesktop}
                />
              </div>

             
            </div>
          </Navbar>
        </div>
      )}
    </>
  );
});
export default React.memo(Header);

const CallToAction = ({
  settings,
  appConfigs,
  handleCloseCallToAction,
  gaEventTracker,
  navigate,
  PromoActive,
}) => {
  return (
    // settings?.active_promotion?.app_promo?.promo_active === "1" && (
    <div
      title={"Promotion"}
      className={"lite-top d-flex flex-column"}
      // onClick={() => {
      //   const activePromo = settings
      //     ? settings?.active_promotion?.mobile_promo
      //     : appConfigs?.active_promotion?.mobile_promo;

      //   if (
      //     activePromo &&
      //     activePromo.promo_active === "1" &&
      //     activePromo.promo_url
      //   ) {
      //     gaEventTracker(activePromo?.promo_utm);
      //     navigate(
      //       `${activePromo?.promo_url}?utm_source=${activePromo?.promo_utm}`
      //     );
      //   }
      // }}
    >
      <div
        className={"app-download-link  d-flex justify-content-between w-100"}
      >
        <div className="col-1 z-3 position-relative">
          <FontAwesomeIcon
            icon={faXmark}
            className={"close-call-action"}
            onClick={(e) => handleCloseCallToAction(e)}
          />
        </div>
        <span
          className={
            "color-app-text flashy col-11 d-flex align-items-center justify-content-center"
          }
        >
          <span className="d-flex justify-content-between alighn-items-center w-100">
            <div className="col-2">
              <LazyLoadImage
                src={casino_table}
                alt=" "
                className="casino-t-image"
              />
            </div>
            <PromoActive />
            <div className="col-3 d-flex align-items-center justify-content-end p-2">
              <div className="py-1">
                <button className="btn donjo-button  align-items-center px-1 d-flex  px-4 py-1">
                  <FontAwesomeIcon icon={faAndroid} className="me-2" />
                  <div className="d-flex flex-column justify-content-start align-items-start">
                    <span>Free</span>
                    <span> Download</span>
                  </div>
                </button>
              </div>
            </div>
          </span>
        </span>
      </div>
    </div>
    // )
  );
};

// PropTypes for validation
CallToAction.propTypes = {
  settings: PropTypes.shape({
    active_promotion: PropTypes.shape({
      app_promo: PropTypes.shape({
        promo_active: PropTypes.string,
      }),
      mobile_promo: PropTypes.shape({
        promo_active: PropTypes.string,
        promo_message: PropTypes.string,
      }),
    }),
  }),
  appConfigs: PropTypes.shape({
    active_promotion: PropTypes.shape({
      mobile_promo: PropTypes.shape({
        promo_active: PropTypes.string,
        promo_message: PropTypes.string,
      }),
    }),
  }),
  handleCloseCallToAction: PropTypes.func.isRequired, // Function to handle the close action
};
