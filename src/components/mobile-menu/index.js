import React, {useCallback, useEffect, useState} from 'react';
import HomeSvg from '../../assets/img/mobile/home.png';
import VirtualSvg from '../../assets/img/mobile/virtual.png';
import LiveSvg from '../../assets/img/mobile/live-3.png';
import ProfileSvg from '../../assets/img/mobile/user.png';

import makeRequest from "../utils/fetch-request";
import {Badge} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import BetSlip from "../right/betslip";
import QuickLogin from "../right/quick-login";

import {getFromLocalStorage} from "../utils/local-storage";
import {Link} from "react-router-dom";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";

const MobileMenu = (props) => {
    // console.log("props aere here ", props)
    const [liveSports, setLiveSports] = useState();
    const {jackpot, betslipValidationData, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const pathname = window.location.pathname;

    const fetchData = useCallback(() => {
        let endpoint = "/v1/sports?live=1";
        makeRequest({url: endpoint, method: "get", data: null})
            .then(([c_status, c_result]) => {
                if (c_status === 200) {
                    setLiveSports(c_result?.data)
                }
            });
    }, []);


    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    // console.log("Props bs", betslip)
    return (<div>
            <div
                className={`fixed-bottom text-white d-block  shadow-lg betslip-container-mobile ${betSlipMobile ? 'd-flex' : 'd-none'}`}
                style={{marginBottom: "7rem"}}>
                <div className={"w-100"} style={{position: "relative"}}>
                    <div className="bet-option-list w-100" id='' style={{position: "absolute", bottom: "0"}}>
                        <div className="bet alu  block-shadow d-flex flex-column">
                            <header>
                                <div className="betslip-header d-flex justify-content-between">
                                    <span className="col-sm-8 slp">BETSLIP</span>
                                    <span className="col-sm-2 slip-counter d-flex justify-content-center"
                                          title={'Hide BetSlip'} onClick={() => setBetSlipMobile(false)}>
                                            <FontAwesomeIcon icon={faTimes} className={'align-self-center'}/>
                                </span>
                                </div>
                            </header>
                            <div id="betslip" className="betslip">
                                <BetSlip jackpot={jackpot} betslipValidationData={betslipValidationData}/>
                            </div>
                            <QuickLogin/>
                        </div>
                    </div>
                </div>

            </div>
            <nav className="mobile-menu">
                <Link to={"/"} className={`bloc-icon ${pathname === "/" ? "active" : ""}`}
                      onClick={() => gaEventTracker('Visit Homepage')}>
                    <img src={HomeSvg} alt=""></img>
                    <p>Home</p>
                </Link>
                <Link to={"/virtuals"} className={`bloc-icon ${pathname === "/virtuals" ? "active" : ""}`}>
                    <img src={VirtualSvg} alt=""></img>
                    <p>Virtuals</p>
                </Link>

                <Link to={"#"} className={`  nav__betslip bloc-icon bet-slip-footer-toggle text-white`} onClick={() => {
                    setBetSlipMobile(true)
                }}>
                    {/*{console.log("betslip",betslipValidationData?.length)}*/}
                    <Badge pill bg="warning nav__betslip d-flex justify-content-center align-items-center">
                        {betslipValidationData?.length || 0}
                    </Badge>

                </Link>


                {/*{console.log("liveSports",Object.values(liveSports)[0])}*/}


                <Link to={`/live`} className={`bloc-icon ${pathname === "/live" ? 'active' : ""}`}
                      onClick={() => gaEventTracker('Visit Live  Page')}>
                    <img style={{background: "red"}} src={LiveSvg} alt="">
                    </img>

                    <p>Live <span className={"text-light"}>({liveSports?.length || 0})</span></p>

                </Link>


                {user ? <Link to={"/profile"} className={`bloc-icon ${pathname === "/profile" ? "active" : ""}`}>
                    <img src={ProfileSvg} alt=""></img>
                    <p>Profile</p>
                </Link> : <Link to={"/login"} className={`bloc-icon ${pathname === "/login" ? "active" : ""}`}>
                    <img src={ProfileSvg} alt=""></img>
                    <p>Profile</p>
                </Link>}


            </nav>
        </div>)
}
export default MobileMenu;