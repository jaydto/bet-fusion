import React, {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretRight,
    faChartLine,
    faCheckCircle,
    faQuestionCircle,
    faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import {Button, ButtonGroup} from "react-bootstrap";
import Notify from "../../../utils/Notify";
import BetslipShareModal from "../../../modals/BetslipShareModal";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import {useNavigate} from "react-router-dom";
import useWindowDimensions from "../../../header/Dimensions";
import {useDispatch, useSelector} from "react-redux";
import {betCancel, betCashout, matchesRebet, matchesShareBet, resetState} from "../../../../redux/matchesSlice";
import {ToastContainer} from "react-toastify";
import SkeletonMoreMarkets from "../../skeletonLoadersWeb/SkeletonMoreMarkets";
import CashoutModal from "../../../modals/CashoutModal";

const BetDetails = React.memo(
    (props) => {
        const bet_id = useSelector((state) => state.data.bet_history_details)

        const FormatDate = (props) => {
            const {date} = props;

            // Extract the date and time components
            const [dateString, timeString] = date.split(' ');
            const [year, month, day] = dateString.split('-');
            const [hour, minute] = timeString.split('-');

            // Create a new Date object
            const dateTime = new Date(year, month - 1, day, hour, minute);

            // Format the date and time
            const formattedDateTime = dateTime.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });

            return "Placed bet on " + formattedDateTime;
        };

        const [collapsed, setCollapsed] = useState([]);
        const [collapsedAll, setCollapsedAll] = useState(false);
        const mybets_details = useSelector((state) => state.matchesData.bet_details)
        const fetching = useSelector((state) => state.matchesData.fetching)
        const bet_details_meta = useSelector((state) => state.matchesData.bet_details_meta)
        const [, setActiveParentMatchId] = useState(null);


        let lmtIncludes = [79, 85, 82, 80, 107];

        const [switches, setSwitches] = useState("scoreboard")

        const LMT = ({parent_match_id}) => {
            useEffect(() => {
                window?.SIR("addWidget", "#sr-widget-" + parent_match_id, "match.lmtPlus", {
                    branding: {tabs: {option: "icon", variant: "fullWidth"}},
                    goalBannerImage:
                        "https://storage.googleapis.com/nareimages/logo-white.webp",
                    logo: ["https://storage.googleapis.com/nareimages/logo-dark.webp"],
                    momentum: "disable",
                    matchId: parent_match_id,
                    collapseTo: switches,
                    layout: width < 991 ? "single" : 'double',
                    scoreboard: "extended",
                    detailedScoreboard: "disable",
                });
            })

            return <div id={`sr-widget-${parent_match_id}`}></div>
        }


        const switchLmt = (value) => {
            setSwitches(value)
        }
        const handleLinkClick = (event) => {
            if (event) {

                // remove highlight class from all links
                const links = document.querySelectorAll('.link');
                links?.forEach((link) => link.classList.remove('highlight'));

                // add highlight class to clicked link
                event.currentTarget.classList.add('highlight');
            }
        }


        const toggleCollapse = (index, parent_match_id) => {
            setActiveParentMatchId(parent_match_id)
            const updatedCollapsed = [...collapsed];
            if (updatedCollapsed.includes(index)) {
                updatedCollapsed.splice(updatedCollapsed.indexOf(index), 1);
            } else {
                updatedCollapsed.push(index);
            }
            setCollapsed(updatedCollapsed);
        };

        function toggleCollapseAll(items) {
            if (!collapsedAll) {
                setCollapsed(Array.from({length: items.length}, (_, index) => index));
            } else {
                setCollapsed([]);
            }
            setCollapsedAll(!collapsedAll);
        }

        useEffect(() => {
            setCollapsed(Array.from({length: mybets_details?.length}, (_, index) => index));
        }, [bet_id])

        const WinLostTotal = () => {
            const data = mybets_details
            const filteredData = data?.filter(bet => bet.win === 1 || bet.win === 0);
            const won = filteredData?.filter(bet => bet.win === 1)?.length;
            const lost = filteredData?.filter(bet =>
                bet?.win === 0 && bet?.status === 3
            )?.length;
            const total = filteredData?.length;

            return `${won}/${lost}/${total}`
        }

        const [betStatus, setBetStatus] = useState(getFromLocalStorage("bet_history_status") || null);
        const dispatchRedux = useDispatch()
        const bet_cancel_status = useSelector((state) => state.matchesData.bet_cancel_status)
        const bet_cancel = useSelector((state) => state.matchesData.bet_cancel)
        useEffect(() => {
            if (bet_cancel_status) {
                setBetStatus(bet_cancel_status || getFromLocalStorage("bet_history_status"))
            }
        }, [bet_cancel_status])


        const cancelBet = (bet_id) => {

            let data = {
                bet_id: bet_id,
                cancel_code: 101,
            }
            dispatchRedux(betCancel(data)).then(() => {
                //    todo notification of bet cancellation
                if (bet_cancel) {
                    let message = {
                        status: 200,
                        message: bet_cancel || ""
                    }
                    Notify(message)
                }

            })

        };

        const CancelBetMarkup = (props) => {
            const {bet_id, can_cancel, created} = props;
            const [countdown, setCountdown] = useState(null);
            const [progress, setProgress] = useState(100);
            let cancelEndTime;
            let interval;

            useEffect(() => {
                // let storedEndTime = localStorage.getItem('cancelEndTime');
                if (can_cancel && created) {
                    cancelEndTime = moment(created).add(5, 'minutes');
                    setLocalStorage('cancelEndTime', cancelEndTime);
                    startCountdown(cancelEndTime);
                } else {
                    resetCountdown();
                }
            }, [can_cancel, created]);

            const startCountdown = (endTime) => {
                document.addEventListener('visibilitychange', handleVisibilityChange);
                updateCountdown(endTime);
            };

            const updateCountdown = () => {
                interval = setInterval(() => {
                    const now = moment();
                    const diff = moment.duration(cancelEndTime.diff(now));

                    if (diff.asSeconds() <= 0) {
                        resetCountdown();
                        clearInterval(interval);
                    } else {
                        setCountdown(getCountdownText(diff));
                        setProgress((diff.asSeconds() / 300) * 100); // Calculate the progress based on remaining seconds (5 minutes)
                    }
                }, 1000);
            };

            const handleVisibilityChange = () => {
                if (document.visibilityState === 'visible') {
                    updateCountdown();
                } else {
                    clearInterval(interval);
                }
            };

            const resetCountdown = () => {
                setCountdown(null);
                setProgress(100); // Reset the progress to 100%
                localStorage.removeItem('cancelEndTime');
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };

            const getCountdownText = (diff) => {
                const minutes = Math.floor(diff.asMinutes());
                const seconds = Math.floor(diff.asSeconds() % 60);
                return `${minutes}m ${seconds}s`;
            };

            if (can_cancel && countdown && betStatus !== bet_id + "cancel_rq") {
                return (
                    <div className="progress  bet-history-options" style={{height: '25px'}}
                         onClick={() => cancelBet(bet_id)}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{width: `${progress}%`}}
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
							<span className="progress-text"
                                  style={{
                                      position: "absolute",
                                      left: "50%",
                                      top: "50%",
                                      transform: "translate(-50%, -50%)"
                                  }}>
								{countdown} &nbsp;Cancel</span>

                        </div>

                    </div>
                );
            } else if (betStatus === bet_id + "cancel_rq" && countdown) {
                return (
                    <div className="progress  bet-history-options" style={{textAlign: "center"}}>
                        CANCEL RQ
                    </div>
                )
            } else {
                return (
                    <div className="">
                    </div>
                );
            }
        };

        const {width} = useWindowDimensions()
        const navigate = useNavigate()

        const rebet_match = useSelector((state) => state.matchesData.rebet_match)
        const rebetRequest = async (bet_id) => {
            let data = {
                "bet_id": bet_id
            }
            let message = {
                status: 200,
                message: "Rebet successful"
            }
            dispatchRedux(matchesRebet(data))
            Notify(message)
        }
        useEffect(() => {
            if (rebet_match) {
                return width <= 991 ? window.location.href = "/betslip-slip" : navigate("/")
            }

        }, [rebet_match]);
        const show_share_modal = useSelector((state) => state.matchesData.show_share_modal)
        const share_bet = useSelector((state) => state.matchesData.share_bet)
        const [showShareModal, setShowShareModal] = useState(false);
        const [betSharePayload, setBetSharePayload] = useState({});

        useEffect(() => {
            if (show_share_modal) {
                setShowShareModal(show_share_modal)
            }

        }, [show_share_modal])

        useEffect(() => {
            if (share_bet) {
                setBetSharePayload(share_bet)
            }

        }, [share_bet])

        const shareRequest = (bet_id) => {

            let data = {
                "bet_id": bet_id
            }
            dispatchRedux(matchesShareBet(data))
        };
        const cashout=useSelector((state)=>state.matchesData.cashout_response)
        const [cashoutData, setCashoutData]=useState()

        const cashoutRequest=(bet_id, amount) =>{
            const cashout_payload={
                bet_id:bet_id
            }
            const cashout_request_data={bet_amount:amount, bet_id:bet_id, bet_type:'details'}
            setCashoutData(
                cashout_request_data
            )
            dispatchRedux(betCashout(cashout_payload))
        }
        const show_cashout_modal=useSelector((state)=>state.matchesData.loading_cashout)

        const [showCashoutModal, setShowCashoutModal] = useState(false);
        useEffect(()=>{
            if(show_cashout_modal){
                setShowCashoutModal(show_cashout_modal)
            }
            // return ()=>{
            //     dispatchRedux(resetState("loading_cashout"))
            // }

        },[show_cashout_modal])

        return (
            <>  {showCashoutModal && (
                <CashoutModal
                    visible={showCashoutModal}
                    payload={cashoutData}
                    setShowCashoutModal={setShowCashoutModal}
                />
            )}
                {showShareModal && (
                <BetslipShareModal
                    visible={showShareModal}
                    payload={betSharePayload}
                    setShowShareModal={setShowShareModal}
                />
            )}
                {!fetching ?
                    <div className="d-flex details flex-column bet-details">
                        <ToastContainer/>
                        {mybets_details?.map((item, index) => (
                            <div key={index}>
                                {index === 0 &&
                                    <div className="d-flex history-details flex-column bet-summary-info">
                                        <div className="id">
                                            #{item?.bet_id}
                                        </div>
                                        <div className="date">
                                            <FormatDate date={item?.created}/>
                                        </div>
                                        <div className="status d-flex justify-content-between px-2 mb-3">
								<span
                                    className={` badge  ${bet_details_meta?.bet_info?.status == 3 ? "bg-dark text-warning" : bet_details_meta?.bet_info?.status == 5 ? "bg-success" : bet_details_meta?.bet_info?.status == 1 ? "bg-dark " :bet_details_meta?.bet_info?.status == 15?'bg-dark': ""}`}
                                    style={{
                                        color: "white",
                                        marginTop: "10px",
                                        borderRadius: "7px",
                                        marginLeft: "1px",
                                        padding: "2.9px 9px "
                                    }}>{bet_details_meta?.bet_info?.status === 3 ? "NOT WON" : bet_details_meta?.bet_info?.status === 5 ? "WON" :bet_details_meta?.bet_info?.status === 15 ?'CASHED OUT': "PENDING"}
								</span>
                                        </div>
                                        {index === 0 && (<div className="d-flex history-details-padding gap-3 ">
                                            <div className="col-8 d-flex details-history-main-container">
                                                <div className="d-flex col-4 flex-column details-history-main">
                                                    <div className={"main-details-info-title"}>
                                                        Amount
                                                    </div>
                                                    <div
                                                        className="amount-value">{parseFloat(item?.bet_amount).toLocaleString()}</div>
                                                </div>
                                                <div className="d-flex col-8 flex-column details-history-main">
                                                    <div className={"main-details-info-title"}>
                                                        Possible Winnings
                                                    </div>
                                                    <div
                                                        className="amount-value">{parseFloat(item?.possible_win).toLocaleString()}</div>
                                                </div>

                                            </div>
                                            <div
                                                className="col-4 details-history-main-container d-flex justify-content-center flex-column">
                                                <div className="won-total main-details-info-title">
                                                    W/L/T
                                                </div>
                                                <div className="won-total-value">
                                                    <WinLostTotal/>
                                                </div>

                                            </div>
                                        </div>)}
                                        {item?.status == 1 && <div className="d-flex w-100 justify-content-around">

                                            <div className={"bet-history-options"}
                                                 style={{ fontSize:'medium',
                                                     letterSpacing:'2px',
                                                     background:'var(--bet-history)',
                                                     color:'var(--betnare-button-login)'
                                                 }}
                                                 onClick={() =>
                                                     cashoutRequest(item?.bet_id,item?.bet_amount)
                                                    }>
                                                Cashout
                                            </div>

                                        </div>}
                                        {item?.status == 1 && <div className="d-flex w-100 justify-content-around">
                                            {bet_details_meta?.bet_info.can_cancel !== true &&
                                                <CancelBetMarkup bet_id={item?.bet_id}
                                                                 can_cancel={!bet_details_meta?.bet_info.can_cancel}
                                                                 created={bet_details_meta?.bet_info?.created}/>
                                            }
                                            <div className={"bet-history-options"}
                                                 onClick={() => rebetRequest(item?.bet_id)}>
                                                Rebet
                                            </div>
                                            <div className={"bet-history-options"}
                                                 onClick={() => shareRequest(item?.bet_id)}>
                                                Share
                                            </div>
                                        </div>}
                                        <div className="d-flex options-details-history w-100 justify-content-between">
                                            <div className="d-flex">
                                                Events (Odds {bet_details_meta?.bet_info?.total_odd})
                                            </div>
                                            {index === 0 && (
                                                <div
                                                    className="d-flex text-warning bold d-flex gap-2 align-items-center"
                                                    onClick={() => toggleCollapseAll(mybets_details)}>
                                                    Toggle collapse all {!collapsedAll ?
                                                    <FontAwesomeIcon icon={faCaretRight}/> :
                                                    <FontAwesomeIcon icon={faCaretDown}/>}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                }
                                <div className="d-flex details-history flex-column w-100 mt-3">
                                    <div className="d-flex w-100 justify-content-between px-2 details-items">
                                        <div className="team">
                                            {item?.win === 1 ?
                                                <FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/> :
                                                item?.status === 1 ?
                                                    <FontAwesomeIcon icon={faQuestionCircle}
                                                                     className={"text-warning"}/> :
                                                    <FontAwesomeIcon icon={faXmarkCircle} className={"text-danger"}/>}
                                            &nbsp;<span
                                            className={"team-info"}>{item?.home_team}</span></div>
                                        <div className="outcome">vs</div>
                                        <div className="team"
                                             onClick={() => toggleCollapse(index, item?.parent_match_id)}>
                                        <span
                                            className={"team-info text-end"}>{item?.away_team}</span>&nbsp;{collapsed.includes(index) ?
                                            <FontAwesomeIcon icon={faCaretRight}/> :
                                            <FontAwesomeIcon icon={faCaretDown}/>}
                                        </div>
                                    </div>
                                    <div
                                        className={`${!collapsed.includes(index) ? "d-none " : "d-flex justify-content-between gap-4 "} w-100 px-3 bethistory-items flex-column`}>
                                        <div className="d-flex">
                                            <div className="d-flex  flex-column col">
                                                <div className="d-flex justify-content-between px-2 details-info">
                                                    <div className="type">
                                                        Type
                                                    </div>
                                                    <div className="market-h">
                                                        {item?.market}
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between px-2">
                                                    <div className="pick-ft">
                                                        Pick
                                                    </div>
                                                    <div className="pick-h">
                                                        {item?.bet_pick}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column col">
                                                <div className="d-flex justify-content-between px-2">
                                                    <div className="result-ft">
                                                        Result
                                                    </div>
                                                    <div className="result-h">
                                                        {item?.results}
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between px-2">
                                                    <div className="outcome-t">
                                                        Outcome
                                                    </div>
                                                    <div className="outcome-h bet-details-data">
                                                        {item?.winning_outcome}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {lmtIncludes.includes(item?.sport_id) && < div className="d-flex flex-column col">
                                            <LMT parent_match_id={item?.parent_match_id}/>

                                            <ButtonGroup aria-label="stats button actions"
                                                         className='w-100 d-flex justify-content-start'>
                                                {item?.winning_outcome ? <Button className="place-bet-btn w-25 btn link"
                                                                                 title="Status of match when bet was placed"
                                                                                 type="button"
                                                                                 style={{
                                                                                     border: 'none',
                                                                                     background: "transparent",
                                                                                     fontSize: "14px",
                                                                                     color: item?.live === 1 ? "var(--red)" : "var(--light)"
                                                                                 }}>
                                                    {item?.live === 1 ? "'LIVE" : "'Not Live"}
                                                </Button> : ""}
                                                <Button className="place-bet-btn w-25 btn link" title="Scoreboard"
                                                        type="button" style={{
                                                    background: "transparent",
                                                    fontSize: "14px",
                                                    border: 'none'
                                                }}
                                                        onClick={(event) => {
                                                            switchLmt("scoreboard");
                                                            handleLinkClick(event)
                                                        }}>{item?.result && item?.result}&nbsp;scoreboard
                                                </Button>
                                                <Button
                                                    id="lmt_matches_bet_history"
                                                    onClick={(event) => {
                                                        switchLmt("disable");
                                                        handleLinkClick(event)
                                                    }}
                                                    style={{
                                                        padding: "5px",
                                                        backgroundColor: "transparent",
                                                        fontSize: "14px"
                                                    }}
                                                    type={"button"}

                                                    className="btn border-0 d-flex justify-content-center w-25 d-flex align-items-center link"
                                                    title="Statistics">
                                                    statistics&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <FontAwesomeIcon icon={faChartLine}/>

                                                </Button>
                                            </ButtonGroup>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> :
                    <div className={`text-center mt-2 text-white d-block`}>
                        <SkeletonMoreMarkets/>
                    </div>
                }

            </>
        )
    })
export default React.memo(BetDetails)
