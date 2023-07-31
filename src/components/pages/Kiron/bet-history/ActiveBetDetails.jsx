import React from "react";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import "./kiron.css";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from 'react-redux'; // Import useDispatch hook

const BetDetails = React.memo(
    (props) => {
        const {betID} = useParams()
        const loading = useSelector((state) => state.nareLeague.loading)

        const betDetails = useSelector((state) => state.nareLeague.bet_details_data)

        // Empty dependency array to run the effect only once when the component mounts

        const navigate = useNavigate()
        return (
            <div className="bet_details">
                <div className="top px-2">
                    <div onClick={() => navigate(-1)}>
                        <FontAwesomeIcon className="ico" icon={faChevronCircleLeft}/> Back to my bets
                    </div>

                    {betDetails?.map((bet, index) => (
                        <React.Fragment key={index}>
                            <div>
                                <div className="bet_item_details col-12 flex-column active_bet_detials">
                                    <div className="col-6 flex-column">
                                        <div className="right col">
                                            <p><span className="bold">Bet ID</span> : {betID}</p>
                                        </div>
                                    </div>

                                    <div className="col-6 flex-column">
                                        <div className="right col">
                                            <p>
                                                <FontAwesomeIcon className="icon" icon={faMoneyBillAlt}/> <span
                                                className="bold">Total Odds</span> : {bet.odd_value}</p>
                                        </div>
                                    </div>


                                </div>

                                <div className={'d-flex justify-content-between px-3 align-items-center'}>
                                    <h3 className="sel">Selections</h3>
                                    <div className="">
                                        <p id="status" className={'kiron-bet-history-badge'} style={{
                                            backgroundColor: parseInt(bet.status) === 5 ? '#00ff00' : parseInt(bet.status) === 3 ? '#ff9900' : 'inherit',
                                        }}>
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


                            {loading ?
                                <div className={`text-center mt-2 text-white d-block`}>
                                    <Spinner animation={'grow'} size={'lg'}/>
                                </div> :

                                <div className="d-flex w-100 flex-column">
                                        <div>
                                            <div className="bet_slip d-flex justify-content-between row">
                                                <div className="col-4 d-flex justify-content-center align-items-start gap-4">
                                                    <p><span className="bold">Home : {bet.home_team}</span></p>
                                                    <p><span className="bold">Away : {bet.away_team}</span>
                                                    </p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-start gap-4">
                                                    <p><span className="bold">Bet Pick</span>: {bet.bet_pick}</p>
                                                    <p><span className="bold">OutCome</span>: {bet.outcome}
                                                    </p>
                                                </div>
                                                <div className="col-4 d-flex justify-content-center align-items-start gap-4">
                                                    <p><span className="bold">Odd Value</span>: {bet.odd_value}</p>
                                                    <p
                                                        id={'status'}
                                                        className="kiron-bet-history-badge"
                                                        style={{
                                                            backgroundColor:
                                                                parseInt(bet.status) === 5
                                                                    ? 'hsl(120, 70%, 50%)'
                                                                    : parseInt(bet.status) === 3
                                                                        ? '#ff9900'
                                                                        : 'inherit'
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
                                </div>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    });

export default React.memo(BetDetails);