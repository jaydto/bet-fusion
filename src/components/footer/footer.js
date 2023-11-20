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
          <h5 className={""}>BETNARE</h5>
          <ul>
            <li className="">P.O.BOX 00100 NAIROBI KENYA</li>
            <li className="">
              <a href="mailto:care@ke.betnare.com" target={"_blank"}>
                <FontAwesomeIcon icon={faEnvelope} /> customercare@betnare.com
              </a>
            </li>
            <li className="footer-icon">
              <a
                href="http://facebook.com/Betnare-101164702604689"
                target={"_blank"}
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li className="footer-icon">
              <a
                href="https://instagram.com/betnareke?igshid=YmMyMTA2M2Y="
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
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={""}>LEGAL</h5>
          <ul>
            <li className="text-danger">
              Must be 18 years of age or older to register or play at BetNare.
              Gambling may have adverse effects if not done with moderation.
            </li>
            <li className="">
              <Link to="/dispute-resolution">Dispute Resolution</Link>
            </li>
            <li className="">
              <Link to="/anti-money-laundering">Anti-money Laundering</Link>
            </li>
          </ul>
        </div>
        <div
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={deposit2 && { width: "50%" }}
        >
          <h5 className={""}>LICENSING</h5>
          <p>
            Beyond Intoch software Limited T/A BetNare is licensed by BCLB (Betting Control and Licensing Board of
            Kenya) under the Betting, Lotteries and Gaming Act, Cap 131, Laws of
            Kenya under License Numbers: 0000540
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
