import React, { useContext, useEffect, useRef, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import { StoreContext } from "../../context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faQuestionCircle,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import { Link, useNavigate } from "react-router-dom";
import { getFromLocalStorage, setLocalStorage } from "../utils/local-storage";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../redux/dataSlice";
import { shouldShowSearch } from "../../redux/navigationAction";

const HeaderNav = React.memo((props) => {
  const gaEventTracker = useAnalyticsEventTracker("Navigation");
  const [test, setTest] = useState(false);

  const dispatchRedux = useDispatch();

  const pathname = window.location.pathname;
  const notShowSearch = dispatchRedux(shouldShowSearch(pathname));
  const [searching, setSearching] = useState(false);


  const searchInputRef = useRef(null);
  let navigate = useNavigate();


  var currentURL = new URL(window.location.href);
  var pathAndQuery = currentURL.pathname + currentURL.search;

  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData, getFromLocalStorage("user")]);


  const showSearchBar = () => {
    setSearching(true);
    searchInputRef.current.focus();
    gaEventTracker("Clicked on Search");
  };




  const checkEnvironment = () => {
    setTest(window.location.hostname === "test.CrashKali.com");
  };

  useEffect(() => {
    checkEnvironment();
  });

  const launchJetX = () => {
    navigate("/smart-play?game=JetX&category=JetX");
  };

  const LoginCheck = (game) => {
    {
      // if (user !== null) {
      navigate("/casino");
      // } else {
      //     setLocalStorage("ActiveLink", '/casino')
      //     navigate('/login')

      // }
    }
  };

  useEffect(() => {
    if (searching) {
      dispatchRedux(setState("navigation_link", pathAndQuery));
    }
  }, [searching]);
  return (
    <>
      <Container
        fluid
        id="navbar-collapse-main"
        className={`d-none d-sm-flex d-flex flex-row  header-menu  ${
          searching ? "hidden" : "d-block"
        }`}
      >
        <ListGroup
          as="ul"
          xs="12"
          horizontal
          className="nav navbar-nav og d-flex ale ss  col-lg-9 col-md-9 col-sm-9 change-display"
          style={{ margin: "0px 10px 0px 0px" }}
        >
          <li
            className={pathname === "/" ? "active" : ""}
            onClick={() => gaEventTracker("Visit Homepage")}
          >
            <Link
              className="cg fm ox anl url-link not-selectable "
              to="/"
              title="Home"
            >
              <strong>Home</strong>
            </Link>
          </li>

          <li className={`${pathname === "/casino" ? "active" : ""}`}>
            <div
              className="url-link fm anl cg ox "
              title="Casino"
              onClick={() => {
                LoginCheck("new-casino");
                gaEventTracker("Visit Casino Page");
              }}
            >
              <span>
                <strong>Virtual League</strong>
              </span>
            </div>
          </li>

        

          
         

          <li className={`${pathname === "/casino" ? "active" : ""}`}>
            <div
              className="url-link fm anl cg ox "
              title="Casino"
              onClick={() => {
                LoginCheck("new-casino");
                gaEventTracker("Visit Casino Page");
              }}
            >
              <span>
                <strong>Casino</strong>
              </span>
            </div>
          </li>

         

          

        </ListGroup>
        <ListGroup
          as="ul"
          xs="12"
          horizontal
          className="nav navbar-nav og d-flex ale ss  col-lg-3 col-md-3 col-sm-3 change-display second-nav-list"
        >
          <li
            className={
              pathname === "/print-matches" ? "spacing-end" : "spacing-end"
            }
          >
           {notShowSearch&& <div
              className="url-link fm anl cg ox fix-display cursor-pointer"
              title="Search"
              onClick={() => {
                showSearchBar();
                gaEventTracker("Visit Search");
              }}
            >
              <span className=" space-icons">
                <strong>
                  <FontAwesomeIcon icon={faSearch} />{" "}
                </strong>
              </span>
              <strong>
                <span className={"hide2"}>Search </span>
              </strong>
            </div>}
          </li>
          <li
            className={pathname === "/how-to-play" ? "active" : ""}
            onClick={() => gaEventTracker("Visit How To Play Page")}
          >
            <Link
              className="url-link fm anl cg ox fix-display"
              to="/how-to-play"
              title="How to play"
            >
              <span className=" space-icons">
                <strong>
                  <FontAwesomeIcon icon={faQuestionCircle} />{" "}
                </strong>
              </span>
              <span className={"hide2"}>
                <strong>Help</strong>
              </span>
            </Link>
          </li>
         
        </ListGroup>
      </Container>

    
    </>
  );
});
export default React.memo(HeaderNav);
