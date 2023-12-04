import "./bethistory.css"
import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../../../context/store"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import BetDetails from "./BetDetails";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import {Switch} from "@mui/material";
import GameHistoryList from "../../../modals/FilterBetHistory";
import moment from "moment";
import {ToastContainer} from "react-toastify";
import {faXbox} from "@fortawesome/free-brands-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {betCashout, betHistoryDetails, fullBetDetails, resetState, setFetching} from "../../../../redux/matchesSlice";
import SkeletonLoaderMore from "../../skeletonLoadersWeb/SkeletonLoaderMore";
import {setState} from "../../../../redux/dataSlice";
import CashoutModal from "../../../modals/CashoutModal";

const BetHistory = () => {
    const {state, dispatch} = useContext(StoreContext);
    const dispatchRedux = useDispatch()
    const bet_history_details = useSelector((state) => state.data.bet_history_details)
    

    const fetchData = async () => {
        dispatchRedux(fullBetDetails())

    };

    useEffect(() => {
        const abort = new AbortController()
        fetchData();
        dispatchRedux(setFetching("fetching", true))
        return () => {
            // dispatch({type: "SET", key: "bet_history_details", payload: false});
            dispatchRedux(setState('bet_history_details', false))
            // setLocalStorage("bet_history_details",null)
            abort.abort()
        }
    }, []);

    const PageTitle = () => {
        return (
            <div className='col-md-12 background-profile p-4 text-center text-align-on-mobile-bet-history'>
                <h4 className=" text-light text-align-on-mobile-bet-history  ">
                    MY BETS
                </h4>
            </div>
        )
    }


    const PageBody = () => {
        const {state, dispatch} = useContext(StoreContext);
        const dispatchRedux = useDispatch()

        const CancelBetMarkup = (props) => {
            const {bet_id, can_cancel, created} = props;
            const [countdown, setCountdown] = useState(null);
            let cancelEndTime;
            let interval;

            useEffect(() => {
                if (can_cancel && created) {
                    cancelEndTime = moment(created).add(5, 'minutes');
                    localStorage.setItem('cancelEndTime', cancelEndTime);
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
                localStorage.removeItem('cancelEndTime');
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            };

            const getCountdownText = (diff) => {
                const minutes = Math.floor(diff.asMinutes());
                const seconds = Math.floor(diff.asSeconds() % 60);
                return `${minutes}m ${seconds}s`;
            };

            if (can_cancel && countdown && bet_id + "cancel_rq" !== getFromLocalStorage("bet_history_status")) {
                return (
                    <div className="col d-flex">
                        Cancel will End in: {countdown}
                    </div>
                );
            } else if (bet_id + "cancel_rq" === getFromLocalStorage("bet_history_status") && countdown) {
                return (
                    <div className="col badge bg-dark rounded-4">
                        CANCEL RQ
                    </div>
                )
            } else {
                return (
                    <div className="col badge bg-dark rounded-4">
                        PENDING
                    </div>
                );
            }
        };

        const swap = (bet_id) => {
            // dispatch({type: "SET", key: "bet_history_details", payload: bet_id});
            dispatchRedux(setState('bet_history_details', bet_id))
            dispatchRedux(setFetching("fetching", true))
            const payload = {
                "bet_id": bet_id
            }
            dispatchRedux(betHistoryDetails(payload))
            // setLocalStorage("bet_history_details",bet_id)
        }
        const mybets_data = useSelector((state) => state.matchesData.full_bet_details)
        const [mybets, setMybets] = useState(state?.filteredHistoryGames || state?.bets_by_date || mybets_data)

        useEffect(() => {

            if (state?.filteredHistoryGames) {
                if (!state?.bets_by_date) {
                    setMybets(state?.filteredHistoryGames)
                } else {
                    setMybets(state?.bets_by_date)
                }
            } else {
                if (!state?.bets_by_date) {
                    setMybets(mybets_data)
                } else {
                    setMybets(state?.bets_by_date)
                }
            }

        }, [state?.filteredHistoryGames, state?.bets_by_date, getFromLocalStorage("bet_history_filter_category"), state?.selected_filter_category])
        const cashout=useSelector((state)=>state.matchesData.cashout_response)

        const [cashoutData, setCashoutData]=useState()

        const cashoutRequest=(e,bet_id, amount, possible_win) =>{
            e.stopPropagation();
            console.log('cashout_request',cashout)
            dispatchRedux(resetState("loading_cashout"));

            const cashout_payload={
                bet_id:bet_id
            }
            const cashout_request_data={bet_amount:amount, bet_id:bet_id, bet_type:'full', possible_win:possible_win}
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
            return ()=>{
                dispatchRedux(resetState("loading_cashout"))
            }

        },[show_cashout_modal])


        return (
            <>
                {showCashoutModal && (
                    <CashoutModal
                        visible={showCashoutModal}
                        payload={cashoutData}
                        setShowCashoutModal={setShowCashoutModal}
                    />
                )}
                {mybets && mybets.map((bet, index) => (
                    <div className="my-bets-bet-history" key={index} onClick={() => {
                        swap(bet?.bet_id)
                    }}>
                        <div className={"d-flex justify-content-between w-100 px-3"}>
                            <div className={"bet-history-items id"}>
                                #{bet?.bet_id}
                            </div>
                            <div className={"bet-history-items games badge "}>
                                <FontAwesomeIcon icon={faXbox}/>&nbsp;{bet?.total_matches}
                            </div>
                            <div className={"bet-history-items amount"}>
                                KES {bet?.bet_amount}
                            </div>

                        </div>
                        <div className={"d-flex justify-content-between w-100 px-3"}>
                            <div className={"bet-history-items date"}>
                                {bet?.created}
                            </div>
                            <div className={"bet-history-items status"}>
                                {bet?.can_cancel == 0 ? <span
                                    className={` badge  ${bet?.status_desc == "LOST" ? "bg-dark text-warning" : bet?.status_desc == "WON" ? "bg-success" : bet?.status_desc == "PENDING" ? "bg-dark " :bet?.status_desc == "CASHED OUT" ? "bg-dark ": ""}`}
                                    style={{
                                        color: "white",
                                        marginTop: "10px",
                                        borderRadius: "7px",
                                        marginLeft: "1px",
                                        padding: "2.9px 9px "
                                    }}>{bet?.status_desc == "LOST" ? "NOT WON" : bet?.status_desc}
                              </span> : <CancelBetMarkup bet_id={bet?.bet_id} can_cancel={bet?.can_cancel}
                                                         created={bet?.created}/>}
                            </div>

                        </div>
                        {/*TODO bet?.status_desc==='PENDING'&&*/}
                        {(bet?.status_desc==='PENDING'&& bet?.status!==9)&&<div className={"d-flex justify-content-end w-100 px-3"}>

                            <div className={"bet-history-items status d-flex justify-content-end flex-column bet-cashout"}>
                                <span className={'cashout-divider'}></span>
                                <span
                                    className={` badge cursor-pointer`}
                                    style={{
                                        color: 'var(--betnare-button-login)',
                                        borderRadius: "7px",
                                        marginLeft: "1px",
                                        padding: "2.9px 9px ",
                                        fontSize:'medium',
                                        letterSpacing:'2px'
                                    }} onClick={event => {
                                    cashoutRequest(event,bet?.bet_id, bet?.bet_amount, bet.possible_win)
                                }}>
                                    Cashout
                              </span>
                            </div>

                        </div>}

                    </div>
                ))}
            </>
        )
    }

    const navigateBack = () => {
        if (bet_history_details) {
            // dispatch({type: "SET", key: "bet_history_details", payload: false});
            dispatchRedux(setState('bet_history_details', false))
            // setLocalStorage("bet_history_details",null)
        } else if (bet_history_details === false || bet_history_details === null || bet_history_details === undefined) {
            window.history.back()
        }

    }

    const label = {
        inputProps: {
            'aria-label': 'hide_all_lost_bets',
            'value': 'hide_all_lost_bets'
        }
    };

    const [hideLost, setHideLost] = useState(getFromLocalStorage("remove_lost_bets") || false)
    const [showGameFilter, setShowGameFilter] = useState(false)

    const onSwitchChange = (e) => {
        setLocalStorage("remove_lost_bets", e?.target?.checked)
        setHideLost(e?.target?.checked)
    }
    const mybets = useSelector((state) => state.matchesData.full_bet_details)

    const fetching = useSelector((state) => state.matchesData.fetching)

    const isSameDate = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };
    // const currentDate = new Date();
    const filterGames = () => {
        if (state?.selected_filter_category || getFromLocalStorage("bet_history_filter_category")) {
            // const filteredBets=state?.filteredHistoryGames?state?.filteredHistoryGames:mybets
            let filteredGames = mybets;
            const lost_history = getFromLocalStorage("remove_lost_bets") || hideLost;

            if (lost_history) {
                filteredGames = filteredGames?.filter((game) => game?.status_desc !== 'LOST');
                dispatch({type: "SET", key: "filteredHistoryGames", payload: filteredGames});
            } else {
                dispatch({type: "SET", key: "filteredHistoryGames", payload: null});
            }

            if (state?.selected_filter_category) {
                const filteredGames = mybets;
                const lostHistory = getFromLocalStorage("remove_lost_bets") || hideLost;

                let filteredGamesByDate;

                if (lostHistory) {
                    filteredGamesByDate = filteredGames?.filter((game) => game?.status_desc !== 'LOST');
                } else {
                    filteredGamesByDate = filteredGames;
                }

                if (state?.selected_filter_category) {
                    const currentDate = new Date();

                    filteredGamesByDate = filteredGamesByDate?.filter((game) => {
                        const createdDate = new Date(game.created);

                        if (state?.selected_filter_category === 'today') {
                            return isSameDate(createdDate, currentDate);
                        } else if (state?.selected_filter_category === 'yesterday') {
                            const yesterday = new Date(currentDate);
                            yesterday.setDate(currentDate.getDate() - 1);
                            return isSameDate(createdDate, yesterday);
                        } else if (state?.selected_filter_category === 'open') {
                            return game?.status_desc === 'PENDING';
                        } else if (state?.selected_filter_category === 'week') {
                            const oneWeekAgo = new Date(currentDate);
                            oneWeekAgo.setDate(currentDate.getDate() - 7);
                            return createdDate >= oneWeekAgo && createdDate <= currentDate;
                        } else if (state?.selected_filter_category === 'month') {
                            const oneMonthAgo = new Date(currentDate);
                            oneMonthAgo.setMonth(currentDate.getMonth() - 1);
                            return createdDate >= oneMonthAgo && createdDate <= currentDate;
                        } else if (state?.selected_filter_category === '3month') {
                            const threeMonthsAgo = new Date(currentDate);
                            threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
                            return createdDate >= threeMonthsAgo && createdDate <= currentDate;
                        } else if (state?.selected_filter_category === 'all') {
                            // No filtering, return all games
                            return true;
                        }
                        return false;
                    });
                }

                dispatch({type: "SET", key: "bets_by_date", payload: filteredGamesByDate});

            }
        } else {
            // handleFilterChange
            let filteredGames = mybets;
            const lost_history = getFromLocalStorage("remove_lost_bets") || hideLost
            if (lost_history) {
                filteredGames = filteredGames?.filter((game) => game?.status_desc !== 'LOST');
                dispatch({type: "SET", key: "filteredHistoryGames", payload: filteredGames})
            } else {
                dispatch({type: "SET", key: "filteredHistoryGames", payload: null})
            }

        }

    };

    useEffect(() => {
        filterGames()
    }, [hideLost], state?.selected_filter_category)

    const showGameHistoryList = () => {
        setShowGameFilter(!showGameFilter)
    }


    return (
        <>
            <>
                <div>
                    <ToastContainer/>

                    <div className={'back-navigation original-button top-spacing'} onClick={() => navigateBack()}>
                        <FontAwesomeIcon icon={faAngleLeft} className={'back-navigation-icon'}/> Back
                    </div>
                    <div className="container-history top-spacing">
                        <div className="iphone background-profile">

                            <div className="d-flex flex-row justify-content-between">

                                <div className="gz home" style={{width: '100%'}}>
                                    {showGameFilter && <GameHistoryList visible={showGameFilter}
                                                                        games={mybets}
                                                                        setShowGameFilter={setShowGameFilter}/>}
                                    <PageTitle/>
                                    {fetching ? <div className={`text-center mt-2 text-white d-block`}>
                                        <SkeletonLoaderMore/>
                                    </div> : <>
                                        {bet_history_details == false &&
                                            <div
                                                className="d-flex w-100 justify-content-between filter-buttons-bethistory px-4">
                                                <div className={"filters button-filter text-capitalize"}
                                                     onClick={showGameHistoryList}>
                                                    {(state?.selected_filter_category) || "All"}&nbsp;<FontAwesomeIcon
                                                    icon={faCaretDown}/>
                                                </div>
                                                {state?.selected_filter_category !== 'open' &&
                                                    <div className={"filters"}>

                                                        <div className={"odd-change-position"}>
                                                            <Switch id={"hide_all_lost_bets"} {...label}
                                                                    className="slip-change-box"
                                                                    name={"hide_all_lost_bets"}
                                                                    checked={hideLost || false}
                                                                    color="primary"
                                                                    onChange={(e) => onSwitchChange(e)}/> {hideLost ? "Show " : "Hide "} lost
                                                            bets

                                                        </div>
                                                    </div>}
                                            </div>}
                                        {bet_history_details ?
                                            <BetDetails
                                                bet_id={bet_history_details}/> :
                                            <PageBody/>
                                        }
                                    </>}

                                </div>
                            </div>
                        </div>


                    </div>

                </div>


            </>
        </>
    )

}
export default BetHistory;
