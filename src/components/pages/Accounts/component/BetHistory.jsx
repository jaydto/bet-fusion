import "./bethistory.css"
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Context} from "../../../../context/store";
import useWindowDimensions from "../../../header/Dimensions";
import makeRequest from "../../../utils/fetch-request";
import Header from "../../../header/header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import BetDetails from "./BetDetails";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import {Switch} from "@material-ui/core";
import GameHistoryList from "../../../modals/FilterBetHistory";
import moment from "moment";

const BetHistory = () => {
    const {width} = useWindowDimensions()
    const [state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        let endpoint = "/v1/full/betdetails";
        makeRequest({url: endpoint, method: "POST", data: null}).then(([status, result]) => {
            // dispatch({type: "SET", key: "mybets", payload: result});
            setLocalStorage("mybets", result)
            setIsLoading(false);
        });

    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const PageTitle = () => {
        return (
            <div className='col-md-12 background-profile p-4 text-center'>
                <h4 className="inline-block text-light">
                    MY BETS
                </h4>
            </div>
        )
    }


    const PageBody = () => {
        const [state, dispatch] = useContext(Context)
        const [canCancel, setCanCancel] = useState(false);
        const [betStatus, setBetStatus] = useState(null);
        const [cancelEndTime, setCancelEndTime] = useState(null);

        useEffect(() => {
            let timer;

            if (canCancel) {
                const cancelEnd = moment().add(10, 'seconds');
                setCancelEndTime(cancelEnd);

                timer = setTimeout(() => {
                    setCanCancel(false);
                    setCancelEndTime(null);
                }, 10000); // Remove countdown after 10 seconds
            }

            return () => clearTimeout(timer);
        }, [canCancel]);

        const cancelBet = (bet_id) => {
            let endpoint = '/bet-cancel';
            let data = {
                bet_id: bet_id,
                cancel_code: 101,
            }
            makeRequest({url: endpoint, method: "POST", data: data, use_jwt: true}).then(([status, result]) => {
                if (status === 201) {
                    setBetStatus('CANCEL RQ');
                    setCanCancel(false);
                    setCancelEndTime(null);
                }
            });
        };

        const CancelBetMarkup = (props) => {
            const {bet_id}=props
            if (canCancel) {
                return (
                    <div className="col">
                        <p>Cancel will end in: {moment(cancelEndTime).fromNow()}</p>
                        <button
                            title="Cancel Bet"
                            className="col btn btn-sm place-bet-btn"
                            onClick={() => cancelBet(bet_id)}
                        >
                            Cancel
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="col">
                        <button
                            title="Cancel Bet"
                            className="col btn btn-sm place-bet-btn"
                            onClick={() => setCanCancel(true)}
                        >
                            Cancel
                        </button>
                    </div>
                );
            }
        };

        const swap = (bet_id) => {
            dispatch({type: "SET", key: "bet_history_details", payload: bet_id});
        }
        const [mybets, setMybets] = useState(state?.filteredHistoryGames || getFromLocalStorage("mybets"))

        useEffect(()=>{

            if(state?.filteredHistoryGames){
                if(!state?.bets_by_date) {
                    setMybets(state?.filteredHistoryGames)
                }else{
                        setMybets(state?.bets_by_date)
            }
            }else{
                if(!state?.bets_by_date) {
                    setMybets(getFromLocalStorage("mybets"))
                }else{
                    setMybets(state?.bets_by_date)
                }
            }

        },[state?.filteredHistoryGames,state?.bets_by_date])



        return (
            <>
                {mybets && mybets.map((bet, index) => (
                    <div className="my-bets-bet-history" key={index} onClick={() => {
                        swap(bet?.bet_id)
                    }}>
                        <div className={"d-flex justify-content-between w-100 px-3"}>
                            <div className={"bet-history-items id"}>
                                #{bet?.bet_id}
                            </div>
                            <div className={"bet-history-items games"}>
                                Games {bet?.total?.games}
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
                            { canCancel !== false?<span
                                className={` badge  ${bet?.status_desc == "LOST" ? "bg-dark text-warning" : bet?.status_desc == "WON" ? "bg-success" : bet?.status_desc == "PENDING" ? "bg-dark " : ""}`}
                                style={{
                                    color: "white",
                                    marginTop: "10px",
                                    borderRadius: "7px",
                                    marginLeft: "1px",
                                    padding: "2.9px 9px "
                                }}>{bet?.status_desc == "LOST" ? "NOT WON" : bet?.status_desc}
                              </span>:<CancelBetMarkup bet_id={bet?.bet_id}/>}
                            </div>

                        </div>
                    </div>
                ))}
            </>

        )
    }

    const navigateBack = () => {
        if (state?.bet_history_details) {
            dispatch({type: "SET", key: "bet_history_details", payload: false});
        } else if (state?.bet_history_details === false || state?.bet_history_details === null || state?.bet_history_details === undefined) {
            window.history.back()
        }

    }

    const label = {
        inputProps: {
            'aria-label': 'hide_all_lost_bets',
            'value': 'hide_all_lost_bets'
        }
    };

    const [hideLost, setHideLost] = useState(false || getFromLocalStorage("remove_lost_bets"))
    const [showGameFilter, setShowGameFilter] = useState(false)

    const onSwitchChange = (e) => {
        setLocalStorage("remove_lost_bets", e?.target?.checked)
        setHideLost(e?.target?.checked)
    }


    const [mybets, setMybets] = useState( getFromLocalStorage("mybets"))
    const isSameDate = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };
    const currentDate = new Date();
    const filterGames = () => {
        if (state?.selected_filter_category) {
            // const filteredBets=state?.filteredHistoryGames?state?.filteredHistoryGames:mybets
            let filteredGames = state?.bet_history_details ? state?.bet_history_details : getFromLocalStorage("mybets");
            const lost_history = getFromLocalStorage("remove_lost_bets") || hideLost;

            if (lost_history) {
                filteredGames = filteredGames?.filter((game) => game?.status_desc !== 'LOST');
                dispatch({ type: "SET", key: "filteredHistoryGames", payload: filteredGames });
            } else {
                dispatch({ type: "SET", key: "filteredHistoryGames", payload: null });
            }

            if (state?.selected_filter_category) {
                const filteredGames = state?.bet_history_details ? state?.bet_history_details : getFromLocalStorage("mybets");
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

                dispatch({ type: "SET", key: "bets_by_date", payload: filteredGamesByDate });

            }
        } else {
            // handleFilterChange
            let filteredGames = state?.bet_history_details ? state?.bet_history_details : getFromLocalStorage("mybets");
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
                    <Header/>
                    <div className={'back-navigation original-button top-spacing'} onClick={() => navigateBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} className={'back-navigation-icon'}/> Back
                    </div>
                    <div className="container-history top-spacing">
                        <div className="iphone background-profile">

                            <div className="d-flex flex-row justify-content-between">

                                <div className="gz home" style={{width: '100%'}}>
                                    {showGameFilter && <GameHistoryList visible={showGameFilter}
                                                                        games={mybets}
                                                                        setShowGameFilter={setShowGameFilter}/>}
                                    <PageTitle/>
                                    {!state?.bet_history_details && <div
                                        className="d-flex w-100 justify-content-between filter-buttons-bethistory px-4">
                                        <div className={"filters button-filter text-capitalize"}
                                             onClick={showGameHistoryList}>
                                            {(state?.selected_filter_category) || "All"}&nbsp;<FontAwesomeIcon
                                            icon={faCaretDown}/>
                                        </div>
                                        <div className={"filters"}>

                                            <div className={"odd-change-position"}>
                                                <Switch id={"hide_all_lost_bets"} {...label} className="slip-change-box"
                                                        name={"hide_all_lost_bets"}
                                                        checked={hideLost || false}
                                                        color="primary" onChange={(e) => onSwitchChange(e)}/> Hide lost
                                                bets

                                            </div>
                                        </div>
                                    </div>}
                                    {state?.bet_history_details ?
                                        <BetDetails bet_id={state?.bet_history_details}/> :
                                        <PageBody/>
                                    }
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