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
import './kiron.css';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import SkeletonLoaderMore from "../../skeletonLoadersWeb/SkeletonLoaderMore";
import {FormatDate} from "./KironBetHistory"; // Import useDispatch hook


const OldBetDetails = React.memo(
    (props) => {
        const {betID} = useParams()
        const loading = useSelector((state) => state.nareLeague.loading)

        const OldBetDetails = useSelector((state) => state.nareLeague.old_bet_details)
        const [collapsed, setCollapsed] = useState([]);
        const [collapsedAll, setCollapsedAll] = useState(false);
        // Empty dependency array to run the effect only once when the component mounts
        const WinLostTotal = () => {
            const data = OldBetDetails
            const won = data[0]?.betslips?.filter(bet => bet.win === '1')?.length;
            const lost = data[0]?.betslips?.filter(bet =>
                bet.win === '0'
            )?.length;


            const total = data[0].betslips?.length;

            return `${won}/${lost}/${total}`
        }
        const navigate = useNavigate()
        const toggleCollapse = (index, parent_match_id) => {
            const updatedCollapsed = [...collapsed];
            if (updatedCollapsed.includes(index)) {
                updatedCollapsed?.splice(updatedCollapsed.indexOf(index), 1);
            } else {
                updatedCollapsed.push(index);
            }
            setCollapsed(updatedCollapsed);
        };

        function toggleCollapseAll(items) {
            if (!collapsedAll) {
                setCollapsed(Array.from({length: items[0].betslips?.length}, (_, index) => index));
            } else {
                setCollapsed([]);
            }
            setCollapsedAll(!collapsedAll);
        }
        useEffect(() => {
            setCollapsed(Array.from({length: OldBetDetails?.[0]?.betslips?.length}, (_, index) => index));
        }, [betID])
        return (
            <div className="d-flex details flex-column bet-details  ">
                <div className="top px-2">
                    <div onClick={() => navigate(-1)}>
                        <FontAwesomeIcon className="ico" icon={faChevronCircleLeft}/> Back to my bets
                    </div>

                    {OldBetDetails?.map((bet, index) => (
                        <React.Fragment key={index}>
                            {index === 0 && <div className="d-flex history-details flex-column bet-summary-info">
                                <div className="id">
                                    #{betID}
                                </div>
                                <div className="date">
                                    <FormatDate date={bet?.bet_date}/>
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
                                            <div className="amount-value">{parseFloat(bet.possible_win).toLocaleString()}</div>
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
                                            backgroundColor: parseInt(bet.bet_status) === 5 ? 'rgb(40 132 40)' : parseInt(bet.bet_status) === 3 ? '#ff9900' : 'inherit',
                                        }}>
                                            {parseInt(bet.bet_status) === 1
                                                ? 'placed'
                                                : parseInt(bet.bet_status) === 3
                                                    ? 'Not won'
                                                    : parseInt(bet.bet_status) === 24
                                                        ? 'Cancelled'
                                                        : parseInt(bet.bet_status) === 9
                                                            ? 'Jackpot'
                                                            : parseInt(bet.bet_status) === 25
                                                                ? 'Voided'
                                                                : parseInt(bet.bet_status) === 5
                                                                    ? 'Won'
                                                                    : 'Unknown Status'}
                                        </p>
                                    </div>
                                </div>
                            </div>}

                            <div className="d-flex options-details-history w-100 justify-content-between">
                                <div className="d-flex">
                                    Events (Odds {bet.total_odds})
                                </div>
                                {index === 0 && (
                                    <div className="d-flex text-warning bold d-flex gap-2 align-items-center"
                                         onClick={() => toggleCollapseAll(OldBetDetails)}>
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
                                    {bet.betslips.map((betSlip, index1) => (
                                        <div key={index1} className="d-flex details-history flex-column w-100 mt-3" >
                                            <div className="d-flex w-100 justify-content-between px-2 details-items">
                                                <div className="team">
                                                    {parseInt(betSlip?.status) === 5 ?
                                                        <FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/> :
                                                        parseInt(betSlip?.status) === 1 ?
                                                            <FontAwesomeIcon icon={faQuestionCircle} className={"text-warning"}/> :
                                                            <FontAwesomeIcon icon={faXmarkCircle} className={"text-danger"}/>}
                                                    &nbsp;<span
                                                    className={"team-info"}>{betSlip.kiron_home_team}</span></div>
                                                <div className="outcome">vs</div>
                                                <div className="team" onClick={() =>
                                                    toggleCollapse(index1, betSlip?.kiron_bet_id)}>
                                        <span
                                            className={"team-info text-end"}>{betSlip.kiron_away_team}</span>&nbsp;{collapsed.includes(index) ?
                                                    <FontAwesomeIcon icon={faCaretRight}/> :
                                                    <FontAwesomeIcon icon={faCaretDown}/>}
                                                </div>
                                            </div>
                                                <div
                                                    className={`${!collapsed.includes(index1) ? "d-none " : "d-flex justify-content-between gap-4 "} w-100 px-3 bethistory-items flex-column`}>
                                                    <div className="d-flex">
                                                        <div className="d-flex  flex-column col">
                                                            <div className="d-flex justify-content-between px-2 details-info">
                                                                <div className="type">
                                                                    Odd Value
                                                                </div>
                                                                <div className="market-h">
                                                                    {betSlip.odd_value}
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between px-2">
                                                                <div className="pick-ft">
                                                                    Pick
                                                                </div>
                                                                <div className="pick-h">
                                                                    {betSlip.bet_pick==='X'?'Draw':betSlip.bet_pick}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column col">
                                                            <div className="d-flex justify-content-between px-2">
                                                                <div className="result-ft">
                                                                    Outcome
                                                                </div>
                                                                <div className="result-h">
                                                                    {betSlip.winning_outcome==='X'?'Draw':betSlip.winning_outcome}
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
                                                                                parseInt(betSlip.status) === 5
                                                                                    ? 'rgb(40 132 40)'
                                                                                    : parseInt(betSlip.status) === 3
                                                                                        ? '#ff9900'
                                                                                        : 'inherit'
                                                                        }}
                                                                    >
                                                                        {parseInt(betSlip.status) === 1
                                                                            ? 'placed'
                                                                            : parseInt(betSlip.status) === 3
                                                                                ? 'Not won'
                                                                                : parseInt(betSlip.status) === 24
                                                                                    ? 'Cancelled'
                                                                                    : parseInt(betSlip.status) === 9
                                                                                        ? 'Jackpot'
                                                                                        : parseInt(betSlip.status) === 25
                                                                                            ? 'Voided'
                                                                                            : parseInt(betSlip.status) === 5
                                                                                                ? 'Won'
                                                                                                : 'Unknown Status'}

                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                        </div>
                                    ))}
                                </div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    });

export default React.memo(OldBetDetails)

