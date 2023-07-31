import React from "react";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft, faGamepad, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import './kiron.css';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux'; // Import useDispatch hook


const OldBetDetails = React.memo(
    (props) => {
        const {betID} = useParams()
        const loading = useSelector((state) => state.nareLeague.loading)

        const OldBetDetails = useSelector((state) => state.nareLeague.old_bet_details)

        // Empty dependency array to run the effect only once when the component mounts

        const navigate = useNavigate()
        return (
            <div className="bet_details">
                <div className="top px-2">
                    <div onClick={() => navigate(-1)}>
                        <FontAwesomeIcon className="ico" icon={faChevronCircleLeft}/> Back to my bets
                    </div>

                    {OldBetDetails?.map((bet, index) => (
                        <React.Fragment key={index}>

                            <div className="bet_item_details col-12 flex-column">
                                <div className="col-6 flex-column">
                                    <div className="right col">
                                        <p><span className="bold">Bet ID</span> : {betID}</p>
                                    </div>
                                    <div className="right col">
                                        <p>
                                            <FontAwesomeIcon className="icon" icon={faMoneyBillAlt}/><span
                                            className="bold"> Bet Amount </span>:
                                            KES {bet.bet_amount}</p>
                                    </div>
                                </div>

                                <div className="col-6 flex-column">
                                    <div className="right col">
                                        <p>
                                            <FontAwesomeIcon className="icon" icon={faMoneyBillAlt}/> <span
                                            className="bold">Total Odds</span> : {bet.total_odds}</p>
                                    </div>
                                    <div className="right col">
                                        <p>
                                            <FontAwesomeIcon className="icon" icon={faGamepad}/> <span className="bold">Possible Win </span>: {bet.possible_win}
                                        </p>
                                    </div>
                                </div>


                            </div>
                            <div className={'d-flex justify-content-between px-3 align-items-center'}>
                                <h3 className="sel">Selections</h3>
                                <div className="">
                                    <p id="status" className={'kiron-bet-history-badge'} style={{
                                        backgroundColor: parseInt(bet.bet_status) === 5 ? '#00ff00' : parseInt(bet.bet_status) === 3 ? '#ff9900' : 'inherit',
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


                            {loading ?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <Spinner animation={'grow'} size={'lg'}/>
                                </div> :

                                <div className="d-flex w-100 flex-column">
                                    {bet.betslips.map((betSlip) => (
                                        <div key={betSlip.id}>
                                            <div className="bet_slip d-flex justify-content-between row">
                                                <div className="col-4">
                                                    <p><span className="bold">Home : {betSlip.kiron_home_team}</span></p>
                                                    <p><span className="bold">Away : {betSlip.kiron_away_team}</span></p>
                                                </div>
                                                <div className="col-4">
                                                    <p><span className="bold">Bet Pick</span>: {betSlip.bet_pick}</p>
                                                    <p><span className="bold">OutCome</span>: {betSlip.winning_outcome}
                                                    </p>
                                                </div>
                                                <div className="col-4">
                                                    <p><span className="bold">Odd Value</span>: {betSlip.odd_value}</p>
                                                    <p
                                                        id={'status'}
                                                        className="kiron-bet-history-badge"
                                                        style={{
                                                            backgroundColor:
                                                                parseInt(betSlip.status) === 5
                                                                    ? 'hsl(120, 70%, 50%)'
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
                                    ))}
                                </div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    });

export default React.memo(OldBetDetails)

