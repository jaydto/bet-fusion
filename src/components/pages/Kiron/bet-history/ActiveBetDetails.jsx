import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faChevronCircleLeft, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import "./kiron.css";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'; // Import useDispatch hook
import {nareLeagueBetDetails} from '../../../../redux/nareLeague';

const BetDetails = React.memo(
	(props) => {
	const betID = props.betID;
	const dispatchRedux=useDispatch()
	const [datum, ] = useState(getFromLocalStorage('hist'))
	let user = getFromLocalStorage("user");
	const [activeTab,setActiveTab ] = useState(
		getFromLocalStorage("tab_history_kiron") || "active"
	);

	const specificBetId = String(parseInt(betID));

	const loading=useSelector((state)=>state.nareLeague.loading)
	const fetchActiveBetDetails = async () => {
		// if (isLoading) return;

		const betIdData = {
			bet_id: betID,
		};
		dispatchRedux(nareLeagueBetDetails(betIdData))

	};

	useEffect(() => {
		const abort = new AbortController();

		if (activeTab === "active") {
			fetchActiveBetDetails();
		}

		return () => {
			abort.abort()
		};
	}, [betID, user?.token, getFromLocalStorage("tab_kiron_history")]);

	const betDetails=useSelector((state)=>state.nareLeague.bet_details_data)
	const foundBet = datum?.find((bet) => bet.bet_id === specificBetId);

	return (
		<div className="bet_details">
			<div className="top">
				<Link to="/bet-history">
					<FontAwesomeIcon className="ico" icon={faChevronCircleLeft} /> Back to
					my active bets
				</Link>

				<div className="bet_item_details">
					<div className="right">
						<p>
							<span className="bold">Bet id</span> : {betID}
						</p>
					</div>
					<div className="right">
						<p>
							<FontAwesomeIcon className="icon" icon={faMoneyBillAlt} />{" "}
							<span className="bold">Bet Amount KES </span> :{" "}
							{foundBet && foundBet?.bet_amount}
						</p>
					</div>

					<div className="right">
						<p>
							<FontAwesomeIcon className="icon" icon={faMoneyBillAlt} />{" "}
							<span className="bold">Total Odds </span>:{" "}
							{foundBet && foundBet?.total_odds}
						</p>
					</div>
					<div className="right">
						<p>
							<FontAwesomeIcon className="icon" icon={faGamepad} />{" "}
							<span className="bold">Possible win </span>:{" "}
							{foundBet && foundBet?.possible_win}
						</p>
					</div>

					<div className="right">
						<p
							id="status"
							style={{
								backgroundColor:
									parseInt(foundBet?.bet_status) === 5
										? "#00ff00"
										: parseInt(foundBet?.bet_status) === 3
											? "#ff9900"
											: "inherit",
								borderRadius: "20px",
								width: "1.6cm",
								textAlign: "center",
								fontSize: "small",
							}}
						>
							{parseInt(foundBet?.bet_status) === 1
								? "placed"
								: parseInt(foundBet?.bet_status) === 3
									? "Not won"
									: parseInt(foundBet?.bet_status) === 24
										? "Cancelled"
										: parseInt(foundBet?.bet_status) === 9
											? "Jackpot"
											: parseInt(foundBet?.bet_status) === 25
												? "Voided"
												: parseInt(foundBet?.bet_status) === 5
													? "Won"
													: "Unknown Status"}
						</p>
					</div>
				</div>

				<h3 className="sel">Selections</h3>
				{loading ? (
					<div className={`text-center mt-2 text-white d-block`}>
						<Spinner animation={"grow"} size={"lg"} />
					</div>
				) : (
					<div className="container-fluid ">
						{betDetails?.map((item, index) => (
							<div key={index}>
								<div className="bet_slip d-flex justify-content-between row">
									<div className="col-3">
										<p>
											<span className="bold">Home</span>: {item.home_team}
										</p>
										<p>
											<span className="bold">Away</span>: {item.away_team}
										</p>
									</div>
									<div className="col-3">
										<p>
											<span className="bold">Bet Pick</span>: {item.bet_pick}
										</p>
										<p>
											<span className="bold">Out Come</span>:{" "}
											{item.outcome === null ? "pending" : item.outcome}
										</p>
									</div>
									<div className="col-3">
										<p>
											<span className="bold">Odd Value</span>: {item.odd_value}
										</p>
										<p
											className="ban mt-1"
											style={{
												backgroundColor:
													parseInt(item.status) === 5
														? "hsl(120, 70%, 50%)"
														: parseInt(item.status) === 3
															? "#ff9900"
															: "inherit",
												borderRadius: "20px",
												height: "1.8em",
												marginTop: "-10px",
												width: "1.6cm",
												textAlign: "center",
												fontSize: "smaller",
											}}
										>
											{parseInt(item.status) === 1
												? "placed"
												: parseInt(item.status) === 3
													? "Not won"
													: parseInt(item.status) === 24
														? "Cancelled"
														: parseInt(item.status) === 9
															? "Jackpot"
															: parseInt(item.status) === 25
																? "Voided"
																: parseInt(item.status) === 5
																	? "Won"
																	: "Unknown Status"}
										</p>
									</div>
									<div className="col-3">
										<p>
											<span className="bold">Start Time</span>:{" "}
											{item.start_time}
										</p>
										<p>
											<span className="bold">Market</span>: {item.market}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
});

export default React.memo(BetDetails);