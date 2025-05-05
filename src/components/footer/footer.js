import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../redux/dataSlice";
import { getFromLocalStorage } from "../utils/local-storage";

const Footer = React.memo((props) => {
  const { deposit2, profile_side, sidebar } = props;
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));

  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  const dispatchRedux = useDispatch();

  // const gaEventTracker = useAnalyticsEventTracker('Navigation');
  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };
  return (
    <footer
      className={`footer-custom ${deposit2 && "d-flex flex-column card"} `}
      style={
        (deposit2 || profile_side) && {
          background: "transparent",
          paddingLeft: "33px",
        }
        // : sidebar&&{ background: "var(--jaza-bets-header-bg)" }
      }
    >
      <div
        className={`row ${
          profile_side && " d-flex flex-column  "
        }  desktop-footer ${
          sidebar && "d-flex flex-column justify-content-center px-2"
        }`}
      >
        <div
          className={`col-xs-12 col-sm-12 col-md-12 ${
            sidebar ? "col-lg-12" : "col-lg-12"
          } text-white`}
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={`${sidebar && "px-3"}`}>Jazabets</h5>
          <ul
            className={`${sidebar && "transaction desktop-drawer flex-column"}`}
          >
            <li className="">P.O.BOX 00100 NAIROBI KENYA</li>
            <li className="">
              <a href="mailto:care@ke.Jazabets.com" target={"_blank"}>
                <FontAwesomeIcon icon={faEnvelope} />
                support@Jazabets.com
              </a>
            </li>
            <div className={`${sidebar && "d-flex align-items-center"}`}>
              <li
                className={`footer-icon ${
                  sidebar && "d-flex align-items-center"
                } `}
              >
                <a
                  href="http://facebook.com/Jazabets-101164702604689"
                  target={"_blank"}
                  className={`${sidebar && "d-flex align-items-center"} `}
                >
                  <FontAwesomeIcon icon={faFacebook} /> Facebook
                </a>
              </li>
              <li
                className={`footer-icon ${
                  sidebar && "d-flex align-items-center"
                } `}
              >
                <a
                  href="https://instagram.com/Jazabetske?igshid=YmMyMTA2M2Y="
                  target={"_blank"}
                  className={`${sidebar && "d-flex align-items-center"} `}
                >
                  <FontAwesomeIcon icon={faInstagram} /> Instagram
                </a>
              </li>
            </div>
          </ul>
        </div>
        <div
          className={`col-xs-12 col-sm-12 col-md-12 ${
            sidebar ? "col-lg-12" : "col-lg-12"
          } `}
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={`${sidebar && "px-3"}`}>TERMS AND CONDITIONS</h5>
          <ul
            className={`${
              sidebar &&
              "transaction desktop-drawer px-2 flex-column justify-content-center"
            }`}
          >
            <li className="">
              <Link to="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li className="">
              <Link to="/responsible-gambling">Responsible Gambling</Link>
            </li>
            <li className="">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="">
              <Link to="/cookie-policy">Cookie Policy</Link>
            </li>
            <li className="">
              <Link to="/how-to-play">How To Play</Link>
            </li>
          </ul>
        </div>
        <div
          className={`col-xs-12 col-sm-12 col-md-12 ${
            sidebar ? "col-lg-12" : "col-lg-12"
          } mobile-only`}
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={`${sidebar && "px-3"}`}>RESPONSIBLE GAMBLING</h5>
          <ul className="px-1">
            <li
              className="mt-2 mb-4 px-1"
              style={
                {
                  // borderRadius: "10px",
                  // boxShadow: "1px 1px 1px 1px var(--faded-color)",
                }
              }
            >
              <p style={{}} className={`${sidebar && " d-block"}`}>
                This is a real-money gambling app. Please gamble responsibly and
                only bet what you can afford. For gambling addiction help and
                support, please contact CustomerCare at (+254111513541), or
                visit (
                <a
                  href="https://responsiblegambling.or.ke/"
                  target="_blank"
                  style={{ color: "var(--aqua-text)" }}
                >
                  Responsible Gambling Website
                </a>{" "}
                ).
                <br />
                For more information, please view our Responsible Gaming Policy
                <Link
                  to={"/responsible-gambling"}
                  style={{ color: "var(--aqua-text)" }}
                >
                  here
                </Link>
              </p>
            </li>
          </ul>
        </div>
        <div
          style={{ gridColumnStart: "span 2" }}
          className={`col-xs-12 col-sm-12 col-md-12 ${deposit2 ? "w-50" : ""}${
            sidebar ? "col-lg-12" : "col-lg-12"
          } `}
        >
          <h5 className={`${sidebar && "px-3"}`}>LEGAL</h5>
          <ul>
            <li
              className={`text-danger ${
                sidebar && "transaction desktop-drawer"
              }`}
            >
              You must be 18 Years+ to use this website.
            </li>
            <div
              className={`${
                sidebar && "d-flex  flex-column transaction desktop-drawer"
              }`}
            >
              <li className="">
                <Link to="/dispute-resolution">Dispute Resolution</Link>
              </li>
              <li className="">
                <Link to="/anti-money-laundering">Anti-money Laundering</Link>
              </li>
            </div>

            <h5 className={"mt-3 desktop-only-show"}>RESPONSIBLE GAMBLING</h5>
            <li
              className="mt-1 mb-2 px-1 desktop-only-show"
              style={
                {
                  // borderRadius: "10px",
                  // boxShadow: "1px 1px 1px 1px var(--faded-color)",
                }
              }
            >
              <p style={{}} className={`mt-1 ${sidebar && " d-block"}`}>
               jazabets.com is a real-money gambling platform. We encourage you
                to gamble responsibly and only bet what you can afford to lose.
                Please note that this is a real-money gambling app. You are
                required to gamble responsibly and only bet what you can afford.
                For gambling addiction help and support, please contact our
                customer care at (+254111513541) or help@Jazabets.com or visit
                (
                <a
                  href="https://responsiblegambling.or.ke/"
                  target="_blank"
                  style={{ color: "var(--aqua-text)" }}
                >
                  Responsible Gambling Website
                </a>{" "}
                ).
                <br />
                For more information, please view our Responsible Gaming Policy
                <Link
                  to={"/responsible-gambling"}
                  style={{ color: "var(--aqua-text)" }}
                >
                  here
                </Link>
              </p>
            </li>
          </ul>
        </div>
      </div>
      {user && sidebar ? (
        <div className={"row w-50"}>
          <div className={"w-100 sidebar-mobile"}>
            {" "}
            <a
              className={"logout-btn mt-2"}
              href={"/logout"}
              onClick={handleClose}
            >
              Logout
            </a>{" "}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="container" id="navbar-collapse-main">
        <div className="footer-bottom text-center">
          Copyright &copy; {new Date().getFullYear()} All rights Reserved.
        </div>
      </div>
    </footer>
  );
});

export default Footer;
