import React, {useCallback, useContext, useEffect, useState} from "react";
import HomeSvg from "../../assets/img/mobile/home.png";
import LiveSvg from "../../assets/img/mobile/live.png";
import ProfileSvg from "../../assets/img/mobile/user.png";
import kironImg from "../../../src/assets/img/kiron/nare-league.webp"

import makeRequest from "../utils/fetch-request";
import {Badge} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileInvoice, faReceipt, faTimes,} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {formatNumber, getBetslip, getJackpotBetslip, getKironSlip} from "../utils/betslip";
import {Context} from "../../context/store";
import {LazyLoadImage} from "react-lazy-load-image-component";

const MobileMenu = React.memo((props) => {

    const betItems = getBetslip();
    const [liveSports, setLiveSports] = useState();
    const {jackpot, kiron, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const gaEventTracker = useAnalyticsEventTracker("Navigation");
    const pathname = window.location.pathname;
    const [state, dispatch] = useContext(Context);

    const fetchData = useCallback(() => {
        let endpoint = "/v1/sports?live=1";
        makeRequest({url: endpoint, method: "get", data: null}).then(([c_status, c_result]) => {
            if (c_status === 200) {
                setLiveSports(c_result?.data);

            }
        });
    }, []);

    let totalCount = 0;
    const [progress,setProgress]=useState()

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);

    let sumOfOdds = 0;

    Object.values(betItems || {}).forEach(match => {
        const oddValue = parseFloat(match.odd_value);
        if (!isNaN(oddValue)) {
            sumOfOdds += oddValue;
        }
    });
    let winnings = sumOfOdds !== 0 ? (state?.hasBoost ? state?.netWinBoosted == 0 ? state?.netWin : state?.netWinBoosted : state?.netWin) : 0
    let progressNow=state?.remaining_games;
    const percentageProgress = () => {
        let remainingGames = state?.remaining_games ;
        const boostRequirement = 4;


        if(remainingGames<1){
            progressNow=((boostRequirement ) / boostRequirement) * 100;
            setProgress(progressNow)
        }
        else if (remainingGames >= 1) {
            progressNow = ((boostRequirement - remainingGames) / boostRequirement) * 100;
            setProgress(progressNow)

        }



    };

    useEffect(()=>{
        percentageProgress()
    },[progressNow])

    useEffect(() => {
        if (sumOfOdds == 0) {
            winnings = 0
            dispatch({type: "SET", key: "hasBoost", payload: false});
            dispatch({type: "SET", key: "netWinBoost", payload: 0});
            dispatch({type: "SET", key: "netWin", payload: 0});
            dispatch({type: "SET", key: "multiboostmessage", payload: 0})

        } else {
            winnings = sumOfOdds !== 0 ? (state?.hasBoost ? state?.netWinBoost == 0 ? state?.netWin : state?.netWinBoost : state?.netWin) : 0
        }
    }, [winnings])
    const pathSlipSummary = ["/betslip-slip", "/betslip-nare", "/betslip-nare", "/nare-league", "standing", "bet-history", "/results", "/jackpot", "/casino", "/smart-soft", "/nare-games", "/promotions"]
    const [countInfo, setCountInfo] = useState(true)

    const removeCountInformation = () => {
        setCountInfo(!countInfo)
    }

    const slip_condition = (!pathSlipSummary.includes(pathname) && state?.multiboostmessage && sumOfOdds > 0 && countInfo)
    return (<div>
            <div
                className={`fixed-bottom text-white d-block  shadow-lg betslip-container-mobile ${betSlipMobile ? "d-flex" : "d-none"}`}
                style={{margin: "auto", marginBottom: "6.5rem"}}
            >
                <div className={"w-100"} style={{position: "relative"}}>
                    <div
                        className="bet-option-list w-100"
                        id=""
                        style={{position: "absolute", bottom: "0"}}
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

            <table className={`${slip_condition?"prematch-menu mobile-menu":"mobile-menu"}`}
                   style={!pathSlipSummary.includes(pathname) ? sumOfOdds == 0 ? {height: "70px"} : countInfo ? {height: "120px"} : {height: "70px"} : {height: "53px"}}>
                <tbody>
                    {slip_condition ? <table>
                            <tbody className={"slip-menu-prematch"}>
                            <tr>
                                <td className={"bet-align-right"}>
                                    <div className={"d-flex gap-4 justify-content-end mx-4"}>
                                        <div>
                                            <div className={"slip-count-option"} title={"betslip"}>
                                                <Link to={"/betslip-slip"}>
                                                    <Badge
                                                        pill
                                                        className="slip-count-value"
                                                    >
                                                        {getBetslip() ? Object.keys(betItems || {}).length <= 50 ?
                                                                <strong>{Object.keys(betItems || {}).length}</strong> :
                                                                <strong className={'badge-font-weight'}>50</strong> :
                                                            <strong>0</strong>}
                                                    </Badge>
                                                    <FontAwesomeIcon icon={faFileInvoice}
                                                                     style={{fontSize: "27px", color: "var(--black)"}}/>
                                                </Link>
                                            </div>

                                            <div className={"close-prompt"} title={"close suggestions"}>
                                                <div>
                                                    <input
                                                        id={"slip-count-id"}
                                                        type="submit"
                                                        value="X"
                                                        onClick={() => removeCountInformation()}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </td>

                            </tr>
                            {!pathSlipSummary.includes(pathname) &&
                                <tr className={`${slip_condition?"info_bet_alert":"info-slip-bets"} d-flex w-100 justify-content-between px-3`}>
                                    <td className={"bet-align-left"}>
                                        Odds {parseFloat(sumOfOdds).toFixed(2)}
                                    </td>
                                    <td className={"bet-align-right-slip"}>
                                        Winnings {winnings}
                                    </td>
                                </tr>}
                            <tr className={" d-flex w-100 justify-content-between px-3 mt-2"}>
                                <td className={"bet-align-left w-100 slip-alert-style"}>
                                    {state?.multiboostmessage}
                                </td>
                            </tr>
                            <tr className={"mt-3"}>
                                <td className={"bet-align-left w-100"}>
                                    <div className="progress mx-3 my-3 prematxh-slip">
                                        <div className="progress-bar prematch" role="progressbar"
                                             style={{width: `${progress}%`}}
                                             aria-valuenow={progress}
                                             aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table> :
                        <table>
                            <tbody>
                            {!pathSlipSummary.includes(pathname) &&
                                <tr className={"info-slip-bets d-flex w-100 justify-content-between px-3"}>
                                    <td className={"bet-align-left"}>
                                        Odds {sumOfOdds}
                                    </td>
                                    <td className={"bet-align-right"}>
                                        Winnings {winnings}
                                    </td>
                                </tr>}
                            <tr className={"d-flex w-100"}>
                                <td className={`bloc-icon ${pathname === "/" ? "active" : ""}`}>
                                    <Link
                                        to={"/"}

                                        onClick={() => gaEventTracker("Visit Homepage")}
                                    >
                                        <LazyLoadImage src={HomeSvg} alt="" style={{width: "30px", height: "25px"}}/>
                                        <p>Home</p>
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
                                <td className={` nav__betslip bloc-icon bet-slip-footer-toggle text-white`}>
                                    <Link to={{
                                        pathname: `${jackpot ? "/betslip-jackpot" : kiron ? `/betslip-nare` : "/betslip-slip"}`,
                                        search: `${jackpot !== undefined ? 'jackpot=' + jackpot : ''}${jackpotData !== undefined ? '&jackpotData=' + encodeURIComponent(JSON.stringify(jackpotData)) : ''}${kiron !== undefined ? 'nare-league=' + kiron : ''}`
                                    }}>
                                        <Badge
                                            pill
                                            bg="warning nav__betslip d-flex justify-content-center align-items-center text-dark"
                                        >
                                            {/*fixed size 50 for bets clicked*/}
                                            {jackpot === true && jackpot != undefined || pathname == "/betslip-jackpot" ? getJackpotBetslip() != null ?
                                                <strong>{Object.keys(getJackpotBetslip())?.length}</strong> : <strong
                                                    className={'badge-font-weight'}>0</strong> : kiron == true || pathname == "/betslip-nare" ? getKironSlip() != null ? Object.keys(getKironSlip()).length :
                                                <strong
                                                    className={'badge-font-weight'}>0</strong> : getBetslip() ? Object.keys(betItems || {}).length <= 50 ?
                                                <strong>{Object.keys(betItems || {}).length}</strong> :
                                                <strong className={'badge-font-weight'}>50</strong> : <strong>0</strong>}
                                        </Badge>
                                    </Link>
                                </td>

                                <td className={`bloc-icon ${pathname === "/my-bets" ? "active" : ""}`}>
                                    <Link
                                        to={`/my-bets`}
                                        onClick={() => gaEventTracker("Visit My Bets Page")}>
                                        <FontAwesomeIcon icon={faReceipt} style={{fontSize: "22px", color: "#FFB200"}}/>
                                        <p>
                                            My Bets
                                        </p>

                                    </Link>
                                </td>

                                {state?.user ? (<td className={`bloc-icon ${pathname === "/profile" ? "active" : ""}`}>
                                    <Link
                                        to={"/profile"}

                                    >
                                        <LazyLoadImage src={ProfileSvg} alt=""/>
                                        <p>Profile</p>
                                    </Link>
                                </td>) : (<td className={`bloc-icon ${pathname === "/login" ? "active" : ""}`}>
                                        <Link
                                            to={"/login"}

                                        >
                                            <LazyLoadImage src={ProfileSvg} alt=""
                                                           style={{width: "30px", height: "25px"}}/>
                                            <p>Profile</p>
                                        </Link>
                                    </td>

                                )}
                            </tr>
                            </tbody>
                        </table>}
                </tbody>


            </table>
        </div>);
});
export default React.memo(MobileMenu);
