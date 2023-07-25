import React, {useCallback, useContext, useEffect, useState} from "react";
import {StoreContext} from '../../../../context/store';
import {BASE_URL} from '../../../utils/fetch-request';
import '../../../../assets/css/accordion.react.css';
import axios from "axios";
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleDown} from "@fortawesome/free-solid-svg-icons";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import './kiron.css';
import { Link, useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";
import BetDetails from "./OldBetDetails";
import ActiveBetDetails from "./ArchiveBetDetails";

const Styles = {
	contain: {
		background: '#22323e !important',
	},
	headers: {
		// background:'#18242f',
		color: 'var(--light)',
		padding: '10px 40px 10px',
	},
	bet: {
		// background:'#1e2d3b',
		padding: '10px',
		color: 'var(--light)',
		opacity: 0.8,
		marginBottom: '1px'
	}
};

const KironBetHistory = React.memo(
	(props) => {
		const {state, dispatch} = useContext(StoreContext);
		const [isLoading, setIsLoading] = useState(false);
		const [betLoading, setBetLoading] = useState(false)
		const [activeIndex, setActiveIndex] = useState(null);
		const [isOpen, setIsOpen] = useState(false);
		const navigate = useNavigate();
		const {betID}=useParams()
		let user = getFromLocalStorage('user');
		const [activeTab, setActiveTab] = useState(getFromLocalStorage("tab_history_kiron") || "active");
		const [hist,setHist] = useState([]);
		var dat = [];

		//functions to fetch active and old bets from the API
		const fetchData = useCallback(async () => {
			if (isLoading) return;
			setIsLoading(true);
			let endpoint = "/v1/nare-league/bet-history";
			const API_URL = BASE_URL
			const token = user?.token

        const headers = {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			"accept": "*/*"
		};
			const options = {
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
			}

        axios.post(`${API_URL}${endpoint}`, null, {
			headers: headers,
			...options
		})
			.then(response => {
				if (response.status === 200) {
					dispatch({type: "SET", key: "kironbethistory", payload: response.data});
					dat = response?.data;
					setHist(dat);
					setLocalStorage("hist",dat)

                    setIsLoading(false);
				} else {
					// console.log('Request failed:', response.status);
					// handle the error condition
				}
			})
			.catch(error => {
				console.error(error);
			});

		}, []);

    const fetchOldBets = useCallback(async () => {
		let endpoint = "/v1/nare-league/old-bets";
		setIsLoading(true)
		const API_URL = BASE_URL
		const token = user?.token
		const headers = {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			"accept": "*/*"
		};
		const options = {
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		}

        axios.post(`${API_URL}${endpoint}`, null, {
			headers: headers,
			...options
		})
			.then(response => {
				if (response.status === 200) {
					setIsLoading(false)
					dispatch({type: "SET", key: "oldbets", payload: response.data});

				} else {
					// console.log('Request failed:', response.status);
					// handle the error condition
				}
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

		//funtion to fetch active bet details
		const fetchDataDetails = useCallback(async (id) => {
			let endpoint = "/v1/nare-league/bet-details";
			const data = {
				'bet_id': id
			}
			setBetLoading(true)
			const API_URL = BASE_URL

        const token = user?.token

        const headers = {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
			"accept": "*/*"
		};
			const options = {
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
			}

        axios.post(`${API_URL}${endpoint}`, data, {
			headers: headers,
			...options
		})
			.then(response => {
				if (response.status === 200) {
					dispatch({type: "SET", key: "kironbetdetails", payload: response.data});
					setIsLoading(false);
					setBetLoading(false)

				} else {
					// console.log('Request failed:', response.status);
					// handle the error condition
				}
			})
			.catch(error => {
				console.error(error);
			});
		}, []);

		//function to fetch old bet details
		useEffect(() => {
			if(betID){
				return
			}else{
				if(activeTab=="active"){
					fetchData();
					const payload = {
						start: '', round: '', end: ''
					}
					dispatch({type: "SET", key: 'current_selection_period', payload: payload})
				}else{
					fetchOldBets();
					const payload = {
						start: '', round: '', end: ''
					}
					dispatch({type: "SET", key: 'current_selection_period', payload: payload})
				}
			}


		}, [activeTab,betID]);

    const TabbedDetails = () => {

		const handleTabSelect = (eventKey) => {
			setActiveTab(eventKey); // Update activeTab state when a tab is selected
			setLocalStorage("tab_history_kiron",eventKey)
			navigate('/bet-history/')

		};

        const BetArchive = () => {
			const [showDetails, setShowDetails] = useState(false);
			const {state,dispatch}=useContext(StoreContext)

			const {betID} = useParams()

			let user = getFromLocalStorage('user');
			const currentPathname = window.location.pathname;
			const swap =()=>{
				setActiveTab('older')
				setLocalStorage("tab_history_kiron",'older')

			}

			const Bet = () => {
				return (
					<>  {
						state?.oldbets?.map((bets) => (
							<Link to={`/bet-history/${bets?.bet_id}`} onClick={swap}>
								<div key={bets?.bet_id} className="bet_item">
									<>
										<div className="left mt-0">
											<p><span className="bold">Bet Id</span> : {bets?.bet_id}</p>
											<p><span className="bold">Date</span> : {bets?.created}</p>
										</div>
										<div className=" mt-0 kiron-right">
											<p><span className="bold">Bet Amount</span> : {bets?.bet_amount}
												<span style={{ position: "relative" }}>

                                                    </span>
											</p>
											<p className="ban  ban-value-data mt-1"


											   style={{
												   backgroundColor: parseInt(bets?.status) === 5 ? 'hsl(120, 70%, 50%)' : parseInt(bets?.status) === 3 ? '#ff9900' : 'inherit',
												   borderRadius: '20px',
												   height: "1.8em",
												   marginTop: "-10px",
												   width: '1.6cm',
												   textAlign: 'center',
												   fontSize: "small",

											   }}

											>
												{parseInt(bets?.status) === 1
													? 'placed'
													: parseInt(bets?.status) === 3
														? 'Not won'
														: parseInt(bets?.status) === 24
															? 'Cancelled'
															: parseInt(bets?.status) === 9
																? 'Jackpot'
																: parseInt(bets?.status) === 25
																	? 'Voided'
																	: parseInt(bets?.status) === 5
																		? 'Won'
																		: 'Unknown Status'}
											</p>
										</div>
									</>
								</div>

							</Link>

						))
					}
					</>
				)
			}

			return (
				<div className="contain">
					{betID?(
						<BetDetails betID={betID}></BetDetails>
					):(
						<Bet/>
					)}
				</div>
			);
		};



		const ActiveBets = () => {
			const {state,dispatch}=useContext(StoreContext)

			const {betID} = useParams()

			const currentPathname = window.location.pathname;
			let user = getFromLocalStorage('user');
			const swap =()=>{
				setActiveTab('active')
				setLocalStorage("tab_history_kiron","active")
			}
			const ActiveBet = () => {
				return (
					<>  {
						state?.kironbethistory?.map((bets) => (
							<Link to={`/bet-history/${bets?.bet_id}`} onClick={swap}>
								<div key={bets?.bet_id} className="bet_item">
									<>
										<div className="left mt-0">
											<p><span className="bold">Bet Id</span> : {bets?.bet_id}</p>
											<p><span className="bold">Date</span> : {bets?.bet_date}</p>
										</div>
										<div className=" kiron-right mt-0">
											<p><span className="bold">Bet Amount </span>: {bets?.bet_amount} <span style={{ position: "relative" }}>
                                                    </span></p>
											<p className="ban ban-value-data mt-1"

											   style={{
												   backgroundColor: parseInt(bets?.bet_status) === 5 ? 'hsl(120, 70%, 50%)' : parseInt(bets?.bet_status) === 3 ? '#ff9900' : 'inherit',
												   borderRadius: '20px',
												   height: "1.8em",
												   marginTop: "-10px",
												   width: '1.6cm',
												   textAlign: 'center',
												   fontSize: "small",
											   }}>
												{parseInt(bets?.bet_status) === 1
													? 'placed'
													: parseInt(bets?.bet_status) === 3
														? 'Not won'
														: parseInt(bets?.bet_status) === 24
															? 'Cancelled'
															: parseInt(bets?.bet_status) === 9
																? 'Jackpot'
																: parseInt(bets?.bet_status) === 25
																	? 'Voided'
																	: parseInt(bets?.bet_status) === 5
																		? 'Won'
																		: 'Unknown Status'}
											</p>
										</div>
									</>
								</div>
							</Link>
						))
					}
					</>
				)
			}

			return (
				<div className="contain">
					{betID?(
						<ActiveBetDetails betID={betID}  data={hist}></ActiveBetDetails>
					):(
						<ActiveBet/>
					)}
				</div>
			);
		};

        return (
			<Tabs
				variant={'tabs'}
				defaultActiveKey={activeTab || getFromLocalStorage("tab_history_kiron")}
				id=""
				className="background-primary kiron-bet-history-tabs"
				justify
				onSelect={handleTabSelect}>
				<Tab eventKey="active" title="ACTIVE BETS" className={'background-primary'}>
					{isLoading ?
						<div className={`text-center mt-2 text-white d-block`}>
							<Spinner animation={'grow'} size={'lg'}/>
						</div> :
						<ActiveBets/>}
				</Tab>
				<Tab eventKey="older" title="OLDER BETS" className={'background-primary'} >
					{isLoading ?
						<div className={`text-center mt-2 text-white d-block`}>
							<Spinner animation={'grow'} size={'lg'}/>
						</div>
						: <BetArchive/>
					}
				</Tab>
			</Tabs>
		)
	}

    return (
		<div className="d-flex flex-row justify-content-between">
			<div className="w-100">
				<TabbedDetails/>
			</div>
		</div>
	)
	})

export default KironBetHistory