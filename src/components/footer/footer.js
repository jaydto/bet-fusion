import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"


const Footer = (props) => {
    const {deposit2,profile_side}=props
    return (
        <footer className={`footer-custom ${deposit2&&'d-flex flex-column card'}`} style={(deposit2||profile_side)&&{background:'transparent',paddingLeft:'33px'}}>
            <div className={`row ${profile_side&&' d-flex flex-column '}`}>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-white" style={deposit2&&{width:'50%'}}>
                    <h5 className={""}>BETNARE</h5>
                    <ul>
                        <li className="">
                            P.O.BOX 00100 NAIROBI KENYA
                        </li>
                        <li className="">
                            <a href="mailto:care@ke.betnare.com">
                                <FontAwesomeIcon icon={faEnvelope}/> customercare@betnare.com
                            </a>
                        </li>
                        <li className="footer-icon">
                            <a href="http://facebook.com/Betnare-101164702604689">
                                <FontAwesomeIcon icon={faFacebook}/> Facebook
                            </a>
                        </li>
                        <li className="footer-icon">
                            <a href="https://instagram.com/betnareke?igshid=YmMyMTA2M2Y=">
                                <FontAwesomeIcon icon={faInstagram}/> Instagram
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" style={deposit2&&{width:'50%'}}>
                    <h5 className={""}>TERMS AND CONDITIONS</h5>
                    <ul>
                        <li className="">
                            <a href="/terms-and-conditions">Terms and Conditions</a>
                        </li>
                        <li className="">
                            <a href="/responsible-gambling">Responsible Gambling</a>
                        </li>
                        <li className="">
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li className="">
                            <a href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li className="">
                            <a href="/how-to-play">How To Play</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" style={deposit2&&{width:'50%'}}>
                    <h5 className={""}>LEGAL</h5>
                    <ul>
                        <li className="text-danger">
                            You must be 18 Years+ to use this website.
                        </li>
                        <li className="">
                            <a href="/dispute-resolution">Dispute Resolution</a>
                        </li>
                        <li className="">
                            <a href="/anti-money-laundering">Anti-money Laundering</a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" style={deposit2&&{width:'50%'}}>
                    <h5 className={""}>LICENSING</h5>
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
