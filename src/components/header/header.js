import React, {
  useCallback,
  useContext,
  useEffect,
  
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { StoreContext } from "../../context/store";
import { getFromLocalStorage } from "../utils/local-storage";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Navbar, Offcanvas } from "react-bootstrap";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";

import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import LoginSection from "./LoginSection";
import { UserInfo } from "./UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { configSettings, setState } from "../../redux/dataSlice";
import { userBalance } from "../../redux/authSlice";
import Logo from "../../assets/img/logo.webp";
import {
  checkDesktopTopNavigation,
  checkNavigation,
  shouldShowDownload,
  shouldShowMobileNav,
  shouldShowHeader,
} from "../../redux/navigationAction";
import './header.css'
import useWindowDimensions from "./Dimensions";
import DepositModal from "../modals/DepositModal";
import NavLinks from "./NavLinks";

const ProfileMenu = React.lazy(() => import("./profile-menu"));

const Header = React.memo((props) => {
  const { slip, scrollPosition, jackpot } = props;
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
  const { width } = useWindowDimensions();
  const showDepositModal = useSelector(
    (state) => state.data.show_deposit_modal
  );

  const notShowMobileNav = dispatchRedux(shouldShowMobileNav(pathname));
  const notShowHeaderNav = dispatchRedux(shouldShowHeader(pathname));
  const showDownload = dispatchRedux(shouldShowDownload(pathname));
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
    if (pathname !== "/login") {
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

  var currentURL = new URL(window.location.href);
  var pathAndQuery = currentURL.pathname + currentURL.search;

  const LoginCheck = (game) => {
    {
      navigate("/casino");
    }
  };

  const handleCloseCallToAction = (e) => {
    e.stopPropagation();
    dispatchRedux(setState("call_to_action", true));
  };

  // console.log("notshowHeader", notShowHeaderNav)

  return (
    <>
      {showDepositModal && <DepositModal />}

      {notShowHeaderNav && (
        <div className={"d-flex flex-column"}>
          <Navbar
            expand="md"
            className={`${
              close_call_to_action || showDownload
                ? "fixed-top-nav fixed"
                : "fixed-top-nav"
            }
         ${changeNav && width < 991 ? "d-none" : ""}
         mb-0 ck pt-sm-0 pt-md-2 pc os app-navbar ${
           slip || showDownload ? "top-betslip-page-fix" : ""
         } ${user ? "top-nav-login" : "top-nav-login"}`}
            fixed="top"
            variant="dark"
          >
            <div
              className={`${"optional-action"}  ${
                showDownload ? "d-none" : "d-sm-flex d-lg-none d-md-none w-100"
              }`}
            ></div>
            <div
              className={
                "w-100 d-flex justify-content-between mobile-change desktop-ipad-size top-header-main"
              }
            >
              <div className={"d-flex w-100 directions-header-nav"}>
                <Navbar.Brand
                  className={`e logo align-self-start menu-control d-flex justify-content-between w-100`}
                  title="BetTena"
                >
                  <div
                    className="col-7 logo-BetTena resize-mobile d-flex align-items-center mb-2"
                    style={{ marginLeft: "2px" }}
                  >
                    <div
                      className="col-1 button-toggle space-button desktop-menu"
                      style={{
                        width: "4.1rem",
                        overflowY: "hidden",
                        marginLeft: "0px",
                      }}
                    >
                      <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-${"lg"}`}
                        className="px-3 py-3 desktop-menu"
                        onClick={toggleMenu}
                      />
                    </div>
                    <img
                      src={Logo}
                      onClick={() => navigate("/")}
                      alt="BetTena"
                      title="BetTena"
                      effects="blur"
                      className={`image-size ${!user && "logo-top"} `}
                      style={
                        user
                          ? { marginBottom: "0px", paddingLeft: "7px" }
                          : {
                              // marginBottom: "11px",
                              width: "auto",
                            }
                      }
                    />

                    
                    <NavLinks/>
                  </div>

                  

                  <UserInfo profile={checkDesktop} user={user} />
                </Navbar.Brand>

                {/*todo check information provided for a user*/}
                <div
                  className={` change-size desk-top`}
                  id="navbar-collapse-main "
                >
                  <div className="col-md-11 col-sm-12 col-lg-7 right fix-view-2 disable-ipad to-navcheck justify-content-end pt-lg-0 pt-md-3 ">
                    {user ? (
                      <ProfileMenu user={user} profile={checkDesktop} />
                    ) : (
                      <LoginSection />
                    )}
                  </div>
                </div>
              </div>

             

              <Offcanvas
                style={{
                  width: "80%",
                  height: "100%",
                  zIndex: "9999",
                  marginTop: "0px",
                  overflowY: "auto",
                }}
                onHide={handleClose}
                show={show}
                className="off-canvas background-primary p-0"
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header
                  closeButton
                  className="text-white"
                  closeVariant={"white"}
                  onClick={toggle}
                >
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <div className="col-5 ">
                      <div>
                        <img
                          src={Logo}
                          alt="BetTena"
                          title="BetTena"
                         
                          effects="blur"
                        />
                      </div>
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <SidebarMobile />
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          </Navbar>
        </div>
      )}
    </>
  );
});
export default React.memo(Header);
