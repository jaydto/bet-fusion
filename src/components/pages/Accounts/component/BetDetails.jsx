import React, {useCallback, useContext, useEffect, useState} from "react"
import makeRequest from "../../../utils/fetch-request";
import {Context} from "../../../../context/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight,  faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Skeleton1 from "../../../skeleton/skeleton";
import moment from "moment/moment";
const BetDetails = (props) => {
	const {bet_id}=props
	const payload={
		"bet_id":bet_id
	}
	const [state, dispatch] = useContext(Context);
	const [isLoading, setIsLoading] = useState(false);

	const fetchBetDetails = useCallback(async() => {
		if(isLoading) return;
		setIsLoading(true);
		let endpoint = "/v1/betdetails";
		makeRequest({url: endpoint, method: "POST", data: payload}).then(([status, result]) => {
			dispatch({type: "SET", key: "mybets", payload: result});
			setIsLoading(false);
		});

	}, []);

	useEffect(() => {
		const abort =new AbortController()
			fetchBetDetails();
		return abort.abort()
	}, []);


	state?.mybets?.data?.map(item => {
		console.log("Created:", item.created);
		console.log("Bet ID:", item.bet_id);
		console.log("Sub Type ID:", item.sub_type_id);
		console.log("Odd Value:", item.odd_value);
		console.log("Bet Amount:", item.bet_amount);
		console.log("Possible Win:", item.possible_win);
		console.log("Status:", item.status);
		console.log("Win:", item.win);
		console.log("Game ID:", item.game_id);
		console.log("Start Time:", item.start_time);
		console.log("Away Team:", item.away_team);
		console.log("Home Team:", item.home_team);
		console.log("Bet Type:", item.bet_type);
		console.log("Bet Pick:", item.bet_pick);
		console.log("Winning Outcome:", item.winning_outcome);
		console.log("Results:", item.results);
	});

	// console.log("Bet Info - Created:", state?.mybets?.meta.bet_info.created);
	// console.log("Bet Info - Bet ID:", state?.mybets?.meta.bet_info.bet_id);
	// console.log("Bet Info - Total Matches:", state?.mybets?.meta.bet_info.total_matches);
	// console.log("Bet Info - Jackpot Bet ID:", state?.mybets?.meta.bet_info.jackpot_bet_id);
	// console.log("Bet Info - Total Odd:", state?.mybets?.meta.bet_info.total_odd);
	// console.log("Bet Info - Bet Message:", state?.mybets?.meta.bet_info.bet_message);
	// console.log("Bet Info - Possible Win:", state?.mybets?.meta.bet_info.possible_win);
	// console.log("Bet Info - Status:",state?.mybets?.bet_info.status);
	// console.log("Bet Info - Bet Amount:", state?.mybets?.meta.bet_info.bet_amount);
	// console.log("Bet Info - Can Cancel:", state?.mybets?.meta.bet_info.can_cancel);


	const FormatDate = (props) => {
		const { date } = props;

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

		return "Placed bet on "+formattedDateTime;
	};

	const [collapsed, setCollapsed] = useState([]);
	const [collapsedAll, setCollapsedAll] = useState(true);

	const toggleCollapse = (index) => {
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
			setCollapsed(Array.from({ length: items.length }, (_, index) => index));
		} else {
			setCollapsed([]);
		}
		setCollapsedAll(!collapsedAll);
	}

	const WinLostTotal=()=>{
		const data=state?.mybets?.data
		const filteredData = data?.filter(bet => bet.win === 1 || bet.win === 0);
		const won = filteredData?.filter(bet => bet.win === 1).length;
		const lost = filteredData?.filter(bet => bet.win === 0).length;
		const total = filteredData.length;

		const result = `${won}/${lost}/${total}`;
		return result
	}

	const [canCancel, setCanCancel] = useState(true);
	const [betStatus, setBetStatus] = useState(null);
	const [cancelEndTime, setCancelEndTime] = useState(null);
	const [countdown, setCountdown] = useState(null);

	useEffect(() => {
		if (canCancel) {
			const cancelEnd = moment().add(5, 'minutes'); // Change from 10 seconds to 5 minutes
			setCancelEndTime(cancelEnd);
			startCountdown(cancelEnd);
		} else {
			setCancelEndTime(null);
			setCountdown(null);
		}
	}, [canCancel]);


	const startCountdown = (endTime) => {
		const duration = moment.duration(endTime.diff(moment()));
		const remainingSeconds = Math.floor(Math.max(0, duration.asSeconds()));
		const remainingMinutes = Math.floor(remainingSeconds / 60); // Calculate remaining minutes
		const remainingSecondsFormatted = remainingSeconds % 60; // Calculate remaining seconds

		const remainingTime = `${remainingMinutes}:${remainingSecondsFormatted
			.toString()
			.padStart(2, "0")}`; // Format remaining time as "minutes:seconds"
		setCountdown(remainingTime);

		if (remainingSeconds > 0) {
			setTimeout(() => {
				startCountdown(endTime);
			}, 1000);
		}
	};

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
		const { bet_id, can_cancel } = props;
		console.log("can_cancel_info", can_cancel)
		if (can_cancel!==false) {
			return (
				<div className="">
					<button
						title="Cancel Bet"
						className="col btn btn-sm place-bet-btn d-flex flex-column "
						onClick={() => cancelBet(bet_id)}
					>
						{countdown}&nbsp;Cancel
					</button>
				</div>
			);
		}else{
			return <spna></spna>
		}
	};


	return (
		<>
			{!isLoading?
				<div className="d-flex details flex-column bet-details">
					{state?.mybets?.data?.map((item,index) => (
						<div key={index}>
							{index===0&&<div className="d-flex history-details flex-column bet-summary-info">
								<div className="id">
									#{item?.bet_id}
								</div>
								<div className="date">
									<FormatDate date={item?.created}/>
								</div>
								<div className="status d-flex justify-content-between px-2">
								<span
									className={` badge  ${item?.status == 3 ? "bg-dark text-warning" : item?.status == 5 ? "bg-success" : item?.status == 1 ? "bg-dark " : ""}`}
									style={{
										color: "white",
										marginTop: "10px",
										borderRadius: "7px",
										marginLeft: "1px",
										padding: "2.9px 9px "
									}}>{item.status == 3 ? "NOT WON" : item?.status == 5 ? "WON" : "PENDING"}
								</span>
									{console.log("slip_cancel_info",state?.mybets?.meta.bet_info.can_cancel)}
									{state?.mybets?.meta.bet_info.can_cancel!==false&&
									<CancelBetMarkup bet_id={item?.bet_id} can_cancel={state?.mybets?.meta.bet_info.can_cancel}/>}
								</div>
								{index === 0 && (<div className="d-flex history-details-padding gap-3 ">
									<div className="col-8 d-flex details-history-main-container">
										<div className="d-flex col-2 flex-column details-history-main" >
											<div className={"main-details-info-title"}>
												Amount
											</div>
											<div className="amount-value">{item?.bet_amount}</div>
										</div>
										<div className="d-flex col-8 flex-column details-history-main">
											<div className={"main-details-info-title"}>
												possible payout
											</div>
											<div className="amount-value">{item?.possible_win}</div>
										</div>

									</div>
									<div className="col-4 details-history-main-container d-flex justify-content-center flex-column">
										<div className="won-total main-details-info-title">
											won/lost/total
										</div>
										<div className="won-total-value">
											<WinLostTotal />
										</div>

									</div>
								</div>)}
								<div className="d-flex options-details-history w-100 justify-content-between">
									<div className="d-flex">
										Events (Odds {item?.odd_value})
									</div>
									{index === 0 && (
										<div className="d-flex text-warning bold d-flex gap-2 align-items-center"
											 onClick={()=>toggleCollapseAll(state?.mybets?.data)}>
											Toggle collapse all {!collapsedAll ? <FontAwesomeIcon icon={faCaretRight}/> :
											<FontAwesomeIcon icon={faCaretDown}/>}
										</div>
									)}

								</div>
							</div>
							}
							<div className="d-flex details-history flex-column w-100 mt-3">
								<div className="d-flex w-100 justify-content-between px-2 details-items">
									<div className="team">
										<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>&nbsp;{item?.home_team}</div>
									{item?.results&&<div className="outcome">{item?.results}</div>}
									<div className="team" onClick={()=>toggleCollapse(index)}>{item?.away_team}&nbsp;{!collapsed.includes(index)?<FontAwesomeIcon icon={faCaretRight}/>:<FontAwesomeIcon icon={faCaretDown}/>}</div>
								</div>
								<div className={`${!collapsed.includes(index)?"d-none":"d-flex justify-content-between gap-4"} w-100 px-3 bethistory-items`}>
									<div className="d-flex  flex-column col">
										<div className="d-flex justify-content-between px-2 details-info">
											<div className="type">
												Type
											</div>
											<div className="market-h">
												{item?.bet_type}
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
											<div className="outcome-h">
												{item?.winning_outcome}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>	:
				<div className={`text-center mt-2 text-white d-block`}>
					<Skeleton1/>
				</div>
			}

		</>
	)
}
export default React.memo(BetDetails)