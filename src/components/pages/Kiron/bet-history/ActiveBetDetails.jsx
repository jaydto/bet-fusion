import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faCaretRight,
    faCheckCircle,
    faChevronCircleLeft,
    faQuestionCircle,
    faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import "./kiron.css";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import SkeletonLoaderMore from "../../skeletonLoadersWeb/SkeletonLoaderMore";
import {FormatDate} from "./KironBetHistory"; // Import useDispatch hook

const BetDetails = React.memo(
    (props) => {
        const {betID} = useParams()
        const loading = useSelector((state) => state.nareLeague.loading)
        const [collapsed, setCollapsed] = useState([]);
        const [collapsedAll, setCollapsedAll] = useState(false);
        const betDetails = useSelector((state) => state.nareLeague.bet_details_data)
        const activeBetHistory = useSelector((state) => state.nareLeague.bet_history_data)


        // Empty dependency array to run the effect only once when the component mounts
        const toggleCollapse = (index, parent_match_id) => {
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
        const WinLostTotal = () => {
            const data = betDetails
            const filteredData = data?.filter(bet =>  bet);
            const won = filteredData?.filter(bet => bet.status=== 5)?.length;
            const lost = filteredData?.filter(bet =>
                bet.status === 3
            )?.length;
            const total = filteredData?.length;

            return `${won}/${lost}/${total}`
        }
        const totalOdds=()=>{
            let total_odds=0;
            betDetails?.map((bet) => (
               total_odds+= parseFloat(bet.odd_value)
            ))
            // Round the total odds to two decimal places
            return total_odds.toFixed(2)
        }
        const finalOutCome=()=>{
            const data = betDetails
            const filteredData = data?.filter(bet =>  bet);
            const won = filteredData?.filter(bet => bet.status=== 5)?.length;
            const lost = filteredData?.filter(bet =>
                bet.status === 3
            )?.length;
            const total = filteredData?.length;
            return lost === 0 && won === total ? 'Won' : lost === 0 && won !== total ? 'Placed' : 'Not Won'
        }

        useEffect(() => {
            setCollapsed(Array.from({length: betDetails?.length}, (_, index) => index));
        }, [])

        const navigate = useNavigate()

        function getActivePossibleWin() {
            const possible_win=activeBetHistory?.filter((bet)=>Number(bet?.bet_id)===Number(betID))
            return isNaN(parseFloat(possible_win?.[0]?.possible_win)?.toLocaleString())?'':possible_win?.[0]?.possible_win?.toLocaleString()
        }

        return (
            <div className="d-flex details flex-column bet-details">
                <div className="top px-2">
                    <div onClick={() => navigate(-1)}>
                        <FontAwesomeIcon className="ico" icon={faChevronCircleLeft}/> Back to my bets
                    </div>

                    {betDetails?.map((bet, index) => (
                        <React.Fragment key={index}>
                            {index === 0 &&
                                <div className="d-flex history-details flex-column bet-summary-info">
                                <div className="id">
                                    #{betID}
                                </div>
                                <div className="date">
                                    <FormatDate date={bet?.start_time}/>
                                </div>
                                <div className="d-flex history-details-padding gap-3 mb-3">
                                    <div className="col-8 d-flex details-history-main-container">
                                        <div className="d-flex col-4 flex-column details-history-main">
                                            <div className={"main-details-info-title"}>
                                                Amount
                                            </div>
                                            <div className="amount-value">{bet.bet_amount}</div>
                                        </div>
                                        <div className="d-flex col-8 flex-column details-history-main">
                                            <div className={"main-details-info-title"}>
                                                Possible Win
                                            </div>
                                            <div className="amount-value">{getActivePossibleWin()}</div>
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
                                </div>
                                <div className="status d-flex justify-content-between px-2 mb-3">
                                    <div className="">
                                        <p id="status" className={'kiron-bet-history-badge'} style={{
                                            backgroundColor: finalOutCome()==='Won' ? '#00ff00' : finalOutCome()==='Not Won' ? '#ff9900' : 'var(--alert-slip-color)',
                                        }}
                                        >
                                            {finalOutCome()}
                                        </p>
                                    </div>
                                </div>
                            </div>}
                            <div className="d-flex options-details-history w-100 justify-content-between">
                                <div className="d-flex">
                                    Events (Odds {totalOdds()})
                                </div>
                                {index === 0 && (
                                    <div className="d-flex text-warning bold d-flex gap-2 align-items-center"
                                         onClick={() => toggleCollapseAll(betDetails)}>
                                        Toggle collapse all {!collapsedAll ?
                                        <FontAwesomeIcon icon={faCaretRight}/> :
                                        <FontAwesomeIcon icon={faCaretDown}/>}
                                    </div>
                                )}

                            </div>
                            {loading ?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <SkeletonLoaderMore/>
                                </div> :
                                <div className="d-flex w-100 flex-column">
                                    <div key={index} className="d-flex details-history flex-column w-100 mt-3" >
                                        <div className="d-flex w-100 justify-content-between px-2 details-items">
                                            <div className="team">
                                                {parseInt(bet?.status) === 5 ?
                                                    <FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/> :
                                                    parseInt(bet?.status) === 1 ?
                                                        <FontAwesomeIcon icon={faQuestionCircle} className={"text-warning"}/> :
                                                        <FontAwesomeIcon icon={faXmarkCircle} className={"text-danger"}/>}
                                                &nbsp;<span
                                                className={"team-info"}>{bet?.home_team}</span></div>
                                            <div className="outcome">vs</div>
                                            <div className="team" onClick={() =>
                                                toggleCollapse(index, bet?.kiron_bet_id)}>
                                        <span
                                            className={"team-info text-end"}>{bet?.away_team}</span>&nbsp;{collapsed.includes(index) ?
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
                                                            Odd Value
                                                        </div>
                                                        <div className="market-h">
                                                            {bet?.odd_value}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between px-2">
                                                        <div className="pick-ft">
                                                            Pick
                                                        </div>
                                                        <div className="pick-h">
                                                            {bet.bet_pick==='X'?'Draw':bet.bet_pick}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column col">
                                                    <div className="d-flex justify-content-between px-2">
                                                        <div className="result-ft">
                                                            Outcome
                                                        </div>
                                                        <div className="result-h">
                                                            {bet?.outcome==='X'?'Draw':bet?.outcome}
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between px-2">
                                                        <div className="outcome-t">
                                                            status
                                                        </div>
                                                        <div className="bet-details-data">
                                                            <p
                                                                id={'status'}
                                                                className="kiron-bet-history-badge"
                                                                style={{
                                                                    backgroundColor:
                                                                        parseInt(bet.status) === 5
                                                                            ? 'hsl(120, 70%, 50%)'
                                                                            : parseInt(bet.status) === 3
                                                                                ? '#ff9900'
                                                                                : 'var(--alert-slip-color)'
                                                                }}
                                                            >
                                                                {parseInt(bet.status) === 1
                                                                    ? 'placed'
                                                                    : parseInt(bet.status) === 3
                                                                        ? 'Not won'
                                                                        : parseInt(bet.status) === 24
                                                                            ? 'Cancelled'
                                                                            : parseInt(bet.status) === 9
                                                                                ? 'Jackpot'
                                                                                : parseInt(bet.status) === 25
                                                                                    ? 'Voided'
                                                                                    : parseInt(bet.status) === 5
                                                                                        ? 'Won'
                                                                                        : 'Unknown Status'}

                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    });

export default React.memo(BetDetails);
