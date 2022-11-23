import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"
import {Link} from "react-router-dom";


const Footer = (props) => {

    return (
        <footer className="footer-custom footer-mobile px-4">
            <div className="row sidebar-mobile-column">
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-white">
                    <h5 className={"border-bottom border-secondary"}>BETNARE</h5>

                    <ul>
                        <li className="">
                            P.O.BOX 00100 NAIROBI KENYA
                        </li>
                        <li className="">
                            <Link to={"mailto:care@ke.betnare.com"}>
                                <FontAwesomeIcon icon={faEnvelope}/> customercare@betnare.com
                            </Link>
                        </li>
                        <li className="footer-icon">
                            <Link to={"http://facebook.com/Betnare-101164702604689"}>
                                <FontAwesomeIcon icon={faFacebook}/> Facebook
                            </Link>
                        </li>
                        <li className="footer-icon">
                            <Link to={"https://instagram.com/betnareke?igshid=YmMyMTA2M2Y="}>
                                <FontAwesomeIcon icon={faInstagram}/> Instagram
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <h5 className={"border-bottom border-secondary"}>TERMS AND CONDITIONS</h5>

                    <ul>
                        <li className="">
                            <Link to={"/terms-and-conditions"}>Terms and Conditions</Link>
                        </li>
                        <li className="">
                            <Link to={"/responsible-gambling"}>Responsible Gambling</Link>
                        </li>
                        <li className="">
                            <Link to={"/privacy-policy"}>Privacy Policy</Link>
                        </li>
                        <li className="">
                            <Link to={"/cookie-policy"}>Cookie Policy</Link>
                        </li>
                        <li className="">
                            <Link to={"/how-to-play"}>How To Play</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <h5 className={"border-bottom border-secondary"}>LEGAL</h5>

                    <ul>
                        <li className="text-danger">
                            You must be 18 Years+ to use this website.
                        </li>
                        <li className="">
                            <Link to={"/dispute-resolution"}>Dispute Resolution</Link>
                        </li>
                        <li className="">
                            <Link to={"/anti-money-laundering"}>Anti-money Laundering</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <h5 className={"border-bottom border-secondary"}>LICENSING</h5>

                    <p>
                        We are licensed and regulated by the Betting Control and Licensing
                        Board BCLB 0000453
                    </p>
                </div>
            </div>
            <div className="container" id="navbar-collapse-main">
                <div className="footer-bottom text-center">
                    Copyright &copy; {new Date().getFullYear()} All rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
