import React, {useCallback, useContext, useEffect, useState} from "react";
import HomeSvg from "../../assets/img/mobile/home.png";
import LiveSvg from "../../assets/img/mobile/live.png";
import ProfileSvg from "../../assets/img/mobile/user.png";
import kironImg from "../../../src/assets/img/kiron/nare-league.webp"

import makeRequest from "../utils/fetch-request";
import {Badge} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes,} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {getBetslip, getJackpotBetslip, getKironSlip} from "../utils/betslip";
import {Context} from "../../context/store";
import {LazyLoadImage} from "react-lazy-load-image-component";

const MobileMenu = React.memo(
    (props) => {

    const [liveSports, setLiveSports] = useState();
    const { jackpot, kiron} = props;
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

            <table className="mobile-menu">
                <tbody>
                <tr className={"d-flex w-100"}>
                    <td className={`bloc-icon ${pathname === "/" ? "active" : ""}`}>
                        <Link
                            to={"/"}

                            onClick={() => gaEventTracker("Visit Homepage")}
                        >
                            <LazyLoadImage src={HomeSvg} alt="" style={{ width: "30px", height:"25px" }}/>
                            <p>Home</p>
                        </Link>
                    </td>

                    <td className={`bloc-icon ${pathname === "/nare-league" ? "active" : ""}`}>
                        <Link
                            to={"/nare-league"}
                            onClick={() => gaEventTracker("Visit Nare League Page")}

                        >
                            <LazyLoadImage src={kironImg} alt="" className={'nare-league'}/>

                        </Link>
                    </td>

                    <td className={` nav__betslip bloc-icon bet-slip-footer-toggle text-white`}>
                        <Link to={ {pathname:`${jackpot?"/betslip-jackpot":kiron?`/betslip-nare`:"/betslip-slip"}`, search:`${jackpot!==undefined?'jackpot='+jackpot:''}${kiron!==undefined?'nare-league='+kiron:''}`}}
                            /*{pathname:`${jackpot?"/betslip-jackpot":kiron?`/betslip-nare`:"/betslip-slip"}`, search:`${jackpot!==undefined?'jackpot='+jackpot:''}${betslipValidationData!==undefined ?'betslipValidationData='+encodeURIComponent(JSON.stringify(betslipValidationData)):''}${jackpotData!==undefined?'&jackpotData='+encodeURIComponent(JSON.stringify(jackpotData)):''}${kiron!==undefined?'nare-league='+kiron:''}${kironValidation!==undefined ? '&nareData='+encodeURIComponent(JSON.stringify(kironValidation)):''}`}*/
                        >
                            <Badge
                                pill
                                bg="warning nav__betslip d-flex justify-content-center align-items-center text-dark"
                            >
                                {/*fixed size 50 for bets clicked*/}
                                {jackpot === true&&jackpot!=undefined||pathname=="/betslip-jackpot"
                                    ? getJackpotBetslip() != null
                                        ? <strong>{Object.keys(getJackpotBetslip())?.length}</strong>
                                        : <strong className={'badge-font-weight'}>0</strong>
                                    :kiron==true||pathname=="/betslip-nare"?getKironSlip()!=null?
                                            Object.keys(getKironSlip()).length:<strong className={'badge-font-weight'}>0</strong>
                                        : getBetslip()
                                            ? Object.keys(getBetslip()).length <= 50
                                                ? <strong>{Object.keys(getBetslip()).length}</strong>
                                                : <strong className={'badge-font-weight'}>50</strong>
                                            : <strong>0</strong>}
                            </Badge>
                        </Link>
                    </td>

                    <td className={`bloc-icon ${pathname === "/live" ? "active" : ""}`}>
                        <Link
                            to={`/live`}

                            onClick={() => gaEventTracker("Visit Live  Page")}
                        >
                            <LazyLoadImage src={LiveSvg} alt=""/>
                            {liveSports?.forEach((sport) => {
                                totalCount += sport.count;
                            })}
                            <p>
                                Live <span className={"text-light"}>({totalCount || 0})</span>
                            </p>

                        </Link>
                    </td>



                    {state?.user ? (
                        <td className={`bloc-icon ${pathname === "/profile" ? "active" : ""}`}>
                            <Link
                                to={"/profile"}

                            >
                                <LazyLoadImage src={ProfileSvg} alt=""/>
                                <p>Profile</p>
                            </Link>
                        </td>
                    ) : (
                        <td className={`bloc-icon ${pathname === "/login" ? "active" : ""}`}>
                            <Link
                                to={"/login"}

                            >
                                <LazyLoadImage src={ProfileSvg} alt="" style={{ width: "30px", height:"25px" }}/>
                                <p>Profile</p>
                            </Link>
                        </td>

                    )}
                </tr>
                </tbody>


            </table>
        </div>
    );
});
export default React.memo(MobileMenu);
