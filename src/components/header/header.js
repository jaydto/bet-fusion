import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { StoreContext } from "../../context/store";
import { getFromLocalStorage } from "../utils/local-storage";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Navbar, Offcanvas } from "react-bootstrap";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";
import MobileNav1 from "../mobile-navigation/MobileNav1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import ListGroup from "react-bootstrap/ListGroup";
import LoginSection from "./LoginSection";
import { UserInfo } from "./UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { configSettings, setState } from "../../redux/dataSlice";
import { userBalance } from "../../redux/authSlice";
import { matchCategories, matchesSearch } from "../../redux/matchesSlice";
import {
  checkDesktopTopNavigation,
  checkNavigation,
  shouldShowDownload,
  shouldShowMobileNav,
} from "../../redux/navigationAction";
import Header2 from "./Header2";

const ProfileMenu = React.lazy(() => import("./profile-menu"));
const HeaderNav = React.lazy(() => import("./header-nav"));

const Header = React.memo((props) => {
  const { slip, scrollPosition, jackpot } = props;
  const gaEventTracker = useAnalyticsEventTracker("Navigation");
  const { state, dispatch } = useContext(StoreContext);
  const searchInputRef = useRef(null);
  const show = useSelector((state) => state.data.show_menu);
  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };
  const handleShow = () => {
    dispatchRedux(setState("show_menu", true));
  };
  const navigate = useNavigate();
  // Import the navigationConfig object
  const [isOpen, setIsOpen] = useState(false);
  // const pathname = window.location.pathname;
  const path_origin = useLocation();
  const search_param = path_origin?.search && path_origin?.search;
  const pathname = `${path_origin?.pathname}${search_param}`;

  const dispatchRedux = useDispatch();

  const notShowMobileNav = dispatchRedux(shouldShowMobileNav(pathname));
  const showDownload = dispatchRedux(shouldShowDownload(pathname));
  const changeNav = dispatchRedux(checkNavigation(pathname));
  const checkDesktop = dispatchRedux(checkDesktopTopNavigation(pathname));
  const close_call_to_action = useSelector(
    (state) => state.data.call_to_action
  );

  const userData = useSelector((state) => state.auth.user);
  const matchesData = useSelector(
    (state) => state.matchesData.searched_matches
  );
  const [user, setUser] = useState(getFromLocalStorage("user"));
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(matchesData);
  }, [matchesData]);

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

  const dismissSearch = () => {
    dispatch({ type: "SET", key: "searching", payload: false });
    setMatches([]);
  };

  const fetchData = async () => {
    dispatchRedux(matchCategories());
  };
  const appConfigs = useSelector((state) => state.data.app_config);
  const [settings, setSettings] = useState(getFromLocalStorage("settings"));

  useEffect(() => {
    setSettings(appConfigs || getFromLocalStorage("settings"));
  }, [appConfigs]);

  const cleanUpFuctionSportCategories = async () => {
    await fetchData();
  };

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

  useEffect(() => {
    cleanUpFuctionSportCategories();
  }, []);

  const active_sport_value = useSelector(
    (state) => state.matchesData.active_sport
  );
  const fetchMatches = async (search) => {
    if (search && search.length >= 3) {
      gaEventTracker("Searching");
      let method = "POST";
      let endpoint = "/v1/matches?page=" + 1 + `&limit=${10}&search=${search}`;

      dispatchRedux(
        matchesSearch({
          endpoint: endpoint,
          method: method,
          active_sport: active_sport_value,
        })
      );
    }
  };

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

  useEffect(() => {
    if (state?.searching) {
      dispatchRedux(setState("navigation_link", pathAndQuery));
    }
  }, [state?.searching]);

  const PromoActive = () => {
    // console.log('appConfigs', appConfigs)

    return (settings || appConfigs) !== null ? (
      Object.keys(
        settings?.active_promotion?.mobile_promo ||
          appConfigs?.active_promotion?.mobile_promo ||
          {}
      )?.map((key, index) => {
        const promoValue = settings
          ? settings.active_promotion.mobile_promo[key]
          : appConfigs?.active_promotion?.mobile_promo[key];

        if (key === "promo_message") {
          return promoValue.split(" ").map((promoWord, indexWord) => {
            if (indexWord % 2 === 0) {
              return (
                <strong key={indexWord} style={styles}>
                  {promoWord}&nbsp;
                </strong>
              );
            } else if (indexWord === promoValue.length - 1) {
              return <span key={indexWord}>{promoWord}</span>;
            } else {
              return <span key={indexWord}>{promoWord}&nbsp;</span>;
            }
          });
        }
      })
    ) : (
      <></>
    );
  };

  const handleCloseCallToAction = (e) => {
    e.stopPropagation();
    dispatchRedux(setState("call_to_action",true));
  };


  return (
    <>
      {changeNav ? (
        <Header2 />
      ) : (
        <div className={"d-flex flex-column"}>
          <Navbar
            expand="md"
            className={`${
              close_call_to_action || showDownload
                ? "fixed-top-nav fixed"
                : "fixed-top-nav"
            } mb-0 ck pt-sm-0 pt-md-2 pc os app-navbar ${
              slip || showDownload ? "top-betslip-page-fix" : ""
            } ${user ? "top-nav-login" : "top-nav-login"}`}
            fixed="top"
            variant="dark"
          >
            <div
              className={`${
                close_call_to_action
                  ? "optional-action"
                  : "optional-action active"
              }  ${
                showDownload ? "d-none" : "d-sm-flex d-lg-none d-md-none w-100"
              }`}
            >
              {settings?.active_promotion?.app_promo?.promo_active === "1" && (
                <div
                  title={"Promotion"}
                  className={"lite-top d-flex flex-column"}
                  onClick={() => {
                    const activePromo = settings
                      ? settings?.active_promotion?.mobile_promo
                      : appConfigs?.active_promotion?.mobile_promo;

                    if (
                      activePromo &&
                      activePromo.promo_active === "1" &&
                      activePromo.promo_url
                    ) {
                      gaEventTracker(activePromo?.promo_utm);
                      navigate(
                        `${activePromo?.promo_url}?utm_source=${activePromo?.promo_utm}`
                      );
                    }
                  }}
                >
                  <div
                    className={
                      "app-download-link  d-flex justify-content-between w-100"
                    }
                  >
                    <div className="col-2">
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={"close-call-action"}
                      onClick={(e) => handleCloseCallToAction(e)}
                    />
                  </div>
                    <span className={"color-app-text flashy col-12"}>
                      <span className="d-flex justify-content-start px-4 mx-1">
                        <PromoActive />
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                "w-100 d-flex justify-content-between mobile-change desktop-ipad-size top-header-main"
              }
            >
              <div className={"d-flex w-100 directions-header-nav"}>
                <Navbar.Brand
                  className={`e logo align-self-start menu-control d-flex justify-content-between w-100`}
                  title="Betnare"
                >
                  <div
                    onClick={() => navigate("/")}
                    className="col-4 logo-betnare resize-mobile"
                    style={{ marginLeft: "2px" }}
                  >
                    <img
                      src={"https://cdn.betnare.com/logo-white.webp"}
                      alt="Betnare"
                      title="Betnare"
                      effects="blur"
                      className={`image-size ${!user && "logo-top"}`}
                      style={
                        user
                          ? { marginBottom: "0px" }
                          : {
                              marginBottom: "11px",
                              width: "auto",
                            }
                      }
                    />
                  </div>

                  <UserInfo profile={checkDesktop} user={user} />
                </Navbar.Brand>

                {/*todo check information provided for a user*/}
                <div
                  className={` col-10 change-size desk-top`}
                  id="navbar-collapse-main "
                >
                  <div className="col-md-11 col-sm-12 col-lg-7 right fix-view-2 disable-ipad to-navcheck justify-content-end pt-lg-0 pt-md-3">
                    {user ? (
                      <ProfileMenu user={user} profile={checkDesktop} />
                    ) : (
                      <LoginSection />
                    )}
                  </div>
                </div>
              </div>

              {!checkDesktop && (
                <Row
                  className={`second-nav ck pc os app-navbar ${
                    user ? " app-header-nav-login " : " app-header-nav "
                  } to-navcheck `}
                >
                  <HeaderNav />
                </Row>
              )}
              {state?.searching ? (
                <div
                  id="navbar-collapse-main"
                  className={`fadeIn header-menu d-flex justify-content-center w-100 d-block`}
                >
                  <ListGroup
                    as="ul"
                    xs="9"
                    horizontal
                    className="nav navbar-nav og ale ss col-12 text-center w-100 d-flex"
                  >
                    <div className="d-flex w-100">
                      <div
                        className="col-10  px-2"
                        style={{ marginLeft: "2vw" }}
                      >
                        <input
                          type="text"
                          placeholder={"Start typing to search for team ..."}
                          autoFocus={true}
                          ref={searchInputRef}
                          onInput={(event) => fetchMatches(event.target.value)}
                          className={
                            "form-control input-field-search border-0  text-default bg-light no-border-radius input-bg-user"
                          }
                          style={{ background: "#2D4352" }}
                        />
                        <div
                          style={{ overflowY: "auto", borderRadius: "2px" }}
                          className={`col-10 autocomplete-box  rounded position-fixed  search-results-box border-dark col-md-5 shadow-lg text-start`}
                          onClick={() => gaEventTracker("View Search Results")}
                        >
                          {matches?.map((match, index) => (
                            <Link
                              to={`/?search=${match.home_team}`}
                              key={index}
                              onClick={() => dismissSearch()}
                            >
                              <li>{match.home_team}</li>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <button
                        className={
                          "col-2 btn text-warning align-right d-flex justify-content-center align-items-center flex-column"
                        }
                        onClick={() => dismissSearch()}
                      >
                        <FontAwesomeIcon icon={faTimes} /> Close
                      </button>
                    </div>
                  </ListGroup>
                </div>
              ) : (
                notShowMobileNav &&
                !slip &&
                !jackpot &&
                !checkDesktop &&
                !pathname.includes("match") && <MobileNav1 />
              )}

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
                    <div className="col-5">
                      <div>
                        <img
                          src={"https://cdn.betnare.com/logo-white.webp"}
                          alt="Betnare"
                          title="Betnare"
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
