import React, {useCallback, useContext, useEffect, useState} from "react";
import HomeSvg from "../../assets/img/mobile/Home.svg"
import Casino from "../../assets/svg/casino.svg"
import ProfileSvg from "../../assets/img/mobile/Profile.svg"
import CloseIcon from "../../assets/img/mobile/close_icon.png"
import Mybets from "../../assets/svg/book.svg"

import {Badge} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReceipt, faTimes} from "@fortawesome/free-solid-svg-icons";

import {Link, useNavigate} from "react-router-dom";
import useAnalyticsEventTracker from "../analytics/useAnalyticsEventTracker";
import {getBetslip, getJackpotBetslip, getKironSlip} from "../utils/betslip";
import {StoreContext } from "../../context/store";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useDispatch, useSelector} from "react-redux";
import {getFromLocalStorage} from "../utils/local-storage";
import {setMatchBetslip, setState as setMatchBetslipOptions} from "../../redux/bettingSlice";

const MobileMenu = React.memo((props) => {

    const pathname = window.location.pathname;

    const betItems = pathname.includes("nare-league")?getKironSlip() :getBetslip();
    const [kiron, setKiron]=useState()
    const {state}=useContext((StoreContext))
    const betslipLength=useSelector((state)=>state.betting.betslipLength)

    const [betSlipMobile, setBetSlipMobile] = useState(false);
    const gaEventTracker = useAnalyticsEventTracker("Navigation");
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.user)
    const [user, setUser] = useState(getFromLocalStorage("user"))
    const remaining_games=useSelector((state)=>state.betting.remaining_games)
    const betslip_options=useSelector((state)=>state.betting.betslip_options)
    const kiron_betslip_options=useSelector((state)=>state.betting.kiron_betslip_options)
    const dispatchRedux=useDispatch()
    let settings = getFromLocalStorage("settings");


    useEffect(() => {
        if (userData) {
            setUser(userData || getFromLocalStorage("user"))
        }
    }, [userData])

    
    useEffect(() => {
        if(pathname.includes('nare')){
            setKiron(true)
        }else{
            setKiron(false)
        }

    }, [pathname]);


    let totalCount = 0;

    const [progress, setProgress] = useState()

    let sumOfOdds = 1;

    Object.values(betItems || {})?.forEach(match => {
        const oddValue = parseFloat(match.odd_value);
        if (!isNaN(oddValue)) {
            sumOfOdds *= oddValue;
        }
    });
    let winnings = sumOfOdds !== 0 ?
    pathname.includes("nare-league")? (
        kiron_betslip_options?.hasBoost ?
         kiron_betslip_options?.netWinBoosted == 0 ? 
         kiron_betslip_options?.netWin : 
         kiron_betslip_options?.netWinBoosted : 
         kiron_betslip_options?.netWin):
         
         (betslip_options?.hasBoost ? 
            betslip_options?.netWinBoosted == 0 ? 
            betslip_options?.netWin : 
            betslip_options?.netWinBoosted : 
            betslip_options?.netWin) : 0

    let progressNow = remaining_games;
    const percentageProgress = () => {
        let remainingGames = remaining_games;
        const boostRequirement = 4;


        if (remainingGames < 1) {
            progressNow = ((boostRequirement) / boostRequirement) * 100;
            setProgress(progressNow)
        } else if (remainingGames >= 1) {
            progressNow = ((boostRequirement - remainingGames) / boostRequirement) * 100;
            setProgress(progressNow)

        }

    };

    useEffect(() => {
        percentageProgress()
    }, [progressNow])

    useEffect(() => {
        if (sumOfOdds == 0) {
            winnings = 0

            pathname.includes("nare-league")?dispatchRedux(setMatchBetslipOptions('kiron_betslip_options', {...kiron_betslip_options,...{hasBoost:false, netWinBoosted: 0, netWin: 0, multiboostmessage: 0}}))
            :dispatchRedux(setMatchBetslipOptions('betslip_options', {...betslip_options,...{hasBoost:false, netWinBoosted: 0, netWin: 0, multiboostmessage: 0}}))


        } else {
            winnings = sumOfOdds !== 0 ?pathname.includes("nare-league")?(kiron_betslip_options?.hasBoost ? kiron_betslip_options?.netWinBoosted == 0 ? kiron_betslip_options?.netWin : kiron_betslip_options?.netWinBoosted : kiron_betslip_options?.netWin): (betslip_options?.hasBoost ? betslip_options?.netWinBoosted == 0 ? betslip_options?.netWin : betslip_options?.netWinBoosted : betslip_options?.netWin) : 0
        }
    }, [winnings])
    const pathSlipSummary = ["/betslip-slip",
        "/betslip-nare", "/betslip-nare",
        "standing", "bet-history", "/results",
        "/jackpot", "/casino", "/smart-soft",
        "/nare-games", "/promotions","/terms-and-conditions", "/profile"]
    const [countInfo, setCountInfo] = useState(true)

    const removeCountInformation = (e) => {
        setCountInfo(!countInfo)
        e.stopPropagation()
    }

    const slip_condition = (!pathSlipSummary.includes(pathname) && (pathname.includes("nare-league")?kiron_betslip_options?.multiboostmessage:betslip_options?.multiboostmessage) && sumOfOdds > 1 && countInfo)
    const [flag, setFlag]=useState(true)
    // cleanup/unmounting components fix
    useEffect(()=>{
        return ()=>{
            setFlag(false)
        }

    },[])
    return (
        flag?<div>
            <div
                className={`fixed-bottom text-white d-block  shadow-lg betslip-container-mobile ${betSlipMobile ? "d-flex" : "d-none"}`}
                style={{margin: "auto", marginBottom: "6.5rem"}}>
                <div className={"w-100"} style={{position: "relative"}}>
                    <div
                        className="bet-option-list w-100"
                        id=""
                        style={{position: "absolute", bottom: "0"}}>
                        <div className="bet alu  block-shadow d-flex flex-column">
                            <header>
                                <div className="betslip-header d-flex justify-content-between align-items-center">
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
            {/* {console.log("CrashKali giftboost status information",(pathname.includes("nare-league")?Number(settings?.kironGifts?.awardGiftBoost)===1:
                   Number(settings?.CrashKaliGifts?.awardGiftBoost)===1) )} */}

            <table className={`${slip_condition ? "prematch-menu mobile-menu" : "mobile-menu"}`}
                   style={!pathSlipSummary.includes(pathname) ? sumOfOdds === 1 ? {height: "50px"} : countInfo&&(pathname.includes("nare-league")?Number(settings?.kironGifts?.awardGiftBoost)===1:
                   Number(settings?.CrashKaliGifts?.awardGiftBoost)===1) ? {height: "92px"} : {height: "70px"} : {height: "50px"}}>
                   <tbody>
                {slip_condition ?
                    <tr className={"mobile-menu-container"} onClick={()=>navigate(pathname.includes("nare-league")?"/betslip-nare?nare-league=true":"/betslip-slip")}>
                        <table>
                            <tbody className={"slip-menu-prematch"}>
                            <tr>
                                <td className={"bet-align-right"}>
                                    <div className={"d-flex gap-4 justify-content-end mx-4"}>
                                        <div>
                                            <div className={"close-prompt close-alert-slip"} title={"close suggestions"}>
                                                <div>
                                                    <LazyLoadImage
                                                        src={CloseIcon}
                                                        onClick={removeCountInformation}
                                                        effect={'blur'}
                                                        className={"align-self-center close-icon-alert"}
                                                    />

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </td>
                             </tr>
                        {!pathSlipSummary.includes(pathname) &&
                             <tr className={`${slip_condition ? "info_bet_alert" : "info-slip-bets"} d-flex w-100 justify-content-between px-3`} onClick={()=>navigate(pathname.includes("nare-league")?"/betslip-nare?nare-league=true":"/betslip-slip")}>
                                <td className={"bet-align-left-slip"}>
                                    <div className={"d-flex justify-content-start align-items-center gap-2"}>
                                        <Badge
                                            pill
                                            bg="warning nav__betslip boost-message-count gap-3  d-flex justify-content-center align-items-center text-dark"
                                        >
                                            <strong className={'badge-font-weight'}>{kiron?state?.betslipKironLength:betslipLength}</strong>

                                        </Badge> <h4> <strong>Betslip</strong> </h4>
                                    </div>

                                </td>
                                <td className={"bet-align-right-slip"}>
                                    <div className={'d-flex flex-column'}>
                                        <span>Odds {parseFloat(sumOfOdds).toFixed(2) || 1}</span>
                                        <span>Winnings {winnings?.toLocaleString('en-US')}</span>
                                    </div>

                                </td>
                            </tr>}
                             <tr className={"mt-3"} onClick={() => navigate(pathname.includes("nare-league")?"betslip-nare?nare-league=true":"/betslip-slip")}>
                            <td className={"bet-align-left w-100"}>
                                <div className="progress mx-3 my-3 prematch-slip">
                                    <div className="progress-bar prematch" role="progressbar"
                                         style={{width: `${progress}%`}}
                                         aria-valuenow={progress}
                                         aria-valuemin="0" aria-valuemax="100">
                                            <span className="progress-text"
                                                  style={{
                                                      position: "absolute",
                                                      left: "50%",
                                                      top: "50%",
                                                      fontWeight: "600",
                                                      transform: "translate(-50%, -50%)",
                                                      color: "var(--dark)",
                                                      fontSize:"10px"
                                                  }}>

								{pathname.includes("nare-league")?kiron_betslip_options?.multiboostmessage:
                                betslip_options?.multiboostmessage}
                                </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                    </tr>
                    :
                    <tr className={"mobile-menu-container"}>
                        <table>
                            <tbody>
                            {!pathSlipSummary.includes(pathname) &&
                            sumOfOdds>1 &&
                                <tr className={"info-slip-bets d-flex w-100 justify-content-between px-3"}>
                                    <td className={"bet-align-left-slip"}>
                                        Odds {parseFloat(sumOfOdds).toFixed(2) || 1}
                                    </td>
                                    <td className={"bet-align-right-slip"}>
                                        Winnings {winnings}
                                    </td>
                                </tr>}
                            <tr className={"d-flex w-100"}>
                                <td className={`bloc-icon ${pathname === "/" ? "active" : ""}`}>
                                    <Link
                                        to={"/"}
                                        onClick={() => gaEventTracker("Visit Homepage")}
                                    >
                                        <LazyLoadImage src={HomeSvg} alt=""
                                        effect="blur"
                                        style={{width: "30px", height: "25px"}}/>
                                        <p>Home</p>
                                    </Link>
                                </td>
                                <td className={`bloc-icon ${pathname === ('/bet-history') ? "active" : ""}`}>
                                    <Link
                                        to={`${'/bet-history?competition_id=2'}`}
                                        onClick={() => gaEventTracker("Visit My Bets Page")}>
                                        <LazyLoadImage src={Mybets}
                                        style={{filter:"invert(1)"}}
                                                       effect="blur"
                                                       alt=""/>
                                        <p>
                                            My Bets
                                        </p>

                                    </Link>
                                </td>

                                
                                <td className={` nav__betslip bloc-icon bet-slip-footer-toggle text-white`}>
                                    <Link to={{
                                        pathname: `${  `/betslip-nare` }`,
                                        search: `${ 'nare-league=' + kiron}`
                                    }}>
                                        <Badge
                                            pill
                                            bg="warning nav__betslip d-flex justify-content-center align-items-center text-dark"
                                        >
                                            <strong className={'badge-font-weight'}>{state?.betslipKironLength}</strong>

                                        </Badge>
                                    </Link>
                                </td>
                                <td className={`bloc-icon ${pathname === "/casino" ? "active" : ""}`}>
                                    <Link
                                        to={`/casino`}
                                        onClick={() => gaEventTracker("Visit Casino Page")}
                                    >
                                        <LazyLoadImage src={Casino} style={{filter:"invert(1)"}}
                                        effect="blur"
                                        alt=""/>
                                      
                                        <p>
                                           Casino
                                        </p>

                                    </Link>
                                </td>
                              

                                {user ? (<td className={`bloc-icon ${pathname === "/profile" ? "active" : ""}`}>
                                    <Link
                                        to={"/profile"}>
                                        <LazyLoadImage src={ProfileSvg}
                                        effect="blur"
                                        alt=""/>
                                        <p>Profile</p>
                                    </Link>
                                </td>) : (<td className={`bloc-icon ${pathname === "/login" ? "active" : ""}`}>
                                        <Link
                                            to={"/login"}>
                                            <LazyLoadImage src={ProfileSvg} alt=""
                                            effect="blur"
                                                           style={{width: "30px", height: "25px"}}/>
                                            <p>Profile</p>
                                        </Link>
                                    </td>

                                )}
                            </tr>
                            </tbody>
                        </table>
                    </tr>}

                </tbody>


            </table>
        </div>:null);
});
export default React.memo(MobileMenu);
