import React, {useCallback, useEffect, useState} from 'react';
import HomeSvg from '../../assets/img/mobile/home.png';
import VirtualSvg from '../../assets/img/mobile/virtual.png';
import LiveSvg from '../../assets/img/mobile/live-3.png';
import ProfileSvg from '../../assets/img/mobile/user.png';
import BetslipSvg from '../../assets/svg/betslip.svg';
import {getBetslip} from "../utils/betslip";
import makeRequest from "../utils/fetch-request";
import {Badge} from "react-bootstrap";
import Betslip from "../pages/Accounts/Betslip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import BetSlip from "../right/betslip";
import QuickLogin from "../right/quick-login";
import Right from "../right";

const MobileMenu = (props) => {
    console.log("props aere here ", props)
    const [liveSports, setLiveSports] = useState();
    const {jackpot, betslipValidationData, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    let value=true;

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
    return (
        <div>
            <div
            className={`fixed-bottom text-white d-block d-md-none shadow-lg betslip-container-mobile ${betSlipMobile ? 'd-block' : 'd-none'}`}>
            <div className="bet-option-list sticky-top" id=''>
            <div className="bet alu  block-shadow">
            <header style={{marginTop: "50px"}}>
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
            <nav className="mobile-menu">
                <a href="/" className="bloc-icon">
                    <img src={HomeSvg} alt=""></img>
                    <p>Home</p>
                </a>
                <a href="/virtuals" className="bloc-icon">
                    <img src={VirtualSvg} alt=""></img>
                    <p>Virtuals</p>
                </a>
                <a href="#" className={` bloc-icon scaling  bet-slip-footer-toggle`} onClick={()=>{setBetSlipMobile(true)}}>
                    <span className="col-sm-2  text-white">
                                     <Badge pill bg="warning" >
                                      {betslipValidationData?.length || 0}


                                      </Badge>
                                </span>
                    <p>Slip </p>
                </a>
                {/*{liveSports!=null? "live":"off"}*/}

                {liveSports?.length>0?Object.entries(liveSports).map(([index, livesport]) => (
                    <a href={`/live`} className="bloc-icon">
                        <img src={LiveSvg} alt="">
                        </img>
                        <span className={'badge rounded-pill bg-dark'} style={{
                            float: "right",
                            color: "#fff",
                            position: "absolute",
                            marginRight: "1.5rem",
                            top: "1px"
                        }}>
                                                                        {livesport.count||0}
                        </span>
                        <p>Live</p>

                    </a>)):<a href={'/live'} className="bloc-icon">
                    <img src={LiveSvg} alt="">
                    </img>
                    <span className={'badge rounded-pill bg-dark'} style={{
                        float: "right",
                        color: "#fff",
                        position: "absolute",
                        marginRight: "1.5rem",
                        top: "1px"
                    }}>
                                                                       0
                        </span>
                    <p>Live</p>

                </a>
                  }
                  {/*<a href="/live" className="bloc-icon">*/}
                  {/*      <img src={LiveSvg} alt="">*/}
                  {/*      </img>*/}

                  {/*      <p>Live</p>*/}

                  {/*  </a>*/}
                <a href="/" className="bloc-icon">
                    <img src={ProfileSvg} alt=""></img>
                    <p>Me</p>
                </a>


            </nav>
        </div>
    )
}
export default MobileMenu;