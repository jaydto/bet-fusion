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
// import BetSlip from "../right/betslip";
// import QuickLogin from "../right/quick-login";

import { getFromLocalStorage } from "../utils/local-storage";
import { Link } from "react-router-dom";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import { getJackpotBetslip, getBetslip } from "../utils/betslip";
import { Context } from "../../context/store";
import useWindowDimensions from "../header/Dimensions";
// import Decoder from "../right/decoder";
// import DecodeCode from "../right/decoder";
// import { Form } from "formik";
// import { toast } from "react-toastify";

const MobileMenu = (props) => {
    // console.log("props aere here ", props)

    const [liveSports, setLiveSports] = useState();
    const { jackpot, betslipValidationData, jackpotData } = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const gaEventTracker = useAnalyticsEventTracker("Navigation");
    const pathname = window.location.pathname;
    const [popUpHeight, setPopUpHeight] = useState(0);
    const [state, dispatch] = useContext(Context);
    const [className, setClassName] = useState("");
    const { height, width } = useWindowDimensions();

    const [showComment, setShowComment] = useState(false);


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
        // Calculate the remaining screen height
        // const screenHeight = window.innerHeight;
        // console.log("screenHeight",height)
        const remainingScreenHeight =
            height - (jackpot ? (state?.user ? 295 : 260) : state?.user ? 295 : 250);
        // Set the pop up component height to be 20% of the remaining screen height
        setPopUpHeight(remainingScreenHeight);
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);
    // useEffect(() => {
    //     if (window.innerWidth < 967) {
    //         setClassName('slip-max-height');
    //     }
    // }, []);

    // console.log("Props bs", betslip)
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

                <Link to={{pathname:`${jackpot?"/betslip-jackpot":"/betslip-slip"}`, search:`jackpot=${jackpot? jackpot: false}&betslipValidationData=${betslipValidationData?encodeURIComponent(JSON.stringify(betslipValidationData)):false}&jackpotData=${jackpotData?encodeURIComponent(JSON.stringify(jackpotData)):false}`}}
                    //  onClick={()=>window.location.href=`${jackpot?"/betslip-jackpot":"/betslip-slip"}?jackpot=${jackpot? jackpot: false}&betslipValidationData=${betslipValidationData?encodeURIComponent(JSON.stringify(betslipValidationData)):false}&jackpotData=${jackpotData?encodeURIComponent(JSON.stringify(jackpotData)):false}`}
                      className={` nav__betslip bloc-icon bet-slip-footer-toggle text-white`}

                    // onClick={() => {
                    //   setBetSlipMobile(
                    //     jackpot
                    //       ? Object.keys(getJackpotBetslip())?.length == 0
                    //         ? false
                    //         : true
                    //       : true
                    //   );
                    // }}
                >


                    <Badge
                        pill
                        bg="warning nav__betslip d-flex justify-content-center align-items-center"
                    >
                        {console.log("lo-jackpot",jackpot)}

                        {/*fixed size 50 for bets clicked*/}
                        {jackpot === true&&jackpot!=undefined
                            ? getJackpotBetslip() != null
                                ? Object.keys(getJackpotBetslip())?.length
                                : 0
                            : getBetslip()
                                ? Object.keys(getBetslip()).length <= 50
                                    ? Object.keys(getBetslip()).length
                                    : 50
                                : 0}
                        {/*{console.log("betslip_validation: ",betslipValidationData +" jackpot: " +jackpot+" jackpotData: "+Object.keys(getJackpotBetslip()))}*/}
                    </Badge>
                </Link>

                {/*{console.log("liveSports",Object.values(liveSports)[0])}*/}

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
                    {/*{console.log("livesports",liveSports)}*/}
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
export default MobileMenu;
