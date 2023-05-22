import React, { useCallback, useContext, useEffect, useState } from "react";
import HomeSvg from "../../assets/img/mobile/home.png";
import VirtualSvg from "../../assets/img/mobile/virtual.png";
import LiveSvg from "../../assets/img/mobile/live.png";
import ProfileSvg from "../../assets/img/mobile/user.png";

import makeRequest from "../utils/fetch-request";
import { Badge, Button, ToastContainer } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faCoins,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {getJackpotBetslip, getBetslip, getKironSlip} from "../utils/betslip";
import { Context } from "../../context/store";
import useWindowDimensions from "../header/Dimensions";

const MobileMenu = (props) => {

    const [liveSports, setLiveSports] = useState();
    const { jackpot, betslipValidationData, jackpotData,kironValidation, kiron} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const gaEventTracker = useAnalyticsEventTracker("Navigation");
    const pathname = window.location.pathname;
    const [state,dispatch ] = useContext(Context);

    const fetchData = useCallback(() => {
        let endpoint = "/v1/sports?live=1";
        makeRequest({ url: endpoint, method: "get", data: null }).then(
            ([c_status, c_result]) => {
                if (c_status === 200) {
                    setLiveSports(c_result?.data);

                }
            }
        );
    }, []);

    let totalCount = 0;


    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    return (
        <div>
            <div
                className={`fixed-bottom text-white d-block  shadow-lg betslip-container-mobile ${
                    betSlipMobile ? "d-flex" : "d-none"
                }`}
                style={{ margin: "auto", marginBottom: "6.5rem" }}
            >
                <div className={"w-100"} style={{ position: "relative" }}>
                    <div
                        className="bet-option-list w-100"
                        id=""
                        style={{ position: "absolute", bottom: "0" }}
                    >
                        <div className="bet alu  block-shadow d-flex flex-column">
                            <header>
                                <div className="betslip-header d-flex justify-content-between">
                                    <span className="col-sm-8 slp">BETSLIP</span>
                                    <span
                                        className="col-sm-2 slip-counter d-flex justify-content-center"
                                        title={"Hide BetSlip"}
                                        onClick={() => setBetSlipMobile(false)}
                                    >
                    <FontAwesomeIcon
                        icon={faTimes}
                        className={"align-self-center"}
                    />
                  </span>
                                </div>
                            </header>



                        </div>
                    </div>
                </div>
            </div>

            <nav className="mobile-menu">
                <Link
                    to={"/"}
                    className={`bloc-icon ${pathname === "/" ? "active" : ""}`}
                    onClick={() => gaEventTracker("Visit Homepage")}
                >
                    <img src={HomeSvg} alt="" style={{ width: "30px", height:"25px" }}></img>
                    <p>Home</p>
                </Link>
                <Link
                    to={"/virtuals"}
                    className={`bloc-icon ${pathname === "/virtuals" ? "active" : ""}`}
                >
                    <img src={VirtualSvg} alt=""></img>
                    <p>Virtuals</p>
                </Link>

                <Link to={ {pathname:`${jackpot?"/betslip-jackpot":kiron?`/betslip-nare`:"/betslip-slip"}`, search:`${jackpot!==undefined?'jackpot='+jackpot:''}${kiron!==undefined?'nare-league='+kiron:''}`}}
                    /*{pathname:`${jackpot?"/betslip-jackpot":kiron?`/betslip-nare`:"/betslip-slip"}`, search:`${jackpot!==undefined?'jackpot='+jackpot:''}${betslipValidationData!==undefined ?'betslipValidationData='+encodeURIComponent(JSON.stringify(betslipValidationData)):''}${jackpotData!==undefined?'&jackpotData='+encodeURIComponent(JSON.stringify(jackpotData)):''}${kiron!==undefined?'nare-league='+kiron:''}${kironValidation!==undefined ? '&nareData='+encodeURIComponent(JSON.stringify(kironValidation)):''}`}*/
                      className={` nav__betslip bloc-icon bet-slip-footer-toggle text-white`}>
                    <Badge
                        pill
                        bg="warning nav__betslip d-flex justify-content-center align-items-center text-dark"
                    >


                        {/*fixed size 50 for bets clicked*/}
                        {jackpot === true&&jackpot!=undefined||pathname=="/betslip-jackpot"
                            ? getJackpotBetslip() != null
                                ? <strong>{Object.keys(getJackpotBetslip())?.length}</strong>
                                : <strong>0</strong>
                            :kiron==true||pathname=="/betslip-nare"?getKironSlip()!=null?
                              Object.keys(getKironSlip()).length:<strong>0</strong>
                                : getBetslip()
                                ? Object.keys(getBetslip()).length <= 50
                                    ? <strong>{Object.keys(getBetslip()).length}</strong>
                                        : <strong>50</strong>
                                : <strong>0</strong>}
                        {/*{console.log("betslip_validation: ",betslipValidationData +" jackpot: " +jackpot+" jackpotData: "+Object.keys(getJackpotBetslip()))}*/}
                    </Badge>
                </Link>


                <Link
                    to={`/live`}
                    className={`bloc-icon ${pathname === "/live" ? "active" : ""}`}
                    onClick={() => gaEventTracker("Visit Live  Page")}
                >
                    <img src={LiveSvg} alt=""></img>
                    {liveSports?.forEach((sport) => {
                        totalCount += sport.count;
                    })}
                    <p>
                        Live <span className={"text-light"}>({totalCount || 0})</span>
                    </p>

                </Link>

                {state?.user ? (
                    <Link
                        to={"/profile"}
                        className={`bloc-icon ${pathname === "/profile" ? "active" : ""}`}
                    >
                        <img src={ProfileSvg} alt=""></img>
                        <p>Profile</p>
                    </Link>
                ) : (
                    <Link
                        to={"/login"}
                        className={`bloc-icon ${pathname === "/login" ? "active" : ""}`}
                    >
                        <img src={ProfileSvg} alt="" style={{ width: "30px", height:"25px" }}></img>
                        <p>Profile</p>
                    </Link>
                )}
            </nav>
        </div>
    );
};
export default React.memo(MobileMenu);
