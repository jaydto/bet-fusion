import React, {useContext, useEffect, useState} from "react";
import {BASE_URL} from '../../../utils/fetch-request';
import '../../../../assets/css/accordion.react.css';
import axios from "axios";
import {getFromLocalStorage} from "../../../utils/local-storage";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGamepad,faChevronCircleLeft, faMoneyBillAlt} from "@fortawesome/free-solid-svg-icons";
import './kiron.css';
import { useNavigate } from 'react-router-dom';


const OldBetDetails = (props) => {
	const { betID } = props;
	const [OldBetDetails, setOldBetDetails] = useState([]);
	let user = getFromLocalStorage('user');
	const [isLoading, setIsLoading] = useState(false);
	const [activeTab, setActiveTab] = useState(getFromLocalStorage("tab_history_kiron") || "active");


	const fetchOldBetDetails = async () => {
		if (isLoading) return;
		setIsLoading(true);
		let endpoint = '/v1/nare-league/old-bet-details';
		const API_URL = BASE_URL;
		const token = user?.token;
		const headers = {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			'accept': '*/*'
		};
		const options = {
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		};

		const data = {
			'bet_id': betID
		};

		try {
			const response = await axios.post(`${API_URL}${endpoint}`, data, { headers, ...options });
			if (response.status === 200) {
				setIsLoading(false);
				setOldBetDetails(response?.data);
			} else {
				throw new Error('Request failed');
			}
		} catch (error) {
			console.error(error);
			// Handle error here or set appropriate state indicating error
		}
	};


	useEffect(() => {
		const abort=new AbortController()

		if(activeTab === "older"){
			fetchOldBetDetails();
		}

		return () => {
			abort.abort()
		};

	}, [ betID, user?.token,getFromLocalStorage("tab_kiron_history")]);

	const navigate=useNavigate()
	return (
		<div className="bet_details">
			<div className="top px-2">
				<div onClick={()=>navigate(-1)}>
					<FontAwesomeIcon className="ico" icon={faChevronCircleLeft} /> Back to my bets
				</div>

				{OldBetDetails.map((bet) => (
					<React.Fragment key={bet.bet_date}>

						<div className="bet_item_details">
							<div className="right">
								<p><span className="bold">Bet ID</span> : {betID}</p>
							</div>
							<div className="right">
								<p>
									<FontAwesomeIcon className="icon" icon={faMoneyBillAlt} /><span className="bold"> Bet Amount </span>: KES {bet.bet_amount}</p>
							</div>

							<div className="right">
								<p>
									<FontAwesomeIcon className="icon" icon={faMoneyBillAlt} /> <span className="bold">Total Odds</span> : {bet.total_odds}</p>
							</div>
							<div className="right">
								<p>
									<FontAwesomeIcon className="icon" icon={faGamepad} /> <span className="bold">Possible Win </span>: {bet.possible_win}</p>
							</div>

							<div className="right">
								<p id="status" style={{ backgroundColor: parseInt(bet.bet_status) === 5 ? '#00ff00' : parseInt(bet.bet_status) === 3 ? '#ff9900' : 'inherit',borderRadius: '20px', width: '1.6cm', textAlign: 'center' ,fontSize:'small'}}>
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

						<h3 className="sel">Selections</h3>

						{isLoading ?
							<div className={`text-center mt-2 text-white d-block`}>
								<Spinner animation={'grow'} size={'lg'}/>
							</div>:

							<div className="d-flex w-100 flex-column">
								{bet.betslips.map((betSlip) => (
									<div key={betSlip.id}>
										<div className="bet_slip d-flex justify-content-between row">
											<div className="col-4">
												<p><span className="bold">Home</span>: {betSlip.kiron_home_team}</p>
												<p><span className="bold">Away</span>: {betSlip.kiron_away_team}</p>
											</div>
											<div className="col-4">
												<p><span className="bold">Bet Pick</span>: {betSlip.bet_pick}</p>
												<p><span className="bold">Out Come</span>: {betSlip.winning_outcome}</p>
											</div>
											<div className="col-4">
												<p><span className="bold">Odd Value</span>: {betSlip.odd_value}</p>
												<p
													className="ban mt-1 ban-value-data"
													style={{
														backgroundColor:
															parseInt(betSlip.status) === 5
																? 'hsl(120, 70%, 50%)'
																: parseInt(betSlip.status) === 3
																	? '#ff9900'
																	: 'inherit',
														borderRadius: '20px',
														height: '1.8em',
														marginTop: '-10px',
														width: '1.6cm',
														textAlign: 'center',
														fontSize: 'smaller',
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
};

export default OldBetDetails

