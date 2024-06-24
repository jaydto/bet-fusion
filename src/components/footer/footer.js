import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = React.memo((props) => {
  const { deposit2, profile_side } = props;
  return (
    <footer
      className={`footer-custom ${deposit2 && "d-flex flex-column card"}`}
      style={
        (deposit2 || profile_side) && {
          background: "transparent",
          paddingLeft: "33px",
        }
      }
    >
      <div className={`row ${profile_side && " d-flex flex-column "}`}>
        <div
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-white"
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={""}>CrashKali</h5>
          <ul>
            <li className="">P.O.BOX 00100 NAIROBI KENYA</li>
            <li className="">
              <a href="mailto:care@ke.CrashKali.com" target={"_blank"}>
                <FontAwesomeIcon icon={faEnvelope} />support@CrashKali.com
              </a>
            </li>
            <li className="footer-icon">
              <a
                href="http://facebook.com/CrashKali-101164702604689"
                target={"_blank"}
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li className="footer-icon">
              <a
                href="https://instagram.com/CrashKalike?igshid=YmMyMTA2M2Y="
                target={"_blank"}
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
          </ul>
        </div>
        <div
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={""}>TERMS AND CONDITIONS</h5>
          <ul>
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
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mobile-only"
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={""}>RESPONSIBLE GAMBLING</h5>
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
              <p style={{}}>
                This is a real-money gambling app. Please gamble responsibly and
                only bet what you can afford. For gambling addiction help and
                support, please contact CustomerCare at (+254701087777), or
                visit (
                <a
                  href="https://responsiblegambling.or.ke/"
                  target="_blank"
                  style={{ color: "var(--aqua-text)" }}
                >
                  {" "}
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
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={""}>LEGAL</h5>
          <ul>
            <li className="text-danger">
              You must be 18 Years+ to use this website.
            </li>
            <li className="">
              <Link to="/dispute-resolution">Dispute Resolution</Link>
            </li>
            <li className="">
              <Link to="/anti-money-laundering">Anti-money Laundering</Link>
            </li>
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
              <p style={{}} className="mt-1 ">
                This is a real-money gambling app. Please gamble responsibly and
                only bet what you can afford. For gambling addiction help and
                support, please contact CustomerCare at (+254701087777), or
                visit (
                <a
                  href="https://responsiblegambling.or.ke/"
                  target="_blank"
                  style={{ color: "var(--aqua-text)" }}
                >
                  {" "}
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
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={""}>LICENSING</h5>
          <p>
            We are licensed and regulated by the Betting Control and Licensing
            Board BCLB 0000540
          </p>
        </div>
      </div>
      <div className="container" id="navbar-collapse-main">
        <div className="footer-bottom text-center">
          Copyright &copy; {new Date().getFullYear()} All rights Reserved.
        </div>
      </div>
    </footer>
  );
});

export default Footer;